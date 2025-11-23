import { AlertBox } from '.';
import { HeaderTitle } from '.';
import { howToPlay } from '@/utils/constants';

const HowToPlayAlert = ({ onClose }) => {
  const { title, description, steps, proTip } = howToPlay;

  return (
    <AlertBox
      variant='transparent'
      onClose={onClose}
    >
      <div className="space-y-8">
        <HeaderTitle 
          size="xl" 
          className="mb-2 bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent" 
          title={title}
        />
        <HeaderTitle 
          size="lg" 
          className="mb-6 text-white/90" 
          title={description} 
        />
        
        <div className="grid space-y-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Step Number */}
              <div className="shrink-0 w-8 h-8 bg-linear-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              
              {/* Step Content */}
              <div className="flex-1 flex items-start space-x-3">
                <span className="text-white/90 text-lg leading-relaxed">
                  {step}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
        <div className="flex items-center space-x-2 text-yellow-400 mb-2">
          <span className="text-lg">💡</span>
          <span className="font-bold">Pro Tip</span>
        </div>
        <p className="text-white/80 text-sm">
          {proTip}
        </p>
      </div>
      <p>&nbsp;</p>
    </AlertBox>
  );
};

export default HowToPlayAlert;
