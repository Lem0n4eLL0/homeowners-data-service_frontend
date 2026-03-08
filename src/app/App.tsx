import { Navigate, Route, Routes } from 'react-router';
import { MainLayout } from '@layouts/MainLayout';
import { AuthPage } from '@pages/AuthPage';
import { AuthProtector } from '@/components/protectors/AuthProtector';
import { useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { getMe } from '@/api/api';
import {
  selectIsAuthInitializing,
  setIsAuthInitializing,
  setStepState,
} from '@/services/slices/auth';
import { Loader } from '@/components/shells/Loader';
import commonStyle from '@styles/common.module.scss';
import style from './App.module.scss';
import clsx from 'clsx';
import { Header } from '@/components/Header';

const App = () => {
  const dispatch = useAppDispatch();
  const isInitializing = useAppSelector(selectIsAuthInitializing);

  useLayoutEffect(() => {
    getMe()
      .then(() => {
        dispatch(setStepState('AuthCompleted'));
      })
      .catch(() => {})
      .finally(() => {
        dispatch(setIsAuthInitializing(false));
      });
  }, []);

  if (isInitializing) {
    return (
      <Loader loaderClass={clsx(commonStyle['loader_v2'], style['loader'])} isAbsolute={true} />
    );
  }

  return (
    <Routes>
      <Route element={<AuthProtector isRedirectAuthorized={false} redirectPath="/auth" />}>
        <Route element={<MainLayout header={<Header />} />}>
          <Route index element={<Navigate to="/profile" replace />} />
          <Route path="readings" element={<div>Показания</div>} />
          <Route path="accruals" element={<div>Начисления</div>} />
          <Route path="applications" element={<div>Заявки</div>} />
          <Route path="services" element={<div>Услуги</div>} />
          <Route path="profile" element={<div>Профиль</div>} />
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
  );
};

export default App;
