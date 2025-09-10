import { Outlet } from 'react-router-dom';
import NavigationSidebar from '../components/NavigationSidebar';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import './NavigationLayout.css';

export default function NavigationLayout() {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="navigation-layout">
      <NavigationSidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}