import { useState, useCallback } from 'react';

/**
 * This hook provides a centralized way to manage the sequence of moves a player
 * plans for their bicycle route. It handles adding new moves, undoing mistakes,
 * and clearing the entire path - making path planning intuitive and error-resistant.
 */
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
