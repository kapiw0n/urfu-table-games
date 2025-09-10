// ВНИМАНИЕ! Моковый API
export const UsersAPI = {
  // Сохранение профиля
  saveProfile: (userId, profileData) => {
    const profiles = JSON.parse(localStorage.getItem('profiles')) || {};
    profiles[userId] = profileData;
    localStorage.setItem('profiles', JSON.stringify(profiles));
  },

  getProfile: (userId) => {
    const profiles = JSON.parse(localStorage.getItem('profiles')) || {};
    return profiles[userId] || {};
  },

  // Проверка существования пользователя
  userExists: (email) => {
    const profiles = JSON.parse(localStorage.getItem('profiles')) || {};
    return !!profiles[email];
  },

  // Получение всех профилей
  getAllProfiles: () => {
    return JSON.parse(localStorage.getItem('profiles')) || {};
  },
};