import { useState } from 'react';
import { GlossyCard, HeaderTitle, ProgressBar, NumberAnimation } from '.';
import { gameStatsImage } from '@/assets';

import './GameStats.css';

const GameStats = ({gameStats}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleStats = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <button
        onClick={toggleStats}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className={`game-stats__button ${isExpanded ? 'rotate-0' : 'rotate-720'}`}>
          <img
            src={gameStatsImage}
            alt="Game Stats"
            className="game-stats__image"
          />
          <span className={`game-stats__text`}>
            {isExpanded ? 'Hide Stats' : 'Show Stats'}
          </span>
        </div>
      </button>

      <div className={`game-stats-cards ${isExpanded ? 'open' : 'close'}`} >
        <div className="pt-4">
          <div className="game-stats__container">
            {gameStats.map(({ id, title, type, value }) => (
              <GlossyCard key={id} className="w-full lg:w-1/3">
                <HeaderTitle title={title} />
                {type === 'percent' &&
                  <ProgressBar percentage={value} isVisible={isExpanded} />}
                {type === 'number' &&
                  <NumberAnimation value={value} isVisible={isExpanded} />}
              </GlossyCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GameStats;
