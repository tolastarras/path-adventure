import { storeKey } from '@/utils/constants';
import { storage } from '@/utils/helpers';

export const initializeScoreStorage = () => {
  const currentStore = storage.get(storeKey);
  if (!currentStore) {
    const initialScores = {
      totalScore: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      averageScore: 0,
      bestScore: 0,
      sessionScores: [],
      user: {}
    };
    storage.set(storeKey, initialScores);

    // Return the new scores
    return initialScores;
  }

  // Return currentStore scores
  return currentStore;
};

export const updateScoreStats = (gameResult) => {
  const {
    userId,
    score,
    moves,
    correctPathLength,
    accuracy,
    status
  } = gameResult;

  console.log("SCORE RESULT", gameResult);

  // Initialize score storage if no data exists - this now always returns valid data
  const stored = initializeScoreStorage();
  
  // Update stats
  stored.totalScore += score;
  stored.gamesPlayed += 1;
  stored.gamesWon += status === 'won' ? 1 : 0;
  stored.averageScore = Math.round(stored.totalScore / stored.gamesPlayed);
  stored.bestScore = Math.max(stored.bestScore, score);
  
  // Store session score for history
  stored.sessionScores.push({
    userId,
    timestamp: new Date().toISOString(),
    score,
    moves,
    correctPathLength,
    accuracy,
    status
  });
  
  // Keep only last 50 games in history
  if (stored.sessionScores.length > 50) {
    stored.sessionScores = stored.sessionScores.slice(-50); // Fixed: should be 50, not 20
  }
  
  // Update user-specific stats
  if (!stored.user[userId]) {
    stored.user[userId] = {
      bestScore: 0,
      totalScore: 0,
      attempts: 0,
      wins: 0
    };
  }
  
  stored.user[userId].attempts += 1;
  stored.user[userId].wins += status === 'won' ? 1 : 0;
  stored.user[userId].totalScore += score;
  stored.user[userId].bestScore = Math.max(
    stored.user[userId].bestScore, 
    score
  );
  
  storage.set(storeKey, stored);
  return stored;
};

export const getScoreStats = () => {
  return initializeScoreStorage(); // Use the same initialization function
};

export const clearScoreStorage = () => {
  storage.remove(storeKey);
};

export const resetScoreStorage = () => {
  storage.remove(storeKey);
  return initializeScoreStorage();
};
