import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddComment from '../add-comment';

const mockMutateAsync = jest.fn();
const mockShowSuccessToast = jest.fn();
const mockShowErrorToast = jest.fn();

jest.mock('@hooks/mutations/useUserMutations', () => ({
  useAddCandidateComment: () => ({
    mutateAsync: mockMutateAsync,
    isPending: false
  })
}));

jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: mockShowSuccessToast,
    showErrorToast: mockShowErrorToast
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

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, type, disabled, leftSection }: any) => (
    <button type={type} disabled={disabled} data-testid='common-button'>
      {leftSection}
      {children}
    </button>
  )
}));

jest.mock('@components/common/loaders/PremiumLoader', () => (props: any) => (
  <div data-testid='premium-loader'>{props.label || 'loader'}</div>
));

jest.mock('@mantine/dates', () => ({
  DateTimePicker: ({ label, onChange, disabled }: any) => (
    <div data-testid={`datetime-${label?.replace(/\s/g, '-')}`}>
      <label>{label}</label>
      <input
        type='text'
        disabled={disabled}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value ? new Date(e.target.value).toISOString() : null);
          }
        }}
      />
    </div>
  )
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
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

const fillValidForm = () => {
  fireEvent.change(screen.getByPlaceholderText('Enter your comment here...'), {
    target: { value: 'Great candidate' }
  });
  const startPicker = screen.getByTestId('datetime-Call-Start-Time');
  fireEvent.change(startPicker.querySelector('input') as HTMLElement, {
    target: { value: '2024-01-15T10:00:00.000Z' }
  });
  const endPicker = screen.getByTestId('datetime-Call-End-Time');
  fireEvent.change(endPicker.querySelector('input') as HTMLElement, {
    target: { value: '2024-01-15T10:30:00.000Z' }
  });
};

describe('AddComment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockMutateAsync.mockResolvedValue({});
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

  it('renders Call Start Time and Call End Time fields', () => {
    renderAddComment();
    expect(screen.getByText('Call Start Time')).toBeInTheDocument();
    expect(screen.getByText('Call End Time')).toBeInTheDocument();
  });

  it('renders the Add Comment submit button', () => {
    renderAddComment();
    const buttons = screen.getAllByText('Add Comment');
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it('submits comment with correct data', async () => {
    renderAddComment();
    fillValidForm();
    fireEvent.click(screen.getByTestId('common-button'));

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'candidate123',
          comment: 'Great candidate'
        })
      );
    });
  });

  it('shows success toast after successful submission', async () => {
    renderAddComment();
    fillValidForm();
    fireEvent.click(screen.getByTestId('common-button'));

    await waitFor(() => {
      expect(mockShowSuccessToast).toHaveBeenCalledWith('Comment added successfully');
    });
  });

  it('shows error toast on mutation failure', async () => {
    mockMutateAsync.mockRejectedValueOnce({
      response: { data: { message: 'Server error' } }
    });
    renderAddComment();
    fillValidForm();
    fireEvent.click(screen.getByTestId('common-button'));

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith('Server error');
    });
  });

  it('shows fallback error toast when error has no message', async () => {
    mockMutateAsync.mockRejectedValueOnce({});
    renderAddComment();
    fillValidForm();
    fireEvent.click(screen.getByTestId('common-button'));

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith('Something went wrong');
    });
  });

  it('renders DateTimePicker for call start time', () => {
    renderAddComment();
    expect(screen.getByTestId('datetime-Call-Start-Time')).toBeInTheDocument();
  });

  it('renders DateTimePicker for call end time', () => {
    renderAddComment();
    expect(screen.getByTestId('datetime-Call-End-Time')).toBeInTheDocument();
  });

  it('renders textarea not disabled by default', () => {
    renderAddComment();
    const textarea = screen.getByPlaceholderText('Enter your comment here...');
    expect(textarea).not.toBeDisabled();
  });

  it('renders button with Add Comment text', () => {
    renderAddComment();
    expect(screen.getAllByText('Add Comment').length).toBeGreaterThanOrEqual(1);
  });
});
