import { useNavigate } from 'react-router-dom';
import { NavbarLinkProps } from './types';
import { UnstyledButton } from '@mantine/core';

export function NavbarLink({
  icon: Icon,
  name,
  url,
  organization,
  isActive,
  onClick,
  isMobile,
  isExpanded,
  setIsDrawerOpen,
}: NavbarLinkProps) {
  const navigate = useNavigate();
  const themeColor = organization.organization_theme.theme.color;

  const handleClick = () => {
    if (onClick) onClick();
    if (url) {
      navigate(`/${organization.organization_name}/${url}`);
      if (isMobile) setIsDrawerOpen();
    }
  };

  return (
    <UnstyledButton
      onClick={handleClick}
      className="flex items-center gap-3 px-1 py-1 rounded-md transition duration-150 w-full hover:bg-opacity-10 hover:shadow-sm"
      style={{
        color: themeColor,
        borderLeft: isActive ? `3px solid ${themeColor}` : undefined,
        borderRight: isActive ? `3px solid ${themeColor}` : undefined,
      }}
      data-active={isActive}
    >
      <Icon stroke={1.5} />
      {isExpanded && <span className="text-sm font-medium">{name}</span>}
    </UnstyledButton>
  );
}
