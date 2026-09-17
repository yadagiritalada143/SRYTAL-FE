import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

let mockCompany: any = null;
let mockIsLoading = true;

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
  </div>
));

jest.mock('@components/common/style-components/buttons', () => ({
  BackButton: () => <button data-testid='back-button'>Back</button>
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, type, ...props }: any) => (
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
  StandardModal: ({ children, opened, ...props }: any) =>
    opened ? <div data-testid='modal'>{children}</div> : null
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
    mockCompany = {
      _id: 'comp123',
      companyName: 'Acme Corp',
      status: 'Created',
      primaryContact: { name: 'John', email: 'john@acme.com', phone: '1234567890' },
      secondaryContact_1: {},
      secondaryContact_2: {},
      comments: []
    };
    mockIsLoading = false;
    renderUpdateCompany();
    expect(screen.getByTestId('add-comment-section')).toHaveTextContent(
      'comp123'
    );
  });

  it('renders comments table with company comments', () => {
    mockCompany = {
      _id: 'comp123',
      companyName: 'Acme Corp',
      status: 'Created',
      primaryContact: {},
      secondaryContact_1: {},
      secondaryContact_2: {},
      comments: [{ comment: 'Test' }]
    };
    mockIsLoading = false;
    renderUpdateCompany();
    expect(screen.getByTestId('comments-table')).toHaveTextContent('Comments: 1');
  });

  it('renders empty comments table when no comments', () => {
    mockCompany = {
      _id: 'comp123',
      companyName: 'Acme Corp',
      status: 'Created',
      primaryContact: {},
      secondaryContact_1: {},
      secondaryContact_2: {},
      comments: []
    };
    mockIsLoading = false;
    renderUpdateCompany();
    expect(screen.getByTestId('comments-table')).toHaveTextContent('Comments: 0');
  });
});
