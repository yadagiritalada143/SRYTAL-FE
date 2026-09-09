/** Format an ISO/date string as e.g. "05 Jun 2026". */
export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
