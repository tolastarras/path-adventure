import { useState } from 'react';
import { HeaderTitle, CustomIcon } from '@/components';
import { avatarOptions, rotationAngles } from '@/utils/constants';
import { arrowIcon } from '@/assets';

import './AvatarSelector.css';

const AvatarSelector = ({ selectedAvatar, onAvatarChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxVisibleAvatars = 6;

  const handlePreviousClick = (e) => {
    e.preventDefault();
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  }

  const handleNextClick = (e) => {
    e.preventDefault();
    if (currentIndex + maxVisibleAvatars < avatarOptions.length) {
      setCurrentIndex(i => i + 1);
    }
  };

  return (
    <>
      <HeaderTitle className="mb-2" size="md" title="Choose Your Avatar" />
      <div className="avatar__container">
        {currentIndex > 0 && <button onClick={handlePreviousClick}>
          <CustomIcon icon={arrowIcon} className={`${rotationAngles[180]} animate-pulse text-yellow-200`} />
        </button>}

        {avatarOptions.slice(currentIndex, currentIndex + 6).map((avatar) => (
          <button
            key={avatar}
            type="button"
            onClick={() => onAvatarChange(avatar)}
            className={`avatar-border ${selectedAvatar === avatar ? 'selected': ''}`}
          >
            <span className="avatar">{avatar}</span>
          </button>
        ))}

        {currentIndex < avatarOptions.length - maxVisibleAvatars && <button onClick={handleNextClick}>
          <CustomIcon icon={arrowIcon} className="animate-pulse text-yellow-200" />
        </button>}
      </div>
    </>
  );
};

export default AvatarSelector;
