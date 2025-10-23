const GlossyButton = ({
  children,
  variant = 'green',
  size = 'md',
  onClick,
  className = '',
  title,
  description,
  ...props
}) => {
  // Base button classes
  const baseClasses = `
    cursor-pointer
    relative
    inline-block
    text-center
    bg-transparent
    rounded-full
    shadow-lg
    transition-transform
    duration-100
    transition-shadow
    duration-100
    hover:scale-105
    ${className}
  `;

  // Size variants
  const sizeClasses = {
    sm: 'px-6 py-3 min-w-32 max-w-48 m-2',
    md: 'px-8 py-4 min-w-48 max-w-72 m-3',
    lg: 'px-10 py-5 min-w-56 max-w-80 m-4'
  };

  // Color variants using Tailwind gradients
  const variantClasses = {
    blue: `
      before:bg-gradient-to-b before:from-blue-700 before:via-blue-500 before:to-blue-200 before:to-90% before:via-60%
      after:bg-gradient-to-b after:from-blue-500 after:to-blue-600
    `,
    green: `
      before:bg-gradient-to-b before:from-green-700 before:via-green-500 before:to-green-200 before:to-90% before:via-60%
      after:bg-gradient-to-b after:from-green-500 after:to-green-600 hover:after:radial-gradient
    `,
    red: `
      before:bg-gradient-to-b before:from-red-700 before:via-red-500 before:to-red-200 before:to-90% before:via-60%
      after:bg-gradient-to-b after:from-red-500 after:to-red-600
    `,
    purple: `
      before:bg-gradient-to-b before:from-purple-700 before:via-purple-500 before:to-purple-200 before:to-90% before:via-60%
      after:bg-gradient-to-b after:from-purple-500 after:to-purple-600
    `
  };

  // Gloss effect overlay
  const glossEffectClasses = `
    absolute
    w-[80%]
    h-[50%]
    top-1
    left-1/2
    -translate-x-1/2
    rounded-full
    bg-linear-to-b
    from-white/90
    via-white/40
    to-transparent
    pointer-events-none
  `;

  // Shadow effects
  const shadowClasses = `
    [box-shadow:0_5px_20px_rgba(255,255,255,0.4),-8px_8px_5px_rgba(0,0,0,0.15),5px_18px_10px_rgba(0,0,0,0.2)]

    hover:[box-shadow:0_5px_20px_rgba(255,255,255,0.4),-12px_12px_5px_rgba(0,0,0,0.15),10px_25px_10px_rgba(0,0,0,0.2)]
  `;

  const combinedClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${shadowClasses}
    before:content-['']
    before:absolute
    before:inset-0
    before:rounded-full
    before:z-[-2]
    after:content-['']
    after:absolute
    after:inset-0
    after:rounded-full
    after:z-[-1]
    after:opacity-40
    after:transition-opacity
    after:duration-400
    hover:after:opacity-80
  `.replace(/\s+/g, ' ').trim();

  return (
    <button
      onClick={onClick}
      className={combinedClasses}
      {...props}
    >
      <div className={glossEffectClasses} />
      
      {/* Content */}
      <div className="relative z-10">
        {title && (
          <span className="
            block
            text-2xl
            font-medium
            text-white
            drop-shadow-md
          ">
            {title}
          </span>
        )}
        
        {description ? (
          <span className="
            block
            pt-1
            text-base
            font-medium
            text-black/70
            drop-shadow-sm
          ">
            {description}
          </span>
        ) : (
          <span className="text-white text-2xl drop-shadow-lg hover:drop-shadow-xl">
            {children}
          </span>
        )}
      </div>
    </button>
  );
};

// Container component
const ButtonContainer = ({ children, className = '' }) => (
  <div className={`
    flex
    items-center
    justify-center
    flex-wrap
    p-5
    ${className}
  `}>
    {children}
  </div>
);

export { GlossyButton, ButtonContainer };

export default GlossyButton;
