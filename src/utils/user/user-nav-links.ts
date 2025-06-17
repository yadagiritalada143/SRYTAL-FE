import {
  IconBuildings,
  IconUserEdit,
  IconUsersGroup,
} from '@tabler/icons-react';

export const NavLinks = [
  {
    role: 'employee',
    url: 'employee/dashboard/profile',
    icon: IconUserEdit,
    name: 'Profile',
  },
  {
    role: 'recruiter',
    url: 'employee/dashboard/profile',
    icon: IconUserEdit,
    name: 'Profile',
  },
  {
    role: 'recruiter',
    url: 'employee/dashboard/pool-candidates',
    icon: IconUsersGroup,
    name: 'Pool Candidates',
  },
  {
    role: 'recruiter',
    url: 'employee/dashboard/pool-companies',
    icon: IconBuildings,
    name: 'Pool Companies',
  },
].sort((a, b) => a.name.length - b.name.length);
