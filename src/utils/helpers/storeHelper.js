
import { storeKey } from '@/utils/constants';

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

export const getStorage = () => storage.get(storeKey);

export const setStorage = (data) => storage.set(storeKey, data);

export const clearStorage = () => storage.remove(storeKey);
