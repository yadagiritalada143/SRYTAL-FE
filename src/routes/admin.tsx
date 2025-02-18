import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import AddEmployee from "../components/admin/dashboard/add-employee/add-employee";
import { OrganizationConfig } from "../interfaces/organization";
import AdminDashboard from "../pages/admin/dashboard/dashboard";
import AdminLogin from "../pages/admin/login/login";
import AddCompany from "../components/user/dashboard/add-company/add-company";
import Employees from "../components/admin/dashboard/employees/employees";
import UpdateEmployee from "../components/admin/dashboard/update-employee/update-employee";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { getOrganizationConfig } from "../services/common-services";
import { LoadingOverlay } from "@mantine/core";
import Loader from "../components/common/loader/loader";
import AdminProfile from "../components/admin/dashboard/profile/profile";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { organizationThemeAtom } from "../atoms/organization-atom";
import { organizationAdminUrls } from "../utils/common/constants";
import BloodGroupTable from "../components/admin/dashboard/blood-group/all-blood";
import PoolCandidateList from "../components/user/dashboard/candidate/candidate";
import UpdatePoolCandidateForm from "../components/user/dashboard/update-candidate/update-candidate";
import UserProvider from "../hooks/user-context";
import EmploymentTypes from "../components/admin/dashboard/employement-type/employement-type";
import Companies from "../components/user/dashboard/companies/companies";
import AddPoolCandidate from "../components/user/dashboard/add-candidate/add-candidate";
import UpdateCompany from "../components/user/dashboard/update-company/update-company";
import EmploymentRoles from "../components/admin/dashboard/employment-roles/employment-roles";

const AdminRoutes = () => {
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
        .secondary as any,
    },
    headings: {
      fontFamily: organizationConfig.organization_theme.theme.fontFamily,
    },
    components: {
      Avatar: {
        styles: () => ({
          root: {
            color: organizationConfig.organization_theme.theme.color,
          },
        }),
      },
      Menu: {
        styles: () => ({
          dropdown: {
            backgroundColor:
              organizationConfig.organization_theme.theme.colors.primary[5],
          },
          label: {
            color: organizationConfig.organization_theme.theme.button.textColor,
          },
          item: {
            color: organizationConfig.organization_theme.theme.button.textColor,
          },
        }),
      },
      Loader: {
        styles: () => ({
          root: {
            color: organizationConfig.organization_theme.theme.button.textColor,
          },
        }),
      },
      Button: {
        styles: () => ({
          root: {
            backgroundColor:
              organizationConfig.organization_theme.theme.button.color,
            color: organizationConfig.organization_theme.theme.button.textColor,
            borderColor:
              organizationConfig.organization_theme.theme.borderColor,
          },
        }),
      },
    },
  };

  return (
    <MantineProvider theme={theme}>
      <LoadingOverlay
        visible={isLoading}
        loaderProps={{ children: <Loader /> }}
      />
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
            <Route
              path=":candidateId/edit-pool-candidate"
              element={<UpdatePoolCandidateForm />}
            />
            <Route path="update/:employeeId" element={<UpdateEmployee />} />
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
          </Route>
        </Route>
      </Routes>
    </MantineProvider>
  );
};

const AdminProtectedRoutes = () => {
  const token = localStorage.getItem("adminToken");
  const userRole = localStorage.getItem("userRole");
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole || !token || userRole !== "admin") {
      setTimeout(() => {
        toast.error("Not authorized to access");
        navigate(
          `${organizationAdminUrls(organizationConfig.organization_name)}/login`
        );
      }, 500);
    }
  }, [navigate, userRole, token, organizationConfig.organization_name]);

  if (!userRole || !token || userRole !== "admin") {
    return null;
  }

  return <Outlet />;
};

export default AdminRoutes;
