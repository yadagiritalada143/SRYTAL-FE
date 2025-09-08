import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../../components/UI/navbar/navbar';
import { adminNavLinks } from '../../../utils/admin/nav-links/admin-nav-links';
import { BgDiv } from '../../../components/common/style-components/bg-div';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { useRecoilValue } from 'recoil';
import { useDisclosure } from '@mantine/hooks';
import { userDetailsAtom } from '../../../atoms/user';
import { ChangePasswordPopup } from '../../../components/UI/Models/updatePassword';

const AdminDashboard = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const [opened, { open, close }] = useDisclosure(false);
  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);
  const user = useRecoilValue(userDetailsAtom);
  useEffect(() => {
    if (
      user &&
      user.passwordResetRequired &&
      user.passwordResetRequired === 'true'
    ) {
      open();
    }
  }, [user, open]);
  return (
    <BgDiv className="flex min-h-screen ">
      <AdminNavbar
        navLinks={adminNavLinks}
        organizationConfig={organizationConfig}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={toggleDrawer}
      />

      <div
        className={`flex-grow p-6 transition-all duration-300 overflow-hidden`}
      >
        <div>
          <Outlet />
        </div>
      </div>
      <ChangePasswordPopup opened={opened} close={close} forceUpdate={true} />
    </BgDiv>
  );
};

export default AdminDashboard;
