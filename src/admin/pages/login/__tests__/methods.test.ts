import { renderHook, act } from '@testing-library/react';
import { useSubmitAdminLogin } from '../methods';

jest.mock('@constants', () => ({
  ROLES: {
    ADMIN: 'admin',
    SUPER_ADMIN: 'superadmin',
    USER: 'Employee',
    RECRUITER: 'Recruiter',
    CONTENT_WRITER: 'ContentWriter'
  }
}));

const mockShowSuccessToast = jest.fn();
const mockShowErrorToast = jest.fn();
jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: mockShowSuccessToast,
    showErrorToast: mockShowErrorToast
  })
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

jest.mock('@services/common-services', () => ({
  get login() {
    return mockLogin as any;
  }
}));
const mockLogin = jest.fn();
jest.requireMock('@services/common-services');

describe('useSubmitAdminLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('navigates to the admin dashboard for an admin user', async () => {
    mockLogin.mockResolvedValueOnce({ userRole: 'admin' });
    const { result } = renderHook(() => useSubmitAdminLogin());

    await act(async () => {
      await result.current.submit(
        { email: 'a@b.com', password: 'password123' },
        'srytal'
      );
    });

    expect(mockShowSuccessToast).toHaveBeenCalledWith('Login successfully!');
    expect(mockNavigate).toHaveBeenCalledWith('/srytal/admin/dashboard');
    expect(mockShowErrorToast).not.toHaveBeenCalled();
  });

  it('rejects non-admin users', async () => {
    mockLogin.mockResolvedValueOnce({ userRole: 'Employee' });
    const { result } = renderHook(() => useSubmitAdminLogin());

    await act(async () => {
      await result.current.submit(
        { email: 'a@b.com', password: 'password123' },
        'srytal'
      );
    });

    expect(mockShowErrorToast).toHaveBeenCalledWith('Not authorized to access');
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('shows the API message for an axios error', async () => {
    mockLogin.mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: { message: 'Bad credentials' } }
    });
    const { result } = renderHook(() => useSubmitAdminLogin());

    await act(async () => {
      await result.current.submit({ email: 'a', password: 'b' }, 'srytal');
    });

    expect(mockShowErrorToast).toHaveBeenCalledWith(
      'Login failed: Bad credentials'
    );
  });

  it('falls back to Unknown error when an axios error has no message', async () => {
    mockLogin.mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: {} }
    });
    const { result } = renderHook(() => useSubmitAdminLogin());

    await act(async () => {
      await result.current.submit({ email: 'a', password: 'b' }, 'srytal');
    });

    expect(mockShowErrorToast).toHaveBeenCalledWith(
      'Login failed: Unknown error'
    );
  });

  it('shows a generic message for a non-axios error', async () => {
    mockLogin.mockRejectedValueOnce(new Error('boom'));
    const { result } = renderHook(() => useSubmitAdminLogin());

    await act(async () => {
      await result.current.submit({ email: 'a', password: 'b' }, 'srytal');
    });

    expect(mockShowErrorToast).toHaveBeenCalledWith(
      'An unexpected error occurred.'
    );
  });
});
