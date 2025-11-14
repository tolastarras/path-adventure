import { useState, useCallback } from 'react';

const usePathManagement = () => {
  const [playerMoves, setPlayerMoves] = useState([]);

  const addMove = useCallback((move) => {
    setPlayerMoves(prev => [...prev, move]);
  }, []);

  const undoMove = useCallback(() => {
    setPlayerMoves(prev => prev.slice(0, -1));
  }, []);

  const clearPath = useCallback(() => {
    setPlayerMoves([]);
  }, []);

  return {
    playerMoves,
    addMove,
    undoMove,
    clearPath
  };
};

export default usePathManagement;
