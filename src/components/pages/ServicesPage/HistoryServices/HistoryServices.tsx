import { FormElement } from '@/components/forms/FormElement';
import style from './HistoryServices.module.scss';
import commonStyle from '@styles/common.module.scss';

import { AppSelect } from '@/components/forms/AppSelect';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { selectUser } from '@/services/slices/user';
import { properieFormatter, statusServicesFormatter } from '@/utils/utils';
import { OptionType } from '@/components/forms/AppSelect/AppSelect';
import { DateRange, Propertie, ServiceStatus, UserServicesFull } from '@/common/commonTypes';
import { useEffect, useState } from 'react';
import { APPLICATION_STATUSES, User } from '@/api/apiTypes';
import {
  emptyOption,
  FilteredServiceStatus,
  FilteredStatus,
  STATUS_SERVICE_BASE_OPTIONS,
} from '@/common/constants';
import { Column, Table } from '@/components/shells/Table';
import { format } from 'date-fns';
import { Loader } from '@/components/shells/Loader';
import clsx from 'clsx';
import { useFilter } from '@/hooks/useFilter';
import { filterByDateRange, filterByPropertyID, filterServiceByStatus } from '@/common/filters';
import { DateRangePicker } from '@/components/forms/DateRangePicker';
import { useLocation, useNavigate } from 'react-router';
import {
  getServicesHistoryServices,
  selectDataServices,
  selectStatusesServices,
} from '@/services/slices/services';

type ServicesFilterValues = {
  date: DateRange | null;
  status: FilteredServiceStatus | null;
  property: Propertie | null;
};

type TableServicesHistory = {
  id: string;
  createdAt: string;
  createdBy: User;
  serviceTitle: string;
  servicePrice: number;
  property: Propertie;
  status: ServiceStatus;
};

const formattedToTableData = (data: UserServicesFull[]): TableServicesHistory[] => {
  return data.map(el => ({
    id: el.id,
    createdAt: el.createdAt,
    createdBy: el.createdBy,
    serviceTitle: el.service.title,
    servicePrice: el.service.price,
    property: el.property,
    status: el.status,
  }));
};

const tableServicesHistoryColumns: Column<TableServicesHistory>[] = [
  {
    key: 'createdAt',
    title: 'Дата',
    render: value => format(value, 'dd.MM.yyyy'),
  },
  {
    key: 'status',
    title: 'Статус',
    render: value => statusServicesFormatter(value),
  },
  {
    key: 'serviceTitle',
    title: 'Услуга',
  },
  {
    key: 'servicePrice',
    title: 'Стоимость',
  },
  {
    key: 'property',
    title: 'Адрес',
    render: value => properieFormatter(value),
  },
];

export const HistoryServices = () => {
  const dispatch = useAppDispatch();
  const { getServicesHistory } = useAppSelector(selectStatusesServices);
  const { servicesHistory } = useAppSelector(selectDataServices);
  const { properties } = useAppSelector(selectUser);

  const location = useLocation();
  const navigator = useNavigate();

  const servicesOpenHandler = (item: TableServicesHistory) => {
    void navigator(`${item.id}`, {
      state: {
        backgroundLocation: location,
      },
    });
  };

  const [filterValues, setFilterValues] = useState<ServicesFilterValues>({
    date: { from: null, to: null },
    status: null,
    property: null,
  });

  const tableData = formattedToTableData(servicesHistory);

  const filter = useFilter({ data: tableData });
  const isServicesInitializing = getServicesHistory.status !== 'READY';

  useEffect(() => {
    if (!isServicesInitializing) {
      void dispatch(getServicesHistoryServices());
    }
  }, [dispatch, isServicesInitializing]);

  if (getServicesHistory.status === 'PENDING') {
    return (
      <div className={style['content']}>
        <Loader loaderClass={clsx(commonStyle['loader_bg'], style['loader'])} />
      </div>
    );
  }

  if (getServicesHistory.status === 'ERROR') {
    return <div className={style['content']}>Error</div>;
  }

  const propertyOptions = [
    emptyOption<Propertie>(),
    ...properties.map<OptionType<Propertie>>(el => ({
      value: el,
      label: properieFormatter(el),
    })),
  ];

  const statusServiceOptions = [emptyOption<FilteredStatus>(), ...STATUS_SERVICE_BASE_OPTIONS];

  const propertyFilterHandler = (value: OptionType<Propertie> | undefined) => {
    setFilterValues(prev => ({
      ...prev,
      property: value?.value ?? null,
    }));
    if (value && value?.value) {
      filter.setFilter('property', filterByPropertyID(value.value));
    } else {
      filter.removeFilter('property');
    }
  };

  const statusFilterHandler = (value: OptionType<FilteredServiceStatus> | undefined) => {
    setFilterValues(prev => ({
      ...prev,
      status: value?.value ?? null,
    }));
    if (value && value?.value?.status) {
      filter.setFilter('status', filterServiceByStatus(value.value.status));
    } else {
      filter.removeFilter('status');
    }
  };

  const dateRangeFilterHandler = (value: DateRange | null) => {
    setFilterValues(prev => ({
      ...prev,
      date: value ?? null,
    }));

    if (value && value) {
      filter.setFilter('createdAt', filterByDateRange(value));
    } else {
      filter.removeFilter('createdAt');
    }
  };

  return (
    <div className={style['content']}>
      <div className={style['content__filters']}>
        <DateRangePicker
          value={filterValues.date ?? { from: null, to: null }}
          onChange={dateRangeFilterHandler}
        />
        <FormElement label="Статус заявки">
          <AppSelect<FilteredStatus>
            value={
              filterValues.status !== null
                ? {
                    value: filterValues.status,
                    label: APPLICATION_STATUSES[filterValues.status.status],
                  }
                : null
            }
            options={statusServiceOptions}
            onChange={statusFilterHandler}
            placeholder={'Выберете статус'}
          ></AppSelect>
        </FormElement>
        <FormElement label="Адрес">
          <AppSelect
            value={
              filterValues.property !== null
                ? { value: filterValues.property, label: properieFormatter(filterValues.property) }
                : null
            }
            options={propertyOptions}
            onChange={propertyFilterHandler}
            placeholder={'Выберете адрес'}
          ></AppSelect>
        </FormElement>
      </div>
      <Table<TableServicesHistory>
        columns={tableServicesHistoryColumns}
        data={filter.filteredData}
        className={style['content__table']}
        tableHeight={'100%'}
        onRowClick={servicesOpenHandler}
      />
    </div>
  );
};
