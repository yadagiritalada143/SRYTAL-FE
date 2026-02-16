import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import UserNavbar from '../../../components/UI/navbar/navbar';
import { NavLinks } from '../../../utils/user/user-nav-links';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { useRecoilValue } from 'recoil';
import { useDisclosure } from '@mantine/hooks';
import { ChangePasswordPopup } from '../../../components/UI/Models/updatePassword';
import { userDetailsAtom } from '../../../atoms/user';
import { ThemeBackground } from '../../../components/UI/Theme-background/background';
const UserDashboard = () => {
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
    <ThemeBackground className="flex min-h-screen ">
      <UserNavbar
        navLinks={NavLinks}
        organizationConfig={organizationConfig}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={toggleDrawer}
      />

      <div className={`flex-grow transition-all duration-300 overflow-hidden`}>
        <div>
          <Outlet />
        </div>
      </div>
      <ChangePasswordPopup opened={opened} close={close} forceUpdate={true} />
    </ThemeBackground>
  );
};

export default UserDashboard;
