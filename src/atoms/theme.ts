import { atom } from 'recoil';

export const themeAtom = atom<boolean>({
  key: 'theme',
  default: false
});
