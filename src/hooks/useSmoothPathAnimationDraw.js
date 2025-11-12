// hooks/useSmoothPathAnimation.js
import { useCallback, useRef } from 'react';
import { CELL_SIZE, CANVAS_PADDING, COLORS } from '@/utils/constants';

export const useSmoothPathAnimationDraw = () => {
  const animationRef = useRef(null);

  // Helper function to convert moves to coordinates
  const convertMovesToCoordinates = useCallback((moves, correctPath) => {
    if (!correctPath || correctPath.length === 0) return [];
    
    const startCell = correctPath[0];
    let x = startCell.x;
    let y = startCell.y;
    
    const coordinates = [{ x, y }];

    moves.forEach(move => {
      const match = move.match(/(\d+)([→←↑↓])/);
      if (!match) return;

      const [, countStr, direction] = match;
      const count = parseInt(countStr, 10);

      for (let i = 0; i < count; i++) {
        switch (direction) {
          case '→': x += 1; break;
          case '←': x -= 1; break;
          case '↑': y -= 1; break;
          case '↓': y += 1; break;
        }
        coordinates.push({ x, y });
      }
    });

    return coordinates;
  }, []);

  const startSmoothAnimation = useCallback((ctx, playerMoves, correctPath, options = {}) => {
    const {
      duration = playerMoves.length * 1000, // Total animation duration
      color = COLORS.playerPathColor,
      lineDash = [10, 10],
      lineWidth = 3,
      onAnimationComplete,
      drawBicycle
    } = options;

    if (!ctx || !playerMoves || playerMoves.length === 0 || !correctPath) return;

    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startTime = performance.now();
    const cellSize = CELL_SIZE;
    const startX = CANVAS_PADDING;
    const startY = CANVAS_PADDING;

    const playerCoordinates = convertMovesToCoordinates(playerMoves, correctPath);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Clear only the animation canvas (not the background)
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Draw animated path
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.setLineDash(lineDash);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      const firstCoord = playerCoordinates[0];
      ctx.moveTo(
        startX + firstCoord.x * cellSize + cellSize / 2,
        startY + firstCoord.y * cellSize + cellSize / 2
      );

      // Draw path with smooth progression
      const pointsToDraw = progress * (playerCoordinates.length - 1);
      
      for (let i = 1; i <= pointsToDraw; i++) {
        const coord = playerCoordinates[i];
        ctx.lineTo(
          startX + coord.x * cellSize + cellSize / 2,
          startY + coord.y * cellSize + cellSize / 2
        );
      }
      ctx.stroke();

      // Draw smooth bicycle movement
      const exactIndex = progress * (playerCoordinates.length - 1);
      const currentIndex = Math.floor(exactIndex);
      const segmentProgress = exactIndex - currentIndex;

      const currentCoord = playerCoordinates[currentIndex];
      const nextCoord = playerCoordinates[currentIndex + 1];

      if (currentCoord && nextCoord && drawBicycle) {
        const currentX = startX + currentCoord.x * cellSize + cellSize / 2;
        const currentY = startY + currentCoord.y * cellSize + cellSize / 2;
        const nextX = startX + nextCoord.x * cellSize + cellSize / 2;
        const nextY = startY + nextCoord.y * cellSize + cellSize / 2;

        const bicycleX = currentX + (nextX - currentX) * segmentProgress;
        const bicycleY = currentY + (nextY - currentY) * segmentProgress;

        drawBicycle(ctx, bicycleX, bicycleY);
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // ANIMATION COMPLETE - Draw bicycle at final position
        const finalCoord = playerCoordinates[playerCoordinates.length - 1];
        const finalX = startX + finalCoord.x * cellSize + cellSize / 2;
        const finalY = startY + finalCoord.y * cellSize + cellSize / 2;
        
        if (drawBicycle) {
          drawBicycle(ctx, finalX, finalY);
        }

        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [convertMovesToCoordinates]);

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  return { 
    startSmoothAnimation, 
    stopAnimation 
  };
};

export default useSmoothPathAnimationDraw;
