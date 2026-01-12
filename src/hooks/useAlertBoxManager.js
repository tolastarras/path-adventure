import { useContext } from 'react';
import { AlertBoxContext } from '@/context/AlertBoxContext';

const useAlertBoxManager = () => {
  const context = useContext(AlertBoxContext);
  if (!context) {
    throw new Error('useAlertBoxManager must be used within a AlertBoxProvider');
  }
  return context;
}

export default useAlertBoxManager;
