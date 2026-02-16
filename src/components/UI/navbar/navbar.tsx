import { IconX } from '@tabler/icons-react';
import { memo, useMemo, useState, useEffect, useRef } from 'react';
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

interface Position {
  x: number;
  y: number;
}

// Function to get initial position from localStorage
const getInitialPosition = (): Position => {
  try {
    const savedPosition = localStorage.getItem('fabPosition');
    if (savedPosition) {
      return JSON.parse(savedPosition);
    }
  } catch (error) {
    console.error('Error loading FAB position from localStorage:', error);
  }
  return { x: 24, y: 24 }; // Default position
};

function NavbarMenu({ navLinks, isDrawerOpen, setIsDrawerOpen }: NavbarProps) {
  const user = useRecoilValue(userDetailsAtom);
  const location = useLocation();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

  // Draggable FAB state - initialize with localStorage value
  const [fabPosition, setFabPosition] = useState<Position>(getInitialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const fabRef = useRef<HTMLButtonElement>(null);

  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;
    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);

  const { showSuccessToast } = useCustomToast();

  // Save position to localStorage whenever it changes
  useEffect(() => {
    if (!isDragging) {
      // Only save when not actively dragging to reduce writes
      localStorage.setItem('fabPosition', JSON.stringify(fabPosition));
    }
  }, [fabPosition, isDragging]);

  // Handle mouse down on FAB
  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDrawerOpen) return; // Don't allow dragging when drawer is open

    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    setIsDragging(true);

    const rect = fabRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Handle mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const fabSize = 56; // FAB width/height
      const maxX = window.innerWidth - fabSize;
      const maxY = window.innerHeight - fabSize;

      let newX = e.clientX - dragOffset.x;
      let newY = e.clientY - dragOffset.y;

      // Constrain to viewport bounds
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));

      setFabPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (isDrawerOpen) return;

    e.stopPropagation();
    const touch = e.touches[0];
    setIsDragging(true);

    const rect = fabRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      });
    }
  };

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();

      const touch = e.touches[0];
      const fabSize = 56;
      const maxX = window.innerWidth - fabSize;
      const maxY = window.innerHeight - fabSize;

      let newX = touch.clientX - dragOffset.x;
      let newY = touch.clientY - dragOffset.y;

      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));

      setFabPosition({ x: newX, y: newY });
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false
      });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragOffset]);

  const toggleDrawer = (e: React.MouseEvent) => {
    if (!isDragging) {
      e.stopPropagation();
      setIsDrawerOpen();
    }
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
          ref={fabRef}
          onClick={toggleDrawer}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className={`${classes.fab}`}
          style={{
            backgroundColor: currentThemeConfig.backgroundColor,
            position: 'fixed',
            left: `${fabPosition.x}px`,
            top: `${fabPosition.y}px`,
            width: 132,
            height: 50,
            cursor: isDragging ? 'grabbing' : 'grab',
            transition: isDragging
              ? 'none'
              : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className={classes.fabContent}>
            <img
              src={organizationConfig.organization_theme.logo}
              alt="Organization Logo"
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
