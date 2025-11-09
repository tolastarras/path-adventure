import { useCallback } from 'react';
import { GRID_SIZE, TERRAIN_TYPES } from '@/utils/constants';

const useEnvironmentGeneration = () => {
  const generateEnvironmentGroups = useCallback((currentPath = [], groupCount = 15) => {
    const pathCells = new Set(currentPath.map(cell => `${cell.x},${cell.y}`));
    const usedCells = new Set(pathCells);
    const groups = [];

    const getRandomPosition = () => ({
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    });

    const isCellAvailable = (x, y) => {
      return !usedCells.has(`${x},${y}`) && 
        x >= 0 && x < GRID_SIZE && 
        y >= 0 && y < GRID_SIZE;
    };

    const getGroupPositions = (startX, startY, groupSize) => {
      const positions = [{ x: startX, y: startY }];
      usedCells.add(`${startX},${startY}`);

      const directions = [
        [1, 0], [-1, 0], [0, 1], [0, -1],
        [1, 1], [-1, -1], [1, -1], [-1, 1]
      ];

      for (let i = 1; i < groupSize && positions.length < groupSize; i++) {
        let attempts = 0;
        let foundPosition = false;

        while (attempts < 20 && !foundPosition) {
          const basePos = positions[Math.floor(Math.random() * positions.length)];
          const dir = directions[Math.floor(Math.random() * directions.length)];
          const newX = basePos.x + dir[0];
          const newY = basePos.y + dir[1];

          if (isCellAvailable(newX, newY)) {
            positions.push({ x: newX, y: newY });
            usedCells.add(`${newX},${newY}`);
            foundPosition = true;
          }
          attempts++;
        }
      }

      return positions;
    };

    // Generate groups
    for (let i = 0; i < groupCount; i++) {
      const randomType = TERRAIN_TYPES[Math.floor(Math.random() * TERRAIN_TYPES.length)];
      const groupSize = Math.floor(Math.random() * 3) + 1;

      let startPos;
      let attempts = 0;

      do {
        startPos = getRandomPosition();
        attempts++;
      } while (!isCellAvailable(startPos.x, startPos.y) && attempts < 100);

      if (attempts >= 100) continue;

      const positions = getGroupPositions(startPos.x, startPos.y, groupSize);
      if (positions.length > 0) {
        groups.push({ type: randomType, positions });
      }
    }

    return groups;
  }, []);

  return { generateEnvironmentGroups };
};

export default useEnvironmentGeneration;
