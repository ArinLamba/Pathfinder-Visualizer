import { BOARD_COLS, BOARD_ROWS } from "./constants";

export const generateGrid = () => {
  return Array.from({length: BOARD_ROWS}, (_, i) =>
    Array.from({length: BOARD_COLS}, (_, j) => ({
      row: i,
      col: j,
      isStart:false,
      isEnd: false,
      isWall: false,
      isVisited: false,
    }))
  );
};