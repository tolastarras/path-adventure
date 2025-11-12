import HeaderTitle from './HeaderTitle';
import CustomIcon from './CustomIcon';

import { ICONS } from '@/utils/constants';

import './AlertBox.css';

const AlertBox = ({
  title,
  description,
  variant = 'primary',
  children,
  showGlare = false,
  showGlow = false,
  showShine = true,
  showShadow = false,
  disableHover = true,
  className = '',
  onClose,
}) => {
  const baseClass = `alert-box alert-box--${variant}`;
  const hoverClasses = !disableHover && 'alert-box--hover';
  const icon = ICONS[variant];

  const effectClasses = [
    showGlare && 'alert-box--with-glare',
    showGlow && 'alert-box--with-glow-soft',
    showShine && 'alert-box--with-shine',
    showShadow && 'alert-box--with-shadow',
  ].filter(Boolean).join(' ');

  const combinedClasses = [
    baseClass,
    hoverClasses,
    effectClasses,
  ].filter(Boolean).join(' ');

  return (
    <div className="alert-box-overlay">
      <div className={`alert-box__container ${className}`}>
        <div className="alert-box__close-button">
          <button onClick={onClose}>
            <CustomIcon
              icon={ICONS.close}
              className={`alert-box__close-icon text-${variant}`}
            />
          </button>
        </div>
        <div className={`flex ${combinedClasses}`}>
          {icon && <div className="alert-box__icon">
            <CustomIcon icon={icon} className={`h-20 w-20 mr-8 mt-2 text-${variant}`} />
          </div>}
          <div className="flex-col">
            <HeaderTitle size="lg">{title}</HeaderTitle>
            <HeaderTitle size="md">{description}</HeaderTitle>
            <div className="alert-box__children">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertBox;
