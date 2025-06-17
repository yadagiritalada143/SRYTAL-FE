import { Icon } from '@tabler/icons-react';
import { OrganizationConfig } from '../../../interfaces/organization';

export interface NavbarLinkProps {
  icon: any;
  name: string;
  url: string;
  role: string;
  organization: OrganizationConfig;
  isActive: boolean;
  onClick?: () => void;
  isExpanded?: boolean;
  isMobile: boolean | undefined;
  setIsDrawerOpen: () => void;
}

export interface NavbarProps {
  navLinks: {
    role: string;
    url: string;
    icon: Icon;
    name: string;
  }[];
  organizationConfig: OrganizationConfig;
  isDrawerOpen: boolean;
  setIsDrawerOpen: () => void;
}
