import { Icon } from '@tabler/icons-react';
import { OrganizationConfig } from '../../../interfaces/organization';

export interface ChildNavLink {
  name: string;
  url: string;
}

export interface NavbarLinkProps {
  icon: any;
  name: string;
  url: string;
  role: string;
  organization: OrganizationConfig;
  isActive: boolean;
  onClick?: () => void;
  setIsDrawerOpen: () => void;
  children?: ChildNavLink[];
}

export interface NavbarProps {
  navLinks: {
    role: string;
    url: string;
    icon: Icon;
    name: string;
    children?: ChildNavLink[];
  }[];
  organizationConfig: OrganizationConfig;
  isDrawerOpen: boolean;
  setIsDrawerOpen: () => void;
}
