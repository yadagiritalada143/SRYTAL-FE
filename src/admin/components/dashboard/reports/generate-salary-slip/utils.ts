/** Format an ISO date string to a readable dd/mm/yyyy (en-IN) form. */
export const formatDate = (isoDate: string): string => {
  if (!isoDate) return '';
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch {
    return isoDate;
  }
};

/** Coerce an unknown value (Date | string) into a valid Date, or null. */
export const normalMonth = (value: unknown): Date | null => {
  if (value instanceof Date && !isNaN(value.getTime())) return value;
  if (typeof value === 'string') {
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
};
