import { useState, useEffect, useCallback } from 'react';
import { generateRandomPath } from '@/utils/pathUtils';

const usePathGenerator = () => {
  const [path, setPath] = useState([]);

  const generateNewPath = useCallback(() => {
    const newPath = generateRandomPath();
    setPath(newPath);

    return newPath;
  }, []);

  const clearGame = useCallback(() => {
    setPath([]);
  }, []);

  useEffect(() => {
    generateNewPath();
  }, [generateNewPath]);

  return {
    currentPath: path,
    generateNewPath,
    clearGame
  };
};

export default usePathGenerator;
