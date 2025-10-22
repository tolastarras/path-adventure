import React from 'react';

const GameStatus = ({ gameStatus, showPointsAnimation, playerMoves }) => {
  if (gameStatus === 'won') {
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg mb-4 animate-bounce">
        <div className="text-xl font-bold text-center">🎉 Perfect Route! You won! 🎉</div>
        {showPointsAnimation && (
          <div className="text-center text-lg mt-2 animate-pulse">
            +{Math.max(1, 15 - playerMoves.length)} points! ✨
          </div>
        )}
      </div>
    );
  }
  
  if (gameStatus === 'lost') {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded-lg mb-4 animate-shake">
        <div className="text-xl font-bold text-center">😢 Wrong Route! Try again! 😢</div>
      </div>
    );
  }
  
  return null;
};

export default GameStatus;
