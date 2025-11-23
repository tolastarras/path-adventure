import { leaderboard } from '@/utils/constants';

export const getTopPlayers = (players = 10) => {
  const { sample } = leaderboard;

  if (!Array.isArray(sample) || sample.length === 0) {
    return [];
  }

  let newSample = [...sample];
  if (sample.length <= players) {
    return newSample;
  }

  const topPlayers = newSample.sort((a, b) => {
    // First sort by score (descending)
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // If scores are equal, sort by gamesWon (descending)
    if (b.gamesWon !== a.gamesWon) {
      return b.gamesWon - a.gamesWon;
    }
    // If both are equal, maintain original order (first one wins)
    return 0;
  }).slice(0, players); // Take first 10

  return topPlayers.length > 0 ? topPlayers : [];
};

export const getRankColor = (rank) => {
  switch(rank) {
    case 1: return 'from-yellow-400 to-amber-500';
    case 2: return 'from-gray-400 to-gray-300';
    case 3: return 'from-amber-700 to-amber-600';
    default: return 'from-blue-400 to-cyan-500';
  }
};

export const getRankIcon = (rank) => {
  switch(rank) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return '';
  }
};

export const totalPlayers = leaderboard.sample.length;

export const highestScore = (() => {
  const { sample } = leaderboard;
  if (!Array.isArray(sample) || sample.length === 0) {
    return 0;
  }
  return Math.max(...sample.map(player => player.score));
})();

export const highestGamesWon = () => {
  const { sample } = leaderboard;
  if (!Array.isArray(sample) || sample.length === 0) {
    return 0;
  }
  return Math.max(...sample.map(player => player.gamesWon));
};
