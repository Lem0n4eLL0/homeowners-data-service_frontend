import { Route, Routes } from 'react-router';
import { MainLayout } from '@layouts/MainLayout';
import { AuthPage } from '@pages/AuthPage';

const App = () => {
  // git commit -m 'Настройка основыных путей (клиентский роутинг)'
  return (
    <Routes>
      <Route element={<MainLayout header={<div>Header</div>} />}>
        <Route path="readings" element={<div>Показания</div>} />
        <Route path="accruals" element={<div>Начисления</div>} />
        <Route path="applications" element={<div>Заявки</div>} />
        <Route path="services" element={<div>Услуги</div>} />
        <Route path="profile" element={<div>Профиль</div>} />
        <Route path="news" element={<div>Новости</div>} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="auth" element={<AuthPage />}></Route>
      </Route>
      <Route path="*" element={<div>Error page</div>}></Route>
    </Routes>
  );
};

export default App;
