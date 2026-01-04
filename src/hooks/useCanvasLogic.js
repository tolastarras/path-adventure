import { useCallback } from 'react';
import { useCanvas } from '@/hooks';
import { getCellCenterPoint } from '@/utils/helpers';

const useCanvasLogic = (animationCanvasRef, currentPath, drawBicycle) => {
  const { clearCanvas } = useCanvas(animationCanvasRef);

  const initializeAnimationCanvas = useCallback((animationCtx) => {
    // Add safety checks for canvas and context
    if (!animationCtx || !animationCtx.canvas || !currentPath.length) return;

    // Clear the canvas safely
    if (animationCtx.canvas) {
      clearCanvas(animationCtx);
      animationCtx.clearRect(0, 0, animationCtx.canvas.width, animationCtx.canvas.height);
    }

    const startCell = currentPath[0];
    const { x, y } = getCellCenterPoint(startCell);
    drawBicycle(animationCtx, x, y);
  }, [currentPath, drawBicycle, clearCanvas]);

  const setupAnimationCanvas = useCallback((animationCanvasRef) => {
    // Get canvas element first, then context
    const canvas = animationCanvasRef.current;
    if (!canvas) return;

    const animationCtx = canvas.getContext('2d');
    if (!animationCtx || !currentPath.length) return;

    const timer = setTimeout(() => {
      initializeAnimationCanvas(animationCtx);
    }, 100);

    return () => clearTimeout(timer);
  }, [currentPath, initializeAnimationCanvas]);

  return {
    setupAnimationCanvas,
    initializeAnimationCanvas,
  };
};

export default useCanvasLogic;
