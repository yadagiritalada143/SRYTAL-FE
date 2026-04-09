import { o as r, s as e, e as o } from './zod-DC47Kjo4.js';
const a = r({
  nameOfTheCandidate: e({ required_error: 'Candidate name is required' }).min(
    3,
    { message: 'Name must have 3 characters' }
  ),
  subject: e({ required_error: 'Please enter the subject' }),
  role: o(['employee', 'recruiter']),
  dateOfJoining: e({ required_error: 'Please select joining date' }),
  compensation: e().regex(/^\d+$/, {
    message: 'Compensation must contain only digits'
  }),
  workLocation: e({ required_error: 'Work location is required' })
});
export { a as o };
