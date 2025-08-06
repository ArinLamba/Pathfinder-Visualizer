export const BOARD_ROWS = 15;
export const BOARD_COLS = 15;

export const directions = [
        [-1,0],
  [0,-1],     [0,1],
        [1, 0]
]as const;

export const isValid = (row: number, col: number) : boolean => {
  return row >= 0 && col >= 0 && row < BOARD_ROWS && col < BOARD_COLS;
};

export const algorithms = ['BFS', 'DFS', 'DIJKASTRA', 'A*'] as const;