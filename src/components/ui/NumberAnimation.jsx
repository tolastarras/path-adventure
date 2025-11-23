import { useState, useEffect } from 'react';

const NumberAnimation = ({ value, isVisible = false }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    let timer;
    let timeout;

    if (isVisible && value > 0) {
      setAnimatedValue(0);
      
      let currentValue = 0;
      const interval = 50; // 50ms between increments

      // Start numeric value animation from 0 to target
      timer = setInterval(() => {
        currentValue += 1;
        setAnimatedValue(currentValue);

        if (currentValue >= value) {
          clearInterval(timer);
        }
      }, interval);

    } else {
      // Reset animated value to zero when component becomes hidden
      timeout = setTimeout(() => setAnimatedValue(0), 500);
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      if (timer) {
        clearInterval(timer);
      }

      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [value, isVisible]);  

  return (
    <div className="transition-all duration-2000 ease-out">
      <p className="text-4xl text-center">{animatedValue}</p>
    </div>
  );
};

export default NumberAnimation;
