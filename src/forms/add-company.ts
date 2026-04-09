import { z } from 'zod';

export const addCompanySchema = z.object({
  companyName: z
    .string({ required_error: 'Company name is required' })
    .min(1, { message: 'Please enter company name' }),
  primaryContact: z.object({
    name: z.string().optional(),
    email: z
      .string()
      .email({ message: 'Please enter a valid email' })
      .optional()
      .or(z.literal('')),
    phone: z
      .string()
      .min(10, { message: 'Phone number must be 10 digits' })
      .max(10, { message: 'Phone number must be 10 digits' })
      .regex(/^\d+$/, { message: 'Phone number must contain only digits' })
      .optional()
      .or(z.literal(''))
  }),
  secondaryContact_1: z.object({
    name: z.string().optional(),
    email: z
      .string()
      .email({ message: 'Please enter a valid email' })
      .optional()
      .or(z.literal('')),

    phone: z
      .string()
      .min(10, { message: 'Phone number must be 10 digits' })
      .max(10, { message: 'Phone number must be 10 digits' })
      .regex(/^\d+$/, { message: 'Phone number must contain only digits' })
      .optional()
      .or(z.literal(''))
  }),
  secondaryContact_2: z.object({
    name: z.string().optional(),
    email: z
      .string()
      .email({ message: 'Please enter a valid email' })
      .optional()
      .or(z.literal('')),
    phone: z
      .string()
      .min(10, { message: 'Phone number must be 10 digits' })
      .max(10, { message: 'Phone number must be 10 digits' })
      .regex(/^\d+$/, { message: 'Phone number must contain only digits' })
      .optional()
      .or(z.literal(''))
  }),
  status: z.string().optional().or(z.literal('Created'))
});

export type AddCompanyForm = z.infer<typeof addCompanySchema>;
