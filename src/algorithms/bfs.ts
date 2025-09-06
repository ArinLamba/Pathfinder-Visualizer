import type { CallProps, GridType, NodeAttributes, Position } from "@/lib/types"

import { animatePath } from "@/animations/animate-path";
import { animateUnweightedAlgo } from "@/animations/animate-unweighted-algo";

import { directions, isValid } from "@/lib/utils/constants";
import { generateEmptyGrid } from "@/lib/utils/generateGrid";
import { getPath } from "@/lib/utils/getPath";
import { cloneGrid } from "@/lib/utils/handlers";
// import { bfsAfter } from "./bfsAfter";



export const callBfs= async ({
  grid,
  startPos,
  endPos,
  setGrid,
} : CallProps) => {
  const newGrid = cloneGrid(grid);
  const visitedNodes  = bfs({newGrid, startPos, endPos});
  const endNode = newGrid[endPos[0]][endPos[1]];
  const shortestPath = getPath(endNode);
  await animateUnweightedAlgo(visitedNodes, setGrid);
  await animatePath(shortestPath, setGrid);
  
  // bfsAfter({ grid, startPos, endPos, setGrid});
};


type Props = {
  newGrid: GridType;
  startPos: Position;
  endPos: Position;
};


const bfs = ({
  newGrid,
  startPos,
  endPos,
}: Props) : NodeAttributes[] => {

  // to keep track of the vistied nodes on separete grid
  const visitedGrid = generateEmptyGrid();
  // to animate the bfs path
  const visitedNodes: NodeAttributes[] = [];

  const [startRow,startCol] = startPos;
  const [endRow, endCol] = endPos;
  
  const queue: Position[] = [];
  queue.push([startRow, startCol]);
  visitedGrid[startRow][startCol].isVisited = true;
  const cell = newGrid[startRow][startCol];
  cell.parent = null;
  // 
  visitedNodes.push(cell);

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
      neighbour.parent = newGrid[row][col];
      visitedGrid[nrow][ncol].isVisited = true;
      // to track the visited nodes in order to animate them
      visitedNodes.push(neighbour);
    }
  }
  return  visitedNodes;
};
