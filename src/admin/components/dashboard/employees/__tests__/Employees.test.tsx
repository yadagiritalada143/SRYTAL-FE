import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Employees from '../employees';

let mockEmployees: any[] = [];
let mockIsLoading = false;
let mockQueryError: any = undefined;
let mockIsMobile = false;

jest.mock('@hooks/queries/useAdminQueries', () => ({
  useGetAllEmployeesByAdmin: () => ({
    data: mockEmployees,
    isLoading: mockIsLoading,
    error: mockQueryError
  })
}));

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => mockIsMobile
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

jest.mock('@components/common/loaders/DataView', () => (props: any) => (
  <div data-testid='data-view'>
    {props.isLoading && <span>loading</span>}
    {props.isEmpty && <span>empty</span>}
    {props.children}
  </div>
));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

const renderEmployees = () => {
  return render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Employees />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

const employee = (overrides: any) => ({
  id: 'e1',
  employeeId: 'EMP-001',
  firstName: 'Zoe',
  lastName: 'Adams',
  email: 'zoe@example.com',
  mobileNumber: '1112223333',
  userRole: 'Employee',
  employeeRole: [{ _id: 'r1', designation: 'Developer' }],
  bloodGroup: { _id: 'bg1', type: 'A+' },
  employmentType: { _id: 'et1', employmentType: 'Full-time' },
  ...overrides
});

const mockEmployeesData = [
  employee({
    id: 'e1',
    employeeId: 'EMP-001',
    firstName: 'Zoe',
    lastName: 'Adams',
    email: 'zoe@example.com',
    mobileNumber: '1112223333'
  }),
  employee({
    id: 'e2',
    employeeId: 'EMP-003',
    firstName: 'Anna',
    lastName: 'Brown',
    email: 'anna@example.com',
    mobileNumber: '4445556666',
    userRole: 'Recruiter'
  }),
  employee({
    id: 'e3',
    employeeId: 'EMP-002',
    firstName: 'Bob',
    lastName: 'Clark',
    email: 'bob@example.com',
    mobileNumber: '7778889999'
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

describe('Employees Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    document
      .querySelectorAll('[data-mantine-shared-portal-node]')
      .forEach(node => node.replaceChildren());
    mockEmployees = [];
    mockIsLoading = true;
    mockQueryError = undefined;
    mockIsMobile = false;
  });

  describe('Loading state', () => {
    it('shows the page header and loading indicator', () => {
      renderEmployees();
      expect(screen.getByText('Employee Management')).toBeInTheDocument();
      expect(screen.getByText('loading')).toBeInTheDocument();
    });
  });

  describe('Error state', () => {
    beforeEach(() => {
      mockQueryError = new Error('boom');
    });

    it('shows the error message and retry button', () => {
      renderEmployees();
      expect(screen.getByText('Failed to load employees.')).toBeInTheDocument();
      expect(screen.getByText('Try Again')).toBeInTheDocument();
    });
  });

  describe('Empty state', () => {
    beforeEach(() => {
      mockIsLoading = false;
      mockEmployees = [];
    });

    it('shows no employees message', () => {
      renderEmployees();
      expect(screen.getByText('No employees found')).toBeInTheDocument();
    });

    it('shows the empty state helper text', () => {
      renderEmployees();
      expect(
        screen.getByText('Start by adding your first employee')
      ).toBeInTheDocument();
    });

    it('shows Add Employee button in the empty state', () => {
      renderEmployees();
      expect(
        screen.getAllByRole('button', { name: /add employee/i }).length
      ).toBeGreaterThanOrEqual(1);
    });

    it('navigates to add employee when empty state button is clicked', () => {
      renderEmployees();
      fireEvent.click(
        screen.getAllByRole('button', { name: /add employee/i })[0]
      );
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/admin/dashboard/addemployee'
      );
    });
  });

  describe('Data display', () => {
    beforeEach(() => {
      mockEmployees = mockEmployeesData;
      mockIsLoading = false;
    });

    it('renders the page header and subtitle', () => {
      renderEmployees();
      expect(screen.getByText('Employee Management')).toBeInTheDocument();
      expect(
        screen.getByText(
          'View, search and manage all employees in your organization.'
        )
      ).toBeInTheDocument();
    });

    it('renders employee rows', () => {
      renderEmployees();
      expect(screen.getByText('Zoe')).toBeInTheDocument();
      expect(screen.getByText('Anna')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });

    it('renders employee ids and emails', () => {
      renderEmployees();
      expect(screen.getByText('EMP-001')).toBeInTheDocument();
      expect(screen.getByText('EMP-002')).toBeInTheDocument();
      expect(screen.getByText('zoe@example.com')).toBeInTheDocument();
      expect(screen.getByText('bob@example.com')).toBeInTheDocument();
    });

    it('renders blood group and employment type', () => {
      renderEmployees();
      expect(screen.getAllByText('A+').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Full-time').length).toBeGreaterThanOrEqual(1);
    });

    it('renders designations as badges', () => {
      renderEmployees();
      expect(screen.getAllByText('Developer').length).toBeGreaterThanOrEqual(1);
    });

    it('renders serial numbers', () => {
      renderEmployees();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getAllByText('3').length).toBeGreaterThanOrEqual(1);
    });

    it('renders the Add Employee header button', () => {
      renderEmployees();
      expect(
        screen.getByRole('button', { name: /add employee/i })
      ).toBeInTheDocument();
    });

    it('renders the role filter select', () => {
      renderEmployees();
      expect(screen.getByPlaceholderText('Filter by role')).toBeInTheDocument();
    });
  });

  describe('Search', () => {
    beforeEach(() => {
      mockEmployees = mockEmployeesData;
      mockIsLoading = false;
    });

    it('filters employees by search query', () => {
      renderEmployees();
      fireEvent.change(
        screen.getByPlaceholderText(
          'Search by name, email, phone, or employee ID...'
        ),
        { target: { value: 'bob' } }
      );
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.queryByText('Zoe')).not.toBeInTheDocument();
    });

    it('shows filter count badge when search is active', () => {
      renderEmployees();
      fireEvent.change(
        screen.getByPlaceholderText(
          'Search by name, email, phone, or employee ID...'
        ),
        { target: { value: 'zoe' } }
      );
      expect(screen.getByText(/1 of 3 employees/)).toBeInTheDocument();
    });

    it('shows no results message when search matches nothing', () => {
      renderEmployees();
      fireEvent.change(
        screen.getByPlaceholderText(
          'Search by name, email, phone, or employee ID...'
        ),
        { target: { value: 'zzz' } }
      );
      expect(screen.getByText('No employees found')).toBeInTheDocument();
      expect(
        screen.getByText('Try adjusting your search or filters')
      ).toBeInTheDocument();
    });
  });

  describe('Sorting', () => {
    beforeEach(() => {
      mockEmployees = mockEmployeesData;
      mockIsLoading = false;
    });

    it('sorts by employee id ascending by default', () => {
      renderEmployees();
      expect(isElementBefore('Zoe', 'Bob')).toBe(true);
      expect(isElementBefore('Bob', 'Anna')).toBe(true);
    });

    it('sorts by first name when the header is clicked', () => {
      renderEmployees();
      fireEvent.click(screen.getByText('First Name'));
      expect(isElementBefore('Anna', 'Zoe')).toBe(true);
    });

    it('toggles sort direction on second click', () => {
      renderEmployees();
      fireEvent.click(screen.getByText('First Name'));
      fireEvent.click(screen.getByText('First Name'));
      expect(isElementBefore('Zoe', 'Anna')).toBe(true);
    });
  });

  describe('Role filter', () => {
    beforeEach(() => {
      mockEmployees = mockEmployeesData;
      mockIsLoading = false;
    });

    it('filters employees by role', () => {
      renderEmployees();
      const option = screen
        .getAllByText('Recruiter')
        .find(el => el.closest('[data-combobox-option]'));
      expect(option).toBeTruthy();
      fireEvent.click(option as HTMLElement);
      expect(screen.getByText('Anna')).toBeInTheDocument();
      expect(screen.queryByText('Zoe')).not.toBeInTheDocument();
    });
  });

  describe('Pagination', () => {
    beforeEach(() => {
      mockEmployees = Array.from({ length: 6 }, (_, i) =>
        employee({
          id: `e${i}`,
          employeeId: `EMP-00${i + 1}`,
          firstName: `First${i}`,
          email: `user${i}@example.com`
        })
      );
      mockIsLoading = false;
    });

    it('shows pagination when items per page is lowered', () => {
      renderEmployees();
      expect(
        screen.queryByRole('button', { name: '2' })
      ).not.toBeInTheDocument();
      const option = screen
        .getAllByText('5')
        .find(el => el.closest('[data-combobox-option]'));
      expect(option).toBeTruthy();
      fireEvent.click(option as HTMLElement);
      expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    });
  });

  describe('Navigation actions', () => {
    beforeEach(() => {
      mockEmployees = mockEmployeesData;
      mockIsLoading = false;
    });

    it('navigates to edit employee when edit icon is clicked', () => {
      renderEmployees();
      clickIcon('tabler-icon-user');
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/admin/dashboard/update/e1'
      );
    });

    it('navigates to package update when package icon is clicked', () => {
      renderEmployees();
      clickIcon('tabler-icon-package');
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/admin/dashboard/package/e1'
      );
    });

    it('navigates to timesheet when timesheet icon is clicked', () => {
      renderEmployees();
      clickIcon('tabler-icon-calendar-time');
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/admin/dashboard/timesheet/e1'
      );
    });
  });

  describe('Mobile view', () => {
    beforeEach(() => {
      mockEmployees = mockEmployeesData;
      mockIsLoading = false;
      mockIsMobile = true;
    });

    it('renders mobile employee cards', () => {
      renderEmployees();
      expect(screen.getByText('Zoe Adams')).toBeInTheDocument();
      expect(screen.getByText('Anna Brown')).toBeInTheDocument();
      expect(screen.getByText('Bob Clark')).toBeInTheDocument();
    });

    it('renders mobile card labels', () => {
      renderEmployees();
      expect(screen.getAllByText('Mobile').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Blood Group').length).toBeGreaterThanOrEqual(
        1
      );
      expect(
        screen.getAllByText('Employment Type').length
      ).toBeGreaterThanOrEqual(1);
    });

    it('renders role badges on mobile cards', () => {
      renderEmployees();
      expect(screen.getAllByText('Employee').length).toBeGreaterThanOrEqual(2);
      expect(screen.getAllByText('Recruiter').length).toBeGreaterThanOrEqual(1);
    });

    it('navigates to edit employee from a mobile card', () => {
      renderEmployees();
      clickIcon('tabler-icon-user');
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/admin/dashboard/update/e1'
      );
    });
  });
});
