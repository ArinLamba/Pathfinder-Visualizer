import type { GridType, Position } from "@/lib/types";

export const animateBFS = (
  visitedNodes: Position[],
  setGrid: React.Dispatch<React.SetStateAction<GridType>>
) => {
  return new Promise<void>(reslove => {
    visitedNodes.forEach(([row, col], i) => {
      setTimeout(() => {
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];           // clone outer array
          const newRow = [...newGrid[row]];        // clone the specific row
          newRow[col] = { ...newRow[col], isVisited: true }; // clone the cell
          newGrid[row] = newRow;                   // replace the row
          return newGrid;
        });

        if(i === visitedNodes.length - 1) reslove();
      }, 12 * i);
    })
  });
};