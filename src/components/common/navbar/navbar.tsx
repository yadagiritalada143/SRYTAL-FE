import {
  Icon,
  IconBuildings,
  IconFileSpreadsheet,
  IconNotebook,
  IconPackage,
  IconUsersGroup,
  // IconBackpack, IconBuildings,
  IconX,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { OrganizationConfig } from "../../../interfaces/organization";
import { memo } from "react";
import { useMantineTheme } from "@mantine/core";

const Navbar = ({
  organizationConfig,
  navLinks,
  isDrawerOpen,
  toggleDrawer,
}: {
  navLinks: {
    role: string;
    url: string;
    icon: Icon;
    name: string;
  }[];
  organizationConfig: OrganizationConfig;
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}) => {
  const theme = useMantineTheme();
  return (
    <nav
      className={`h-full flex flex-col shadow-lg transition-all ${
        isDrawerOpen ? "overflow-y-auto" : "overflow-hidden"
      }`}
      style={{
        backgroundColor: theme.colors.primary[1],
        color: organizationConfig.organization_theme.theme.button.textColor,
        scrollbarWidth: "none",
      }}
    >
      <div className="p-6 flex justify-between items-center">
        <img
          src={organizationConfig.organization_theme.logo}
          alt="Organization Logo"
          className="rounded-md transition-transform duration-300 hover:scale-110"
        />

        <div className="lg:hidden  z-50">
          <button onClick={toggleDrawer} className="p-1 rounded-md">
            {isDrawerOpen && (
              <IconX
                size={24}
                color={
                  organizationConfig.organization_theme.theme.button.textColor
                }
              />
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-6  px-2">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.url}
              to={`/${organizationConfig.organization_name}/${link.role}/${link.url}`}
              end
              className={({ isActive }) =>
                `flex items-center p-4 py-6 shadow-md hover:shadow-xl ${
                  isActive ? "font-bold" : ""
                } hover:bg-opacity-75 transition-all`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive
                  ? organizationConfig.organization_theme.theme.backgroundColor
                  : "transparent",
                color: isActive
                  ? theme.colors.primary[5]
                  : organizationConfig.organization_theme.theme.button
                      .textColor,
              })}
            >
              <Icon size={24} className="mr-2" />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
        {(localStorage.getItem("userRole") === "recruiter" ||
          localStorage.getItem("userRole") === "admin") && (
          <>
            <NavLink
              to={
                localStorage.getItem("userRole") === "admin"
                  ? `/${organizationConfig.organization_name}/admin/dashboard/pool-companies`
                  : localStorage.getItem("userRole") === "recruiter"
                  ? `/${organizationConfig.organization_name}/employee/dashboard/pool-companies`
                  : ""
              }
              end
              className={({ isActive }) =>
                `flex items-center  p-4 py-6 shadow-md hover:shadow-xl ${
                  isActive ? "font-bold" : ""
                } hover:bg-opacity-75 transition-all`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive
                  ? organizationConfig.organization_theme.theme.backgroundColor
                  : "transparent",
                color: isActive
                  ? theme.colors.primary[5]
                  : organizationConfig.organization_theme.theme.button
                      .textColor,
              })}
            >
              <IconBuildings size={24} className="mr-2" />
              <span>Manage Companies</span>
            </NavLink>
            {/* <NavLink
              to={`/${organizationConfig.organization_name}/employee/dashboard/pool_employees`}
              end
              className={({ isActive }) =>
                `flex items-center  p-4 py-6 hover:shadow-xl ${
                  isActive ? "font-bold" : ""
                } hover:bg-opacity-75 transition-all`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive
                  ? organizationConfig.organization_theme.theme.backgroundColor
                  : "transparent",
                color: isActive
                  ? theme.colors.primary[5]
                  : organizationConfig.organization_theme.theme.button
                      .textColor,
              })}
            >
              <IconBackpack size={24} className="mr-2" />
              <span>Pool Employees</span>
            </NavLink> */}
            <NavLink
              to={
                localStorage.getItem("userRole") === "admin"
                  ? `/${organizationConfig.organization_name}/admin/dashboard/pool-candidates`
                  : localStorage.getItem("userRole") === "recruiter"
                  ? `/${organizationConfig.organization_name}/employee/dashboard/pool-candidates`
                  : ""
              }
              end
              className={({ isActive }) =>
                `flex items-center  p-4 py-6 shadow-md hover:shadow-xl ${
                  isActive ? "font-bold" : ""
                } hover:bg-opacity-75 transition-all`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive
                  ? organizationConfig.organization_theme.theme.backgroundColor
                  : "transparent",
                color: isActive
                  ? theme.colors.primary[5]
                  : organizationConfig.organization_theme.theme.button
                      .textColor,
              })}
            >
              <IconUsersGroup size={24} className="mr-2" />
              <span>Pool Candidates</span>
            </NavLink>

            {localStorage.getItem("userRole") === "admin" && (
              <NavLink
                to={`/${organizationConfig.organization_name}/admin/dashboard/packages`}
                end
                className={({ isActive }) =>
                  `flex items-center  p-4 py-6 shadow-md hover:shadow-xl ${
                    isActive ? "font-bold" : ""
                  } hover:bg-opacity-75 transition-all`
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive
                    ? organizationConfig.organization_theme.theme
                        .backgroundColor
                    : "transparent",
                  color: isActive
                    ? theme.colors.primary[5]
                    : organizationConfig.organization_theme.theme.button
                        .textColor,
                })}
              >
                <IconPackage size={24} className="mr-2" />
                <span>Packages</span>
              </NavLink>
            )}

            {localStorage.getItem("userRole") === "admin" && (
              <NavLink
                to={`/${organizationConfig.organization_name}/admin/dashboard/reports`}
                end
                className={({ isActive }) =>
                  `flex items-center  p-4 py-6 shadow-md hover:shadow-xl ${
                    isActive ? "font-bold" : ""
                  } hover:bg-opacity-75 transition-all`
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive
                    ? organizationConfig.organization_theme.theme
                        .backgroundColor
                    : "transparent",
                  color: isActive
                    ? theme.colors.primary[5]
                    : organizationConfig.organization_theme.theme.button
                        .textColor,
                })}
              >
                <IconNotebook size={24} className="mr-2" />
                <span>Reports</span>
              </NavLink>
            )}

            {localStorage.getItem("userRole") === "admin" && (
              <NavLink
                to={`/${organizationConfig.organization_name}/admin/dashboard/timesheet`}
                end
                className={({ isActive }) =>
                  `flex items-center  p-4 py-6 shadow-md hover:shadow-xl ${
                    isActive ? "font-bold" : ""
                  } hover:bg-opacity-75 transition-all`
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive
                    ? organizationConfig.organization_theme.theme
                        .backgroundColor
                    : "transparent",
                  color: isActive
                    ? theme.colors.primary[5]
                    : organizationConfig.organization_theme.theme.button
                        .textColor,
                })}
              >
                <IconFileSpreadsheet size={24} className="mr-2" />
                <span>Timesheet</span>
              </NavLink>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default memo(Navbar);
