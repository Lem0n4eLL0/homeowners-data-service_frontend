import { Navigate, Route, Routes } from 'react-router';
import { MainLayout } from '@layouts/MainLayout';
import { AuthPage } from '@pages/AuthPage';
import { AuthProtector } from '@/components/protectors/AuthProtector';

const App = () => {
  return (
    <Routes>
      <Route element={<AuthProtector isRedirectAuthorized={false} redirectPath="/auth" />}>
        <Route element={<MainLayout header={<div>Header</div>} />}>
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
