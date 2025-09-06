import type { NodeAttributes } from "@/lib/types";

export const animateWeightedAlgo = (
  visitedNodes: NodeAttributes[],
  setGrid: React.Dispatch<React.SetStateAction<NodeAttributes[][]>>
) => {
  return new Promise<void>((resolve) => {
    visitedNodes.forEach(({row, col}, i) => {
      
      setTimeout(() => {
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          const newRow = [...newGrid[row]];
          // Mark visited
          const node = newRow[col];
          newRow[col] = { ...node, isVisited: true, isWeightedVisited: node.weight > 1 };
          // newRow[col] = node;
          newGrid[row] = newRow;
          return newGrid;
        });
        if (i === visitedNodes.length - 1) resolve();
      }, 10 * i);
    });
  });
};
