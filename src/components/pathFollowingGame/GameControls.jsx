import React from 'react';

const GameControls = ({
  currentDirection,
  setCurrentDirection,
  moveCount,
  setMoveCount,
  playerMoves,
  gameStatus,
  checkPath,
  addMove,
  removeLastMove
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md mb-4 w-full max-w-2xl">
      <h3 className="text-lg font-bold text-center mb-3">Plan Your Route</h3>
      
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-3">
        <div className="flex gap-2">
          {['↑', '→', '←', '↓'].map((dir) => (
            <button
              key={dir}
              onClick={() => setCurrentDirection(dir)}
              disabled={gameStatus !== 'planning'}
              className={`w-12 h-12 text-xl font-bold rounded-lg border-2 transition-all ${
                currentDirection === dir
                  ? 'bg-blue-500 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 disabled:bg-gray-200'
              }`}
            >
              {dir}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-medium">Squares:</label>
          <input
            type="number"
            min="1"
            max="9"
            value={moveCount}
            onChange={(e) => setMoveCount(parseInt(e.target.value) || 1)}
            disabled={gameStatus !== 'planning'}
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center disabled:bg-gray-200"
          />
        </div>

        <button
          onClick={addMove}
          disabled={!currentDirection || gameStatus !== 'planning'}
          className="px-6 py-2 bg-green-500 text-gray-300 font-semibold rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Add Move
        </button>

        <button
          onClick={removeLastMove}
          disabled={playerMoves.length === 0 || gameStatus !== 'planning'}
          className="px-4 py-2 bg-red-500 text-gray-300 font-semibold rounded-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Undo
        </button>
      </div>

      <div className="text-center text-gray-600 mb-2">
        {currentDirection ? (
          <p>Ready to add: {moveCount} {currentDirection}</p>
        ) : (
          <p>Select a direction and squares to add to your route</p>
        )}
      </div>

      <div className="bg-yellow-50 rounded-lg p-3 border-2 border-yellow-200">
        <h4 className="font-semibold text-gray-700 mb-2">Your Planned Route:</h4>
        <div className="text-lg font-mono bg-white p-3 rounded border min-h-12">
          {playerMoves.length > 0 ? playerMoves.join(' ') : 'No moves planned yet...'}
        </div>
      </div>

      <div className="flex gap-4 mt-4 justify-center">
        <button
          onClick={checkPath}
          disabled={playerMoves.length === 0 || gameStatus !== 'planning'}
          className="px-8 py-3 bg-purple-500 text-gray-400 font-bold rounded-lg hover:bg-purple-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-lg"
        >
          Start Journey! 🚀
        </button>
      </div>
    </div>
  );
};

export default GameControls;
