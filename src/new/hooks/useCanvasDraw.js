import { useCallback } from 'react';
import { GRID_SIZE, CELL_SIZE, CANVAS_PADDING } from '@/utils/constants';

import { useBicycleDraw, useFlagDraw } from '.';

export const useCanvasDraw = (
  canvasRef,
  bicyclePosition = { x: 0, y: 0 },
  bicycleDirection = 'right',
  flagPosition = { x: 10, y: 7 },
) => {
  const backgroundColor = '#cbd5e1';
  const strokeColor = '#3b82f6';

  const { drawBicycle } = useBicycleDraw();
  const { drawFlag } = useFlagDraw();

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= GRID_SIZE; i++) {
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(CANVAS_PADDING + i * CELL_SIZE, CANVAS_PADDING);
      ctx.lineTo(CANVAS_PADDING + i * CELL_SIZE, CANVAS_PADDING + GRID_SIZE * CELL_SIZE);
      ctx.stroke();
      
      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(CANVAS_PADDING, CANVAS_PADDING + i * CELL_SIZE);
      ctx.lineTo(CANVAS_PADDING + GRID_SIZE * CELL_SIZE, CANVAS_PADDING + i * CELL_SIZE);
      ctx.stroke();
    }

    // Utility function for coordinate calculation
    const calculateCenterCoordinates = ({ x, y }) => {
      return {
        x: CANVAS_PADDING + x * CELL_SIZE + CELL_SIZE / 2,
        y: CANVAS_PADDING + y * CELL_SIZE + CELL_SIZE / 2
      };
    };

    // Draw bicycle
    const { x: bicycleX, y: bicycleY } = calculateCenterCoordinates(bicyclePosition);
    drawBicycle(ctx, bicycleX, bicycleY, bicycleDirection);

    // Draw flag
    const { x: flagX, y: flagY } = calculateCenterCoordinates(flagPosition);
    drawFlag(ctx, flagX, flagY, true);
  }, [
    canvasRef,
    drawBicycle,
    drawFlag,
    bicyclePosition,
    bicycleDirection,
    flagPosition,
  ]);

  return {
    draw,
  };
};

export default useCanvasDraw;
