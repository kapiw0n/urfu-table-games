import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AuthPage.css';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoginTab, setIsLoginTab] = useState(true);
  const { login } = useAuth();

  // Валидация формы
  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Некорректный формат email';
      isValid = false;
    }

    // Проверка пароля
    if (password.length <= 4) {
      newErrors.password = 'Пароль должен быть длиннее 4 символов';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Заглушка для API-запроса
        const fakeResponse = await new Promise(resolve => 
          setTimeout(() => resolve({ 
            token: 'fake-jwt-token',
            user: { email }
          }), 1000)
        );

        login(fakeResponse.token);
      } catch (error) {
        setErrors({ ...errors, general: 'Ошибка авторизации' });
      }
    }
  };

  return (
    <div className="auth-content">
      <h1 className="auth-heading">Настольные игры УрФУ</h1>

      <div className="auth-panel">
        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLoginTab ? 'auth-tab-active' : 'auth-tab-inactive'}`}
            onClick={() => setIsLoginTab(true)}
          >
            Вход
          </button>
          <button
            className={`auth-tab ${!isLoginTab ? 'auth-tab-active' : 'auth-tab-inactive'}`}
            onClick={() => setIsLoginTab(false)}
          >
            Регистрация
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="auth-inputs">
            {/* Поле Email */}
            <div className={`auth-input-container ${errors.email ? 'has-error' : ''}`}>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors(prev => ({ ...prev, email: '' }));
                }}
                className={errors.email ? 'input-error' : ''}
              />
              <img 
                className="auth-mail-icon" 
                src="/assets/img/email-icon.svg" 
                alt="Email" 
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Поле Пароль */}
            <div className={`auth-input-container ${errors.password ? 'has-error' : ''}`}>
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors(prev => ({ ...prev, password: '' }));
                }}
                className={errors.password ? 'input-error' : ''}
              />
              <img 
                className="auth-password-icon" 
                src="/assets/img/password-icon.svg" 
                alt="Password" 
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
          </div>

          {/* Чекбокс "Запомнить меня" только для входа */}
          {isLoginTab && (
            <div className="auth-rememberbox">
              <input 
                className="auth-checkbox" 
                type="checkbox" 
                id="remember" 
              />
              <label htmlFor="remember" className="auth-remember">
                Запомнить меня
              </label>
            </div>
          )}

          <div className="auth-buttons">
            {/* Кнопка отправки формы */}
            <div className='decor-line'>
              <button className="auth-enter" type="submit">
                {isLoginTab ? 'Войти' : 'Зарегистрироваться'}
              </button>
            </div>

            {/* Ссылка "Забыли пароль?" только для входа */}
            {isLoginTab && (
              <a href="#forgot" className="auth-restore-password">
                Забыли пароль?
              </a>
            )}

            {/* Общая ошибка */}
            {errors.general && (
              <div className="general-error">{errors.general}</div>
            )}

            {/* Кнопка Google */}
            <button type="button" className="auth-google-button">
              <img 
                className="auth-google-icon" 
                src="/assets/img/google-icon.svg" 
                alt="Google" 
              />
              Продолжить с <b>Google</b>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}