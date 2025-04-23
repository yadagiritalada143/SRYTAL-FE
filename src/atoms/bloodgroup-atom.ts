import { atom } from "recoil";
import { BloodGroup } from "../interfaces/bloodgroup";

export const bloodGroupAtom=atom<BloodGroup []>({
    key:"bloodGroupAtom",
    default:[],
})