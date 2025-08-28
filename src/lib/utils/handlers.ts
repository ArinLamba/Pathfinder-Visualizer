import type { AlgoSelection, CallProps, GridType, HandleStartProps, NodeAttributes } from "@/lib/types"
import { DEFAULT_WEIGHT, FIXED_WEIGHT } from "./constants";

import { callAstar } from "@/algorithms/astar";
import { callBfs } from "@/algorithms/bfs";
import { callBidirectionalBfs } from "@/algorithms/bidirectional";
import { callDFS } from "@/algorithms/dfs";
import { callDijkstra } from "@/algorithms/dijkstra";
import { callGreedyBFS } from "@/algorithms/greedy-best-first-search";
import { useStart } from "@/store/use-start";
import { useEnd } from "@/store/use-end";

type HandleAlgoProps = CallProps & {
  algo: AlgoSelection;
};

type ObstacleProps = Pick<HandleStartProps, "row" | "col"> & {
  setGrid: React.Dispatch<React.SetStateAction<NodeAttributes[][]>>;
};

export const cloneGrid = (grid: NodeAttributes[][]) => {
  return grid.map(row => row.map(node => ({...node})));
};


export const addWalls = ({
  row,
  col,
  setGrid
}: ObstacleProps) => {
  setGrid((prevGrid) => {
    const newGrid = [...prevGrid];
    const newRow = [...newGrid[row]];
    const node = newRow[col];

    if(node.isGrass || node.isMountain || node.isWater || node.weight === FIXED_WEIGHT) {
      newRow[col] = {
        ...node,
        isGrass: false,
        isWater: false,
        isMountain: false,
        weight: DEFAULT_WEIGHT,
        isWall: true,
      };
    }
    else {
      newRow[col] = { ...newRow[col], isWall: !node.isWall};
    }
    newGrid[row] = newRow;
    return newGrid;
  })
};

export const addGrass = ({
  row,
  col,
  setGrid
}: ObstacleProps) => {
  setGrid((prevGrid) => {
    const newGrid = [...prevGrid];
    const newRow = [...newGrid[row]];
    const node = newRow[col];
    
    newRow[col] = node.isGrass 
      ? {...node, isGrass: false, weight: DEFAULT_WEIGHT}
      : {...node, isGrass: true, isMountain: false, isWall: false, isWater: false, weight: 3};
    
    newGrid[row] = newRow;
    return newGrid;
  })
};

export const addWater = ({
  row,
  col,
  setGrid
}: ObstacleProps) => {
  setGrid((prevGrid) => {
    const newGrid = [...prevGrid];
    const newRow = [...newGrid[row]];
    const node = newRow[col];
    
    newRow[col] = node.isWater 
      ? {...node, isWater: false, weight: DEFAULT_WEIGHT}
      : {...node, isWater: true, isMountain: false, isWall: false, isGrass: false, weight: 5};
    
    newGrid[row] = newRow;
    return newGrid;
  })
};

export const addMountain = ({
  row,
  col,
  setGrid
}: ObstacleProps) => {
  setGrid((prevGrid) => {
    const newGrid = [...prevGrid];
    const newRow = [...newGrid[row]];
    const node = newRow[col];
    
    newRow[col] = node.isMountain ? 
      {...node, isMountain: false, weight: DEFAULT_WEIGHT} : 
      {...node, isMountain: true, isWater: false, isWall: false, isGrass: false, weight: 8};
    
    newGrid[row] = newRow;
    return newGrid;
  })
};

export const addFixedWeights = ({
  row,
  col,
  setGrid
}: ObstacleProps) => {
  setGrid((prevGrid) => {
    const newGrid = [...prevGrid];
    const newRow = [...newGrid[row]];
    const node = newRow[col];
    
    newRow[col] = node.weight === FIXED_WEIGHT 
      ? {...node, weight: DEFAULT_WEIGHT} 
      : {...node, isWater: false, isMountain: false, isWall: false, isGrass: false, weight: FIXED_WEIGHT};

    newGrid[row] = newRow;
    return newGrid;
  })
};


// memory for last start and end
const prevStates: Record<"start" | "end", NodeAttributes | null> = {
  start: null,
  end: null,
};

export const setCell = (
  row: number,
  col: number,
  type: "start" | "end",
  setGrid: React.Dispatch<React.SetStateAction<GridType>>
) => {

  setGrid((prevGrid) => {
    const newGrid = [...prevGrid];

    // restore previous cell if exists
    const prevNode = prevStates[type];
    if(prevNode) {
      const prevRowCopy = [...newGrid[prevNode.row]];
      prevRowCopy[prevNode.col] = {...prevNode,isPath : prevRowCopy[prevNode.col].isPath ? true : false, };
      newGrid[prevNode.row] = prevRowCopy
    }

    // save the current cell before overwriting
    const newRow = [...newGrid[row]];
    prevStates[type] = { ...newRow[col] };

    // overwrite new cell as start or end
    newRow[col] = {
      ...newRow[col],
      isStart: type === "start",
      isEnd: type === "end",
      isWall: false,
      isWater: false,
      isGrass: false,
      isMountain: false,
      weight: 1,
    };
    newGrid[row] = newRow;

    // update zustand store
    if (type === "start") {
      useStart.getState().setStartPos([row, col]);
    } else {
      useEnd.getState().setEndPos([row, col]);
    }

    return newGrid;
  });
};



export const handleAlgo = async ({
  grid,
  startPos,
  endPos,
  setGrid,
  algo,
}: HandleAlgoProps) => {
  switch (algo) {
    case "BFS":
      await callBfs({ grid, startPos, endPos, setGrid });
      break;
    case "DFS":
      await callDFS({ grid, startPos, endPos, setGrid });
      break;
    case "DIJKSTRA":
      await callDijkstra({ grid, startPos, endPos, setGrid });
      break;
    case "A*":
      await callAstar({ grid, startPos, endPos, setGrid });
      break;
    case "Bidirectional BFS":
      await callBidirectionalBfs({ grid, startPos, endPos, setGrid });
      break;
    case "Greedy Best-First-Search":
      await callGreedyBFS({ grid, startPos, endPos, setGrid });
      break;
  };
};