import type { Position } from "@/lib/types";
import { BOARD_ROWS, BOARD_COLS } from "../../lib/utils/constants";
import { useStart } from "@/store/use-start";
import { useEnd } from "@/store/use-end";

const mazeContructionPath: Position[] = [];

export const recursiveDivision = (): Position[] => {

  mazeContructionPath.length = 0;   // fix re rendering
  addBorder();
  const orientation = Math.random() > 0.5;
  divide(1, BOARD_ROWS - 2, 1, BOARD_COLS - 2, orientation);
  return mazeContructionPath;
};

const divide = (
  rowStart: number,
  rowEnd: number,
  colStart: number,
  colEnd: number,
  horizontal: boolean,
) => {
  if (rowEnd <= rowStart || colEnd <= colStart) return;

  if (horizontal) {
    if (rowEnd - rowStart < 2) return; // stop if too small

    const wallRow = randomEven(rowStart, rowEnd - 1);
    if (wallRow < rowStart || wallRow > rowEnd) return;

    const passageCol = randomOdd(colStart, colEnd);

    for (let col = colStart; col <= colEnd; col++) {
      if (col === passageCol) continue;
      if(isStartOrEnd(wallRow, col)) continue;
      mazeContructionPath.push([wallRow, col]);
    }

    const height = wallRow - 2 - rowStart;
    const width = colEnd - colStart;

    divide(rowStart, wallRow - 1, colStart, colEnd, chooseOrientation(height, width));
    divide(wallRow + 1, rowEnd, colStart, colEnd, chooseOrientation(height, width));

  } else {
    if (colEnd - colStart < 2) return;

    const wallCol = randomEven(colStart, colEnd - 1);
    if (wallCol < colStart || wallCol > colEnd) return;

    const passageRow = randomOdd(rowStart, rowEnd);

    for (let row = rowStart; row <= rowEnd; row++) {
      if (row === passageRow) continue;
      if(isStartOrEnd(row, wallCol)) continue;
      mazeContructionPath.push([row,wallCol]);
    }

    const height = rowEnd - rowStart;
    const width = wallCol - 2 - colStart;

    divide(rowStart, rowEnd, colStart, wallCol - 1, chooseOrientation(height, width));
    divide(rowStart, rowEnd, wallCol + 1, colEnd, chooseOrientation(height, width));
  }
};

const addBorder = () => {
  for (let r = 0; r < BOARD_ROWS; r++) {
    if(isStartOrEnd(r, 0)) continue;
    mazeContructionPath.push([r,0])
    if(isStartOrEnd(r, BOARD_COLS - 1)) continue;
    mazeContructionPath.push([r, BOARD_COLS -1]);

  }
  for (let c = 0; c < BOARD_COLS; c++) {
    if(isStartOrEnd(0, c)) continue;
    mazeContructionPath.push([0, c]);
    if(isStartOrEnd(BOARD_ROWS - 1, c)) continue;
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

const isStartOrEnd = (row: number, col: number) => {
  const startPos = useStart.getState().startPos;
  const endPos = useEnd.getState().endPos

  return (
    (row === startPos[0] && col === startPos[1]) ||
    (row === endPos[0] && col === endPos[1])
  );
};
