import { getErrorMessage } from '../get-error-message';

describe('getErrorMessage', () => {
  const fallback = 'Something went wrong. Please try again.';

  it('returns fallback when error is null', () => {
    expect(getErrorMessage(null)).toBe(fallback);
  });

  it('returns fallback when error is undefined', () => {
    expect(getErrorMessage(undefined)).toBe(fallback);
  });

  it('returns response.data.message for Axios errors', () => {
    const error = {
      isAxiosError: true,
      response: { data: { message: 'Not found' } },
      message: 'Request failed',
    };
    expect(getErrorMessage(error)).toBe('Not found');
  });

  it('returns response.data.error when message is absent', () => {
    const error = {
      isAxiosError: true,
      response: { data: { error: 'Invalid input' } },
      message: 'Request failed',
    };
    expect(getErrorMessage(error)).toBe('Invalid input');
  });

  it('returns axiosError.message when response data has neither', () => {
    const error = {
      isAxiosError: true,
      response: { data: {} },
      message: 'Network Error',
    };
    expect(getErrorMessage(error)).toBe('Network Error');
  });

  it('returns fallback for Axios error with no details', () => {
    const error = {
      isAxiosError: true,
      response: undefined,
      message: undefined,
    };
    expect(getErrorMessage(error)).toBe(fallback);
  });

  it('returns error.message for Error instances', () => {
    expect(getErrorMessage(new Error('boom'))).toBe('boom');
  });

  it('returns fallback for Error instance with empty message', () => {
    expect(getErrorMessage(new Error(''))).toBe(fallback);
  });

  it('returns the string itself for string errors', () => {
    expect(getErrorMessage('simple error')).toBe('simple error');
  });

  it('returns fallback for empty string error', () => {
    expect(getErrorMessage('')).toBe(fallback);
  });

  it('returns fallback for unknown object errors', () => {
    expect(getErrorMessage({ code: 500 })).toBe(fallback);
  });

  it('uses a custom fallback when provided', () => {
    expect(getErrorMessage(null, 'Custom fallback')).toBe('Custom fallback');
    expect(getErrorMessage({ code: 500 }, 'Custom fallback')).toBe(
      'Custom fallback'
    );
  });
});
