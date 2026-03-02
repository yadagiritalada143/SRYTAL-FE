import {
  Routes,
  Route,
  Outlet,
  useNavigate,
  useParams
} from 'react-router-dom';
import { useEffect, useMemo, useState, lazy, Suspense } from 'react';
import { toast } from 'react-toastify';
import { MantineProvider, LoadingOverlay } from '@mantine/core';
import '@mantine/core/styles.css';
import { getOrganizationConfig } from '@services/common-services';
import Loader from '@components/common/loader/loader';
import { ModalsProvider } from '@mantine/modals';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { organizationThemeAtom } from '@atoms/organization-atom';
import { themeAtom } from '@atoms/theme';

import { organizationEmployeeUrls } from '@utils/common/constants';
import { ROLES } from '@constants';
import UserProvider from '@hooks/user-context';
import { ThemeToggleButton } from '@components/UI/Theme-toggle-button/button';
import { useAppTheme } from '@hooks/use-app-theme';
import { OrganizationConfig } from '@interfaces/organization';

// Lazy loaded components
const EmployeeLogin = lazy(() => import('@user/pages/login/login'));
const EmployeeDashboard = lazy(() => import('@user/pages/dashboard/dashboard'));
const Companies = lazy(
  () => import('@user/components/dashboard/companies/companies')
);
const AddCompany = lazy(
  () => import('@user/components/dashboard/add-company/add-company')
);
const UpdateCompany = lazy(
  () => import('@user/components/dashboard/update-company/update-company')
);
const EmployeeProfile = lazy(
  () => import('@user/components/dashboard/profile/UserProfile')
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
const WriterDashboard = lazy(
  () => import('@user/components/dashboard/content-writer/WriterDashboard')
);
const AddCourse = lazy(
  () => import('@user/components/dashboard/add-course/AddCourse')
);
const CourseDetails = lazy(
  () => import('@user/components/dashboard/edit-course/CourseDetails')
);

// Common components
const Dashboard = lazy(() => import('@components/common/dashboard/dashboard'));
const PayslipList = lazy(() => import('@components/common/payslip/payslip'));
const Support = lazy(() => import('@components/common/support/support'));
const MyTasks = lazy(() => import('@components/common/mytasks/mytasks'));
const Announcements = lazy(
  () => import('@components/common/announcements/announcements')
);
const Mentees = lazy(() => import('@components/common/mentees/mentees'));
const UpdateMenteeTasks = lazy(
  () => import('@components/common/update-mentee-task/UpdateMenteeTasks')
);
const TaskDetail = lazy(() => import('@components/common/mytasks/taskdetails'));
const Timesheet = lazy(() => import('@components/common/timesheet/timesheet'));
const SalarySlipReport = lazy(
  () => import('@components/common/reports/salary-slip')
);

const EmployeeRoutes = () => {
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
              backgroundColor: currentThemeConfig.headerBackgroundColor,
              borderColor: currentThemeConfig.borderColor,
              transition: 'background-color 0.3s ease-in-out'
            },
            label: {
              color: currentThemeConfig.color,
              transition: 'color 0.3s ease-in-out'
            },
            item: {
              color: currentThemeConfig.color,
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
        <Route path="/login" element={<EmployeeLogin />} />
        <Route
          element={
            <UserProvider>
              <EmployeeProtectedRoutes />
            </UserProvider>
          }
        >
          <Route path="/dashboard" element={<EmployeeDashboard />}>
            <Route element={<EmployeeProtectedRoutes />}>
              <Route path="profile" element={<EmployeeProfile />} />
              <Route element={<RecruiterProtectedRoutes />}>
                <Route path="pool-candidates" element={<PoolCandidateList />} />
                <Route
                  path="add-pool-candidate"
                  element={<AddPoolCandidate />}
                />
                <Route
                  path=":candidateId/edit-pool-candidate"
                  element={<UpdatePoolCandidateForm />}
                />
                <Route path="pool-companies" element={<Companies />} />
                <Route path="add-pool-companies" element={<AddCompany />} />
                <Route
                  path="update-pool-company/:companyId"
                  element={<UpdateCompany />}
                />
              </Route>
              <Route
                path="timesheet"
                element={
                  <ModalsProvider>
                    <Timesheet />
                  </ModalsProvider>
                }
              />
              <Route
                path="dashboard"
                element={
                  <div>
                    <Dashboard />
                  </div>
                }
              />
              <Route
                path="payslip"
                element={
                  <div>
                    <PayslipList />
                  </div>
                }
              />
              <Route
                path="support"
                element={
                  <div>
                    <Support />
                  </div>
                }
              />
              <Route
                path="mytasks"
                element={
                  <div>
                    <MyTasks />
                  </div>
                }
              />
              <Route
                path="mytasks/:taskId"
                element={<div>{<TaskDetail />}</div>}
              />
              <Route
                path="announcements"
                element={
                  <div>
                    <Announcements />
                  </div>
                }
              />
              <Route path="mentees" element={<Mentees />} />
              <Route
                path="common/mentees/:empId"
                element={<div>{<UpdateMenteeTasks />}</div>}
              />
              <Route path="content-writer" element={<WriterDashboard />} />
              <Route path="add-course" element={<AddCourse />} />
              <Route path="course/:id" element={<CourseDetails />} />
              <Route
                path="reports/salary-slip"
                element={<SalarySlipReport />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </MantineProvider>
  );
};

const RecruiterProtectedRoutes = () => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  const navigate = useNavigate();

  const { organizationConfig } = useAppTheme();

  useEffect(() => {
    if (!userRole || !token || userRole.toLowerCase() !== ROLES.RECRUITER) {
      toast.error('Not authorized to access');
      setTimeout(() => {
        navigate(
          `${organizationEmployeeUrls(
            organizationConfig.organization_name
          )}/login`
        );
      }, 500);
    }
  }, [navigate, userRole, token, organizationConfig.organization_name]);

  if (!userRole || !token || userRole.toLowerCase() !== ROLES.RECRUITER) {
    return null;
  }

  return <Outlet />;
};

const EmployeeProtectedRoutes = () => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  const navigate = useNavigate();

  const { organizationConfig } = useAppTheme();

  useEffect(() => {
    if (!userRole || !token) {
      setTimeout(() => {
        toast.error('Not authorized to access');
        navigate(
          `${organizationEmployeeUrls(
            organizationConfig.organization_name
          )}/login`
        );
      }, 500);
    }
  }, [navigate, userRole, token, organizationConfig.organization_name]);

  if (!userRole || !token) {
    return null;
  }

  return <Outlet />;
};

export default EmployeeRoutes;
