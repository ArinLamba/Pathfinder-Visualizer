export type NodeAttributes = {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited: boolean;
};
export type SelectionMode = "start" | "end" | "wall" | "visualize" | null;

type Position = [number, number];
export type handleStartEndProps = {
  mode: SelectionMode;
  startPos: Position | null;
  endPos: Position | null;
  updateGrid: NodeAttributes[][];
  row: number;
  col: number;
  setStartPos: (pos: Position | null) => void;
  setEndPos: (pos: Position | null) => void;
};

