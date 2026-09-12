import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import moment from 'moment';
import Packages from '../packages';

let mockPackages: any[] = [];
let mockIsLoading = true;
let mockQueryError: any = undefined;
let mockIsMobile = false;
let mockIsTablet = false;
let mockIsSmallMobile = false;

jest.mock('@hooks/queries/useAdminQueries', () => ({
  useGetAllPackagesByAdmin: () => ({
    data: mockPackages,
    isLoading: mockIsLoading,
    error: mockQueryError
  })
}));

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: (query: string) => {
    if (query.includes('768')) return mockIsMobile;
    if (query.includes('1024')) return mockIsTablet;
    if (query.includes('500')) return mockIsSmallMobile;
    return false;
  }
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      accentColor: '#495057',
      successColor: '#37b24d',
      dangerColor: '#e03131',
      mutedTextColor: '#868e96',
      headerBackgroundColor: '#f8f9fa',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

jest.mock('@utils/common/debounce', () => ({
  debounce: (fn: any) => fn
}));

jest.mock('@utils/common/constants', () => ({
  organizationAdminUrls: (organizationName: string) =>
    `/${organizationName}/admin`
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

jest.mock('@components/common/loaders/DataView', () => (props: any) => (
  <div data-testid='data-view'>
    {props.isLoading && <span>loading</span>}
    {props.isEmpty && <span>empty</span>}
    {props.children}
  </div>
));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({
    children,
    onClick
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => <button onClick={onClick}>{children}</button>
}));

jest.mock('@components/common/page-header/PageHeader', () => (props: any) => (
  <div data-testid='page-header'>
    <span>{props.title}</span>
    <span>{props.subtitle}</span>
    <div>{props.actions}</div>
  </div>
));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

const renderPackages = () => {
  return render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Packages />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

const pkg = (overrides: any) => ({
  _id: 'p1',
  title: 'Basic',
  description: 'Basic work package',
  startDate: '2026-01-01',
  endDate: '2026-12-31',
  ...overrides
});

const mockPackagesData = [
  pkg({
    _id: 'p1',
    title: 'Advanced',
    description: 'Advanced work package',
    startDate: '2026-03-01',
    endDate: '2026-06-30'
  }),
  pkg({
    _id: 'p2',
    title: 'Basic',
    description: 'Basic work package',
    startDate: '2026-01-01',
    endDate: '2026-12-31'
  }),
  pkg({
    _id: 'p3',
    title: 'Pro',
    description: 'Pro work package',
    startDate: '2026-02-01',
    endDate: '2027-01-31'
  })
];

const isElementBefore = (textA: string, textB: string) => {
  const a = screen.getAllByText(textA)[0];
  const b = screen.getAllByText(textB)[0];
  return a.compareDocumentPosition(b) === Node.DOCUMENT_POSITION_FOLLOWING;
};

const clickIcon = (className: string) => {
  const svg = document.querySelector(`.${className}`) as HTMLElement;
  const button = svg?.closest('button');
  expect(button).toBeTruthy();
  if (button) fireEvent.click(button);
  return button;
};

describe('Packages Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      writable: true,
      value: jest.fn()
    });
    document
      .querySelectorAll('[data-mantine-shared-portal-node]')
      .forEach(node => node.replaceChildren());
    mockPackages = [];
    mockIsLoading = true;
    mockQueryError = undefined;
    mockIsMobile = false;
    mockIsTablet = false;
    mockIsSmallMobile = false;
  });

  describe('Loading state', () => {
    it('shows the page header and loading indicator', () => {
      renderPackages();
      expect(screen.getByText('Manage Packages')).toBeInTheDocument();
      expect(screen.getByText('loading')).toBeInTheDocument();
    });
  });

  describe('Error state', () => {
    beforeEach(() => {
      mockQueryError = new Error('boom');
    });

    it('shows the error message and retry button', () => {
      renderPackages();
      expect(screen.getByText('Failed to fetch packages.')).toBeInTheDocument();
      expect(screen.getByText('Try Again')).toBeInTheDocument();
    });
  });

  describe('Empty state', () => {
    beforeEach(() => {
      mockIsLoading = false;
      mockPackages = [];
    });

    it('shows no packages message', () => {
      renderPackages();
      expect(screen.getByText('No packages found')).toBeInTheDocument();
    });

    it('shows the empty state helper text', () => {
      renderPackages();
      expect(
        screen.getByText('Start by adding your first package')
      ).toBeInTheDocument();
    });

    it('shows Add Package buttons', () => {
      renderPackages();
      expect(
        screen.getAllByRole('button', { name: /add package/i }).length
      ).toBeGreaterThanOrEqual(1);
    });

    it('navigates to add package when the header button is clicked', () => {
      renderPackages();
      fireEvent.click(
        screen.getAllByRole('button', { name: /add package/i })[0]
      );
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/admin/dashboard/addPackage'
      );
    });
  });

  describe('Data display', () => {
    beforeEach(() => {
      mockPackages = mockPackagesData;
      mockIsLoading = false;
    });

    it('renders the page header and subtitle', () => {
      renderPackages();
      expect(screen.getByText('Manage Packages')).toBeInTheDocument();
      expect(
        screen.getByText(/Create and manage work packages/)
      ).toBeInTheDocument();
    });

    it('renders package titles and descriptions', () => {
      renderPackages();
      expect(screen.getByText('Advanced')).toBeInTheDocument();
      expect(screen.getByText('Basic')).toBeInTheDocument();
      expect(screen.getByText('Pro')).toBeInTheDocument();
      expect(screen.getByText('Advanced work package')).toBeInTheDocument();
      expect(screen.getByText('Pro work package')).toBeInTheDocument();
    });

    it('renders formatted start and end dates', () => {
      renderPackages();
      expect(
        screen.getAllByText(moment('2026-12-31').format('MMM DD, YYYY')).length
      ).toBeGreaterThanOrEqual(1);
    });

    it('renders table column headers', () => {
      renderPackages();
      expect(screen.getByText('S.No')).toBeInTheDocument();
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Start Date')).toBeInTheDocument();
      expect(screen.getByText('End Date')).toBeInTheDocument();
      expect(screen.getByText('Actions')).toBeInTheDocument();
    });

    it('renders serial numbers for rows', () => {
      renderPackages();
      expect(screen.getAllByText('1').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('2').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('3').length).toBeGreaterThanOrEqual(1);
    });

    it('sorts by title ascending by default', () => {
      renderPackages();
      expect(isElementBefore('Advanced', 'Basic')).toBe(true);
      expect(isElementBefore('Basic', 'Pro')).toBe(true);
    });

    it('shows the search input', () => {
      renderPackages();
      expect(
        screen.getByPlaceholderText('Search by title or description...')
      ).toBeInTheDocument();
    });

    it('shows items per page selector with default of 10', () => {
      renderPackages();
      expect(screen.getByText('Items per page:')).toBeInTheDocument();
    });
  });

  describe('Search filtering', () => {
    beforeEach(() => {
      mockPackages = mockPackagesData;
      mockIsLoading = false;
    });

    it('filters packages by title', () => {
      renderPackages();
      fireEvent.change(
        screen.getByPlaceholderText('Search by title or description...'),
        { target: { value: 'pro' } }
      );
      expect(screen.getByText('Pro')).toBeInTheDocument();
      expect(screen.queryByText('Advanced')).not.toBeInTheDocument();
    });

    it('filters packages by description', () => {
      renderPackages();
      fireEvent.change(
        screen.getByPlaceholderText('Search by title or description...'),
        { target: { value: 'basic work' } }
      );
      expect(screen.getByText('Basic')).toBeInTheDocument();
      expect(screen.queryByText('Pro')).not.toBeInTheDocument();
    });

    it('shows filter count badge when search is active', () => {
      renderPackages();
      fireEvent.change(
        screen.getByPlaceholderText('Search by title or description...'),
        { target: { value: 'advanced' } }
      );
      expect(screen.getByText(/1 of 3 packages/)).toBeInTheDocument();
    });

    it('shows the try adjusting search message for no results', () => {
      renderPackages();
      fireEvent.change(
        screen.getByPlaceholderText('Search by title or description...'),
        { target: { value: 'zzz' } }
      );
      expect(screen.getByText('No packages found')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your search')).toBeInTheDocument();
    });
  });

  describe('Sorting', () => {
    beforeEach(() => {
      mockPackages = mockPackagesData;
      mockIsLoading = false;
    });

    it('toggles title sort direction on click', () => {
      renderPackages();
      expect(isElementBefore('Advanced', 'Pro')).toBe(true);
      fireEvent.click(screen.getByText('Title'));
      expect(isElementBefore('Pro', 'Advanced')).toBe(true);
      fireEvent.click(screen.getByText('Title'));
      expect(isElementBefore('Advanced', 'Pro')).toBe(true);
    });
  });

  describe('Pagination', () => {
    beforeEach(() => {
      mockPackages = Array.from({ length: 12 }, (_, i) =>
        pkg({
          _id: `p${i}`,
          title: `Package ${String(i + 1).padStart(2, '0')}`,
          description: `Package ${i + 1} description`,
          startDate: '2026-01-01',
          endDate: '2026-12-31'
        })
      );
      mockIsLoading = false;
    });

    it('shows pagination when there is more than one page', () => {
      renderPackages();
      expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    });

    it('navigates to the next page', () => {
      renderPackages();
      expect(screen.getByText('Package 01')).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: '2' }));
      expect(screen.getByText('Package 11')).toBeInTheDocument();
      expect(screen.queryByText('Package 01')).not.toBeInTheDocument();
    });

    it('changes the page size via the items per page selector', () => {
      renderPackages();
      const option = screen
        .getAllByText('5')
        .find(el => el.closest('[data-combobox-option]'));
      expect(option).toBeTruthy();
      fireEvent.click(option as HTMLElement);
      expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
    });
  });

  describe('Navigation actions', () => {
    beforeEach(() => {
      mockPackages = mockPackagesData;
      mockIsLoading = false;
    });

    it('stores the package id and navigates to edit when edit icon is clicked', () => {
      renderPackages();
      clickIcon('tabler-icon-edit');
      expect(localStorage.getItem('packageId')).toBe('p1');
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/admin/dashboard/updates/p1'
      );
    });

    it('navigates to add package when the header button is clicked', () => {
      renderPackages();
      fireEvent.click(
        screen.getAllByRole('button', { name: /add package/i })[0]
      );
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/admin/dashboard/addPackage'
      );
    });
  });

  describe('Mobile view', () => {
    beforeEach(() => {
      mockPackages = mockPackagesData;
      mockIsLoading = false;
      mockIsMobile = true;
    });

    it('renders mobile package cards with numbering', () => {
      renderPackages();
      expect(screen.getByText('#1')).toBeInTheDocument();
      expect(screen.getByText('#2')).toBeInTheDocument();
      expect(screen.getByText('#3')).toBeInTheDocument();
    });

    it('renders mobile card labels', () => {
      renderPackages();
      expect(
        screen.getAllByText('Package Title').length
      ).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Description').length).toBeGreaterThanOrEqual(
        1
      );
      expect(screen.getAllByText('Start Date').length).toBeGreaterThanOrEqual(
        1
      );
      expect(screen.getAllByText('End Date').length).toBeGreaterThanOrEqual(1);
    });

    it('renders package titles on mobile cards', () => {
      renderPackages();
      expect(screen.getByText('Advanced')).toBeInTheDocument();
      expect(screen.getByText('Basic')).toBeInTheDocument();
      expect(screen.getByText('Pro')).toBeInTheDocument();
    });

    it('navigates to edit package from a mobile card', () => {
      renderPackages();
      clickIcon('tabler-icon-edit');
      expect(localStorage.getItem('packageId')).toBe('p1');
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/admin/dashboard/updates/p1'
      );
    });
  });
});
