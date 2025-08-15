export type NodeAttributes = {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited: boolean;
  isPath?: boolean;
  parent?: [number, number] | null;
};
export type ModeSelection = "wall" | "draggingStart" | "draggingEnd";
export type AlgoSelection = "BFS" | "DFS" | "DIJAKSTRA" | "A*" | null;

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
