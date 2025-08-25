import type { Position } from "@/lib/types";
import { END_COL, END_ROW } from "@/lib/utils/constants";
import { create } from "zustand";

type UseStartState = {
  endPos: Position;
  setEndPos: (pos: Position) => void;
};

export const useEnd = create<UseStartState>((set) => ({
  endPos: [END_ROW, END_COL],
  setEndPos: (endPos) => set({ endPos : endPos }),
}));