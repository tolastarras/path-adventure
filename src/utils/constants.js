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
  success: {
    title:"Congratulations! You found the correct path.",
    description: "You earned 150 points.",
    icon: ICONS.success,
    variant: 'success',
  },
  fail: {
    title:"Sorry! You didn't fine the path :(",
    description: "You didn't earn any points.",
    icon: ICONS.danger,
    variant: 'danger',
  }
}

export const DIRECTIONS = [
  { id: 'up', label: 'Up', icon: '↑', rotation: 270 },
  { id: 'left', label: 'Left', icon: '←', rotation: 180 },
  { id: 'right', label: 'Right', icon: '→', rotation: 0 },
  { id: 'down', label: 'Down', icon: '↓', rotation: 90 },
];

export const GRID_SIZE = 11;      // Make squares bigger by increasing CELL_SIZE
export const CELL_SIZE = 70;      // Increased cell size
export const CANVAS_PADDING = 0;  // Increased padding to accommodate larger squares
