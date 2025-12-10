import { useState, useRef, useEffect } from 'react';
import { CustomIcon } from '@/components';
import { userIcon } from '@/assets';

const UserAccountMenu = ({ user = null, onLogin, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const size = 'md';

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        aria-label="Account menu"
        aria-expanded={isOpen}
      >
        {user ? (
          <div className="flex items-center justify-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
              />
            ) : (
              // <User size={20} />
              'U'
            )}
          </div>
        ) : (
          <CustomIcon
            className="custom-icon__default"
            size={size}
            icon={userIcon}
            // onClose={onClose}
            // text-gray-300 animate-pulse bg-green-500
          />
        )}
      </button>

      {/* Dropdown Menu with Animation */}
      <div
        ref={menuRef}
        className={`
          absolute top-full right-0 mt-2
          min-w-[220px]
          bg-white rounded-xl shadow-2xl
          border border-gray-200
          overflow-hidden
          z-50
          transition-all duration-300 ease-out
          transform origin-top-right
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }
        `}
      >
        {/* User Info Section */}
        {user ? (
          <>
            <div className="px-4 py-3 border-b border-gray-100 bg-linear-to-r from-blue-50 to-purple-50">
              <div className="flex items-center space-x-3">
                <div className="shrink-0">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full border-2 border-white shadow"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-linear-to-br flex items-center justify-center text-white">
                      <User size={18} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Greeting Message */}
            <div className="px-4 py-3 bg-linear-to-r from-blue-500/5 to-purple-500/5">
              <p className="text-sm text-gray-700">
                👋 Hello, <span className="font-semibold text-blue-600">{user.name.split(' ')[0]}</span>!
              </p>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <a
                href="/profile"
                className="
                  flex items-center px-4 py-3
                  text-sm text-gray-700
                  hover:bg-blue-50 hover:text-blue-600
                  transition-colors duration-150
                "
                onClick={() => setIsOpen(false)}
              >
                <User size={16} className="mr-3 text-gray-400" />
                My Profile
              </a>
              <a
                href="/settings"
                className="
                  flex items-center px-4 py-3
                  text-sm text-gray-700
                  hover:bg-blue-50 hover:text-blue-600
                  transition-colors duration-150
                "
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </a>
            </div>

            {/* Logout Button */}
            <div className="border-t border-gray-100 py-1">
              <button
                onClick={() => {
                  onLogout?.();
                  setIsOpen(false);
                }}
                className="
                  w-full
                  flex items-center justify-between px-4 py-3
                  text-sm text-red-600
                  hover:bg-red-50
                  transition-colors duration-150
                "
              >
                <div className="flex items-center">
                  {/* <LogOut size={16} className="mr-3" /> */}
                  Log Out
                </div>
                <span className="text-xs opacity-70">Esc</span>
              </button>
            </div>
          </>
        ) : (
          /* Login State */
          <>
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900">
                Welcome Guest
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Sign in to access your account
              </p>
            </div>

            <div className="py-1">
              <button
                onClick={() => {
                  onLogin?.();
                  setIsOpen(false);
                }}
                className="
                  w-full
                  flex items-center justify-between px-4 py-3
                  text-sm font-medium text-white
                  bg-linear-to-r from-blue-500 to-purple-600
                  hover:from-blue-600 hover:to-purple-700
                  transition-all duration-200
                "
              >
                <div className="flex items-center">
                  {/* <LogIn size={16} className="mr-3" /> */}
                  Sign In
                </div>
                <span className="text-xs opacity-90">↵</span>
              </button>
            </div>

            <div className="px-4 py-3 bg-gray-50">
              <p className="text-xs text-gray-600">
                New here?{' '}
                <button
                  onClick={() => {
                    // Handle sign up
                    setIsOpen(false);
                  }}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Create an account
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserAccountMenu;
