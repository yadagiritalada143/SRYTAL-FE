import { z } from 'zod';

const allowedPattern = /^[a-zA-Z0-9\s-]+$/;

export const packageSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .regex(allowedPattern, {
      message: 'Only letters, numbers, spaces, and hyphens are allowed'
    }),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .regex(allowedPattern, {
      message: 'Only letters, numbers, spaces, and hyphens are allowed'
    }),
  startDate: z.date({ required_error: 'Start date is required' }),
  endDate: z.date({ required_error: 'End date is required' }),
  approvers: z.array(z.string().optional())
});

export type PackageUpdateForm = z.infer<typeof packageSchema>;
