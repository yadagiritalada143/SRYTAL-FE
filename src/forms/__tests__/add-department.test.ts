import { adddepartmentSchema } from '../add-department';

describe('adddepartmentSchema', () => {
  it('passes with valid department name', () => {
    const result = adddepartmentSchema.safeParse({ departmentName: 'Engineering' });
    expect(result.success).toBe(true);
  });

  it('fails when departmentName is empty', () => {
    const result = adddepartmentSchema.safeParse({ departmentName: '' });
    expect(result.success).toBe(false);
  });

  it('fails when departmentName is missing', () => {
    const result = adddepartmentSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
