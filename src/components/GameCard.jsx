import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './GameCard.css';

export default function GameCard({ game }) {
  if (!game?.id || !game?.name) return null;
  const { user } = useAuth();
  const isAdmin = game.admin === user?.email;

  const getGameImage = (type) => {
    const images = {
      'Uno': '/assets/games/uno.jpg',
      'Карты': '/assets/games/cards.jpg',
      'Шахматы': '/assets/games/chess.jpg',
      'Шашки': '/assets/games/checkers.jpg',
      'Нарды': '/assets/games/backgammon.jpg',
      'Мафия': '/assets/games/mafia.jpg',
      'Монополия': '/assets/games/monopoly.jpg',
      'Дженга': '/assets/games/jenga.jpg',
      'Dungeons & Dragons': '/assets/games/dnd.jpg',
      'Каркассон': '/assets/games/carcassonn.jpg',
      'Бункер': '/assets/games/bunker.jpg',
      'Пандемия': '/assets/games/pandemic.jpg',
      'Эрудит': '/assets/games/scrabble.jpg',
      'Алиас': '/assets/games/alias.jpg',
      'Имаджинариум': '/assets/games/imaginarium.jpg',
      'Свинтус': '/assets/games/svintus.jpg',
      'Крокодил': '/assets/games/crocodile.jpg',
      'default': '/assets/games/custom.jpg'
    };

      return images[type] || images.default;
    };

  return (
    <Link to={`/lobby/${game.id}`} className="game-card">
      <img 
        src={getGameImage(game.type)} 
        alt={game.name} 
        className="game-card-image"
      />
      <div className="game-card-overlay">
        <h3 className="game-card-title">{game.name}</h3>
        {game.date && (
          <span className="game-card-date">
            {new Date(game.date).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }).replace(' г.', ' года')} {new Date(game.date).toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        )}
        <div className="game-card-info">
          {isAdmin && <span className="gamecard-admin-badge">Админ</span>}
          <span>{game.players.length}/{game.maxPlayers} игроков</span>
        </div>
      </div>
    </Link>
  );
}