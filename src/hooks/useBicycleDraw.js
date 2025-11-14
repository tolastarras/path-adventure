import { useCallback } from 'react';
import { useImageLoader } from '.';

import { cellSize } from '@/utils/constants';

import bicycleImage from '/bicycle-kid.webp';

export const useBicycleDraw = () => {
  const { imageRef, isLoaded } = useImageLoader(bicycleImage);

  const drawBicycle = useCallback((ctx, x, y, direction = 'right') => {
    if (!imageRef.current) return;
    
    // Reduce image size by 10% to create padding within grid cell
    const padding = 10;
    const size = cellSize * (1 - padding / 100);
    
    ctx.save();
    ctx.translate(x, y);
    if (direction === 'left') {
      ctx.scale(-1, 1);
    }
    ctx.drawImage(imageRef.current, -size/2, -size/2, size, size);
    ctx.restore();
  }, [imageRef]);

  return {
    drawBicycle,
    isBicycleImageLoaded: isLoaded,
  };
};

export default useBicycleDraw;
