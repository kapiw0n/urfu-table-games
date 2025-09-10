import React, { createContext, useContext, useState } from 'react';
import { UsersAPI } from '../api/users';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token, email) => {
    const profile = UsersAPI.getProfile(email);
    if (profile) {
      setUser({ ...profile, token });
    } else {
      console.error('Профиль не найден');
    }
  };

  const register = (email, password, nickname) => {
    if (UsersAPI.userExists(email)) {
      return 'Пользователь с таким email уже существует';
    }

    const profileData = {
      nickname,
      email,
      password,
      vkLink: 'https://vk.com/',
      avatar: '/assets/img/avatar-default.png',
    };

    UsersAPI.saveProfile(email, profileData);
    return null;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);