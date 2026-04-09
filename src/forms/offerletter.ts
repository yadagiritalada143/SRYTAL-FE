import { z } from 'zod';

export const offerLetterForm = z.object({
  nameOfTheCandidate: z
    .string({ required_error: 'Candidate name is required' })
    .min(3, { message: 'Name must have 3 characters' }),
  subject: z.string({ required_error: 'Please enter the subject' }),
  role: z.enum(['employee', 'recruiter']),
  dateOfJoining: z.string({ required_error: 'Please select joining date' }),
  compensation: z
    .string()
    .regex(/^\d+$/, { message: 'Compensation must contain only digits' }),
  workLocation: z.string({ required_error: 'Work location is required' })
});
export type OfferLetterForm = z.infer<typeof offerLetterForm>;
