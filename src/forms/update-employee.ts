import { z } from "zod";

export const employeeSchema = z.object({
  employeeId: z
    .string(),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z
    .string()
    .min(10, { message: "Phone number must be 10 digits" })
    .max(10, { message: "Phone number must be 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" })
    .or(z.number()),
  bloodGroup: z.string().optional(),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "DOB must be in YYYY-MM-DD format",
    })
    .optional(),
  presentAddress: z.string().min(1, "Present Address is required"),
  permanentAddress: z.string().min(1, "Permanent Address is required"),   
  employmentType: z.string().optional(),
  employeeRole: z.array(z.string().optional()), 
  bankDetailsInfo: z
    .object({
      accountNumber: z.union([
        z
          .string()
          .min(10, "Account Number must be at least 10 digits")
          .optional(),
        z.literal("").optional(),
      ]),
      accountHolderName: z.union([
        z.string().min(1, "Account Holder Name is required").optional(),
        z.literal("").optional(),
      ]),
      ifscCode: z.union([
        z.string().min(1, "IFSC Code is required").optional(),
        z.literal("").optional(),
      ]),
    })
    .optional(),
});

export type EmployeeUpdateForm = z.infer<typeof employeeSchema>;
