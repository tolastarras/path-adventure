import { useState } from 'react';
import { useAuthManager, useAlertBoxManager } from '@/hooks';
import { saveUser } from '@/utils/storage';
import { validateUsername, validatePassword } from '@/utils/validation';
import { getStorage } from '@/utils/helpers';
import { gameMessages } from '@/utils/constants';
import {
  AlertBox,
  HeaderTitle,
  TextInput,
  GlossyButton,
  AvatarSelector,
  AuthLink,
} from '@/components';

const CreateAccountDialog = ({ onClose }) => {
  const { createAccount } = useAuthManager();
  const { openAlert } = useAlertBoxManager();

  const [selectedAvatar, setSelectedAvatar] = useState('👤');

  const [form, setForm] = useState({
    username: '',
    avatar: selectedAvatar,
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let store = getStorage();
    const newErrors = {};
    
    // Reset errors
    setErrors({ username: '', password: '', confirmPassword: '' });
    
    // Simple validation
    const usernameError = validateUsername(form.username);
    const passwordError = validatePassword(form.password);
    
    if (usernameError) newErrors.username = usernameError;
    if (passwordError) newErrors.password = passwordError;
    
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Login user: set as current user
    const newPlayer = await createAccount(form);
    
    if (newPlayer) {
      // Update global users list
      saveUser(store.users, newPlayer);
    }

    // TODO: Replace with toast notification
    console.log('Account created successfully!');

    onClose();
  };

  const handleUserLogin = () => {
    onClose();
    setTimeout(() => {
      openAlert('user-login');
    }, 100);
  };

  const handleAvatarChange = (avatar) => {
    setSelectedAvatar(avatar);
    setForm(prev => ({ ...prev, avatar }));
  };

  return (
    <AlertBox
      className="w-md"
      variant="transparent"
      onClose={onClose}
    >
      <div>
        <div className="mb-4">
          <HeaderTitle size="xl" title="👤 Create Account!" />
        </div>

        <form>
          <div className="mb-3">
            <AvatarSelector
              selectedAvatar={selectedAvatar}
              onAvatarChange={handleAvatarChange}
            />
          </div>

          <div className="mb-2">
            <TextInput
              label="Username"
              name="username"
              value={form.username.trim()}
              hasErrorHandler
              onChange={handleChange}
              className="placeholder:text-gray-300"
              placeholder="e.g., AdventureMaster"
              error={errors.username}
              autoFocus
            />
          </div>

          <div className="mb-2">
            <TextInput
              label="Password"
              name="password"
              type="password"
              hasErrorHandler
              value={form.password}
              onChange={handleChange}
              error={errors.password}
            />
          </div>

          <div className="mb-4">
            <TextInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              hasErrorHandler
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
          </div>

          <div className="space-y-3">
            <GlossyButton
              className="w-full"
              size="lg"
              variant="primary"
              onClick={handleSubmit}
            >
              Create Account
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
              <AuthLink
                promptText="Already have an account?"
                linkText="Log in"
                onClick={handleUserLogin}
              />
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

export default CreateAccountDialog;
