
import type { GridType, Position } from "@/lib/types"
import { directions, isValid } from "@/lib/utils/constants";
import { generateEmptyGrid } from "@/lib/utils/generateGrid";

type Props = {
  newGrid: GridType;
  startPos: Position;
  endPos: Position;
};

export const bfs = ({
  newGrid,
  startPos,
  endPos,
}: Props) : Position[] => {

  // to keep track of the vistied nodes on separete grid
  const visitedGrid = generateEmptyGrid();
  // to animate the bfs path
  const visitedNodes: Position[] = [];

  const [startRow,startCol] = startPos;
  const [endRow, endCol] = endPos;
  
  const queue: Position[] = [];
  queue.push([startRow, startCol]);
  visitedGrid[startRow][startCol].isVisited = true;
  const cell = newGrid[startRow][startCol];
  cell.parent = null;
  // 
  visitedNodes.push([startRow, startCol]);

  let head = 0;
  while(head < queue.length) {
    const [row, col] = queue[head++]

    if(row === endRow && col === endCol) {
      // return bfs path
      return visitedNodes;
    }

    // into four directions 
    for(const [dx, dy] of directions) {
      const nrow = row + dx;
      const ncol = col + dy;
      if(!isValid(nrow, ncol)) continue;
      const neighbour = newGrid[nrow][ncol];

      if(visitedGrid[nrow][ncol].isVisited || neighbour.isWall) continue;
      queue.push([nrow,ncol]);
      neighbour.parent = [row,col];
      visitedGrid[nrow][ncol].isVisited = true;
      // to track the visited nodes in order to animate them
      visitedNodes.push([nrow, ncol]);
    }
  }
  return  visitedNodes;
};
