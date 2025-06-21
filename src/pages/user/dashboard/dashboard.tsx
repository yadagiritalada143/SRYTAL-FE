import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { IconMenu2, IconX } from '@tabler/icons-react';
import UserNavbar from '../../../components/UI/navbar/navbar';
import { NavLinks } from '../../../utils/user/user-nav-links';
import { BgDiv } from '../../../components/common/style-components/bg-div';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { useRecoilValue } from 'recoil';
import { useDisclosure } from '@mantine/hooks';
import { ChangePasswordPopup } from '../../../components/UI/Models/updatePassword';
import { userDetailsAtom } from '../../../atoms/user';
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
    <BgDiv className="flex min-h-screen relative">
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleDrawer}
          className="p-2 rounded-md"
          style={{
            backgroundColor:
              organizationConfig.organization_theme.theme.button.color,
            color: organizationConfig.organization_theme.theme.button.textColor,
          }}
        >
          <IconMenu2 size={24} />
        </button>
      </div>

      {isDrawerOpen && (
        <div className="lg:hidden fixed top-4 left-[75%] z-50">
          <button
            onClick={toggleDrawer}
            className="p-2 rounded-md"
            style={{
              backgroundColor:
                organizationConfig.organization_theme.theme.button.color,
              color:
                organizationConfig.organization_theme.theme.button.textColor,
            }}
          >
            <IconX size={24} />
          </button>
        </div>
      )}

      <UserNavbar
        navLinks={NavLinks}
        organizationConfig={organizationConfig}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={toggleDrawer}
      />

      <div
        className={`flex-grow p-6 transition-all duration-300 ${isDrawerOpen ? 'ml-[15%]' : 'lg:ml-[4%]'} overflow-hidden`}
      >
        <div>
          <Outlet />
        </div>
      </div>
      <ChangePasswordPopup opened={opened} close={close} forceUpdate={true} />
    </BgDiv>
  );
};

export default UserDashboard;
