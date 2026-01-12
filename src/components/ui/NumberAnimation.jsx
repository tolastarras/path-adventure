import { useState, useEffect, useRef } from 'react';
import { formatNumber } from '@/utils/formatters';

const NumberAnimation = ({ value, isVisible = false }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const timerRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Clear existing timers
    if (timerRef.current) clearInterval(timerRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (isVisible && value > 0) {
      setAnimatedValue(0);
      let currentValue = 0;

      // Calculate animation parameters
      let stepSize = 10;
      let interval = 20;

      if (value > 1000) {
        stepSize = Math.max(1, Math.floor(value / 100));
        interval = 10;
      }

      timerRef.current = setInterval(() => {
        currentValue += stepSize;

        if (currentValue >= value) {
          setAnimatedValue(value);
          clearInterval(timerRef.current);
        } else {
          setAnimatedValue(currentValue);
        }
      }, interval);
    } else {
      timeoutRef.current = setTimeout(() => setAnimatedValue(0), 500);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, isVisible]);

  return (
    <div className="transition-all ease-out">
      <p className="text-4xl text-center">{formatNumber(animatedValue)}</p>
    </div>
  );
};

export default NumberAnimation;
