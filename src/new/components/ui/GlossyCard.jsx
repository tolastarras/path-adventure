import './GlossyCard.css';

const GlossyCard = ({
  title,
  description,
  children,
  showGlare = false,
  showGlow = false,
  showShine = true,
  showShadow = false,
  disableHover = true,
  className = ''
}) => {
  const baseClass = 'glossy-card--transparent';
  const hoverClasses = !disableHover && 'glossy-card--hover';
  
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
          <h3 className="glossy-card__title">{title}</h3>
          <p className="glossy-card__description">{description}</p>
          <div className="glossy-card__children">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default GlossyCard;
