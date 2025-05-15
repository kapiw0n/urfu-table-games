import { useAuth } from '../../context/AuthContext';

export default function MainPage() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Главная страница</h1>
      <p>Добро пожаловать, {user?.email || 'пользователь'}!</p>
      <button onClick={logout}>Выйти</button>
    </div>
  );
}