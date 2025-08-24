import type { GridType, Position } from "@/lib/types";

export const animateGreedy = (
  visitedNodes: Position[],
  setGrid: React.Dispatch<React.SetStateAction<GridType>>
) => {
  return new Promise<void>((resolve) => {
    visitedNodes.forEach(([row, col], i) => {
      setTimeout(() => {
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          const newRow = [...newGrid[row]];
          // Mark visited
          const cell = { ...newRow[col], isVisited: true };
          newRow[col] = cell;
          newGrid[row] = newRow;
          return newGrid;
        });
        if (i === visitedNodes.length - 1) resolve();
      }, 15 * i);
    });
  });
};
