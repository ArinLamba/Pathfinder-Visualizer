
import { animatePath } from "@/animations/animate-path";
import type { CallProps, GridType, NodeAttributes, Position } from "@/lib/types"
import { BOARD_COLS, BOARD_ROWS, directions, isValid } from "@/lib/utils/constants";
// import { animateDFS } from "@/animations/animateDFS";
import { cloneGrid } from "@/lib/utils/handlers";
import { animateUnweightedAlgo } from "@/animations/animate-unweighted-algo";

export const callDFS= async ({
  grid,
  startPos,
  endPos,
  setGrid,
} : CallProps) => {
  const newGrid = cloneGrid(grid)
  const dfsPath = dfs({ newGrid, startPos, endPos });
  await animateUnweightedAlgo(dfsPath, setGrid);
  await animatePath(dfsPath, setGrid);
};

type Props = {
  newGrid: GridType;
  startPos: Position;
  endPos: Position;
};

const dfs = ({
  newGrid,
  startPos,
  endPos,
} : Props) : NodeAttributes[] => {

  const visited: boolean[][] = Array.from({ length: BOARD_ROWS}, () => Array.from({ length: BOARD_COLS } , () => false));

  const [startRow, startCol] = startPos;
  const [endRow, endCol] = endPos;

  let stopPropogation: boolean = false;
  const dfsPath: NodeAttributes[] = [];

  function dfsTraversal(row: number, col: number) {
    visited[row][col] = true;
    dfsPath.push(newGrid[row][col]);
    if(row === endRow && col === endCol){
      stopPropogation = true;
      return;
    } 

    for(const [dx, dy] of directions) {
      const nrow = row + dx;
      const ncol = col + dy;
      // if we find the target no need to go any further
      if(stopPropogation) break;

      if(!isValid(nrow,ncol)) continue;
      const neighbour = newGrid[nrow][ncol];
      if(visited[nrow][ncol] || neighbour.isWall) continue;

      dfsTraversal(nrow, ncol);
    }
  }
  dfsTraversal(startRow, startCol);
  return dfsPath;
};