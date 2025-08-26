import type { NodeAttributes, Position, GridType } from "@/lib/types";

export const getPath = (endPos: Position, grid: GridType) : Position[] =>  {
  
  const [endR, endC] = endPos;
  const path: Position[] = [];
  let current: NodeAttributes = grid[endR][endC];

  while(current) {
    path.push([current.row, current.col]);
    if(!current.parent) break; // start node

    const [pr, pc] = current.parent;
    current = grid[pr][pc];
  }
  return path.reverse();
};