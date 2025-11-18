import { useState, useEffect, useRef } from 'react';
import './ProgressBar.css';

const ProgressBar = ({
  percentage = 50,
  isVisible = false
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [currentVariant, setCurrentVariant] = useState('danger');
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      // Reset to 0 when component becomes visible
      setAnimatedPercentage(0);
      setCurrentVariant('danger');
      setIsAnimating(true);

      let startTime;
      const duration = 3000 * (percentage / 100);

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentProgress = progress * percentage;
        setAnimatedPercentage(currentProgress);
        setCurrentVariant('danger');

        // Change colors only when reaching specific thresholds
        if (currentProgress >= 75) {
          setCurrentVariant('primary');
        } else if (currentProgress >= 50) {
          setCurrentVariant('success');
        } else if (currentProgress >= 25) {
          setCurrentVariant('warning');
        }

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          setIsAnimating(false);
        }
      };
    } else {
      // Reset when hidden
      setAnimatedPercentage(0);
      setCurrentVariant('danger');
      setIsAnimating(false);
    }
  }, [percentage, isVisible]);

  return (
    <div className={`progress-bar-container progress-bar-container--${currentVariant}`}>
      <div 
        className={`progress-bar progress-bar--${currentVariant}
          ${isAnimating && 'animate-stripes progress-bar--gradient'}`}
        style={{ width: `${animatedPercentage}%` }}
      >
        {Math.round(animatedPercentage)}%
      </div>
    </div>
  );
};

export default ProgressBar;
