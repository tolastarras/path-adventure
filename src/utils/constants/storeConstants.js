export const GAME_STATS_STORAGE_KEY = 'path_adventure_stats';
export const CURRENT_PLAYER_STORAGE_KEY = 'path_adventure_player';

export const DEFAULT_STORE = {
  averageScore: 0,
  bestScore: 0,
  sessionScores: [],
  users: [],
};

export const DEFAULT_USER_STATS = {
  id: '',
  avatar : '',
  password: '',
  totalScore: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  averageScore: 0,
  bestScore: 0,
  createdAt: new Date().toISOString(),
  lastPlayed: new Date().toISOString(),
};

export const SESSION_HISTORY_LIMIT = 50;
