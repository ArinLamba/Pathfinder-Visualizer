import type { GridType } from "@/lib/types";
import { BOARD_ROWS, BOARD_COLS } from "../../lib/utils/constants";
import { cloneGrid } from "@/lib/utils/handlers";

export const recursiveDivision = (grid: GridType): GridType => {
  const newGrid = cloneGrid(grid);
  addBorder(newGrid);
  divide(newGrid, 1, BOARD_ROWS - 2, 1, BOARD_COLS - 2, chooseOrientation(BOARD_ROWS - 2, BOARD_COLS - 2));
  return newGrid;
};

const divide = (
  grid: GridType,
  rowStart: number,
  rowEnd: number,
  colStart: number,
  colEnd: number,
  horizontal: boolean
) => {
  if (rowEnd <= rowStart || colEnd <= colStart) return;

  if (horizontal) {
    if (rowEnd - rowStart < 2) return; // stop if too small

    const wallRow = randomEven(rowStart, rowEnd);
    if (wallRow < rowStart || wallRow > rowEnd) return;

    const passageCol = randomOdd(colStart, colEnd);

    for (let col = colStart; col <= colEnd; col++) {
      if (col === passageCol) continue;
      grid[wallRow][col].isWall = true;
    }

    divide(grid, rowStart, wallRow - 1, colStart, colEnd, false);
    divide(grid, wallRow + 1, rowEnd, colStart, colEnd, false);

  } else {
    if (colEnd - colStart < 2) return;

    const wallCol = randomEven(colStart, colEnd);
    if (wallCol < colStart || wallCol > colEnd) return;

    const passageRow = randomOdd(rowStart, rowEnd);

    for (let row = rowStart; row <= rowEnd; row++) {
      if (row === passageRow) continue;
      grid[row][wallCol].isWall = true;
    }

    divide(grid, rowStart, rowEnd, colStart, wallCol - 1, true);
    divide(grid, rowStart, rowEnd, wallCol + 1, colEnd, true);
  }
};

const addBorder = (grid: GridType) => {
  for (let r = 0; r < BOARD_ROWS; r++) {
    grid[r][0].isWall = true;
    grid[r][BOARD_COLS - 1].isWall = true;
  }
  for (let c = 0; c < BOARD_COLS; c++) {
    grid[0][c].isWall = true;
    grid[BOARD_ROWS - 1][c].isWall = true;
  }
};

const chooseOrientation = (height: number, width: number): boolean => height >= width;

const randomEven = (min: number, max: number): number => {
  const evens = [];
  for (let i = min; i <= max; i++) if (i % 2 === 0) evens.push(i);
  return evens[Math.floor(Math.random() * evens.length)];
};

const randomOdd = (min: number, max: number): number => {
  const odds = [];
  for (let i = min; i <= max; i++) if (i % 2 === 1) odds.push(i);
  return odds[Math.floor(Math.random() * odds.length)];
};
