import {
  IconBuildings,
  IconDroplet,
  IconFileSpreadsheet,
  IconNetwork,
  IconNotebook,
  IconPackage,
  IconUserEdit,
  IconUsers,
  IconUsersGroup,
  IconWorldCheck,
} from '@tabler/icons-react';

export const adminNavLinks = [
  {
    role: 'admin',
    url: 'admin/dashboard',
    icon: IconUsers,
    name: 'Employees',
  },
  {
    role: 'admin',
    url: 'admin/dashboard/profile',
    icon: IconUserEdit,
    name: 'Profile',
  },
  {
    role: 'admin',
    url: 'admin/dashboard/timesheet',
    icon: IconFileSpreadsheet,
    name: 'Timesheet',
  },
  {
    role: 'admin',
    url: 'admin/dashboard/reports',
    icon: IconNotebook,
    name: 'Reports',
  },
  {
    role: 'admin',
    url: 'admin/dashboard/packages',
    icon: IconPackage,
    name: 'Packages',
  },
  {
    role: 'admin',
    url: 'admin/dashboard/pool-candidates',
    icon: IconUsersGroup,
    name: 'Pool Candidates',
  },
  {
    role: 'admin',
    url: 'admin/dashboard/pool-companies',
    icon: IconBuildings,
    name: 'Pool Companies',
  },
  {
    role: 'admin',
    url: 'admin/dashboard/blood-group-management',
    icon: IconDroplet,
    name: 'Blood Groups',
  },
  {
    role: 'admin',
    url: 'admin/dashboard/employment-type-management',
    icon: IconNetwork,
    name: 'Employment Types',
  },
  {
    role: 'admin',
    url: 'admin/dashboard/employment-role-management',
    icon: IconWorldCheck,
    name: 'Employment Roles',
  },
].sort((a, b) => a.name.length - b.name.length);
