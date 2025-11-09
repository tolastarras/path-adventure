import { useCallback } from 'react';

const useCanvas = (canvasRef) => {
  // Shared canvas context retrieval logic
  const getCanvasContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    return { canvas, ctx };
  }, [canvasRef]);

  // Clear canvas helper
  const clearCanvas = useCallback(() => {
    const context = getCanvasContext();
    if (!context) return null;
    
    const { canvas, ctx } = context;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return context;
  }, [getCanvasContext]);

  // Clear + execute callback
  const drawOnCanvas = useCallback((callback) => {
    const context = clearCanvas();
    if (!context) return;
    
    const { ctx, canvas } = context;
    return callback(ctx, canvas);
  }, [clearCanvas]);

  // Just get context without clearing
  const getContext = useCallback(() => {
    return getCanvasContext();
  }, [getCanvasContext]);

  return {
    drawOnCanvas,    // Clear + execute callback
    getContext,      // Just get context without clearing
    clearCanvas,     // Just clear and return context
  };
};

export default useCanvas;
