import { NavLink } from 'react-router-dom';
import './NavigationSidebar.css';

export default function NavigationSidebar() {
  return (
    <nav className="navigation-sidebar">
      <div className="sidebar-header">
        <h2>Настольные игры УрФУ</h2>
      </div>
      
      <div className="nav-items">
        <NavLink 
          to="/main" 
          className={({ isActive }) => 
            `nav-button ${isActive ? 'active' : ''}`
          }
        >
          <img className='sidebar-icon' src="/assets/img/sidebar-home-icon.svg" alt="Главная"></img>
          Главная
        </NavLink>
        
        <NavLink
          to="/create-game"
          className={({ isActive }) =>
            `nav-button ${isActive ? 'active' : ''}`
          }
        >
          <img className='sidebar-icon' src="/assets/img/sidebar-add-icon.svg" alt="Создать игру"></img>          
          Создать игру
        </NavLink>

        <NavLink
          to="/join-game"
          className={({ isActive }) =>
            `nav-button ${isActive ? 'active' : ''}`
          }
        >
          <img className='sidebar-icon' src="/assets/img/sidebar-search-icon.svg" alt="Поиск игр"></img>
        Присоединиться
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `nav-button ${isActive ? 'active' : ''}`
          }
        >
          <img className='sidebar-icon' src="/assets/img/sidebar-profile-icon.svg" alt="Профиль"></img>
          Личный профиль
        </NavLink>
      </div>

      <div className="sidebar-photo-container">
          <img 
            src="/assets/img/sidebar-photo.jpg" 
            alt="Фоновое изображение" 
            className="sidebar-photo"
          />
      </div>
    </nav>
  );
}