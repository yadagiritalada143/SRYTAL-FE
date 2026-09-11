import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockMutateAsync = jest.fn();
jest.mock('@hooks/mutations/useUserMutations', () => ({
  useAddCompanyComment: () => ({
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

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => false
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, disabled, ...props }: any) => (
    <button onClick={onClick} disabled={disabled} data-testid='common-button'>
      {children}
    </button>
  )
}));

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

  it('renders the Add Comment button with correct text', () => {
    renderAddComment();
    expect(screen.getByText('Add Comment')).toBeInTheDocument();
  });

  it('disables submit when comment is empty', () => {
    renderAddComment();
    const btn = screen.getByTestId('common-button');
    expect(btn).toBeDisabled();
  });

  it('enables submit when comment is entered', async () => {
    renderAddComment();
    const textarea = screen.getByPlaceholderText('Enter your comment here...');
    fireEvent.change(textarea, { target: { value: 'Nice company' } });
    const btn = screen.getByTestId('common-button');
    expect(btn).not.toBeDisabled();
  });

  it('calls addComment mutation on submit', async () => {
    renderAddComment();
    const textarea = screen.getByPlaceholderText('Enter your comment here...');
    fireEvent.change(textarea, { target: { value: 'Good company' } });
    fireEvent.click(screen.getByTestId('common-button'));
    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        id: 'company123',
        comment: 'Good company'
      });
    });
  });

  it('renders in mobile mode', () => {
    renderAddComment(true);
    expect(screen.getByText('Add New Comment')).toBeInTheDocument();
  });
});
