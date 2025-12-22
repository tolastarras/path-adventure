import { HeaderTitle } from '@/components';
import { avatarOptions } from '@/utils/constants';

import './AvatarSelector.css';

const AvatarSelector = ({ selectedAvatar, onAvatarChange }) => {
  return (
    <>
      <HeaderTitle className="mb-2" size="md" title="Choose Your Avatar" />
      <div className="avatar__container">
        {avatarOptions.map((avatar) => (
          <button
            key={avatar}
            type="button"
            onClick={() => onAvatarChange(avatar)}
            className={`avatar-border ${selectedAvatar === avatar ? 'selected': ''}`}
          >
            <span className="avatar">{avatar}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default AvatarSelector;
