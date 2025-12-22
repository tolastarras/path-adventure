import { CustomIcon, AuthLink } from '@/components';
import { loginIcon } from '@/assets';

const GuestMenu = ({ onCreateAccount, onLogin }) => {
  return (
    <>
      <div className="px-4 py-3 border-b border-gray-300">
        <p className="text-2xl font-semibold text-black/70">
          Welcome Guest
        </p>
        <p className="text-md text-black/50 mt-1">
          Sign in to your account
        </p>
      </div>

      <button
        className="user-login__button group"
        onClick={onLogin}
      >
        <span className="flex items-center gap-2">
          <span className="text-lg">
            <CustomIcon className="transition-transform duration-250 group-hover:scale-120" icon={loginIcon} />
          </span>
          <span className="user-login__button--text">
            Sign In
          </span>
        </span>
        <span className="transition-transform duration-250 group-hover:scale-125">
          ↵
        </span>
      </button>

      <div className="px-4 py-3 text-black/70">
        <AuthLink onClick={onCreateAccount} />
      </div>
    </>
  )
}

export default GuestMenu;
