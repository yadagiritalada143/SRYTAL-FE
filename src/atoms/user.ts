import { atom } from 'recoil';
import { UserDetails } from '../interfaces/user';

export const userDetailsAtom = atom<UserDetails>({
  key: 'userDetails',
  default: {
    firstName: '',
    lastName: '',
    userRole: '',
    passwordResetRequired: 'false'
  }
});
