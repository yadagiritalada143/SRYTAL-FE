import { z } from 'zod';

// Schema for a single comment
export const commentSchema = z.object({
  id: z.string().optional(),
  comment: z.string().min(1, 'Comment is required'),
  callStartsAt: z
    .string()
    .datetime('Invalid date-time format for callStartsAt'),
  callEndsAt: z.string().datetime('Invalid date-time format for callEndsAt'),
});

// Schema for the candidate
export const candidateSchema = z
  .object({
    id: z.string().optional(),
    candidateName: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-Za-z ]+$/, 'Name must contain only letters and spaces'),
    contact: z.object({
      email: z.string().email('Invalid email format'),
      phone: z
        .string()
        .min(10, 'Phone number must be at least 10 digits')
        .max(10, 'Phone number must be 10 digits')
        .regex(/^\d+$/, 'Phone number must contain only numbers'),
    }),
    totalYearsOfExperience: z.number().min(0, 'Experience must be positive'),
    relaventYearsOfExperience: z
      .number()
      .min(0, 'Relevant experience must be positive'),
    evaluatedSkills: z.string(),
    comments: z.array(commentSchema).min(1),
  })
  .refine(
    data => data.relaventYearsOfExperience <= data.totalYearsOfExperience,
    {
      message: 'Relevant experience cannot be more than total experience',
      path: ['relevantYearsOfExperience'],
    }
  );

export const updateCandidateSchema = z
  .object({
    id: z.string().optional(),
    candidateName: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-Za-z ]+$/, 'Name must contain only letters and spaces'),
    contact: z.object({
      email: z.string().email('Invalid email format'),
      phone: z
        .string()
        .min(10, 'Phone number must be at least 10 digits')
        .max(10, 'Phone number must be 10 digits')
        .regex(/^\d+$/, 'Phone number must contain only numbers'),
    }),
    totalYearsOfExperience: z.number().min(0, 'Experience must be positive'),
    relaventYearsOfExperience: z
      .number()
      .min(0, 'Relevant experience must be positive'),
    evaluatedSkills: z.string(),
  })
  .refine(
    data => data.relaventYearsOfExperience <= data.totalYearsOfExperience,
    {
      message: 'Relevant experience cannot be more than total experience',
      path: ['relevantYearsOfExperience'],
    }
  );
// Infer the type from the schema
export type AddCandidateForm = z.infer<typeof candidateSchema>;
export type UpdateCandidateSchema = z.infer<typeof updateCandidateSchema>;
export type AddCommentForm = z.infer<typeof commentSchema>;
