import { z } from 'zod';

export const addEmployeeSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .regex(/^[A-Za-z ]+$/, {
      message: 'First name must contain only letters and spaces',
    }),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .regex(/^[A-Za-z ]+$/, {
      message: 'Last name must contain only letters and spaces',
    }),
  email: z.string().email({ message: 'Email is required' }),
  mobileNumber: z
    .string()
    .min(10, { message: 'Phone number must be 10 digits' })
    .max(10, { message: 'Phone number must be 10 digits' })
    .regex(/^\d+$/, { message: 'Phone number must contain only digits' }),
  userRole: z.enum(['employee', 'recruiter']),
});
