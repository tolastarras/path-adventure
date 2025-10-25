import './GlossyButton.css';

const GlossyButton = ({
  children,
  disabled = false,
  variant = 'success',
  size = 'md',
  onClick,
  className = '',
  showGlow = false,
  showShadow = false,
  withGlare = true,
  ...props
}) => {
  const baseClass = 'glossy-button';
  const variantClass = `glossy-button--${variant}`;
  const sizeClass = `glossy-button--${size}`;

    
  const effectClasses = [
    showGlow && 'glossy-button--with-glow-soft',
    showShadow && 'glossy-button--with-shadow',
    withGlare && 'glossy-button--with-glare',
    className
  ].filter(Boolean).join(' ');

  
  const combinedClasses = [
    baseClass,
    variantClass,
    sizeClass,
    effectClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={combinedClasses}
      {...props}
    >
      <div className="glossy-button__effect" />
      
      <div className="relative z-10">
        <span className={`glossy-button__content ${size}`}>
          {children}
        </span>
      </div>
    </button>
  );
};

// Container component
const ButtonContainer = ({ children, className = '' }) => (
  <div className={`glossy-button-container ${className}`}>
    {children}
  </div>
);

export { ButtonContainer };

export default GlossyButton;
