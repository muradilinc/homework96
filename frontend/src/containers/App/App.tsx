import Layout from '../../components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import RegisterPage from '../Register/RegisterPage';
import LoginPage from '../Login/LoginPage';
import NotFoundPage from '../NotFound/NotFoundPage';
import NewCocktailPage from '../NewCocktail/NewCocktailPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../store/users/usersSlice';
import MyCocktailsPage from '../MyCocktails/MyCocktailsPage';
import AdminPage from '../Admin/AdminPage';
import CocktailPage from '../Cocktail/CocktailPage';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cocktails/:id" element={<CocktailPage />} />
          <Route
            path="/new-cocktail"
            element={
              <ProtectedRoute isAllowed={!!user}>
                <NewCocktailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-cocktails"
            element={
              <ProtectedRoute isAllowed={!!user}>
                <MyCocktailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
