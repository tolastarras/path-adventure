import { twMerge } from 'tailwind-merge';

import './GlossyButton.css';

const GlossyButton = ({
  children,
  disabled = false,
  variant = 'success',  // primary, success, danger, transparent
  type = 'regular',     // pill or regular
  size = 'md',          // sm, md, lg
  onClick,
  className = '',
  showGlow = false,
  showShadow = false,
  showGlare = true,
  isActive = false,
  ...props
}) => {
  const baseClass = 'glossy-button';
  const variantClass = `${disabled ? 'glossy-button--disabled' : `glossy-button--${variant}`}`;
  const sizeClass = `glossy-button--${size}`;
  const typeClass = `glossy-button--${type}`;

  const effectClasses = [
    isActive && 'glossy-button--active',
    showGlow && 'glossy-button--with-glow-soft',
    showShadow && 'glossy-button--with-shadow',
  ].filter(Boolean).join(' ');

  const combinedClasses = [
    baseClass,
    variantClass,
    sizeClass,
    typeClass,
    effectClasses,
  ].filter(Boolean).join(' ');

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={twMerge(combinedClasses, className)}
      {...props}
    >
      {showGlare && <div className={`glossy-button__with-glare ${type}`} />}
      
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
