import { atom } from "recoil";

export const profileImageAtom = atom<string>({
  key: "profileImage",
  default: "",
});
