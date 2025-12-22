import { useState, useRef, useEffect } from 'react';
import { useAuthManager, useAlertBoxManager } from '@/hooks';
import { CustomIcon, UserLoginDialog, CreateAccountDialog, UserMenu, GuestMenu } from '@/components';
import { userIcon } from '@/assets';

import './UserDropdownMenu.css';

const UserDropdownMenu = ({ onResetGame}) => {
  const { user, logout, isAuthenticated } = useAuthManager();
  const { openAlert } = useAlertBoxManager();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isAuthenticated]);

  const handleToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickLogout = () => {
    logout();
    setIsDropdownOpen(false);
    onResetGame();
  };

  const handleCreateAccount = () => {
    openAlert('create-account');
    setIsDropdownOpen(false);
  };

  const handleLogin = () => {
    openAlert('user-login');
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        aria-label="Account menu"
        aria-expanded={isDropdownOpen}
      >
        {user?.avatar ? (
          <div className="custom-icon__default relative">
            <span className="text-[22px] h-6 w-6">{user.avatar}</span>
          </div>
        ) : (
          <CustomIcon
            className="custom-icon__default"
            size="md"
            icon={userIcon}
          />
        )}
      </button>

      {/* Dropdown Menu with Animation */}
      <div
        ref={menuRef}
        className={`dropdown-menu ${isDropdownOpen ? 'open' : 'close'}`}
      >
        {isAuthenticated ? (
          <UserMenu
            user={user}
            onClickLogout={handleClickLogout}
          /> ) : (
          <GuestMenu
            onCreateAccount={handleCreateAccount}
            onLogin={handleLogin}
          />
        )}
      </div>
    </div>
  );
};

export default UserDropdownMenu;
