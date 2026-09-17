import { formatDate, normalMonth } from '../utils';

describe('generate-salary-slip/utils', () => {
  describe('formatDate', () => {
    it('formats a valid ISO date string', () => {
      const result = formatDate('2026-03-15');
      expect(result).toMatch(/15\/03\/2026/);
    });

    it('returns empty string for empty input', () => {
      expect(formatDate('')).toBe('');
    });

    it('returns the localized invalid-date string for an invalid input', () => {
      expect(formatDate('not-a-date')).toBe('Invalid Date');
    });
  });

  describe('normalMonth', () => {
    it('returns a valid Date when given a Date object', () => {
      const d = new Date(2026, 5, 1);
      expect(normalMonth(d)).toEqual(d);
    });

    it('returns null for an invalid Date', () => {
      expect(normalMonth(new Date('invalid'))).toBeNull();
    });

    it('parses a valid date string', () => {
      const result = normalMonth('2026-07-01');
      expect(result).toBeInstanceOf(Date);
      expect(result!.getFullYear()).toBe(2026);
      expect(result!.getMonth()).toBe(6);
    });

    it('returns null for an invalid string', () => {
      expect(normalMonth('xyz')).toBeNull();
    });

    it('returns null for non-date types', () => {
      expect(normalMonth(null)).toBeNull();
      expect(normalMonth(undefined)).toBeNull();
      expect(normalMonth(42)).toBeNull();
      expect(normalMonth({})).toBeNull();
    });
  });
});
