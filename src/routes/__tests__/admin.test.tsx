import { render, screen, waitFor } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import React, { Suspense } from 'react';
import AdminRoutes from '../admin';

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

jest.mock('@admin/pages/dashboard/dashboard', () => {
  const { Outlet } = jest.requireActual('react-router-dom');
  const m = jest.fn(() => (
    <div>
      AdminDashboardLayout
      <Outlet />
    </div>
  ));
  return { __esModule: true, default: m };
});

jest.mock('@admin/pages/login/login', () => {
  const m = jest.fn(() => <div>AdminLoginPage</div>);
  return { __esModule: true, default: m };
});

jest.mock('@admin/components/dashboard/add-employee/add-employee', () => {
  const m = jest.fn(() => <div>AddEmployee</div>);
  return { __esModule: true, default: m };
});

jest.mock('@admin/components/dashboard/employees/employees', () => {
  const m = jest.fn(() => <div>Employees</div>);
  return { __esModule: true, default: m };
});

jest.mock('@admin/components/dashboard/update-employee/update-employee', () => {
  const m = jest.fn(() => <div>UpdateEmployee</div>);
  return { __esModule: true, default: m };
});

jest.mock('@admin/components/dashboard/profile/AdminProfile', () => {
  const m = jest.fn(() => <div>AdminProfile</div>);
  return { __esModule: true, default: m };
});

jest.mock('@admin/components/dashboard/admin-dashboard/AdminDashboard', () => {
  const m = jest.fn(() => <div>AdminDashboardOverview</div>);
  return { __esModule: true, default: m };
});

jest.mock('@admin/components/dashboard/settings/NavAccess', () => {
  const m = jest.fn(() => <div>NavAccess</div>);
  return { __esModule: true, default: m };
});

jest.mock('@admin/components/dashboard/blood-group/BloodGroup', () => {
  const m = jest.fn(() => <div>BloodGroupTable</div>);
  return { __esModule: true, default: m };
});

jest.mock('@admin/components/dashboard/employment-type/EmploymentType', () => {
  const m = jest.fn(() => <div>EmploymentTypes</div>);
  return { __esModule: true, default: m };
});

jest.mock(
  '@admin/components/dashboard/employment-roles/EmploymentRoles',
  () => {
    const m = jest.fn(() => <div>EmploymentRoles</div>);
    return { __esModule: true, default: m };
  }
);

jest.mock('@admin/components/dashboard/reports/reports', () => {
  const { Outlet } = jest.requireActual('react-router-dom');
  const m = jest.fn(() => (
    <div>
      Reports
      <Outlet />
    </div>
  ));
  return { __esModule: true, default: m };
});

jest.mock('@admin/components/dashboard/reports/generate-offer', () => {
  const m = jest.fn(() => <div>GenerateOfferReport</div>);
  return { __esModule: true, default: m };
});

jest.mock('@admin/components/dashboard/reports/generate-salary-slip', () => {
  const m = jest.fn(() => <div>GenerateSalarySlipReport</div>);
  return { __esModule: true, default: m };
});

jest.mock('@admin/components/dashboard/reports/all-employee-reports', () => {
  const m = jest.fn(() => <div>EmployeeReports</div>);
  return { __esModule: true, default: m };
});

jest.mock('@admin/components/dashboard/packages/packages', () => {
  const m = jest.fn(() => <div>Packages</div>);
  return { __esModule: true, default: m };
});

jest.mock('@admin/components/dashboard/add-package/add-package', () => {
  const m = jest.fn(() => <div>AddPackage</div>);
  return { __esModule: true, default: m };
});

jest.mock('@admin/components/dashboard/update-package/update-package', () => {
  const m = jest.fn(() => <div>UpdatePackage</div>);
  return { __esModule: true, default: m };
});

jest.mock('@admin/components/dashboard/settings/SettingsLayout', () => {
  const { Outlet } = jest.requireActual('react-router-dom');
  const m = jest.fn(() => (
    <div>
      SettingsLayout
      <Outlet />
    </div>
  ));
  return { __esModule: true, default: m };
});

jest.mock('@admin/components/dashboard/settings/FeedbackTable', () => {
  const m = jest.fn(() => <div>FeedbackTable</div>);
  return { __esModule: true, default: m };
});

jest.mock('@admin/components/dashboard/settings/DepartmentTable', () => {
  const m = jest.fn(() => <div>DepartmentTable</div>);
  return { __esModule: true, default: m };
});

jest.mock('@components/common/timesheet/timesheet', () => {
  const m = jest.fn(() => <div>DateTableComponent</div>);
  return { __esModule: true, default: m };
});

jest.mock('@admin/components/dashboard/update-employee/package-wrapper', () => {
  const m = jest.fn(() => <div>PackagePageWrapper</div>);
  return { __esModule: true, default: m };
});

jest.mock(
  '@admin/components/dashboard/employee-timesheet/employee-timesheet',
  () => {
    const m = jest.fn(() => <div>EmployeeTimesheetAdminView</div>);
    return { EmployeeTimesheetAdminView: m };
  }
);

jest.mock('@admin/components/dashboard/notifications/Notifications', () => {
  const m = jest.fn(() => <div>Notifications</div>);
  return { __esModule: true, default: m };
});

jest.mock(
  '@admin/components/dashboard/course-assignments/CourseAssignments',
  () => {
    const m = jest.fn(() => <div>CourseAssignments</div>);
    return { __esModule: true, default: m };
  }
);

jest.mock('@admin/components/dashboard/track-progress/TrackProgress', () => {
  const m = jest.fn(() => <div>TrackProgress</div>);
  return { __esModule: true, default: m };
});

jest.mock(
  '@admin/components/dashboard/track-progress/EmployeeCourseProgress',
  () => {
    const m = jest.fn(() => <div>EmployeeCourseProgress</div>);
    return { __esModule: true, default: m };
  }
);

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
                  path='/:organization/admin/*'
                  element={<AdminRoutes />}
                />
              </Routes>
            </Suspense>
          </MemoryRouter>
        </MantineProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

describe('AdminRoutes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders without crashing on the login route', async () => {
    renderRoutes('/srytal/admin/login');
    expect(await screen.findByText('AdminLoginPage')).toBeInTheDocument();
  });

  it('requires authorization before showing the dashboard', async () => {
    renderRoutes('/srytal/admin/dashboard/employees');
    await waitFor(() =>
      expect(screen.queryByText('Employees')).not.toBeInTheDocument()
    );
  });

  it('renders the dashboard index route for authenticated admins', async () => {
    localStorage.setItem('token', 'token-123');
    localStorage.setItem('userRole', 'admin');
    renderRoutes('/srytal/admin/dashboard');
    expect(
      await screen.findByText('AdminDashboardOverview')
    ).toBeInTheDocument();
  });

  it('renders the employees list route', async () => {
    localStorage.setItem('token', 'token-123');
    localStorage.setItem('userRole', 'admin');
    renderRoutes('/srytal/admin/dashboard/employees');
    expect(await screen.findByText('Employees')).toBeInTheDocument();
  });

  it('renders the add employee route', async () => {
    localStorage.setItem('token', 'token-123');
    localStorage.setItem('userRole', 'admin');
    renderRoutes('/srytal/admin/dashboard/addemployee');
    expect(await screen.findByText('AddEmployee')).toBeInTheDocument();
  });

  it('renders the admin profile route', async () => {
    localStorage.setItem('token', 'token-123');
    localStorage.setItem('userRole', 'admin');
    renderRoutes('/srytal/admin/dashboard/profile');
    expect(await screen.findByText('AdminProfile')).toBeInTheDocument();
  });

  it('renders the nested report routes', async () => {
    localStorage.setItem('token', 'token-123');
    localStorage.setItem('userRole', 'admin');
    renderRoutes('/srytal/admin/dashboard/reports/generate-salary-slip');
    expect(
      await screen.findByText('GenerateSalarySlipReport')
    ).toBeInTheDocument();
  });

  it('renders timesheet routes', async () => {
    localStorage.setItem('token', 'token-123');
    localStorage.setItem('userRole', 'admin');
    renderRoutes('/srytal/admin/dashboard/timesheet');
    expect(await screen.findByText('DateTableComponent')).toBeInTheDocument();
  });

  it('redirects the settings route to blood groups', async () => {
    localStorage.setItem('token', 'token-123');
    localStorage.setItem('userRole', 'admin');
    renderRoutes('/srytal/admin/dashboard/settings');
    expect(await screen.findByText('BloodGroupTable')).toBeInTheDocument();
  });

  it('renders settings child routes', async () => {
    localStorage.setItem('token', 'token-123');
    localStorage.setItem('userRole', 'admin');
    renderRoutes('/srytal/admin/dashboard/settings/menu-access');
    expect(await screen.findByText('NavAccess')).toBeInTheDocument();
  });
});
