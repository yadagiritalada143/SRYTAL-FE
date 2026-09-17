import { addfeedbackSchema } from '../add-feedback';

describe('addfeedbackSchema', () => {
  it('passes with valid name', () => {
    const result = addfeedbackSchema.safeParse({ name: 'Communication' });
    expect(result.success).toBe(true);
  });

  it('fails when name is empty', () => {
    const result = addfeedbackSchema.safeParse({ name: '' });
    expect(result.success).toBe(false);
  });

  it('fails when name is missing', () => {
    const result = addfeedbackSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
