import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { act } from 'react';

let mockUser: any = null;
let mockIsLoading = false;
let mockIsError = false;
let mockError: any = undefined;
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

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => false
}));

jest.mock('@components/common/loaders/PremiumLoader', () => (props: any) => (
  <div data-testid='premium-loader'>{props.label || 'loading'}</div>
));

jest.mock('@common/profile/profile', () => (props: any) => (
  <div data-testid='profile'>
    <span>Profile rendered</span>
    <span data-testid='details-name'>{props.details?.firstName}</span>
    <span data-testid='details-dob'>{props.details?.dateOfBirth}</span>
  </div>
));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({
    children,
    onClick
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => <button onClick={onClick}>{children}</button>
}));

import AdminProfile from '../AdminProfile';

const renderProfile = () =>
  render(
    <MantineProvider>
      <AdminProfile />
    </MantineProvider>
  );

describe('AdminProfile Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUser = null;
    mockIsLoading = false;
    mockIsError = false;
    mockError = undefined;
    mockRefetch.mockReset();
  });

  describe('Loading state', () => {
    it('renders the premium loader while loading', () => {
      mockIsLoading = true;
      renderProfile();
      expect(screen.getByTestId('premium-loader')).toBeInTheDocument();
    });
  });

  describe('Error state', () => {
    beforeEach(() => {
      mockIsError = true;
    });

    it('shows the error message from the query', () => {
      mockError = new Error('Something failed');
      renderProfile();
      expect(screen.getByText('Something failed')).toBeInTheDocument();
    });

    it('shows a fallback message when error has no message', () => {
      mockError = {};
      renderProfile();
      expect(screen.getByText('Failed to load profile')).toBeInTheDocument();
    });

    it('calls refetch when Try Again is clicked', async () => {
      mockError = new Error('Something failed');
      renderProfile();
      await act(async () => {
        fireEvent.click(screen.getByText('Try Again'));
      });
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  describe('Data display', () => {
    beforeEach(() => {
      mockUser = {
        id: 'usr1',
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@srytal.com',
        dateOfBirth: '1995-06-15T00:00:00.000Z',
        userRole: 'Admin'
      };
    });

    it('renders the Profile component with the user details', () => {
      renderProfile();
      expect(screen.getByTestId('profile')).toBeInTheDocument();
      expect(screen.getByTestId('details-name')).toHaveTextContent('Alice');
    });

    it('formats the date of birth to dd-Mon-yyyy', () => {
      renderProfile();
      const dob = screen.getByTestId('details-dob').textContent;
      expect(dob).toMatch(/^\d{2}-[A-Za-z]{3}-\d{4}$/);
    });

    it('passes an empty date of birth when none is present', () => {
      mockUser = { ...mockUser, dateOfBirth: undefined };
      renderProfile();
      expect(screen.getByTestId('details-dob')).toHaveTextContent('');
    });
  });

  it('renders nothing when there is no user and no error', () => {
    const { container } = renderProfile();
    expect(container.querySelector('[data-testid="profile"]')).toBeNull();
    expect(
      container.querySelector('[data-testid="premium-loader"]')
    ).toBeNull();
  });
});
