import { z } from 'zod';

export const updatePasswordSchema = z.object({
  oldPassword: z
    .string({ required_error: 'Please enter password' })
    .min(8, { message: 'Password must be 8 characters long' }),
  newPassword: z
    .string({ required_error: 'Please enter new password' })
    .min(8, { message: 'Password must be 8 characters long' }),
  confirmNewPassword: z
    .string({ required_error: 'Please confirm new password' })
    .min(8, { message: 'Password must be 8 characters long' })
});

export type UpdatePasswordForm = z.infer<typeof updatePasswordSchema>;
