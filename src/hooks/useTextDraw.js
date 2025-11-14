import { useCallback } from 'react';
import { drawCellText, getCellCenterPoint } from '@/utils/helpers';

const useTextDraw = () => {
  const drawText = useCallback((ctx, text, path) => {
    if (!path || path.length === 0) return;
    
    const startCell = path[0];
    const { x, y } = getCellCenterPoint(startCell);
    
    ctx.save();
    ctx.translate(x, y);
    
    drawCellText(ctx, text, { position: 'bottom' });
    
    ctx.restore();
  }, []);

  return { drawText };
};

export default useTextDraw;
