export interface EmployeeInterface {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  userRole: string;
  employeeRole: [{ _id: string; designation: string }];
  bloodGroup: { _id: string; type: string };
  employmentType: { _id: string; employmentType: string };
  bankDetailsInfo: {
    accountNumber: string;
    accountHolderName: string;
    ifscCode: string;
  };
}
