import { InformationField } from '@/components/InformationField';
import { Line } from '@/components/shells/Line';
import { formatChargeLabel, periodFormatter, properieFormatter } from '@/utils/utils';
import clsx from 'clsx';
import style from './AccrualsPopup.module.scss';
import commonStyle from '@styles/common.module.scss';
import { format } from 'date-fns';
import { useParams } from 'react-router';
import { useAppSelector } from '@/services/store';
import { selectAccrual } from '@/services/slices/accruals';
import { useMemo } from 'react';
import { ACCRUALS_STATUSES } from '@/common/commonTypes';
import { PriceSummary } from '@/components/PriceSummary';
import { selectUser } from '@/services/slices/user';

export const AccrualsPopup = () => {
  const { id } = useParams();
  const accruals = useAppSelector(selectAccrual(id!));
  const { properties } = useAppSelector(selectUser);

  const isPaid = useMemo(() => accruals?.paidStatus === 'PAID', [accruals?.paidStatus]);
  const property = useMemo(
    () => properties.find(el => el.id === accruals?.propertyId),
    [properties, accruals]
  );
  console.log(property);

  const status = useMemo(() => {
    let className = '';
    if (!accruals) return;
    switch (accruals.paidStatus) {
      case 'PAID':
        className = commonStyle['status__block_paid'];
        break;
      case 'NOT_PAID':
        className = commonStyle['status__block_not_paid'];
        break;
      default:
        className = commonStyle['status__block_other'];
    }
    return (
      <span className={clsx(style['content__status'], className)}>
        {ACCRUALS_STATUSES[accruals.paidStatus]}
      </span>
    );
  }, [accruals]);

  if (accruals === undefined) {
    return <div className={style['loader']}>Загрузка...</div>;
  }

  return (
    <div className={clsx(style['content'], commonStyle['scroll'])}>
      {status}
      <h2 className={style['content__title']}>
        {formatChargeLabel(accruals.accrualInterval.start)}
      </h2>
      <Line size="218px" color="#E4DCD3" extraClassName={style['content__line']} />
      <div className={clsx(style['content__infornation'], commonStyle['scroll'])}>
        <InformationField lable="Период">
          {periodFormatter(accruals.accrualInterval)}
        </InformationField>
        <InformationField lable="Адрес">
          {property ? properieFormatter(property) : '-'}
        </InformationField>
        <InformationField isStandartWrapper={false} lable="Услуги">
          <ul className={style['content__topics_list']}>
            {accruals.accrualTopic.map((el, ind) => {
              return (
                <li className={style['content__topic']} key={el.code + ind}>
                  {el.name}
                </li>
              );
            })}
          </ul>
        </InformationField>

        <PriceSummary lable={'Начислено'} price={accruals.paidAmount} />
        <PriceSummary lable={'Оплачено'} price={accruals.totalSum} />
      </div>
      <span className={style['content__date']}>
        {format(accruals.createdAt, 'dd.MM.yyyy/hh:mm')}
      </span>
    </div>
  );
};
