import { atom } from 'recoil';
import { Feedback } from '../interfaces/feedback';

export const feedbackAtom = atom<Feedback[]>({
  key: 'feedbackAtom',
  default: []
});
