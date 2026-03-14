import { LinksBar } from '@/components/LinksBar';
import { selectApplicationsPageState, setApplicationsPageState } from '@/services/slices/app';
import { useAppDispatch, useAppSelector } from '@/services/store';
import commonStyle from '@styles/common.module.scss';
import style from './ApplicationsPage.module.scss';
import { CreateApplications } from './CreateApplications';
import { HistoryApplications } from './HistoryApplications';

export const ApplicationsPage = () => {
  const dispatch = useAppDispatch();
  const applicationsPageState = useAppSelector(selectApplicationsPageState);

  return (
    <div className={commonStyle['base_page_wrapper']}>
      <h1 className={commonStyle['base_page_title']}>Заявки</h1>
      <div className={style['content']}>
        <LinksBar
          active="base"
          links={[
            {
              name: 'base',
              label: 'Cоздание заявки',
              onClick: () => {
                dispatch(setApplicationsPageState('ApplicationsPageCreate'));
              },
            },
            {
              name: 'history',
              label: 'История',
              onClick: () => {
                dispatch(setApplicationsPageState('ApplicationsPageHistory'));
              },
            },
          ]}
        />
        {applicationsPageState === 'ApplicationsPageCreate' ? (
          <CreateApplications />
        ) : applicationsPageState === 'ApplicationsPageHistory' ? (
          <HistoryApplications />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
