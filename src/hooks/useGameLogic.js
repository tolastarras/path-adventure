import { useCallback, useMemo } from 'react';
import { calculateBicycleDirection, formatStep } from '@/utils/helpers';
import {
  usePathGenerator,
  usePlayerPathDraw,
  useBicycleDraw,
  useSmoothPathAnimationDraw,
  useStepManagement,
  usePathManagement,
  useGameState,
  useAlertBoxManager,
} from '@/hooks';

const useGameLogic = ({ onGameComplete }) => {
  // Custom hooks
  const { openAlert, closeAlert } = useAlertBoxManager();
  const { playerMoves, addMove, undoMove, clearPath } = usePathManagement();

  const {
    step,
    resetStep,
    handleSquares,
    handleDirection,
    resetControlButtons,
    resetNumberInput,
    setResetControlButtons,
    setResetNumberInput,
  } = useStepManagement();

  const {
    gameStatus,
    isJourneyStarted,
    isJourneyComplete,
    handleAnimationComplete,
    startJourney,
    resetGameStatus
  } = useGameState();

  const { isPlayerPathValid } = usePlayerPathDraw();
  const { currentPath, generateNewPath } = usePathGenerator();
  const { startSmoothAnimation } = useSmoothPathAnimationDraw();
  const { drawBicycle } = useBicycleDraw();

  // Memoized values
  const currentStep = useMemo(() => formatStep(step), [step]);

  // Derived states
  const canStartJourney = playerMoves.length > 0 && !isJourneyStarted && !isJourneyComplete;
  const canClearRoute = playerMoves.length > 0 && !isJourneyStarted;
  const showNewAdventure = isJourneyComplete;

  // Event handlers
  const handleAddStepToPath = useCallback(() => {
    const { squares, direction } = step;
    
    if (direction && squares) {
      const newStep = formatStep(step);
      addMove(newStep);
      resetStep();

      // Set the reset flags AFTER adding step
      setResetControlButtons(true);
      setResetNumberInput(true);
    }
  }, [step, addMove, resetStep, setResetControlButtons, setResetNumberInput]);

  const handleStartJourney = useCallback((animationCtx) => {
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
        onGameComplete?.({
          gameStatus: isCorrect ? 'won' : 'lost',
          playerMoves,
          currentPath,
        });
        openAlert('game-result');
      }
    });
  }, [playerMoves, currentPath, startJourney, startSmoothAnimation, drawBicycle, isPlayerPathValid, handleAnimationComplete, onGameComplete, openAlert]);

  const handleClearRoute = useCallback(() => {
    clearPath();
  }, [clearPath]);

  const handleNewAdventure = useCallback(() => {
    resetGameStatus();
    clearPath();
    generateNewPath();

    // Reset control states on new adventure
    setResetControlButtons(true);
    setResetNumberInput(true);
  }, [resetGameStatus, clearPath, generateNewPath, setResetControlButtons, setResetNumberInput]);

  const handleIconClick = useCallback((alertId) => {
    openAlert(alertId);
  }, [openAlert]);

  return {
    // State
    gameStatus,
    isJourneyStarted,
    isJourneyComplete,
    playerMoves,
    currentPath,
    step,
    resetControlButtons,
    resetNumberInput,
    currentStep,

    // Setters
    setResetControlButtons,
    setResetNumberInput,

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
    generateNewPath,
    clearPath,
    resetGameStatus,
  };
};

export default useGameLogic;
