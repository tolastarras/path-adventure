import './GlossyCard.css';

const GlossyCard = ({
  title,
  description,
  children,
  showGlare = false,
  showGlow = false,
  showShine = true,
  showShadow = false,
  className = ''
}) => {
  const baseClass = 'glossy-card--transparent';
  
  const effectClasses = [
    showGlare && 'glossy-card--with-glare',
    showGlow && 'glossy-card--with-glow-soft',
    showShine && 'glossy-card--with-shine',
    showShadow && 'glossy-card--with-shadow',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="glossy-card-grid">
      <div className={`${baseClass} ${effectClasses}`}>
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
