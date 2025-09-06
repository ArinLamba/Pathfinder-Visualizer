import { create } from "zustand";

type UseAfterAlgoState = {
  hasVisualizationRun: boolean,
  setHasVisualizationRun: (state: boolean) => void;
}

export const useAfterAlgo = create<UseAfterAlgoState>((set) => ({
  hasVisualizationRun: false,
  setHasVisualizationRun: (state: boolean) => set({ hasVisualizationRun: state }),
}));