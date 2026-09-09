import { z } from 'zod';
export const contactForm = z.object({
  companyName: z
    .string({ required_error: 'Please enter the company name !' })
    .min(1, { message: 'Please enter the company name !' }),
  customerEmail: z
    .string({ required_error: 'Please enter valid email !' })
    .email({ message: 'Please enter valid email !' }),
  subject: z
    .string({ required_error: 'Please enter the Subject !' })
    .min(1, { message: 'Please enter the Subject !' }),
  message: z
    .string({ required_error: 'Please enter the Message !' })
    .min(1, { message: 'Please enter the Message !' })
});

export type ContactForm = z.infer<typeof contactForm>;
