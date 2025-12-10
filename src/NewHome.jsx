import { useMemo, useRef, useEffect } from 'react';

import {
  GlossyCard,
  IconMenu,
  GameStatusAlert,
  HowToPlayAlert,
  LeaderboardAlert,
  ControlsPanel,
  GameArea,
  BubbleDialog,
  GameHeader as HeaderSection,
  GameStats as GameStatsSection,
} from '@/components';

import {
  usePathGenerator,
  usePlayerPathDraw,
  useCanvas,
  useBicycleDraw,
  useSmoothPathAnimationDraw,
  useStepManagement,
  usePathManagement,
  useGameState,
  useAlertBoxManager,
} from '@/hooks';

import {
  getCellCenterPoint,
  calculateBicycleDirection,
  formatStep,
} from '@/utils/helpers';

import './NewHome.css';

const NewHome = () => {
  const mainCanvasRef = useRef(null);
  const animationCanvasRef = useRef(null);

  // Use the animation canvas for the player path
  const animationCtx = animationCanvasRef.current?.getContext('2d');

  // Custom hooks
  const {
    playerMoves,
    addMove,
    undoMove,
    clearPath,
  } = usePathManagement();

  const {
    step,
    resetControlButtons,
    resetNumberInput,
    handleSquares,
    handleDirection,
    resetStep,
    setResetControlButtons,
    setResetNumberInput,
  } = useStepManagement();

  const {
    gameStatus,
    isJourneyStarted,
    isJourneyComplete,
    handleAnimationComplete,
    startJourney,
    resetGame,
  } = useGameState();

  const {
    isAlertOpen,
    openAlert,
    closeAlert
  } = useAlertBoxManager();

  // Game hooks
  const { isPlayerPathValid } = usePlayerPathDraw();
  const { currentPath, generateNewPath } = usePathGenerator();
  const { startSmoothAnimation } = useSmoothPathAnimationDraw();
  const { drawBicycle } = useBicycleDraw();
  const { clearCanvas } = useCanvas(animationCanvasRef);

  // Button states
  const canStartJourney = playerMoves.length > 0 && !isJourneyStarted && !isJourneyComplete;
  const canClearRoute = playerMoves.length > 0 && !isJourneyStarted;
  const showNewAdventure = isJourneyComplete;

  const currentStep = useMemo(() => {
    const newStep = formatStep(step);
    return newStep;
  }, [step]);

  // Event handlers
  const handleAddStepToPath = () => {
    const { squares, direction } = step;

    if (direction && squares) {
      const newStep = formatStep(step);
      addMove(newStep);

      // reset direction buttons
      setResetControlButtons(true);
      setResetNumberInput(true);
      resetStep();
    }
  };

  const handleStartJourney = () => {
    if (playerMoves.length === 0 || !animationCtx) return;

    startJourney();

    let lastXPosition = null;
    let lastDirection = 'right';

    startSmoothAnimation(animationCtx, playerMoves, currentPath, {
      drawBicycle: (ctx, x, y) => {
        const direction = calculateBicycleDirection(x, lastXPosition, lastDirection);
        lastXPosition = x;
        lastDirection = direction;
        drawBicycle(ctx, x, y, direction, false);
      },
      onAnimationComplete: () => {
        const isCorrect = isPlayerPathValid(playerMoves, currentPath);
        handleAnimationComplete(isCorrect);
        openAlert('game-result');
      }
    });
  };

  const handleClearRoute = () => {
    clearPath();
  }

  const handleNewAdventure = () => {
    resetGame();

    // Clear current moves
    clearPath();

    // Generate new path
    generateNewPath();
  }

  const handleCloseGameStatusAlert = () => {
    closeAlert();
  };

  const handleCloseAlert = () => {
    closeAlert();
  };

  const handleIconClick = (id) => {
    openAlert(id);
  };

  useEffect(() => {
    const animationCtx = animationCanvasRef.current?.getContext('2d');
    const mainCtx = mainCanvasRef.current?.getContext('2d');

    if (animationCtx && mainCtx && currentPath.length > 0) {
      // Wait a brief moment for the main canvas to render
      const timer = setTimeout(() => {
        // Clear any existing content from animation canvas
        clearCanvas(animationCtx);
        animationCtx.clearRect(0, 0, animationCtx.canvas.width, animationCtx.canvas.height);

        // Draw bicycle at starting position
        const startCell = currentPath[0];
        const { x, y } = getCellCenterPoint(startCell);

        drawBicycle(animationCtx, x, y);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [currentPath, drawBicycle, clearCanvas]);

  return (
    <div className="top-container">
      {isAlertOpen('game-result') && (
        <GameStatusAlert
          gameStatus={gameStatus}
          playerMoves={playerMoves}
          currentPath={currentPath}
          onClose={handleCloseGameStatusAlert}
        />
      )}
      {isAlertOpen('about-game') && (
        <HowToPlayAlert onClose={handleCloseAlert} />
      )}
      {isAlertOpen('leaderboard') && (
        <LeaderboardAlert onClose={handleCloseAlert} />
      )}
      <GlossyCard showOverflow>
        <div className="p-1 md:p-4">
          <HeaderSection className="mb-4" />
          <div className="relative mb-2">
            <GameStatsSection className="mb-8" />
            <div className="absolute top-1 right-2">
              <IconMenu onClick={handleIconClick} onClose={closeAlert} />
            </div>
          </div>

          <div className="md:flex sm:gap-2 md:gap-7">
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
              onStartJourney={handleStartJourney}
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
