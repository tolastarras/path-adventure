import { useMemo, useRef, useEffect } from 'react';

import {
  GlossyCard,
  NumberInput,
  GameStatus,
  ControlsPanel,
  GameArea,
  GameHeader as HeaderSection,
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
  const { step, resetControlButtons, resetNumberInput, handleSquares, handleDirection, resetStep, setResetControlButtons, setResetNumberInput } = useStepManagement();
  const { playerMoves, addMove, undoMove, clearPath } = usePathManagement();
  const { gameStatus, showResultAlert, isJourneyStarted, handleAnimationComplete, closeAlert, startJourney } = useGameState();

  // Game hooks
  const { isPlayerPathValid } = usePlayerPathDraw();
  const { currentPath, clearGame } = usePathGenerator();
  const { startSmoothAnimation } = useSmoothPathAnimationDraw();
  const { drawBicycle } = useBicycleDraw();
  const { clearCanvas } = useCanvas(animationCanvasRef);

  // Helpers
  const canStartJourney = playerMoves.length > 0;
  
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
      }
    });
  };

  const handleClearPath = () => {
    clearGame();
    clearPath();
  }

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
    <div className="flex flex-col md:w-full lg:w-[1250px] mx-auto">
      {showResultAlert && (
        <GameStatus
          gameStatus={gameStatus}
          playerMoves={playerMoves}
          correctPath={currentPath}
          onClose={closeAlert}
        />
      )}
      <GlossyCard>
        <div className="p-2 lg:p-10 space-y-6">
          <HeaderSection />
          <div className="pt-6 space-x-0 lg:flex lg:space-x-6">
            <ControlsPanel
              step={step}
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
              isJourneyStarted={isJourneyStarted}
              onStartJourney={handleStartJourney}
              onClearPath={handleClearPath}
            />
          </div>
        </div>
      </GlossyCard>
    </div>
  )
};

export default NewHome;
