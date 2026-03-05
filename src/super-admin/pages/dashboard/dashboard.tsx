import { useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { IconMenu2 } from '@tabler/icons-react';
import SuperAdminNavbar from '@super-admin/components/nav-bar/nav-bar';
import { SuperAdminNavLinks } from '@utils/super-admin/nav-links/super-admin-nav-links';
import SuperAdminHeader from '@super-admin/components/header/header';

const SuperadminDashboard = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  return (
    <div className="flex min-h-screen relative">
      <div className="lg:hidden fixed top-4  z-50">
        <button onClick={toggleDrawer} className="p-2 rounded-md">
          {!isDrawerOpen && <IconMenu2 size={24} />}
        </button>
      </div>

      <div
        ref={drawerRef}
        className={`fixed inset-y-0 left-0 w-64 min-w-64 shadow-lg z-40 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SuperAdminNavbar
          navLinks={SuperAdminNavLinks}
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

      <div className="flex-grow p-6 transition-all duration-300 z-20 overflow-hidden">
        <div className="my-2">
          <SuperAdminHeader />
        </div>
        <div className="h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SuperadminDashboard;
