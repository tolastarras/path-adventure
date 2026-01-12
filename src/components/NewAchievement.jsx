import './NewAchievement.css';

const NewAchievement = ({ icon, title, subtitle }) => (
  <div className="new-achievement__container">
    <div className="relative mb-8">
      <span className="new-achievement-header">
        New Achievement
      </span>
      <div className="new-achievement-header__divider" />
    </div>
    
    {/* Trophy/medal with shine effect */}
    <div className="relative mb-6">
      <div className="new-achievement-icon-shine" />
      <span className="text-7xl relative z-10 animate-bounce">{icon}</span>
    </div>
    
    {/* Achievement details */}
    <div className="text-center space-y-2">
      <div className="new-achievement-title">
        <span className="new-achievement-title__text">
          {title}
        </span>
      </div>
      
      <span className="new-achievement-subtitle">
        {subtitle}
      </span>
      
      <span className="new-achievement-record-message">
        You've set a new record!
      </span>
    </div>
  </div>
);

export default NewAchievement;
