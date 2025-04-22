import { atom } from "recoil";
import { EmployeeType } from "../interfaces/employeetype";

export const employeeTypeAtom=atom<EmployeeType []>({
     key:"employeeTypeAtom",
     default:[],
})