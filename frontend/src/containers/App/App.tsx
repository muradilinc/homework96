import Layout from '../../components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import RegisterPage from '../Register/RegisterPage';
import LoginPage from '../Login/LoginPage';
import NotFoundPage from '../NotFound/NotFoundPage';

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
