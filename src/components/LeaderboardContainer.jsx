import { HeaderTitle, RoundButton } from '@/components';
import { getTotalPlayers, getRankColor, getRankIcon } from '@/utils/helpers';
import { useAuthManager } from '@/hooks';
import { formatNumber } from '@/utils/formatters';
import { leaderboard, medals, gameMessages } from '@/utils/constants';

import './LeaderboardContainer.css';

const LeaderboardContainer = ({ topPlayer, topPlayers }) => {
  const { playMoreText } = leaderboard;
  const topScore = topPlayer?.bestScore || 0;
  const totalPlayers = getTotalPlayers();
  const { isAuthenticated } = useAuthManager();

  const iconSizeClass = (index) => {
    // Skip gold, silver, bronze; by default stars are bigger emojis than medals
    return index > medals.length ? 'text-lg' : 'text-2xl';
  }

  return (
    <div className="leaderboard__container">
      <div className="leaderboard__header">
        <span className="text-left">Rank</span>
        <span className="text-left">Player</span>
        <span className="text-center">Score</span>
        <span className="text-center">Wins</span>
      </div>
      <div className="space-y-3">
        {topPlayers.map(({ id, avatar, totalScore, gamesWon, gamesPlayed }, index) => (
          <div key={id} className="leaderboard-item space-x-0 sm:space-x-6">
            <div className="flex items-center space-x-3">
              <RoundButton color={getRankColor(totalScore > 0 ? index + 1 : -1)} value={index + 1} />
            </div>

            <span className="text-left text-white/90 truncate">
              <span className="mr-2">{avatar}</span>{id}
            </span>

            <span className="text-right font-mono simple-text truncate">
              {formatNumber(totalScore)}
            </span>

            <span className="text-right font-mono font-bold text-white/80 text-lg">
              {gamesWon}/{gamesPlayed}
              <span className={`hidden sm:inline ml-2 text-yellow-400 ${iconSizeClass(index + 1)}`}>
                {totalScore > 0 ? getRankIcon(index + 1) || '⭐' : '' }
              </span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-white/5 rounded-xl border border-white/20 text-center">
          <div className="text-lg uppercase text-white/70 mb-1">Game</div>
          <HeaderTitle className="info-text" size="xl" >{totalPlayers}</HeaderTitle>
          <div className="text-sm text-white/70">Total Players</div>
        </div>

        <div className="p-4 bg-white/5 rounded-xl border border-white/20 text-center">
          <div className="text-lg uppercase text-white/70 mb-1">Top Score</div>
          <HeaderTitle className="success-text" size="xl">{topScore ? topScore : '-'}</HeaderTitle>
          <div className="text-sm text-white/70">{topScore > 0 ? `by ${topPlayer.id} ${topPlayer.avatar}` : 'Be the first'}</div>
        </div>
      </div>

      <div className="pt-6 text-center">
        <p className="text-white/70 text-lg mb-2">
          {playMoreText}
        </p>
        {!isAuthenticated && <div className="flex justify-center mt-4">
          <span className="w-80 text-xs text-white/50">
            {gameMessages.guestAccountMessage}
          </span>
        </div>
        }
      </div>
    </div>
  )
}

export default LeaderboardContainer;
