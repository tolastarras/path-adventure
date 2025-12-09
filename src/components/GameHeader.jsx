import { useState } from 'react';
import { HeaderTitle, BubbleDialog } from '@/components';
import { generalInfo } from '@/utils/constants';

import './GameHeader.css';

const GameHeader = ({ className = '' }) => {
  const { title, description } = generalInfo;
  const [showBubble, setShowBubble] = useState(false);

  const handleMouseEnter = () => {
    setShowBubble(true);
  };

  const handleMouseLeave = () => {
    setShowBubble(false);
  };

  return (
    <div className={`game-header__container ${className}`}>
      <BubbleDialog showBubble={showBubble} />
      <div className="flex-1 min-w-[200px]">
        <HeaderTitle className="glossy-card__title">{title}</HeaderTitle>
        <div className="glossy-card__description">
          <span className="inline md:hidden">{description.mobile}</span>
          <span className="hidden md:inline">{description.desktop}</span>
        </div>
      </div>
      <picture
        className="absolute top-4 right-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <source
          srcSet="/logo.webp"
          type="image/webp"
        />
        <source
          srcSet="/logo.png"
          type="image/png"
        />
        <img
          className="object-contain w-30 pl-4 md:w-35"
          src="/logo.png"
          alt="logo"
          loading="lazy"
        />
      </picture>
    </div>
  )
}

export default GameHeader;
