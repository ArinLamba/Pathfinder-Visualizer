import { BOARD_COLS, BOARD_ROWS } from "./constants";

export const generateGrid = () => {

  const startPos = [11,14];
  const endPos = [11,41];

  return Array.from({length: BOARD_ROWS}, (_, i) =>
    Array.from({length: BOARD_COLS}, (_, j) => ({
      row: i,
      col: j,
      isStart: i === startPos[0] && j === startPos[1],
      isEnd: i === endPos[0] && j === endPos[1],
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