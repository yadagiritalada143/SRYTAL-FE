import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import EmployeeLogin from '../login';

jest.mock('@constants', () => ({
  ROLES: {
    ADMIN: 'admin',
    SUPER_ADMIN: 'superadmin',
    USER: 'Employee',
    RECRUITER: 'Recruiter',
    CONTENT_WRITER: 'ContentWriter'
  }
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ organization: 'srytal' })
}));

const mockSetUser = jest.fn();
jest.mock('recoil', () => ({
  useSetRecoilState: () => mockSetUser
}));

jest.mock('@atoms/user', () => ({
  userDetailsAtom: { key: 'userDetails' }
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      headerBackgroundColor: '#f8f9fa',
      borderColor: '#dee2e6',
      linkColor: '#1971c2',
      button: { color: '#1971c2', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: {
      organization_name: 'srytal',
      organization_theme: { logo: 'logo.png' }
    }
  })
}));

const mockShowSuccessToast = jest.fn();
const mockShowErrorToast = jest.fn();
jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: mockShowSuccessToast,
    showErrorToast: mockShowErrorToast
  })
}));

jest.mock('@services/common-services', () => ({
  login: jest.fn()
}));
const mockLogin = (jest.requireMock('@services/common-services') as any).login;

jest.mock('@mantine/core', () => {
  const actual = jest.requireActual('@mantine/core');
  return {
    ...actual,
    Modal: ({ opened, children }: any) =>
      opened ? <div data-testid='user-modal'>{children}</div> : null
  };
});

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, disabled, ...rest }: any) => (
    <button disabled={disabled} {...rest}>
      {children}
    </button>
  )
}));

jest.mock('@components/common/loaders/PremiumLoader', () => ({
  __esModule: true,
  default: () => <div data-testid='premium-loader' />
}));

jest.mock('@components/common/forgetPassword/forgetPassword', () => ({
  __esModule: true,
  default: () => <div data-testid='forgot-password' />
}));

jest.mock('@components/UI/Theme-background/background', () => ({
  ThemeBackground: ({ children }: any) => <div>{children}</div>
}));

jest.mock('@components/UI/Form/form', () => ({
  ThemeForm: ({ children, onSubmit }: any) => (
    <form data-testid='theme-form' onSubmit={onSubmit}>
      {children}
    </form>
  )
}));

const renderLogin = () =>
  render(
    <MantineProvider>
      <EmployeeLogin />
    </MantineProvider>
  );

const submitCredentials = (email: string, password: string) => {
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: email }
  });
  fireEvent.change(screen.getByLabelText('Password'), {
    target: { value: password }
  });
  fireEvent.click(screen.getByRole('button', { name: 'Log in' }));
};

describe('EmployeeLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders the login form', () => {
    renderLogin();
    expect(screen.getByText('Employee Login')).toBeInTheDocument();
    expect(screen.getByText('Welcome Back !')).toBeInTheDocument();
    expect(screen.getByText('Employee Portal')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Log in' })
    ).toBeInTheDocument();
  });

  it('shows validation errors for invalid submission', async () => {
    renderLogin();
    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));
    await waitFor(() =>
      expect(screen.getByText('Invalid email')).toBeInTheDocument()
    );
    expect(
      screen.getByText('Password must be 8 characters long')
    ).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('logs in an employee and redirects to the dashboard', async () => {
    mockLogin.mockResolvedValueOnce({
      firstName: 'John',
      lastName: 'Doe',
      userRole: 'Employee',
      passwordResetRequired: 'false',
      id: '1'
    });
    renderLogin();
    submitCredentials('john@srytal.com', 'password123');

    await waitFor(() =>
      expect(mockShowSuccessToast).toHaveBeenCalledWith('Login successfully !')
    );
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'john@srytal.com',
      password: 'password123'
    });
    expect(mockSetUser).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      userRole: 'Employee',
      passwordResetRequired: 'false',
      id: '1'
    });
    expect(mockNavigate).toHaveBeenCalledWith('/srytal/employee/dashboard');
  });

  it('redirects non-employee roles to the profile page', async () => {
    mockLogin.mockResolvedValueOnce({
      firstName: 'Ada',
      lastName: 'Lovelace',
      userRole: 'admin',
      passwordResetRequired: 'false',
      id: '2'
    });
    renderLogin();
    submitCredentials('ada@srytal.com', 'password123');

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/employee/dashboard/profile'
      )
    );
  });

  it('shows the API message when login fails with an axios error', async () => {
    mockLogin.mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: { message: 'Bad credentials' } }
    });
    renderLogin();
    submitCredentials('john@srytal.com', 'password123');

    await waitFor(() =>
      expect(mockShowErrorToast).toHaveBeenCalledWith(
        'Login failed: Bad credentials'
      )
    );
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('shows a generic message when login fails with a plain error', async () => {
    mockLogin.mockRejectedValueOnce(new Error('boom'));
    renderLogin();
    submitCredentials('john@srytal.com', 'password123');

    await waitFor(() =>
      expect(mockShowErrorToast).toHaveBeenCalledWith(
        'An unexpected error occurred.'
      )
    );
  });

  it('redirects an already-logged-in employee from a stored session', async () => {
    localStorage.setItem('token', 'abc');
    localStorage.setItem('userRole', 'Employee');
    renderLogin();
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith('/srytal/employee/dashboard')
    );
  });

  it('does not redirect when the stored role is not an employee', () => {
    localStorage.setItem('token', 'abc');
    localStorage.setItem('userRole', 'admin');
    renderLogin();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('opens the forgot password modal', () => {
    renderLogin();
    expect(screen.queryByTestId('user-modal')).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('button', { name: 'Forgot Password?' })
    );
    expect(screen.getByTestId('user-modal')).toBeInTheDocument();
    expect(screen.getByTestId('forgot-password')).toBeInTheDocument();
  });
});