import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import AddEmployee from '../components/admin/dashboard/add-employee/add-employee';
import { OrganizationConfig } from '../interfaces/organization';
import AdminDashboard from '../pages/admin/dashboard/dashboard';
import AdminLogin from '../pages/admin/login/login';
import AddCompany from '../components/user/dashboard/add-company/add-company';
import Employees from '../components/admin/dashboard/employees/employees';
import UpdateEmployee from '../components/admin/dashboard/update-employee/update-employee';
import { Outlet } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { getOrganizationConfig } from '../services/common-services';
import { LoadingOverlay } from '@mantine/core';
import Loader from '../components/common/loader/loader';
import AdminProfile from '../components/admin/dashboard/profile/profile';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../atoms/organization-atom';
import { organizationAdminUrls } from '../utils/common/constants';
import BloodGroupTable from '../components/admin/dashboard/blood-group/all-blood';
import PoolCandidateList from '../components/user/dashboard/candidate/candidate';
import UpdatePoolCandidateForm from '../components/user/dashboard/update-candidate/update-candidate';
import UserProvider from '../hooks/user-context';
import EmploymentTypes from '../components/admin/dashboard/employement-type/employement-type';
import Companies from '../components/user/dashboard/companies/companies';
import AddPoolCandidate from '../components/user/dashboard/add-candidate/add-candidate';
import UpdateCompany from '../components/user/dashboard/update-company/update-company';
import EmploymentRoles from '../components/admin/dashboard/employment-roles/employment-roles';
import Reports from '../components/admin/dashboard/reports/reports';
import GenerateOfferReport from '../components/admin/dashboard/reports/generate-offer';
import GenerateSalarySlipReport from '../components/admin/dashboard/reports/generate-salary-slip';
import Packages from '../components/admin/dashboard/packages/packages';
import AddPackage from '../components/admin/dashboard/add-package/add-package';
import UpdatePackage from '../components/admin/dashboard/update-package/update-package';
import DateTableComponent from '../components/common/timesheet/timesheet';
import PackagePageWrapper from '../components/admin/dashboard/update-employee/package-wrapper';
import { EmployeeTimesheetAdminView } from '../components/admin/dashboard/employee-timesheet/employee-timesheet';
import { ThemeToggleButton } from '../components/UI/Theme-toggle-button/button';
import { themeAtom } from '../atoms/theme';
import { getThemeConfig } from '../utils/common/theme-utils';
import SettingsLayout from '../components/admin/dashboard/settings/SettingsLayout';
import FeedbackTable from '../components/admin/dashboard/settings/FeedbackTable';
const AdminRoutes = () => {
  const { organization } = useParams<{ organization: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const setOrganizationConfig = useSetRecoilState(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);
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
  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
  }, [organizationConfig, isDarkTheme]);

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
      <LoadingOverlay
        visible={isLoading}
        loaderProps={{ children: <Loader /> }}
      />
      <div
        className="d-flex justify-end p-4 absolute right-0 transition-colors duration-300 ease-in-out"
        style={{
          backgroundColor: 'transparent',
          zIndex: 1000
        }}
      >
        <ThemeToggleButton isDarkTheme={isDarkTheme} setTheme={setTheme} />
      </div>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route
          element={
            <UserProvider>
              <AdminProtectedRoutes />
            </UserProvider>
          }
        >
          <Route path="/dashboard" element={<AdminDashboard />}>
            <Route path="addemployee" element={<AddEmployee />} />
            <Route path="" element={<Employees />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="pool-companies" element={<Companies />} />
            <Route path="add-pool-companies" element={<AddCompany />} />
            <Route path="add-pool-candidate" element={<AddPoolCandidate />} />
            <Route path="packages" element={<Packages />} />
            <Route path="/dashboard/addPackage" element={<AddPackage />} />
            <Route path="updates/:packageId" element={<UpdatePackage />} />
            <Route path="reports" element={<Reports />}>
              <Route path="generate-offer" element={<GenerateOfferReport />} />
              <Route
                path="generate-salary-slip"
                element={<GenerateSalarySlipReport />}
              />
            </Route>
            <Route path="timesheet" element={<DateTableComponent />} />
            <Route
              path=":candidateId/edit-pool-candidate"
              element={<UpdatePoolCandidateForm />}
            />
            <Route path="update/:employeeId" element={<UpdateEmployee />} />
            <Route
              path="package/:employeeId"
              element={<PackagePageWrapper />}
            />
            <Route
              path="timesheet/:employeeId"
              element={<EmployeeTimesheetAdminView />}
            />
            <Route path="pool-candidates" element={<PoolCandidateList />} />
            <Route
              path="update-pool-company/:companyId"
              element={<UpdateCompany />}
            />
            <Route
              path="blood-group-management"
              element={<BloodGroupTable />}
            />
            <Route
              path="employment-role-management"
              element={<EmploymentRoles />}
            />
            <Route
              path="employment-type-management"
              element={<EmploymentTypes />}
            />
            <Route path="settings" element={<SettingsLayout />}>
              <Route index element={<FeedbackTable />} />
              <Route path="feedback" element={<FeedbackTable />} />
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
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole || !token || userRole !== 'admin') {
      setTimeout(() => {
        toast.error('Not authorized to access');
        navigate(
          `${organizationAdminUrls(organizationConfig.organization_name)}/login`
        );
      }, 500);
    }
  }, [navigate, userRole, token, organizationConfig.organization_name]);

  if (!userRole || !token || userRole !== 'admin') {
    return null;
  }

  return <Outlet />;
};

export default AdminRoutes;
