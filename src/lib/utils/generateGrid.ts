import type { GridType } from "@/lib/types";
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
      f: Infinity,
      g: Infinity,
      h: Infinity,
      isVisited: false,
    }))
  );
};

export const clearVisitedAndPath = (grid: GridType) => {
  return (
    grid.map(row => (
      row.map(cell => (
        {...cell, isVisited: false, isPath: false, isWeightedVisited: false, parent: null}
      ))
    ))
  );
};

export const clearWallsAndWeight = (grid: GridType) => {
  return (
    grid.map(row => (
      row.map(cell => (
        {...cell, isWall: false, isGrass: false, isMountain: false, isWater: false, isVisited: false, isPath: false, weight: 1, isWeightedVisited: false}
      ))
    ))
  );
};

export const clearTerrains = (grid: GridType) => {
  return (
    grid.map(row => (
      row.map(cell => (
        {...cell, isGrass: false, isMountain: false, isWater: false, isVisited: false, isPath: false, weight: 1, isWeightedVisited: false}
      ))
    ))
  );
};

export const clearBidirection = (grid: GridType) => {
  return (
    grid.map(row => (
      row.map(cell => (
        {...cell, isGrass: false, isMountain: false, isWater: false, isVisited: false, isPath: false, weight: 1, isWeightedVisited: false, parentFront: null, parentBack: null}
      ))
    ))
  );
};
