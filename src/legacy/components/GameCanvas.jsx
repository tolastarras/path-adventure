import React, { useEffect, useRef } from 'react';
import { useCanvasDraw } from '../hooks/useCanvasDraw';
import { GRID_SIZE, CELL_SIZE, CANVAS_PADDING } from '../utils/constants';

const GameCanvas = ({
  path,
  animationPosition,
  gameStatus,
  playerMoves,
  animationProgress
}) => {
  const canvasRef = useRef(null);
  const { draw } = useCanvasDraw(canvasRef, path, animationPosition, gameStatus, playerMoves);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <>
      {gameStatus === 'animating' && (
        <div className="w-full max-w-md mb-4">
          <div className="text-center text-gray-600 mb-2">Following your route...</div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${animationProgress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="relative mb-6">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE + CANVAS_PADDING * 2}
          height={GRID_SIZE * CELL_SIZE + CANVAS_PADDING * 2}
          className="border-2 border-gray-300 rounded-lg shadow-lg bg-white"
        />
      </div>
    </>
  );
};

export default GameCanvas;
