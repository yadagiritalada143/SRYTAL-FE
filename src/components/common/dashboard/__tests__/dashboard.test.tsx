import { render, screen, waitFor } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import React from 'react';

jest.mock('@hooks/queries/useUserQueries', () => ({
  useGetEmployeeDashboard: jest.fn()
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: jest.fn()
}));

jest.mock('moment-timezone', () => {
  const momentFn = jest.requireActual('moment');
  momentFn.tz = jest.fn(() => momentFn());
  return { default: momentFn, __esModule: true };
});

const Dashboard = require('../dashboard').default;
const mockUseGetEmployeeDashboard =
  jest.requireMock('@hooks/queries/useUserQueries').useGetEmployeeDashboard;
const mockUseAppTheme =
  jest.requireMock('@hooks/use-app-theme').useAppTheme;

const qc = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <RecoilRoot>
    <QueryClientProvider client={qc}>
      <MantineProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  </RecoilRoot>
);

const mockThemeConfig = {
  color: '#495057',
  backgroundColor: '#ffffff',
  borderColor: '#dee2e6',
  button: { color: '#495057', textColor: '#ffffff' },
  headerBackgroundColor: '#f8f9fa',
  linkColor: '#dc3545'
};

const fullProfileData = {
  profile: {
    firstName: 'John',
    lastName: 'Doe',
    designation: 'Software Engineer',
    employeeId: 'EMP-001',
    department: 'Engineering',
    employmentType: 'Full-Time',
    tenure: '2 years',
    dateOfJoining: '2023-06-15'
  },
  stats: {
    hoursThisMonth: 120,
    hoursThisWeek: 32,
    activeProjects: 3,
    pendingApprovals: 2,
    daysLoggedThisMonth: 18,
    tasksAssigned: 15
  },
  statusCounts: {
    approved: 10,
    waiting: 3,
    rejected: 1,
    notSubmitted: 4
  },
  projects: [
    { title: 'Project Alpha', hours: 45, endDate: '2026-12-31' },
    { title: 'Project Beta', hours: 30, endDate: null },
    { title: 'Project Gamma', hours: 15 }
  ],
  recentEntries: [
    {
      taskTitle: 'Design Review',
      projectTitle: 'Project Alpha',
      date: '2026-09-10',
      hours: 4,
      status: 'Approved'
    },
    {
      taskTitle: 'Code Implementation',
      projectTitle: 'Project Beta',
      date: '2026-09-09',
      hours: 6,
      status: 'Waiting For Approval'
    }
  ]
};

describe('Dashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppTheme.mockReturnValue({
      themeConfig: mockThemeConfig,
      organizationConfig: { organization_name: 'srytal' },
      isDarkTheme: false,
      appColors: {
        primaryText: '#f8fafc',
        mutedText: '#94a3b8',
        secondaryText: '#cbd5e1',
        cardBackground: '#0f172a',
        cardSurface: '#1e293b',
        cardBorder: '#334155'
      }
    });
  });

  it('renders the dashboard with full profile data', () => {
    mockUseGetEmployeeDashboard.mockReturnValue({
      data: fullProfileData,
      isLoading: false
    });

    render(
      <Wrapper>
        <Dashboard />
      </Wrapper>
    );

    expect(screen.getByText(/Good (Morning|Afternoon|Evening)/)).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('ID: EMP-001')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Full-Time')).toBeInTheDocument();
    expect(screen.getByText('2 years')).toBeInTheDocument();
  });

  it('renders stat cards with correct values', () => {
    mockUseGetEmployeeDashboard.mockReturnValue({
      data: fullProfileData,
      isLoading: false
    });

    render(
      <Wrapper>
        <Dashboard />
      </Wrapper>
    );

    expect(screen.getByText('120h')).toBeInTheDocument();
    expect(screen.getByText('32h')).toBeInTheDocument();
    expect(screen.getAllByText('3').length).toBeGreaterThan(0);
    expect(screen.getAllByText('2').length).toBeGreaterThan(0);
    expect(screen.getByText('Hours This Month')).toBeInTheDocument();
    expect(screen.getByText('Hours This Week')).toBeInTheDocument();
    expect(screen.getByText('Active Projects')).toBeInTheDocument();
    expect(screen.getByText('Pending Approvals')).toBeInTheDocument();
  });

  it('renders project cards with progress bars', () => {
    mockUseGetEmployeeDashboard.mockReturnValue({
      data: fullProfileData,
      isLoading: false
    });

    render(
      <Wrapper>
        <Dashboard />
      </Wrapper>
    );

    expect(screen.getByText('My Projects')).toBeInTheDocument();
    expect(screen.getByText('Project Alpha')).toBeInTheDocument();
    expect(screen.getByText('Project Beta')).toBeInTheDocument();
    expect(screen.getByText('Project Gamma')).toBeInTheDocument();
    expect(screen.getByText('45h')).toBeInTheDocument();
  });

  it('renders recent timesheet activity', () => {
    mockUseGetEmployeeDashboard.mockReturnValue({
      data: fullProfileData,
      isLoading: false
    });

    render(
      <Wrapper>
        <Dashboard />
      </Wrapper>
    );

    expect(screen.getByText('Recent Timesheet Activity')).toBeInTheDocument();
    expect(screen.getByText('Design Review')).toBeInTheDocument();
    expect(screen.getByText('Code Implementation')).toBeInTheDocument();
    expect(screen.getAllByText('Approved').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Waiting For Approval').length).toBeGreaterThan(
      0
    );
  });

  it('renders timesheet status breakdown', () => {
    mockUseGetEmployeeDashboard.mockReturnValue({
      data: fullProfileData,
      isLoading: false
    });

    render(
      <Wrapper>
        <Dashboard />
      </Wrapper>
    );

    expect(screen.getByText('Timesheet Status')).toBeInTheDocument();
    expect(screen.getByText('Rejected')).toBeInTheDocument();
    expect(screen.getByText('Not Submitted')).toBeInTheDocument();
  });

  it('renders this month snapshot section', () => {
    mockUseGetEmployeeDashboard.mockReturnValue({
      data: fullProfileData,
      isLoading: false
    });

    render(
      <Wrapper>
        <Dashboard />
      </Wrapper>
    );

    expect(screen.getByText('This Month')).toBeInTheDocument();
    expect(screen.getByText('Days Logged')).toBeInTheDocument();
    expect(screen.getByText('Tasks Assigned')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('shows loading skeletons when isLoading is true', () => {
    mockUseGetEmployeeDashboard.mockReturnValue({
      data: undefined,
      isLoading: true
    });

    const { container } = render(
      <Wrapper>
        <Dashboard />
      </Wrapper>
    );

    const skeletons = container.querySelectorAll('.mantine-Skeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders empty state when no projects exist', () => {
    mockUseGetEmployeeDashboard.mockReturnValue({
      data: {
        ...fullProfileData,
        projects: [],
        recentEntries: [],
        statusCounts: {
          approved: 0,
          waiting: 0,
          rejected: 0,
          notSubmitted: 0
        }
      },
      isLoading: false
    });

    render(
      <Wrapper>
        <Dashboard />
      </Wrapper>
    );

    expect(screen.getByText('No projects assigned yet')).toBeInTheDocument();
    expect(screen.getByText('No timesheet entries yet')).toBeInTheDocument();
    expect(screen.getByText('No timesheet records yet')).toBeInTheDocument();
  });

  it('handles zero stats gracefully', () => {
    mockUseGetEmployeeDashboard.mockReturnValue({
      data: {
        ...fullProfileData,
        stats: {
          hoursThisMonth: 0,
          hoursThisWeek: 0,
          activeProjects: 0,
          pendingApprovals: 0,
          daysLoggedThisMonth: 0,
          tasksAssigned: 0
        }
      },
      isLoading: false
    });

    render(
      <Wrapper>
        <Dashboard />
      </Wrapper>
    );

    expect(screen.getAllByText('0').length).toBeGreaterThan(0);
  });

  it('handles missing profile data', () => {
    mockUseGetEmployeeDashboard.mockReturnValue({
      data: {
        profile: {},
        stats: null,
        statusCounts: null,
        projects: [],
        recentEntries: []
      },
      isLoading: false
    });

    render(
      <Wrapper>
        <Dashboard />
      </Wrapper>
    );

    expect(screen.getByText('there')).toBeInTheDocument();
    expect(screen.getByText('U')).toBeInTheDocument();
  });

  it('handles null data response', () => {
    mockUseGetEmployeeDashboard.mockReturnValue({
      data: null,
      isLoading: false
    });

    render(
      <Wrapper>
        <Dashboard />
      </Wrapper>
    );

    expect(screen.getByText('there')).toBeInTheDocument();
  });
});
