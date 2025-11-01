import { useState } from 'react';
import { GlossyCard, GlossyButton } from '.';
import CustomIcon from './ui/CustomIcon';
import { ICONS, ROTATION_ANGLES } from '../../utils/constants';

const GameControls = ({ onClick, directions, resetButtons }) => {
  const [selectedDirection, setSelectedDirection] = useState(null);

  const handleClick = (direction) => {
    setSelectedDirection(direction);
    onClick(direction);
  }

  return (
    <GlossyCard>
      <div className="flex flex-col gap-3">
        {[
          [directions[0]],           // First item alone
          directions.slice(1, 3),    // Second and third items together
          [directions[3]]            // Fourth item alone
        ].map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className={`flex ${row.length > 1 ? 'justify-between' : 'justify-center'}`}
          >
            {row.map(({id, rotation}) => (
              <GlossyButton
                key={id}
                variant="primary"
                className="w-20 h-20"
                isActive={id === selectedDirection && !resetButtons}
                onClick={() => handleClick(id)}
              >
                <CustomIcon
                  icon={ICONS.arrow}
                  className={`h-8 w-8 ${ROTATION_ANGLES[rotation]}`}
                />
              </GlossyButton>
            ))}
          </div>
        ))}
      </div>
    </GlossyCard>
  )
};

export default GameControls;
