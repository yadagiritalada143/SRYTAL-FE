export const sanitizeAadhaarNumber = (value: string): string =>
  value.replace(/\D/g, '').slice(0, 12);

export const formatAadhaarNumber = (value?: string | null): string => {
  const digits = sanitizeAadhaarNumber(value ?? '');
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};
