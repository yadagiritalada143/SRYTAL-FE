import { z } from 'zod';

export const consultationFormSchema = z.object({
  fullName: z
    .string({ required_error: 'Full name is required' })
    .min(2, { message: 'Please enter your full name' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
  countryCode: z.string().default('+91'),
  countryIso: z.string().default('IN'),
  phone: z
    .string({ required_error: 'Phone number is required' })
    .min(6, { message: 'Please enter a valid phone number' })
    .regex(/^[0-9\s\-()+]+$/, {
      message: 'Phone number contains invalid characters'
    }),
  company: z.string().optional(),
  budget: z
    .string({ required_error: 'Project budget is required' })
    .min(1, { message: 'Please enter project budget' }),
  currency: z.string().default('INR'),
  timeline: z
    .string({ required_error: 'Please select a timeline' })
    .min(1, { message: 'Please select a project timeline' }),
  agreedToTerms: z.boolean().optional()
});

export type ConsultationForm = z.infer<typeof consultationFormSchema>;
