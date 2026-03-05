import { Icon, IconX } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { memo } from "react";

const SuperAdminNavbar = ({
  navLinks,
  isDrawerOpen,
  toggleDrawer,
}: {
  navLinks: {
    url: string;
    icon: Icon;
    name: string;
  }[];
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}) => {
  return (
    <nav className="h-full flex flex-col shadow-lg">
      <div className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="lg:hidden  z-50">
          <button onClick={toggleDrawer} className="p-2 rounded-md">
            {isDrawerOpen && <IconX size={24} />}
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-6  px-2">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.url}
              to={`/superadmin/${link.url}`}
              end
              className={({ isActive }) =>
                `flex items-center p-4 py-6 shadow-md hover:shadow-xl ${
                  isActive ? "font-bold" : ""
                } hover:bg-opacity-75 transition-all`
              }
            >
              <Icon size={24} className="mr-2" />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default memo(SuperAdminNavbar);
