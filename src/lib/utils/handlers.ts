import type { HandleEndProps, HandleStartProps, NodeAttributes } from "@/lib/types"
import { DEFAULT_WEIGHT, FIXED_WEIGHT } from "./constants";

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

export const handleStart = ({grid, row ,col, startPos, setStartPos}: HandleStartProps) => {
  const [prevRow, prevCol] = startPos;
  grid[row][col] = {...grid[row][col], isStart: true, isWall: false, isGrass: false, isMountain: false, isVisited: false, isWater: false}
  grid[prevRow][prevCol].isStart = false;
  setStartPos([row,col]);
};

export const handleEnd = ({grid, row ,col, endPos, setEndPos}: HandleEndProps) => {
  const [prevRow, prevCol] = endPos;
  grid[row][col] = {...grid[row][col], isEnd: true, isWall: false, isGrass: false, isMountain: false, isVisited: false, isWater: false}
  grid[prevRow][prevCol].isEnd = false;
  setEndPos([row,col]);
};