import { atom } from "recoil";
import { PhotoState } from "@/api/Authentication/AuthService";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const photoAtom = atom<PhotoState>({
  key: "photoAtom",
  default: {
    takenPhoto: null,
  },
  effects_UNSTABLE: [persistAtom],
});
