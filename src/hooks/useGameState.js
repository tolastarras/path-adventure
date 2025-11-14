import { useState, useCallback } from 'react';

const useGameState = () => {
  const [gameStatus, setGameStatus] = useState('playing');
  const [showResultAlert, setShowResultAlert] = useState(false);
  const [isJourneyStarted, setIsJourneyStarted] = useState(false);
  const [isJourneyComplete, setIsJourneyComplete] = useState(false);

  const handleAnimationComplete = useCallback((isValidPath) => {
    setIsJourneyStarted(false);
    setIsJourneyComplete(true);
    setGameStatus(isValidPath ? 'won' : 'lost');
    setShowResultAlert(true);
  }, []);

  const closeAlert = useCallback(() => {
    setShowResultAlert(false);
  }, []);

  const startJourney = useCallback(() => {
    setIsJourneyStarted(true);
    setIsJourneyComplete(false);
  }, []);

  const resetGame = useCallback(() => {
    setGameStatus('playing');
    setIsJourneyStarted(false);
    setIsJourneyComplete(false);
    setShowResultAlert(false);
  }, []);

  return {
    gameStatus,
    showResultAlert,
    isJourneyStarted,
    isJourneyComplete,
    handleAnimationComplete,
    closeAlert,
    startJourney,
    resetGame,
  };
};

export default useGameState;
