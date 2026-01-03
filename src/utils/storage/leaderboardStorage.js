import { sessionHistoryLimit } from '@/utils/constants';
import { getStorage, setStorage, loadUserWithDefaults } from '@/utils/helpers';

// User Management
export const createNewUser = ({ id, avatar, password }) => {
  const newUser = {
    id,
    avatar,
    password,
  };

  return loadUserWithDefaults(newUser);
};

const updateExistingUser = (user, score, gamesWon) => {
  const gamesPlayed = user.gamesPlayed + 1;
  const totalScore = user.totalScore + score;

  return {
    ...user,
    bestScore: Math.max(user.bestScore, score),
    totalScore,
    gamesPlayed,
    gamesWon: user.gamesWon + gamesWon,
    averageScore: Math.round(totalScore / gamesPlayed),
    lastPlayed: new Date().toISOString(),
  };
};

// Stats Management
const updateGlobalStats = (store, score = 0, gamesWon = 0) => {
  const totalScore = (store.totalScore || 0) + score;
  const gamesPlayed = (store.gamesPlayed || 0) + 1;
  const totalGamesWon = (store.gamesWon || 0) + gamesWon;
  const averageScore = gamesPlayed ? Math.round(totalScore / gamesPlayed): 0;
  const bestScore = Math.max(store.bestScore || 0, score);

  return {
    ...store,
    totalScore,
    gamesPlayed,
    gamesWon: totalGamesWon,
    averageScore,
    bestScore,
  };
};

const addSessionScore = (sessionScores, gameResult) => {
  const { userId, score, moves, correctPathLength, accuracy } = gameResult;
  const newSessionScore = {
    userId,
    score,
    moves,
    correctPathLength,
    accuracy,
    createdAt: new Date().toISOString(),
  };
  
  return [newSessionScore, ...sessionScores].slice(0, sessionHistoryLimit);
};

export const saveUser = (users, userData) => {
  const store = getStorage();
  const { id, avatar, password } = userData;

  const user = {
    id,
    avatar,
    password,
  };

  const newUser = loadUserWithDefaults(user);

  store.users = updateUsersList(store.users, newUser);

  setStorage(store);

  return [...store.users, newUser];
}

export const updateUsersList = (users, data) => {
  let updatedUsers;

  const { id, avatar, password, score = 0, gamesWon = 0 } = data;
  const userIndex = users.findIndex((u) => u.id === id);

  users.findIndex((u) => {
    return u.id === id;
  });

  // Add new user
  if (userIndex === -1) {
    updatedUsers = [...users, createNewUser({ id, avatar, password, score, gamesWon })];
  } else {
    // Update existing user
    updatedUsers = [...users];
    updatedUsers[userIndex] = updateExistingUser(updatedUsers[userIndex], score, gamesWon);
  }

  return updatedUsers;
};

export const updateScoreStats = (gameResult) => {
  let store = getStorage();

  try {
    const { userId, avatar, password, score, status } = gameResult;
    const gamesWon = status === 'won' ? 1 : 0;

    const data = {
      id: userId,
      avatar,
      password,
      score,
      gamesWon,
      bestScore: score,
      gamesPlayed: 1,
    };

    // Update global stats
    store = updateGlobalStats(store, score, gamesWon);

    // Update session scores
    store.sessionScores = addSessionScore(store.sessionScores, gameResult);

    // Update users
    store.users = updateUsersList(store.users, data);

    // Save to storage
    setStorage(store);

    return {
      success: true,
      data: store,
      message: 'Score stats updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};
