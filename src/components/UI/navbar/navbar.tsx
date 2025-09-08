import { IconX } from '@tabler/icons-react';
import { memo, useMemo } from 'react';
import { Avatar, Stack, UnstyledButton } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import classes from './navbar.module.css';
import { NavbarLink } from './nav-link';
import { NavbarProps } from './types';
import { useRecoilValue } from 'recoil';
import { userDetailsAtom } from '../../../atoms/user';
import { logoutUser } from '../../../services/user-services';
import { useCustomToast } from '../../../utils/common/toast';
import { ThemeBackground } from '../Theme-background/background';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { themeAtom } from '../../../atoms/theme';
import { LogoutButton } from '../Buttons/buttons';

function NavbarMenu({ navLinks, isDrawerOpen, setIsDrawerOpen }: NavbarProps) {
  const user = useRecoilValue(userDetailsAtom);
  const location = useLocation();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;

    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);
  const { showSuccessToast } = useCustomToast();

  const toggleDrawer = () => {
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
            backgroundColor: currentThemeConfig.backgroundColor
          }}
        >
          <div className={classes.fabContent}>
            {isDrawerOpen ? (
              <span></span>
            ) : (
              <Avatar
                src={organizationConfig.organization_theme.logo}
                alt="Organization Logo"
                size={64}
                className={classes.fabLogo}
              />
            )}
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
            alt="Organization Logo"
            className={classes.logoExpanded}
          />
          <div onClick={toggleDrawer} className={classes.fabX}>
            <IconX color={currentThemeConfig.color} />
          </div>
        </div>

        <div className={classes.navbarMain}>
          <Stack justify="center" gap={20}>
            {links}
          </Stack>
        </div>
      </ThemeBackground>
    </>
  );
}

export default memo(NavbarMenu);
