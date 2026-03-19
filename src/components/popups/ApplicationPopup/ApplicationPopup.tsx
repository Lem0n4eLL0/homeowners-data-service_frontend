import clsx from 'clsx';
import commonStyle from '@styles/common.module.scss';
import style from './ApplicationPopup.module.scss';

import { useParams } from 'react-router';
import { useAppSelector } from '@/services/store';
import { selectApplicationCompleted } from '@/services/slices/applications';
import { InformationField } from '@/components/InformationField';
import { properieFormatter, userFormatter } from '@/utils/utils';
import { format } from 'date-fns';
import { Line } from '@/components/shells/Line';
import { useMemo } from 'react';
import { APPLICATION_STATUSES } from '@/api/apiTypes';

export const ApplicationPopup = () => {
  const { id } = useParams();
  const application = useAppSelector(selectApplicationCompleted(id!));

  const status = useMemo(() => {
    let className = '';
    if (!application) return;
    switch (application.status) {
      case 'SENT':
        className = style['status_sent'];
        break;
      case 'PROCESSED':
        className = style['status_processed'];
        break;
      case 'COMPLETED':
        className = style['status_completed'];
        break;
    }
    return (
      <span className={clsx(style['content__status'], className)}>
        {APPLICATION_STATUSES[application.status]}
      </span>
    );
  }, [application]);

  if (application === undefined) {
    return <div className={style['loader']}>Загрузка...</div>;
  }

  return (
    <div className={clsx(style['content'], commonStyle['scroll'])}>
      {status}
      <h2 className={style['content__title']}>{application.title}</h2>
      <Line size="218px" color="#E4DCD3" extraClassName={style['content__line']} />
      <div className={clsx(style['content__infornation'], commonStyle['scroll'])}>
        <InformationField lable="Описание">{application.message}</InformationField>
        <InformationField lable="Адрес">{properieFormatter(application.property)}</InformationField>
        <InformationField lable="ФИО">{userFormatter(application.createdBy)}</InformationField>
      </div>

      <span className={style['content__date']}>
        {format(application.createdAt, 'dd.MM.yyyy/hh:mm')}
      </span>
    </div>
  );
};
