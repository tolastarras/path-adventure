import {
  CANVAS_PADDING,
  CELL_SIZE,
  MIN_FONT_SIZE,
  PATH,
  FONT_SCALE_FACTOR,
  COLORS,
} from '@/utils/constants';

// Helper function to calculate center coordinates
export const getCellCenterPoint = (cell = { x: 0, y: 0 }) => ({
  x: CANVAS_PADDING + cell.x * CELL_SIZE + CELL_SIZE / 2,
  y: CANVAS_PADDING + cell.y * CELL_SIZE + CELL_SIZE / 2,
});

// Helper to calculate path bounds for efficient clearing
export const calculatePathBounds = ((path) => {
  if (path.length === 0) return { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0 };

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

  path.forEach(cell => {
    const center = getCellCenterPoint(cell);
    minX = Math.min(minX, center.x);
    minY = Math.min(minY, center.y);
    maxX = Math.max(maxX, center.x);
    maxY = Math.max(maxY, center.y);
  });

  // Add padding for line width and dots
  const padding = Math.max(PATH.lineWidth, PATH.dotRadius) + 2;

  return {
    minX: minX - padding,
    minY: minY - padding,
    maxX: maxX + padding,
    maxY: maxY + padding,
    width: (maxX - minX) + padding * 2,
    height: (maxY - minY) + padding * 2
  };
});

// Helper to draw partial path (up to specified segment)
export const drawPartialPath = ((ctx, path, segmentsToShow) => {
  if (segmentsToShow < 0) return;

  // Draw path line up to current segment
  ctx.strokeStyle = PATH.color;
  ctx.lineWidth = PATH.lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  const start = getCellCenterPoint(path[0]);
  ctx.moveTo(start.x, start.y);

    // Draw line segments up to the current point
  const maxSegment = Math.min(segmentsToShow + 1, path.length - 1);

  // Draw line segments up to the current point
  for (let i = 1; i <= maxSegment; i++) {
    const point = getCellCenterPoint(path[i]);
    ctx.lineTo(point.x, point.y);
  }

  ctx.stroke();

  // Draw dots for completed points
  ctx.fillStyle = PATH.dotColor;

  for (let i = 0; i <= maxSegment; i++) {
    const point = getCellCenterPoint(path[i]);
    ctx.beginPath();
    ctx.ellipse(
      point.x,          // x
      point.y,          // y
      PATH.dotRadius,   // radiusX
      PATH.dotRadius,   // radiusY (same for perfect circle)
      0,                // rotation
      0,                // startAngle
      Math.PI * 2,      // endAngle
    );
    ctx.fill();
  }
});

// Draw text in the center of the cell
export const drawCellText = (ctx, text, options = {}) => {
  const {
    position = 'bottom', // 'bottom', 'top', 'center'
    offset = CELL_SIZE * 0.15,
    fontSize = Math.max(MIN_FONT_SIZE, CELL_SIZE / FONT_SCALE_FACTOR),
    color = COLORS.cellTextColor,
    fontFamily = 'Arial'
  } = options;

  const positions = {
    bottom: CELL_SIZE / 2 - offset,
    top: -CELL_SIZE / 2 + offset,
    center: 0
  };

  const textY = positions[position] || positions.bottom;

  ctx.fillStyle = color;
  ctx.font = `bold ${fontSize}px ${fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 0, textY);
};

export const convertMovesToCoordinates = (moves, path) => {
  const startCell = path[0];

  let x = startCell.x;
  let y = startCell.y;

  const coordinates = [{ x, y }]; // Start from correct position

  moves.forEach(move => {
    const match = move.match(/(\d+)([→←↑↓])/);
    if (!match) return;

    const [, countStr, direction] = match;
    const count = parseInt(countStr, 10);

    for (let i = 0; i < count; i++) {
      switch (direction) {
        case '→': x += 1; break;
        case '←': x -= 1; break;
        case '↑': y -= 1; break;
        case '↓': y += 1; break;
      }
      coordinates.push({ x, y });
    }
  });

  return coordinates;
};

// Helper function to determine bicycle direction
export const calculateBicycleDirection = (currentX, lastXPosition, lastDirection = 'right') => {
  let direction = lastDirection;

  if (lastXPosition !== null) {
    if (currentX > lastXPosition) {
      direction = 'right';
    } else if (currentX < lastXPosition) {
      direction = 'left';
    }
  }

  return direction;
};
