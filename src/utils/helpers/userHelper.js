import { defaultUserStats } from '@/utils/constants';

export const loadUserWithDefaults = (savedUser) => {
  if (!savedUser) {
    return defaultUserStats;
  }
  
  return {
    ...defaultUserStats,
    ...savedUser,
  };
};
