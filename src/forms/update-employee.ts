import { z } from 'zod';

export const employeeSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .regex(/^[A-Za-z\s]+$/, {
      message: 'First name must contain only letters and spaces'
    }),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .regex(/^[A-Za-z\s]+$/, {
      message: 'Last name must contain only letters and spaces'
    }),
  email: z.string().email({ message: 'Invalid email address' }),
  mobileNumber: z
    .string()
    .min(10, { message: 'Phone number must be 10 digits' })
    .max(10, { message: 'Phone number must be 10 digits' })
    .regex(/^\d+$/, { message: 'Phone number must contain only digits' })
    .or(z.number()),
  panCardNumber: z
    .string()
    .length(10, { message: 'PAN must be exactly 10 characters' })
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
      message: 'Invalid PAN format'
    }),
  aadharCardNumber: z
    .string()
    .length(12, { message: 'Aadhaar must be exactly 12 digits' })
    .regex(/^\d+$/, { message: 'Aadhaar must contain only digits' }),
  bloodGroup: z.string().optional(),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'DOB must be in YYYY-MM-DD format'
    })
    .optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  employmentType: z.string().min(1, 'Employment type is required'),
  employeeRole: z
    .array(z.string())
    .min(1, 'At least one employee role is required'),
  bankDetailsInfo: z
    .object({
      accountNumber: z.union([
        z
          .string()
          .min(10, 'Account Number must be at least 10 digits')
          .optional(),
        z.literal('').optional()
      ]),
      accountHolderName: z.union([
        z.string().min(1, 'Account Holder Name is required').optional(),
        z.literal('').optional()
      ]),
      ifscCode: z.union([
        z.string().min(1, 'IFSC Code is required').optional(),
        z.literal('').optional()
      ])
    })
    .optional()
});

export const employeePackageSchema = z.object({
  packagesInfo: z.array(z.string())
});

export type EmployeePackageForm = z.infer<typeof employeePackageSchema>;
export type EmployeeUpdateForm = z.infer<typeof employeeSchema>;
