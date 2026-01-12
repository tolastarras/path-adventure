import {
  baseWinPoints,
  participationPoints,
  correctSegmentPoints,
  partialWinAccuracyMultiplier,
} from '@/utils/constants';

import { countMatchingSegments, getPathMatchingStats } from '@/utils/gameLogic';
import { convertArrowMovesToCoordinates } from '@/utils/helpers';

export const calculateScore = (gameStatus, playerMoves, currentPath) => {
  // Convert player moves to coordinates
  const playerPath = convertArrowMovesToCoordinates(playerMoves, currentPath[0]);
  const correctSegments = countMatchingSegments(playerPath, currentPath);
  const stats = getPathMatchingStats(playerPath, currentPath);

  let correctMovesPoints = correctSegments * partialWinAccuracyMultiplier;
  let basePoints = participationPoints;

  if (gameStatus === 'won') {
    basePoints = baseWinPoints;
    correctMovesPoints = correctSegments * correctSegmentPoints;
  }
  return {
    points: {
      base: basePoints,
      correctMoves: correctMovesPoints,
      total: basePoints + correctMovesPoints,
    },
    correctSegments,
    stats,
  };
};
