import {
  GlossyCard,
  GlossyButton,
  NumberInput,
  TextInput,
  HeaderTitle,
  GameControls as GameControlsSection,
  HowToPlay as HowToPlaySection,
} from '@/components';
import { directionObjects } from '@/utils/constants';

const ControlsPanel = ({
  step,
  resetControlButtons,
  resetNumberInput,
  currentStep,
  canStartJourney,
  onSquaresChange,
  onDirectionChange,
  onAddStep,
  onUndoStep
}) => (
  <div className="flex flex-col space-y-6">
    <div className="min-w-[300px]">
      <GlossyCard>
        <h1 className="mb-4">Squares</h1>
        <NumberInput
          resetInput={resetNumberInput}
          value={step.squares}
          onChange={onSquaresChange}
        />
      </GlossyCard>
    </div>
    
    <div>
      <GameControlsSection
        resetButtons={resetControlButtons}
        directions={directionObjects}
        onClick={onDirectionChange}
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
          onClick={onAddStep}
        >
          Add
        </GlossyButton>
        <GlossyButton
          variant="danger"
          className="w-full"
          disabled={!canStartJourney}
          onClick={onUndoStep}
        >
          Undo
        </GlossyButton>
      </div>
    </div>
    
    <HowToPlaySection />
  </div>
);

export default ControlsPanel;
