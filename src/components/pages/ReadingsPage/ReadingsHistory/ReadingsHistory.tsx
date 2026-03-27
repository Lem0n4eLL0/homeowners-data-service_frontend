import { useAppDispatch, useAppSelector } from '@/services/store';
import style from './ReadingsHistory.module.scss';
import commonStyle from '@styles/common.module.scss';
import {
  getIndicationsHistoryMeters,
  selectDataMeters,
  selectStatusesMeters,
} from '@/services/slices/meters';
import { selectUser } from '@/services/slices/user';
import { useEffect, useState } from 'react';
import { DateRange, METER_TYPES, MeterType, Propertie } from '@/common/commonTypes';
import { useFilter } from '@/hooks/useFilter';
import { Loader } from '@/components/shells/Loader';
import clsx from 'clsx';
import { emptyOption, FilteredMeterType, TYPE_METER_BASE_OPTIONS } from '@/common/constants';
import { AppSelect, OptionType } from '@/components/forms/AppSelect/AppSelect';
import { dateFormatter, properieFormatter } from '@/utils/utils';
import { filterByDateRange, filterByMeterType, filterByPropertyID } from '@/common/filters';
import { Column, Table } from '@/components/shells/Table';
import { DateRangePicker } from '@/components/forms/DateRangePicker';
import { FormElement } from '@/components/forms/FormElement';

type MeterFilterValues = {
  date: DateRange | null;
  type: MeterType | null;
  property: Propertie | null;
};

type MeterTable = {
  id: string;
  createdAt: string;
  type: MeterType;
  property: Propertie;
  value: number;
};

const tableApplicationHistoryColumns: Column<MeterTable>[] = [
  {
    key: 'createdAt',
    title: 'Дата',
    render: value => dateFormatter(new Date(value)),
  },
  {
    key: 'type',
    title: 'Тип счетчика',
    render: value => METER_TYPES[value],
  },
  {
    key: 'value',
    title: 'Показания',
  },
  {
    key: 'property',
    title: 'Адрес',
    render: value => properieFormatter(value),
  },
];

export const ReadingsHistory = () => {
  const dispatch = useAppDispatch();
  const { getIndicationsHistoryStatus } = useAppSelector(selectStatusesMeters);
  const { indicationsHistory } = useAppSelector(selectDataMeters);
  const { properties } = useAppSelector(selectUser);

  const [filterValues, setFilterValues] = useState<MeterFilterValues>({
    date: null,
    type: null,
    property: null,
  });

  const indicationsHistoryTable = indicationsHistory.map<MeterTable>(el => {
    return {
      id: el.id,
      createdAt: el.createdAt,
      type: el.meter.type,
      property: properties.find(prop => prop.id === el.meter.propertyId)!,
      value: el.value,
    };
  });

  const filter = useFilter({ data: indicationsHistoryTable });

  useEffect(() => {
    if (getIndicationsHistoryStatus.status === 'READY') {
      void dispatch(getIndicationsHistoryMeters());
    }
  }, [dispatch, getIndicationsHistoryMeters]);

  if (getIndicationsHistoryStatus.status === 'PENDING') {
    return (
      <div className={style['content']}>
        <Loader loaderClass={clsx(commonStyle['loader_bg'], style['loader'])} />
      </div>
    );
  }

  if (getIndicationsHistoryStatus.status === 'ERROR') {
    return <div className={style['content']}>Error</div>;
  }

  const propertyOptions = [
    emptyOption<Propertie>(),
    ...properties.map<OptionType<Propertie>>(el => ({
      value: el,
      label: properieFormatter(el),
    })),
  ];

  const meterTypesOptions = [emptyOption<FilteredMeterType>(), ...TYPE_METER_BASE_OPTIONS];

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

  const meterTypeFilterHandler = (value: MeterType | null) => {
    setFilterValues(prev => ({
      ...prev,
      type: value ?? null,
    }));

    if (value && value) {
      filter.setFilter('type', filterByMeterType(value));
    } else {
      filter.removeFilter('type');
    }
  };

  return (
    <div className={style['content']}>
      <div className={style['content__filters']}>
        <DateRangePicker
          value={filterValues.date ?? { from: null, to: null }}
          onChange={dateRangeFilterHandler}
        />
        <FormElement label="Тип счетчика">
          <AppSelect
            value={
              filterValues.type !== null
                ? {
                    value: { id: filterValues.type, type: filterValues.type },
                    label: METER_TYPES[filterValues.type],
                  }
                : null
            }
            options={meterTypesOptions}
            onChange={el => meterTypeFilterHandler(el?.value?.type ?? null)}
            placeholder={'Выберете тип'}
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
      <Table<MeterTable>
        columns={tableApplicationHistoryColumns}
        data={filter.filteredData}
        className={style['content__table']}
        tableHeight={'100%'}
      />
    </div>
  );
};
