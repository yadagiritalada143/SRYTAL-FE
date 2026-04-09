import {
  o as n,
  b as a,
  s as e,
  l as s,
  a as t,
  n as o
} from './zod-DC47Kjo4.js';
const m = n({
    employeeId: e().min(1, 'Employee ID is required'),
    dateOfJoining: e().optional(),
    firstName: e()
      .min(1, { message: 'First name is required' })
      .regex(/^[A-Za-z\s]+$/, {
        message: 'First name must contain only letters and spaces'
      }),
    lastName: e()
      .min(1, { message: 'Last name is required' })
      .regex(/^[A-Za-z\s]+$/, {
        message: 'Last name must contain only letters and spaces'
      }),
    email: e().email({ message: 'Invalid email address' }),
    mobileNumber: e()
      .min(10, { message: 'Phone number must be 10 digits' })
      .max(10, { message: 'Phone number must be 10 digits' })
      .regex(/^\d+$/, { message: 'Phone number must contain only digits' })
      .or(o()),
    panCardNumber: e()
      .length(10, { message: 'PAN must be exactly 10 characters' })
      .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: 'Invalid PAN format' }),
    aadharNumber: e()
      .length(12, { message: 'Aadhaar must be exactly 12 digits' })
      .regex(/^\d+$/, { message: 'Aadhaar must contain only digits' }),
    bloodGroup: e().optional().nullable(),
    dateOfBirth: e().optional(),
    presentAddress: e().optional(),
    permanentAddress: e().optional(),
    employmentType: e().min(1, 'Employment type is required'),
    employeeRole: t(e()).min(1, 'At least one employee role is required'),
    department: e().optional().nullable(),
    uanNumber: e()
      .trim()
      .regex(/^$|^\d{12}$/, { message: 'UAN number must be exactly 12 digits' })
      .optional(),
    bankDetailsInfo: n({
      accountNumber: a([
        e().min(10, 'Account Number must be at least 10 digits').optional(),
        s('').optional()
      ]),
      accountHolderName: a([
        e().min(1, 'Account Holder Name is required').optional(),
        s('').optional()
      ]),
      bankName: e().trim().optional(),
      ifscCode: a([
        e().min(1, 'IFSC Code is required').optional(),
        s('').optional()
      ])
    }).optional()
  }),
  r = n({ packagesInfo: t(e()) });
export { r as a, m as e };
