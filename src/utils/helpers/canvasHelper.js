import {
  canvasPadding,
  cellSize,
  typography,
  itinerary,
  colors,
} from '@/utils/constants';

// Helper function to calculate center coordinates
export const getCellCenterPoint = (cell = { x: 0, y: 0 }) => ({
  x: canvasPadding + cell.x * cellSize + cellSize / 2,
  y: canvasPadding + cell.y * cellSize + cellSize / 2,
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
  const padding = Math.max(itinerary.lineWidth, itinerary.dotRadius) + 2;

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
  ctx.strokeStyle = itinerary.color;
  ctx.lineWidth = itinerary.lineWidth;
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
  ctx.fillStyle = itinerary.dotColor;

  for (let i = 0; i <= maxSegment; i++) {
    const point = getCellCenterPoint(path[i]);
    ctx.beginPath();
    ctx.ellipse(
      point.x,              // x
      point.y,              // y
      itinerary.dotRadius,  // radiusX
      itinerary.dotRadius,  // radiusY (same for perfect circle)
      0,                    // rotation
      0,                    // startAngle
      Math.PI * 2,          // endAngle
    );
    ctx.fill();
  }
});

// Draw text in the center of the cell
export const drawCellText = (ctx, text, options = {}) => {
  const {
    position = 'bottom', // 'bottom', 'top', 'center'
    offset = cellSize * 0.15,
    fontSize= typography.fontSize,
    color = colors.cellTextColor,
    fontFamily = typography.fontFamily
  } = options;

  const positions = {
    bottom: cellSize / 2 - offset,
    top: -cellSize / 2 + offset,
    center: 0
  };

  const textY = positions[position] || positions.bottom;

  ctx.fillStyle = color;
  ctx.font = `bold ${fontSize}px ${fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 0, textY);
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
