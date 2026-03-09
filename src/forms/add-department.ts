import { z } from 'zod';

export const adddepartmentSchema = z.object({
  departmentName: z.string().min(1, { message: 'Department Name  is required' })
});

export type AdddepartmentForm = z.infer<typeof adddepartmentSchema>;
