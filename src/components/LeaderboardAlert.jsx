import { AlertBox } from '.';
import { HeaderTitle } from '.';
import { leaderboard } from '@/utils/constants';
import {
  getTopPlayers,
  highestScore,
  totalPlayers,
  getRankColor,
  getRankIcon
} from '@/utils/helpers';

const LeaderboardAlert = ({ onClose }) => {
  const topPlayers = getTopPlayers();
  const { noPlayersText, playMoreText } = leaderboard;

  console.log({totalPlayers: totalPlayers, highestScore: highestScore});

  return (
    <AlertBox
      title="Leaderboard"
      description="Top performers in Path Adventure"
      variant="transparent"
      onClose={onClose}
    >
      <div className="mt-8">
        <div className="hidden md:block absolute top-13 right-10">
          <p className="text-5xl pb-8">🏆</p>
        </div>

        {topPlayers.length === 0 ? (
          <p className="text-2xl text-center mb-2">{ noPlayersText }</p>
        ) : (
          <>
            <div className="grid grid-cols-4 md:grid-cols-[1fr_3fr_1fr_1fr] items-center mb-4 p-4 bg-linear-to-r from-purple-500/40 to-blue-500/40 rounded-xl border border-white/10  text-white/90">
              <span className="text-left">Rank</span>
              <span className="text-left">Player</span>
              <span className="text-center">Score</span>
              <span className="text-center">Wins</span>
            </div>

            <div className="space-y-3">
              {topPlayers.map(({ id, player, score, gamesWon }, index) => (
                <div
                  key={id}
                  className={`grid grid-cols-4 md:grid-cols-[1fr_3fr_1fr_1fr] items-center p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${
                    id <= 3 
                      ? 'bg-linear-to-r bg-white/20 border-white/30' 
                      : 'bg-white/10 border-white/20'
                  }`}
                >
                  {/* Rank */}
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-linear-to-br ${getRankColor(index + 1)}`}>
                      <span className="font-bold text-white text-sm">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  
                  {/* Player Name */}
                  <span className="text-left font-medium text-white/90 truncate">
                    <span className="mr-2">{player}</span>
                    <span className="text-2xl">{getRankIcon(index + 1)}</span>
                  </span>
                  
                  {/* Score */}
                  <span className="text-center font-mono font-bold text-lg bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    {score}
                  </span>
                  
                  {/* Games Won */}
                  <span className="text-right font-mono font-bold text-white/80">
                    {gamesWon}
                    <span className="text-yellow-400 ml-1">⭐</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Stats Summary */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {/* Total Players */}
              <div className="p-4 bg-white/5 rounded-xl border border-white/20 text-center">
                <div className="text-2xl font-bold text-cyan-400">
                  {totalPlayers}
                </div>
                <div className="text-sm text-white/70">Total Players</div>
              </div>
              
              {/* Top Score */}
              <div className="p-4 bg-white/5 rounded-xl border border-white/20 text-center">
                <div className="text-2xl font-bold text-green-400">
                  {highestScore}
                </div>
                <div className="text-sm text-white/70">Top Score</div>
              </div>
            </div>

            <div className="py-6 text-center">
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
