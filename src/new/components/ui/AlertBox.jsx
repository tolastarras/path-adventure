import { HeaderTitle } from '../';

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
  className = ''
}) => {
  const baseClass = `alert-box--transparent alert-box__border--${variant}`;
  const hoverClasses = !disableHover && 'alert-box--hover';

  const handleOverlayClick = () => {
    console.log('Overlay clicked');
  }
  
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
    <div
      className="fixed w-full bg-black/50 inset-0 grid place-items-center z-50 mx-auto"
      onClick={handleOverlayClick}
    >
      {/* <div className="max-w:md w-[354px]">

      </div> */}
      <div className={`alert-box-grid ${className}`}>
        <div className={combinedClasses}>
          <div className="alert-box__content">
            <HeaderTitle size="xl">{title}</HeaderTitle>
            <h3 className="alert-box__title">{title}</h3>
            <p className="alert-box__description">{description}</p>
            <div className="alert-box__children">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertBox;
