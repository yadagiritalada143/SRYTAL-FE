import { generateSalarySlipSchema } from '../generate-salary-slip';

describe('generateSalarySlipSchema', () => {
  const validData = {
    employeeId: 'emp1',
    selectedMonth: new Date('2026-01-01'),
    daysInMonth: 31,
    lopDays: 2,
    basicSalary: 50000,
    hraPercentage: 40,
    payDate: '2026-01-31',
    transactionId: 'HDFC123456',
  };

  it('passes with valid data', () => {
    const result = generateSalarySlipSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('passes with optional fields omitted', () => {
    const minimal = {
      employeeId: 'emp1',
      selectedMonth: new Date('2026-01-01'),
      daysInMonth: 31,
      basicSalary: 50000,
      payDate: '2026-01-31',
      transactionId: 'HDFC123456',
    };
    const result = generateSalarySlipSchema.safeParse(minimal);
    expect(result.success).toBe(true);
  });

  it('fails when employeeId is empty', () => {
    const result = generateSalarySlipSchema.safeParse({
      ...validData,
      employeeId: '',
    });
    expect(result.success).toBe(false);
  });

  it('fails when employeeId is missing', () => {
    const { employeeId, ...rest } = validData;
    const result = generateSalarySlipSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it('fails when basicSalary is negative', () => {
    const result = generateSalarySlipSchema.safeParse({
      ...validData,
      basicSalary: -1,
    });
    expect(result.success).toBe(false);
  });

  it('fails when transactionId has invalid format', () => {
    const result = generateSalarySlipSchema.safeParse({
      ...validData,
      transactionId: 'invalid',
    });
    expect(result.success).toBe(false);
  });

  it('fails when transactionId has lowercase letters', () => {
    const result = generateSalarySlipSchema.safeParse({
      ...validData,
      transactionId: 'hdfc123456',
    });
    expect(result.success).toBe(false);
  });

  it('fails when lopDays exceeds 31', () => {
    const result = generateSalarySlipSchema.safeParse({
      ...validData,
      lopDays: 32,
    });
    expect(result.success).toBe(false);
  });

  it('fails when lopDays is negative', () => {
    const result = generateSalarySlipSchema.safeParse({
      ...validData,
      lopDays: -1,
    });
    expect(result.success).toBe(false);
  });

  it('fails when payDate format is wrong', () => {
    const result = generateSalarySlipSchema.safeParse({
      ...validData,
      payDate: '31-01-2026',
    });
    expect(result.success).toBe(false);
  });

  it('fails when daysInMonth is less than 1', () => {
    const result = generateSalarySlipSchema.safeParse({
      ...validData,
      daysInMonth: 0,
    });
    expect(result.success).toBe(false);
  });

  it('transforms selectedMonth string to Date', () => {
    const result = generateSalarySlipSchema.safeParse({
      ...validData,
      selectedMonth: '2026-06-01',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.selectedMonth).toBeInstanceOf(Date);
    }
  });

  it('defaults lopDays to 0 when omitted', () => {
    const { lopDays, ...rest } = validData;
    const result = generateSalarySlipSchema.safeParse(rest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.lopDays).toBe(0);
    }
  });

  it('defaults additionalAllowances to empty array when omitted', () => {
    const result = generateSalarySlipSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.additionalAllowances).toEqual([]);
    }
  });
});
