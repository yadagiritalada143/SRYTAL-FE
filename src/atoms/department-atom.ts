import { atom } from 'recoil';
import { Department } from '@interfaces/department';

export const departmentAtom = atom<Department[]>({
  key: 'departmentAtom',
  default: []
});
