import { useEffect, useRef } from 'react';
import { useGameDraw } from '@/new/hooks/useGameDraw';
import { CANVAS } from '@/utils/constants';

const GameCanvas = ({
  path,
  staticPath = false,
  // animationPosition,
  // gameStatus,
  // playerMoves,
  // animationProgress
}) => {
  const canvasRef = useRef(null);
  const { draw } = useGameDraw(canvasRef, path, staticPath);
  const { width, height } = CANVAS;
  // const { draw } = useGameDraw(canvasRef, path, animationPosition, gameStatus, playerMoves);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <>
      {/* {gameStatus === 'animating' && (
        <div className="w-full max-w-md mb-4">
          <div className="text-center text-gray-600 mb-2">Following your route...</div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${animationProgress}%` }}
            ></div>
          </div>
        </div>
      )} */}

      <div className="relative">
        <canvas ref={canvasRef} width={width} height={height} />
      </div>
    </>
  );
};

export default GameCanvas;
