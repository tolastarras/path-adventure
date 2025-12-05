import { gridSize } from '@/utils/constants';

export const isValidPosition = (x, y) =>
  x >= 0 && x < gridSize && y >= 0 && y < gridSize;

export const isOnEdge = (x, y) => 
  x === 0 || x === gridSize - 1 || y === 0 || y === gridSize - 1;

export const isSegmentInPath = (segment, correctPath) => {
  for (let i = 0; i < correctPath.length - 1; i++) {
    const correctSegment = [correctPath[i], correctPath[i + 1]];
    if (segmentsMatch(segment, correctSegment)) {
      return true;
    }
  }
  return false;
};

const segmentsMatch = (seg1, seg2) => {
  return (
    seg1[0].x === seg2[0].x && seg1[0].y === seg2[0].y &&
    seg1[1].x === seg2[1].x && seg1[1].y === seg2[1].y
  );
};

export const isValidEndPosition = (path) => {
  if (path.length < 2) return false;
  
  const start = path[0];
  const end = path[path.length - 1];
  const isStartPosition = (x, y) => 
    x === start.x && y === start.y;
  
  return isOnEdge(end.x, end.y) && !isStartPosition(end.x, end.y);
};

