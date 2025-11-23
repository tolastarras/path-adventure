import { HeaderTitle } from '@/components';
import { generalInfo } from '@/utils/constants';

const GameHeader = ({ className = '' }) => {
  const { title, description } = generalInfo;
  
  return (
    <div className={`game-header__container ${className}`}>
      <div className="flex-1 min-w-[200px]">
        <HeaderTitle className="glossy-card__title">{title}</HeaderTitle>
        <p className="glossy-card__description">{description}</p>
      </div>
      <picture className="absolute top-2 right-2">
        <source
          srcSet="/logo.webp"
          type="image/webp"
        />
        <source
          srcSet="/logo.png"
          type="image/png"
        />
        <img
          className="object-contain w-20 pl-4 md:w-35"
          src="/logo.png"
          alt="logo"
          loading="lazy"
        />
      </picture>
    </div>
  )
}

export default GameHeader;
