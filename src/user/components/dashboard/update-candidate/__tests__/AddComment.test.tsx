import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddComment from '../add-comment';

const mockMutateAsync = jest.fn();
jest.mock('@hooks/mutations/useUserMutations', () => ({
  useAddCandidateComment: () => ({
    mutateAsync: mockMutateAsync,
    isPending: false
  })
}));

jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: jest.fn(),
    showErrorToast: jest.fn()
  })
}));

jest.mock('@utils/common/constants', () => ({
  organizationAdminUrls: (org: string) => `/${org}/admin`,
  BASE_URL: 'http://localhost:3000'
}));

jest.mock('@constants', () => ({
  BASE_URL: 'http://localhost:3000'
}));

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => false
}));

jest.mock('@common/style-components/buttons', () => ({
  BackButton: () => <button data-testid='back-button'>Back</button>
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, type, disabled }: any) => (
    <button type={type} disabled={disabled} data-testid='common-button'>
      {children}
    </button>
  )
}));

jest.mock('@components/common/loaders/PremiumLoader', () => (props: any) => (
  <div data-testid='premium-loader'>{props.label || 'loader'}</div>
));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } }
});

const renderAddComment = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <AddComment candidateId='candidate123' />
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  );

describe('AddComment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Add Comment heading', () => {
    renderAddComment();
    expect(screen.getAllByText('Add Comment').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the comment textarea', () => {
    renderAddComment();
    expect(
      screen.getByPlaceholderText('Enter your comment here...')
    ).toBeInTheDocument();
  });

  it('renders Call Start Time field', () => {
    renderAddComment();
    expect(screen.getByText('Call Start Time')).toBeInTheDocument();
  });

  it('renders Call End Time field', () => {
    renderAddComment();
    expect(screen.getByText('Call End Time')).toBeInTheDocument();
  });

  it('renders the Add Comment button', () => {
    renderAddComment();
    expect(screen.getAllByText('Add Comment').length).toBeGreaterThanOrEqual(1);
  });
});
