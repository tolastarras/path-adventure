import { useEffect, useRef } from 'react';
import { useGameDraw, useTerrainImages } from '@/hooks';

import { canvas } from '@/utils/constants';

const GameCanvas = ({
  canvasRef,
  path,
  animationPosition,
  gameStatus,
  playerMoves,
}) => {
  const { allImagesLoaded } = useTerrainImages();
  const { draw } = useGameDraw(canvasRef, path, animationPosition, gameStatus, playerMoves);
  const { width, height } = canvas;

  // Store draw in a ref to avoid dependency issues
  const drawRef = useRef();
  drawRef.current = draw;

  useEffect(() => {
    drawRef.current();
  }, [path, allImagesLoaded]);

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

export default GameCanvas;
