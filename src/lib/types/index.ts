

export type NodeAttributes = {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isVisited: boolean;
  isWall: boolean;
  isGrass: boolean;
  isWater: boolean;
  isMountain: boolean;
  weight: number;
  isPath?: boolean;
  parent?: [number, number] | null;
};
export type ModeSelection = "draggingStart" | "draggingEnd" | null;
export type AlgoSelection = "BFS" | "DFS" | "DIJKSTRA" | "A*" | null;
export type ObstacleSelection = "Wall" | "Grass" | "Water" | "Mountain" | null;

export type Position = [number, number];

export type HandleStartProps = {
  startPos: Position;
  grid: NodeAttributes[][];
  row: number;
  col: number;
  setStartPos: (pos: Position) => void;
};

export type HandleEndProps = {
  endPos: Position;
  grid: NodeAttributes[][];
  row: number;
  col: number;
  setEndPos: (pos: Position) => void;
};
