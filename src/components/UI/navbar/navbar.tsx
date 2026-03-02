import { IconX } from '@tabler/icons-react';
import { memo } from 'react';
import { Stack, UnstyledButton } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import classes from './navbar.module.css';
import { NavbarLink } from './nav-link';
import { NavbarProps } from './types';
import { useRecoilValue } from 'recoil';
import { userDetailsAtom } from '@atoms/user';
import { logoutUser } from '@services/user-services';
import { useCustomToast } from '@utils/common/toast';
import { ThemeBackground } from '../Theme-background/background';
import { LogoutButton } from '../Buttons/buttons';
import { useAppTheme } from '@hooks/use-app-theme';

function NavbarMenu({ navLinks, isDrawerOpen, setIsDrawerOpen }: NavbarProps) {
  const user = useRecoilValue(userDetailsAtom);
  const { themeConfig: currentThemeConfig, organizationConfig } = useAppTheme();
  const location = useLocation();
  const { showSuccessToast } = useCustomToast();

  const toggleDrawer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDrawerOpen();
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
          setIsDrawerOpen={setIsDrawerOpen}
          children={link.children}
        />
      );
    });

  return (
    <>
      {isDrawerOpen && (
        <div className={classes.backdrop} onClick={toggleDrawer} />
      )}

      {!isDrawerOpen && (
        <UnstyledButton
          onClick={toggleDrawer}
          className={`${classes.fab}`}
          style={{
            backgroundColor: currentThemeConfig.backgroundColor,
            position: 'fixed',
            left: '24px',
            top: '24px',
            width: 132,
            height: 50,
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className={classes.fabContent}>
            <img
              src={organizationConfig.organization_theme.logo}
              alt='Organization Logo'
              className={classes.fabLogo}
              style={{
                width: 130,
                height: 55,
                borderRadius: 16
              }}
            />
          </div>
        </UnstyledButton>
      )}

      <ThemeBackground
        className={`${classes.navbar} ${
          isDrawerOpen ? classes.expanded : classes.collapsed
        } overflow-auto scrollbar-hide`}
      >
        <div
          className={`${classes.navbarHeader}`}
          style={{
            backgroundColor: `${currentThemeConfig.color}10`,
            borderBottom: `${currentThemeConfig.color}100`
          }}
        >
          <LogoutButton handleLogout={handleLogout} />

          <img
            src={organizationConfig.organization_theme.logo}
            alt='Organization Logo'
            className={classes.logoExpanded}
            style={{
              width: 130,
              height: 35,
              borderRadius: 8
            }}
          />
          <div onClick={toggleDrawer} className={classes.fabX}>
            <IconX color={currentThemeConfig.color} />
          </div>
        </div>

        <div className={classes.navbarMain}>
          <Stack justify='center' gap={20}>
            {links}
          </Stack>
        </div>
      </ThemeBackground>
    </>
  );
}

export default memo(NavbarMenu);
