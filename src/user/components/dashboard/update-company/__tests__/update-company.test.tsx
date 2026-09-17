import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

let mockCompany: any = null;
let mockIsLoading = true;
let disclosureOpened = false;
const mockDisclosureOpen = jest.fn(() => { disclosureOpened = true; });
const mockDisclosureClose = jest.fn(() => { disclosureOpened = false; });

jest.mock('@hooks/queries/useUserQueries', () => ({
  useGetCompanyById: () => ({
    data: mockCompany,
    isLoading: mockIsLoading
  })
}));

const mockUpdateCompany = jest.fn().mockResolvedValue({});
const mockDeleteCompany = jest.fn().mockResolvedValue({});

jest.mock('@hooks/mutations/useUserMutations', () => ({
  useUpdateCompany: () => ({
    mutateAsync: mockUpdateCompany,
    isPending: false
  }),
  useAddCompanyComment: () => ({
    mutateAsync: jest.fn().mockResolvedValue({}),
    isPending: false
  })
}));

jest.mock('@hooks/mutations/useAdminMutations', () => ({
  useDeletePoolCompanyByAdmin: () => ({
    mutateAsync: mockDeleteCompany,
    isPending: false
  })
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ companyId: 'comp123' })
}));

const mockShowSuccessToast = jest.fn();
const mockShowErrorToast = jest.fn();
jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: mockShowSuccessToast,
    showErrorToast: mockShowErrorToast
  })
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    organizationConfig: { organization_name: 'srytal' }
  })
}));

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => false,
  useDisclosure: () => [disclosureOpened, { open: mockDisclosureOpen, close: mockDisclosureClose }]
}));

jest.mock('@components/common/loaders/DataView', () => (props: any) => (
  <div data-testid='data-view'>{props.children}</div>
));

jest.mock('@components/common/page-header/PageHeader', () => (props: any) => (
  <div data-testid='page-header'>
    <span>{props.title}</span>
    <div data-testid='page-header-actions'>{props.actions}</div>
  </div>
));

jest.mock('@components/common/style-components/buttons', () => ({
  BackButton: () => <button data-testid='back-button'>Back</button>
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, type, disabled, loading, color }: any) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      data-testid={`common-button-${color || type || 'button'}`}
    >
      {children}
    </button>
  )
}));

jest.mock('@components/common/loaders/PremiumLoader', () => () => (
  <div data-testid='premium-loader' />
));

jest.mock('@components/UI/Models/base-model', () => ({
  StandardModal: ({ children, opened, title }: any) =>
    opened ? (
      <div data-testid='modal'>
        {title}
        {children}
      </div>
    ) : null
}));

jest.mock('../add-comment', () => (props: any) => (
  <div data-testid='add-comment-section'>
    AddComment - {props.companyId}
  </div>
));

jest.mock('../comments', () => (props: any) => (
  <div data-testid='comments-table'>
    Comments: {props.comments?.length || 0}
  </div>
));

const UpdateCompany = require('../update-company').default;

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } }
});

const sampleCompany = {
  _id: 'comp123',
  companyName: 'Acme Corp',
  status: 'Created',
  primaryContact: { name: 'John', email: 'john@acme.com', phone: '1234567890' },
  secondaryContact_1: { name: 'Jane', email: 'jane@acme.com', phone: '0987654321' },
  secondaryContact_2: { name: 'Bob', email: 'bob@acme.com', phone: '5555555555' },
  comments: []
};

const renderUpdateCompany = () =>
  render(
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <BrowserRouter
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            <UpdateCompany />
          </BrowserRouter>
        </MantineProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );

describe('UpdateCompany', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCompany = null;
    mockIsLoading = true;
    disclosureOpened = false;
    mockUpdateCompany.mockResolvedValue({});
    mockDeleteCompany.mockResolvedValue({});
  });

  it('renders page header while loading', () => {
    renderUpdateCompany();
    expect(
      screen.getByText('Update Company Details')
    ).toBeInTheDocument();
  });

  it('renders data view wrapper', () => {
    renderUpdateCompany();
    expect(screen.getByTestId('data-view')).toBeInTheDocument();
  });

  it('renders the page header with title', () => {
    renderUpdateCompany();
    expect(screen.getByTestId('page-header')).toHaveTextContent(
      'Update Company Details'
    );
  });

  it('renders add comment section with correct companyId', () => {
    mockCompany = { ...sampleCompany };
    mockIsLoading = false;
    renderUpdateCompany();
    expect(screen.getByTestId('add-comment-section')).toHaveTextContent(
      'comp123'
    );
  });

  it('renders comments table with company comments', () => {
    mockCompany = {
      ...sampleCompany,
      comments: [{ comment: 'Test' }]
    };
    mockIsLoading = false;
    renderUpdateCompany();
    expect(screen.getByTestId('comments-table')).toHaveTextContent('Comments: 1');
  });

  it('renders empty comments table when no comments', () => {
    mockCompany = { ...sampleCompany, comments: [] };
    mockIsLoading = false;
    renderUpdateCompany();
    expect(screen.getByTestId('comments-table')).toHaveTextContent('Comments: 0');
  });

  it('populates form fields when company data is loaded', () => {
    mockCompany = { ...sampleCompany };
    mockIsLoading = false;
    renderUpdateCompany();
    expect(screen.getByDisplayValue('Acme Corp')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@acme.com')).toBeInTheDocument();
  });

  it('renders status select with correct options', () => {
    mockCompany = { ...sampleCompany };
    mockIsLoading = false;
    renderUpdateCompany();
    expect(screen.getByText('Select Status')).toBeInTheDocument();
  });

  it('renders primary contact fields', () => {
    mockCompany = { ...sampleCompany };
    mockIsLoading = false;
    renderUpdateCompany();
    expect(screen.getByText('Primary Contact')).toBeInTheDocument();
  });

  it('renders secondary contact 1 and 2 sections', () => {
    mockCompany = { ...sampleCompany };
    mockIsLoading = false;
    renderUpdateCompany();
    expect(screen.getByText('Secondary Contact 1')).toBeInTheDocument();
    expect(screen.getByText('Secondary Contact 2')).toBeInTheDocument();
  });

  it('submits form successfully and navigates back', async () => {
    mockCompany = { ...sampleCompany };
    mockIsLoading = false;
    renderUpdateCompany();

    fireEvent.click(screen.getByTestId('common-button-submit'));

    await waitFor(() => {
      expect(mockUpdateCompany).toHaveBeenCalled();
      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Company details updated successfully !'
      );
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });

  it('shows error toast on update failure with message', async () => {
    mockUpdateCompany.mockRejectedValueOnce({
      response: { data: { message: 'Update failed' } }
    });
    mockCompany = { ...sampleCompany };
    mockIsLoading = false;
    renderUpdateCompany();

    fireEvent.click(screen.getByTestId('common-button-submit'));

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith('Update failed');
    });
  });

  it('shows fallback error on update failure with no message', async () => {
    mockUpdateCompany.mockRejectedValueOnce({});
    mockCompany = { ...sampleCompany };
    mockIsLoading = false;
    renderUpdateCompany();

    fireEvent.click(screen.getByTestId('common-button-submit'));

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith('Something went wrong');
    });
  });

  it('shows delete confirmation modal on Delete button click', () => {
    mockCompany = { ...sampleCompany };
    mockIsLoading = false;
    disclosureOpened = true;
    renderUpdateCompany();
    fireEvent.click(screen.getAllByTestId('common-button-red')[0]);
    expect(mockDisclosureOpen).toHaveBeenCalled();
    expect(
      screen.getByText('Sure want to delete this Company?')
    ).toBeInTheDocument();
  });

  it('disables delete button when confirm checkbox is not checked', () => {
    mockCompany = { ...sampleCompany };
    mockIsLoading = false;
    disclosureOpened = true;
    renderUpdateCompany();
    const deleteButtons = screen.getAllByText('Delete');
    const disabledButtons = deleteButtons.filter(
      (el) => el.closest('button')?.hasAttribute('disabled')
    );
    expect(disabledButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('calls deleteCompany with correct arguments', async () => {
    mockCompany = { ...sampleCompany };
    mockIsLoading = false;
    disclosureOpened = true;
    renderUpdateCompany();

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);

    const deleteButtons = screen.getAllByText('Delete');
    const deleteBtn = deleteButtons.find(
      (el) => !el.closest('button')?.hasAttribute('disabled')
    );
    fireEvent.click(deleteBtn!.closest('button')!);

    await waitFor(() => {
      expect(mockDeleteCompany).toHaveBeenCalledWith({
        companyId: 'comp123',
        confirmDelete: true
      });
    });
  });

  it('shows success toast after successful delete', async () => {
    mockCompany = { ...sampleCompany };
    mockIsLoading = false;
    disclosureOpened = true;
    renderUpdateCompany();

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);

    const deleteButtons = screen.getAllByText('Delete');
    const deleteBtn = deleteButtons.find(
      (el) => !el.closest('button')?.hasAttribute('disabled')
    );
    fireEvent.click(deleteBtn!.closest('button')!);

    await waitFor(() => {
      expect(mockShowSuccessToast).toHaveBeenCalledWith('Company deleted successfully!');
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });

  it('shows error toast on delete failure', async () => {
    mockDeleteCompany.mockRejectedValueOnce({
      response: { data: { message: 'Delete failed' } }
    });
    mockCompany = { ...sampleCompany };
    mockIsLoading = false;
    disclosureOpened = true;
    renderUpdateCompany();

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);

    const deleteButtons = screen.getAllByText('Delete');
    const deleteBtn = deleteButtons.find(
      (el) => !el.closest('button')?.hasAttribute('disabled')
    );
    fireEvent.click(deleteBtn!.closest('button')!);

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith('Delete failed');
    });
  });

  it('shows fallback error on delete failure with no message', async () => {
    mockDeleteCompany.mockRejectedValueOnce({});
    mockCompany = { ...sampleCompany };
    mockIsLoading = false;
    disclosureOpened = true;
    renderUpdateCompany();

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);

    const deleteButtons = screen.getAllByText('Delete');
    const deleteBtn = deleteButtons.find(
      (el) => !el.closest('button')?.hasAttribute('disabled')
    );
    fireEvent.click(deleteBtn!.closest('button')!);

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith('Something went wrong');
    });
  });

  it('renders back button', () => {
    renderUpdateCompany();
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
  });

  it('renders with company comments from data', () => {
    mockCompany = {
      ...sampleCompany,
      comments: [{ comment: 'First' }, { comment: 'Second' }]
    };
    mockIsLoading = false;
    renderUpdateCompany();
    expect(screen.getByTestId('comments-table')).toHaveTextContent('Comments: 2');
  });

  it('handles company with no comments property', () => {
    mockCompany = {
      _id: 'comp123',
      companyName: 'Acme Corp',
      status: 'Created',
      primaryContact: {},
      secondaryContact_1: {},
      secondaryContact_2: {}
    };
    mockIsLoading = false;
    renderUpdateCompany();
    expect(screen.getByTestId('comments-table')).toHaveTextContent('Comments: 0');
  });

  it('renders company name input as disabled', () => {
    mockCompany = { ...sampleCompany };
    mockIsLoading = false;
    renderUpdateCompany();
    const companyNameInput = screen.getByDisplayValue('Acme Corp');
    expect(companyNameInput).toBeDisabled();
  });
});
