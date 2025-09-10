import { Outlet } from 'react-router-dom';
import NavigationSidebar from '../components/NavigationSidebar';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import './ProtectedLayout.css';

export default function ProtectedLayout() {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="protected-layout">
      <NavigationSidebar />
      <div className="protected-content">
        <Outlet />
      </div>
    </div>
  );
}