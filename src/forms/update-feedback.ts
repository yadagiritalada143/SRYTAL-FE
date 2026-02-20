import { z } from 'zod';

export const updatefeedbackSchema = z.object({
  name: z.string().min(1, { message: 'Feedback Attributes is required' })
});

export type updatefeedbackForm = z.infer<typeof updatefeedbackSchema>;
