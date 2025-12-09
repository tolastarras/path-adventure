import { useEffect, useRef, useMemo } from 'react';
import { AlertBox } from '@/components';
import { calculateScore } from '@/utils/gameLogic';
import { gameResultsHeading } from '@/utils/helpers';
import { updateScoreStats } from '@/utils/storage';

const GameStatus = ({ gameStatus, playerMoves, currentPath, onClose }) => {
  const hasStoredResult = useRef(false);

  const gameResult = useMemo(() => {
    if (gameStatus !== 'lost' && gameStatus !== 'won') {
      return null;
    }

    return calculateScore(gameStatus, playerMoves, currentPath);
  },[gameStatus, playerMoves, currentPath]);

  useEffect(() => {
    if (gameResult && !hasStoredResult.current) {
      const { points, stats } = gameResult;

      const storageResult = {
        userId: 'TOLAS',
        score: points.total,
        moves: playerMoves.length,
        correctPathLength: currentPath.length,
        accuracy: stats.percentage,
        status: gameStatus
      }

      updateScoreStats(storageResult);

      hasStoredResult.current = true;
    }
  }, [gameStatus, gameResult, playerMoves, currentPath]);

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
        <p className="text-2xl py-3">Path accuracy: {stats.percentage}% </p>
        <span className="mr-3 animate-pulse duration-1000">✨</span>
        You earned +{points.total} point{points.total > 1 && 's'}
        <span className="ml-3 animate-pulse duration-1000">✨</span>
      </div>
    </AlertBox>
  );
};

export default GameStatus;
