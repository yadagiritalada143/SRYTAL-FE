import { AxiosError } from 'axios';

interface ApiErrorBody {
  message?: string;
  error?: string;
  /** Validation failures (`error.details`), most specific text first. */
  errors?: unknown;
}

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
  const axiosError = error as AxiosError<ApiErrorBody>;
  if (axiosError?.isAxiosError) {
    const data = axiosError.response?.data;
    const details = Array.isArray(data?.errors)
      ? data.errors.filter(
          (detail): detail is string =>
            typeof detail === 'string' && detail.trim() !== ''
        )
      : [];
    if (details.length > 0) return details.join(' ');
    return data?.message || data?.error || axiosError.message || fallback;
  }

  if (error instanceof Error) {
    return error.message || fallback;
  }

  if (typeof error === 'string') {
    return error || fallback;
  }

  return fallback;
};
