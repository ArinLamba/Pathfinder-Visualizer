export const BOARD_ROWS = 26;
export const BOARD_COLS = 70;

export const START_ROW = Math.floor(BOARD_ROWS / 2);
export const START_COL = Math.floor(BOARD_COLS / 4);
export const END_ROW = Math.floor(BOARD_ROWS / 2);
export const END_COL = 3 * START_COL;

export const DEFAULT_WEIGHT = 1;
export const FIXED_WEIGHT = 15;

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

export const algorithms = ["BFS", "DFS", "DIJKSTRA", "A*", "Bidirectional BFS", "Greedy Best-First-Search"] as const;
export const MAZES = ["Recursive Division", "Vertical Skew", "Horizontal Skew"] as const;

export const obstacles = [
  { title: "Wall", weight: "99", color: "dark:bg-[#d4d4d8] bg-[#0D0D0D]" },
  { title: "Grass", weight: "3", color: "bg-[#15803d]" },
  { title: "Water", weight: "5", color: "bg-[#1d4ed8]" },
  { title: "Mountain", weight: "8", color: "bg-[#8b5e3c]"},
] as const;