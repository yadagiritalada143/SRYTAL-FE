import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import moment from 'moment';
import Candidate from '../candidate';

let mockCandidates: any[] = [];
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
  useGetAllPoolCandidates: () => ({
    data: mockCandidates,
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

const makeCandidate = (overrides: any = {}) => ({
  _id: 'cand-1',
  candidateName: 'John Doe',
  contact: { email: 'john@example.com', phone: '123456789' },
  totalYearsOfExperience: 3,
  evaluatedSkills: 'React, TypeScript',
  createdAt: new Date('2024-01-15T12:00:00Z'),
  createdBy: { firstName: 'Alice', lastName: 'Smith' },
  comments: [
    {
      userId: { firstName: 'Bob', lastName: 'Jones' },
      updateAt: new Date('2024-02-10T12:00:00Z')
    }
  ],
  ...overrides
});

const makeCandidates = (count: number, prefix = 'Alpha Candidate') =>
  Array.from({ length: count }, (_, i) =>
    makeCandidate({
      _id: `cand-${i + 1}`,
      candidateName: `${prefix} ${String(i + 1).padStart(2, '0')}`,
      contact: { email: `cand${i + 1}@example.com`, phone: `900000000${i}` }
    })
  );

const renderCandidate = () => {
  return render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Candidate />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

const clickEditIcon = (container: HTMLElement) => {
  const svg = container.querySelector('.tabler-icon-edit') as HTMLElement;
  const button = svg?.closest('button');
  expect(button).toBeTruthy();
  fireEvent.click(button as HTMLButtonElement);
};

describe('Candidate List', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    localStorage.setItem('userRole', 'employee');
    mockCandidates = [];
    mockIsLoading = false;
    mockError = null;
    mockIsMobile = false;
    mockIsTablet = false;
    mockIsSmallMobile = false;
  });

  describe('Rendering', () => {
    it('renders the page header, subtitle and Add Candidate button', () => {
      mockCandidates = [makeCandidate()];
      renderCandidate();
      expect(screen.getByText('Pool Candidates')).toBeInTheDocument();
      expect(
        screen.getByText('Manage the candidates in your recruitment pool.')
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Add Candidate' })
      ).toBeInTheDocument();
      expect(screen.getByTestId('page-header-count')).toHaveTextContent('1');
    });

    it('renders the search input and items-per-page control', () => {
      const { container } = renderCandidate();
      expect(
        screen.getByPlaceholderText(
          'Search by name, email, phone, or skills...'
        )
      ).toBeInTheDocument();
      expect(
        container.querySelector('.mantine-Select-input')
      ).toBeInTheDocument();
      expect(screen.getByText('Items per page:')).toBeInTheDocument();
    });

    it('renders all table headers', () => {
      mockCandidates = [makeCandidate()];
      renderCandidate();
      expect(screen.getByText('S.No')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Phone')).toBeInTheDocument();
      expect(screen.getByText('Experience')).toBeInTheDocument();
      expect(screen.getByText('Created By')).toBeInTheDocument();
      expect(screen.getByText('Created At')).toBeInTheDocument();
      expect(screen.getByText('Latest Comment By')).toBeInTheDocument();
      expect(screen.getByText('Latest Comment At')).toBeInTheDocument();
      expect(screen.getByText('Actions')).toBeInTheDocument();
    });

    it('renders candidate rows with all expected data', () => {
      mockCandidates = [makeCandidate()];
      renderCandidate();

      const createdAt = moment(new Date('2024-01-15T12:00:00Z')).format(
        'MMM DD, YYYY'
      );
      const commentAt = moment(new Date('2024-02-10T12:00:00Z')).format(
        'MMM DD, YYYY'
      );

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('123456789')).toBeInTheDocument();
      expect(screen.getByText('3 years')).toBeInTheDocument();
      expect(screen.getByText(/Alice Smith/)).toBeInTheDocument();
      expect(screen.getByText(createdAt)).toBeInTheDocument();
      expect(screen.getByText(/Bob Jones/)).toBeInTheDocument();
      expect(screen.getByText(commentAt)).toBeInTheDocument();
    });

    it('falls back to N/A for missing contact, phone and comments', () => {
      mockCandidates = [
        makeCandidate({
          contact: { phone: '5551234' },
          createdBy: { firstName: 'Alice' },
          comments: []
        })
      ];
      renderCandidate();
      expect(screen.getAllByText('N/A').length).toBeGreaterThan(0);
      expect(screen.queryByText(/Bob Jones/)).not.toBeInTheDocument();
    });
  });

  describe('Filtering and Sorting', () => {
    it('filters candidates by name and shows the filtered badge', () => {
      mockCandidates = [
        makeCandidate({ _id: 'c1', candidateName: 'Alpha Candidate' }),
        makeCandidate({ _id: 'c2', candidateName: 'Beta Candidate' })
      ];
      renderCandidate();

      fireEvent.change(
        screen.getByPlaceholderText(
          'Search by name, email, phone, or skills...'
        ),
        { target: { value: 'alpha' } }
      );

      expect(screen.getByText('Alpha Candidate')).toBeInTheDocument();
      expect(screen.queryByText('Beta Candidate')).not.toBeInTheDocument();
      expect(screen.getByText('1 of 2 candidates')).toBeInTheDocument();
    });

    it('filters candidates by email', () => {
      mockCandidates = [
        makeCandidate({
          _id: 'c1',
          candidateName: 'Alpha Candidate',
          contact: { email: 'john@example.com', phone: '123456789' }
        }),
        makeCandidate({
          _id: 'c2',
          candidateName: 'Beta Candidate',
          contact: { email: 'beta@example.com', phone: '987654321' }
        })
      ];
      renderCandidate();

      fireEvent.change(
        screen.getByPlaceholderText(
          'Search by name, email, phone, or skills...'
        ),
        { target: { value: 'john@example.com' } }
      );

      expect(screen.getByText('Alpha Candidate')).toBeInTheDocument();
      expect(screen.queryByText('Beta Candidate')).not.toBeInTheDocument();
    });

    it('shows the empty state when no candidates match the search', () => {
      mockCandidates = [makeCandidate()];
      renderCandidate();

      fireEvent.change(
        screen.getByPlaceholderText(
          'Search by name, email, phone, or skills...'
        ),
        { target: { value: 'nothing matches' } }
      );

      expect(screen.getByTestId('data-view-empty')).toBeInTheDocument();
      expect(screen.getByText('0 of 1 candidates')).toBeInTheDocument();
    });

    it('sorts by candidate name ascending by default', () => {
      mockCandidates = [
        makeCandidate({ _id: 'c1', candidateName: 'Beta Candidate' }),
        makeCandidate({ _id: 'c2', candidateName: 'Alpha Candidate' })
      ];
      renderCandidate();

      const rows = screen.getAllByRole('row');
      expect(rows[1].textContent).toContain('Alpha Candidate');
      expect(rows[2].textContent).toContain('Beta Candidate');
      expect(
        document.querySelector('.tabler-icon-sort-ascending')
      ).toBeInTheDocument();
    });

    it('toggles to descending order when the Name header is clicked', () => {
      mockCandidates = [
        makeCandidate({ _id: 'c1', candidateName: 'Beta Candidate' }),
        makeCandidate({ _id: 'c2', candidateName: 'Alpha Candidate' })
      ];
      renderCandidate();

      fireEvent.click(screen.getByText('Name').closest('th') as HTMLElement);

      const rows = screen.getAllByRole('row');
      expect(rows[1].textContent).toContain('Beta Candidate');
      expect(rows[2].textContent).toContain('Alpha Candidate');
      expect(
        document.querySelector('.tabler-icon-sort-descending')
      ).toBeInTheDocument();
    });
  });

  describe('Pagination', () => {
    it('paginates candidates with 10 per page by default', () => {
      mockCandidates = makeCandidates(12);
      renderCandidate();

      const rows = screen.getAllByRole('row');
      expect(rows.length).toBe(11);
      expect(screen.getByText('Alpha Candidate 01')).toBeInTheDocument();
      expect(screen.queryByText('Alpha Candidate 11')).not.toBeInTheDocument();
    });

    it('moves to the next page when a page button is clicked', () => {
      mockCandidates = makeCandidates(12);
      renderCandidate();

      fireEvent.click(screen.getByRole('button', { name: '2' }));

      const rows = screen.getAllByRole('row');
      expect(rows.length).toBe(3);
      expect(screen.getByText('Alpha Candidate 11')).toBeInTheDocument();
      expect(screen.getByText('Alpha Candidate 12')).toBeInTheDocument();
      expect(screen.queryByText('Alpha Candidate 01')).not.toBeInTheDocument();
    });

    it('does not render pagination when there is a single page', () => {
      mockCandidates = [makeCandidate()];
      renderCandidate();
      expect(
        screen.queryByRole('button', { name: '2' })
      ).not.toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('shows a loading state while candidates load', () => {
      mockCandidates = [makeCandidate()];
      mockIsLoading = true;
      renderCandidate();
      expect(screen.getByTestId('data-view-loading')).toBeInTheDocument();
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    it('shows an empty state when there are no candidates', () => {
      renderCandidate();
      expect(screen.getByTestId('data-view-empty')).toBeInTheDocument();
    });

    it('shows the server error message with a Try Again button', () => {
      mockError = { response: { data: { message: 'Server rejected' } } };
      renderCandidate();
      expect(screen.getByText('Server rejected')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Try Again' })
      ).toBeInTheDocument();
    });

    it('falls back to a generic message when the error carries no message', () => {
      mockError = {};
      renderCandidate();
      expect(screen.getByText('Failed to load candidates')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('navigates to the add candidate page from the header button', () => {
      renderCandidate();
      fireEvent.click(screen.getByRole('button', { name: 'Add Candidate' }));
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/employee/dashboard/add-pool-candidate'
      );
    });

    it('navigates to the employee edit page and stores the id when editing', () => {
      mockCandidates = [makeCandidate({ _id: 'cand-1' })];
      const { container } = renderCandidate();
      clickEditIcon(container);
      expect(localStorage.getItem('id')).toBe('cand-1');
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/employee/dashboard/cand-1/edit-pool-candidate'
      );
    });

    it('navigates to the admin edit page when the user role is admin', () => {
      localStorage.setItem('userRole', 'admin');
      mockCandidates = [makeCandidate({ _id: 'cand-1' })];
      const { container } = renderCandidate();
      clickEditIcon(container);
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/admin/dashboard/cand-1/edit-pool-candidate'
      );
    });
  });

  describe('Mobile view', () => {
    it('renders candidate cards with all key data on mobile', () => {
      mockIsMobile = true;
      mockIsTablet = true;
      mockCandidates = [makeCandidate({ _id: 'cand-1' })];
      renderCandidate();

      expect(screen.getByText('#1')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('123456789')).toBeInTheDocument();
      expect(screen.getByText('3 years')).toBeInTheDocument();
      expect(screen.getByText(/Alice Smith/)).toBeInTheDocument();
    });

    it('navigates to the edit page from a mobile card', () => {
      mockIsMobile = true;
      mockIsTablet = true;
      mockCandidates = [makeCandidate({ _id: 'cand-1' })];
      const { container } = renderCandidate();
      clickEditIcon(container);
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/employee/dashboard/cand-1/edit-pool-candidate'
      );
    });
  });

  describe('Tablet view', () => {
    it('hides the email, phone and created-by columns on tablet', () => {
      mockIsTablet = true;
      mockCandidates = [makeCandidate()];
      renderCandidate();

      expect(screen.queryByText('Email')).not.toBeInTheDocument();
      expect(screen.queryByText('Phone')).not.toBeInTheDocument();
      expect(screen.queryByText('Created By')).not.toBeInTheDocument();
      expect(screen.queryByText('john@example.com')).not.toBeInTheDocument();
    });
  });

  describe('Highlighting', () => {
    it('highlights a candidate referenced in localStorage and clears it after', () => {
      jest.useFakeTimers();
      const scrollSpy = jest.fn();
      (HTMLElement.prototype as any).scrollIntoView = scrollSpy;

      localStorage.setItem('id', 'cand-1');
      mockCandidates = [
        makeCandidate({ _id: 'cand-1', candidateName: 'Jane Doe' }),
        makeCandidate({ _id: 'cand-2', candidateName: 'John Roe' })
      ];
      const { container } = renderCandidate();

      const row = container.querySelector('#candidate-cand-1') as HTMLElement;
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
