import React, { useState, useCallback } from 'react';
import GameCanvas from '../Canvas/GameCanvas';
import GameControls from './GameControls';
import GameStats from './GameStats';
import GameStatus from './GameStatus';
import Instructions from './Instructions';
import { usePathGenerator } from '../../hooks/usePathGenerator';
import { useGameAnimation } from '../../hooks/useGameAnimation';

const PathFollowingGame = () => {
  const [playerMoves, setPlayerMoves] = useState([]);
  const [currentDirection, setCurrentDirection] = useState('');
  const [moveCount, setMoveCount] = useState(1);
  const [gameStatus, setGameStatus] = useState('planning');
  
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
    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-2 text-blue-800">Path Adventure! 🚴‍♂️</h1>
      <p className="text-gray-600 mb-4 text-lg">Follow the blue path from 🚴‍♂️ to 🏁 with your moves!</p>

      <GameStats gamesWon={gamesWon} totalPoints={totalPoints} />
      
      <GameStatus 
        gameStatus={gameStatus} 
        showPointsAnimation={showPointsAnimation}
        playerMoves={playerMoves}
      />

      <GameControls
        currentDirection={currentDirection}
        setCurrentDirection={setCurrentDirection}
        moveCount={moveCount}
        setMoveCount={setMoveCount}
        playerMoves={playerMoves}
        setPlayerMoves={setPlayerMoves}
        gameStatus={gameStatus}
        checkPath={checkPath}
        addMove={useCallback(() => {
          if (!currentDirection || moveCount < 1) return;
          setPlayerMoves(prev => [...prev, `${moveCount}${currentDirection}`]);
          setCurrentDirection('');
          setMoveCount(1);
        }, [currentDirection, moveCount])}
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

export default PathFollowingGame;
