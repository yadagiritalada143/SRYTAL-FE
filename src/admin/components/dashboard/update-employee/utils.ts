/** Normalize an ISO/date string to "DD-Mon-YYYY", or undefined if invalid. */
export const normalizeDate = (date?: string) => {
  if (!date) return undefined;

  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return undefined;

  const day = String(parsed.getDate()).padStart(2, '0');
  const month = parsed.toLocaleString('en-US', { month: 'short' });
  const year = parsed.getFullYear();

  return `${day}-${month}-${year}`;
};
