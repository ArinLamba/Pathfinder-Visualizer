
import { animatePath } from "@/animations/animatePath";
import type { CallProps, GridType, Position } from "@/lib/types"
import { BOARD_COLS, BOARD_ROWS, directions, isValid } from "@/lib/utils/constants";
import { animateDFS } from "@/animations/animateDFS";



export const callDFS= async ({
  grid,
  startPos,
  endPos,
  setGrid,
} : CallProps) => {
  const dfsPath = dfs({ grid, startPos, endPos });
  await animateDFS(dfsPath, setGrid);
  await animatePath(dfsPath, setGrid);
};

type Props = {
  grid: GridType;
  startPos: Position;
  endPos: Position;
};

const dfs = ({
  grid,
  startPos,
  endPos,
} : Props) : Position[] => {

  const visited: boolean[][] = Array.from({ length: BOARD_ROWS}, () => Array.from({ length: BOARD_COLS } , () => false));

  const [startRow, startCol] = startPos;
  const [endRow, endCol] = endPos;

  let stopPropogation: boolean = false;
  const dfsPath: Position[] = [];

  function dfsTraversal(row: number, col: number) {
    visited[row][col]= true;
    dfsPath.push([row,col]);
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
      const neighbour = grid[nrow][ncol];
      if(visited[nrow][ncol] || neighbour.isWall) continue;

      dfsTraversal(nrow, ncol);
    }
  }
  dfsTraversal(startRow, startCol);
  return dfsPath;
};