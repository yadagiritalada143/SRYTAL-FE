import { render, screen, waitFor } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import React, { Suspense } from 'react';
import UserRoutes from '../user';

jest.mock('@constants', () => ({
  BASE_URL: 'http://localhost:3000/',
  ROLES: {
    ADMIN: 'admin',
    SUPER_ADMIN: 'superadmin',
    USER: 'Employee',
    RECRUITER: 'Recruiter',
    CONTENT_WRITER: 'ContentWriter'
  }
}));

jest.mock('@services/common-services', () => ({
  getOrganizationConfig: jest.fn().mockResolvedValue({
    organization_name: 'srytal',
    organization_theme: {}
  })
}));

jest.mock('@hooks/queries/useNavQueries', () => ({
  useGetMyNavMenu: () => ({ data: undefined, isLoading: true })
}));

jest.mock('@hooks/user-context', () => {
  const m = jest.fn(({ children }: any) => children);
  return { __esModule: true, default: m };
});

const mockThemeConfig = {
  primaryColor: 'primary',
  fontFamily: 'Arial, sans-serif',
  color: '#212529',
  backgroundColor: '#ffffff',
  borderColor: '#dee2e6',
  linkColor: '#dc3545',
  headerBackgroundColor: '#f8f9fa',
  dangerColor: '#e03131',
  button: { color: '#495057', textColor: '#ffffff', hoverColor: '#343a40' },
  colors: {
    primary: ['#495057'],
    secondary: ['#6c757d']
  }
};

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: mockThemeConfig,
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' },
    appColors: {}
  })
}));

jest.mock('@user/pages/login/login', () => {
  const m = jest.fn(() => <div>LoginPage</div>);
  return { __esModule: true, default: m };
});

jest.mock('@user/pages/dashboard/dashboard', () => {
  const { Outlet } = jest.requireActual('react-router-dom');
  const m = jest.fn(() => (
    <div>
      EmployeeDashboardLayout
      <Outlet />
    </div>
  ));
  return { __esModule: true, default: m };
});

jest.mock('@user/components/dashboard/companies/companies', () => {
  const m = jest.fn(() => <div>Companies</div>);
  return { __esModule: true, default: m };
});

jest.mock('@user/components/dashboard/add-company/add-company', () => {
  const m = jest.fn(() => <div>AddCompany</div>);
  return { __esModule: true, default: m };
});

jest.mock('@user/components/dashboard/update-company/update-company', () => {
  const m = jest.fn(() => <div>UpdateCompany</div>);
  return { __esModule: true, default: m };
});

jest.mock('@user/components/dashboard/profile/UserProfile', () => {
  const m = jest.fn(() => <div>EmployeeProfile</div>);
  return { __esModule: true, default: m };
});

jest.mock('@user/components/dashboard/candidate/candidate', () => {
  const m = jest.fn(() => <div>PoolCandidateList</div>);
  return { __esModule: true, default: m };
});

jest.mock('@user/components/dashboard/add-candidate/add-candidate', () => {
  const m = jest.fn(() => <div>AddPoolCandidate</div>);
  return { __esModule: true, default: m };
});

jest.mock(
  '@user/components/dashboard/update-candidate/update-candidate',
  () => {
    const m = jest.fn(() => <div>UpdatePoolCandidateForm</div>);
    return { __esModule: true, default: m };
  }
);

jest.mock('@user/components/dashboard/content-writer/WriterDashboard', () => {
  const m = jest.fn(() => <div>WriterDashboard</div>);
  return { __esModule: true, default: m };
});

jest.mock('@user/components/dashboard/add-course/AddCourse', () => {
  const m = jest.fn(() => <div>AddCourse</div>);
  return { __esModule: true, default: m };
});

jest.mock('@user/components/dashboard/edit-course/CourseDetails', () => {
  const m = jest.fn(() => <div>CourseDetails</div>);
  return { __esModule: true, default: m };
});

jest.mock(
  '@user/components/dashboard/course-portal/EmployeeCoursePortal',
  () => {
    const m = jest.fn(() => <div>EmployeeCoursePortal</div>);
    return { __esModule: true, default: m };
  }
);

jest.mock('@user/components/dashboard/course-portal/CoursePlayer', () => {
  const m = jest.fn(() => <div>CoursePlayer</div>);
  return { __esModule: true, default: m };
});

jest.mock('@components/common/dashboard/dashboard', () => {
  const m = jest.fn(() => <div>CommonDashboard</div>);
  return { __esModule: true, default: m };
});

jest.mock('@components/common/payslip/payslip', () => {
  const m = jest.fn(() => <div>PayslipList</div>);
  return { __esModule: true, default: m };
});

jest.mock('@components/common/support/support', () => {
  const m = jest.fn(() => <div>Support</div>);
  return { __esModule: true, default: m };
});

jest.mock('@components/common/mytasks/mytasks', () => {
  const m = jest.fn(() => <div>MyTasks</div>);
  return { __esModule: true, default: m };
});

jest.mock('@components/common/announcements/announcements', () => {
  const m = jest.fn(() => <div>Announcements</div>);
  return { __esModule: true, default: m };
});

jest.mock('@components/common/mentees/mentees', () => {
  const m = jest.fn(() => <div>Mentees</div>);
  return { __esModule: true, default: m };
});

jest.mock('@components/common/update-mentee-task/UpdateMenteeTasks', () => {
  const m = jest.fn(() => <div>UpdateMenteeTasks</div>);
  return { __esModule: true, default: m };
});

jest.mock('@components/common/mytasks/taskdetails', () => {
  const m = jest.fn(() => <div>TaskDetail</div>);
  return { __esModule: true, default: m };
});

jest.mock('@components/common/timesheet/timesheet', () => {
  const m = jest.fn(() => <div>Timesheet</div>);
  return { __esModule: true, default: m };
});

jest.mock('@components/common/reports/salary-slip', () => {
  const m = jest.fn(() => <div>SalarySlipReport</div>);
  return { __esModule: true, default: m };
});

const qc = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
});

const renderRoutes = (path: string) => {
  return render(
    <RecoilRoot>
      <QueryClientProvider client={qc}>
        <MantineProvider>
          <MemoryRouter initialEntries={[path]}>
            <Suspense fallback={<div>loading-routes</div>}>
              <Routes>
                <Route
                  path='/:organization/employee/*'
                  element={<UserRoutes />}
                />
              </Routes>
            </Suspense>
          </MemoryRouter>
        </MantineProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

describe('UserRoutes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders without crashing on the login route', async () => {
    renderRoutes('/srytal/employee/login');
    expect(await screen.findByText('LoginPage')).toBeInTheDocument();
  });

  it('requires authorization before showing the dashboard', async () => {
    renderRoutes('/srytal/employee/dashboard/profile');
    await waitFor(() =>
      expect(screen.queryByText('EmployeeProfile')).not.toBeInTheDocument()
    );
  });

  it('renders the dashboard index route for authenticated employees', async () => {
    localStorage.setItem('token', 'token-123');
    localStorage.setItem('userRole', 'Employee');
    renderRoutes('/srytal/employee/dashboard');
    expect(await screen.findByText('CommonDashboard')).toBeInTheDocument();
  });

  it('renders the profile route inside the dashboard layout', async () => {
    localStorage.setItem('token', 'token-123');
    localStorage.setItem('userRole', 'Employee');
    renderRoutes('/srytal/employee/dashboard/profile');
    expect(await screen.findByText('EmployeeProfile')).toBeInTheDocument();
  });

  it('renders the timesheet route', async () => {
    localStorage.setItem('token', 'token-123');
    localStorage.setItem('userRole', 'Employee');
    renderRoutes('/srytal/employee/dashboard/timesheet');
    expect(await screen.findByText('Timesheet')).toBeInTheDocument();
  });

  it('renders mytasks routes', async () => {
    localStorage.setItem('token', 'token-123');
    localStorage.setItem('userRole', 'Employee');
    renderRoutes('/srytal/employee/dashboard/mytasks');
    expect(await screen.findByText('MyTasks')).toBeInTheDocument();
  });

  it('renders recruiter-only pool candidates route for recruiters', async () => {
    localStorage.setItem('token', 'token-123');
    localStorage.setItem('userRole', 'Recruiter');
    renderRoutes('/srytal/employee/dashboard/pool-candidates');
    expect(await screen.findByText('PoolCandidateList')).toBeInTheDocument();
  });

  it('does not render recruiter-only routes for employees', async () => {
    localStorage.setItem('token', 'token-123');
    localStorage.setItem('userRole', 'Employee');
    renderRoutes('/srytal/employee/dashboard/pool-candidates');
    await waitFor(() =>
      expect(screen.queryByText('PoolCandidateList')).not.toBeInTheDocument()
    );
  });

  it('renders the support route', async () => {
    localStorage.setItem('token', 'token-123');
    localStorage.setItem('userRole', 'Employee');
    renderRoutes('/srytal/employee/dashboard/support');
    expect(await screen.findByText('Support')).toBeInTheDocument();
  });

  it('renders the announcements route', async () => {
    localStorage.setItem('token', 'token-123');
    localStorage.setItem('userRole', 'Employee');
    renderRoutes('/srytal/employee/dashboard/announcements');
    expect(await screen.findByText('Announcements')).toBeInTheDocument();
  });

  it('renders the course assignments routes', async () => {
    localStorage.setItem('token', 'token-123');
    localStorage.setItem('userRole', 'Employee');
    renderRoutes('/srytal/employee/dashboard/course-assignments');
    expect(await screen.findByText('EmployeeCoursePortal')).toBeInTheDocument();
  });
});
