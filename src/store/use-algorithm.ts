import type { AlgoSelection } from "@/lib/types";
import { create } from "zustand";

type UseAlgorithmState = {
  algo: AlgoSelection;
  setAlgo: (algo: AlgoSelection) => void;
};

export const useAlgorithm = create<UseAlgorithmState>((set) => ({
  algo: null,
  setAlgo: (algo: AlgoSelection) => set({algo: algo}),
}));