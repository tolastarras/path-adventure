import { useState } from 'react';
import { GlossyCard, GlossyButton, CustomIcon } from '@/components';
import { rotationAngles } from '@/utils/constants';
import { arrowIcon } from '@/assets/icons';

import './GameControls.css';

const GameControls = ({ onClick, directions, resetButtons, gameStatus }) => {
  const [selectedDirection, setSelectedDirection] = useState(null);

  const handleClick = (direction) => {
    setSelectedDirection(direction);
    onClick(direction);
  }

  return (
    <GlossyCard>
      <div className="game-controls__container">
        <div className="game-controls-small">
          {directions.map(({id, rotation}) => (
            <GlossyButton
              key={id}
              variant="primary"
              className="w-full h-15"
              isActive={id === selectedDirection && !resetButtons}
              onClick={() => handleClick(id)}
              disabled={gameStatus !== 'playing'}
            >
              <CustomIcon
                icon={arrowIcon}
                size="md"
                className={rotationAngles[rotation]}
              />
            </GlossyButton>
          ))}
        </div>

        <div className="game-controls-medium">
          {directions.map(({id, rotation}, index) => (
            <div
              key={id}
              className={`flex justify-center
                ${index === 0 ? 'order-1' : ''}  /* top-left */
                ${index === 1 ? 'order-3' : ''}  /* top-right */
                ${index === 2 ? 'order-2' : ''}  /* bottom-left */
                ${index === 3 ? 'order-4' : ''}  /* bottom-right */
              `}
            >
              <GlossyButton
                variant="primary"
                className="w-19 h-15"
                isActive={id === selectedDirection && !resetButtons}
                onClick={() => handleClick(id)}
                disabled={gameStatus !== 'playing'}
              >
                <CustomIcon
                  icon={arrowIcon}
                  size="md"
                  className={rotationAngles[rotation]}
                />
              </GlossyButton>
            </div>
          ))}
        </div>

        <div className="game-controls-large">
          {[
            [directions[0]],           // First item alone (top)
            directions.slice(1, 3),    // Second and third items together (left, right)
            [directions[3]]            // Fourth item alone (bottom)
          ].map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex ${row.length > 1 ? 'middle-row' : 'justify-center'}`}
            >
              {row.map(({id, rotation}) => (
                <GlossyButton
                  key={id}
                  variant="primary"
                  className="w-15 h-15"
                  isActive={id === selectedDirection && !resetButtons}
                  onClick={() => handleClick(id)}
                  disabled={gameStatus !== 'playing'}
                >
                  <CustomIcon
                    icon={arrowIcon}
                    size="md"
                    className={rotationAngles[rotation]}
                  />
                </GlossyButton>
              ))}
            </div>
          ))}
        </div>
      </div>
    </GlossyCard>
  );
};

export default GameControls;
