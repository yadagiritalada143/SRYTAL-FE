import { useNavigate } from 'react-router-dom';
import { NavbarLinkProps } from './types';
import { UnstyledButton, Tooltip } from '@mantine/core';
import { useCallback, useMemo } from 'react';

export function NavbarLink({
  icon: Icon,
  name,
  url,
  organization,
  isActive,
  onClick,
  isExpanded,
  isMobile = false,
  setIsDrawerOpen
}: NavbarLinkProps) {
  const navigate = useNavigate();

  // Memoize theme color to prevent recalculation
  const themeColor = useMemo(
    () => organization.organization_theme.theme.color,
    [organization.organization_theme.theme.color]
  );

  // Memoize styles to prevent recreating on each render
  const buttonStyles = useMemo(
    () => ({
      color: isActive ? '#ffffff' : themeColor,
      backgroundColor: isActive ? themeColor : 'transparent',
      borderLeft: isActive
        ? `4px solid ${themeColor}`
        : '4px solid transparent',
      '--hover-color': `${themeColor}20`, // 20% opacity for hover
      '--active-shadow': `0 0 0 2px ${themeColor}40` // Subtle focus ring
    }),
    [isActive, themeColor]
  );

  // Optimize click handler with useCallback
  const handleClick = useCallback(() => {
    if (onClick) onClick();

    if (url) {
      const fullPath = `/${organization.organization_name}/${url}`;
      navigate(fullPath, { replace: false });

      // Close drawer on mobile/when expanded
      if (isMobile || isExpanded) {
        setIsDrawerOpen();
      }
    }
  }, [
    onClick,
    url,
    organization.organization_name,
    navigate,
    isMobile,
    isExpanded,
    setIsDrawerOpen
  ]);

  // Memoize button content
  const buttonContent = useMemo(
    () => (
      <>
        <div className="navbar-link-icon">
          <Icon
            stroke={1.5}
            size={20}
            className="transition-transform duration-200 group-hover:scale-110"
          />
        </div>
        {isExpanded && (
          <span className="navbar-link-text text-sm font-medium transition-all duration-200 group-hover:translate-x-1">
            {name}
          </span>
        )}
        {/* Active indicator dot */}
        {isActive && (
          <div
            className="ml-auto w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: '#ffffff' }}
            aria-hidden="true"
          />
        )}
      </>
    ),
    [Icon, isExpanded, name, isActive]
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
        ${!isExpanded ? 'justify-center' : ''}
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

  // Show tooltip only when collapsed to provide context
  if (!isExpanded) {
    return (
      <Tooltip
        label={name}
        position="right"
        withArrow
        openDelay={300}
        closeDelay={100}
        style={{
          backgroundColor: themeColor,
          color: '#ffffff'
        }}
      >
        {button}
      </Tooltip>
    );
  }

  return button;
}
