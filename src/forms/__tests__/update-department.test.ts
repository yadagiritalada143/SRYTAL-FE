import { updatedepartmentSchema } from '../update-department';

describe('updatedepartmentSchema', () => {
  it('passes with valid department name', () => {
    const result = updatedepartmentSchema.safeParse({ departmentName: 'Sales' });
    expect(result.success).toBe(true);
  });

  it('fails when departmentName is empty', () => {
    const result = updatedepartmentSchema.safeParse({ departmentName: '' });
    expect(result.success).toBe(false);
  });

  it('fails when departmentName is missing', () => {
    const result = updatedepartmentSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
