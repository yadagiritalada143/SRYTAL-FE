import { apiClient, apiClientComm } from '../api-client';

jest.mock('@constants', () => ({
  BASE_URL: 'http://localhost:3000/',
  ROLES: {}
}));

jest.mock('axios', () => {
  const instance = Object.assign(jest.fn(), {
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    },
    get: jest.fn(),
    post: jest.fn()
  });
  return { create: jest.fn(() => instance) };
});

jest.mock('react-toastify', () => ({
  toast: { error: jest.fn(), success: jest.fn() }
}));

const loadTimeInstance = apiClient as any;
const requestHandler =
  loadTimeInstance.interceptors.request.use.mock.calls[0][0];
const responseSuccessHandler =
  loadTimeInstance.interceptors.response.use.mock.calls[0][0];
const responseErrorHandler =
  loadTimeInstance.interceptors.response.use.mock.calls[0][1];

const originalLocation = window.location;

describe('api-client', () => {
  let axiosMock: { create: jest.Mock };
  let instance: any;

  beforeEach(() => {
    axiosMock = jest.requireMock('axios') as any;
    instance = apiClient as any;
    instance.mockClear();
    instance.get.mockReset();
    instance.get.mockResolvedValue({ data: { token: 'new-token' } });
    localStorage.clear();
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: { ...originalLocation, href: '', pathname: '/' }
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: originalLocation
    });
  });

  it('creates two axios instances with the base URL', () => {
    expect(axiosMock.create).toHaveBeenCalledTimes(2);
    expect(axiosMock.create).toHaveBeenCalledWith({
      baseURL: 'http://localhost:3000/',
      headers: { 'Content-Type': 'application/json' }
    });
    expect(apiClient).toBe(instance);
    expect(apiClientComm).toBe(instance);
  });

  it('registers request and response interceptors', () => {
    expect(typeof requestHandler).toBe('function');
    expect(typeof responseSuccessHandler).toBe('function');
    expect(typeof responseErrorHandler).toBe('function');
  });

  describe('request interceptor', () => {
    it('attaches an existing auth_token to the config', async () => {
      localStorage.setItem('token', 'stored-token');
      const config = { headers: {} };

      const result = await requestHandler(config);

      expect(result.headers.auth_token).toBe('stored-token');
      expect(result).toBe(config);
    });

    it('refreshes the access token when no token exists', async () => {
      localStorage.setItem('refreshToken', 'refresh-token');
      const config = { headers: {} };

      const result = await requestHandler(config);

      expect(instance.get).toHaveBeenCalledWith('/admin/refreshToken', {
        headers: { refresh_token: 'refresh-token' }
      });
      expect(result.headers.auth_token).toBe('new-token');
      expect(localStorage.getItem('token')).toBe('new-token');
    });

    it('rejects and logs out when the refresh fails', async () => {
      await expect(requestHandler({ headers: {} })).rejects.toThrow(
        'No refresh token found.'
      );
      expect(window.location.href).toBe('/');
    });
  });

  describe('response interceptor', () => {
    it('passes successful responses through unchanged', () => {
      const response = { status: 200, data: {} };
      expect(responseSuccessHandler(response)).toBe(response);
    });

    it('retries a 403 error with a fresh token', async () => {
      localStorage.setItem('refreshToken', 'refresh-token');
      const error = {
        config: { url: '/api/data', headers: {} } as any,
        response: { status: 403 }
      };

      await responseErrorHandler(error);

      expect(error.config._retry).toBe(true);
      expect(error.config.headers.auth_token).toBe('new-token');
      expect(instance).toHaveBeenCalledWith(error.config);
    });

    it('logs out when the 403 refresh fails', async () => {
      const error = {
        config: { url: '/api/data', headers: {} },
        response: { status: 403 }
      };

      await expect(responseErrorHandler(error)).rejects.toThrow(
        'No refresh token found.'
      );
      expect(window.location.href).toBe('/');
    });

    it('logs out when the refresh token endpoint itself fails', async () => {
      const error = {
        config: { url: '/admin/refreshToken', headers: {} },
        response: { status: 401 }
      };

      await expect(responseErrorHandler(error)).rejects.toBe(error);
      expect(window.location.href).toBe('/');
    });

    it('rejects non-403 errors without modifying them', async () => {
      const error = {
        config: { url: '/api/data', headers: {} },
        response: { status: 500 }
      };

      await expect(responseErrorHandler(error)).rejects.toBe(error);
      expect(instance).not.toHaveBeenCalled();
    });

    it('does not retry the same 403 request twice', async () => {
      localStorage.setItem('refreshToken', 'refresh-token');
      const error = {
        config: { url: '/api/data', headers: {}, _retry: true },
        response: { status: 403 }
      };

      await expect(responseErrorHandler(error)).rejects.toBe(error);
      expect(instance.get).not.toHaveBeenCalled();
    });
  });
});
