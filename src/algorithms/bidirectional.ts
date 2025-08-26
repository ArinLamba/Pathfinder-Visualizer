import { animateBFS } from "@/animations/animateBFS";
import { animatePath } from "@/animations/animatePath";
import type { CallProps, GridType, Position } from "@/lib/types";
import { BOARD_COLS, BOARD_ROWS, directions, isValid } from "@/lib/utils/constants";
import { generateEmptyGrid } from "@/lib/utils/generateGrid";
import { cloneGrid } from "@/lib/utils/handlers";



export const callBidirectionalBfs= async ({
  grid,
  startPos,
  endPos,
  setGrid,
} : CallProps) => {
  const newGrid = cloneGrid(grid);
  const { visitedNodes, shortestPath}  = bidirectionalBFS({newGrid, startPos, endPos});
  await animateBFS(visitedNodes, setGrid);
  await animatePath(shortestPath, setGrid);
};


type Props = {
  newGrid: GridType;
  startPos: Position;
  endPos: Position;
};

type Result = {
  visitedNodes: Position[]
  shortestPath: Position[];
}

export const bidirectionalBFS = ({
  newGrid,
  startPos,
  endPos,
}: Props) : Result => {
  const visitedNodes: Position[] =[];
  let shortestPath: Position[] = [];

  const parentFront: (Position | null)[][] = Array.from({length: BOARD_ROWS}, () => Array(BOARD_COLS).fill(null));
  const parentBack: (Position | null)[][] = Array.from({length: BOARD_ROWS}, () => Array(BOARD_COLS).fill(null));


  const [startRow, startCol] = startPos;
  const [endRow, endCol] = endPos;

  const visitedFront = generateEmptyGrid();
  const visitedBack = generateEmptyGrid();

  const queueFront: Position[] = [];
  queueFront.push([startRow, startCol]);
  visitedFront[startRow][startCol].isVisited = true;
  
  const queueBack: Position[] = [];
  queueBack.push([endRow,endCol]);
  visitedBack[endRow][endCol].isVisited = true;

  let headFront = 0;
  let headBack = 0;

  while(queueFront.length > headFront && queueBack.length > headBack) {
    const [rowFront, colFront] = queueFront[headFront++];
    const [rowBack, colBack] = queueBack[headBack++];


    for(const [dx, dy] of directions) {
      const nrowFront = rowFront + dx;
      const ncolFront = colFront + dy;

      if(!isValid(nrowFront, ncolFront)) continue;
      const neighbour = newGrid[nrowFront][ncolFront];
      if(neighbour.isWall || visitedFront[nrowFront][ncolFront].isVisited) continue;

      queueFront.push([nrowFront, ncolFront]);
      parentFront[nrowFront][ncolFront] = [rowFront, colFront];
      visitedFront[nrowFront][ncolFront].isVisited = true;
      visitedNodes.push([nrowFront,ncolFront])

      if(visitedBack[rowFront][colFront].isVisited) {
        shortestPath = mergePaths([nrowFront,ncolFront], parentFront, parentBack);
        return { visitedNodes, shortestPath };
      }
    }

    for(const [dx, dy] of directions) {
      const nrowBack = rowBack + dx;
      const ncolBack = colBack + dy;

      if(!isValid(nrowBack, ncolBack)) continue;
      const neighbour = newGrid[nrowBack][ncolBack];
      if(neighbour.isWall || visitedBack[nrowBack][ncolBack].isVisited) continue;

      queueBack.push([nrowBack, ncolBack]);
      parentBack[nrowBack][ncolBack] = [rowBack,colBack];
      visitedBack[nrowBack][ncolBack].isVisited = true;
      visitedNodes.push([nrowBack,ncolBack]);

      if (visitedFront[nrowBack][ncolBack].isVisited) {
        shortestPath = mergePaths([nrowBack, ncolBack], parentFront, parentBack);
        return { visitedNodes, shortestPath };
      }
    }

  }
  return { visitedNodes, shortestPath };

};

// ---- Helper Functions ----
const constructPath = (
  row: number,
  col: number,
  parent: (Position | null)[][]
): Position[] => {
  const path: Position[] = [];
  let current: Position | null = [row, col];

  while (current) {
    path.push(current);
    const [r, c]: Position = current;
    current = parent[r][c];
  }

  return path.reverse();
};

const mergePaths = (
  meet: Position,
  parentFront: (Position | null)[][],
  parentBack: (Position | null)[][]
): Position[] => {
  const frontPath = constructPath(meet[0], meet[1], parentFront);
  const backPath = constructPath(meet[0], meet[1], parentBack);
  backPath.shift(); // remove duplicate meeting node
  return frontPath.concat(backPath.reverse());
};