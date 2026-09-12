import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import React from 'react';

jest.mock('@services/common-services', () => ({
  forgetPassword: jest.fn()
}));

jest.mock('@utils/common/toast', () => ({
  useCustomToast: jest.fn()
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: jest.fn()
}));

jest.mock('../../button/CommonButton', () => ({
  CommonButton: (props: any) => (
    <button
      data-testid='common-button'
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
    >
      {props.children}
    </button>
  )
}));

jest.mock('@UI/Buttons/buttons', () => ({
  CancelStyledButton: (props: any) => (
    <button data-testid='cancel-button' onClick={props.onClick}>
      {props.children || props.label}
    </button>
  )
}));

const ForgotPassword = require('../forgetPassword').default;
const mockForgetPassword = jest.requireMock(
  '@services/common-services'
).forgetPassword;
const mockUseCustomToast = jest.requireMock(
  '@utils/common/toast'
).useCustomToast;
const mockUseAppTheme = jest.requireMock('@hooks/use-app-theme').useAppTheme;

const qc = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <RecoilRoot>
    <QueryClientProvider client={qc}>
      <MantineProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  </RecoilRoot>
);

describe('ForgotPassword Component', () => {
  const mockCloseModal = jest.fn();
  const mockShowSuccessToast = jest.fn();
  const mockShowErrorToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockUseCustomToast.mockReturnValue({
      showSuccessToast: mockShowSuccessToast,
      showErrorToast: mockShowErrorToast
    });
    mockUseAppTheme.mockReturnValue({
      themeConfig: {
        color: '#495057',
        backgroundColor: '#ffffff',
        borderColor: '#dee2e6',
        button: { color: '#495057', textColor: '#ffffff' },
        linkColor: '#dc3545'
      },
      organizationConfig: { organization_name: 'srytal' },
      isDarkTheme: false
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the forgot password form', () => {
    render(
      <Wrapper>
        <ForgotPassword closeModal={mockCloseModal} />
      </Wrapper>
    );

    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your email address')
    ).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('renders helper text with back to login', () => {
    render(
      <Wrapper>
        <ForgotPassword closeModal={mockCloseModal} />
      </Wrapper>
    );

    expect(screen.getByText('Remember your password?')).toBeInTheDocument();
    expect(screen.getByText('Back to Login')).toBeInTheDocument();
  });

  it('shows validation error for empty email', async () => {
    render(
      <Wrapper>
        <ForgotPassword closeModal={mockCloseModal} />
      </Wrapper>
    );

    fireEvent.click(screen.getByText('Send'));

    await waitFor(() => {
      expect(screen.getByText('Email address is required')).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    render(
      <Wrapper>
        <ForgotPassword closeModal={mockCloseModal} />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText('Enter your email address');
    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByText('Send'));

    await waitFor(() => {
      expect(
        screen.getByText('Please enter a valid email address')
      ).toBeInTheDocument();
    });
  });

  it('submits form successfully and shows email sent state', async () => {
    mockForgetPassword.mockResolvedValue({
      message: 'Password reset link sent!'
    });

    render(
      <Wrapper>
        <ForgotPassword closeModal={mockCloseModal} />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText('Enter your email address');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Send'));

    await waitFor(() => {
      expect(mockForgetPassword).toHaveBeenCalledWith('test@example.com');
    });

    await waitFor(() => {
      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Password reset link sent!'
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Check Your Email')).toBeInTheDocument();
    });
  });

  it('handles submission error', async () => {
    mockForgetPassword.mockRejectedValue({
      response: { data: { message: 'User not found' } }
    });

    render(
      <Wrapper>
        <ForgotPassword closeModal={mockCloseModal} />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText('Enter your email address');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Send'));

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith('User not found');
    });
  });

  it('handles generic error response', async () => {
    mockForgetPassword.mockRejectedValue({});

    render(
      <Wrapper>
        <ForgotPassword closeModal={mockCloseModal} />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText('Enter your email address');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Send'));

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith(
        'Failed to send reset link. Please try again.'
      );
    });
  });

  it('calls closeModal when cancel is clicked', () => {
    render(
      <Wrapper>
        <ForgotPassword closeModal={mockCloseModal} />
      </Wrapper>
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it('calls closeModal when back to login is clicked', () => {
    render(
      <Wrapper>
        <ForgotPassword closeModal={mockCloseModal} />
      </Wrapper>
    );

    fireEvent.click(screen.getByText('Back to Login'));
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it('auto-closes modal after 3 seconds on success', async () => {
    mockForgetPassword.mockResolvedValue({ message: 'OK' });

    render(
      <Wrapper>
        <ForgotPassword closeModal={mockCloseModal} />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText('Enter your email address');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Send'));

    await waitFor(() => {
      expect(screen.getByText('Check Your Email')).toBeInTheDocument();
    });

    jest.advanceTimersByTime(3000);

    expect(mockCloseModal).toHaveBeenCalled();
  });

  it('shows back to login on email sent screen', async () => {
    mockForgetPassword.mockResolvedValue({ message: 'OK' });

    render(
      <Wrapper>
        <ForgotPassword closeModal={mockCloseModal} />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText('Enter your email address');
    fireEvent.change(input, { target: { value: 'user@test.com' } });
    fireEvent.click(screen.getByText('Send'));

    await waitFor(() => {
      expect(screen.getByText('Check Your Email')).toBeInTheDocument();
    });

    const backBtn = screen.getByText('Back to Login');
    fireEvent.click(backBtn);
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it('strips spaces from email input', () => {
    render(
      <Wrapper>
        <ForgotPassword closeModal={mockCloseModal} />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText('Enter your email address');
    fireEvent.change(input, { target: { value: 'test @example.com' } });
    expect(input).toHaveValue('test@example.com');
  });
});
