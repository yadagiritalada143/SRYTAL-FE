import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UpdatePoolCandidateForm from '../update-candidate';

let mockCandidate: any = null;
let mockIsLoading = true;
let disclosureOpened = false;
const mockDisclosureOpen = jest.fn(() => { disclosureOpened = true; });
const mockDisclosureClose = jest.fn(() => { disclosureOpened = false; });

jest.mock('@hooks/queries/useUserQueries', () => ({
  useGetPoolCandidateById: () => ({
    data: mockCandidate,
    isLoading: mockIsLoading
  })
}));

jest.mock('@utils/common/constants', () => ({
  organizationAdminUrls: (org: string) => `/${org}/admin`,
  BASE_URL: 'http://localhost:3000'
}));

jest.mock('@constants', () => ({
  BASE_URL: 'http://localhost:3000'
}));

const mockUpdateCandidate = jest.fn().mockResolvedValue({});
const mockDeleteCandidate = jest.fn().mockResolvedValue({});

jest.mock('@hooks/mutations/useUserMutations', () => ({
  useUpdateCandidate: () => ({
    mutateAsync: mockUpdateCandidate,
    isPending: false
  }),
  useAddCandidateComment: () => ({
    mutateAsync: jest.fn().mockResolvedValue({}),
    isPending: false
  })
}));

jest.mock('@hooks/mutations/useAdminMutations', () => ({
  useDeletePoolCandidatesByAdmin: () => ({
    mutateAsync: mockDeleteCandidate,
    isPending: false
  })
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ candidateId: 'cand123' })
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
    <span>{props.subtitle}</span>
    <div data-testid='page-header-actions'>{props.actions}</div>
  </div>
));

jest.mock('@components/common/style-components/buttons', () => ({
  BackButton: () => <button data-testid='back-button'>Back</button>
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, type, disabled, loading, leftSection }: any) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      data-testid={`common-button-${type || 'button'}`}
    >
      {leftSection}
      {children}
    </button>
  )
}));

jest.mock('@components/common/loaders/PremiumLoader', () => () => (
  <div data-testid='premium-loader' />
));

jest.mock('@components/UI/Models/base-model', () => ({
  StandardModal: ({ children, opened }: any) =>
    opened ? <div data-testid='modal'>{children}</div> : null
}));

jest.mock('../add-comment', () => () => (
  <div data-testid='add-comment-section'>AddComment</div>
));

jest.mock('../comments-table', () => (props: any) => (
  <div data-testid='comments-table'>
    Comments: {props.comments?.length || 0}
  </div>
));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } }
});

const renderForm = () =>
  render(
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <BrowserRouter
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            <UpdatePoolCandidateForm />
          </BrowserRouter>
        </MantineProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );

const sampleCandidate = {
  _id: 'cand123',
  candidateName: 'Test Candidate',
  contact: { email: 'test@test.com', phone: '1234567890' },
  totalYearsOfExperience: 5,
  relaventYearsOfExperience: 3,
  evaluatedSkills: 'React,TypeScript',
  comments: []
};

describe('UpdatePoolCandidateForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCandidate = null;
    mockIsLoading = true;
    disclosureOpened = false;
    mockUpdateCandidate.mockResolvedValue({});
    mockDeleteCandidate.mockResolvedValue({});
  });

  it('renders page header while loading', () => {
    renderForm();
    expect(screen.getByText('Edit Candidate Details')).toBeInTheDocument();
    expect(screen.getByText(/Update this candidate/i)).toBeInTheDocument();
  });

  it('renders data view wrapper', () => {
    renderForm();
    expect(screen.getByTestId('data-view')).toBeInTheDocument();
  });

  it('renders back button', () => {
    renderForm();
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
  });

  it('renders add comment and comments table sections when data loaded', () => {
    mockCandidate = { ...sampleCandidate };
    mockIsLoading = false;
    renderForm();
    expect(screen.getByTestId('add-comment-section')).toBeInTheDocument();
    expect(screen.getByTestId('comments-table')).toBeInTheDocument();
  });

  it('renders comments table with candidate comments count', () => {
    mockCandidate = {
      ...sampleCandidate,
      comments: [{ comment: 'Good' }, { comment: 'Great' }]
    };
    mockIsLoading = false;
    renderForm();
    expect(screen.getByText('Comments: 2')).toBeInTheDocument();
  });

  it('populates form fields when candidate data is loaded', () => {
    mockCandidate = { ...sampleCandidate };
    mockIsLoading = false;
    renderForm();
    expect(screen.getByDisplayValue('Test Candidate')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@test.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
  });

  it('shows evaluated skills as badges', () => {
    mockCandidate = { ...sampleCandidate };
    mockIsLoading = false;
    renderForm();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('adds a new skill via text input and Enter key', () => {
    mockCandidate = { ...sampleCandidate, evaluatedSkills: '' };
    mockIsLoading = false;
    renderForm();
    const skillInput = screen.getByPlaceholderText('Type a skill and press Enter');
    fireEvent.change(skillInput, { target: { value: 'Node.js' } });
    fireEvent.keyDown(skillInput, { key: 'Enter' });
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('adds a new skill via Add button click', () => {
    mockCandidate = { ...sampleCandidate, evaluatedSkills: '' };
    mockIsLoading = false;
    renderForm();
    const skillInput = screen.getByPlaceholderText('Type a skill and press Enter');
    fireEvent.change(skillInput, { target: { value: 'Python' } });
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('does not add duplicate skills', () => {
    mockCandidate = { ...sampleCandidate };
    mockIsLoading = false;
    renderForm();
    const skillInput = screen.getByPlaceholderText('Type a skill and press Enter');
    fireEvent.change(skillInput, { target: { value: 'React' } });
    fireEvent.click(screen.getByText('Add'));
    const badges = screen.getAllByText('React');
    expect(badges.length).toBe(1);
  });

  it('does not add empty skill', () => {
    mockCandidate = { ...sampleCandidate, evaluatedSkills: '' };
    mockIsLoading = false;
    renderForm();
    const skillInput = screen.getByPlaceholderText('Type a skill and press Enter');
    fireEvent.change(skillInput, { target: { value: '  ' } });
    fireEvent.click(screen.getByText('Add'));
  });

  it('submits form successfully and navigates back', async () => {
    mockCandidate = { ...sampleCandidate };
    mockIsLoading = false;
    renderForm();

    fireEvent.click(screen.getByText('Update Candidate'));

    await waitFor(() => {
      expect(mockUpdateCandidate).toHaveBeenCalled();
      expect(mockShowSuccessToast).toHaveBeenCalledWith('Candidate updated successfully!');
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });

  it('shows error toast on update failure', async () => {
    mockUpdateCandidate.mockRejectedValueOnce({
      response: { data: { message: 'Update failed' } }
    });
    mockCandidate = { ...sampleCandidate };
    mockIsLoading = false;
    renderForm();

    fireEvent.click(screen.getByText('Update Candidate'));

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith('Update failed');
    });
  });

  it('shows fallback error on update failure with no message', async () => {
    mockUpdateCandidate.mockRejectedValueOnce({});
    mockCandidate = { ...sampleCandidate };
    mockIsLoading = false;
    renderForm();

    fireEvent.click(screen.getByText('Update Candidate'));

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith('Failed to update candidate');
    });
  });

  it('shows delete confirmation modal on Delete button click', () => {
    mockCandidate = { ...sampleCandidate };
    mockIsLoading = false;
    renderForm();
    fireEvent.click(screen.getByText('Delete Candidate'));
    expect(mockDisclosureOpen).toHaveBeenCalled();
  });

  it('disables delete button when confirm checkbox is not checked', () => {
    mockCandidate = { ...sampleCandidate };
    mockIsLoading = false;
    disclosureOpened = true;
    renderForm();
    expect(screen.getByText('Sure want to delete this Candidate?')).toBeInTheDocument();
  });

  it('renders form with number inputs for experience', () => {
    mockCandidate = { ...sampleCandidate };
    mockIsLoading = false;
    renderForm();
    expect(screen.getByText('Total Experience (Years)')).toBeInTheDocument();
    expect(screen.getByText('Relevant Experience (Years)')).toBeInTheDocument();
  });

  it('renders form with contact fields', () => {
    mockCandidate = { ...sampleCandidate };
    mockIsLoading = false;
    renderForm();
    expect(screen.getByText('Candidate Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
  });

  it('renders with empty comments array', () => {
    mockCandidate = { ...sampleCandidate, comments: [] };
    mockIsLoading = false;
    renderForm();
    expect(screen.getByTestId('comments-table')).toHaveTextContent('Comments: 0');
  });

  it('renders with no evaluatedSkills', () => {
    mockCandidate = { ...sampleCandidate, evaluatedSkills: '' };
    mockIsLoading = false;
    renderForm();
    expect(screen.getByTestId('add-comment-section')).toBeInTheDocument();
  });

  it('populates skills from evaluatedSkills with trailing comma', () => {
    mockCandidate = { ...sampleCandidate, evaluatedSkills: 'React,TypeScript,' };
    mockIsLoading = false;
    renderForm();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders delete button', () => {
    mockCandidate = { ...sampleCandidate };
    mockIsLoading = false;
    renderForm();
    expect(screen.getByText('Delete Candidate')).toBeInTheDocument();
  });

  it('renders update button', () => {
    mockCandidate = { ...sampleCandidate };
    mockIsLoading = false;
    renderForm();
    expect(screen.getByText('Update Candidate')).toBeInTheDocument();
  });
});
