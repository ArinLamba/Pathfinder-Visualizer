import type { GridType, Position } from "@/lib/types";

export const animateDFS = (
  dfsPath: Position[],
  setGrid: React.Dispatch<React.SetStateAction<GridType>>
) => {
  return new Promise<void>(resolve => {

    dfsPath.forEach(([row, col], i) => {
      setTimeout(() => {
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];           // clone outer array
          const newRow = [...newGrid[row]];        // clone the specific row
          newRow[col] = { ...newRow[col], isVisited: true }; // clone the cell
          newGrid[row] = newRow;                   // replace the row
          return newGrid;
        });

        if(i === dfsPath.length - 1) resolve();
      }, 20 * i);
    });
  })
};