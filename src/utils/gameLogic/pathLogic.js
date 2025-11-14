import { isSegmentInPath } from '@/utils/helpers';
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

export const findCorrectSegments = (playerMoves, correctPath) => {
  if (!playerMoves || !correctPath) return 0;
  
  // Convert player moves to coordinates
  const playerCoords = convertMovesToCoordinates(playerMoves, correctPath);
  let correctSegments = 0;
  
  // Compare each segment of player's path with correct path
  for (let i = 0; i < playerCoords.length - 1; i++) {
    const playerSegment = [playerCoords[i], playerCoords[i + 1]];
    
    // Check if this segment exists in the correct path
    if (isSegmentInPath(playerSegment, correctPath)) {
      correctSegments++;
    }
  }
  
  return correctSegments;
};

export const convertMovesToCoordinates = (moves, correctPath) => {
  if (!correctPath || correctPath.length === 0) return [];
  
  const startCell = correctPath[0];
  let x = startCell.x;
  let y = startCell.y;
  
  const coordinates = [{ x, y }];

  moves.forEach(move => {
    const match = move.match(/(\d+)([→←↑↓])/);
    if (!match) return;

    const [, countStr, direction] = match;
    const count = parseInt(countStr, 10);

    for (let i = 0; i < count; i++) {
      switch (direction) {
        case '→': x += 1; break;
        case '←': x -= 1; break;
        case '↑': y -= 1; break;
        case '↓': y += 1; break;
      }
      coordinates.push({ x, y });
    }
  });

  return coordinates;
};
