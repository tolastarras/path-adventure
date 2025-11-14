import { useCallback } from 'react';
import { useCanvas } from '.';
import { colors, gridSize, cellSize, canvasPadding } from '@/utils/constants';

const useCanvasGridDraw = (canvasRef) => {
  const { drawOnCanvas } = useCanvas(canvasRef);

  const drawCanvasGrid = useCallback(() => {
    drawOnCanvas((ctx, canvas) => {
      // Draw grid background
      ctx.fillStyle = colors.canvasBackground;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = colors.canvasStroke;
      ctx.lineWidth = 1;

      for (let i = 0; i <= gridSize; i++) {
        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(canvasPadding + i * cellSize, canvasPadding);
        ctx.lineTo(canvasPadding + i * cellSize, canvasPadding + gridSize * cellSize);
        ctx.stroke();

        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(canvasPadding, canvasPadding + i * cellSize);
        ctx.lineTo(canvasPadding + gridSize * cellSize, canvasPadding + i * cellSize);
        ctx.stroke();
      }
    });
  }, [drawOnCanvas]);

  return {
    drawCanvasGrid
  };
}

export default useCanvasGridDraw;
