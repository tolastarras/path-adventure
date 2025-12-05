import { gridSize } from '@/utils/constants';

export const reconstructPlayerPath = (playerMoves, path) => {
  let reconstructedPath = [{ x: path[0].x, y: path[0].y }];
  let currentX = path[0].x;
  let currentY = path[0].y;

  playerMoves.forEach(move => {
    const count = parseInt(move.match(/\d+/)[0]);
    const direction = move.match(/[↑→←↓]/)[0];
    
    const directionMap = {
      '↑': { dx: 0, dy: -1 },
      '→': { dx: 1, dy: 0 },
      '←': { dx: -1, dy: 0 },
      '↓': { dx: 0, dy: 1 }
    };

    const { dx, dy } = directionMap[direction];
    
    for (let i = 0; i < count; i++) {
      currentX += dx;
      currentY += dy;
      // Check bounds
      if (currentX >= 0 && currentX < gridSize && currentY >= 0 && currentY < gridSize) {
        reconstructedPath.push({ x: currentX, y: currentY });
      }
    }
  });

  return reconstructedPath;
};

export const countMatchingSegments = (playerPath, originalPath) => {
  if (!playerPath?.length || !originalPath?.length) {
    return 0;
  }

  const minLength = Math.min(playerPath.length, originalPath.length);
  let matchCount = 0;

  for (let i = 0; i < minLength; i++) {
    const playerPoint = playerPath[i];
    const originalPoint = originalPath[i];
    
    const isMatch = playerPoint.x === originalPoint.x && playerPoint.y === originalPoint.y;

    if (isMatch) {
      matchCount++;
    }
  }

  return matchCount;
};

export const getPathMatchingStats = (playerPath, originalPath) => {
  if (!playerPath?.length || !originalPath?.length) {
    return { matches: 0, total: 0, percentage: 0 };
  }

  const minLength = Math.min(playerPath.length, originalPath.length);
  const totalSegments = originalPath.length;

  let matchCount = 0;

  for (let i = 0; i < minLength; i++) {
    const playerPoint = playerPath[i];
    const originalPoint = originalPath[i];

    const isMatch = playerPoint.x === originalPoint.x && playerPoint.y === originalPoint.y;

    // Matching segments
    if (isMatch) {
      matchCount++;
    }
  }

  return {
    matches: matchCount,
    total: totalSegments,
    percentage: Math.round((matchCount / totalSegments) * 100),
  };
};
