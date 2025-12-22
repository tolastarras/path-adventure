import { useState, useRef, useEffect } from 'react';
import {
  AlertBox,
  HeaderTitle,
  TextInput,
  GlossyButton,
  AvatarSelector,
  AuthLink,
} from '@/components';
import { useAlertBoxManager, useAuthManager } from '@/hooks';
import { getPlayer } from '@/utils/helpers';
import { gameMessages } from '@/utils/constants';

const UserLoginDialog = ({ onClose }) => {
  const usernameRef = useRef(null);
  const { login } = useAuthManager();
  const { openAlert } = useAlertBoxManager();
  const [loginState, setLoginState] = useState(null);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, [])

  const handleChange = (e) => {
    e.preventDefault();
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
      error: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginState({
      ...loginState,
      isSubmitting: true,
      error: '',
    });

    const player = getPlayer(loginState?.username);

    try {
      if (!player?.id) {
        throw new Error(gameMessages.invalidLoginError);
      }

      await login(player, loginState?.password);
      onClose();
    } catch (error) {
      console.error('Login error:', error);
      setLoginState({
        ...loginState,
        isSubmitting: false,
        error: error.message || gameMessages.defaultLoginError,
      });
    }
  };

  const openCreateAccountDialog = () => {
    onClose();
    setTimeout(() => {
      openAlert('create-account');
    }, 100);
  }

  return (
    <AlertBox
      className="w-md"
      variant="transparent"
      onClose={onClose}
    >
      <div>
        <div className="mb-4">
          <HeaderTitle size="xl" title="🔐 Secure Login!" />
        </div>

        <form>
          <div className="mb-2">
            <TextInput
              ref={usernameRef}
              label="Username"
              name="username"
              value={loginState?.username}
              className="placeholder:text-gray-300"
              disabled={loginState?.isSubmitting}
              onChange={handleChange}
              autoFocus
            />
          </div>

          <div className="mb-5">
            <TextInput
              label="Password"
              name="password"
              type="password"
              value={loginState?.password}
              disabled={loginState?.isSubmitting}
              onChange={handleChange}
              error={loginState?.error}
            />
          </div>

          <div className="space-y-3">
            <GlossyButton
              className="w-full"
              size="lg"
              variant="primary"
              onClick={handleSubmit}
            >
              Sign In
            </GlossyButton>
            <GlossyButton
              className="w-full"
              size="lg"
              variant="transparent"
              onClick={onClose}
            >
              Continue as Guest
            </GlossyButton>

            <div className="text-white p-3 pb-2">
              <AuthLink onClick={openCreateAccountDialog} />
            </div>

            <p className="text-xs text-center mt-6">
              {gameMessages.guestAccountMessage}
            </p>
          </div>
        </form>
      </div>
    </AlertBox>
  );
};

export default UserLoginDialog;
