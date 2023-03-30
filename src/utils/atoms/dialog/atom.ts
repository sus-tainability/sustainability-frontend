import { atom } from "recoil";

interface DialogState {
  isShown: boolean;
  title: string;
  message: string;
  footer: string[];
}

export const dialogAtom = atom<DialogState>({
  key: "dialogAtom",
  default: {
    isShown: true,
    title: "",
    message: "",
    footer: [],
  },
});
