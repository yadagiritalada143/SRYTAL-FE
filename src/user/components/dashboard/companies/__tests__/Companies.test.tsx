import { render, screen, fireEvent, act, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import moment from 'moment';
import Companies from '../companies';

let mockCompanies: any[] = [];
let mockIsLoading = false;
let mockError: any = null;
let mockIsMobile = false;
let mockIsTablet = false;
let mockIsSmallMobile = false;

jest.mock('@constants', () => ({
  ROLES: { ADMIN: 'admin' },
  BASE_URL: 'http://localhost:3000'
}));

jest.mock('@hooks/queries/useUserQueries', () => ({
  useGetCompanyDetails: () => ({
    data: mockCompanies,
    isLoading: mockIsLoading,
    error: mockError
  })
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      headerBackgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    organizationConfig: { organization_name: 'srytal' }
  })
}));

jest.mock('@mantine/core', () => {
  const actual = jest.requireActual('@mantine/core');
  const NativeSelect = ({ data, value, onChange, placeholder }: any) => (
    <select
      data-testid='mantine-select'
      value={value ?? ''}
      onChange={e => onChange?.(e.target.value)}
    >
      {placeholder ? <option value=''>{placeholder}</option> : null}
      {data.map((item: string) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
  return { ...actual, Select: NativeSelect };
});

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: (query: string) => {
    if (query === '(max-width: 768px)') return mockIsMobile;
    if (query === '(max-width: 1024px)') return mockIsTablet;
    if (query === '(max-width: 500px)') return mockIsSmallMobile;
    return false;
  }
}));

jest.mock('@hooks/horizontal-scroll', () => ({
  __esModule: true,
  default: () => ({
    scrollRef: { current: null },
    handleMouseDown: jest.fn(),
    handleMouseMove: jest.fn(),
    handleMouseUp: jest.fn(),
    handleTouchEnd: jest.fn(),
    handleTouchMove: jest.fn(),
    handleTouchStart: jest.fn()
  })
}));

jest.mock('@utils/common/debounce', () => ({
  __esModule: true,
  debounce: (fn: any) => fn
}));

jest.mock(
  '@components/common/loaders/DataView',
  () => (props: any) =>
    props.isLoading ? (
      <div data-testid='data-view-loading' />
    ) : props.isLoading === false && props.isEmpty ? (
      <div data-testid='data-view-empty' />
    ) : (
      <div data-testid='data-view'>{props.children}</div>
    )
);

jest.mock('@components/common/page-header/PageHeader', () => (props: any) => (
  <div data-testid='page-header'>
    <span>{props.title}</span>
    <span>{props.subtitle}</span>
    <span data-testid='page-header-count'>{props.count}</span>
    {props.actions}
  </div>
));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, ...props }: any) => (
    <button type='button' onClick={onClick} disabled={props.disabled}>
      {children}
    </button>
  )
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

const makeCompany = (overrides: any = {}) => ({
  id: 'comp-1',
  companyName: 'Acme Corp',
  primaryContact: {
    name: 'John Doe',
    email: 'john@acme.com',
    phone: '123456789'
  },
  secondaryContact_1: {
    name: 'Jane Doe',
    email: 'jane@acme.com',
    phone: '987654321'
  },
  secondaryContact_2: { name: '', email: '', phone: '' },
  status: 'Active',
  lastUpdatedAt: new Date('2024-03-01T12:00:00Z'),
  comments: [],
  ...overrides
});

const makeCompanies = (count: number, prefix = 'Alpha Corp') =>
  Array.from({ length: count }, (_, i) =>
    makeCompany({
      id: `comp-${i + 1}`,
      companyName: `${prefix} ${String(i + 1).padStart(2, '0')}`,
      primaryContact: {
        name: `Contact ${i + 1}`,
        email: `c${i + 1}@x.com`,
        phone: `900000000${i}`
      }
    })
  );

const renderCompanies = () => {
  return render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Companies />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

const searchFor = (query: string) => {
  fireEvent.change(
    screen.getByPlaceholderText(
      'Search by company name, contact name, email, or phone...'
    ),
    { target: { value: query } }
  );
};

const clickEditIcon = (container: HTMLElement) => {
  const svg = container.querySelector('.tabler-icon-edit') as HTMLElement;
  const button = svg?.closest('button');
  expect(button).toBeTruthy();
  fireEvent.click(button as HTMLButtonElement);
};

describe('Companies', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    localStorage.setItem('userRole', 'employee');
    mockCompanies = [];
    mockIsLoading = false;
    mockError = null;
    mockIsMobile = false;
    mockIsTablet = false;
    mockIsSmallMobile = false;
  });

  describe('Rendering', () => {
    it('renders the page header, subtitle and Add Company button', () => {
      mockCompanies = [makeCompany()];
      renderCompanies();
      expect(screen.getByText('Pool Companies')).toBeInTheDocument();
      expect(
        screen.getByText('Manage the companies in your recruitment pool.')
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Add Company' })
      ).toBeInTheDocument();
      expect(screen.getByTestId('page-header-count')).toHaveTextContent('1');
    });

    it('renders the search input, status filter and items-per-page control', () => {
      renderCompanies();
      expect(
        screen.getByPlaceholderText(
          'Search by company name, contact name, email, or phone...'
        )
      ).toBeInTheDocument();
      expect(screen.getByText('Filter by status')).toBeInTheDocument();
      expect(screen.getAllByTestId('mantine-select').length).toBe(2);
      expect(screen.getByText('Items per page:')).toBeInTheDocument();
    });

    it('renders the two-row table header', () => {
      mockCompanies = [makeCompany()];
      renderCompanies();
      expect(screen.getByText('S.No')).toBeInTheDocument();
      expect(screen.getByText('Company Name')).toBeInTheDocument();
      expect(screen.getByText('Primary Contact')).toBeInTheDocument();
      expect(screen.getByText('Secondary Contact 1')).toBeInTheDocument();
      expect(screen.getByText('Secondary Contact 2')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Last Update')).toBeInTheDocument();
      expect(screen.getByText('Actions')).toBeInTheDocument();
      expect(screen.getAllByText('Name').length).toBeGreaterThanOrEqual(3);
      expect(screen.getAllByText('Email').length).toBeGreaterThanOrEqual(3);
      expect(screen.getAllByText('Phone').length).toBeGreaterThanOrEqual(3);
    });

    it('renders a company row with all expected data', () => {
      mockCompanies = [makeCompany()];
      const { container } = renderCompanies();

      const updatedAt = moment(new Date('2024-03-01T12:00:00Z')).format(
        'DD MMM YYYY'
      );
      const row = container.querySelector('#company-comp-1') as HTMLElement;
      expect(row).toBeTruthy();

      expect(within(row).getByText('Acme Corp')).toBeInTheDocument();
      expect(within(row).getByText('John Doe')).toBeInTheDocument();
      expect(within(row).getByText('john@acme.com')).toBeInTheDocument();
      expect(within(row).getByText('123456789')).toBeInTheDocument();
      expect(within(row).getByText('Jane Doe')).toBeInTheDocument();
      expect(within(row).getByText('jane@acme.com')).toBeInTheDocument();
      expect(within(row).getByText('987654321')).toBeInTheDocument();
      expect(within(row).getByText('Active')).toBeInTheDocument();
      expect(within(row).getByText(updatedAt)).toBeInTheDocument();
    });

    it('falls back to N/A for missing secondary contact data', () => {
      mockCompanies = [
        makeCompany({
          secondaryContact_1: { name: '', email: '', phone: '' },
          secondaryContact_2: { name: '', email: '', phone: '' }
        })
      ];
      renderCompanies();
      expect(screen.getAllByText('N/A').length).toBeGreaterThanOrEqual(6);
    });
  });

  describe('Filtering and Sorting', () => {
    it('filters companies by name and shows the filtered badge', () => {
      mockCompanies = [
        makeCompany({ id: 'c1', companyName: 'Alpha Corp' }),
        makeCompany({ id: 'c2', companyName: 'Beta Corp' })
      ];
      renderCompanies();

      searchFor('alpha');

      expect(screen.getByText('Alpha Corp')).toBeInTheDocument();
      expect(screen.queryByText('Beta Corp')).not.toBeInTheDocument();
      expect(screen.getByText('1 of 2 companies')).toBeInTheDocument();
    });

    it('shows the empty state when no companies match the search', () => {
      mockCompanies = [makeCompany()];
      renderCompanies();

      searchFor('nothing matches');

      expect(screen.getByTestId('data-view-empty')).toBeInTheDocument();
      expect(screen.getByText('0 of 1 companies')).toBeInTheDocument();
    });

    it('filters companies by status', () => {
      mockCompanies = [
        makeCompany({ id: 'c1', companyName: 'Alpha Corp', status: 'Active' }),
        makeCompany({ id: 'c2', companyName: 'Beta Corp', status: 'Active' }),
        makeCompany({
          id: 'c3',
          companyName: 'Gamma Corp',
          status: 'Inactive'
        })
      ];
      renderCompanies();

      fireEvent.change(screen.getAllByTestId('mantine-select')[0], {
        target: { value: 'Inactive' }
      });

      expect(screen.getByText('Gamma Corp')).toBeInTheDocument();
      expect(screen.queryByText('Alpha Corp')).not.toBeInTheDocument();
      expect(screen.getByText('1 of 3 companies')).toBeInTheDocument();
    });

    it('sorts by company name ascending by default', () => {
      mockCompanies = [
        makeCompany({ id: 'c1', companyName: 'Beta Corp' }),
        makeCompany({ id: 'c2', companyName: 'Alpha Corp' })
      ];
      renderCompanies();

      const rows = screen.getAllByRole('row');
      expect(rows[2].textContent).toContain('Alpha Corp');
      expect(rows[3].textContent).toContain('Beta Corp');
    });

    it('toggles to descending order when the Company Name header is clicked', () => {
      mockCompanies = [
        makeCompany({ id: 'c1', companyName: 'Beta Corp' }),
        makeCompany({ id: 'c2', companyName: 'Alpha Corp' })
      ];
      renderCompanies();

      fireEvent.click(
        screen.getByText('Company Name').closest('th') as HTMLElement
      );

      const rows = screen.getAllByRole('row');
      expect(rows[2].textContent).toContain('Beta Corp');
      expect(rows[3].textContent).toContain('Alpha Corp');
      expect(
        document.querySelector('.tabler-icon-sort-descending')
      ).toBeInTheDocument();
    });
  });

  describe('Pagination', () => {
    it('paginates companies with 10 per page by default', () => {
      mockCompanies = makeCompanies(12);
      renderCompanies();

      const rows = screen.getAllByRole('row');
      expect(rows.length).toBe(12);
      expect(screen.getByText('Alpha Corp 01')).toBeInTheDocument();
      expect(screen.queryByText('Alpha Corp 11')).not.toBeInTheDocument();
    });

    it('moves to the next page when a page button is clicked', () => {
      mockCompanies = makeCompanies(12);
      renderCompanies();

      fireEvent.click(screen.getByRole('button', { name: '2' }));

      expect(screen.getByText('Alpha Corp 11')).toBeInTheDocument();
      expect(screen.getByText('Alpha Corp 12')).toBeInTheDocument();
      expect(screen.queryByText('Alpha Corp 01')).not.toBeInTheDocument();
    });

    it('does not render pagination when there is a single page', () => {
      mockCompanies = [makeCompany()];
      renderCompanies();
      expect(
        screen.queryByRole('button', { name: '2' })
      ).not.toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('shows a loading state while companies load', () => {
      mockCompanies = [makeCompany()];
      mockIsLoading = true;
      renderCompanies();
      expect(screen.getByTestId('data-view-loading')).toBeInTheDocument();
      expect(screen.queryByText('Acme Corp')).not.toBeInTheDocument();
    });

    it('shows an empty state when there are no companies', () => {
      renderCompanies();
      expect(screen.getByTestId('data-view-empty')).toBeInTheDocument();
    });

    it('shows the server error message with a Try Again button', () => {
      mockError = { response: { data: { message: 'Server rejected' } } };
      renderCompanies();
      expect(screen.getByText('Server rejected')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Try Again' })
      ).toBeInTheDocument();
    });

    it('falls back to a generic message when the error carries no message', () => {
      mockError = {};
      renderCompanies();
      expect(screen.getByText('Failed to load companies')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('navigates to the add companies page from the header button', () => {
      renderCompanies();
      fireEvent.click(screen.getByRole('button', { name: 'Add Company' }));
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/employee/dashboard/add-pool-companies'
      );
    });

    it('navigates to the employee update page and stores the id when editing', () => {
      mockCompanies = [makeCompany({ id: 'comp-1' })];
      const { container } = renderCompanies();
      clickEditIcon(container);
      expect(localStorage.getItem('id')).toBe('comp-1');
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/employee/dashboard/update-pool-company/comp-1'
      );
    });

    it('navigates to the admin update page when the user role is admin', () => {
      localStorage.setItem('userRole', 'admin');
      mockCompanies = [makeCompany({ id: 'comp-1' })];
      const { container } = renderCompanies();
      clickEditIcon(container);
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/admin/dashboard/update-pool-company/comp-1'
      );
    });
  });

  describe('Mobile view', () => {
    it('renders company cards with all key data on mobile', () => {
      mockIsMobile = true;
      mockIsTablet = true;
      mockCompanies = [makeCompany({ id: 'comp-1' })];
      const { container } = renderCompanies();

      const updatedAt = moment(new Date('2024-03-01T12:00:00Z')).format(
        'DD MMM YYYY'
      );
      const card = container.querySelector('#company-comp-1') as HTMLElement;
      expect(card).toBeTruthy();

      expect(within(card).getByText('#1')).toBeInTheDocument();
      expect(within(card).getByText('Active')).toBeInTheDocument();
      expect(within(card).getByText('Acme Corp')).toBeInTheDocument();
      expect(within(card).getByText('John Doe')).toBeInTheDocument();
      expect(within(card).getByText('john@acme.com')).toBeInTheDocument();
      expect(within(card).getByText('Jane Doe')).toBeInTheDocument();
      expect(within(card).getByText(updatedAt)).toBeInTheDocument();
    });

    it('navigates to the update page from a mobile card', () => {
      mockIsMobile = true;
      mockIsTablet = true;
      mockCompanies = [makeCompany({ id: 'comp-1' })];
      const { container } = renderCompanies();
      clickEditIcon(container);
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/employee/dashboard/update-pool-company/comp-1'
      );
    });
  });

  describe('Tablet view', () => {
    it('hides the contact columns on tablet', () => {
      mockIsTablet = true;
      mockCompanies = [makeCompany()];
      renderCompanies();

      expect(screen.queryByText('Primary Contact')).not.toBeInTheDocument();
      expect(screen.queryByText('Secondary Contact 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Secondary Contact 2')).not.toBeInTheDocument();
      expect(screen.queryByText('FeatureHeaderEmail')).not.toBeInTheDocument();
      expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    });
  });

  describe('Highlighting', () => {
    it('highlights a company referenced in localStorage and clears it after', () => {
      jest.useFakeTimers();
      const scrollSpy = jest.fn();
      (HTMLElement.prototype as any).scrollIntoView = scrollSpy;

      localStorage.setItem('id', 'comp-1');
      mockCompanies = [
        makeCompany({ id: 'comp-1', companyName: 'Alpha Corp' }),
        makeCompany({ id: 'comp-2', companyName: 'Beta Corp' })
      ];
      const { container } = renderCompanies();

      const row = container.querySelector('#company-comp-1') as HTMLElement;
      expect(row).toBeTruthy();

      act(() => {
        jest.advanceTimersByTime(100);
      });

      expect(scrollSpy).toHaveBeenCalled();
      expect(row.style.backgroundColor).toBe('rgba(73, 80, 87, 0.314)');

      act(() => {
        jest.advanceTimersByTime(2100);
      });

      expect(localStorage.getItem('id')).toBeNull();
      expect(row.style.backgroundColor).toBe('rgb(255, 255, 255)');
      jest.useRealTimers();
    });
  });
});
