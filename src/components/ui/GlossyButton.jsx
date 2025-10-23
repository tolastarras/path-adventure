import './GlossyButton.css';

const GlossyButton = ({
  children,
  disabled = false,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  ...props
}) => {
  const baseClass = 'glossy-button';
  const variantClass = `glossy-button--${variant}`;
  const sizeClass = `glossy-button--${size}`;
  
  const combinedClasses = [
    baseClass,
    variantClass,
    sizeClass,
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
        <span className="glossy-button__content">
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

export { GlossyButton, ButtonContainer };
