import type { GridType, Position } from "@/lib/types";

export const animateMaze = (path: Position[], setGrid: (grid: React.SetStateAction<GridType>) => void) => {
  return new Promise<void>(resolve => (
    path.forEach(([row,col], i) => {
      setTimeout(() => {
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          const newRow = newGrid[row];
          newRow[col] = {... newRow[col], isWall: true};
          newGrid[row] = newRow;
          return newGrid;
        })
        if(i === path.length - 1) resolve();
      }, 8 * i);
    })
  ))
};