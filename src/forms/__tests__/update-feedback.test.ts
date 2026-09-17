import { updatefeedbackSchema } from '../update-feedback';

describe('updatefeedbackSchema', () => {
  it('passes with valid name', () => {
    const result = updatefeedbackSchema.safeParse({ name: 'Teamwork' });
    expect(result.success).toBe(true);
  });

  it('fails when name is empty', () => {
    const result = updatefeedbackSchema.safeParse({ name: '' });
    expect(result.success).toBe(false);
  });

  it('fails when name is missing', () => {
    const result = updatefeedbackSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
