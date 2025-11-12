export const DATA = {
  title: 'Path Adventure',
  description: 'Follow the path from 🚴‍♂️ to 🏁 with your moves!',
};

export const ICONS = {
  bicycle: '🚴‍♂️',
  finish: '🏁',
  left: '⬅️',
  right: '➡️',
  up: '⬆️',
  down: '⬇️',
  arrow: '/icons/arrow.svg',
  success: '/icons/success.svg',
  close: '/icons/close.svg',
  warning: '/icons/warning.svg',
  danger: '/icons/danger.svg',
  info: '/icons/info.svg',
};

// arrow button
export const ROTATION_ANGLES = {
  0: 'rotate-0',
  90: 'rotate-90',
  180: 'rotate-180',
  270: 'rotate-270',
};

export const GAME_RESULTS = {
  won: {
    title:"Congratulations! You found the correct path.",
    description: "You earned 150 points.",
    variant: 'success',
  },
  lost: {
    title:"Sorry, you didn't find the path!",
    description: "You didn't earn any points.",
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

export const COLORS = {
  primary: '#3b82f6',
  secondary: '#f59e0b',
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#fbbf24',
  info: '#3b82f6',
  // canvas
  canvasBackground: '#cbd5e1',
  canvasStroke: '#3b82f6',
  // terrain
  water: '#87ceeb',
  tree: '#00b050',
  sand: '#f1bd63',
  grass: '#1fbd2f',
  mud: '#8b4513',
  rock: '#c3b9b2',
  // path
  playerPathColor: '#10B981',
  pathColor: '#60a5fa',
  dotColor: '#3b82f6',
  cellTextColor: '#333',
};

export const TERRAIN_COLORS = {
  water: COLORS.water,
  tree: COLORS.tree,
  sand: COLORS.sand,
  grass: COLORS.grass,
  mud: COLORS.mud,
  rock: COLORS.rock,
};

export const GRID_SIZE = 11;      // Make squares bigger by increasing CELL_SIZE
export const CELL_SIZE = 70;      // Increased cell size
export const CANVAS_PADDING = 0;  // Increased padding to accommodate larger squares

export const CANVAS = {
  width: GRID_SIZE * CELL_SIZE + 2 * CANVAS_PADDING,
  height: GRID_SIZE * CELL_SIZE + 2 * CANVAS_PADDING,
  stroke: COLORS.canvasStroke,
};

export const PATH = {
  lineWidth: 4,
  dotRadius: 4,
  color: COLORS.pathColor,
  dotColor: COLORS.dotColor,
}

export const GAME_STATS = [
  {
    id: 1,
    title: 'Games Won',
    percent: 50,
  },
  {
    id: 2,
    title: 'Total Points',
    percent: 90,
  },
  {
    id: 3,
    title: 'Leaderboard',
    percent: 75,
  }
];
