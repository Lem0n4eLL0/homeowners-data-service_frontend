import { Route, Routes } from 'react-router';
import { MainLayout } from '@layouts/MainLayout';
import { AuthStepOne } from '@pages/AuthStepOne';

const App = () => {
  return (
    <Routes>
      <Route
        index
        element={<MainLayout header={<div>Header</div>} footer={<div>Footer</div>} />}
      ></Route>
      <Route path="/" element={<MainLayout />}>
        <Route path="auth-step-one" element={<AuthStepOne />}></Route>
      </Route>
      <Route path="*" element={<div>Error 404</div>}></Route>
    </Routes>
  );
};

export default App;
