// ВНИМАНИЕ! Моковый API
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
    title: 'Угадай, Кто?',
    image: '/assets/games/guess_who.jpg',
    genre: 'Логическая'
  },
  {
    id: 17,
    title: 'Имаджинариум',
    image: '/assets/games/imaginarium.jpg',
    genre: 'Креативная'
  },
  {
    id: 18,
    title: 'Свинтус',
    image: '/assets/games/svintus.jpg',
    genre: 'Карточная'
  },
  {
    id: 19,
    title: 'Крокодил',
    image: '/assets/games/crocodile.jpg',
    genre: 'Активная'
  },
  {
    id: 1,
    title: 'Добавить свою игру',
    image: '/assets/games/custom.jpg',
    genre: 'Другая'
  },
];

export const GamesAPI = {
  getAll: () => {
    const games = JSON.parse(localStorage.getItem('games')) || [];
    return games.map(game => {
      if (!game.genre) {
        const popularGame = POPULAR_GAMES.find(pg => pg.title === game.type);
        if (popularGame) {
          game.genre = popularGame.genre;
        } else {
          game.genre = 'Другая'; 
        }
      }
      return game;
    });
  },
  add: (game) => {
    const existingGames = JSON.parse(localStorage.getItem('games')) || [];
    const updatedGames = [...existingGames, game];
    localStorage.setItem('games', JSON.stringify(updatedGames));
  },

  save(games) {
    localStorage.setItem('games', JSON.stringify(games));
    window.dispatchEvent(new Event('games-updated'));
  },

  initializeTestGames() {
    const TEST_GAMES = [
      {
        id: 1717592400000,
        name: 'Вечерние шахматы',
        type: 'Шахматы',
        location: 'ИРИТ-РТФ, аудитория 304',
        date: '2024-03-20T18:00:00.000Z',
        maxPlayers: 4,
        players: ['player1@example.com'],
        admin: 'admin@example.com'
      },
      {
        id: 1717592400001,
        name: 'Uno турнир',
        type: 'Uno',
        location: 'ГУК, холл 2 этаж',
        date: '2024-03-21T19:30:00.000Z',
        maxPlayers: 6,
        players: ['user3@example.com'],
        admin: 'user3@example.com'
      }
    ];

    const existingGames = this.getAll();
    const newGames = TEST_GAMES.filter(
      testGame => !existingGames.some(g => g.id === testGame.id)
    );
    
    if (newGames.length > 0) {
      this.save([...existingGames, ...newGames]);
    }
  }
};