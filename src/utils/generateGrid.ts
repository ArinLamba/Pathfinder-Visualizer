import { 
  BOARD_COLS, 
  BOARD_ROWS, 
  END_COL, 
  END_ROW, 
  START_COL, 
  START_ROW 
} from "./constants";

export const generateGrid = () => {

  return Array.from({length: BOARD_ROWS}, (_, i) =>
    Array.from({length: BOARD_COLS}, (_, j) => ({
      row: i,
      col: j,
      isStart: i === START_ROW && j === START_COL,
      isEnd: i === END_ROW && j === END_COL,
      isWall: false,
      isVisited: false,
    }))
  );
};

export const generateEmptyGrid = () => {

  return Array.from({length: BOARD_ROWS}, (_, i) =>
    Array.from({length: BOARD_COLS}, (_, j) => ({
      row: i,
      col: j,
      isStart: false,
      isEnd: false,
      isWall: false,
      isVisited: false,
    }))
  );
};