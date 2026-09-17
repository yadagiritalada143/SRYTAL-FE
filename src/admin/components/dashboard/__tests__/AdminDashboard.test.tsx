import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import React from 'react';
import AdminDashboard from '../admin-dashboard/AdminDashboard';
import { userDetailsAtom } from '@atoms/user';

let mockData: any = undefined;
let mockIsLoading = false;

jest.mock('@hooks/queries/useAdminQueries', () => ({
  useGetDashboardStatsByAdmin: () => ({
    data: mockData,
    isLoading: mockIsLoading
  })
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ organization: 'srytal' })
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      dangerColor: '#e03131',
      headerBackgroundColor: '#f8f9fa',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' },
    appColors: {}
  })
}));

jest.mock('@utils/common/constants', () => ({
  organizationAdminUrls: (org: string) => `/${org}/admin`
}));

const mockStatsData = {
  stats: {
    totalEmployees: 42,
    activeProjects: 7,
    pendingTimesheetApprovals: 3,
    hoursLoggedThisMonth: 200,
    pendingPasswordResets: 2
  },
  roleBreakdown: { Employee: 30, Recruiter: 8, ContentWriter: 4 },
  departmentBreakdown: { Engineering: 20, Sales: 15, HR: 7 },
  recentHires: [
    {
      name: 'Zoe Adams',
      employeeId: 'EMP-001',
      userRole: 'Employee',
      department: 'Engineering',
      dateOfJoining: '2025-06-15'
    }
  ],
  upcomingBirthdays: [{ name: 'John Doe', date: 20 }],
  workAnniversaries: [{ name: 'Jane Roe', years: 3 }]
};

const renderDashboard = () =>
  render(
    <RecoilRoot
      initializeState={({ set }) =>
        set(userDetailsAtom, {
          firstName: 'Alice',
          lastName: 'Smith',
          userRole: 'admin',
          passwordResetRequired: 'false',
          id: 'a1'
        })
      }
    >
      <MantineProvider>
        <MemoryRouter initialEntries={['/srytal/admin/dashboard']}>
          <AdminDashboard />
        </MemoryRouter>
      </MantineProvider>
    </RecoilRoot>
  );

describe('AdminDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockData = undefined;
    mockIsLoading = true;
  });

  it('shows skeleton loaders while loading', () => {
    renderDashboard();
    expect(screen.queryByText('Total Employees')).not.toBeInTheDocument();
  });

  it('renders the greeting and admin name', () => {
    mockData = mockStatsData;
    mockIsLoading = false;
    renderDashboard();
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
  });

  it('displays the organization name', () => {
    mockData = mockStatsData;
    mockIsLoading = false;
    renderDashboard();
    expect(screen.getByText('srytal')).toBeInTheDocument();
  });

  it('shows total employees stat card', () => {
    mockData = mockStatsData;
    mockIsLoading = false;
    renderDashboard();
    expect(screen.getByText('Total Employees')).toBeInTheDocument();
    expect(screen.getAllByText('42').length).toBeGreaterThanOrEqual(1);
  });

  it('shows active projects stat card', () => {
    mockData = mockStatsData;
    mockIsLoading = false;
    renderDashboard();
    expect(screen.getByText('Active Projects')).toBeInTheDocument();
    expect(screen.getAllByText('7').length).toBeGreaterThanOrEqual(1);
  });

  it('shows pending approvals stat card', () => {
    mockData = mockStatsData;
    mockIsLoading = false;
    renderDashboard();
    expect(screen.getByText('Pending Approvals')).toBeInTheDocument();
    expect(screen.getAllByText('3').length).toBeGreaterThanOrEqual(1);
  });

  it('shows hours this month stat card', () => {
    mockData = mockStatsData;
    mockIsLoading = false;
    renderDashboard();
    expect(screen.getByText('Hours This Month')).toBeInTheDocument();
    expect(screen.getByText('200h')).toBeInTheDocument();
  });

  it('shows password resets stat card', () => {
    mockData = mockStatsData;
    mockIsLoading = false;
    renderDashboard();
    expect(screen.getByText('Password Resets')).toBeInTheDocument();
    expect(screen.getAllByText('2').length).toBeGreaterThanOrEqual(1);
  });

  it('renders workforce by role breakdown', () => {
    mockData = mockStatsData;
    mockIsLoading = false;
    renderDashboard();
    expect(screen.getByText('Workforce by Role')).toBeInTheDocument();
    expect(screen.getAllByText('Employee').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('30').length).toBeGreaterThanOrEqual(1);
  });

  it('renders department breakdown', () => {
    mockData = mockStatsData;
    mockIsLoading = false;
    renderDashboard();
    expect(screen.getByText('By Department')).toBeInTheDocument();
    expect(screen.getAllByText('Engineering').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('20').length).toBeGreaterThanOrEqual(1);
  });

  it('shows recent hires table', () => {
    mockData = mockStatsData;
    mockIsLoading = false;
    renderDashboard();
    expect(screen.getByText('Recent Hires')).toBeInTheDocument();
    expect(screen.getByText('Zoe Adams')).toBeInTheDocument();
    expect(screen.getByText('EMP-001')).toBeInTheDocument();
  });

  it('shows birthdays this month', () => {
    mockData = mockStatsData;
    mockIsLoading = false;
    renderDashboard();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('shows work anniversaries', () => {
    mockData = mockStatsData;
    mockIsLoading = false;
    renderDashboard();
    expect(screen.getByText('Jane Roe')).toBeInTheDocument();
    expect(screen.getByText('3 yrs')).toBeInTheDocument();
  });

  it('shows the needs attention section for pending items', () => {
    mockData = mockStatsData;
    mockIsLoading = false;
    renderDashboard();
    expect(screen.getByText('Needs Attention')).toBeInTheDocument();
    expect(screen.getByText(/timesheet entr/)).toBeInTheDocument();
    expect(
      screen.getByText(/employee.*pending password reset/)
    ).toBeInTheDocument();
  });

  it('shows empty states when no data exists', () => {
    mockData = {
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
    renderDashboard();
    expect(screen.getByText('No employees yet')).toBeInTheDocument();
    expect(screen.getByText('No departments assigned')).toBeInTheDocument();
    expect(
      screen.getAllByText('None this month').length
    ).toBeGreaterThanOrEqual(1);
  });
});
