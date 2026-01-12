import { getStorage, getCurrentPlayer, getPlayerById } from '@/utils/helpers';
import { sessionHistoryLimit, medals } from '@/utils/constants';

export const getTopPlayers = (maxPlayers = 10) => {
  const store = getStorage();

  if (!store.users) {
    return [];
  }

  return store.users
  .filter(user => user.totalScore > 0)
  .sort((a, b) => {
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
  }).slice(0, maxPlayers); // Take first 10
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
  return medals[rank - 1] || '';
};

export const getTotalPlayers = () => {
  return getStorage().users.length;
};

export const highestScore = () => {
  return getStorage().bestScore;
};

export const getUserStats = (userId) => {
  return getStorage().users.find((u) => u.id === userId) || null;
};

export const getSessionHistory = (limit = sessionHistoryLimit) => {
  return getStorage().sessionScores.slice(0, limit);
};

export const getTopSingleGamePlayer = () => {
  const storage = getStorage();
  if (!storage?.users?.length) {
    return null;
  }

  // Returns user with the highest score for a single game
  return getStorage().users.reduce((best, current) =>
    current.bestScore > best.bestScore ? current : best
  );
};

/**
 * Checks if current player will achieve gold medal after adding current game score
 * @param {number} currentGameScore - Score from current game
 */
export const hasAchievedGoldMedal = (currentGameScore = 0) => {
  try {
    const currentPlayer = getPlayerById(getCurrentPlayer()?.id) || null;
    if (!currentPlayer?.id) return false;

    const topPlayer = getTopPlayers()?.[0] || null;

    // If no top player exists, can't achieve gold medal
    if (!topPlayer?.totalScore) return false;

    // Player is already #1 (before this game)
    if (currentPlayer.id === topPlayer.id) return false;

    // Check if new total beats current #1
    return currentPlayer.totalScore + currentGameScore > topPlayer.totalScore;
  } catch (error) {
    console.error('Error checking gold medal:', error);
    return false;
  }
};

/**
 * Checks if current game score beats the top single game score
 * @param {number} currentGameScore - Score from current game
 */
export const hasAchievedTopScore = (currentGameScore) => {
  try {
    if (!currentGameScore) return false;

    const topSingleGamePlayer = getTopSingleGamePlayer();

    // If no existing record, this game doesn't count
    if (!topSingleGamePlayer?.bestScore) return false;

    // Compare current game score with the record
    return currentGameScore > topSingleGamePlayer.bestScore;
  } catch (error) {
    console.error('Error checking top score:', error);
    return false;
  }
};
