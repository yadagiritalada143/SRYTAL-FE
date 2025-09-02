import { atom } from 'recoil';
import { Mentee } from '../interfaces/mentee';

export const menteesAtom = atom<Mentee[]>({
  key: 'menteesAtom',
  default: []
});
