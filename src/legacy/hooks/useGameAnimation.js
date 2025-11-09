import { useState, useRef, useCallback } from 'react';
import { reconstructPlayerPath } from '../utils/gameLogic';

export const useGameAnimation = (path, playerMoves, gameStatus, setGameStatus) => {
  const animationRef = useRef(null);
  const [animationPosition, setAnimationPosition] = useState(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [gamesWon, setGamesWon] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);

  const animatePath = useCallback((playerPath, isCorrect) => {
    let currentStep = 0;
    const totalSteps = playerPath.length;
    const animationSpeed = 800;
    
    const animate = () => {
      if (currentStep < totalSteps) {
        setAnimationPosition(playerPath[currentStep]);
        setAnimationProgress((currentStep / totalSteps) * 100);
        currentStep++;
        
        setTimeout(() => {
          animationRef.current = requestAnimationFrame(animate);
        }, animationSpeed);
      } else {
        if (isCorrect) {
          const pointsEarned = Math.max(1, 15 - playerMoves.length);
          setGamesWon(prev => prev + 1);
          setTotalPoints(prev => prev + pointsEarned);
          setShowPointsAnimation(true);
          setTimeout(() => setShowPointsAnimation(false), 2000);
          setGameStatus('won');
        } else {
          setGameStatus('lost');
        }
      }
    };
    
    animate();
  }, [playerMoves.length, setGameStatus]);

  const checkPath = useCallback(() => {
    if (playerMoves.length === 0) return;
    
    const playerPath = reconstructPlayerPath(playerMoves, path);
    const actualEnd = path[path.length - 1];
    const playerEnd = playerPath[playerPath.length - 1];
    
    const isCorrect = playerEnd.x === actualEnd.x && playerEnd.y === actualEnd.y;
    
    setGameStatus('animating');
    setAnimationPosition({ x: path[0].x, y: path[0].y });
    setTimeout(() => animatePath(playerPath, isCorrect), 500);
  }, [playerMoves, path, animatePath, setGameStatus]);

  const startNewGame = useCallback(() => {
    cancelAnimationFrame(animationRef.current);
    setGameStatus('planning');
    setAnimationPosition(null);
    setAnimationProgress(0);
  }, [setGameStatus]);

  return {
    animationPosition,
    animationProgress,
    gamesWon,
    totalPoints,
    showPointsAnimation,
    checkPath,
    startNewGame
  };
};
