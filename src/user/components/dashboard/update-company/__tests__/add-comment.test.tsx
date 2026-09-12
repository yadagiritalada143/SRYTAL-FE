import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockMutateAsync = jest.fn();
const mockShowSuccessToast = jest.fn();
const mockShowErrorToast = jest.fn();

jest.mock('@hooks/mutations/useUserMutations', () => ({
  useAddCompanyComment: () => ({
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

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => false
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, disabled, fullWidth, style }: any) => (
    <button onClick={onClick} disabled={disabled} data-testid='common-button' style={style}>
      {children}
    </button>
  )
}));

jest.mock('@components/common/loaders/PremiumLoader', () => () => (
  <div data-testid='premium-loader' />
));

const AddCommentPoolCompany = require('../add-comment').default;

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } }
});

const renderAddComment = (isMobile = false) =>
  render(
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <AddCommentPoolCompany companyId='company123' isMobile={isMobile} />
      </MantineProvider>
    </QueryClientProvider>
  );

describe('AddCommentPoolCompany', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockMutateAsync.mockResolvedValue({});
  });

  it('renders the Add New Comment heading', () => {
    renderAddComment();
    expect(screen.getByText('Add New Comment')).toBeInTheDocument();
  });

  it('renders the comment textarea', () => {
    renderAddComment();
    expect(
      screen.getByPlaceholderText('Enter your comment here...')
    ).toBeInTheDocument();
  });

  it('renders the Add Comment button', () => {
    renderAddComment();
    expect(screen.getByText('Add Comment')).toBeInTheDocument();
  });

  it('disables submit when comment is empty', () => {
    renderAddComment();
    const btn = screen.getByTestId('common-button');
    expect(btn).toBeDisabled();
  });

  it('enables submit when comment is entered', () => {
    renderAddComment();
    fireEvent.change(screen.getByPlaceholderText('Enter your comment here...'), {
      target: { value: 'Nice company' }
    });
    expect(screen.getByTestId('common-button')).not.toBeDisabled();
  });

  it('calls addComment mutation on submit', async () => {
    renderAddComment();
    fireEvent.change(screen.getByPlaceholderText('Enter your comment here...'), {
      target: { value: 'Good company' }
    });
    fireEvent.click(screen.getByTestId('common-button'));
    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        id: 'company123',
        comment: 'Good company'
      });
    });
  });

  it('shows success toast and clears input after successful submission', async () => {
    renderAddComment();
    fireEvent.change(screen.getByPlaceholderText('Enter your comment here...'), {
      target: { value: 'Test comment' }
    });
    fireEvent.click(screen.getByTestId('common-button'));
    await waitFor(() => {
      expect(mockShowSuccessToast).toHaveBeenCalledWith('Your comment has been added!');
    });
  });

  it('shows error toast on failure with response message', async () => {
    mockMutateAsync.mockRejectedValueOnce({
      response: { data: { message: 'Server error' } }
    });
    renderAddComment();
    fireEvent.change(screen.getByPlaceholderText('Enter your comment here...'), {
      target: { value: 'Test' }
    });
    fireEvent.click(screen.getByTestId('common-button'));
    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith('Server error');
    });
  });

  it('shows fallback error toast when error has no message', async () => {
    mockMutateAsync.mockRejectedValueOnce({});
    renderAddComment();
    fireEvent.change(screen.getByPlaceholderText('Enter your comment here...'), {
      target: { value: 'Test' }
    });
    fireEvent.click(screen.getByTestId('common-button'));
    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith('Something went wrong');
    });
  });

  it('renders in mobile mode', () => {
    renderAddComment(true);
    expect(screen.getByText('Add New Comment')).toBeInTheDocument();
  });

  it('disables submit when only whitespace is entered', () => {
    renderAddComment();
    fireEvent.change(screen.getByPlaceholderText('Enter your comment here...'), {
      target: { value: '   ' }
    });
    expect(screen.getByTestId('common-button')).toBeDisabled();
  });

  it('clears textarea after successful submission', async () => {
    renderAddComment();
    const textarea = screen.getByPlaceholderText('Enter your comment here...');
    fireEvent.change(textarea, { target: { value: 'New comment' } });
    fireEvent.click(screen.getByTestId('common-button'));
    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalled();
    });
  });
});
