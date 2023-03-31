import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface PhotoData {
  path: string | undefined;
  preview: string;
}

export interface PhotoState {
  takenPhoto: PhotoData | null;
  eventId: number;
}

export const photoAtom = atom<PhotoState>({
  key: "photoAtom",
  default: {
    eventId: 3,
    takenPhoto: null,
  },
  effects_UNSTABLE: [persistAtom],
});
