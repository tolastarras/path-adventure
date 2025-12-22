import { useAuthManager } from '@/hooks';
import { CustomIcon, UserDropdownMenu } from '@/components';
import { menuItems } from '@/utils/constants';

const IconMenu = ({ onClick, onClose, onResetGame, size='md' }) => {
  const { isAuthenticated } = useAuthManager();

  return (
    <div className="flex space-x-1.5">
      {menuItems.map(({ id, icon }) => (
        <div key={id} className="relative" onClick={() => onClick(id)}>
          <div className="flex ">
            <CustomIcon
              className="custom-icon__default"
              size={size}
              icon={icon}
              onClose={onClose}
            />
          </div>
        </div>
      ))}
      <UserDropdownMenu
        key={`user-menu-${isAuthenticated ? 'auth' : 'guest'}`}
        onResetGame={onResetGame}
      />
    </div>
  );
}

export default IconMenu;
