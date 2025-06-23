import {
  IconBuildings,
  IconTimeline,
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
    role: 'employee',
    url: 'employee/dashboard/timesheet',
    icon: IconTimeline,
    name: 'Timesheet',
  },
  {
    role: 'recruiter',
    url: 'employee/dashboard/timesheet',
    icon: IconTimeline,
    name: 'Timesheet',
  },
  {
    role: 'recruiter',
    url: 'employee/dashboard/pool-companies',
    icon: IconBuildings,
    name: 'Pool Companies',
  },
].sort((a, b) => a.name.length - b.name.length);
