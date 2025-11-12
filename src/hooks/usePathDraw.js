import { useCallback, useRef } from 'react';
import { getCellCenterPoint, drawPartialPath } from '@/utils/helpers/canvasHelper';
import { PATH } from '@/utils/constants';

const usePathDraw = () => {
  const animationRef = useRef(null);

  const drawAnimatedPath = useCallback((ctx, path, options = {}) => {
    const {
      duration = 2000,
      onAnimationComplete
    } = options;

    // Clear any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
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
  }, []);

  // Cleanup function to stop animation
  const cleanup = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  return { drawAnimatedPath, cleanup };
};

export default usePathDraw;
