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
import { ApplicationsPage } from '@/components/pages/ApplicationsPage';
import { ApplicationPopup } from '@/components/popups/ApplicationPopup';
import { ServicesPage } from '@/components/pages/ServicesPage';
import { ServicePopup } from '@/components/popups/ServicePopup';
import { CreateServicePopup } from '@/components/popups/CreateServicePopup/CreateServicePopup';
import { AccrualsPage } from '@/components/pages/AccrualsPage';
import { AccrualsPopup } from '@/components/popups/AccrualsPopup';
import { ReadingsPage } from '@/components/pages/ReadingsPage';
import { AddMeter } from '@/components/popups/AddMeter';
import { AboutPage } from '@/components/pages/AboutPage';
import { AgreementPage } from '@/components/pages/AgreementPage';
import { NewsPage } from '@/components/pages/NewsPage';
import { ErrorPage } from '@/components/pages/ErrorPage';

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
        <Route element={<MainLayout header={<Header />} />}>
          <Route path="about" element={<AboutPage />} />
        </Route>
        <Route element={<AuthProtector isRedirectAuthorized={false} redirectPath="/auth" />}>
          <Route element={<MainLayout header={<Header />} />}>
            <Route index element={<Navigate to="/profile" replace />} />
            <Route path="readings" element={<ReadingsPage />} />
            <Route path="accruals" element={<AccrualsPage />} />
            <Route path="applications" element={<ApplicationsPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="news" element={<NewsPage />} />
          </Route>
        </Route>
        <Route element={<MainLayout />}>
          <Route path="agreement" element={<AgreementPage />}></Route>
        </Route>
        <Route element={<AuthProtector isRedirectAuthorized={true} redirectPath="/profile" />}>
          <Route element={<MainLayout />}>
            <Route path="auth" element={<AuthPage />}></Route>
          </Route>
        </Route>
        <Route path="error" element={<ErrorPage />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/readings">
            <Route element={<Popup />}>
              <Route path="meter/add" element={<AddMeter />} />
            </Route>
          </Route>
          <Route path="/accruals">
            <Route element={<Popup />}>
              <Route path=":id" element={<AccrualsPopup />} />
            </Route>
          </Route>
          <Route path="/profile/properties">
            <Route element={<Popup />}>
              <Route path="add" element={<AddPropertyPopup />} />
              <Route path="edit/:id" element={<EditPropertyPopup />} />
            </Route>
          </Route>
          <Route path="/applications">
            <Route element={<Popup />}>
              <Route path=":id" element={<ApplicationPopup />} />
            </Route>
          </Route>
          <Route path="/services">
            <Route element={<Popup />}>
              <Route path="create/:id" element={<CreateServicePopup />} />
              <Route path=":id" element={<ServicePopup />} />
            </Route>
          </Route>
        </Routes>
      )}
    </>
  );
};

export default App;
