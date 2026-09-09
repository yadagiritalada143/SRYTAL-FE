import { AxiosError } from 'axios';

/**
 * Extracts a human-readable message from an unknown error (typically an Axios
 * error from the API). Centralises the `error?.response?.data?.message` pattern
 * that was previously duplicated across the codebase.
 *
 * @param error    The caught error (any shape).
 * @param fallback Message to use when nothing more specific is available.
 */
export const getErrorMessage = (
  error: unknown,
  fallback = 'Something went wrong. Please try again.'
): string => {
  if (!error) return fallback;

  // Axios errors: prefer the API-provided message, then the HTTP message.
  const axiosError = error as AxiosError<{ message?: string; error?: string }>;
  if (axiosError?.isAxiosError) {
    return (
      axiosError.response?.data?.message ||
      axiosError.response?.data?.error ||
      axiosError.message ||
      fallback
    );
  }

  if (error instanceof Error) {
    return error.message || fallback;
  }

  if (typeof error === 'string') {
    return error || fallback;
  }

  return fallback;
};
