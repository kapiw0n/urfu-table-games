import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import MainPage from './pages/MainPage/MainPage';
import { useAuth } from './context/AuthContext';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={
        !user ? <AuthPage /> : <Navigate to="/main" replace />
      } />
      
      <Route path="/main" element={
        user ? <MainPage /> : <Navigate to="/login" replace />
      } />
      
      <Route path="*" element={<Navigate to={user ? "/main" : "/login"} replace />} />
    </Routes>
  );
};

export default AppRoutes;