import type { NodeAttributes, Position } from "../lib/types";

export const animatePath = (path: Position[], setGrid: React.Dispatch<React.SetStateAction<NodeAttributes[][]>>) => {

  return new Promise<void>(resolve => {
    path.forEach(([row,col], i) => {
      setTimeout(() => {
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];           // clone outer array
          const newRow = [...newGrid[row]];        // clone the specific row
          newRow[col] = { ...newRow[col], isPath: true }; // clone the cell
          newGrid[row] = newRow;                   // replace the row
          return newGrid;
        });

        if(i === path.length - 1) resolve();
      },30 * i );
    })
  })
};