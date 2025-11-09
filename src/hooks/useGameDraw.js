import {
  usePathDraw,
  useCanvasGridDraw,
  useEnvironmentDraw,
  useGameElementsDraw
} from '.';

export const useGameDraw = (
  canvasRef,
  path,
  staticPath,
) => {
  const { drawStaticPath, drawAnimatedPath } = usePathDraw();
  const { drawCanvasGrid } = useCanvasGridDraw();
  const { drawBicycleElement, drawFlagElement } = useGameElementsDraw();
  const { drawEnvironment } = useEnvironmentDraw();

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw grid (background)
    drawCanvasGrid(ctx, canvas);

    drawEnvironment(ctx, path);
    
    // Draw bicycle first (before path animation)
    drawBicycleElement(ctx, path);

    // Draw path (over the bicycle)
    if (staticPath) {
      drawStaticPath(ctx, path);
      drawFlagElement(ctx, path);
    } else {
      drawAnimatedPath(ctx, path, {
        duration: path.length * 300,
        onAnimationComplete: () => {
          // Redraw bicycle to show on top of animated path
          drawBicycleElement(ctx, path);
          // Draw flag only after path animation completes
          drawFlagElement(ctx, path);
        }
      });
    }
  }

  return {
    draw,
  };
};

export default useGameDraw;
