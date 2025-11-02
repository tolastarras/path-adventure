import './ProgressBar.css';

const ProgressBar = ({
  percentage = 50,
  variant="success",
  showAnimation = false
}) => {
  return (
    <div className={`progress-bar-container progress-bar-container--${variant}`}>
      <div 
        className={`progress-bar progress-bar--${variant} ${showAnimation && 'animate-stripes'}`}
        style={{
          width: `${percentage}%`,
          transition: `width 1s ease-in-out`
        }}
      >
        {percentage}%
      </div>
    </div>
  )
}

export default ProgressBar;
