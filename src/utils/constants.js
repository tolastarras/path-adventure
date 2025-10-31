export const DATA = {
  title: 'Path Adventure',
  description: 'Follow the blue path from 🚴‍♂️ to 🏁 with your moves!',
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

// Make squares bigger by increasing CELL_SIZE
export const GRID_SIZE = 10;
export const CELL_SIZE = 50; // Increased from 40 to 60 (50% bigger)
export const CANVAS_PADDING = 80; // Increased padding to accommodate larger squares
