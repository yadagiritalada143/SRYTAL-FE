import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UpdatePoolCandidateForm from '../update-candidate';

let mockCandidate: any = null;
let mockIsLoading = true;

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

jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: jest.fn(),
    showErrorToast: jest.fn()
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
  useDisclosure: () => [false, { open: jest.fn(), close: jest.fn() }]
}));

jest.mock('@components/common/loaders/DataView', () => (props: any) => (
  <div data-testid='data-view'>{props.children}</div>
));

jest.mock('@components/common/page-header/PageHeader', () => (props: any) => (
  <div data-testid='page-header'>
    <span>{props.title}</span>
    <span>{props.subtitle}</span>
  </div>
));

jest.mock('@components/common/style-components/buttons', () => ({
  BackButton: () => <button data-testid='back-button'>Back</button>
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, type }: any) => (
    <button
      type={type}
      onClick={onClick}
      data-testid={`common-button-${type || 'button'}`}
    >
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

describe('UpdatePoolCandidateForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCandidate = null;
    mockIsLoading = true;
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

  it('renders add comment section', () => {
    mockCandidate = {
      _id: 'cand123',
      candidateName: 'Test Candidate',
      contact: { email: 'test@test.com', phone: '1234567890' },
      totalYearsOfExperience: 5,
      relaventYearsOfExperience: 3,
      evaluatedSkills: 'React,TypeScript',
      comments: []
    };
    mockIsLoading = false;
    renderForm();
    expect(screen.getByTestId('add-comment-section')).toBeInTheDocument();
  });

  it('renders comments table with candidate comments', () => {
    mockCandidate = {
      _id: 'cand123',
      candidateName: 'Test Candidate',
      contact: { email: 'test@test.com', phone: '1234567890' },
      totalYearsOfExperience: 5,
      relaventYearsOfExperience: 3,
      evaluatedSkills: 'React',
      comments: [{ comment: 'Good' }, { comment: 'Great' }]
    };
    mockIsLoading = false;
    renderForm();
    expect(screen.getByTestId('comments-table')).toBeInTheDocument();
    expect(screen.getByText('Comments: 2')).toBeInTheDocument();
  });

  it('renders page header with correct title', () => {
    mockCandidate = {
      _id: 'cand123',
      candidateName: 'Test',
      contact: { email: 'a@b.com', phone: '1234567890' },
      totalYearsOfExperience: 2,
      relaventYearsOfExperience: 1,
      evaluatedSkills: '',
      comments: []
    };
    mockIsLoading = false;
    renderForm();
    expect(screen.getByTestId('page-header')).toHaveTextContent(
      'Edit Candidate Details'
    );
  });
});
