import { create } from "zustand";

type UseAfterAlgoState = {
  afterAlgoTrigger: number,
  increment: () => void;
}

export const useAfterAlgo = create<UseAfterAlgoState>((set) => ({
  afterAlgoTrigger: 0,
  increment: () => set((state) => ({ afterAlgoTrigger : state.afterAlgoTrigger + 1 })),
}));