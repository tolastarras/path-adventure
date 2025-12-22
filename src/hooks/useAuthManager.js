import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

const useAuthManager = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthManager must be used within a AuthProvider');
  }
  return context;
}

export default useAuthManager;
