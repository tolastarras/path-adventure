
import { storeKey, currentPlayerKey, defaultStore } from '@/utils/constants';

const storage = {
  get: (key) => {
    const item = localStorage.getItem(key);

    try {
      if (!item?.trim() || item === 'undefined') {
        return null;
      }

      return JSON?.parse(item);
    } catch (error) {
      console.error('Error parsing JSON:', error.message);
      return null;
    }
  },

  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove: (key) => {
    localStorage.removeItem(key);
  },

  clear: () => {
    localStorage.clear();
  },

  exists: (key) => {
    return localStorage.getItem(key) !== null;
  },
};

export const getStorage = () => {
  const store = storage.get(storeKey);

  if (!store) {
    storage.set(storeKey, defaultStore);
    return defaultStore;
  }

  const mergedStore = { ...defaultStore, ...store };

  return mergedStore;
}

export const setStorage = (data) => {
  const mergedData = { ...defaultStore, ...data };
  storage.set(storeKey, mergedData);
}

export const clearStorage = () => {
  return storage.remove(storeKey);
}

// Current player
export const getCurrentPlayer = () => {
  return storage.get(currentPlayerKey) || null;
}

export const setCurrentPlayer = (data) => {
  return storage.set(currentPlayerKey, data);
}

export const removeCurrentPlayer = () => {
  return storage.remove(currentPlayerKey);
}
