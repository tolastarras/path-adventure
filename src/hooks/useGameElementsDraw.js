import { useCallback } from 'react';
import { useBicycleDraw, useFlagDraw } from '.';
import { getCellCenterPoint } from '@/utils/helpers/canvasHelper';

export const useGameElementsDraw = () => {
  const { drawBicycle, isBicycleImageLoaded } = useBicycleDraw();
  const { drawFlag, isFlagImageLoaded } = useFlagDraw();

  // Draw only the bicycle
  const drawBicycleElement = useCallback((ctx, path) => {
    if (!path?.length || !isBicycleImageLoaded) return;
    
    const position = path[0];
    const { x: bicycleX, y: bicycleY } = getCellCenterPoint(position);
    drawBicycle(ctx, bicycleX, bicycleY, 'right', false);
  }, [drawBicycle, isBicycleImageLoaded]);

  // Draw only the flag
  const drawFlagElement = useCallback((ctx, path) => {
    if (!path?.length || !isFlagImageLoaded) return;
    
    const position = path[path.length - 1];
    const { x: flagX, y: flagY } = getCellCenterPoint(position);
    drawFlag(ctx, flagX, flagY, true);
  }, [drawFlag, isFlagImageLoaded]);

  // Draw both elements (original functionality)
  const drawGameElements = useCallback((ctx, path) => {
    if (!path?.length) return;

    drawBicycleElement(ctx, path);
    drawFlagElement(ctx, path);
  }, [drawBicycleElement, drawFlagElement]);

  return {
    drawGameElements,    // Draw both
    drawBicycleElement,  // Draw only bicycle
    drawFlagElement,     // Draw only flag
    isBicycleImageLoaded,
    isFlagImageLoaded,
  };
};

export default useGameElementsDraw;