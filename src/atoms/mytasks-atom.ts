import { atom } from 'recoil';
import { Task } from '../interfaces/mytasks';

export const taskAtom = atom<Task | null>({
  key: 'taskAtom',
  default: null
});
