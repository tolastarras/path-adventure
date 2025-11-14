import { useCallback, useRef } from 'react';
import { cellSize, canvasPadding, colors, itinerary } from '@/utils/constants';

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

    const startX = canvasPadding;
    const startY = canvasPadding;

    // Convert player moves to coordinates starting from path[0]
    const movesToCoordinates = (moves, correctPath) => {
      const startCell = correctPath[0];
      let x = startCell.x;
      let y = startCell.y;
      
      const coordinates = [{ x, y }]; // Start from correct position

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
    };

    const playerCoordinates = movesToCoordinates(playerMoves, path);

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
      const firstCoord = playerCoordinates[0];
      ctx.moveTo(
        startX + firstCoord.x * cellSize + cellSize / 2,
        startY + firstCoord.y * cellSize + cellSize / 2
      );
      
      // Draw up to the current endpoint (currentSegment + 1 because we include the start)
      for (let i = 1; i <= currentSegment + 1; i++) {
        const coord = playerCoordinates[i];
        if (!coord) break;

        ctx.lineTo(
          startX + coord.x * cellSize + cellSize / 2,
          startY + coord.y * cellSize + cellSize / 2
        );
      }
      ctx.stroke();

      // Check if we should move to next segment
      if (segmentElapsed >= segmentDelay) {
        if (currentSegment < playerCoordinates.length - 2) {
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

  // Check if player path matches the correct path
  const isPlayerPathValid = useCallback((playerMoves, correctPath) => {
    if (!playerMoves || !correctPath || correctPath.length === 0) return false;

    // Convert player moves starting from correct starting position
    const startCell = correctPath[0];
    let x = startCell.x;
    let y = startCell.y;

    playerMoves.forEach(move => {
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
      }
    });

    const correctEnd = correctPath[correctPath.length - 1];
    return x === correctEnd.x && y === correctEnd.y;
  }, []);

  return {
    drawPlayerPath,
    stopAnimation,
    isPlayerPathValid,
  };
};

export default usePlayerPathDraw;
