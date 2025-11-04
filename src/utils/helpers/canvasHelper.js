import { CANVAS_PADDING, CELL_SIZE, PATH } from '@/utils/constants'; 

// Helper function to calculate center coordinates
export const getCellCenterPoint = ({ x, y }) => ({
  x: CANVAS_PADDING + x * CELL_SIZE + CELL_SIZE / 2,
  y: CANVAS_PADDING + y * CELL_SIZE + CELL_SIZE / 2
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
  ctx.strokeStyle = PATH.strokeColor;
  ctx.lineWidth = PATH.lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  const start = getCellCenterPoint(path[0]);
  ctx.moveTo(start.x, start.y);

  // Draw line segments up to the current point
  for (let i = 1; i <= Math.min(segmentsToShow + 1, path.length - 1); i++) {
    const point = getCellCenterPoint(path[i]);
    ctx.lineTo(point.x, point.y);
  }

  ctx.stroke();

  // Draw dots for completed points
  ctx.fillStyle = PATH.fillColor;
  for (let i = 0; i <= Math.min(segmentsToShow + 1, path.length - 1); i++) {
    const center = getCellCenterPoint(path[i]);
    ctx.beginPath();
    ctx.arc(center.x, center.y, PATH.dotRadius, 0, Math.PI * 2);
    ctx.fill();
  }
});
