import type { Position } from "@/lib/types";
import { START_COL, START_ROW } from "@/lib/utils/constants";
import { create } from "zustand";

type UseStartState = {
  startPos: Position;
  setStartPos: (pos: Position) => void;
};

export const useStart = create<UseStartState>((set) => ({
  startPos: [START_ROW, START_COL],
  setStartPos: (startPos) => set({ startPos : startPos }),
}));