import { HeaderTitle } from '@/components';
import { DATA } from '@/utils/constants';

const GameHeader = () => {
  const { title, description } = DATA;
  
  return (
    <div className="flex justify-between">
      <div>
        <HeaderTitle className="glossy-card__title">{title}</HeaderTitle>
        <p className="glossy-card__description">{description}</p>
      </div>
      <picture>
        <source
          srcSet="/logo.webp"
          type="image/webp"
        />
        <source
          srcSet="/logo.png"
          type="image/png"
        />
        <img
          className="object-contain pl-4 min-w-[140px] w-40"
          src="/logo.png"
          alt="logo"
          loading="lazy"
        />
      </picture>
    </div>
  )
}

export default GameHeader;
