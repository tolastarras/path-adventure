import { useState, useCallback } from 'react';
import { AlertBoxContext } from './AlertBoxContext';

export const AlertBoxProvider = ({ children }) => {
  const [openAlertId, setOpenAlertId] = useState(null);

  const openAlert = useCallback((alertId) => {
    setOpenAlertId(alertId);
  }, []);

  const closeAlert = useCallback(() => {
    setOpenAlertId(null);
  }, []);

  const isAlertOpen = useCallback((alertId) => {
    return openAlertId === alertId;
  }, [openAlertId]);

  const value = {
    openAlertId,
    isAlertOpen,
    openAlert,
    closeAlert,
  };

  return (
    <AlertBoxContext.Provider value={value}>
      {children}
    </AlertBoxContext.Provider>
  );
};

export default AlertBoxProvider;
