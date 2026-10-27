import {
  sanitizeAadhaarNumber,
  formatAadhaarNumber
} from '../aadhaar';

describe('formatAadhaarNumber', () => {
  test('formats 12 digits in 4-4-4 groups', () => {
    expect(formatAadhaarNumber('879456489574')).toBe('8794 5648 9574');
  });

  test('keeps an already formatted value unchanged', () => {
    expect(formatAadhaarNumber('8794 5648 9574')).toBe('8794 5648 9574');
  });

  test('formats partial values', () => {
    expect(formatAadhaarNumber('8794')).toBe('8794');
    expect(formatAadhaarNumber('87945')).toBe('8794 5');
    expect(formatAadhaarNumber('87945648')).toBe('8794 5648');
  });

  test('handles mixed separators and junk characters', () => {
    expect(formatAadhaarNumber('8794-5648-9574')).toBe('8794 5648 9574');
    expect(formatAadhaarNumber('abc87945648x9574')).toBe('8794 5648 9574');
  });

  test('truncates more than 12 digits', () => {
    expect(formatAadhaarNumber('8794564895741234')).toBe('8794 5648 9574');
  });

  test('returns empty string for empty, undefined, or null values', () => {
    expect(formatAadhaarNumber('')).toBe('');
    expect(formatAadhaarNumber(undefined)).toBe('');
    expect(formatAadhaarNumber(null)).toBe('');
  });
});

describe('sanitizeAadhaarNumber', () => {
  test('strips non-digits', () => {
    expect(sanitizeAadhaarNumber('8794 5648 9574 xyz')).toBe('879456489574');
  });

  test('truncates to 12 digits', () => {
    expect(sanitizeAadhaarNumber('879456489574987')).toBe('879456489574');
  });
});