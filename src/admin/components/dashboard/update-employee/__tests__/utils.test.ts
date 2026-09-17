import { normalizeDate } from '../utils';

describe('normalizeDate', () => {
  it('returns undefined for empty input', () => {
    expect(normalizeDate()).toBeUndefined();
    expect(normalizeDate('')).toBeUndefined();
  });

  it('returns undefined for invalid dates', () => {
    expect(normalizeDate('not-a-date')).toBeUndefined();
    expect(normalizeDate('2025-13-40')).toBeUndefined();
  });

  it('formats a valid ISO date to DD-Mon-YYYY', () => {
    expect(normalizeDate('2024-01-05')).toBe('05-Jan-2024');
  });

  it('pads day to two digits', () => {
    expect(normalizeDate('2024-12-25')).toBe('25-Dec-2024');
  });

  it('formats full date-time strings', () => {
    expect(normalizeDate('2023-07-08T10:30:00.000Z')).toBe('08-Jul-2023');
  });
});