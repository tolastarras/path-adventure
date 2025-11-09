import { useCallback } from 'react';
import { useImageLoader } from '.';
import { drawCellText } from '@/utils/helpers/canvasHelper';

import { CELL_SIZE } from '@/utils/constants';

import flagImage from '/finish-flag.webp';

export const useFlagDraw = () => {
  const { imageRef, isLoaded } = useImageLoader(flagImage);

  const drawFlag = useCallback((ctx, x, y, isSmall = false) => {
    if (!imageRef.current) return;
    
    // **REFACTOR **
    const scale = isSmall ? 0.8 : 1;

    // Reduce image size by 5% to create padding within grid cell
    const padding = 5;
    const size = CELL_SIZE * scale * (1 - padding / 100);

    ctx.save();
    ctx.translate(x, y);
    ctx.drawImage(
      imageRef.current,   // Image to draw
      -size/2,            // dx: X coordinate (Move LEFT by half the width)
      -size/2,            // dy: Y coordinate (Move UP by half the height)
      size,               // dWidth: draw at full size width
      size                // dHeight: draw at full size height
    );

    drawCellText(ctx, 'FINISH');
    ctx.restore();
  }, [imageRef]);

  return {
    drawFlag,
    isFlagImageLoaded: isLoaded,
  };
};

export default useFlagDraw;
