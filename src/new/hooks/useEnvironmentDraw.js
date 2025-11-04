import { useCallback } from 'react';
import { CELL_SIZE, CANVAS_PADDING, GRID_SIZE, COLORS } from '@/utils/constants';

const useEnvironmentDraw = () => {
  // Generate random environment groups that avoid path cells
  const generateEnvironmentGroups = useCallback((currentPath = [], groupCount = 15) => {
    // Convert path to Set for quick lookup
    const pathCells = new Set(currentPath.map(cell => `${cell.x},${cell.y}`));
    
    // const isPathCell = (x, y) => pathCells.has(`${x},${y}`);
    const types = ['water', 'trees', 'sand', 'grass', 'mud'];
    const groups = [];
    
    // Track used cells to avoid overlaps
    const usedCells = new Set(pathCells); // Start with path cells

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
      const positions = [];
      const directions = [
        [0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], // current, right, left, down, up
        [1, 1], [-1, -1], [1, -1], [-1, 1]        // diagonals
      ];

      // Try to create a connected group
      for (let i = 0; i < groupSize && positions.length < groupSize; i++) {
        let attempts = 0;
        let foundPosition = false;

        while (attempts < 20 && !foundPosition) {
          const dir = directions[Math.floor(Math.random() * directions.length)];
          const newX = startX + dir[0];
          const newY = startY + dir[1];

          if (isCellAvailable(newX, newY)) {
            positions.push({ x: newX, y: newY });
            usedCells.add(`${newX},${newY}`);
            foundPosition = true;
          }
          attempts++;
        }

        // If no adjacent position found, try a completely random one
        if (!foundPosition) {
          let randomAttempts = 0;
          while (randomAttempts < 10 && positions.length < groupSize) {
            const randomPos = getRandomPosition();
            if (isCellAvailable(randomPos.x, randomPos.y)) {
              positions.push(randomPos);
              usedCells.add(`${randomPos.x},${randomPos.y}`);
              break;
            }
            randomAttempts++;
          }
        }
      }

      return positions;
    };

    // Generate groups
    for (let i = 0; i < groupCount; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const groupSize = Math.floor(Math.random() * 4) + 1; // 1-4 squares
      
      let startPos;
      let attempts = 0;
      
      // Find a starting position that's not used
      do {
        startPos = getRandomPosition();
        attempts++;
      } while (!isCellAvailable(startPos.x, startPos.y) && attempts < 50);

      if (attempts >= 50) continue; // Skip if no position found

      const positions = getGroupPositions(startPos.x, startPos.y, groupSize);
      
      if (positions.length > 0) {
        groups.push({ type, positions });
        // Mark all positions as used
        positions.forEach(pos => usedCells.add(`${pos.x},${pos.y}`));
      }
    }

    return groups;
  }, []);

  // Draw a single environment group
  const drawEnvironmentGroup = useCallback((ctx, group) => {
    const color = COLORS[group.type];
    
    group.positions.forEach(position => {
      const x = CANVAS_PADDING + position.x * CELL_SIZE;
      const y = CANVAS_PADDING + position.y * CELL_SIZE;
      
      ctx.fillStyle = color;
      ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
      
      // Optional: Add a border
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
    });
  }, []);

  // Draw all environment groups
  const drawEnvironment = useCallback((ctx, path = []) => {
    const groups = generateEnvironmentGroups(path);
    
    groups.forEach(group => {
      drawEnvironmentGroup(ctx, group);
    });
  }, [generateEnvironmentGroups, drawEnvironmentGroup]);

  // Draw specific environment type
  const drawEnvironmentByType = useCallback((ctx, type, path = []) => {
    const groups = generateEnvironmentGroups(path);
    const filteredGroups = groups.filter(group => group.type === type);
    
    filteredGroups.forEach(group => {
      drawEnvironmentGroup(ctx, group);
    });
  }, [generateEnvironmentGroups, drawEnvironmentGroup]);

  // Check if a position has environment (for collision detection)
  const hasEnvironmentAt = useCallback((position, path = []) => {
    const groups = generateEnvironmentGroups(path);
    
    return groups.some(group => 
      group.positions.some(envPos => 
        envPos.x === position.x && envPos.y === position.y
      )
    );
  }, [generateEnvironmentGroups]);

  return {
    drawEnvironment,
    drawEnvironmentByType,
    hasEnvironmentAt,
    generateEnvironmentGroups, // Export for debugging if needed
  };
};

export default useEnvironmentDraw;
