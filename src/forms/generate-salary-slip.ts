import { z } from 'zod';

export const generateSalarySlipSchema = z.object({
  employeeId: z
    .string({ required_error: 'Employee ID is required' })
    .min(1, 'Employee ID is required'),

  selectedMonth: z
    .union([z.date(), z.string()])
    .refine(val => val !== undefined && val !== null, 'Month/Year is required')
    .transform(val => {
      if (val instanceof Date) return val;

      const parsed = new Date(val as string);
      if (isNaN(parsed.getTime())) {
        throw new Error('Invalid month');
      }
      return parsed;
    }),

  daysInMonth: z
    .number({ required_error: 'Days in month is required' })
    .min(1, 'Days in month must be at least 1'),

  lopDays: z
    .number()
    .min(0, 'LOP days must be 0 or more')
    .max(31, 'LOP days cannot exceed 31')
    .optional()
    .default(0),

  basicSalary: z.number().min(0),
  hraPercentage: z.number().optional(),
  specialAllowance: z.number().optional(),
  conveyanceAllowance: z.number().optional(),
  medicalAllowance: z.number().optional(),
  otherAllowances: z.number().optional(),
  additionalAllowances: z
    .array(
      z.object({
        label: z.string().min(1),
        amount: z.number().min(0),
        type: z.enum(['add', 'deduct']).default('add')
      })
    )
    .optional()
    .default([]),

  payDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Pay date must be in YYYY-MM-DD format'
  })
});

export type GenerateSalarySlipForm = z.infer<typeof generateSalarySlipSchema>;
