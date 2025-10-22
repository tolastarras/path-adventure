export const reconstructPlayerPath = (playerMoves, path) => {
  let reconstructedPath = [{ x: path[0].x, y: path[0].y }];
  let currentX = path[0].x;
  let currentY = path[0].y;

  playerMoves.forEach(move => {
    const count = parseInt(move.match(/\d+/)[0]);
    const direction = move.match(/[↑→←↓]/)[0];
    
    const directionMap = {
      '↑': { dx: 0, dy: -1 },
      '→': { dx: 1, dy: 0 },
      '←': { dx: -1, dy: 0 },
      '↓': { dx: 0, dy: 1 }
    };

    const { dx, dy } = directionMap[direction];
    
    for (let i = 0; i < count; i++) {
      currentX += dx;
      currentY += dy;
      // Check bounds
      if (currentX >= 0 && currentX < 10 && currentY >= 0 && currentY < 10) {
        reconstructedPath.push({ x: currentX, y: currentY });
      }
    }
  });

  return reconstructedPath;
};
