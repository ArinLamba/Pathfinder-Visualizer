import { create } from "zustand";

import type { GridType } from "@/lib/types";
import { generateGrid } from "@/lib/utils/generateGrid";

type UseGridState = {
  grid: GridType;
  setGrid: (updater: GridType | ((prev: GridType) => GridType)) => void;
};

export const useGrid = create<UseGridState>((set) => ({
  grid: generateGrid(),
  setGrid: (updater) => 
    set((state) => 
      typeof updater === "function"
      ? { grid: (updater as (prev: GridType) => GridType)(state.grid) }
      : { grid: updater },
    ),
}));