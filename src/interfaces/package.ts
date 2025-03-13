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
