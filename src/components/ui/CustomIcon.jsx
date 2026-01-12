import { ReactSVG } from 'react-svg';
import './CustomIcon.css';

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
};

const CustomIcon = ({
  icon,
  size = 'md',
  ...props
}) => {
  const { className, scale, onClick } = props;
  const classes = `custom-icon ${scale ? 'custom-icon--scale' : ''} ${className}`;

  return (
    <div className={`cursor-pointer ${classes}`}>
      <ReactSVG 
        src={icon}
        beforeInjection={(svg) => {
          svg.classList.add(...sizeClasses[size].split(' '), 'stroke-current');
        }}
        onClick={onClick}
      />
    </div>
  )
}

export default CustomIcon;
