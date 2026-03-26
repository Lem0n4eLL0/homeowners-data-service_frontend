import { LinksBar } from '@/components/LinksBar';
import { selectServicesPageState, setServicesPageState } from '@/services/slices/app';
import { useAppDispatch, useAppSelector } from '@/services/store';
import commonStyle from '@styles/common.module.scss';
import style from './ServicesPage.module.scss';

import clsx from 'clsx';
import { CreateServices } from './CreateServices';
import { HistoryServices } from './HistoryServices';
import { useEffect } from 'react';
import { getServicesServices } from '@/services/slices/services';

export const ServicesPage = () => {
  const dispatch = useAppDispatch();
  const servicesPageState = useAppSelector(selectServicesPageState);

  useEffect(() => {
    void dispatch(getServicesServices());
  }, [dispatch]);

  return (
    <div className={clsx(commonStyle['base_page_wrapper'], style['content_wrapper'])}>
      <h1 className={commonStyle['base_page_title']}>Услуги</h1>
      <div className={style['content']}>
        <LinksBar
          active={servicesPageState}
          links={[
            {
              name: 'ServicesPageCreate',
              label: 'Выбор услуг',
              onClick: () => {
                dispatch(setServicesPageState('ServicesPageCreate'));
              },
            },
            {
              name: 'ServicesPageHistory',
              label: 'История',
              onClick: () => {
                dispatch(setServicesPageState('ServicesPageHistory'));
              },
            },
          ]}
        />
        {servicesPageState === 'ServicesPageCreate' ? (
          <CreateServices />
        ) : servicesPageState === 'ServicesPageHistory' ? (
          <HistoryServices />
        ) : (
          <>Error</>
        )}
      </div>
    </div>
  );
};
