
import { animatePath } from "@/animations/animate-path";
import { animateUnweightedAlgo } from "@/animations/animate-unweighted-algo";
import type { CallProps, GridType, NodeAttributes, Position } from "@/lib/types";
import { directions, isValid } from "@/lib/utils/constants";
import { clearBidirection, generateEmptyGrid } from "@/lib/utils/generateGrid";
import { cloneGrid } from "@/lib/utils/handlers";



export const callBidirectionalBfs= async ({
  grid,
  startPos,
  endPos,
  setGrid,
  instant = false,
} : CallProps) => {
  const baseGrid = cloneGrid(grid);
  const newGrid = clearBidirection(baseGrid);
  const { visitedNodes, shortestPath}  = bidirectionalBFS({newGrid, startPos, endPos});
  
  if(instant) {
    // instantly mark visited
    for(const {row, col} of visitedNodes) {
      newGrid[row][col].isVisited = true;
    }
    // instantly mark path nodes
    for(const {row, col} of shortestPath) {
      newGrid[row][col].isPath = true;
    }
    setGrid(newGrid);
  } else {
    await animateUnweightedAlgo(visitedNodes, setGrid);
    await animatePath(shortestPath, setGrid);
  }
};


type Props = {
  newGrid: GridType;
  startPos: Position;
  endPos: Position;
};

type Result = {
  visitedNodes: NodeAttributes[]
  shortestPath: NodeAttributes[];
}

const bidirectionalBFS = ({
  newGrid,
  startPos,
  endPos,
}: Props) : Result => {
  const visitedNodes: NodeAttributes[] =[];
  let shortestPath: NodeAttributes[] = [];


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
    //from start
    const [rowFront, colFront] = queueFront[headFront++];
    
    for(const [dx, dy] of directions) {
      const nrowFront = rowFront + dx;
      const ncolFront = colFront + dy;
      
      if(!isValid(nrowFront, ncolFront)) continue;
      const neighbour = newGrid[nrowFront][ncolFront];
      if(neighbour.isWall || visitedFront[nrowFront][ncolFront].isVisited) continue;
      
      queueFront.push([nrowFront, ncolFront]);
      neighbour.parentFront = newGrid[rowFront][colFront];
      visitedFront[nrowFront][ncolFront].isVisited = true;
      visitedNodes.push(newGrid[nrowFront][ncolFront])
      
      if(visitedBack[nrowFront][ncolFront].isVisited) {
        const meetNode = newGrid[nrowFront][ncolFront];
        shortestPath = mergePaths(meetNode);
        return { visitedNodes, shortestPath };
      }
    }
    
    // from end
    const [rowBack, colBack] = queueBack[headBack++];

    for(const [dx, dy] of directions) {
      const nrowBack = rowBack + dx;
      const ncolBack = colBack + dy;

      if(!isValid(nrowBack, ncolBack)) continue;
      const neighbour = newGrid[nrowBack][ncolBack];
      if(neighbour.isWall || visitedBack[nrowBack][ncolBack].isVisited) continue;

      queueBack.push([nrowBack, ncolBack]);
      neighbour.parentBack = newGrid[rowBack][colBack];
      visitedBack[nrowBack][ncolBack].isVisited = true;
      visitedNodes.push(newGrid[nrowBack][ncolBack]);

      if (visitedFront[nrowBack][ncolBack].isVisited) {
        const meetNode = newGrid[nrowBack][ncolBack];
        shortestPath = mergePaths(meetNode);
        return { visitedNodes, shortestPath };
      }
    }

  }
  return { visitedNodes, shortestPath };

};


const mergePaths = (meetNode: NodeAttributes): NodeAttributes[] => {
  const frontPath: NodeAttributes[] = [];
  let front: NodeAttributes | null = meetNode;

  while(front) {
    frontPath.push(front);
    front = front.parentFront ?? null;
  }
  frontPath.reverse();

  let backPath: NodeAttributes[] = [];
  let back: NodeAttributes | null = meetNode;
  while(back) {
    backPath.push(back);
    back = back.parentBack ?? null; 
  }
  return [...frontPath, ...backPath.slice(1)];
};
