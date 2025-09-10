import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UsersAPI } from '../../api/users';
import AgreementModal from '../../components/AgreementModal';
import './AuthPage.css';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '', general: '' });
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);
  const { login, register } = useAuth();

  const validateForm = () => {
    const newErrors = { email: '', password: '', confirmPassword: '' };
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Некорректный формат email';
      isValid = false;
    }

    if (password.length <= 4) {
      newErrors.password = 'Пароль должен быть длиннее 4 символов';
      isValid = false;
    }

    if (!isLoginTab && password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const profile = UsersAPI.getProfile(email);
        if (!profile || profile.password !== password) {
          throw new Error('Неверный email или пароль');
        }
        login('fake-jwt-token', email);
      } catch (error) {
        setErrors({ ...errors, general: error.message });
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (password !== confirmPassword) {
        setErrors({ ...errors, confirmPassword: 'Пароли не совпадают' });
        return;
      }

      const errorMessage = register(email, password);
      if (errorMessage) {
        setErrors({ ...errors, general: errorMessage });
      } else {
        login('fake-jwt-token', email);
      }
    }
  };

  const openAgreementModal = () => {
    setIsAgreementModalOpen(true);
  };

  const closeAgreementModal = () => {
    setIsAgreementModalOpen(false);
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

        <form onSubmit={isLoginTab ? handleLogin : handleRegister}>
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
                style={!isLoginTab ? { marginLeft: '4px' } : {}} 
              />
              <img 
                className="auth-mail-icon" 
                src="/assets/img/email-icon.svg" 
                alt="Email" 
                style={!isLoginTab ? { left: '-25px' } : {}} 
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
                style={!isLoginTab ? { marginLeft: '4px' } : {}} 
              />
              <img 
                className="auth-password-icon" 
                src="/assets/img/password-icon.svg" 
                alt="Password" 
                style={!isLoginTab ? { left: '-30px' } : {}} 
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {/* Поле Подтверждения пароля (только для регистрации) */}
            {!isLoginTab && (
              <div className={`auth-input-container ${errors.confirmPassword ? 'has-error' : ''}`}>
                <input
                  type="password"
                  placeholder="Подтвердите пароль"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrors(prev => ({ ...prev, confirmPassword: '' }));
                  }}
                  className={errors.confirmPassword ? 'input-error' : ''}
                  style={{ marginLeft: '4px' }} 
                />
                <img 
                  className="auth-password-icon" 
                  src="/assets/img/password-icon.svg" 
                  alt="Confirm Password" 
                  style={{ left: '-30px' }} 
                />
                {errors.confirmPassword && (
                  <span className="error-message">{errors.confirmPassword}</span>
                )}
              </div>
            )}
          </div>

          <div className="auth-buttons">
            {/* Кнопка отправки формы */}
            <div className='decor-line'>
              <button className="auth-enter" type="submit">
                {isLoginTab ? 'Войти' : 'Зарегистрироваться'}
              </button>
            </div>

            {/* Общая ошибка */}
            {errors.general && (
              <div className="general-error">{errors.general}</div>
            )}

            {/* Кнопка VK */}
            <button type="button" className="auth-google-button">
              <img 
                className="auth-google-icon" 
                src="/assets/img/vk-icon.svg" 
                alt="Google" 
              />
              Продолжить с <b>VK ID</b>
            </button>

            {/* Текст с соглашением */}
            {!isLoginTab && (
              <div className="agreement-text">
                Регистрируясь в нашем сервисе,<br></br>вы соглашаетесь на условия{' '}
                <a href="#agreement" onClick={openAgreementModal}>пользовательского соглашения</a>.
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Модальное окно с пользовательским соглашением */}
      <AgreementModal
        isOpen={isAgreementModalOpen}
        onClose={closeAgreementModal}
      />
    </div>
  );
}
