import {
  Routes,
  Route,
  Outlet,
  useNavigate,
  useParams
} from 'react-router-dom';
import { OrganizationConfig } from '../interfaces/organization';
import EmployeeLogin from '../pages/user/login/login';
import EmployeeDashboard from '../pages/user/dashboard/dashboard';
import Companies from '../components/user/dashboard/companies/companies';
import AddCompany from '../components/user/dashboard/add-company/add-company';
import UpdateCompany from '../components/user/dashboard/update-company/update-company';
import { toast } from 'react-toastify';
import { useEffect, useMemo, useState } from 'react';
import { getOrganizationConfig } from '../services/common-services';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { LoadingOverlay } from '@mantine/core';
import Loader from '../components/common/loader/loader';
import EmployeeProfile from '../components/user/dashboard/profile/profile';
import Timesheet from '../components/common/timesheet/timesheet';
import { ModalsProvider } from '@mantine/modals';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { organizationThemeAtom } from '../atoms/organization-atom';
import { organizationEmployeeUrls } from '../utils/common/constants';
import PoolCandidateList from '../components/user/dashboard/candidate/candidate';
import AddPoolCandidate from '../components/user/dashboard/add-candidate/add-candidate';
import UpdatePoolCandidateForm from '../components/user/dashboard/update-candidate/update-candidate';
import UserProvider from '../hooks/user-context';
import Dashboard from '../components/common/dashboard/dashboard';
import PayslipList from '../components/common/payslip/payslip';
import Support from '../components/common/support/support';
import MyTasks from '../components/common/mytasks/mytasks';
import Announcements from '../components/common/announcements/announcements';
import Mentees from '../components/common/mentees/mentees';
import UpdateMenteeTasks from '../components/common/update-mentee-task/UpdateMenteeTasks';
import TaskDetail from '../components/common/mytasks/taskdetails';
import { themeAtom } from '../atoms/theme';
import { ThemeToggleButton } from '../components/UI/Theme-toggle-button/button';

const EmployeeRoutes = () => {
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
    const orgTheme = organizationConfig.organization_theme;

    // Check if new dual themes structure exists
    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
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
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole || !token || userRole !== 'recruiter') {
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

  if (!userRole || !token || userRole !== 'recruiter') {
    return null;
  }

  return <Outlet />;
};

const EmployeeProtectedRoutes = () => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const navigate = useNavigate();

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
