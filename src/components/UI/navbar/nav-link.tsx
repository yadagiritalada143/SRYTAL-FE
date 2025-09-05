import { useNavigate } from 'react-router-dom';
import { NavbarLinkProps } from './types';
import { UnstyledButton } from '@mantine/core';
import { useCallback, useMemo } from 'react';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../../../atoms/theme';

export function NavbarLink({
  icon: Icon,
  name,
  url,
  organization,
  isActive,
  onClick,
  setIsDrawerOpen
}: NavbarLinkProps) {
  const navigate = useNavigate();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;

    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);

  const buttonStyles = useMemo(
    () => ({
      color: isActive
        ? currentThemeConfig.backgroundColor
        : currentThemeConfig.color,
      backgroundColor: isActive ? currentThemeConfig.color : 'transparent',
      borderLeft: isActive
        ? `4px solid ${currentThemeConfig.color}`
        : '4px solid transparent',
      '--hover-color': `${currentThemeConfig.color}20`,
      '--active-shadow': `0 0 0 2px ${currentThemeConfig.color}40`
    }),
    [isActive, currentThemeConfig.color, currentThemeConfig.backgroundColor]
  );

  // Optimize click handler with useCallback
  const handleClick = useCallback(() => {
    if (onClick) onClick();

    if (url) {
      const fullPath = `/${organization.organization_name}/${url}`;
      navigate(fullPath, { replace: false });

      setIsDrawerOpen();
    }
  }, [onClick, url, organization.organization_name, navigate, setIsDrawerOpen]);

  // Memoize button content
  const buttonContent = useMemo(
    () => (
      <>
        <div>
          <Icon
            stroke={1.5}
            size={20}
            className="transition-transform duration-200 group-hover:scale-110"
          />
        </div>
        <hr />
        <span className="navbar-link-text text-sm font-medium transition-all duration-200 group-hover:translate-x-1">
          {name}
        </span>
      </>
    ),
    [Icon, name]
  );

  const button = (
    <UnstyledButton
      onClick={handleClick}
      className={`
        group navbar-link
        flex items-center gap-3 px-3 py-2.5 rounded-xl
        transition-all duration-300 ease-out w-full
        hover:shadow-lg hover:shadow-black/10
        focus:outline-none focus:ring-2 focus:ring-offset-2
        active:scale-95 transform
        ${isActive ? 'navbar-link-active' : 'navbar-link-inactive'}

      `}
      style={buttonStyles}
      data-active={isActive}
      aria-label={`Navigate to ${name}`}
      aria-current={isActive ? 'page' : undefined}
      role="menuitem"
      tabIndex={0}
    >
      {buttonContent}
    </UnstyledButton>
  );

  return button;
}
