import { IconLogout } from '@tabler/icons-react';
import { memo } from 'react';
import {
  Avatar,
  Center,
  Stack,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useLocation } from 'react-router-dom';
import classes from './navbar.module.css';
import { BgDiv } from '../../common/style-components/bg-div';
import { NavbarLink } from './nav-link';
import { NavbarProps } from './types';
import { useRecoilValue } from 'recoil';
import { userDetailsAtom } from '../../../atoms/user';
import { logoutUser } from '../../../services/user-services';
import { useCustomToast } from '../../../utils/common/toast';
function NavbarMenu({
  navLinks,
  organizationConfig,
  isDrawerOpen,
  setIsDrawerOpen,
}: NavbarProps) {
  const user = useRecoilValue(userDetailsAtom);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const location = useLocation();
  const themeColor = organizationConfig.organization_theme.theme.color;
  const { showSuccessToast } = useCustomToast();
  const handleMouseEnter = () => {
    if (!isMobile) setIsDrawerOpen();
  };

  const handleMouseLeave = () => {
    if (!isMobile && isDrawerOpen) setIsDrawerOpen();
  };
  const handleLogout = () => {
    logoutUser();
    showSuccessToast('Successfully logged out');
  };
  const currentPath = location.pathname;

  const links = navLinks
    .filter(link => link.role === user.userRole)
    .map(link => {
      const fullPath = `/${organizationConfig.organization_name}/${link.url}`;
      const isActive = currentPath === fullPath;

      return (
        <NavbarLink
          key={link.name}
          icon={link.icon}
          name={link.name}
          url={link.url}
          role={link.role}
          organization={organizationConfig}
          isActive={isActive}
          isMobile={isMobile}
          isExpanded={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      );
    });

  return (
    <BgDiv
      className={`${classes.navbar} ${
        isDrawerOpen ? classes.expanded : classes.collapsed
      } overflow-auto scrollbar-hide`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isDrawerOpen ? (
        <img
          src={organizationConfig.organization_theme.logo}
          alt="Organization Logo"
          className={classes.logoExpanded}
        />
      ) : (
        <Center>
          <Avatar
            className="cursor-pointer"
            src={organizationConfig.organization_theme.logo}
          />
        </Center>
      )}

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={20}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" className="my-2" gap={20}>
        <UnstyledButton
          onClick={handleLogout}
          className="flex items-center gap-3 px-1 py-1 rounded-md transition duration-150 w-full hover:bg-opacity-10"
          style={{
            color: themeColor,
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
          }}
        >
          <IconLogout stroke={1.5} />
          {isDrawerOpen && <span className="text-sm font-medium">Logout</span>}
        </UnstyledButton>
      </Stack>
    </BgDiv>
  );
}

export default memo(NavbarMenu);
