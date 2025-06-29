export interface PackageInterface {
  _id: string;
  packageId: string;
  title: string;
  description: string;
  tasks: string[];
  startDate: Date;
  endDate: Date;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface Approver {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
}

export interface PackageItem {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isDeleted: boolean;
  approvers: Approver[];
  tasks: Task[];
  __v: number;
}

export type PackagesList = PackageItem[];
