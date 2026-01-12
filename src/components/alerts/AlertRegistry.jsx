import { useAlertBoxManager } from '@/hooks';
import {
  CreateAccountDialog,
  UserLoginDialog,
  GameStatusAlert,
  HowToPlayAlert,
  LeaderboardAlert,
} from '@/components';

const AlertRegistry = ({ gameData }) => {
  const { isAlertOpen, closeAlert } = useAlertBoxManager();
  const alertComponents = {
    'create-account': CreateAccountDialog,
    'user-login': UserLoginDialog,
    'game-result': GameStatusAlert,
    'about-game': HowToPlayAlert,
    'leaderboard': LeaderboardAlert,
  };
  
  return (
    <>
      {Object.entries(alertComponents).map(([alertId, Component]) =>
        Component && isAlertOpen(alertId) && (
          <Component
            key={alertId}
            onClose={closeAlert}
            {...(alertId === 'game-result' ? gameData : {})}
          />
        )
      )}
    </>
  );
};

export default AlertRegistry;
