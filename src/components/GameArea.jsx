import {
  GlossyCard,
  GlossyButton,
  TextInput,
  GameCanvas,
  GameStats as GameStatsSection,
} from '@/components';
import { gameStats, canvas } from '@/utils/constants';

const GameArea = ({
  mainCanvasRef,
  animationCanvasRef,
  currentPath,
  gameStatus,
  playerMoves,
  canStartJourney,
  isJourneyStarted,
  onStartJourney,
  onClearPath
}) => (
  <div className='w-full flex flex-col space-y-6'>
    <GameStatsSection gameStats={gameStats} />
    
    <GlossyCard showPadding={false}>
      <GameCanvas
        canvasRef={mainCanvasRef}
        path={currentPath}
        gameStatus={gameStatus}
        playerMoves={playerMoves}
      />
      <canvas 
        ref={animationCanvasRef}
        className="absolute top-0 left-0 pointer-events-none"
        width={canvas.width}
        height={canvas.height}
        style={{ zIndex: 10 }}
      />
    </GlossyCard>
    
    <div>
      <TextInput disabled placeholder='Your Planned Route'>
        {playerMoves.join(' ')}
      </TextInput>
    </div>
    
    <div className='flex gap-6 justify-between'>
      <div className='flex gap-3'>
        <GlossyButton
          variant="primary"
          disabled={!canStartJourney || isJourneyStarted}
          onClick={onStartJourney}
        >
          Start Journey!
        </GlossyButton>
        <GlossyButton
          variant="success"
          disabled={!canStartJourney}
          onClick={onClearPath}
        >
          Clear Path
        </GlossyButton>
      </div>
      <div>
        <GlossyButton onClick={() => {}}>
          New Adventure
        </GlossyButton>
      </div>
    </div>
  </div>
);

export default GameArea;
