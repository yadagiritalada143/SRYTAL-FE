import {
  IconBuildings,
  IconCalendarTime,
  IconCheckbox,
  IconCurrencyDollar,
  IconLayoutDashboard,
  IconMessageCircle,
  IconTool,
  IconUserEdit,
  IconUsersGroup,
} from '@tabler/icons-react';

export const NavLinks = [
  {
    role: 'employee',
    url: 'employee/dashboard/profile',
    icon: IconUserEdit,
    name: 'My Profile',
  },
  {
    role: 'recruiter',
    url: 'employee/dashboard/profile',
    icon: IconUserEdit,
    name: 'My Profile',
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
  {
    role: 'employee',
    url: 'employee/dashboard/dashboard',
    icon: IconLayoutDashboard,
    name: 'Dashboard',
  },
  {
    role: 'recruiter',
    url: 'employee/dashboard/timesheet',
    icon: IconCalendarTime,
    name: 'Timesheet',
  },
  {
    role: 'employee',
    url: 'employee/dashboard/timesheet',
    icon: IconCalendarTime,
    name: 'Timesheet',
  },
  {
    role: 'recruiter',
    url: 'employee/dashboard/employee',
    icon: IconCurrencyDollar,
    name: 'Payslip',
  },
  {
    role: 'employee',
    url: 'employee/dashboard/payslip',
    icon: IconCurrencyDollar,
    name: 'Payslip',
  },
  {
    role: 'employee',
    url: 'employee/dashboard/announcements',
    icon: IconMessageCircle,
    name: 'Announcements',
  },
  {
    role: 'recruiter',
    url: 'employee/dashboard/announcements',
    icon: IconMessageCircle,
    name: 'Announcements',
  },
  {
    role: 'employee',
    url: 'employee/dashboard/mytasks',
    icon: IconCheckbox,
    name: 'My Tasks',
  },
  {
    role: 'employee',
    url: 'employee/dashboard/support',
    icon: IconTool,
    name: 'Support',
  },
  {
    role: 'recruiter',
    url: 'employee/dashboard/support',
    icon: IconTool,
    name: 'Support',
  },
].sort((a, b) => a.name.length - b.name.length);
