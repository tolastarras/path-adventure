import { useEffect } from 'react';
import { GlossyCard, GameCanvas } from '@/components';
import { canvas } from '@/utils/constants';

const GameCanvasCard = ({
  mainCanvasRef,
  animationCanvasRef,
  currentPath,
  gameStatus,
  playerMoves,
}) => {
  useEffect(() => {
    const handleResize = () => {
      window.location.reload(true);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <GlossyCard showPadding={false} className="relative">
      <GameCanvas
        canvasRef={mainCanvasRef}
        path={currentPath}
        gameStatus={gameStatus}
        playerMoves={playerMoves}
      />
      <canvas 
        ref={animationCanvasRef}
        className="absolute top-0 left-0 pointer-events-none z-10"
        width={canvas.width}
        height={canvas.height}
      />
    </GlossyCard>
  );
};

export default GameCanvasCard;
