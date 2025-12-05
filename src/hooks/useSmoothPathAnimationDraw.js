import { useCallback, useRef } from 'react';
import { convertArrowMovesToCoordinates } from '@/utils/helpers';
import { cellSize, canvasPadding, colors } from '@/utils/constants';

export const useSmoothPathAnimationDraw = () => {
  const animationRef = useRef(null);

  const startSmoothAnimation = useCallback((ctx, playerMoves, correctPath, options = {}) => {
    const {
      // Total animation duration
      duration = playerMoves.length * 1000,
      color = colors.playerPathColor,
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
    const startX = canvasPadding;
    const startY = canvasPadding;

    const playerCoordinates = convertArrowMovesToCoordinates(playerMoves, correctPath[0]);

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
  }, []);

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
