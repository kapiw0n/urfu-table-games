import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage/AuthPage';
import MainPage from './pages/MainPage/MainPage';
import CreateGamePage from './pages/CreateGamePage/CreateGamePage';
import JoinGamePage from './pages/JoinGamePage/JoinGamePage';
import LobbyPage from './pages/LobbyPage/LobbyPage';
import ProtectedLayout from './layouts/ProtectedLayout';
import ProfilePage from './pages/ProfilePage/ProfilePage';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const UnauthenticatedOnly = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/main" replace />;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<UnauthenticatedOnly><AuthPage /></UnauthenticatedOnly>} />
      
      <Route element={<ProtectedLayout />}>
        <Route path="/main" element={<MainPage />} />
        <Route path="/create-game" element={<CreateGamePage />} />
        <Route path="/join-game" element={<JoinGamePage />} />
        <Route path="/lobby/:gameId" element={<LobbyPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/main" replace />} />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}