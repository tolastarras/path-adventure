export const convertArrowMovesToCoordinates = (playerMoves, startingCell) => {
  if (!startingCell) return [];
  
  let x = startingCell.x;
  let y = startingCell.y;
  
  const coordinates = [{ x, y }];

  playerMoves.forEach(move => {
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

/**
 * Converts a path of coordinates into a sequence of arrow moves
 * Compresses consecutive moves in the same direction with counts
 * 
 * @example
 * const path = [{x:0,y:0}, {x:1,y:0}, {x:2,y:0}, {x:2,y:1}, {x:2,y:2}];
 * convertPathToArrowMoves(path); // Returns ["2→", "2↓"]
 */
export const convertCoordinatesToArrowMoves = (path) => {
  if (!path || path.length < 2) return [];

  const moves = [];
  let currentDirection = null;
  let currentCount = 0;

  for (let i = 1; i < path.length; i++) {
    const prev = path[i - 1];
    const curr = path[i];
    
    // Determine direction between consecutive points
    const dx = curr.x - prev.x;
    const dy = curr.y - prev.y;
    
    let direction = null;
    
    if (dx === 1 && dy === 0) direction = '→';
    else if (dx === -1 && dy === 0) direction = '←';
    else if (dx === 0 && dy === 1) direction = '↓';
    else if (dx === 0 && dy === -1) direction = '↑';
    
    // If direction is invalid or changes, push the current move and reset
    if (!direction || direction !== currentDirection) {
      if (currentDirection && currentCount > 0) {
        moves.push(`${currentCount}${currentDirection}`);
      }
      currentDirection = direction;
      currentCount = 1;
    } else {
      // Same direction, increment count
      currentCount++;
    }
  }

  // Push the last move
  if (currentDirection && currentCount > 0) {
    moves.push(`${currentCount}${currentDirection}`);
  }

  return moves;
};
