import { z } from "zod";
export const addEmployeeSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Email is required" }),
  mobileNumber: z
    .string()
    .min(10, { message: "Phone number must be 10 digits" })
    .max(10, { message: "Phone number must be 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
  userRole: z.enum(["employee", "recruiter"]),
});

export type AddEmployeeForm = z.infer<typeof addEmployeeSchema>;
