import { gridCols, gridRows, directionsMap } from '@/utils/constants';
import { isValidPosition, isOnEdge, isValidEndPosition } from '@/utils/helpers';

export const generateRandomPath = () => {
  const minSegmentPoints = 7;
  const maxNumberOfAttempts = 100;

  let newPath = [];
  let gamesPlayed = 0;
  
  // Convert directionsMap to array of direction objects for easy iteration
  const directionsArray = Object.values(directionsMap);
  const isPathInvalid = newPath.length < minSegmentPoints || !isValidEndPosition(newPath);

  while (isPathInvalid && gamesPlayed < maxNumberOfAttempts) {
    newPath = [];
    let currentX = Math.floor(Math.random() * gridCols);
    let currentY = gridRows - 1; // Start from bottom row
    
    const startPos = { x: currentX, y: currentY };
    newPath.push(startPos);

    const isStartPosition = (x, y) => 
      x === startPos.x && y === startPos.y;

    let steps = 0;
    const maxSteps = 25;
    
    while (!(isOnEdge(currentX, currentY) &&
      !isStartPosition(currentX, currentY)) || steps < 6) {
      if (steps >= maxSteps) break;
      
      // Filter available directions
      const directions = directionsArray.filter(dir => {
        const newX = currentX + dir.dx;
        const newY = currentY + dir.dy;
        return isValidPosition(newX, newY) && !newPath.some(step => step.x === newX && step.y === newY);
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
    gamesPlayed++;
  }

  // Final check: if we didn't end on an edge, force it
  const lastPos = newPath[newPath.length - 1];
  const startPos = newPath[0];
  const isStartPosition = (x, y) => 
    x === startPos.x && y === startPos.y;

  if (!isOnEdge(lastPos.x, lastPos.y) || isStartPosition(lastPos.x, lastPos.y)) {
    const directions = directionsArray.filter(dir => {
      const newX = lastPos.x + dir.dx;
      const newY = lastPos.y + dir.dy;
      return isValidPosition(newX, newY) &&
        isOnEdge(newX, newY) &&
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
