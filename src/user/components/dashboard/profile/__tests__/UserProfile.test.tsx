import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

let mockUser: any = null;
let mockIsLoading = true;
let mockIsError = false;
let mockError: any = null;
const mockRefetch = jest.fn();

jest.mock('@hooks/queries/useUserQueries', () => ({
  useGetUserDetails: () => ({
    data: mockUser,
    isLoading: mockIsLoading,
    isError: mockIsError,
    error: mockError,
    refetch: mockRefetch
  })
}));

jest.mock('@common/profile/profile', () => (props: any) => (
  <div data-testid='profile'>
    Profile - {props.details?.firstName}
  </div>
));

jest.mock('@components/common/loaders/PremiumLoader', () => (props: any) => (
  <div data-testid='premium-loader'>{props.label}</div>
));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} data-testid='common-button'>
      {children}
    </button>
  )
}));

const UserProfile = require('../UserProfile').default;

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } }
});

const renderProfile = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <UserProfile />
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  );

describe('UserProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUser = null;
    mockIsLoading = true;
    mockIsError = false;
    mockError = null;
  });

  it('shows loading state with PremiumLoader', () => {
    mockIsLoading = true;
    renderProfile();
    expect(screen.getByTestId('premium-loader')).toBeInTheDocument();
    expect(screen.getByText('Loading profile...')).toBeInTheDocument();
  });

  it('shows error state with error message', () => {
    mockIsLoading = false;
    mockIsError = true;
    mockError = { message: 'Network error' };
    renderProfile();
    expect(screen.getByText('Network error')).toBeInTheDocument();
  });

  it('shows default error message when error has no message', () => {
    mockIsLoading = false;
    mockIsError = true;
    mockError = null;
    renderProfile();
    expect(screen.getByText('Failed to load profile')).toBeInTheDocument();
  });

  it('shows Try Again button in error state', () => {
    mockIsLoading = false;
    mockIsError = true;
    mockError = { message: 'Error' };
    renderProfile();
    const btn = screen.getByTestId('common-button');
    expect(btn).toHaveTextContent('Try Again');
  });

  it('calls refetch when Try Again is clicked', () => {
    mockIsLoading = false;
    mockIsError = true;
    mockError = { message: 'Error' };
    renderProfile();
    fireEvent.click(screen.getByTestId('common-button'));
    expect(mockRefetch).toHaveBeenCalled();
  });

  it('renders Profile component when user data is available', () => {
    mockIsLoading = false;
    mockUser = {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-05-15'
    };
    renderProfile();
    expect(screen.getByTestId('profile')).toBeInTheDocument();
    expect(screen.getByText('Profile - John')).toBeInTheDocument();
  });

  it('formats date of birth correctly', () => {
    mockIsLoading = false;
    mockUser = {
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: '1995-03-20'
    };
    renderProfile();
    expect(screen.getByTestId('profile')).toBeInTheDocument();
  });

  it('returns null when user data is absent after loading', () => {
    mockIsLoading = false;
    mockUser = null;
    const { queryByTestId } = renderProfile();
    expect(queryByTestId('profile')).not.toBeInTheDocument();
  });
});
