import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface DemoState {
  history: string[];
}

export const demoAtom = atom<DemoState>({
  key: "demoAtom",
  default: {
    history: [],
  },
  effects_UNSTABLE: [persistAtom],
});
