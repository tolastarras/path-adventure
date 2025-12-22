import { AlertBox, HeaderTitle, RoundButton } from '@/components';
import { howToPlay, about } from '@/utils/constants';

import './HowToPlayAlert.css';

const HowToPlayAlert = ({ onClose }) => {
  const { title, description, steps, proTip } = howToPlay;
  const { title: aboutTitle, description: aboutDescription, cards, dev, footer } = about;

  return (
    <AlertBox
      variant='transparent'
      onClose={onClose}
    >
      <div className="mb-8">
        <HeaderTitle 
          size="xl" 
          className="alert-title"
          title={aboutTitle}
        />
        <HeaderTitle 
          size="lg" 
          className="alert-description"
          title={aboutDescription}
        />
      </div>

      <div className="space-y-4 md:space-y-8">
        <div className="about-cards__container">
          {cards.length && cards.map(card => (
            <div className="about-card" key={card.id}>
              <HeaderTitle
                title={card.title}
                size="lg"
                className={`about-card-header ${card.id}`}
              />
              <ul className="list-outside space-y-3">
                {card.items.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">⭐</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <HeaderTitle
            size="xl"
            className="alert-title"
            title={title}
          />
          <HeaderTitle
            size="lg"
            className="alert-description"
            title={description}
          />
        </div>

        <div className="mb-8">
          <div className="grid space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="how-to-step"
              >
                {/* Step Number */}
                <RoundButton value={index + 1} />

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

        <div className="pro-tip__container">
          <div className="pro-tip--title">
            <span className="text-lg">💡</span>
            <span className="font-bold">Pro Tip</span>
          </div>
          <p className="text-white/80 text-sm">
            {proTip}
          </p>
        </div>

        <div className="dev--section">
          <HeaderTitle
            title={dev.title}
            size="lg"
            className="mb-4 text-center"
          />
          <div className="text-center md:text-start max-w-2xl mx-auto">
            <p className="text-lg md:text-xl leading-relaxed">
              {dev.message}
            </p>
          </div>
        </div>

        <div className="footer">
          {footer}
        </div>
      </div>
    </AlertBox>
  );
};

export default HowToPlayAlert;
