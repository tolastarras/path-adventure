import {
  infoIcon,
  questionIcon,
  trophyIcon,
  successIcon,
  warningIcon,
  dangerIcon,
  closeIcon,
} from '@/assets';

import { colors } from '.';

export const DATA = {
  title: 'Path Adventure',
  description: 'Follow the path from 🚴‍♂️ to 🏁',
};

export const ICONS = {
  bicycle: '🚴‍♂️',
  finish: '🏁',
  success: successIcon,
  warning: warningIcon,
  danger: dangerIcon,
  close: closeIcon,
  leaderboard: trophyIcon,
  info: infoIcon,
  question: questionIcon,
};

export const MENU_ITEMS = [
  { id: 'leaderboard', icon: ICONS.leaderboard },
  { id: 'how-to-play', icon: ICONS.info },
  { id: 'about', icon: ICONS.question },
];

// arrow button
export const ROTATION_ANGLES = {
  0: 'rotate-0',
  90: 'rotate-90',
  180: 'rotate-180',
  270: 'rotate-270',
};

export const GAME_RESULTS = {
  won: {
    title: 'Congratulations!',
    subtitle: 'You found the correct path.',
    description: (moves) => `You reached the destination in ${moves} moves.`,
    variant: 'success',
  },
  lost: {
    title: "Learning experience!",
    description: (points) => points > 0 
      ? `You earned ${points} points. Practice makes perfect!`
      : "Don't give up! Every explorer gets lost sometimes.",
    variant: 'danger',
  }
}

export const FONT_SCALE_FACTOR = 6;
export const MIN_FONT_SIZE = 10;

export const DIRECTIONS = [
  { id: 'up', label: 'Up', icon: '↑', rotation: 270 },
  { id: 'left', label: 'Left', icon: '←', rotation: 180 },
  { id: 'right', label: 'Right', icon: '→', rotation: 0 },
  { id: 'down', label: 'Down', icon: '↓', rotation: 90 },
];

export const TERRAIN_TYPES = [
  'water',
  'tree',
  'sand',
  'mud',
  'grass',
  'rock',
];

export const GRID_SIZE = 10;      // Make squares bigger by increasing CELL_SIZE
export const CELL_SIZE = 50;      // Increased cell size
export const CANVAS_PADDING = 0;  // Increased padding to accommodate larger squares

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
console.log(screenWidth, screenHeight);

export const CANVAS = {
  width: GRID_SIZE * CELL_SIZE + 2 * CANVAS_PADDING,
  height: GRID_SIZE * CELL_SIZE + 2 * CANVAS_PADDING,
  stroke: colors.canvasStroke,
};

export const ITINERARY = {
  lineWidth: 4,
  dotRadius: 4,
  color: colors.pathColor,
  dotColor: colors.dotColor,
}

export const GAME_STATS = [
  {
    id: 1,
    title: 'Games Won',
    type: 'percent',
    value: 45,
  },
  {
    id: 2,
    title: 'Total Points',
    type: 'number',
    value: 20,
  },
  {
    id: 3,
    title: 'Leaderboard',
    type: 'percent',
    value: 70,
  }
];

export const TYPOGRAPHY = {
  fontSize: Math.max(MIN_FONT_SIZE, CELL_SIZE / FONT_SCALE_FACTOR),
  fontFamily: 'Arial'
}
