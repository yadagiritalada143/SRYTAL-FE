import {
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate,
  Outlet
} from 'react-router-dom';
import { useEffect, useState, useMemo, lazy, Suspense } from 'react';
import { toast } from 'react-toastify';
import { MantineProvider, LoadingOverlay } from '@mantine/core';
import '@mantine/core/styles.css';
import { getOrganizationConfig } from '@services/common-services';
import Loader from '@components/common/loader/loader';
import { useSetRecoilState } from 'recoil';
import { organizationThemeAtom } from '@atoms/organization-atom';
import { themeAtom } from '@atoms/theme';

import { organizationAdminUrls } from '@utils/common/constants';
import { ROLES } from '@constants';
import UserProvider from '@hooks/user-context';
import { ThemeToggleButton } from '@components/UI/Theme-toggle-button/button';
import { useAppTheme } from '@hooks/use-app-theme';
import { OrganizationConfig } from '@interfaces/organization';

// Lazy loaded components
const AdminDashboard = lazy(() => import('@admin/pages/dashboard/dashboard'));
const AdminLogin = lazy(() => import('@admin/pages/login/login'));
const AddEmployee = lazy(
  () => import('@admin/components/dashboard/add-employee/add-employee')
);
const Employees = lazy(
  () => import('@admin/components/dashboard/employees/employees')
);
const UpdateEmployee = lazy(
  () => import('@admin/components/dashboard/update-employee/update-employee')
);
const AdminProfile = lazy(
  () => import('@admin/components/dashboard/profile/AdminProfile')
);
const BloodGroupTable = lazy(
  () => import('@admin/components/dashboard/blood-group/BloodGroup')
);
const EmploymentTypes = lazy(
  () => import('@admin/components/dashboard/employment-type/EmploymentType')
);
const EmploymentRoles = lazy(
  () => import('@admin/components/dashboard/employment-roles/EmploymentRoles')
);
const Reports = lazy(
  () => import('@admin/components/dashboard/reports/reports')
);
const GenerateOfferReport = lazy(
  () => import('@admin/components/dashboard/reports/generate-offer')
);
const GenerateSalarySlipReport = lazy(
  () => import('@admin/components/dashboard/reports/generate-salary-slip')
);
const EmployeeReports = lazy(
  () => import('@admin/components/dashboard/reports/all-employee-reports')
);
const Packages = lazy(
  () => import('@admin/components/dashboard/packages/packages')
);
const AddPackage = lazy(
  () => import('@admin/components/dashboard/add-package/add-package')
);
const UpdatePackage = lazy(
  () => import('@admin/components/dashboard/update-package/update-package')
);
const SettingsLayout = lazy(
  () => import('@admin/components/dashboard/settings/SettingsLayout')
);
const FeedbackTable = lazy(
  () => import('@admin/components/dashboard/settings/FeedbackTable')
);
const DepartmentTable = lazy(
  () => import('@admin/components/dashboard/settings/DepartmentTable')
);
const DateTableComponent = lazy(
  () => import('@components/common/timesheet/timesheet')
);
const PackagePageWrapper = lazy(
  () => import('@admin/components/dashboard/update-employee/package-wrapper')
);
const EmployeeTimesheetAdminView = lazy(() =>
  import(
    '@admin/components/dashboard/employee-timesheet/employee-timesheet'
  ).then(m => ({ default: m.EmployeeTimesheetAdminView }))
);

// User domain components reused in Admin
const Companies = lazy(
  () => import('@user/components/dashboard/companies/companies')
);
const AddCompany = lazy(
  () => import('@user/components/dashboard/add-company/add-company')
);
const UpdateCompany = lazy(
  () => import('@user/components/dashboard/update-company/update-company')
);
const PoolCandidateList = lazy(
  () => import('@user/components/dashboard/candidate/candidate')
);
const AddPoolCandidate = lazy(
  () => import('@user/components/dashboard/add-candidate/add-candidate')
);
const UpdatePoolCandidateForm = lazy(
  () => import('@user/components/dashboard/update-candidate/update-candidate')
);

const AdminRoutes = () => {
  const { organization } = useParams<{ organization: string }>();
  const {
    themeConfig: currentThemeConfig,
    organizationConfig,
    isDarkTheme
  } = useAppTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setOrganizationConfig = useSetRecoilState(organizationThemeAtom);

  const setTheme = useSetRecoilState(themeAtom);

  useEffect(() => {
    if (organization) {
      setIsLoading(true);
      getOrganizationConfig(organization).then(
        (response: OrganizationConfig) => {
          setOrganizationConfig(response);
          setIsLoading(false);
        }
      );
    }
  }, [organization, setOrganizationConfig]);

  // Get the current theme configuration based on theme mode

  const mantineTheme = useMemo(() => {
    return {
      colorScheme: currentThemeConfig.colorScheme,
      primaryColor: currentThemeConfig.primaryColor,
      fontFamily: currentThemeConfig.fontFamily,
      colors: {
        primary: currentThemeConfig.colors.primary as any,
        secondary: currentThemeConfig.colors.secondary as any
      },
      headings: {
        fontFamily: currentThemeConfig.fontFamily
      },

      components: {
        Title: {
          styles: () => ({
            root: {
              color: currentThemeConfig.color,
              transition: 'color 0.3s ease-in-out'
            }
          })
        },
        Tabs: {
          styles: () => ({
            root: {
              transition: 'all 0.3s ease-in-out'
            },
            list: {
              borderColor: currentThemeConfig.headerBackgroundColor,
              borderRadius: '8px',
              padding: '4px'
            },
            tab: {
              color: currentThemeConfig.button.color,
              fontWeight: 500
            }
          }),
          defaultProps: {
            variant: 'default',
            radius: 'md'
          }
        },
        Text: {
          styles: () => ({
            root: {
              color: currentThemeConfig.color,
              transition: 'color 0.3s ease-in-out'
            }
          })
        },
        Avatar: {
          styles: () => ({
            root: {
              color: currentThemeConfig.color,
              transition: 'color 0.3s ease-in-out'
            }
          })
        },
        Modal: {
          styles: () => ({
            title: {
              fontWeight: 600,
              fontSize: '1.25rem',
              color: currentThemeConfig.color,
              transition: 'color 0.3s ease-in-out'
            },
            header: {
              backgroundColor: currentThemeConfig.headerBackgroundColor,
              borderBottom: `1px solid ${currentThemeConfig.borderColor}`,
              transition:
                'background-color 0.3s ease-in-out, border-color 0.3s ease-in-out'
            },
            content: {
              backgroundColor: currentThemeConfig.backgroundColor,
              color: currentThemeConfig.color,
              transition:
                'background-color 0.3s ease-in-out, color 0.3s ease-in-out'
            },
            close: {
              color: currentThemeConfig.color,
              transition:
                'color 0.3s ease-in-out, background-color 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: 'transparent',
                color: currentThemeConfig.linkColor
              }
            }
          }),
          defaultProps: {
            radius: 'md',
            shadow: 'xl',
            padding: 'xl',
            size: '600px',
            overlayblur: 3,
            overlayopacity: 0.7
          }
        },
        Menu: {
          styles: () => ({
            dropdown: {
              backgroundColor: currentThemeConfig.colors.primary[5],
              transition: 'background-color 0.3s ease-in-out'
            },
            label: {
              color: currentThemeConfig.button.textColor,
              transition: 'color 0.3s ease-in-out'
            },
            item: {
              color: currentThemeConfig.button.textColor,
              transition: 'color 0.3s ease-in-out'
            }
          })
        },
        Paper: {
          styles: () => ({
            root: {
              backgroundColor: currentThemeConfig.headerBackgroundColor,
              borderBottom: `1px solid ${currentThemeConfig.borderColor}`,
              color: currentThemeConfig.color,
              transition:
                'background-color 0.3s ease-in-out, border-color 0.3s ease-in-out'
            }
          })
        },
        Loader: {
          styles: () => ({
            root: {
              color: currentThemeConfig.button.textColor,
              transition: 'color 0.3s ease-in-out'
            }
          })
        },
        Button: {
          styles: () => ({
            root: {
              backgroundColor: currentThemeConfig.button.color,
              color: currentThemeConfig.button.textColor,
              borderColor: currentThemeConfig.borderColor,
              transition:
                'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out',
              '&:hover': {
                backgroundColor:
                  currentThemeConfig.button.hoverColor ||
                  currentThemeConfig.button.color,
                transform: 'translateY(-1px)',
                transition: 'all 0.2s ease-in-out'
              }
            }
          })
        },
        TextInput: {
          styles: () => ({
            input: {
              backgroundColor: currentThemeConfig.headerBackgroundColor,
              color: currentThemeConfig.color,
              borderColor: currentThemeConfig.borderColor,
              transition:
                'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out',
              '&:focus': {
                borderColor: currentThemeConfig.button.color
              }
            },
            label: {
              color: currentThemeConfig.color,
              transition: 'color 0.3s ease-in-out'
            }
          })
        },
        NumberInput: {
          styles: () => ({
            input: {
              backgroundColor: currentThemeConfig.headerBackgroundColor,
              color: currentThemeConfig.color,
              borderColor: currentThemeConfig.borderColor,
              transition:
                'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out',
              '&:focus': {
                borderColor: currentThemeConfig.button.color
              }
            },
            label: {
              color: currentThemeConfig.color,
              transition: 'color 0.3s ease-in-out'
            }
          })
        },
        DateInput: {
          styles: () => ({
            input: {
              backgroundColor: currentThemeConfig.headerBackgroundColor,
              color: currentThemeConfig.color,
              borderColor: currentThemeConfig.borderColor,
              transition:
                'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out',
              '&:focus': {
                borderColor: currentThemeConfig.button.color
              }
            },
            label: {
              color: currentThemeConfig.color,
              transition: 'color 0.3s ease-in-out'
            }
          })
        },
        DateTimePicker: {
          styles: () => ({
            input: {
              backgroundColor: currentThemeConfig.headerBackgroundColor,
              color: currentThemeConfig.color,
              borderColor: currentThemeConfig.borderColor,
              transition:
                'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out',
              '&:focus': {
                borderColor: currentThemeConfig.button.color
              }
            },
            label: {
              color: currentThemeConfig.color,
              transition: 'color 0.3s ease-in-out'
            }
          })
        },
        DatePickerInput: {
          styles: () => ({
            input: {
              backgroundColor: currentThemeConfig.headerBackgroundColor,
              color: currentThemeConfig.color,
              borderColor: currentThemeConfig.borderColor,
              transition:
                'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out',
              '&:focus': {
                borderColor: currentThemeConfig.button.color
              }
            },
            label: {
              color: currentThemeConfig.color,
              transition: 'color 0.3s ease-in-out'
            }
          })
        },
        Textarea: {
          styles: () => ({
            input: {
              backgroundColor: currentThemeConfig.headerBackgroundColor,
              color: currentThemeConfig.color,
              borderColor: currentThemeConfig.borderColor,
              transition:
                'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out',
              '&:focus': {
                borderColor: currentThemeConfig.button.color
              }
            },
            label: {
              color: currentThemeConfig.color,
              transition: 'color 0.3s ease-in-out'
            }
          })
        },
        MultiSelect: {
          styles: () => ({
            input: {
              backgroundColor: currentThemeConfig.headerBackgroundColor,
              color: currentThemeConfig.color,
              borderColor: currentThemeConfig.borderColor,
              transition:
                'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out',
              '&:focus': {
                borderColor: currentThemeConfig.button.color
              }
            },
            label: {
              color: currentThemeConfig.color,
              transition: 'color 0.3s ease-in-out'
            }
          })
        },
        PasswordInput: {
          styles: () => ({
            input: {
              backgroundColor: currentThemeConfig.headerBackgroundColor,
              color: currentThemeConfig.color,
              borderColor: currentThemeConfig.borderColor,
              transition:
                'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out',
              '&:focus': {
                borderColor: currentThemeConfig.button.color
              }
            },
            label: {
              color: currentThemeConfig.color,
              transition: 'color 0.3s ease-in-out'
            },
            innerInput: {
              backgroundColor: currentThemeConfig.headerBackgroundColor,
              color: currentThemeConfig.color,
              transition:
                'background-color 0.3s ease-in-out, color 0.3s ease-in-out'
            }
          })
        },
        Select: {
          styles: () => ({
            input: {
              backgroundColor: currentThemeConfig.headerBackgroundColor,
              color: currentThemeConfig.color,
              borderColor: currentThemeConfig.borderColor,
              transition:
                'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out',
              '&:focus': {
                borderColor: currentThemeConfig.button.color
              }
            },
            label: {
              color: currentThemeConfig.color,
              transition: 'color 0.3s ease-in-out'
            }
          })
        },
        Table: {
          styles: () => ({
            table: {
              backgroundColor: currentThemeConfig.backgroundColor,
              color: currentThemeConfig.color,
              transition:
                'background-color 0.3s ease-in-out, color 0.3s ease-in-out'
            },
            th: {
              backgroundColor: currentThemeConfig.headerBackgroundColor,
              color: currentThemeConfig.color,
              borderColor: currentThemeConfig.borderColor,
              transition:
                'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out'
            },
            td: {
              borderColor: currentThemeConfig.borderColor,
              color: currentThemeConfig.color,
              transition:
                'border-color 0.3s ease-in-out, color 0.3s ease-in-out'
            }
          })
        },
        Card: {
          styles: () => ({
            root: {
              backgroundColor: currentThemeConfig.headerBackgroundColor,
              color: currentThemeConfig.color,
              borderColor: currentThemeConfig.borderColor,
              transition:
                'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out'
            }
          })
        }
      }
    };
  }, [currentThemeConfig]);

  return (
    <MantineProvider theme={mantineTheme}>
      <div
        className='d-flex justify-end p-4 absolute right-0 transition-colors duration-300 ease-in-out'
        style={{
          backgroundColor: 'transparent',
          zIndex: 1000
        }}
      >
        <ThemeToggleButton isDarkTheme={isDarkTheme} setTheme={setTheme} />
      </div>
      <Routes>
        <Route path='/login' element={<AdminLogin />} />
        <Route
          element={
            <UserProvider>
              <AdminProtectedRoutes />
            </UserProvider>
          }
        >
          <Route path='/dashboard' element={<AdminDashboard />}>
            <Route path='addemployee' element={<AddEmployee />} />
            <Route path='' element={<Employees />} />
            <Route path='profile' element={<AdminProfile />} />
            <Route path='pool-companies' element={<Companies />} />
            <Route path='add-pool-companies' element={<AddCompany />} />
            <Route path='add-pool-candidate' element={<AddPoolCandidate />} />
            <Route path='packages' element={<Packages />} />
            <Route path='/dashboard/addPackage' element={<AddPackage />} />
            <Route path='updates/:packageId' element={<UpdatePackage />} />
            <Route path='reports' element={<Reports />}>
              <Route path='generate-offer' element={<GenerateOfferReport />} />
              <Route
                path='generate-salary-slip'
                element={<GenerateSalarySlipReport />}
              />
              <Route
                path='all-employee-reports'
                element={<EmployeeReports />}
              />
            </Route>
            <Route path='timesheet' element={<DateTableComponent />} />
            <Route
              path=':candidateId/edit-pool-candidate'
              element={<UpdatePoolCandidateForm />}
            />
            <Route path='update/:employeeId' element={<UpdateEmployee />} />
            <Route
              path='package/:employeeId'
              element={<PackagePageWrapper />}
            />
            <Route
              path='timesheet/:employeeId'
              element={<EmployeeTimesheetAdminView />}
            />
            <Route path='pool-candidates' element={<PoolCandidateList />} />
            <Route
              path='update-pool-company/:companyId'
              element={<UpdateCompany />}
            />
            <Route path='settings' element={<SettingsLayout />}>
              <Route index element={<Navigate to='blood-groups' replace />} />
              <Route path='blood-groups' element={<BloodGroupTable />} />
              <Route path='employment-types' element={<EmploymentTypes />} />
              <Route path='employment-roles' element={<EmploymentRoles />} />
              <Route path='department-names' element={<DepartmentTable />} />
              <Route path='feedback' element={<FeedbackTable />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </MantineProvider>
  );
};

const AdminProtectedRoutes = () => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  const navigate = useNavigate();

  const { organizationConfig } = useAppTheme();

  useEffect(() => {
    if (!userRole || !token || userRole !== ROLES.ADMIN) {
      setTimeout(() => {
        toast.error('Not authorized to access');
        navigate(
          `${organizationAdminUrls(organizationConfig.organization_name)}/login`
        );
      }, 500);
    }
  }, [navigate, userRole, token, organizationConfig.organization_name]);

  if (!userRole || !token || userRole !== ROLES.ADMIN) {
    return null;
  }

  return <Outlet />;
};

export default AdminRoutes;
