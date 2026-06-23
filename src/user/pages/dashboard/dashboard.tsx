import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@components/UI/navbar/Sidebar';

import { useRecoilValue } from 'recoil';
import { useDisclosure } from '@mantine/hooks';
import { ChangePasswordPopup } from '@components/UI/Models/updatePassword';
import { userDetailsAtom } from '@atoms/user';
import { sidebarCollapsedAtom } from '@atoms/sidebar';
import { ThemeBackground } from '@components/UI/Theme-background/background';
import { useAppTheme } from '@hooks/use-app-theme';
import { useGetMyNavMenu } from '@hooks/queries/useNavQueries';

const UserDashboard = () => {
  const { organizationConfig } = useAppTheme();
  const { data: navData, isLoading: navLoading } = useGetMyNavMenu();
  const collapsed = useRecoilValue(sidebarCollapsedAtom);

  const [opened, { open, close }] = useDisclosure(false);
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
    <ThemeBackground className='flex min-h-screen'>
      <Sidebar
        menu={navData?.menu ?? []}
        organizationConfig={organizationConfig}
        isLoading={navLoading}
      />

      <div
        className={`flex-grow overflow-x-hidden pt-[68px] transition-[padding] duration-200 ${
          collapsed ? 'md:pl-0 md:pt-[64px]' : 'md:pl-[248px] md:pt-0'
        }`}
      >
        <div>
          <Outlet />
        </div>
      </div>
      <ChangePasswordPopup opened={opened} close={close} forceUpdate={true} />
    </ThemeBackground>
  );
};

export default UserDashboard;
