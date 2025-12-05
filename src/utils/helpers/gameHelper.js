import { directionObjects, gameResults, gameStatsCards } from '@/utils/constants';

const getDirectionIcon = (direction) => {
  if (!direction) return '';
  return directionObjects.find(item => item.id === direction)?.icon;
};

export const directionIcons = directionObjects.map(dir => dir.icon).join('');

export const formatStep = (step) => {
  const { squares, direction } = step;
  if (!squares || !direction) return '';

  const directionIcon = getDirectionIcon(direction);
  return `${squares}${directionIcon}`;
};

export const gameResultsHeading = (stats) => {
  const { matches, percentage, total } = stats;
  const threshold = percentage === 100 ? 100 : percentage >= 80 ? 80 : percentage >= 50 ? 50 : 0;
  const { title, subtitle, variant } = gameResults[threshold];

  const description = (matches, total) => {
    if (threshold >= 50 && threshold < 100) {
      return `${subtitle} You got ${matches} of ${total} segments correct.`;
    }
    return `${subtitle}`;
  }

  return {
    title,
    description: description(matches, total),
    variant
  };
}

export const buildGameStatsCards = (stats) => {
  const { bestScore, totalScore, attempts, wins } = stats;

  return gameStatsCards.map((card) => {
    console.log(card);
    switch (card.id) {
      case 1:
        card.value = Math.floor(wins / attempts * 100);
        break;
      case 2:
        card.value = totalScore;
        break;
      case 3:
        card.value = bestScore
        break;
      default:
        break;
    }

    return card;
  });
}
