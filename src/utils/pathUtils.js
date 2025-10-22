import { GRID_SIZE } from './constants';

export const isValidPosition = (x, y) => 
  x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE;

export const isOnEdge = (x, y) => 
  x === 0 || x === GRID_SIZE - 1 || y === 0 || y === GRID_SIZE - 1;

export const generateRandomPath = () => {
  let newPath = [];
  let attempts = 0;
  
  while ((newPath.length < 7 || !isValidEndPosition(newPath)) && attempts < 100) {
    newPath = [];
    let currentX = Math.floor(Math.random() * GRID_SIZE);
    let currentY = GRID_SIZE - 1; // Start from bottom
    
    const startPos = { x: currentX, y: currentY };
    newPath.push(startPos);

    const isStartPosition = (x, y) => 
      x === startPos.x && y === startPos.y;

    let steps = 0;
    const maxSteps = 15;
    
    while (!(isOnEdge(currentX, currentY) && !isStartPosition(currentX, currentY)) || steps < 6) {
      if (steps >= maxSteps) break;
      
      const directions = [
        { dx: 0, dy: -1 }, // up
        { dx: 1, dy: 0 },  // right
        { dx: -1, dy: 0 }, // left
        { dx: 0, dy: 1 }   // down
      ].filter(dir => {
        const newX = currentX + dir.dx;
        const newY = currentY + dir.dy;
        return isValidPosition(newX, newY) && 
               !newPath.some(step => step.x === newX && step.y === newY);
      });

      if (directions.length === 0) break;

      const randomDir = directions[Math.floor(Math.random() * directions.length)];
      currentX += randomDir.dx;
      currentY += randomDir.dy;
      
      newPath.push({ x: currentX, y: currentY });
      steps++;

      // If we reach an edge and it's not the start, we can end here
      if (isOnEdge(currentX, currentY) && !isStartPosition(currentX, currentY) && steps >= 6) {
        break;
      }
      
      // If we're getting close to max steps, try to move towards an edge
      if (steps >= maxSteps - 3) {
        const edgeDirections = directions.filter(dir => {
          const newX = currentX + dir.dx;
          const newY = currentY + dir.dy;
          return isValidPosition(newX, newY) && isOnEdge(newX, newY);
        });
        
        if (edgeDirections.length > 0) {
          const edgeDir = edgeDirections[Math.floor(Math.random() * edgeDirections.length)];
          currentX += edgeDir.dx;
          currentY += edgeDir.dy;
          newPath.push({ x: currentX, y: currentY });
          steps++;
          break;
        }
      }
    }
    attempts++;
  }

  // Final check: if we didn't end on an edge, force it
  const lastPos = newPath[newPath.length - 1];
  const startPos = newPath[0];
  const isStartPosition = (x, y) => 
    x === startPos.x && y === startPos.y;

  if (!isOnEdge(lastPos.x, lastPos.y) || isStartPosition(lastPos.x, lastPos.y)) {
    const directions = [
      { dx: 0, dy: -1 }, // up
      { dx: 1, dy: 0 },  // right
      { dx: -1, dy: 0 }, // left
      { dx: 0, dy: 1 }   // down
    ].filter(dir => {
      const newX = lastPos.x + dir.dx;
      const newY = lastPos.y + dir.dy;
      return isValidPosition(newX, newY) && isOnEdge(newX, newY) && 
             !isStartPosition(newX, newY);
    });
    
    if (directions.length > 0) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      newPath.push({ 
        x: lastPos.x + dir.dx, 
        y: lastPos.y + dir.dy 
      });
    }
  }

  return newPath;
};

const isValidEndPosition = (path) => {
  if (path.length < 2) return false;
  
  const start = path[0];
  const end = path[path.length - 1];
  const isStartPosition = (x, y) => 
    x === start.x && y === start.y;
  
  return isOnEdge(end.x, end.y) && !isStartPosition(end.x, end.y);
};
