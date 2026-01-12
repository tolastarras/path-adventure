import { useCallback, useRef } from 'react';
import { cellSize, canvasPadding, colors, itinerary } from '@/utils/constants';
import { convertArrowMovesToCoordinates, convertCoordinatesToArrowMoves } from '@/utils/helpers';

export const usePlayerPathDraw = () => {
  const animationRef = useRef(null);

  const drawPlayerPath = useCallback((ctx, playerMoves, path, options = {}) => {
    const {
      segmentDelay = 500,   // 500ms pause at each segment
      color = colors.playerPathColor,
      lineDash = [10, 10],    // Dashed line
      lineWidth = itinerary.lineWidth,
      onAnimationComplete,
    } = options;

    if (!ctx || !playerMoves || playerMoves.length === 0 || !path || path.length === 0) return;

    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const playerPath = convertArrowMovesToCoordinates(playerMoves, path[0]);

    let currentSegment = 0;
    let segmentStartTime = performance.now();

    const animate = (currentTime) => {
      const segmentElapsed = currentTime - segmentStartTime;

      // Set line style for player path
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.setLineDash(lineDash);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Draw all completed segments (including the current one being paused at)
      ctx.beginPath();
      
      // Always start from the very first coordinate
      const firstCoord = playerPath[0];
      ctx.moveTo(
        canvasPadding + firstCoord.x * cellSize + cellSize / 2,
        canvasPadding + firstCoord.y * cellSize + cellSize / 2
      );

      // Draw up to the current endpoint (currentSegment + 1 because we include the start)
      for (let i = 1; i <= currentSegment + 1; i++) {
        const coord = playerPath[i];
        if (!coord) break;

        ctx.lineTo(
          canvasPadding + coord.x * cellSize + cellSize / 2,
          canvasPadding + coord.y * cellSize + cellSize / 2
        );
      }
      ctx.stroke();

      // Check if we should move to next segment
      if (segmentElapsed >= segmentDelay) {
        if (currentSegment < playerPath.length - 2) {
          currentSegment++;
          segmentStartTime = currentTime;
        } else {
          // Animation complete
          ctx.setLineDash([]);
          if (onAnimationComplete) {
            onAnimationComplete();
          }
          return;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    segmentStartTime = performance.now();
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // Cleanup function to stop animation
  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  // Check if player path matches the path
  const isPlayerPathValid = useCallback((playerMoves, currentPath) => {
    if (!playerMoves?.length || !currentPath?.length) return false;

    // Convert current path coordinates to arrow steps
    const currentMoves = convertCoordinatesToArrowMoves(currentPath);

    return playerMoves.length === currentMoves.length &&
      playerMoves.every((move, index) => move === currentMoves[index]);
  }, []);

  return {
    drawPlayerPath,
    stopAnimation,
    isPlayerPathValid,
  };
};

export default usePlayerPathDraw;
