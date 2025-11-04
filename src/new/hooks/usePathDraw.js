import { useCallback, useRef } from 'react';
import { getCellCenterPoint, drawPartialPath } from '@/utils/helpers/canvasHelper';
import { PATH } from '@/utils/constants';

const usePathDraw = () => {
  const animationRef = useRef(null);

  const drawStaticPath = useCallback((ctx, path) => {
    // Draw path line
    const drawPathLine = () => {
      if (path.length <= 1) return;
  
      ctx.strokeStyle = PATH.strokeColor;
      ctx.lineWidth = PATH.lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.beginPath();
      const start = getCellCenterPoint(path[0]);
      ctx.moveTo(start.x, start.y);
      
      path.slice(1).forEach(cell => {
        const point = getCellCenterPoint(cell);
        ctx.lineTo(point.x, point.y);
      });
      
      ctx.stroke();
    };
  
    // Draw path dots
    const drawPathDots = () => {
      ctx.fillStyle = PATH.fillColor;
      path.forEach(cell => {
        const center = getCellCenterPoint(cell);
        ctx.beginPath();
        ctx.arc(center.x, center.y, PATH.dotRadius, 0, Math.PI * 2);
        ctx.fill();
      });
    };
  
    // Main drawing logic
    if (path?.length > 1) {
      drawPathLine();
      drawPathDots();
    }
  }, []);

  const drawAnimatedPath = useCallback((ctx, path, options = {}) => {
    console.log({options})
    const {
      duration = 2000,
      onAnimationComplete
    } = options;

    // Clear any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (path?.length <= 1) {
      drawStaticPath(ctx, path);
      onAnimationComplete?.();
      return;
    }

    const startTime = performance.now();
    const totalSegments = path.length - 1;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Calculate how many segments to show based on progress
      const segmentsToShow = Math.floor(progress * totalSegments);

      // Draw animated path up to current segment
      drawPartialPath(ctx, path, segmentsToShow);

      if (progress < 1) {
        // Continue animation
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete
        animationRef.current = null;
        onAnimationComplete?.();
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [drawStaticPath]);

  // Cleanup function to stop animation
  const cleanup = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  return { drawStaticPath, drawAnimatedPath, cleanup };
};

export default usePathDraw;
