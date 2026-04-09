import { o as s, e as m, s as e, l as i } from './zod-DC47Kjo4.js';
const r = s({
    firstName: e().min(1, { message: 'First name is required' }),
    lastName: e().min(1, { message: 'Last name is required' }),
    email: e().email(),
    mobileNumber: e()
      .min(10, { message: 'Phone number must be 10 digits' })
      .max(10, { message: 'Phone number must be 10 digits' })
      .regex(/^\d+$/, { message: 'Phone number must contain only digits' })
      .optional()
      .or(i('')),
    organizationId: e(),
    userRole: m(['admin'])
  }),
  n = s({ organizationId: e() });
export { n as g, r };
