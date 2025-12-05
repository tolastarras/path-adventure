import { useState, useCallback } from 'react';

const useAlertBoxManager = () => {
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

  return {
    openAlertId,
    isAlertOpen,
    openAlert,
    closeAlert,
  };
};

export default useAlertBoxManager;
