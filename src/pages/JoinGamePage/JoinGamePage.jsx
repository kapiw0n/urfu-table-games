import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NavigationSidebar from '../../components/NavigationSidebar';
import { GamesAPI } from '../../api/games';
import { UsersAPI } from '../../api/users';
import './JoinGamePage.css';

const POPULAR_GAMES = [
  {
    id: 2,
    title: 'Uno',
    image: '/assets/games/uno.jpg',
    genre: 'Карточная'
  },
  {
    id: 3,
    title: 'Карты',
    image: '/assets/games/cards.jpg',
    genre: 'Карточная'
  },
  {
    id: 4,
    title: 'Шахматы',
    image: '/assets/games/chess.jpg',
    genre: 'Стратегическая'
  },
  {
    id: 5,
    title: 'Шашки',
    image: '/assets/games/checkers.jpg',
    genre: 'Стратегическая'
  },
  {
    id: 6,
    title: 'Нарды',
    image: '/assets/games/backgammon.jpg',
    genre: 'Стратегическая'
  },
  {
    id: 7,
    title: 'Мафия',
    image: '/assets/games/mafia.jpg',
    genre: 'Социальная'
  },
  {
    id: 8,
    title: 'Монополия',
    image: '/assets/games/monopoly.jpg',
    genre: 'Экономическая'
  },
  {
    id: 9,
    title: 'Дженга',
    image: '/assets/games/jenga.jpg',
    genre: 'Активная'
  },
  {
    id: 10,
    title: 'Dungeons & Dragons',
    image: '/assets/games/dnd.jpg',
    genre: 'Ролевая'
  },
  {
    id: 11,
    title: 'Каркассон',
    image: '/assets/games/carcassonn.jpg',
    genre: 'Стратегическая'
  },
  {
    id: 12,
    title: 'Бункер',
    image: '/assets/games/bunker.jpg',
    genre: 'Социальная'
  },
  {
    id: 13,
    title: 'Пандемия',
    image: '/assets/games/pandemic.jpg',
    genre: 'Стратегическая'
  },
  {
    id: 14,
    title: 'Эрудит',
    image: '/assets/games/scrabble.jpg',
    genre: 'Логическая'
  },
  {
    id: 15,
    title: 'Алиас',
    image: '/assets/games/alias.jpg',
    genre: 'Социальная'
  },
  {
    id: 16,
    title: 'Имаджинариум',
    image: '/assets/games/imaginarium.jpg',
    genre: 'Креативная'
  },
  {
    id: 17,
    title: 'Свинтус',
    image: '/assets/games/svintus.jpg',
    genre: 'Карточная'
  },
  {
    id: 18,
    title: 'Крокодил',
    image: '/assets/games/crocodile.jpg',
    genre: 'Активная'
  },
  {
    id: 1,
    title: 'Добавить свою игру',
    image: '/assets/games/custom.jpg',
    genre: ''
  },
];

export default function JoinGamePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [availableGames, setAvailableGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    date: '',
    customType: '',
    customLocation: ''
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);
  const filterButtonRef = useRef(null);

  // Загрузка доступных игр
  useEffect(() => {
    GamesAPI.initializeTestGames();
    
    const handleGamesUpdate = () => {
      const games = GamesAPI.getAll();
      const filtered = games.filter(game => 
        game.admin !== user?.email &&
        !game.players.includes(user?.email) &&
        game.players.length < game.maxPlayers
      );
      const uniqueGames = [...new Map(filtered.map(g => [g.id, g])).values()];
      setAvailableGames(uniqueGames);
    };

    handleGamesUpdate();
    window.addEventListener('games-updated', handleGamesUpdate);
    window.addEventListener('storage', handleGamesUpdate);

    return () => {
      window.removeEventListener('games-updated', handleGamesUpdate);
      window.removeEventListener('storage', handleGamesUpdate);
    };
  }, [user?.email]);

  // Закрытие фильтра при клике вне меню
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isFilterOpen && filterRef.current && !filterRef.current.contains(event.target) && !filterButtonRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  // Функция для присоединения к игре
  const handleJoinGame = (gameId) => {
    const games = GamesAPI.getAll().map(game => 
      game.id === gameId ? {
        ...game,
        players: [...new Set([...game.players, user.email])]
      } : game
    );
    GamesAPI.save(games);
    navigate('/main');
  };

  // Обновляем функцию фильтрации
  const filterGames = (games) => {
    return games.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = !filters.type || 
        game.type.toLowerCase() === filters.type.toLowerCase() ||
        (filters.customType && game.type.toLowerCase().includes(filters.customType.toLowerCase()));

      const matchesLocation = !filters.location || 
        game.location.toLowerCase().includes(filters.location.toLowerCase()) ||
        (filters.customLocation && game.location.toLowerCase().includes(filters.customLocation.toLowerCase()));

    // Дата
    const gameDate = new Date(game.date).toISOString().split('T')[0];
    const filterDate = filters.date ? filters.date.split('T')[0] : null;
    const matchesDate = !filterDate || gameDate === filterDate;

      return matchesSearch && matchesType && matchesLocation && matchesDate;
    });
  };

  return (
    <div className="join-page-container">
      <NavigationSidebar />
      
      <div className="join-content">
        <h1>Доступные игры</h1>
        <div className="content-container">
          {/* Поиск и фильтры */}
          <div className="search-and-filters">
            <div className="search-container">
              <input
                type="text"
                placeholder="Поиск по названию комнаты"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery === '' && (
                <img src="/assets/img/search-icon.svg" alt="Поиск" className="search-icon" />
              )}
            </div>

            <div className="filter-icon" ref={filterButtonRef} onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <img src="/assets/img/filter-icon.svg" alt="Фильтр" />
              <span>Фильтр</span>
            </div>

            {isFilterOpen && (
              <div className="filter-dropdown" ref={filterRef}>
                <div className="filter-group">
                  <label>Тип игры:</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value, customType: '' })}
                  >
                    <option value="">Все</option>
                    {POPULAR_GAMES.filter(game => game.title !== 'Добавить свою игру').map((game) => (
                      <option key={game.id} value={game.title}>
                        {game.title}
                      </option>
                    ))}
                    <option value="custom">Другое</option>
                  </select>

                  {filters.type === 'custom' && (
                    <input
                      type="text"
                      value={filters.customType}
                      onChange={(e) => setFilters({ ...filters, customType: e.target.value })}
                      placeholder="Введите тип игры"
                    />
                  )}
                </div>

                <div className="filter-group">
                  <label>Место:</label>
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value, customLocation: '' })}
                  >
                    <option value="">Все</option>
                    <option value="ГУК">Главный учебный корпус</option>
                    <option value="УГИ">Уральский Гуманитарный Институт</option>
                    <option value="ИРИТ-РТФ">Институт Радиоэлектронники и Информационных Технологий - РТФ</option>
                    <option value="ФТИ">Физико-Технологический Институт</option>
                    <option value="ХТИ">Химико-Технологический Институт</option>
                    <option value="custom">Другое место</option>
                  </select>

                  {filters.location === 'custom' && (
                    <input
                      type="text"
                      value={filters.customLocation}
                      onChange={(e) => setFilters({ ...filters, customLocation: e.target.value })}
                      placeholder="Введите место проведения"
                    />
                  )}
                </div>

                <div className="filter-group">
                  <label>Дата:</label>
                  <input
                    type="date"
                    value={filters.date}
                    onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Таблица комнат */}
          <div className="games-table">
            <table>
              <thead>
                <tr>
                  <th>Место</th>
                  <th>Название комнаты</th>
                  <th>Игра</th>
                <th>Дата</th>
                  <th>Создатель</th>
                </tr>
              </thead>
              <tbody>
                {filterGames(availableGames).map(game => (
                  <tr 
                    key={game.id}
                    onClick={() => handleJoinGame(game.id)}
                    className="game-row"
                  >
                    <td>{game.location}</td>
                    <td>{game.name}</td>
                    <td><span>{game.type}</span></td>
                    <td>
                      {new Date(game.date).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long'
                      })}
                    </td>
                    <td>
                      <div className="creator-info">
                        <img 
                          src={UsersAPI.getProfile(game.admin).avatar || '/assets/img/avatar-default.png'} 
                          alt="Создатель" 
                          className="creator-avatar"
                        />
                        <span>
                          {(() => {
                            const profile = UsersAPI.getProfile(game.admin);
                            return profile.nickname && profile.nickname.trim() !== '' 
                              ? profile.nickname 
                              : game.admin;
                          })()}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filterGames(availableGames).length === 0 && (
            <div className="no-games">
              {availableGames.length === 0 ? (
                <p>Нет доступных игр</p>
              ) : (
                <p>Нет доступных игр по вашему запросу</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
