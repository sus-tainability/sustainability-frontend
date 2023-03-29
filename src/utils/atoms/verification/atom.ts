import { atom } from "recoil";
import { VerificationData } from "@/api/Authentication/AuthService";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const verificationAtom = atom<VerificationData>({
  key: "verificationAtom",
  default: {
    imageId: -1,
    imageUrl: "",
    itemName: ""
  },
  effects_UNSTABLE: [persistAtom],
});
