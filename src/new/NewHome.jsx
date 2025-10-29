import {
  GlossyCard,
  GlossyButton,
  NumberInput,
  TextInput,
  GameControls
} from './components';

import { useState, useMemo } from 'react';

import { DATA, DIRECTIONS } from '../utils/constants';

import './NewHome.css';

const NewHome = () => {
  const { title, description } = DATA;
  const [step, setStep] = useState({ direction: '', squares: 1 });
  const [plannedRoute, setPlannedRoute] = useState([]);
  const [resetControlButtons, setResetControlButtons] = useState(false);
  const [resetNumberInput, setResetNumberInput] = useState(false);

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
    console.log('start journey');
    setPlannedRoute([]);
  }

  const directionIcon = DIRECTIONS.find(item => item.id === step.direction)?.icon ?? '';

  const currentStep = useMemo(() => {
    if (!step.squares || !directionIcon) return '';
    return `${step.squares}${directionIcon}`;
  }, [step.squares, directionIcon]);

  return (
    <div className="flex flex-col md:w-full lg:w-[1250px] mx-auto">
      <GlossyCard
        className="main-card"
        title={title}
        description={description}
      >
        <img className="absolute top-0 right-0" width={150} src="/cyclist.webp" alt="logo" />
        <div className="pt-6 lg:flex space-x-6">
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
              <GameControls
                resetButtons={resetControlButtons}
                directions={DIRECTIONS}
                onClick={handleDirection}
              />
            </div>
            <div>
              <GlossyCard>
                <h2 className="mb-4 opacity-90">Current Step</h2>
                <TextInput disabled className='text-blue-200'>
                  {currentStep}
                </TextInput>
              </GlossyCard>
            </div>
            <div>
              <h3 className="mb-4 opacity-90">Plan Your Route</h3>
              <ol className="text-blue-200 list-decimal list-inside space-y-2">
                <li>Select the squares</li>
                <li>Select a direction</li>
                <li>Click "Add Move"</li>
              </ol>
            </div>
          </div>
          <div className='w-full flex flex-col gap-6'>
            <div className="flex justify-between">
              <div className="flex space-x-6">
                <GlossyCard>
                  <h3>Games Won</h3>
                  progress ...
                </GlossyCard>
                <GlossyCard>
                  <h3>Total Points</h3>
                  progress ...
                </GlossyCard>
              </div>
              <GlossyCard>
                <h3>Total Points</h3>
                progress ...
              </GlossyCard>
            </div>
            <div>
              <GlossyCard className="min-h-[700px]">
                CANVAS
              </GlossyCard>
            </div>
            <div>
              <h1 className="mb-3">Planned Route:</h1>
              <TextInput disabled className='text-green-400/90'>
                {plannedRoute.join(' ')}
              </TextInput>
            </div>
            <div className='flex justify-between mt-4'>
              <div className="flex space-x-4">
                <GlossyButton
                  disabled={!step.direction}
                  onClick={handleAddStepToPath}
                >
                  Add Move
                </GlossyButton>
                <GlossyButton
                  variant="danger"
                  disabled={plannedRoute.length === 0}
                  onClick={handleUndoStepToPath}
                >
                  Undo Move
                </GlossyButton>
              </div>
              <div>
                <GlossyButton
                  variant="primary"
                  disabled={plannedRoute.length === 0}
                  onClick={handleStartJourney}
                >
                  Start Journey
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
