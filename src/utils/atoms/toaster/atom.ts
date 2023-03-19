import { atom } from "recoil";

export const enum ToasterType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
}

interface ToasterState {
  isShown: boolean;
  title: string;
  message: string;
  type: ToasterType;
}

export const toasterAtom = atom<ToasterState>({
  key: "toasterAtom",
  default: {
    isShown: false,
    title: "",
    message: "",
    type: ToasterType.SUCCESS,
  },
});
