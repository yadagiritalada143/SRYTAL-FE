export interface EmployeeInterface {
  // _id: string;
  id: string;
  employeeId: string;
  dateOfJoining: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  panCardNumber: string;
  aadharNumber: string;
  dateOfBirth: string;
  presentAddress: string;
  permanentAddress: string;
  userRole: string;
  passwordResetRequired: string;
  employeeRole: [{ _id: string; designation: string }];
  bloodGroup: { _id: string; type: string };
  employmentType: { _id: string; employmentType: string };
  bankDetailsInfo: {
    accountNumber: string;
    accountHolderName: string;
    bankName: string;
    ifscCode: string;
  };
}
