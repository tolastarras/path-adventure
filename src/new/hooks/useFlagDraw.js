import { useState, useCallback, useRef, useEffect } from 'react';

import { CELL_SIZE } from '@/utils/constants';

import flagImage from '/finish-flag.webp';

export const useFlagDraw = () => {
  const flagImageRef = useRef(null);
  const [isFlagImageLoaded, setIsFlagImageLoaded] = useState(false);

  // Load image once when hook initializes
  useEffect(() => {
    const img = new Image();
    img.src = flagImage;
    img.onload = () => {
      flagImageRef.current = img;
      setIsFlagImageLoaded(true);
    }
    img.onerror = () => setIsFlagImageLoaded(false);  
  }, []);

  const drawFlag = useCallback((ctx, x, y, isSmall = false) => {
    if (!flagImageRef.current) return;
    
    const scale = isSmall ? 0.8 : 1;

    // Reduce image size by 5% to create padding within grid cell
    const padding = 5;
    const size = CELL_SIZE * scale * (1 - padding / 100);
    
    ctx.save();
    ctx.translate(x, y);
    ctx.drawImage(
      flagImageRef.current, // Image to draw
      -size/2,              // dx: X coordinate (Move LEFT by half the width)
      -size/2,              // dy: Y coordinate (Move UP by half the height)
      size,                 // dWidth: draw at full size width
      size                  // dHeight: draw at full size height
    );
    ctx.restore();
  }, []);

  return {
    drawFlag,
    isFlagImageLoaded,
  };
};

export default useFlagDraw;
