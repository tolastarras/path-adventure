import { useState, useMemo } from 'react';

import {
  GlossyCard,
  GlossyButton,
  NumberInput,
  TextInput,
  HeaderTitle,
  AlertBox,
  GameCanvas,
  HowToPlay as HowToPlaySection,
  GameControls as GameControlsSection,
  GameStats as GameStatsSection,
  GameHeader as HeaderSection,
} from '@/new/components';

import { usePathGenerator } from '@/new/hooks';

import { DIRECTIONS, GAME_RESULTS, GAME_STATS } from '@/utils/constants';

import './NewHome.css';

const gameResult = GAME_RESULTS.success;

const NewHome = () => {
  const [step, setStep] = useState({ direction: '', squares: 1 });
  const [plannedRoute, setPlannedRoute] = useState([]);
  const [resetControlButtons, setResetControlButtons] = useState(false);
  const [resetNumberInput, setResetNumberInput] = useState(false);
  const [isAlertBoxOpen, setIsAlertBoxOpen] = useState(false);

  const { path } = usePathGenerator();

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
    if (step.direction && step.squares) {
      const icon = DIRECTIONS.find(item => item.id === step.direction).icon || '?';
      const newStep = `${step.squares}${icon}`;
      setPlannedRoute(prev => [...prev, newStep]);
      
      // reset direction buttons
      setResetControlButtons(true);
      setResetNumberInput(true);

      // reset step
      setStep({ direction: '', squares: 1 });
    }
  }

  const handleUndoStepToPath = () => {
    setPlannedRoute(prev => prev.slice(0, -1));
  }

  const handleStartJourney = () => {
    setPlannedRoute([]);

    setIsAlertBoxOpen(true);

    // auto close alert box
    setTimeout(() => {
      setIsAlertBoxOpen(false);
    }, 5000);
  }

  const handleNewAdventure = () => {
    setPlannedRoute([]);
  }

  const closeAlertBox = () => {
    setIsAlertBoxOpen(false);
  }

  const directionIcon = DIRECTIONS.find(item => item.id === step.direction)?.icon ?? '';

  const currentStep = useMemo(() => {
    if (!step.squares || !directionIcon) return '';
    return `${step.squares}${directionIcon}`;
  }, [step.squares, directionIcon]);

  return (
    <div className="flex flex-col md:w-full lg:w-[1250px] mx-auto">
      {isAlertBoxOpen && <AlertBox
        isOpen={isAlertBoxOpen}
        onClose={closeAlertBox}
        icon={gameResult.icon}
        variant={gameResult.variant}
        title={gameResult.title}
        description={gameResult.description}
      />}
      <GlossyCard>
        <div className="p-2 lg:p-10">
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
                  <TextInput disabled className='text-blue-200'>
                    {currentStep}
                  </TextInput>
                </GlossyCard>
                <div className="flex justify-between gap-6 my-6">
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
                    disabled={plannedRoute.length === 0}
                    onClick={handleUndoStepToPath}
                  >
                    Undo
                  </GlossyButton>
                </div>
              </div>
              <HowToPlaySection />
            </div>
            <div className='w-full flex flex-col gap-6'>
              <GameStatsSection gameStats={GAME_STATS} />
              <GlossyCard showPadding={false}>
                <GameCanvas path={path} />
              </GlossyCard>
              <div>
                <h1 className="mb-3">Planned Route:</h1>
                <TextInput disabled className='text-green-400/90'>
                  {plannedRoute.join(' ')}
                </TextInput>
              </div>
              <div className='flex gap-6'>
                <GlossyButton
                  variant="primary"
                  disabled={plannedRoute.length === 0}
                  onClick={handleStartJourney}
                >
                  Start Journey
                </GlossyButton>
                <GlossyButton
                  onClick={handleNewAdventure}
                >
                  New Adventure
                </GlossyButton>
              </div>
            </div>
          </div>
        </div>
      </GlossyCard>
    </div>
  )
};

export default NewHome;
