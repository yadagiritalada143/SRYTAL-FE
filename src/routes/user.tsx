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
import { useEffect, useState } from 'react';
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

const EmployeeRoutes = () => {
  const { organization } = useParams<{ organization: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const setOrganizationConfig = useSetRecoilState(organizationThemeAtom);

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

  const theme = {
    colorScheme: organizationConfig.organization_theme.theme.colorScheme,
    primaryColor: organizationConfig.organization_theme.theme.primaryColor,
    fontFamily: organizationConfig.organization_theme.theme.fontFamily,
    colors: {
      primary: organizationConfig.organization_theme.theme.colors
        .primary as any,
      secondary: organizationConfig.organization_theme.theme.colors
        .secondary as any
    },
    headings: {
      fontFamily: organizationConfig.organization_theme.theme.fontFamily
    },
    components: {
      Avatar: {
        styles: () => ({
          root: {
            color: organizationConfig.organization_theme.theme.color
          }
        })
      },
      Modal: {
        styles: () => ({
          title: {
            fontWeight: 600,
            fontSize: '1.25rem',
            color: organizationConfig.organization_theme.theme.color
          },
          header: {
            backgroundColor:
              organizationConfig.organization_theme.theme.headerBackgroundColor,
            borderBottom: `1px solid ${organizationConfig.organization_theme.theme.borderColor}`
          },
          content: {
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
            color: organizationConfig.organization_theme.theme.color
          },
          close: {
            color: organizationConfig.organization_theme.theme.color,
            '&:hover': {
              backgroundColor: 'transparent',
              color: organizationConfig.organization_theme.theme.linkColor
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
            backgroundColor:
              organizationConfig.organization_theme.theme.colors.primary[5]
          },
          label: {
            color: organizationConfig.organization_theme.theme.button.textColor
          },
          item: {
            color: organizationConfig.organization_theme.theme.button.textColor
          }
        })
      },
      Loader: {
        styles: () => ({
          root: {
            color: organizationConfig.organization_theme.theme.button.textColor
          }
        })
      },
      Button: {
        styles: () => ({
          root: {
            backgroundColor:
              organizationConfig.organization_theme.theme.button.color,
            color: organizationConfig.organization_theme.theme.button.textColor,
            borderColor: organizationConfig.organization_theme.theme.borderColor
          }
        })
      }
    }
  };

  return (
    <MantineProvider theme={theme}>
      <LoadingOverlay
        visible={isLoading}
        bg="cyan"
        loaderProps={{ children: <Loader /> }}
      />
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
                path="announcements"
                element={
                  <div>
                    <Announcements />
                  </div>
                }
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
