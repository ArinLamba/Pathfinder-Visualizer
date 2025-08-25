import type { Position } from "@/lib/types";
import { BOARD_ROWS, BOARD_COLS } from "../../lib/utils/constants";

const mazeContructionPath: Position[] = [];

export const recursiveDivision = (): Position[] => {
  mazeContructionPath.length = 0;   // fix re rendering
  addBorder();
  divide(1, BOARD_ROWS - 2, 1, BOARD_COLS - 2, chooseOrientation(BOARD_ROWS - 2, BOARD_COLS - 2));
  return mazeContructionPath;
};

const divide = (
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
      mazeContructionPath.push([wallRow, col]);
    }

    divide(rowStart, wallRow - 1, colStart, colEnd, false);
    divide(wallRow + 1, rowEnd, colStart, colEnd, false);

  } else {
    if (colEnd - colStart < 2) return;

    const wallCol = randomEven(colStart, colEnd);
    if (wallCol < colStart || wallCol > colEnd) return;

    const passageRow = randomOdd(rowStart, rowEnd);

    for (let row = rowStart; row <= rowEnd; row++) {
      if (row === passageRow) continue;
      mazeContructionPath.push([row,wallCol]);
    }

    divide(rowStart, rowEnd, colStart, wallCol - 1, true);
    divide(rowStart, rowEnd, wallCol + 1, colEnd, true);
  }
};

const addBorder = () => {
  for (let r = 0; r < BOARD_ROWS; r++) {
    mazeContructionPath.push([r,0])
    mazeContructionPath.push([r, BOARD_COLS -1])

  }
  for (let c = 0; c < BOARD_COLS; c++) {
    mazeContructionPath.push([0, c]);
    mazeContructionPath.push([BOARD_ROWS - 1, c]);
  }

  return mazeContructionPath;
};

const chooseOrientation = (height: number, width: number): boolean => {
  // If one dimension is much larger, bias towards cutting that dimension.
  if (height < width) return false;  // vertical
  if (width < height) return true;   // horizontal
  // If equal, pick randomly
  return Math.random() < 0.5;
};


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
