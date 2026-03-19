import { FormElement } from '@/components/forms/FormElement';
import style from './HistoryApplications.module.scss';
import commonStyle from '@styles/common.module.scss';

import { AppSelect } from '@/components/forms/AppSelect';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { selectUser } from '@/services/slices/user';
import { properieFormatter, statusApplicationFormatter, userFormatter } from '@/utils/utils';
import { OptionType } from '@/components/forms/AppSelect/AppSelect';
import { DateRange, Propertie } from '@/common/commonTypes';
import { useEffect, useState } from 'react';
import { APPLICATION_STATUSES, ApplicationFull } from '@/api/apiTypes';
import { emptyOption, FilteredStatus, STATUS_APPLICATION_BASE_OPTIONS } from '@/common/constants';
import { Column, Table } from '@/components/shells/Table';
import { format } from 'date-fns';
import {
  getApplicationHistoryApplication,
  selectDataApplication,
  selectIsApplicationsInitializing,
  selectStatusesApplication,
} from '@/services/slices/applications';
import { Loader } from '@/components/shells/Loader';
import clsx from 'clsx';
import { useFilter } from '@/hooks/useFilter';
import {
  filterApplicationByPropertyID,
  filterApplicationByStatus,
  filterByDateRange,
} from '@/common/filters';
import { DateRangePicker } from '@/components/forms/DateRangePicker';
import { useLocation, useNavigate } from 'react-router';

type ApplicationFilterValues = {
  date: DateRange | null;
  status: FilteredStatus | null;
  property: Propertie | null;
};

const tableApplicationHistoryColumns: Column<ApplicationFull>[] = [
  {
    key: 'createdAt',
    title: 'Дата',
    render: value => format(value, 'dd.MM.yyyy'),
  },
  {
    key: 'status',
    title: 'Статус',
    render: value => statusApplicationFormatter(value),
  },
  {
    key: 'title',
    title: 'Тема',
  },
  {
    key: 'createdBy',
    title: 'ФИО',
    render: userFormatter,
  },
  {
    key: 'property',
    title: 'Адрес',
    render: value => properieFormatter(value),
  },
];

export const HistoryApplications = () => {
  const dispatch = useAppDispatch();
  const { getApplicationHistory } = useAppSelector(selectStatusesApplication);
  const isApplicationsInitializing = useAppSelector(selectIsApplicationsInitializing);
  const { properties } = useAppSelector(selectUser);
  const { applications } = useAppSelector(selectDataApplication);
  const location = useLocation();
  const navigator = useNavigate();

  const applicationOpenHandler = (item: ApplicationFull) => {
    void navigator(`${item.id}`, {
      state: {
        backgroundLocation: location,
      },
    });
  };

  const [filterValues, setFilterValues] = useState<ApplicationFilterValues>({
    date: { from: null, to: null },
    status: null,
    property: null,
  });

  const filter = useFilter({ data: applications });

  useEffect(() => {
    if (!isApplicationsInitializing) {
      void dispatch(getApplicationHistoryApplication());
    }
  }, [dispatch, isApplicationsInitializing]);

  if (getApplicationHistory.status === 'PENDING') {
    return (
      <div className={style['content']}>
        <Loader loaderClass={clsx(commonStyle['loader_bg'], style['loader'])} />
      </div>
    );
  }

  if (getApplicationHistory.status === 'ERROR') {
    return <div className={style['content']}>Error</div>;
  }

  const propertyOptions = [
    emptyOption<Propertie>(),
    ...properties.map<OptionType<Propertie>>(el => ({
      value: el,
      label: properieFormatter(el),
    })),
  ];

  const statusApplicationOptions = [
    emptyOption<FilteredStatus>(),
    ...STATUS_APPLICATION_BASE_OPTIONS,
  ];

  const propertyFilterHandler = (value: OptionType<Propertie> | undefined) => {
    setFilterValues(prev => ({
      ...prev,
      property: value?.value ?? null,
    }));
    if (value && value?.value) {
      filter.setFilter('property', filterApplicationByPropertyID(value.value));
    } else {
      filter.removeFilter('property');
    }
  };

  const statusFilterHandler = (value: OptionType<FilteredStatus> | undefined) => {
    setFilterValues(prev => ({
      ...prev,
      status: value?.value ?? null,
    }));
    if (value && value?.value?.status) {
      filter.setFilter('status', filterApplicationByStatus(value.value.status));
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
            options={statusApplicationOptions}
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
      <Table<ApplicationFull>
        columns={tableApplicationHistoryColumns}
        data={filter.filteredData}
        onRowClick={applicationOpenHandler}
        className={style['content__table']}
        tableHeight={'100%'}
      />
    </div>
  );
};
