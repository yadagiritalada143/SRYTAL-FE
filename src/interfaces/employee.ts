export interface EmployeeInterface {
  id: string;
  employeeId: string;
  dateOfJoining: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  panCardNumber: string;
  aadharNumber: string;
  uanNumber?: string;
  dateOfBirth: string;
  presentAddress: string;
  permanentAddress: string;
  userRole: string;
  passwordResetRequired: string;
  employeeRole: [{ _id: string; designation: string }];
  department: { _id: string; departmentName: string };
  bloodGroup: { _id: string; type: string };
  employmentType: { _id: string; employmentType: string };
  bankDetailsInfo: {
    accountNumber: string;
    accountHolderName: string;
    bankName: string;
    ifscCode: string;
  };
}
