import { useState, useCallback } from 'react';

const useGameState = () => {
  const [gameStatus, setGameStatus] = useState('lost');
  const [showResultAlert, setShowResultAlert] = useState(false);
  const [isJourneyStarted, setIsJourneyStarted] = useState(false);

  const handleAnimationComplete = useCallback((isValidPath) => {
    setIsJourneyStarted(false);
    setGameStatus(isValidPath ? 'won' : 'lost');
    setShowResultAlert(true);
  }, []);

  const closeAlert = useCallback(() => {
    setShowResultAlert(false);
    setGameStatus('playing');
  }, []);

  const startJourney = useCallback(() => {
    setIsJourneyStarted(true);
  }, []);

  return {
    gameStatus,
    showResultAlert,
    isJourneyStarted,
    handleAnimationComplete,
    closeAlert,
    startJourney
  };
};

export default useGameState;
