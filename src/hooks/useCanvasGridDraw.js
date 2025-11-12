import { useCallback } from 'react';
import { useCanvas } from '.';
import { COLORS, GRID_SIZE, CELL_SIZE, CANVAS_PADDING } from '@/utils/constants';

const useCanvasGridDraw = (canvasRef) => {
  const { drawOnCanvas } = useCanvas(canvasRef);

  const drawCanvasGrid = useCallback(() => {
    drawOnCanvas((ctx, canvas) => {
      // Draw grid background
      ctx.fillStyle = COLORS.canvasBackground;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = COLORS.canvasStroke;
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
    });
  }, [drawOnCanvas]);

  return {
    drawCanvasGrid
  };
}

export default useCanvasGridDraw;
