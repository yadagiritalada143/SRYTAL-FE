import { z } from 'zod';

export const updatedepartmentSchema = z.object({
  departmentName: z.string().min(1, { message: 'Department Name is required' })
});

export type updatedepartmentForm = z.infer<typeof updatedepartmentSchema>;
