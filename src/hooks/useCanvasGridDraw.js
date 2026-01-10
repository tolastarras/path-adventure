import { useCallback } from 'react';
import { useCanvas } from '@/hooks';
import { colors, gridCols, gridRows, cellSize, canvasPadding } from '@/utils/constants';

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

      // Draw vertical lines (use dynamic grid cols)
      for (let col = 1; col < gridCols; col++) {
        ctx.beginPath();
        ctx.moveTo(canvasPadding + col * cellSize, canvasPadding);
        ctx.lineTo(
          canvasPadding + col * cellSize,
          canvasPadding + gridRows * cellSize
        );
        ctx.stroke();
      }

      // Draw horizontal lines (rows always 10)
      for (let row = 1; row < gridRows; row++) {
        ctx.beginPath();
        ctx.moveTo(canvasPadding, canvasPadding + row * cellSize);
        ctx.lineTo(
          canvasPadding + gridCols * cellSize,
          canvasPadding + row * cellSize
        );
        ctx.stroke();
      }
    });
  }, [drawOnCanvas]);

  return {
    drawCanvasGrid
  };
}

export default useCanvasGridDraw;
