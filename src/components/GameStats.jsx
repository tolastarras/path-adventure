import { useState, useMemo } from 'react';
import { GlossyCard, HeaderTitle, ProgressBar, NumberAnimation } from '.';
import { getScoreStats } from '@/utils/helpers';
import { buildGameStatsCards } from '@/utils/helpers';
import { gameStatsImage } from '@/assets';
import { username } from '@/utils/constants';

import './GameStats.css';

const GameStats = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleStats = () => {
    setIsExpanded(!isExpanded);
  };

  // Only calculate stats when expanded or when stats change
  const statsCards = useMemo(() => {
    if (!isExpanded) return [];

    const stats = getScoreStats();
    const user = stats.users.find((u) => u.id === username);

    return buildGameStatsCards(user);
  }, [isExpanded]);

  return (
    <>
      <button className="game-stats__button" onClick={toggleStats}>
        <div className={`game-stats__button-content ${isExpanded ? 'rotate-0' : 'rotate-720'}`}>
          <img
            src={gameStatsImage}
            alt="Game Stats"
            className="game-stats__image"
          />
          <span className="game-stats__text">
            {isExpanded ? 'Hide Stats' : 'Show Stats'}
          </span>
        </div>
      </button>

      <div className={`game-stats-cards ${isExpanded ? 'open' : 'close'}`} >
        <div className="pt-2">
          <div className="game-stats__container">
            {statsCards.map(({ id, title, type, value }) => (
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
