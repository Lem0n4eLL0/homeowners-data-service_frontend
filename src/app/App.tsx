import { Route, Routes } from 'react-router';
import { MainLayout } from '@layouts/MainLayout';
import { AuthPage } from '@pages/AuthPage';

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<MainLayout header={<div>Header</div>} footer={<div>Footer</div>} />}
      >
        <Route index element={<div>Hello, world!</div>} />
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route path="auth" element={<AuthPage />}></Route>
      </Route>
      <Route path="*" element={<div>Error 404</div>}></Route>
    </Routes>
  );
};

export default App;
