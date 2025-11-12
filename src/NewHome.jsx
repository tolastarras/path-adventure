import { useState, useMemo, useCallback, useRef, useEffect } from 'react';

import {
  GlossyCard,
  GlossyButton,
  NumberInput,
  TextInput,
  HeaderTitle,
  GameCanvas,
  GameStatus,
  HowToPlay as HowToPlaySection,
  GameControls as GameControlsSection,
  GameStats as GameStatsSection,
  GameHeader as HeaderSection,
} from '@/components';

import {
  usePathGenerator,
  usePlayerPathDraw,
  useCanvas,
  useBicycleDraw,
  useSmoothPathAnimationDraw,
} from '@/hooks';

import { DIRECTIONS, GAME_STATS, CANVAS } from '@/utils/constants';
import { getCellCenterPoint, calculateBicycleDirection } from '@/utils/helpers/canvasHelper';

import './NewHome.css';

const NewHome = () => {
  const mainCanvasRef = useRef(null);
  const animationCanvasRef = useRef(null);

  // Use the animation canvas for the player path
  const animationCtx = animationCanvasRef.current?.getContext('2d');

  const { drawPlayerPath, stopAnimation, isPlayerPathValid } = usePlayerPathDraw();
  const { currentPath, clearGame } = usePathGenerator();

  const { startSmoothAnimation } = useSmoothPathAnimationDraw();
  const { drawBicycle } = useBicycleDraw();

  const [step, setStep] = useState({ direction: '', squares: 1 });
  const [playerMoves, setPlayerMoves] = useState([]);
  const [resetControlButtons, setResetControlButtons] = useState(false);
  const [resetNumberInput, setResetNumberInput] = useState(false);
  
  const [gameStatus, setGameStatus] = useState('lost');
  const [showResultAlert, setShowResultAlert] = useState(false);
  const [isJourneyStarted, setIsJourneyStarted] = useState(false);

  const handleSquares = (squares) => {
    setStep(prevStep => ({ ...prevStep, squares }));

    // reset number input
    setResetNumberInput(false);
  };

  const handleDirection = (direction) => {
    setStep(prevStep => ({ ...prevStep, direction }));

    // reset control buttons
    setResetControlButtons(false);

    // reset number input
    setResetNumberInput(false);
  };

  const handleAddStepToPath = () => {
    const { squares, direction } = step;

    if (direction && squares) {
      const icon = DIRECTIONS.find(item => item.id === direction).icon || '?';
      const newStep = `${squares}${icon}`;
      setPlayerMoves(prev => [...prev, newStep]);

      // reset direction buttons
      setResetControlButtons(true);
      setResetNumberInput(true);

      // reset step
      setStep({ direction: '', squares: 1 });
    }
  };

  const handleUndoStepToPath = () => {
    setPlayerMoves(prev => prev.slice(0, -1));
  }

  const handleAnimationComplete = useCallback((isValidPath) => {
    setIsJourneyStarted(false);
    setGameStatus(isValidPath ? 'won' : 'lost');
    setShowResultAlert(true);
  }, []);

  const handleStartJourney = () => {
    if (playerMoves.length === 0 || !animationCtx) return;

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
        setShowResultAlert(true);
      }
    });
  };

  const handleCloseAlert = () => {
    setShowResultAlert(false);
    setGameStatus('playing');
  };

  const handleClearPath = () => {
    clearGame();
    setPlayerMoves([]);
  }

  const handleNewAdventure = () => {
    // generateNewPath();
    // startNewGame();
  }

  const directionIcon = DIRECTIONS.find(item => item.id === step.direction)?.icon ?? '';
  const canStartJourney = playerMoves.length > 0;

  const currentStep = useMemo(() => {
    if (!step.squares || !directionIcon) return '';
    return `${step.squares}${directionIcon}`;
  }, [step.squares, directionIcon]);

  const { clearCanvas } = useCanvas(animationCanvasRef);

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
      {showResultAlert && <GameStatus
        gameStatus={gameStatus}
        playerMoves={playerMoves}
        onClose={handleCloseAlert}
      />}
      <GlossyCard>
        <div className="p-2 lg:p-10 space-y-6">
          <HeaderSection />
          <div className="pt-6 space-x-0 lg:flex lg:space-x-6">
            <div className="flex flex-col space-y-6">
              <div className="min-w-[300px]">
                <GlossyCard>
                  <h1 className="mb-4">Squares</h1>
                  <NumberInput
                    resetInput={resetNumberInput}
                    value={step.squares}
                    onChange={handleSquares}
                  />
                </GlossyCard>
              </div>
              <div>
                <GameControlsSection
                  resetButtons={resetControlButtons}
                  directions={DIRECTIONS}
                  onClick={handleDirection}
                />
              </div>
              <div>
                <GlossyCard>
                  <HeaderTitle title="Current Step" />
                  <TextInput disabled>
                    {currentStep}
                  </TextInput>
                </GlossyCard>
                <div className="flex justify-between gap-4 my-6">
                  <GlossyButton
                    className="w-full"
                    disabled={!step.direction}
                    onClick={handleAddStepToPath}
                  >
                    Add
                  </GlossyButton>
                  <GlossyButton
                    variant="danger"
                    className="w-full"
                    disabled={!canStartJourney}
                    onClick={handleUndoStepToPath}
                  >
                    Undo
                  </GlossyButton>
                </div>
              </div>
              <HowToPlaySection />
            </div>
            <div className='w-full flex flex-col space-y-6'>
              <GameStatsSection gameStats={GAME_STATS} />
              <GlossyCard showPadding={false}>
                <GameCanvas
                  canvasRef={mainCanvasRef}
                  path={currentPath}
                  gameStatus={gameStatus}
                  playerMoves={playerMoves}
                  // animationPosition={animationPosition}
                />
                <canvas 
                  ref={animationCanvasRef}
                  className="absolute top-0 left-0 pointer-events-none"
                  width={CANVAS.width}
                  height={CANVAS.height}
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
                    onClick={handleStartJourney}
                    // onClick={checkPath}
                  >
                    Start Journey!
                  </GlossyButton>
                  <GlossyButton
                    variant="success"
                    disabled={!canStartJourney}
                    onClick={handleClearPath}
                  >
                    Clear Path
                  </GlossyButton>
                </div>
                <div>
                  <GlossyButton
                    onClick={handleNewAdventure}
                  >
                    New Adventure
                  </GlossyButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlossyCard>
    </div>
  )
};

export default NewHome;
