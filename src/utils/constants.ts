export const BOARD_ROWS = 19;
export const BOARD_COLS = 50;

export const directions = [
  [0, 1],   // right
  [-1, 0],  // up
  // [-1, 1],  // up-right
  // [1, 1],   // down-right
  [1, 0],   // down
  // [1, -1],  // down-left
  [0, -1],  // left
  // [-1, -1]  // up-left
]as const;

export const isValid = (row: number, col: number) : boolean => {
  return row >= 0 && col >= 0 && row < BOARD_ROWS && col < BOARD_COLS;
};

export const algorithms = ['BFS', 'DFS', 'DIJKASTRA', 'A*'] as const;