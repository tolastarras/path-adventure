import HeaderTitle from './HeaderTitle';
import CustomIcon from './CustomIcon';
import { icons } from '@/utils/constants';

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
  const icon = icons[variant];

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
      <div className={`alert-box__container max-w-[92%] flex ${className}`}>
        <div className="alert-box__close-button">
          <button onClick={onClose}>
            <CustomIcon
              icon={icons.close}
              size="sm"
              className={`alert-box__close-icon text-${variant}`}
            />
          </button>
        </div>
        <div className={`flex-col ${combinedClasses}`}>
          <div className="flex">
            {icon && <div className="alert-box__icon hidden md:block">
              <CustomIcon icon={icon} size="xl" className={`mr-8 mt-2 text-${variant}`} />
            </div>}
            <div className="flex-col w-full">
              <HeaderTitle size="xl">{title}</HeaderTitle>
              <HeaderTitle size="lg">{description}</HeaderTitle>
            </div>
          </div>
          <div className="flex-col">
            {children && <div className="alert-box__children">{children}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertBox;
