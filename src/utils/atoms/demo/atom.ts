import { atom } from "recoil";

interface DemoState {
  pointer: number;
  ids: number[][];
}

export const demoAtom = atom<DemoState>({
  key: "demoAtom",
  default: {
    pointer: 0,
    ids: [[2, 3], [2], [3], [4, 5], [4], [5], [6, 7], [6], [7]],
  },
});
