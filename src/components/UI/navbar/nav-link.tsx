import { useNavigate, useLocation } from 'react-router-dom';
import { NavbarLinkProps } from './types';
import { UnstyledButton } from '@mantine/core';
import { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../../../atoms/theme';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

export function NavbarLink({
  icon: Icon,
  name,
  url,
  organization,
  isActive,
  onClick,
  setIsDrawerOpen,
  children
}: NavbarLinkProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);
  const [isExpanded, setIsExpanded] = useState(false);
  const previousLocationRef = useRef<string>('');

  const isActiveChild = children?.some(child => {
    const childPath = `/${organization.organization_name}/${child.url}`;
    return location.pathname === childPath;
  });

  useEffect(() => {
    if (isActiveChild && previousLocationRef.current !== location.pathname) {
      setIsExpanded(true);
      previousLocationRef.current = location.pathname;
    }
  }, [isActiveChild, location.pathname]);

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
    if (children && children.length > 0) {
      setIsExpanded(!isExpanded);
      return;
    }

    if (onClick) onClick();

    if (url) {
      const fullPath = `/${organization.organization_name}/${url}`;
      navigate(fullPath, { replace: false });

      setIsDrawerOpen();
    }
  }, [
    onClick,
    url,
    organization.organization_name,
    navigate,
    setIsDrawerOpen,
    children,
    isExpanded
  ]);

  const isChildActive = (childUrl: string) => {
    const childPath = `/${organization.organization_name}/${childUrl}`;
    return location.pathname === childPath;
  };

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
        {children && children.length > 0 && (
          <div className="ml-auto transition-transform duration-200">
            {isExpanded ? (
              <IconChevronUp stroke={1.5} size={18} />
            ) : (
              <IconChevronDown stroke={1.5} size={18} />
            )}
          </div>
        )}
      </>
    ),
    [Icon, name, children, isExpanded]
  );

  const handleChildClick = (childUrl: string) => {
    const fullPath = `/${organization.organization_name}/${childUrl}`;
    navigate(fullPath, { replace: false });
    setIsDrawerOpen();
  };

  const button = (
    <div>
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

      {children && children.length > 0 && isExpanded && (
        <div
          className="ml-5 mt-2 space-y-1 border-l pl-3 transition-all duration-300 ease-out"
          style={{ borderColor: currentThemeConfig.borderColor }}
        >
          {children.map(child => {
            const childActive = isChildActive(child.url);
            const childStyles = {
              color: childActive
                ? currentThemeConfig.backgroundColor
                : currentThemeConfig.color,
              backgroundColor: childActive
                ? currentThemeConfig.color
                : `${currentThemeConfig.color}08`,
              borderLeft: childActive
                ? `4px solid ${currentThemeConfig.color}`
                : '4px solid transparent',
              paddingLeft: '12px',
              transition: 'all 0.2s ease-out'
            };

            return (
              <UnstyledButton
                key={child.url}
                onClick={() => handleChildClick(child.url)}
                className={`
                  flex items-center w-full px-3 py-2
                  rounded-md text-sm font-medium
                  transition-all duration-200
                  focus:outline-none focus:ring-2
                  hover:shadow-md hover:shadow-black/5
                `}
                style={childStyles}
                onMouseEnter={e => {
                  if (!childActive) {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      `${currentThemeConfig.color}15`;
                  }
                }}
                onMouseLeave={e => {
                  if (!childActive) {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      `${currentThemeConfig.color}08`;
                  }
                }}
                role="menuitem"
                tabIndex={0}
              >
                {child.name}
              </UnstyledButton>
            );
          })}
        </div>
      )}
    </div>
  );

  return button;
}
