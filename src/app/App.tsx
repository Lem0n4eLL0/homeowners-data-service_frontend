/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

import { Navigate, Route, Routes, useLocation } from 'react-router';
import { MainLayout } from '@layouts/MainLayout';
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
import { Popup } from '@/components/shells/Popup';
import { AddPropertyPopup } from '@/components/popups/AddPropertyPopup';
import { EditPropertyPopup } from '@/components/popups/EditPropertyPopup';
import { ApplicationPopup } from '@/components/popups/ApplicationPopup';
import { ServicesPage } from '@/components/pages/ServicesPage';
import { ServicePopup } from '@/components/popups/ServicePopup';
import { CreateServicePopup } from '@/components/popups/CreateServicePopup/CreateServicePopup';
import { AccrualsPage } from '@/components/pages/AccrualsPage';
import { AccrualsPopup } from '@/components/popups/AccrualsPopup';
import { AddMeter } from '@/components/popups/AddMeter';
import { AboutPage } from '@/components/pages/AboutPage';
import { AgreementPage } from '@/components/pages/AgreementPage';
import { NewsPage } from '@/components/pages/NewsPage';
import { ErrorPage } from '@/components/pages/ErrorPage';
import { TitleLinksLayout } from '@/components/layouts/TitleLayout';
import { PAGES_LINKS } from '@/common/constants';
import { CreateApplications } from '@/components/pages/ApplicationsPage/CreateApplications';
import { HistoryApplications } from '@/components/pages/ApplicationsPage/HistoryApplications';
import { ReadingsMeters } from '@/components/pages/ReadingsPage/ReadingsMeters';
import { ReadingsHistory } from '@/components/pages/ReadingsPage/ReadingsHistory';
import { CreateServices } from '@/components/pages/ServicesPage/CreateServices';
import { HistoryServices } from '@/components/pages/ServicesPage/HistoryServices';
import { ProfileRegistered } from '@/components/pages/ProfilePage/ProfileRegistered';
import { ProfileNotRegistered } from '@/components/pages/ProfilePage/ProfileNotRegistered';
import { AuthStepOne } from '@/components/pages/AuthPage/AuthStepOne';
import { AuthStepTwo } from '@/components/pages/AuthPage/AuthStepTwo';
import { AuthPage } from '@/components/pages/AuthPage';
import { RegistrationProtector } from '@/components/protectors/RegistrationProtector';

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
        <Route element={<MainLayout />}>
          <Route path="agreement" element={<AgreementPage />} />
        </Route>
        <Route element={<AuthProtector isRedirectAuthorized={false} redirectPath="/auth" />}>
          <Route element={<MainLayout header={<Header />} />}>
            <Route index element={<Navigate to="/profile" replace />} />

            <Route
              element={
                <RegistrationProtector isRedirectRegistration={true} redirectPath="/profile" />
              }
            >
              <Route element={<TitleLinksLayout title={PAGES_LINKS.PROFILE.title} />}>
                <Route path="profile/registration" element={<ProfileNotRegistered />} />
              </Route>
            </Route>

            <Route
              element={
                <RegistrationProtector
                  isRedirectRegistration={false}
                  redirectPath="/profile/registration"
                />
              }
            >
              <Route
                element={
                  <TitleLinksLayout
                    title={PAGES_LINKS.APPLICATION.title}
                    links={PAGES_LINKS.APPLICATION.links}
                  />
                }
              >
                <Route path="applications">
                  <Route index element={<Navigate to="create" replace />} />
                  <Route path="create" element={<CreateApplications />} />
                  <Route path="history" element={<HistoryApplications />} />
                </Route>
              </Route>

              <Route
                element={
                  <TitleLinksLayout
                    title={PAGES_LINKS.READINGS.title}
                    links={PAGES_LINKS.READINGS.links}
                  />
                }
              >
                <Route path="readings">
                  <Route index element={<Navigate to="/readings/meters" replace />} />
                  <Route path="meters" element={<ReadingsMeters />} />
                  <Route path="history" element={<ReadingsHistory />} />
                </Route>
              </Route>

              <Route
                element={
                  <TitleLinksLayout
                    title={PAGES_LINKS.SERVICES.title}
                    links={PAGES_LINKS.SERVICES.links}
                  />
                }
              >
                <Route path="services">
                  <Route
                    index
                    element={
                      <ServicesPage>
                        {' '}
                        <CreateServices />{' '}
                      </ServicesPage>
                    }
                  />
                  <Route
                    path="history"
                    element={
                      <ServicesPage>
                        {' '}
                        <HistoryServices />{' '}
                      </ServicesPage>
                    }
                  />
                </Route>
              </Route>

              <Route element={<TitleLinksLayout title={PAGES_LINKS.PROFILE.title} />}>
                <Route path="profile" element={<ProfileRegistered />} />
              </Route>

              <Route path="accruals" element={<AccrualsPage />} />
            </Route>

            <Route path="news" element={<NewsPage />} />
          </Route>
        </Route>

        <Route element={<AuthProtector isRedirectAuthorized={true} redirectPath="/profile" />}>
          <Route element={<MainLayout />}>
            <Route path="auth" element={<Navigate to="/auth-step-one" replace />}></Route>
            <Route
              path="auth-step-one"
              element={
                <AuthPage>
                  <AuthStepOne />
                </AuthPage>
              }
            ></Route>
            <Route
              path="auth-step-two"
              element={
                <AuthPage>
                  <AuthStepTwo />
                </AuthPage>
              }
            ></Route>
          </Route>
        </Route>
        <Route path="error" element={<ErrorPage />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/readings">
            <Route element={<Popup />}>
              <Route path="meters/add/:propertyId" element={<AddMeter />} />
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
              <Route path="history/:id" element={<ApplicationPopup />} />
            </Route>
          </Route>
          <Route path="/services">
            <Route element={<Popup />}>
              <Route path="create/:id" element={<CreateServicePopup />} />
              <Route path="history/:id" element={<ServicePopup />} />
            </Route>
          </Route>
        </Routes>
      )}
    </>
  );
};

export default App;
