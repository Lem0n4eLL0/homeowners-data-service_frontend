import { Line } from '@/components/shells/Line';
import clsx from 'clsx';
import { useParams } from 'react-router';
import style from './ServicePopup.module.scss';
import commonStyle from '@styles/common.module.scss';
import { InformationField } from '@/components/InformationField';
import { properieFormatter, userFormatter } from '@/utils/utils';
import { format } from 'date-fns';
import { SERVICE_STATUSES } from '@/common/commonTypes';
import { useAppSelector } from '@/services/store';
import { selectUserService } from '@/services/slices/services';
import { useMemo } from 'react';
import { PriceSummary } from '@/components/PriceSummary';
import { Loader } from '@/components/shells/Loader';

export const ServicePopup = () => {
  const { id } = useParams();

  const service = useAppSelector(selectUserService(id!));

  const status = useMemo(() => {
    let className = '';
    if (!service) return;
    switch (service.status) {
      case 'SENT':
        className = commonStyle['status__block_sent'];
        break;
      case 'PROCESSED':
        className = commonStyle['status__block_processed'];
        break;
      case 'COMPLETED':
        className = commonStyle['status__block_completed'];
        break;
      default:
        className = commonStyle['status__block_other'];
    }
    return (
      <span className={clsx(style['content__status'], className)}>
        {SERVICE_STATUSES[service.status]}
      </span>
    );
  }, [service]);

  if (service === undefined) {
    return (
      <div className={style['loader']}>
        <Loader loaderClass={clsx(commonStyle['loader'], commonStyle['loader_base_size'])} />
      </div>
    );
  }

  return (
    <div className={clsx(style['content'], commonStyle['scroll'])}>
      {status}
      <h2 className={style['content__title']}>{service.service.title}</h2>
      <Line size="218px" color="#E4DCD3" extraClassName={style['content__line']} />
      <div className={clsx(style['content__infornation'], commonStyle['scroll'])}>
        <div className={style['content__price_wrapper']}>
          <PriceSummary lable="Оплачено" price={+service.service.price} />
        </div>
        <InformationField lable="Описание">{service.service.description}</InformationField>
        <InformationField lable="Адрес">{properieFormatter(service.property)}</InformationField>
        <InformationField lable="ФИО">{userFormatter(service.createdBy)}</InformationField>
      </div>

      <span className={style['content__date']}>
        {format(service.createdAt, 'dd.MM.yyyy/hh:mm')}
      </span>
    </div>
  );
};
