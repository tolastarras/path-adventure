import { useEffect, useRef, useMemo } from 'react';
import { AlertBox } from '@/components';
import { useAuthManager } from '@/hooks';
import { calculateScore } from '@/utils/gameLogic';
import { gameResultsHeading } from '@/utils/helpers';
import { updateScoreStats } from '@/utils/storage';
import { gameMessages } from '@/utils/constants';

const GameStatus = ({ gameStatus, playerMoves, currentPath, onClose }) => {
  const hasStoredResult = useRef(false);
  const { isAuthenticated, user } = useAuthManager();

  const gameResult = useMemo(() => {
    if (gameStatus !== 'lost' && gameStatus !== 'won') {
      return null;
    }

    return calculateScore(gameStatus, playerMoves, currentPath);
  },[gameStatus, playerMoves, currentPath]);

  useEffect(() => {
    // Only store authenticated users results
    if (isAuthenticated && gameResult && !hasStoredResult.current) {
      const { points, stats } = gameResult;
      const { id, avatar, password } = user;

      const storageResult = {
        userId: id,
        avatar,
        password,
        score: points.total,
        moves: playerMoves.length,
        correctPathLength: currentPath.length,
        accuracy: stats.percentage,
        status: gameStatus
      }

      updateScoreStats(storageResult);
      hasStoredResult.current = true;
    }
  }, [
    gameStatus,
    gameResult,
    playerMoves,
    currentPath,
    isAuthenticated,
    user,
  ]);

  if (!gameResult) return null;

  const { points, stats } = gameResult;
  const { title, variant, description } = gameResultsHeading(stats);

  return (
    <AlertBox
      variant={variant}
      title={title}
      description={description}
      onClose={onClose}
    >
      <div className="text-3xl font-bold text-center">
        <p className="text-2xl py-4">Path accuracy: {stats.percentage}% </p>
        <span className="mr-3 animate-pulse duration-1000">✨</span>
        You earned +{points.total} point{points.total > 1 && 's'}
        <span className="ml-3 animate-pulse duration-1000">✨</span>
        {!isAuthenticated &&
          <p className="text-xs mt-6 p-2 px-2 border-2 rounded-md bg-white/20">
            {gameMessages.guestAccountMessage}
          </p>
        }
      </div>
    </AlertBox>
  );
};

export default GameStatus;
