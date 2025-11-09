import { useEffect, useRef } from 'react';
import { useGameDraw, useTerrainImages } from '@/hooks';

import { CANVAS } from '@/utils/constants';

const GameCanvas = ({
  path,
  staticPath = false,
}) => {
  const canvasRef = useRef(null);
  const { allImagesLoaded } = useTerrainImages();
  const { draw } = useGameDraw(canvasRef, path, staticPath);
  const { width, height } = CANVAS;

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
