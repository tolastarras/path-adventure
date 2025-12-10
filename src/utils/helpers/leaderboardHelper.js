import { initializeScoreStorage } from '@/utils/storage';
import { sessionHistoryLimit } from '@/utils/constants';

export const getScoreStats = () => initializeScoreStorage();

export const getTopPlayers = (maxPlayers = 10) => {
  const { users } = getScoreStats();
  return users.sort((a, b) => {
    // First sort by score (descending)
    if (b.totalScore !== a.totalScore) {
      return b.totalScore - a.totalScore;
    }
    // If scores are equal, sort by gamesWon (descending)
    if (b.gamesWon !== a.gamesWon) {
      return b.gamesWon - a.gamesWon;
    }
    // If both are equal, maintain original order (first one wins)
    return 0;
  }).slice(0, maxPlayers) || []; // Take first 10
};

export const getRankColor = (rank) => {
  switch(rank) {
    case 1: return 'from-yellow-400 to-amber-500';
    case 2: return 'from-gray-400 to-gray-300';
    case 3: return 'from-amber-700 to-amber-600';
    default: return 'from-cyan-500 to-blue-500';
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

export const totalPlayers = () => {
  return getScoreStats().users.length;
};

export const highestScore = () => {
  return getScoreStats().bestScore;
};

export const getUserStats = (userId) => {
  const stored = initializeScoreStorage();
  return stored.users.find((u) => u.id === userId) || null;
};

export const getSessionHistory = (limit = sessionHistoryLimit) => {
  const stored = initializeScoreStorage();
  return stored.sessionScores.slice(0, limit);
};

export const getTopSingleGamePlayer = () => {
  const stored = initializeScoreStorage();

  if (stored.users.length === 0) {
    return null;
  }

  // Returns user with the highest score for a single game
  return stored.users.reduce((best, current) =>
    current.bestScore > best.bestScore ? current : best
  );
};
