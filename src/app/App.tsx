/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

import { Navigate, Route, Routes, useLocation } from 'react-router';
import { MainLayout } from '@layouts/MainLayout';
import { AuthPage } from '@pages/AuthPage';
import { AuthProtector } from '@/components/protectors/AuthProtector';
import { useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { selectIsAuthInitializing } from '@/services/slices/auth';
import { Loader } from '@/components/shells/Loader';
import commonStyle from '@styles/common.module.scss';
import style from './App.module.scss';
import clsx from 'clsx';
import { Header } from '@/components/layouts/Header';
import { getProfileUser, selectStatusesUser } from '@/services/slices/user';
import { ProfilePage } from '@/components/pages/ProfilePage';
import { Popup } from '@/components/shells/Popup';
import { AddPropertyPopup } from '@/components/popups/AddPropertyPopup';
import { EditPropertyPopup } from '@/components/popups/EditPropertyPopup';

const App = () => {
  const dispatch = useAppDispatch();
  const isInitializing = useAppSelector(selectIsAuthInitializing);
  const userStatuses = useAppSelector(selectStatusesUser);

  const location = useLocation();

  const backgroundLocation = location.state?.backgroundLocation;

  useLayoutEffect(() => {
    void dispatch(getProfileUser());
  }, [dispatch]);

  if (isInitializing || userStatuses.getProfileStatus.status === 'PENDING') {
    return (
      <Loader loaderClass={clsx(commonStyle['loader_v2'], style['loader'])} isAbsolute={true} />
    );
  }

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route element={<AuthProtector isRedirectAuthorized={false} redirectPath="/auth" />}>
          <Route element={<MainLayout header={<Header />} />}>
            <Route index element={<Navigate to="/profile" replace />} />
            <Route path="readings" element={<div>Показания</div>} />
            <Route path="accruals" element={<div>Начисления</div>} />
            <Route path="applications" element={<div>Заявки</div>} />
            <Route path="services" element={<div>Услуги</div>} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="news" element={<div>Новости</div>} />
          </Route>
        </Route>
        <Route element={<AuthProtector isRedirectAuthorized={true} redirectPath="/profile" />}>
          <Route element={<MainLayout />}>
            <Route path="auth" element={<AuthPage />}></Route>
          </Route>
        </Route>
        <Route path="*" element={<div>Error page</div>}></Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/profile/properties">
            <Route element={<Popup />}>
              <Route path="add" element={<AddPropertyPopup />} />
              <Route path="edit/:id" element={<EditPropertyPopup />} />
            </Route>
          </Route>
        </Routes>
      )}
    </>
  );
};

export default App;
