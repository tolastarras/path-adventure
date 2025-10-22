import { useState, useEffect, useCallback } from 'react';
import { generateRandomPath } from '../utils/pathUtils';

export const usePathGenerator = () => {
  const [path, setPath] = useState([]);

  const generateNewPath = useCallback(() => {
    const newPath = generateRandomPath();
    setPath(newPath);
  }, []);

  const clearGame = useCallback(() => {
    setPath([]);
  }, []);

  useEffect(() => {
    generateNewPath();
  }, [generateNewPath]);

  return {
    path,
    generateNewPath,
    clearGame
  };
};
