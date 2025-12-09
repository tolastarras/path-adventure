import HeaderTitle from './HeaderTitle';

import './GlossyCard.css';

const GlossyCard = ({
  title,
  description,
  children,
  showOverflow = false,
  showGlare = false,
  showGlow = false,
  showShine = true,
  showShadow = false,
  showPadding = true,
  disableHover = true,
  className = ''
}) => {
  const hoverClasses = !disableHover && 'glossy-card--hover';
  const baseClass = `glossy-card--transparent ${showPadding && 'glossy-card--padding'}
    overflow-${showOverflow ? 'visible' : 'hidden'}`;

  const effectClasses = [
    showGlare && 'glossy-card--with-glare',
    showGlow && 'glossy-card--with-glow-soft',
    showShine && 'glossy-card--with-shine',
    showShadow && 'glossy-card--with-shadow',
  ].filter(Boolean).join(' ');

  const combinedClasses = [
    baseClass,
    hoverClasses,
    effectClasses,
  ].filter(Boolean).join(' ');

  return (
    <div className={`glossy-card-grid ${className}`}>
      <div className={combinedClasses}>
        <div className="glossy-card__content">
          {title && <HeaderTitle className="glossy-card__title">{title}</HeaderTitle>}
          {description && <p className="glossy-card__description">{description}</p> }
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default GlossyCard;
