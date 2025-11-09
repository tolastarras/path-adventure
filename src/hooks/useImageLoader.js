import { useEffect, useRef, useState } from 'react';

const useImageLoader = (imageSrc) => {
  const imageRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    
    img.onload = () => {
      imageRef.current = img;
      setIsLoaded(true);
      setError(null);
    };
    
    img.onerror = () => {
      setIsLoaded(false);
      setError('Failed to load image');
    };

    // Cleanup function
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageSrc]);

  return { imageRef, isLoaded, error };
};

export default useImageLoader;
