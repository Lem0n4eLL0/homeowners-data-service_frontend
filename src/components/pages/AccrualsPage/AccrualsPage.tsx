import { useAppDispatch, useAppSelector } from '@/services/store';
import clsx from 'clsx';
import commonStyle from '@styles/common.module.scss';
import style from './AccrualsPage.module.scss';
import { LinksBar } from '@/components/LinksBar';
import {
  getAccrualsAccruals,
  selectDataAccruals,
  selectStatusesAccruals,
} from '@/services/slices/accruals';
import { Accruals } from '@/common/commonTypes';
import { useEffect, useMemo, useState } from 'react';
import { Column, Table } from '@/components/shells/Table';
import { format } from 'date-fns';
import { selectUser } from '@/services/slices/user';
import {
  formatChargeLabel,
  priceFormatter,
  properieFormatter,
  statusAccrualsFormatter,
} from '@/utils/utils';

const sortAccrualsByYear = (accruals: Accruals[]): Map<string, Accruals[]> => {
  const result = new Map<string, Accruals[]>();
  accruals.forEach(el => {
    const year = new Date(el.accrualInterval).getFullYear();
    const arr = result.get(String(year));
    result.set(String(year), arr ? [...arr, el] : [el]);
  });
  return result;
};

export const AccrualsPage = () => {
  const dispatch = useAppDispatch();
  const { accruals } = useAppSelector(selectDataAccruals);
  const { properties } = useAppSelector(selectUser);
  const { getAccrualsStatus } = useAppSelector(selectStatusesAccruals);

  const sortedAccruals = useMemo(() => sortAccrualsByYear(accruals), [accruals]);
  const [firstactiveYear, availableYears] = useMemo(() => {
    const years = Array.from(sortedAccruals.keys()).sort((a, b) => +b - +a);
    return [years[0] ?? '', years];
  }, [sortedAccruals]);

  const [activeYear, setActiveYear] = useState<string>(firstactiveYear);

  useEffect(() => {
    if (getAccrualsStatus.status === 'READY') {
      void dispatch(getAccrualsAccruals());
    }
  }, [dispatch, getAccrualsStatus.status]);

  const tableAccrualsColumns: Column<Accruals>[] = useMemo(
    () => [
      {
        key: 'createdAt',
        title: 'Дата',
        render: value => format(value, 'dd.MM.yyyy'),
      },
      {
        key: 'accrualInterval',
        title: 'Операция',
        render: value => formatChargeLabel(value),
      },
      {
        key: 'propertyId',
        title: 'Объект недвижимости',
        render: value => {
          const property = properties.find(el => el.id === value);
          return property ? properieFormatter(property) : '-';
        },
      },
      {
        key: 'paidStatus',
        title: 'Статус',
        render: value => statusAccrualsFormatter(value),
      },
      {
        key: 'totalSum',
        title: 'Начислено',
        render: value => priceFormatter(value),
      },
    ],
    [properties]
  );

  const accrualOpenHandler = (item: Accruals) => {
    console.log(JSON.stringify(item));
  };

  if (getAccrualsStatus.status === 'PENDING') {
    return (
      <div className={clsx(commonStyle['base_page_wrapper'], style['loading__wrapper'])}>
        <h1 className={commonStyle['base_page_title']}>Начисления</h1>
        <div className={clsx(style['loading__block'], commonStyle['loader_bg'])}></div>
      </div>
    );
  }

  const currentActiveYear = activeYear === '' ? firstactiveYear : activeYear;

  return (
    <div className={clsx(commonStyle['base_page_wrapper'])}>
      <h1 className={commonStyle['base_page_title']}>Начисления</h1>
      <div className={style['content']}>
        <LinksBar
          active={currentActiveYear}
          links={availableYears.map(el => {
            return {
              name: el,
              label: el,
              onClick: () => {
                setActiveYear(el);
              },
            };
          })}
          linkGap={32}
        />
        <Table
          columns={tableAccrualsColumns}
          data={sortedAccruals.get(currentActiveYear) ?? []}
          onRowClick={accrualOpenHandler}
          tableHeight={'100%'}
        />
      </div>
    </div>
  );
};
