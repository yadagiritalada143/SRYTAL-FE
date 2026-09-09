export type Employee = {
  id: string;
  employeeId: string;
  firstName: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
  department?: {
    departmentName?: string;
  };
  dateOfJoining?: string;
  uanNumber?: string;
  panCardNumber?: string;
  bankDetailsInfo?: {
    accountNumber?: string;
    bankName?: string;
    ifscCode?: string;
  };
  aadharNumber?: string;
  employeeRole?: { designation?: string }[];
};

export type EmpDetails = {
  _id: string;
  empId: string;
  empName: string;
  designation: string;
  department: string;
  dateOfJoining: string;
  uanNumber: string;
  email: string;
  dob: string;
  bankAccount: string;
  ifsc: string;
  bankName: string;
  pan: string;
  aadharNumber: string;
};
