import { atom } from 'recoil';
import { EmployeeUpdateForm } from '../forms/update-employee';
import { PackagesList } from '../interfaces/package';

export const employeeDetailsAtom = atom<EmployeeUpdateForm | null>({
  key: 'employeeDetailsAtom',
  default: null
});

export const bloodGroupOptionsAtom = atom({
  key: 'bloodGroupOptionsAtom',
  default: []
});

export const employmentTypesAtom = atom({
  key: 'employmentTypesAtom',
  default: []
});

export const employeeRolesAtom = atom({
  key: 'employeeRolesAtom',
  default: []
});

export const employeePackagesAtom = atom<PackagesList | null>({
  key: 'employeePackagesAtom',
  default: null
});
