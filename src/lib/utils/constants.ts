export const BOARD_ROWS = 26;
export const BOARD_COLS = 68;

export const START_ROW = Math.floor(BOARD_ROWS / 2);
export const START_COL = Math.floor(BOARD_COLS / 4);
export const END_ROW = Math.floor(BOARD_ROWS / 2);
export const END_COL = 3 * START_COL;


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

export const algorithms = ['BFS', 'DFS', 'DIJKSTRA', 'A*'] as const;