import { useCallback } from 'react';
import { CELL_SIZE, CANVAS_PADDING, TERRAIN_COLORS } from '@/utils/constants';
import { useTerrainImages, useEnvironmentGeneration } from '@/hooks';
import {
  drawTree,
  drawMud,
  drawGrass,
  drawSand,
  drawWater,
  drawRock,
} from '@/utils/helpers/terrainDrawerHelper';

const useEnvironmentDraw = () => {
  const { terrainImages } = useTerrainImages();
  const { generateEnvironmentGroups } = useEnvironmentGeneration();

  // Draw a single environment group
  const drawEnvironmentGroup = useCallback((ctx, group) => {
    const color = TERRAIN_COLORS[group.type];
    const terrain = terrainImages[group.type];

    group.positions.forEach(position => {
      const x = CANVAS_PADDING + position.x * CELL_SIZE;
      const y = CANVAS_PADDING + position.y * CELL_SIZE;

      // Draw colored background
      ctx.fillStyle = color;
      ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);

      // Draw terrain image if loaded
      if (terrain?.isLoaded && terrain.imageRef.current) {
        const drawConfig = {
          tree: () => drawTree(ctx, x, y, terrain.imageRef.current),
          mud: () => drawMud(ctx, x, y, terrain.imageRef.current, { scale: 0.85 }),
          grass: () => drawGrass(ctx, x, y, terrain.imageRef.current, { scale: 0.9 }),
          sand: () => drawSand(ctx, x, y, terrain.imageRef.current),
          water: () => drawWater(ctx, x, y, terrain.imageRef.current),
          rock: () => drawRock(ctx, x, y, terrain.imageRef.current),
        };

        drawConfig[group.type]?.();
      }

      // Add border
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
    });
  }, [terrainImages]);

  // Draw all environment groups
  const drawEnvironment = useCallback((ctx, path = []) => {
    const groups = generateEnvironmentGroups(path);
    groups.forEach(group => drawEnvironmentGroup(ctx, group));
  }, [generateEnvironmentGroups, drawEnvironmentGroup]);

  // Draw specific environment type
  const drawEnvironmentByType = useCallback((ctx, type, path = []) => {
    const groups = generateEnvironmentGroups(path);
    groups
      .filter(group => group.type === type)
      .forEach(group => drawEnvironmentGroup(ctx, group));
  }, [generateEnvironmentGroups, drawEnvironmentGroup]);

  // Check if a position has environment
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
    generateEnvironmentGroups,
  };
};

export default useEnvironmentDraw;
