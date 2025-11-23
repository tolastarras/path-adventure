import { AlertBox } from '.';
import { HeaderTitle } from '.';
import { about } from '@/utils/constants';

import './AboutGamePathAlert.css';

const AboutGamePathAlert = ({ onClose }) => {
  const { title, description, cards, dev, footer } = about;

  return (
    <AlertBox
      variant='transparent'
      onClose={onClose}
    >
      <HeaderTitle 
        size="xl" 
        className="mb-4 bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent" 
        title={title}
      />
      <div className="space-y-4 md:space-y-8">
        <div className="max-w-3xl mx-auto">
          <p className="about-description">
            { description }
          </p>
        </div>

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

        <div className="about-dev--section">
          <HeaderTitle
            title={dev.title}
            size="lg"
            className="mb-4 text-center text-white"
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

export default AboutGamePathAlert;
