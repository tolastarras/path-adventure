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
  <div className='w-full flex flex-col space-y-4'>
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
    
    <div className='flex flex-wrap gap-6 w-full'>
      <div className='flex flex-col md:flex-row gap-3 w-full'>
        {showNewAdventure ? (
          <GlossyButton
            variant="success"
            className="w-full md:max-w-48"
            onClick={onNewAdventure}
          >
            New Adventure
          </GlossyButton>
        ) : (
          <GlossyButton
            variant="primary"
            className="w-full md:max-w-48"
            disabled={!canStartJourney}
            onClick={onStartJourney}
          >
            {isJourneyStarted ? 'In Progress...' : 'Start Journey!'}
          </GlossyButton>
        )}

        <GlossyButton
          variant="danger"
          className="w-full md:max-w-40"
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
