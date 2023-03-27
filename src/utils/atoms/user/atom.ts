import { atom } from "recoil";
import { UserData } from "@/api/Authentication/AuthService";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userAtom = atom<UserData>({
  key: "userAtom",
  default: {
    id: 0,
    email: "",
    totalCarbonSaved: 0,
    totalPoints: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
