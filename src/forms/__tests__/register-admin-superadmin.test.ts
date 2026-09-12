import {
  registerAdminBySuperAdminForm,
  getAllEmployeesSearchForm,
} from '../register-admin-superadmin';

describe('registerAdminBySuperAdminForm', () => {
  const validData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    mobileNumber: '1234567890',
    organizationId: 'org1',
    userRole: 'admin' as const,
  };

  it('passes with valid data', () => {
    const result = registerAdminBySuperAdminForm.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('passes when optional mobileNumber is omitted', () => {
    const { mobileNumber, ...rest } = validData;
    const result = registerAdminBySuperAdminForm.safeParse(rest);
    expect(result.success).toBe(true);
  });

  it('passes when mobileNumber is empty string', () => {
    const result = registerAdminBySuperAdminForm.safeParse({
      ...validData,
      mobileNumber: '',
    });
    expect(result.success).toBe(true);
  });

  it('fails when firstName is empty', () => {
    const result = registerAdminBySuperAdminForm.safeParse({
      ...validData,
      firstName: '',
    });
    expect(result.success).toBe(false);
  });

  it('fails when email is invalid', () => {
    const result = registerAdminBySuperAdminForm.safeParse({
      ...validData,
      email: 'not-an-email',
    });
    expect(result.success).toBe(false);
  });

  it('fails when mobileNumber has non-digit characters', () => {
    const result = registerAdminBySuperAdminForm.safeParse({
      ...validData,
      mobileNumber: '12345abcde',
    });
    expect(result.success).toBe(false);
  });

  it('fails when mobileNumber is not 10 digits', () => {
    const result = registerAdminBySuperAdminForm.safeParse({
      ...validData,
      mobileNumber: '12345',
    });
    expect(result.success).toBe(false);
  });

  it('fails when userRole is not admin', () => {
    const result = registerAdminBySuperAdminForm.safeParse({
      ...validData,
      userRole: 'employee',
    });
    expect(result.success).toBe(false);
  });
});

describe('getAllEmployeesSearchForm', () => {
  it('passes with valid organizationId', () => {
    const result = getAllEmployeesSearchForm.safeParse({ organizationId: 'org1' });
    expect(result.success).toBe(true);
  });

  it('fails when organizationId is missing', () => {
    const result = getAllEmployeesSearchForm.safeParse({});
    expect(result.success).toBe(false);
  });
});
