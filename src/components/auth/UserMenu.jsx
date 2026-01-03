import { CustomIcon } from '@/components';
import { cogIcon, loginIcon } from '@/assets';

import './UserMenu.css';

const UserMenu = ({ user, onClickLogout }) => {
  return (
    <div className="user-menu__container">
      <div className="user-menu__header">
        <div className="flex items-center gap-3">
          <div className="shrink-0 text-3xl">
            {user.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">
              {user.id}
            </p>
            <p className="text-xs truncate italic">
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-1">
        <a
          href="/profile"
          className="user-menu__item"
        >
          <CustomIcon className="mr-2 text-gray-600" size="sm" icon={loginIcon} />
          My Profile
        </a>
        <a
          href="/settings"
          className="user-menu__item"
        >
          <CustomIcon className="mr-2 text-gray-600" size="sm" icon={cogIcon} />
          Settings
        </a>
      </div>

      <div className="user-menu__footer">
        <button
          onClick={onClickLogout}
          className="user-menu__footer-button"
        >
          <div className="flex items-center">
            Log Out
          </div>
          <span className="text-xs opacity-70">Esc</span>
        </button>
      </div>
    </div>
  )
}

export default UserMenu;
