import { useCallback } from 'react';
import { useImageLoader } from '.';

import { CELL_SIZE } from '@/utils/constants';

import bicycleImage from '/bicycle-kid.webp';

export const useBicycleDraw = () => {
  const { imageRef, isLoaded } = useImageLoader(bicycleImage);

  const drawBicycle = useCallback((ctx, x, y, direction = 'right', isSmall = false) => {
    if (!imageRef.current) return;
    
    const scale = isSmall ? 0.8 : 1;

    // Reduce image size by 5% to create padding within grid cell
    const padding = 10;
    const size = CELL_SIZE * scale * (1 - padding / 100);
    
    const rotations = {
      'up': 0,
      'right': 0,
      'down': 0,
      'left': 0
    };
    
    const rotation = rotations[direction] || 0;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
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
