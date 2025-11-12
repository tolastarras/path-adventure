import {
  usePathDraw,
  useCanvasGridDraw,
  useEnvironmentDraw,
  useGameElementsDraw,
  useCanvas,
  useTextDraw,
} from '.';

export const useGameDraw = (
  canvasRef,
  path,
) => {
  const { drawOnCanvas } = useCanvas(canvasRef);
  const { drawAnimatedPath } = usePathDraw();
  const { drawCanvasGrid } = useCanvasGridDraw(canvasRef);
  const { drawFlagElement } = useGameElementsDraw();
  const { drawEnvironment } = useEnvironmentDraw();
  const { drawText } = useTextDraw();

  const draw = () => {
    drawOnCanvas(ctx => {
      // Draw grid background
      drawCanvasGrid(ctx);
      // Draw water, rocks, trees ...
      drawEnvironment(ctx, path);
      // Draw START text here and bicycle on top canvas
      drawText(ctx, 'START', path);
  
      // Draw path (over the bicycle)

      drawAnimatedPath(ctx, path, {
        duration: path.length * 300,
        onAnimationComplete: () => {
          // Draw flag only after path animation completes
          drawFlagElement(ctx, path);
        }
      });
    });
  }

  return {
    draw,
  };
};

export default useGameDraw;
