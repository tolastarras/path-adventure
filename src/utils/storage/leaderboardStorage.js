import { defaultStore, sessionHistoryLimit } from '@/utils/constants';
import { getStorage, setStorage, clearStorage } from '@/utils/helpers';

export const initializeScoreStorage = () => {
  const currentStore = getStorage();
  
  if (!currentStore) {
    setStorage(defaultStore);
    return defaultStore;
  }
  
  return currentStore;
};

// User Management
const createNewUser = (userId, score, winLose) => ({
  id: userId,
  bestScore: score,
  totalScore: score,
  averageScore: score,
  attempts: 1,
  gamesWon: winLose,
  lastPlayed: new Date().toISOString(),
  createdAt: new Date().toISOString(),
});

const updateExistingUser = (user, score, winLose) => {
  const attempts = user.attempts + 1;
  const totalScore = user.totalScore + score;

  return {
    ...user,
    bestScore: Math.max(user.bestScore, score),
    totalScore,
    attempts,
    gamesWon: user.gamesWon + winLose,
    averageScore: Math.round(totalScore / attempts),
    lastPlayed: new Date().toISOString(),
  };
};

// Stats Management
const updateGlobalStats = (store, score, winLose) => {
  const updatedStore = { ...store };
  
  updatedStore.totalScore += score;
  updatedStore.gamesPlayed += 1;
  updatedStore.gamesWon += winLose;
  updatedStore.averageScore = Math.round(updatedStore.totalScore / updatedStore.gamesPlayed);
  updatedStore.bestScore = Math.max(updatedStore.bestScore, score);
  
  return updatedStore;
};

const addSessionScore = (sessionScores, gameResult) => {
  const newSessionScore = {
    userId: gameResult.userId,
    score: gameResult.score,
    moves: gameResult.moves,
    correctPathLength: gameResult.correctPathLength,
    accuracy: gameResult.accuracy,
    createdAt: new Date().toISOString(),
  };
  
  return [newSessionScore, ...sessionScores].slice(0, sessionHistoryLimit);
};

const updateUsersList = (users, userId, score, winLose) => {
  const userIndex = users.findIndex((u) => u.id === userId);
  
  if (userIndex === -1) {
    // Add new user
    return [...users, createNewUser(userId, score, winLose)];
  }
  
  // Update existing user
  const updatedUsers = [...users];
  updatedUsers[userIndex] = updateExistingUser(updatedUsers[userIndex], score, winLose);
  return updatedUsers;
};

// Main Function
export const updateScoreStats = (gameResult) => {
  try {
    const { userId, score, status } = gameResult;
    const winLose = status === 'won' ? 1 : 0;
    
    console.log("SCORE RESULT", gameResult);
    
    let stored = initializeScoreStorage();
    
    // Update global stats
    stored = updateGlobalStats(stored, score, winLose);
    
    // Update session scores
    stored.sessionScores = addSessionScore(stored.sessionScores, gameResult);
    
    // Update users
    stored.users = updateUsersList(stored.users, userId, score, winLose);
    
    // Save to storage
    setStorage(stored);
    
    return {
      success: true,
      data: stored,
      message: 'Score stats updated successfully',
    };
    
  } catch (error) {
    console.error('Error updating score stats:', error);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

export const resetScoreStorage = () => {
  clearStorage();
  return defaultStore;
};
