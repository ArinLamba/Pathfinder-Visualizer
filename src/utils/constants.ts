export const BOARD_ROWS = 24;
export const BOARD_COLS = 59;

export const START_ROW = 10;
export const START_COL = 14;
export const END_ROW = 10;
export const END_COL = 41;


export const directions = [
  [-1, 0],  // up
  [0, 1],   // right
  [1, 0],   // down
  [0, -1],  // left
  // [-1, 1],  // up-right
  // [1, 1],   // down-right
  // [1, -1],  // down-left
  // [-1, -1]  // up-left
] as const;

export const isValid = (row: number, col: number) : boolean => {
  return row >= 0 && col >= 0 && row < BOARD_ROWS && col < BOARD_COLS;
};

export const algorithms = ['BFS', 'DFS', 'DIJKASTRA', 'A*'] as const;