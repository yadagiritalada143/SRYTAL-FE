import { z } from 'zod';

export const assignCourseSchema = z.object({
  employeeId: z.string().min(1, { message: 'Employee is required' }),
  courseId: z.string().min(1, { message: 'Course is required' }),
  dueDate: z.date({ required_error: 'Due date is required' })
});

export type AssignCourseForm = z.infer<typeof assignCourseSchema>;
