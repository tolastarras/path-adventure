import { useState, useCallback, useRef, useEffect } from 'react';

import { CELL_SIZE } from '@/utils/constants';

import bicycleImage from '/bicycle-kid.webp';

export const useBicycleDraw = () => {
  const bicycleImageRef = useRef(null);
  const [bicycleImageLoaded, setBicycleImageLoaded] = useState(false);

  // Load image once when hook initializes
  useEffect(() => {
    const img = new Image();
    img.src = bicycleImage;
    img.onload = () => {
      bicycleImageRef.current = img;
      setBicycleImageLoaded(true);
    }
    img.onerror = () => setBicycleImageLoaded(false);
  }, []);

  const drawBicycle = useCallback((ctx, x, y, direction = 'right', isSmall = false) => {
    if (!bicycleImageRef.current) return;
    
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
    ctx.drawImage(bicycleImageRef.current, -size/2, -size/2, size, size);
    ctx.restore();
  }, []);

  return {
    drawBicycle,
    bicycleImageLoaded,
  };
};

export default useBicycleDraw;
