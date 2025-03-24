import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { IconMenu2 } from "@tabler/icons-react";
import AdminNavbar from "../../../components/common/navbar/navbar";
import { adminNavLinks } from "../../../utils/admin/nav-links/admin-nav-links";
import Header from "../../../components/common/header/header";
import { BgDiv } from "../../../components/common/style-components/bg-div";
import { organizationThemeAtom } from "../../../atoms/organization-atom";
import { useRecoilValue } from "recoil";

const AdminDashboard = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  return (
    <div
      className="flex min-h-screen relative"
      style={{
        color: organizationConfig.organization_theme.theme.color,
      }}
    >
      <div className="lg:hidden fixed top-4  z-50">
        <button onClick={toggleDrawer} className="p-2 rounded-md">
          {!isDrawerOpen && (
            <IconMenu2
              size={24}
              color={
                organizationConfig.organization_theme.theme.button.textColor
              }
            />
          )}
        </button>
      </div>

      <div
        ref={drawerRef}
        className={`fixed inset-y-0 left-0 w-64 min-w-64 shadow-lg z-40 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminNavbar
          navLinks={adminNavLinks}
          organizationConfig={organizationConfig}
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen}
        />
      </div>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 lg:hidden"
          onClick={toggleDrawer}
        ></div>
      )}

      <BgDiv className="flex-grow p-6 transition-all duration-300 z-20 overflow-hidden">
        <div className="my-2">
          <Header
            color={organizationConfig.organization_theme.theme.button.textColor}
            organization={organizationConfig.organization_name}
          />
        </div>
        <div>
          <Outlet />
        </div>
      </BgDiv>
    </div>
  );
};

export default AdminDashboard;
