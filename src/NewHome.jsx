import { useRef, useEffect } from 'react';
import { GlossyCard, ControlsPanel, GameArea, GameHeader } from '@/components';
import { useCanvasLogic, useGameLogic } from '@/hooks';

import './NewHome.css';

const NewHome = ({ onGameComplete }) => {
  const mainCanvasRef = useRef(null);
  const animationCanvasRef = useRef(null);

  const {
    // State
    gameStatus,
    isJourneyStarted,
    playerMoves,
    currentPath,
    step,
    resetControlButtons,
    resetNumberInput,
    currentStep,

    // Derived states
    canStartJourney,
    canClearRoute,
    showNewAdventure,

    // Handlers
    handleAddStepToPath,
    handleStartJourney,
    handleClearRoute,
    handleNewAdventure,
    handleIconClick,
    handleSquares,
    handleDirection,
    undoMove,
    resetStep,
    closeAlert,

    // Hooks
    drawBicycle,
  } = useGameLogic({ onGameComplete });

  const { setupAnimationCanvas } = useCanvasLogic(
    animationCanvasRef,
    currentPath,
    drawBicycle
  );

  // Effects
  useEffect(() => {
    const cleanup = setupAnimationCanvas(animationCanvasRef);
    return cleanup;
  }, [setupAnimationCanvas]);

  // Reset step when control buttons or number input are reset
  useEffect(() => {
    if (resetControlButtons && resetNumberInput) {
      resetStep();
    }
  }, [resetControlButtons, resetNumberInput, resetStep]);

  const handleStartJourneyWithContext = () => {
    const canvas = animationCanvasRef.current;
    if (!canvas) return;
    const animationCtx = canvas.getContext('2d');
    handleStartJourney(animationCtx);
  }

  return (
    <div className="top-container">
      <GlossyCard showOverflow>
        <div className="card-content__container">
          <GameHeader
            onIconClick={handleIconClick}
            onNewAdventure={handleNewAdventure}
            showNewAdventure={showNewAdventure}
            onResetGame={handleNewAdventure}
            onCloseAlert={closeAlert}
          />

          <div className="controls-panel__container">
            <ControlsPanel
              step={step}
              gameStatus={gameStatus}
              resetControlButtons={resetControlButtons}
              resetNumberInput={resetNumberInput}
              currentStep={currentStep}
              canStartJourney={canStartJourney}
              onSquaresChange={handleSquares}
              onDirectionChange={handleDirection}
              onAddStep={handleAddStepToPath}
              onUndoStep={undoMove}
            />

            <GameArea
              mainCanvasRef={mainCanvasRef}
              animationCanvasRef={animationCanvasRef}
              currentPath={currentPath}
              gameStatus={gameStatus}
              playerMoves={playerMoves}
              canStartJourney={canStartJourney}
              canClearRoute={canClearRoute}
              showNewAdventure={showNewAdventure}
              isJourneyStarted={isJourneyStarted}
              onStartJourney={handleStartJourneyWithContext}
              onClearRoute={handleClearRoute}
              onNewAdventure={handleNewAdventure}
            />
          </div>
        </div>
      </GlossyCard>
    </div>
  )
};

export default NewHome;
