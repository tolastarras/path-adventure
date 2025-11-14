import { baseWinPoints, baseLosePoints } from '@/utils/constants';

export const calculateScore = (gameStatus, playerMoves, optimalMoves, correctSegments) => {
  if (gameStatus === 'won') {
    return {
      base: baseWinPoints,
      efficiency: Math.max(0, 50 - (playerMoves.length * 5)),
      perfect: playerMoves.length === optimalMoves ? 50 : 0,
      total: 100 + Math.max(0, 50 - (playerMoves.length * 5)) + (playerMoves.length === optimalMoves ? 50 : 0)
    };
  }

  return {
    base: baseLosePoints,
    progress: correctSegments * 2,
    total: Math.min(30, 10 + (correctSegments * 2))
  };
};
