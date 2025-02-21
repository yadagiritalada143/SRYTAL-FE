export interface EmployeeInterface {
  _id: string;
  employeeId:string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  dateOfBirth:string;
  userRole: string;
  passwordResetRequired: string;
  employeeRole: [{ _id: string; designation: string }];
  bloodGroup: { _id: string; type: string };
  employmentType: { _id: string; employmentType: string };
  bankDetailsInfo: {
    accountNumber: string;
    accountHolderName: string;
    ifscCode: string;
  };
}
