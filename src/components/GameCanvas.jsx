import { useEffect, useRef } from 'react';
import { useGameDraw, useTerrainImages } from '@/hooks';
import { getGameAreaSize } from '@/utils/helpers';

const GameCanvas = ({
  canvasRef,
  path,
  animationPosition,
  gameStatus,
  playerMoves,
  className = 'relative',
}) => {
  const { allImagesLoaded } = useTerrainImages();
  const { draw } = useGameDraw(canvasRef, path, animationPosition, gameStatus, playerMoves);
  const { width, height } = getGameAreaSize();

  const drawRef = useRef();
  drawRef.current = draw;

  useEffect(() => {
    drawRef.current();
  }, [path, allImagesLoaded]);

  return (
    <div className={className}>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

export default GameCanvas;
