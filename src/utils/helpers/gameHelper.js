import { directionObjects } from '@/utils/constants';

const getDirectionIcon = (direction) => {
  if (!direction) return '';
  return directionObjects.find(item => item.id === direction)?.icon;
};

export const formatStep = (step) => {
  const { squares, direction } = step;
  if (!squares || !direction) return '';

  const directionIcon = getDirectionIcon(direction);
  return `${squares}${directionIcon}`;
};

export const directionIcons = () => directionObjects.map(dir => dir.icon).join('');
