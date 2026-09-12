import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot, MutableSnapshot } from 'recoil';
import { userDetailsAtom } from '@atoms/user';

jest.mock('@utils/common/constants', () => ({
  organizationAdminUrls: (org: string) => `/${org}/admin`,
  organizationEmployeeUrls: (org: string) => `/${org}/employee`
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ organization: 'srytal' })
}));

let mockDashboardData: any = null;
let mockIsLoading = true;

jest.mock('@hooks/queries/useAdminQueries', () => ({
  useGetDashboardStatsByAdmin: () => ({
    data: mockDashboardData,
    isLoading: mockIsLoading
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
    organizationConfig: { organization_name: 'srytal' },
    isDarkTheme: false
  })
}));

const mockUserDetails = {
  firstName: 'Admin',
  lastName: 'User',
  userRole: 'admin',
  passwordResetRequired: 'false',
  id: 'user-1'
};

import AdminDashboard from '../AdminDashboard';

const renderDashboard = (userDetails = mockUserDetails) => {
  const initializeStateWithUser = ({ set }: MutableSnapshot) => {
    set(userDetailsAtom, userDetails);
  };

  return render(
    <RecoilRoot initializeState={initializeStateWithUser}>
      <MantineProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <AdminDashboard />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

const mockStatsData = {
  stats: {
    totalEmployees: 25,
    activeProjects: 8,
    pendingTimesheetApprovals: 3,
    hoursLoggedThisMonth: 160,
    pendingPasswordResets: 2
  },
  roleBreakdown: {
    Employee: 15,
    Recruiter: 5,
    ContentWriter: 4,
    admin: 1
  },
  departmentBreakdown: {
    Engineering: 12,
    Design: 6,
    Marketing: 4,
    HR: 3
  },
  recentHires: [
    {
      name: 'Alice Johnson',
      employeeId: 'EMP-001',
      userRole: 'Employee',
      department: 'Engineering',
      dateOfJoining: '2026-08-15'
    },
    {
      name: 'Bob Smith',
      employeeId: 'EMP-002',
      userRole: 'Recruiter',
      department: 'HR',
      dateOfJoining: '2026-09-01'
    }
  ],
  upcomingBirthdays: [
    { name: 'Charlie Brown', date: 15 },
    { name: 'Diana Prince', date: 22 }
  ],
  workAnniversaries: [{ name: 'Eve Adams', years: 3 }]
};

describe('AdminDashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDashboardData = null;
    mockIsLoading = true;
  });

  describe('Loading state', () => {
    it('shows greeting while loading', () => {
      renderDashboard();
      expect(
        screen.getByText(/good (morning|afternoon|evening)/i)
      ).toBeInTheDocument();
    });

    it('does not render stat cards while loading', () => {
      renderDashboard();
      expect(screen.queryByText('Total Employees')).not.toBeInTheDocument();
    });
  });

  describe('Loaded state with data', () => {
    beforeEach(() => {
      mockDashboardData = mockStatsData;
      mockIsLoading = false;
    });

    it('renders the greeting and admin name', () => {
      renderDashboard();
      expect(
        screen.getByText(/good (morning|afternoon|evening)/i)
      ).toBeInTheDocument();
      expect(screen.getByText('Admin User')).toBeInTheDocument();
      expect(screen.getByText('srytal')).toBeInTheDocument();
    });

    it('renders all 5 stat card labels', () => {
      renderDashboard();
      expect(screen.getByText('Total Employees')).toBeInTheDocument();
      expect(screen.getByText('Active Projects')).toBeInTheDocument();
      expect(screen.getByText('Pending Approvals')).toBeInTheDocument();
      expect(screen.getByText('Hours This Month')).toBeInTheDocument();
      expect(screen.getByText('Password Resets')).toBeInTheDocument();
    });

    it('renders Workforce by Role section', () => {
      renderDashboard();
      expect(screen.getByText('Workforce by Role')).toBeInTheDocument();
      expect(screen.getAllByText('Employee').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('15').length).toBeGreaterThanOrEqual(1);
    });

    it('orders roles as admin, recruiter, employee, then content-writer', () => {
      renderDashboard();
      const card = screen
        .getByText('Workforce by Role')
        .closest('.mantine-Card-root');
      expect(card).not.toBeNull();
      const text = card!.textContent ?? '';
      expect(text.indexOf('admin')).toBeGreaterThan(-1);
      expect(text.indexOf('admin')).toBeLessThan(text.indexOf('Recruiter'));
      expect(text.indexOf('Recruiter')).toBeLessThan(text.indexOf('Employee'));
      expect(text.indexOf('Employee')).toBeLessThan(
        text.indexOf('ContentWriter')
      );
    });

    it('renders Recent Hires table', () => {
      renderDashboard();
      expect(screen.getByText('Recent Hires')).toBeInTheDocument();
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('EMP-001')).toBeInTheDocument();
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    });

    it('renders Quick Actions', () => {
      renderDashboard();
      expect(screen.getByText('Quick Actions')).toBeInTheDocument();
      expect(screen.getByText('Add Employee')).toBeInTheDocument();
      expect(screen.getByText('Packages')).toBeInTheDocument();
      expect(screen.getByText('Generate Salary Slip')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('renders By Department section', () => {
      renderDashboard();
      expect(screen.getByText('By Department')).toBeInTheDocument();
      expect(screen.getAllByText('Engineering').length).toBeGreaterThanOrEqual(
        1
      );
    });

    it('renders Birthdays section', () => {
      renderDashboard();
      const monthName = new Date().toLocaleDateString(undefined, {
        month: 'long'
      });
      expect(
        screen.getByText(new RegExp(`Birthdays in ${monthName}`))
      ).toBeInTheDocument();
      expect(screen.getByText('Charlie Brown')).toBeInTheDocument();
    });

    it('renders Work Anniversaries section', () => {
      renderDashboard();
      expect(screen.getByText('Work Anniversaries')).toBeInTheDocument();
      expect(screen.getByText('Eve Adams')).toBeInTheDocument();
      expect(screen.getByText('3 yrs')).toBeInTheDocument();
    });

    it('shows Needs Attention when pending items exist', () => {
      renderDashboard();
      expect(screen.getByText('Needs Attention')).toBeInTheDocument();
      expect(
        screen.getByText(/timesheet entr.*awaiting approval/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/employees? pending password reset/)
      ).toBeInTheDocument();
    });

    it('renders singular form for 1 pending item', () => {
      mockDashboardData = {
        ...mockStatsData,
        stats: {
          ...mockStatsData.stats,
          pendingTimesheetApprovals: 1,
          pendingPasswordResets: 1
        }
      };
      renderDashboard();
      expect(
        screen.getByText(/timesheet entry awaiting approval/)
      ).toBeInTheDocument();
      expect(
        screen.getByText('employee pending password reset')
      ).toBeInTheDocument();
    });
  });

  describe('Empty state', () => {
    beforeEach(() => {
      mockDashboardData = {
        stats: {
          totalEmployees: 0,
          activeProjects: 0,
          pendingTimesheetApprovals: 0,
          hoursLoggedThisMonth: 0,
          pendingPasswordResets: 0
        },
        roleBreakdown: {},
        departmentBreakdown: {},
        recentHires: [],
        upcomingBirthdays: [],
        workAnniversaries: []
      };
      mockIsLoading = false;
    });

    it('shows empty state messages', () => {
      renderDashboard();
      expect(screen.getByText('No employees yet')).toBeInTheDocument();
      expect(screen.getByText('No hires recorded')).toBeInTheDocument();
      expect(screen.getByText('No departments assigned')).toBeInTheDocument();
    });

    it('hides Needs Attention card when no pending items', () => {
      renderDashboard();
      expect(screen.queryByText('Needs Attention')).not.toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      mockDashboardData = mockStatsData;
      mockIsLoading = false;
    });

    it('Add Employee quick action navigates correctly', () => {
      renderDashboard();
      fireEvent.click(screen.getByText('Add Employee'));
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/admin/dashboard/addemployee'
      );
    });

    it('Packages quick action navigates correctly', () => {
      renderDashboard();
      fireEvent.click(screen.getByText('Packages'));
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/admin/dashboard/packages'
      );
    });

    it('Settings quick action navigates correctly', () => {
      renderDashboard();
      fireEvent.click(screen.getByText('Settings'));
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/admin/dashboard/settings'
      );
    });

    it('View all link navigates to employees list', () => {
      renderDashboard();
      fireEvent.click(screen.getByText('View all'));
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/admin/dashboard/employees'
      );
    });
  });

  describe('Fallback display', () => {
    it('shows "Admin" when user has no firstName', () => {
      mockDashboardData = mockStatsData;
      mockIsLoading = false;
      renderDashboard({
        firstName: '',
        lastName: '',
        userRole: 'admin',
        passwordResetRequired: 'false',
        id: 'user-1'
      });
      expect(screen.getByText('Admin')).toBeInTheDocument();
    });
  });
});
