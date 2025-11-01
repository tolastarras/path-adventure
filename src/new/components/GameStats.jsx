import { GlossyCard, HeaderTitle, ProgressBar} from '.';

import './GameStats.css';

const GameStats = ({gameStats: stats}) => {
  console.log('stats', stats);

  return (
    <div className="game-stats__container">
      {stats.map(({ id,title, percent }) => (
        <GlossyCard key={id} className="w-full lg:w-1/3">
          <HeaderTitle title={title} />
          <ProgressBar percentage={percent} />
        </GlossyCard>
      ))}
    </div>
  )
}

export default GameStats;
