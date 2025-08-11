import type { NodeAttributes, Position } from "../types"
import { directions, isValid } from "../utils/constants";

type Props = {
  grid: NodeAttributes[][];
  startPos: Position;
  endPos: Position;
};

export const dfs = ({
  grid,
  startPos,
  endPos,
} : Props) : Position[] => {

  if(!startPos || !endPos) return [];
  
  const [startRow, startCol] = startPos;
  const [endRow, endCol] = endPos!;

  let stopPropogation: boolean = false;
  const dfsPath: Position[] = [];

  function dfsTraversal(row: number, col: number) {
    grid[row][col].isVisited = true;
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
      if(neighbour.isVisited || neighbour.isWall) continue;

      dfsTraversal(nrow, ncol);
    }
  }
  dfsTraversal(startRow, startCol);
  return dfsPath;
};

export const animateDFS = (
  dfsPath: Position[],
  setGrid: React.Dispatch<React.SetStateAction<NodeAttributes[][]>>
) => {
  dfsPath.forEach(([row, col], i) => {
    setTimeout(() => {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];           // clone outer array
        const newRow = [...newGrid[row]];        // clone the specific row
        newRow[col] = { ...newRow[col], isVisited: true }; // clone the cell
        newGrid[row] = newRow;                   // replace the row
        return newGrid;
      });
    }, 15 * i);
  });
};