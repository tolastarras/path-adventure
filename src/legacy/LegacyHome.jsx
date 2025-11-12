import React, { useState, useCallback } from 'react';

import GameCanvas from './components/GameCanvas';
import { GameControls, GameStats, GameStatus, Instructions } from './components';

import { usePathGenerator } from './hooks/usePathGenerator';
import { useGameAnimation } from './hooks/useGameAnimation';

import { DATA } from '@/utils/constants';

const LegacyHome = () => {
  const [playerMoves, setPlayerMoves] = useState([]);
  const [currentDirection, setCurrentDirection] = useState('');
  const [moveCount, setMoveCount] = useState(1);
  const [gameStatus, setGameStatus] = useState('planning');

  const { title, description } = DATA;
  
  const {
    path,
    generateNewPath,
    clearGame
  } = usePathGenerator();

  const {
    animationPosition,
    animationProgress,
    gamesWon,
    totalPoints,
    showPointsAnimation,
    checkPath,
    startNewGame
  } = useGameAnimation(path, playerMoves, gameStatus, setGameStatus);

  const handleGenerateNewPath = () => {
    generateNewPath();
    startNewGame();
    setPlayerMoves([]);
    setCurrentDirection('');
    setMoveCount(1);
  };

  const handleClearPlan = () => {
    clearGame();
    setPlayerMoves([]);
    setCurrentDirection('');
    setMoveCount(1);
  };

  return (
    <div className="flex flex-col items-center bg-linear-to-br from-blue-50 to-green-50 min-h-screen py-8">
      <h1 className="text-4xl font-bold text-blue-800">{title}</h1>
      <p className="text-gray-600 mb-4 text-lg">{description}</p>

      <div className="pt-5">
        <GameStats gamesWon={gamesWon} totalPoints={totalPoints} />
      </div>
      
      <div className="py-5">
        <GameStatus 
          gameStatus={gameStatus} 
          showPointsAnimation={showPointsAnimation}
          playerMoves={playerMoves}
        />
      </div>

      <GameControls
        currentDirection={currentDirection}
        setCurrentDirection={setCurrentDirection}
        moveCount={moveCount}
        setMoveCount={setMoveCount}
        playerMoves={playerMoves}
        setPlayerMoves={setPlayerMoves}
        gameStatus={gameStatus}
        checkPath={checkPath}
c
        removeLastMove={useCallback(() => {
          setPlayerMoves(prev => prev.slice(0, -1));
        }, [])}
      />

      <GameCanvas
        path={path}
        animationPosition={animationPosition}
        gameStatus={gameStatus}
        playerMoves={playerMoves}
        animationProgress={animationProgress}
      />

      <div className="flex gap-4">
        <button
          onClick={handleGenerateNewPath}
          className="px-6 py-2 bg-blue-500 text-gray-300 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
        >
          New Adventure
        </button>
        
        <button
          onClick={handleClearPlan}
          className="px-6 py-2 bg-orange-500 text-gray-300 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
        >
          Clear Plan
        </button>
      </div>

      <Instructions />
    </div>
  );
};

export default LegacyHome;
