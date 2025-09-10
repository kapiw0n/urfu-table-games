import { Outlet } from 'react-router-dom';
import NavigationSidebar from '../components/NavigationSidebar';
import './MainLayout.css';

export default function MainLayout() {
  return (
    <div className="main-layout">
      <NavigationSidebar />
      <div className="content-wrapper">
        <Outlet />
      </div>
    </div>
  );
}