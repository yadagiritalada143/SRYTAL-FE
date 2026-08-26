import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@components/UI/navbar/Sidebar';
import type { SidebarMenuNode } from '@components/UI/navbar/Sidebar';

import { useRecoilValue } from 'recoil';
import { useDisclosure } from '@mantine/hooks';
import { ChangePasswordPopup } from '@components/UI/Models/updatePassword';
import { userDetailsAtom } from '@atoms/user';
import { sidebarCollapsedAtom } from '@atoms/sidebar';
import { ThemeBackground } from '@components/UI/Theme-background/background';
import { useAppTheme } from '@hooks/use-app-theme';
import { useGetMyNavMenu } from '@hooks/queries/useNavQueries';

const COURSES_MENU_ITEM: SidebarMenuNode = {
  key: 'employee-courses',
  label: 'Courses',
  url: 'employee/dashboard/course-assignments',
  icon: 'IconBook'
};

const UserDashboard = () => {
  const { organizationConfig } = useAppTheme();
  const { data: navData, isLoading: navLoading } = useGetMyNavMenu();
  const collapsed = useRecoilValue(sidebarCollapsedAtom);
  const user = useRecoilValue(userDetailsAtom);

  const menu = useMemo(() => {
    const base = navData?.menu ?? [];
    if (user?.userRole === 'ContentWriter') return base;

    const alreadyHas = base.some(
      n => n.url === COURSES_MENU_ITEM.url || n.key === COURSES_MENU_ITEM.key
    );
    if (alreadyHas) return base;

    const next = [...base];
    next.push(COURSES_MENU_ITEM);
    return next;
  }, [navData?.menu, user?.userRole]);

  const [opened, { open, close }] = useDisclosure(false);
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
        menu={menu}
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
