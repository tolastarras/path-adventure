import { AlertBox } from '@/components';
import { GAME_RESULTS } from '@/utils/constants';

const GameStatus = ({ gameStatus, playerMoves, onClose }) => {
  if (gameStatus === 'lost' || gameStatus === 'won') {
    const gameResult = GAME_RESULTS[gameStatus];
    const { title, description, variant } = gameResult;

    return (
      <AlertBox
        variant={variant}
        title={title}
        description={description}
        onClose={onClose}
      >

        <span className="text-5xl font-bold text-center mt-2 animate-pulse">
          +{Math.max(1, 15 - playerMoves.length)} points! ✨
        </span>

      </AlertBox>
    );
  }
  
  return null;
};

export default GameStatus;
