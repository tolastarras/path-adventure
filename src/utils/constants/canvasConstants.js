import { colors } from '.';
import { getResponsiveGridConstants } from '@/utils/helpers';

const FONT_SCALE_FACTOR = 6;
const MIN_FONT_SIZE = 10;

export const CANVAS_PADDING = 0;

export const GRID_COLS = getResponsiveGridConstants().cols;
export const CELL_SIZE = getResponsiveGridConstants().cellSize;
export const GRID_ROWS = getResponsiveGridConstants().rows;

export const CANVAS = {
  width: GRID_COLS * CELL_SIZE + 2 * CANVAS_PADDING,
  height: GRID_ROWS * CELL_SIZE + 2 * CANVAS_PADDING,
  stroke: colors.canvasStroke,
};

// Canvas typography (start & finish labels)
export const TYPOGRAPHY = {
  fontSize: Math.max(MIN_FONT_SIZE, CELL_SIZE / FONT_SCALE_FACTOR),
  fontFamily: 'Arial',
};
