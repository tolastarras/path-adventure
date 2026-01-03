import { AlertBox, HeaderTitle, LeaderboardContainer } from '@/components';
import { leaderboard } from '@/utils/constants';
import { getTopPlayers, getTopSingleGamePlayer } from '@/utils/helpers';

const LeaderboardAlert = ({ onClose }) => {
  const { noPlayersText } = leaderboard;
  const topPlayers = getTopPlayers();
  const topPlayer = getTopSingleGamePlayer();
  const showLeaderboard = topPlayers.length > 0 && topPlayer.bestScore > 0;

  return (
    <AlertBox
      title="🏆 Leaderboard 🏆"
      description="Top performers in Path Adventure"
      variant="transparent"
      onClose={onClose}
    >
      <div className="mt-8">
        {showLeaderboard ? (
          <LeaderboardContainer
            topPlayer={topPlayer}
            topPlayers={topPlayers}
          />
        ) : (
          <p className="text-2xl text-center mb-2">{ noPlayersText }</p>
        )}
      </div>
    </AlertBox>
  );
};

export default LeaderboardAlert;
