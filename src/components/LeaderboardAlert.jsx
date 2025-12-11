import { AlertBox, HeaderTitle, RoundButton } from '.';
import { leaderboard } from '@/utils/constants';
import {
  getTopPlayers,
  getTopSingleGamePlayer,
  totalPlayers,
  getRankColor,
  getRankIcon
} from '@/utils/helpers';

import './LeaderboardAlert.css';

const LeaderboardAlert = ({ onClose }) => {
  const topPlayers = getTopPlayers();
  const { noPlayersText, playMoreText } = leaderboard;
  const { id: topPlayerId, bestScore } = getTopSingleGamePlayer();

  return (
    <AlertBox
      title="🏆 Leaderboard 🏆"
      description="Top performers in Path Adventure"
      variant="transparent"
      onClose={onClose}
    >
      <div className="mt-8">
        {topPlayers.length === 0 ? (
          <p className="text-2xl text-center mb-2">{ noPlayersText }</p>
        ) : (
          <>
            <div className="leaderboard__header">
              <span className="text-left">Rank</span>
              <span className="text-left">Player</span>
              <span className="text-center">Score</span>
              <span className="text-center">Wins</span>
            </div>

            <div className="space-y-3">
              {topPlayers.map(({ id, totalScore, gamesWon, attempts }, index) => (
                <div
                  key={id}
                  className={`leaderboard-item ${
                    id <= 3 
                      ? 'bg-linear-to-r bg-white/20 border-white/30' 
                      : 'bg-white/10 border-white/20'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <RoundButton color={getRankColor(index + 1)} value={index + 1} />
                  </div>

                  <span className="text-left font-medium text-white/90 truncate">
                    <span className="mr-2">{id}</span>
                  </span>

                  <span className="text-center font-mono simple-text">
                    {totalScore}
                  </span>

                  <span className="text-right font-mono font-bold text-white/80 text-xl">
                    {gamesWon}/{attempts}
                    <span className={`ml-1 text-yellow-400 ${getRankIcon(index + 1) ? 'text-2xl' : 'text-lg ml-2'}`}>
                      {getRankIcon(index + 1) || '⭐' }
                    </span>
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/20 text-center">
                <div className="text-lg uppercase text-white/70 mb-1">Game</div>
                <HeaderTitle className="info-text" size="xl" >{totalPlayers()}</HeaderTitle>
                <div className="text-sm text-white/70">Total Players</div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/20 text-center">
                <div className="text-lg uppercase text-white/70 mb-1">Top Score</div>
                <HeaderTitle className="success-text" size="xl" >{bestScore}</HeaderTitle>
                <div className="text-sm text-white/70">by {topPlayerId}</div>
              </div>
            </div>

            <div className="pt-6 text-center">
              <p className="text-white/70 text-lg mb-2">
                {playMoreText}
              </p>
            </div>
          </>
        )}
      </div>
    </AlertBox>
  );
};

export default LeaderboardAlert;
