import { AlertBox } from '@/components';
import { findCorrectSegments, calculateScore } from '@/utils/gameLogic';
import { gameResults } from '@/utils/constants';

const GameStatus = ({ gameStatus, playerMoves, correctPath, onClose }) => {
  if (gameStatus === 'lost' || gameStatus === 'won') {
    const correctSegments = findCorrectSegments(playerMoves, correctPath);
    const points = calculateScore(gameStatus, playerMoves, correctSegments);

    const gameResult = gameResults[gameStatus];
    const { title, variant } = gameResult;

    const description = gameStatus === 'won'
      ? gameResults.won.description(playerMoves.length)
      : gameResult.description(points);

    return (
      <AlertBox
        variant={variant}
        title={title}
        description={description}
        onClose={onClose}
      >
        {gameStatus === 'won' && (
          <div className="text-3xl font-bold text-center mt-2 animate-pulse">
            {/* +{Math.max(1, 15 - playerMoves.length)} points! ✨ */}
            You earned +{points.total} point{points.total > 1 && 's'} ✨
          </div>
        )}
      </AlertBox>
    );
  }
  
  return null;
};

export default GameStatus;
