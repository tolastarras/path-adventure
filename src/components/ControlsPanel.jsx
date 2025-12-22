import {
  GlossyCard,
  GlossyButton,
  NumberInput,
  TextInput,
  HeaderTitle,
  GameControls as GameControlsSection,
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
  onUndoStep,
  gameStatus,
}) => (
  <div className="flex flex-col space-y-4 md:max-w-48 lg:max-w-80">
    <div className="w-full">
      <GlossyCard>
        <HeaderTitle title="Squares" />
        <NumberInput
          resetInput={resetNumberInput}
          value={step.squares}
          onChange={onSquaresChange}
          gameStatus={gameStatus}
        />
      </GlossyCard>
    </div>
    
    <div>
      <GameControlsSection
        gameStatus={gameStatus}
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
      <div className="flex justify-between gap-4 my-4">
        <GlossyButton
          className="w-full"
          disabled={!step.direction}
          onClick={onAddStep}
        >
          Add
        </GlossyButton>
        <GlossyButton
          variant="warning"
          className="w-full"
          disabled={!canStartJourney}
          onClick={onUndoStep}
        >
          Undo
        </GlossyButton>
      </div>
    </div>
  </div>
);

export default ControlsPanel;
