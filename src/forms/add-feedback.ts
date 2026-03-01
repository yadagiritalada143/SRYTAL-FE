import { z } from 'zod';

export const addfeedbackSchema = z.object({
  name: z.string().min(1, { message: 'Feedback Attributes is required' })
});

export type AddfeedbackForm = z.infer<typeof addfeedbackSchema>;
