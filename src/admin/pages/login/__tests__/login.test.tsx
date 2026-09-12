import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ organization: 'srytal' })
}));

jest.mock('@constants', () => ({
  ROLES: {
    ADMIN: 'admin',
    SUPER_ADMIN: 'superadmin',
    USER: 'Employee',
    RECRUITER: 'Recruiter',
    CONTENT_WRITER: 'ContentWriter'
  }
}));

jest.mock('@mantine/core', () => {
  const actual = jest.requireActual('@mantine/core');
  return {
    ...actual,
    Modal: ({ opened, children }: any) =>
      opened ? <div data-testid='mantine-modal'>{children}</div> : null
  };
});

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#1971c2',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#1971c2', textColor: '#ffffff' },
      linkColor: '#1971c2'
    },
    isDarkTheme: false,
    organizationConfig: {
      organization_name: 'srytal',
      organization_theme: { logo: 'logo.png' }
    }
  })
}));

const mockShowErrorToast = jest.fn();
jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: jest.fn(),
    showErrorToast: (...args: any[]) => mockShowErrorToast(...args)
  })
}));

const mockSubmit = jest.fn();
jest.mock('../methods', () => ({
  useSubmitAdminLogin: () => ({
    submit: (...args: any[]) => mockSubmit(...args)
  })
}));

jest.mock('@components/common/forgetPassword/forgetPassword', () => ({
  __esModule: true,
  default: ({ closeModal }: any) => (
    <div data-testid='forgot-password-modal'>
      <button onClick={closeModal}>Close</button>
    </div>
  )
}));

jest.mock('@components/UI/Theme-background/background', () => ({
  ThemeBackground: ({ children, ...props }: any) => <div {...props}>{children}</div>
}));

jest.mock('@components/UI/Form/form', () => ({
  ThemeForm: ({ children, onSubmit }: any) => (
    <form onSubmit={onSubmit} data-testid='login-form'>{children}</form>
  )
}));

jest.mock('@components/common/loaders/PremiumLoader', () => ({
  __esModule: true,
  default: () => <span data-testid='premium-loader' />
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, disabled, type, ...rest }: any) => (
    <button disabled={disabled} type={type} {...rest} data-testid='common-button'>
      {children}
    </button>
  )
}));

const qc = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });

import AdminLogin from '../login';

const renderLogin = () =>
  render(
    <QueryClientProvider client={qc}>
      <MantineProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AdminLogin />
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  );

describe('AdminLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders the login form fields', () => {
    renderLogin();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders the Welcome Back heading', () => {
    renderLogin();
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
  });

  it('renders the Admin Portal label', () => {
    renderLogin();
    expect(screen.getByText('Admin Portal')).toBeInTheDocument();
  });

  it('renders the login button with Login text', () => {
    renderLogin();
    expect(screen.getByTestId('common-button')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders the forgot password button', () => {
    renderLogin();
    expect(screen.getByText('Forgot Password')).toBeInTheDocument();
  });

  it('opens the forgot password modal', () => {
    renderLogin();
    fireEvent.click(screen.getByText('Forgot Password'));
    expect(screen.getByTestId('mantine-modal')).toBeInTheDocument();
    expect(screen.getByTestId('forgot-password-modal')).toBeInTheDocument();
  });

  it('closes the forgot password modal', () => {
    renderLogin();
    fireEvent.click(screen.getByText('Forgot Password'));
    expect(screen.getByTestId('forgot-password-modal')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByTestId('forgot-password-modal')).not.toBeInTheDocument();
  });

  it('does not submit with invalid email', async () => {
    renderLogin();
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'not-an-email' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    });
    fireEvent.submit(screen.getByTestId('login-form'));

    await waitFor(() => {
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  });

  it('does not submit with short password', async () => {
    renderLogin();
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'admin@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'short' }
    });
    fireEvent.submit(screen.getByTestId('login-form'));

    await waitFor(() => {
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  });

  it('renders the organization logo image', () => {
    renderLogin();
    expect(screen.getByAltText('srytal')).toHaveAttribute('src', 'logo.png');
  });

  it('strips spaces from email input', () => {
    renderLogin();
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'admin@ example.com' } });
    expect(emailInput).toHaveValue('admin@example.com');
  });

  it('redirects to admin dashboard when a valid admin session exists', async () => {
    const now = new Date().toISOString();
    localStorage.setItem('token', 'abc');
    localStorage.setItem('userRole', 'admin');
    localStorage.setItem('createdAt', now);

    renderLogin();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/srytal/admin/dashboard');
    });
  });

  it('clears session and shows error toast when session is expired', async () => {
    const expired = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString();
    localStorage.setItem('token', 'abc');
    localStorage.setItem('userRole', 'admin');
    localStorage.setItem('createdAt', expired);

    renderLogin();

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith('Session expired. Please login again.');
    });
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('createdAt')).toBeNull();
  });

  it('does not redirect when stored role is not admin', () => {
    localStorage.setItem('token', 'abc');
    localStorage.setItem('userRole', 'Employee');
    localStorage.setItem('createdAt', new Date().toISOString());

    renderLogin();

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
