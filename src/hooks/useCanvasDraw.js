import { useCallback } from 'react';
import { GRID_SIZE, CELL_SIZE, CANVAS_PADDING } from '../utils/constants';
import { reconstructPlayerPath } from '../utils/gameLogic';

export const useCanvasDraw = (canvasRef, path, animationPosition, gameStatus, playerMoves) => {
  const drawBicycle = useCallback((ctx, x, y, isSmall = false) => {
    const scale = isSmall ? 0.7 : 1;
    const wheelSize = 15 * scale;
    const frameLength = 25 * scale;
    
    // Wheels
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(x - frameLength/2, y, wheelSize/2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(x + frameLength/2, y, wheelSize/2, 0, Math.PI * 2);
    ctx.fill();
    
    // Frame
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 3 * scale;
    ctx.beginPath();
    ctx.moveTo(x - frameLength/2, y);
    ctx.lineTo(x + frameLength/2, y);
    ctx.stroke();
    
    // Handlebars
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2 * scale;
    ctx.beginPath();
    ctx.moveTo(x - 5 * scale, y - 8 * scale);
    ctx.lineTo(x + 5 * scale, y - 8 * scale);
    ctx.stroke();
    
    // Seat
    ctx.fillStyle = '#000';
    ctx.fillRect(x - 12 * scale, y - 5 * scale, 4 * scale, 2 * scale);
  }, []);

  const drawFinishFlag = useCallback((ctx, x, y) => {
    // Flag pole
    ctx.strokeStyle = '#8b5a2b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 25);
    ctx.stroke();
    
    // Flag
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(x, y - 25);
    ctx.lineTo(x + 20, y - 20);
    ctx.lineTo(x, y - 15);
    ctx.fill();
    
    ctx.fillStyle = '#000';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('FINISH', x + 10, y - 36);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = '#cbd5e1';
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

    // Draw the path line (ALWAYS visible now)
    if (path?.length > 1) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.beginPath();
      
      // Start at the center of the first cell
      ctx.moveTo(
        CANVAS_PADDING + path[0].x * CELL_SIZE + CELL_SIZE / 2,
        CANVAS_PADDING + path[0].y * CELL_SIZE + CELL_SIZE / 2
      );
      
      // Draw lines to each subsequent point
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(
          CANVAS_PADDING + path[i].x * CELL_SIZE + CELL_SIZE / 2,
          CANVAS_PADDING + path[i].y * CELL_SIZE + CELL_SIZE / 2
        );
      }
      
      ctx.stroke();

      // Draw dots at each path point
      ctx.fillStyle = '#1d4ed8';
      for (let i = 0; i < path.length; i++) {
        ctx.beginPath();
        ctx.arc(
          CANVAS_PADDING + path[i].x * CELL_SIZE + CELL_SIZE / 2,
          CANVAS_PADDING + path[i].y * CELL_SIZE + CELL_SIZE / 2,
          5, 0, Math.PI * 2
        );
        ctx.fill();
      }
    }

    // Draw start icon (bicycle) - only show if not animating or at start position
    if (path?.length > 0 && (!animationPosition || 
        (animationPosition.x === path[0].x && animationPosition.y === path[0].y))) {
      const start = path[0];
      drawBicycle(
        ctx,
        CANVAS_PADDING + start.x * CELL_SIZE + CELL_SIZE / 2,
        CANVAS_PADDING + start.y * CELL_SIZE + CELL_SIZE + 25,
        false // full size
      );
    }

    // Draw end icon (finish flag) outside the grid
    if (path?.length > 0) {
      const end = path[path.length - 1];
      
      let flagX, flagY;
      
      if (end.y === 0) { // Top edge
        flagX = CANVAS_PADDING + end.x * CELL_SIZE + CELL_SIZE / 2;
        flagY = CANVAS_PADDING - 35;
      } else if (end.x === 0) { // Left edge
        flagX = CANVAS_PADDING - 35;
        flagY = CANVAS_PADDING + end.y * CELL_SIZE + CELL_SIZE / 2;
      } else if (end.x === GRID_SIZE - 1) { // Right edge
        flagX = CANVAS_PADDING + GRID_SIZE * CELL_SIZE + 35;
        flagY = CANVAS_PADDING + end.y * CELL_SIZE + CELL_SIZE / 2;
      } else { // Bottom edge
        flagX = CANVAS_PADDING + end.x * CELL_SIZE + CELL_SIZE / 2;
        flagY = CANVAS_PADDING + GRID_SIZE * CELL_SIZE + 35;
      }
      
      drawFinishFlag(ctx, flagX, flagY);
    }

    // Draw animated bicycle during animation - this is the main bicycle that moves
    if (animationPosition && gameStatus === 'animating') {
      drawBicycle(
        ctx,
        CANVAS_PADDING + animationPosition.x * CELL_SIZE + CELL_SIZE / 2,
        CANVAS_PADDING + animationPosition.y * CELL_SIZE + CELL_SIZE / 2,
        true // smaller version for grid movement
      );
    }

    // Draw player's planned path during animation
    if (gameStatus === 'animating' && playerMoves.length > 0) {
      const playerPath = reconstructPlayerPath(playerMoves, path);
      
      // Draw player path line
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.setLineDash([5, 5]); // Dashed line for player path
      
      ctx.beginPath();
      ctx.moveTo(
        CANVAS_PADDING + playerPath[0].x * CELL_SIZE + CELL_SIZE / 2,
        CANVAS_PADDING + playerPath[0].y * CELL_SIZE + CELL_SIZE / 2
      );
      
      for (let i = 1; i < playerPath.length; i++) {
        ctx.lineTo(
          CANVAS_PADDING + playerPath[i].x * CELL_SIZE + CELL_SIZE / 2,
          CANVAS_PADDING + playerPath[i].y * CELL_SIZE + CELL_SIZE / 2
        );
      }
      
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dash
    }
  }, [canvasRef, path, animationPosition, gameStatus, playerMoves, drawBicycle, drawFinishFlag]);

  return {
    draw,
    drawBicycle,
    drawFinishFlag
  };
};

export default useCanvasDraw;
