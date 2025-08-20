import type { NodeAttributes } from "@/lib/types";
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
      isGrass: false,
      isWater: false,
      isMountain: false,
      isVisited: false,
      weight: 1,
    }))
  );
};

export const generateEmptyGrid = () => {

  return Array.from({length: BOARD_ROWS}, () =>
    Array.from({length: BOARD_COLS}, () => ({
      isVisited: false,
    }))
  );
};

export const clearVisitedAndPath = (grid: NodeAttributes[][]) => {
  return (
    grid.map(row => (
      row.map(cell => (
        {...cell, isVisited: false, isPath: false}
      ))
    ))
  );
};
export const clearWallsAndWeight = (grid: NodeAttributes[][]) => {
  return (
    grid.map(row => (
      row.map(cell => (
        {...cell, isWall: false, isGrass: false, isMountain: false, isWater: false, isVisited: false}
      ))
    ))
  );
};