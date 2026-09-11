import { formatDate } from '../utils';

describe('payroll/utils', () => {
  describe('formatDate', () => {
    it('formats a valid ISO date string', () => {
      const result = formatDate('2026-03-15');
      expect(result).toMatch(/15/);
      expect(result).toMatch(/2026/);
    });

    it('handles a date-only string', () => {
      const result = formatDate('2025-12-25');
      expect(result).toMatch(/25/);
      expect(result).toMatch(/2025/);
    });
  });
});
