import { GlossyButton, TextInput, GameCanvasCard } from '@/components';

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
    <GameCanvasCard
      mainCanvasRef={mainCanvasRef}
      animationCanvasRef={animationCanvasRef}
      currentPath={currentPath}
      gameStatus={gameStatus}
      playerMoves={playerMoves}
    />
    
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
          variant="warning"
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
