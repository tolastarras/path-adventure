import { cellSize } from '@/utils/constants';

const drawTerrainElement = (ctx, x, y, image, type, options = { scale: 1, rotation: 0 }) => {  
  if (!image) return;

  const { scale = 1 } = options;
  const size = cellSize * scale;
  const offset = (cellSize - size) / 2;

  // Apply random rotation
  // ctx.rotate((Math.PI / 180) * rotation);

  ctx.drawImage(
    image,        // Image to draw
    x + offset,   // dx: x coordinate
    y + offset,   // dy: y coordinate
    size,         // dWidth: draw at full size width
    size          // dHeight: draw at full size height
  );
};

// Specific terrain type functions
export const drawTree = (ctx, x, y, image, options) => {
  drawTerrainElement(ctx, x, y, image, 'tree', options);
};

export const drawRock = (ctx, x, y, image, options) => {
  drawTerrainElement(ctx, x, y, image, 'rock', options);
};

export const drawMud = (ctx, x, y, image, options) => {
  drawTerrainElement(ctx, x, y, image, 'mud', options);
};

export const drawGrass = (ctx, x, y, image, options) => {
  drawTerrainElement(ctx, x, y, image, 'grass', options);
};

export const drawWater = (ctx, x, y, image, options) => {
  drawTerrainElement(ctx, x, y, image, 'water', options);
};

export const drawSand = (ctx, x, y, image, options) => {
  drawTerrainElement(ctx, x, y, image, 'sand', options);
};
