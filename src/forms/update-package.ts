import { z } from "zod";

export const packageSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }),
});

export type PackageUpdateForm = z.infer<typeof packageSchema>;
