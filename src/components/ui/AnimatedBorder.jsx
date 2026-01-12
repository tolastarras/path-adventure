const AnimatedBorder = ({ children, className = "" }) => {
  return (
    <div className={`relative w-20 h-20 rounded-2xl shadow-[16px_16px_20px_#0000008c] overflow-hidden ${className}`}>
      {/* Animated border using before pseudo-element */}
      <div className="absolute inset-0 rounded-2xl before:absolute before:top-[-50%] before:right-[-50%] before:bottom-[-50%] before:left-[-50%] before:bg-[conic-gradient(transparent,transparent,#00a6ff)] before:animate-spin">
      </div>
      {children}
      
      <div className="absolute top-1 right-1 left-1 bottom-1 rounded-2xl bg-linear-to-br from-blue-500 via-30% to-blue-600">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBorder;
