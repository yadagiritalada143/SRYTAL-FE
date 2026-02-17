export interface PreviewSalarySlipRequest {
  employeeId: string;
  employeeName: string;
  designation: string;
  department: string;
  dateOfJoining: string;
  payPeriod: string; // e.g., "January 2026"
  bankName: string;
  IFSCCODE: string;
  bankAccountNumber: string;
  transactionType: string;
  transactionId: string;
  panNumber: string;
  uanNumber: string;
  totalWorkingDays: number;
  daysWorked: number;
  lossOfPayDays: number;
  basicSalary: number;
  hraPercentage: number;
  specialAllowance: number;
  otherAllowances: number;
  pfPercentage: number;
  professionalTax: number;
  incomeTax: number;
  otherDeductions: number;
  payDate: string; // "YYYY-MM-DD"
}

export interface SalarySlipCalculations {
  basicSalary: number;
  hra: number;
  specialAllowance: number;
  conveyanceAllowance: number;
  medicalAllowance: number;
  otherAllowances: number;
  grossEarnings: number;
  providentFund: number;
  professionalTax: number;
  incomeTax: number;
  otherDeductions: number;
  totalDeductions: number;
  netPay: number;
  netPayInWords: string;
}

export interface PreviewSalarySlipResponse {
  success: boolean;
  message: string;
  data: {
    fileName: string;
    pdfBase64: string;
    calculations: SalarySlipCalculations;
    transactionId: string;
  };
}
