import { useCallback } from 'react';
import { GRID_SIZE, CELL_SIZE, CANVAS_PADDING } from '@/utils/constants';

export const useCanvasDraw = (canvasRef) => {
  const backgroundColor = '#cbd5e1';
  const strokeColor = '#3b82f6';

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
  }, [canvasRef]);

  return {
    draw,
  };
};

export default useCanvasDraw;
