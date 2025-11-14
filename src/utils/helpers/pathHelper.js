// Helper: Check if a segment exists in the path
export const isSegmentInPath = (segment, correctPath) => {
  for (let i = 0; i < correctPath.length - 1; i++) {
    const correctSegment = [correctPath[i], correctPath[i + 1]];
    if (segmentsMatch(segment, correctSegment)) {
      return true;
    }
  }
  return false;
};

// Helper: Check if two segments match
const segmentsMatch = (seg1, seg2) => {
  return (
    seg1[0].x === seg2[0].x && seg1[0].y === seg2[0].y &&
    seg1[1].x === seg2[1].x && seg1[1].y === seg2[1].y
  );
};
