import { o as n, s as e, l as a } from './zod-DC47Kjo4.js';
const o = n({
  companyName: e({ required_error: 'Company name is required' }).min(1, {
    message: 'Please enter company name'
  }),
  primaryContact: n({
    name: e().optional(),
    email: e()
      .email({ message: 'Please enter a valid email' })
      .optional()
      .or(a('')),
    phone: e()
      .min(10, { message: 'Phone number must be 10 digits' })
      .max(10, { message: 'Phone number must be 10 digits' })
      .regex(/^\d+$/, { message: 'Phone number must contain only digits' })
      .optional()
      .or(a(''))
  }),
  secondaryContact_1: n({
    name: e().optional(),
    email: e()
      .email({ message: 'Please enter a valid email' })
      .optional()
      .or(a('')),
    phone: e()
      .min(10, { message: 'Phone number must be 10 digits' })
      .max(10, { message: 'Phone number must be 10 digits' })
      .regex(/^\d+$/, { message: 'Phone number must contain only digits' })
      .optional()
      .or(a(''))
  }),
  secondaryContact_2: n({
    name: e().optional(),
    email: e()
      .email({ message: 'Please enter a valid email' })
      .optional()
      .or(a('')),
    phone: e()
      .min(10, { message: 'Phone number must be 10 digits' })
      .max(10, { message: 'Phone number must be 10 digits' })
      .regex(/^\d+$/, { message: 'Phone number must contain only digits' })
      .optional()
      .or(a(''))
  }),
  status: e().optional().or(a('Created'))
});
export { o as a };
