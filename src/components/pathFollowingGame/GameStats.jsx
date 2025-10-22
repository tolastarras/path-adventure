import React from 'react';

const GameStats = ({ gamesWon, totalPoints }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md mb-4">
      <div className="flex gap-6 text-center">
        <div>
          <div className="text-2xl font-bold text-green-600">{gamesWon}</div>
          <div className="text-sm text-gray-600">Games Won</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-yellow-600">{totalPoints}</div>
          <div className="text-sm text-gray-600">Total Points</div>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
