import {
  GlossyCard,
  GlossyButton,
  TextInput,
  GameCanvas,
} from '@/components';

import { canvas } from '@/utils/constants';

const GameArea = ({
  mainCanvasRef,
  animationCanvasRef,
  currentPath,
  gameStatus,
  playerMoves,
  canStartJourney,
  canClearRoute,
  showNewAdventure,
  isJourneyStarted,
  onStartJourney,
  onClearRoute,
  onNewAdventure,
}) => (
  <div className='w-full flex flex-col space-y-6'>
    <GlossyCard showPadding={false}>
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
    
    <div>
      <TextInput disabled placeholder='Your Planned Route'>
        {playerMoves.join(' ')}
      </TextInput>
    </div>
    
    <div className='flex gap-6 justify-between'>
      <div className='flex gap-3'>
        {showNewAdventure ? (
          <GlossyButton
            variant="success"
            onClick={onNewAdventure}
          >
            New Adventure
          </GlossyButton>
        ) : (
          <GlossyButton
            variant="primary"
            disabled={!canStartJourney}
            onClick={onStartJourney}
          >
            {isJourneyStarted ? 'In Progress...' : 'Start Journey!'}
          </GlossyButton>
        )}

        <GlossyButton
          variant="danger"
          disabled={!canClearRoute || showNewAdventure}
          onClick={onClearRoute}
        >
          Clear Route
        </GlossyButton>
      </div>
    </div>
  </div>
);

export default GameArea;
