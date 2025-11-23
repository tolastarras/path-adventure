import { useState, useCallback } from 'react';

const useGameState = () => {
  const [gameStatus, setGameStatus] = useState('playing');
  const [isJourneyStarted, setIsJourneyStarted] = useState(false);
  const [isJourneyComplete, setIsJourneyComplete] = useState(false);

  const handleAnimationComplete = useCallback((isValidPath) => {
    setIsJourneyStarted(false);
    setIsJourneyComplete(true);
    setGameStatus(isValidPath ? 'won' : 'lost');
  }, []);

  const startJourney = useCallback(() => {
    setIsJourneyStarted(true);
    setIsJourneyComplete(false);
  }, []);

  const resetGame = useCallback(() => {
    setGameStatus('playing');
    setIsJourneyStarted(false);
    setIsJourneyComplete(false);
  }, []);

  return {
    gameStatus,
    isJourneyStarted,
    isJourneyComplete,
    handleAnimationComplete,
    startJourney,
    resetGame,
  };
};

export default useGameState;
