import {
  IconBook,
  IconBuildings,
  IconCalendarTime,
  // IconCheckbox,
  // IconCurrencyDollar,
  IconLayoutDashboard,
  // IconCurrencyDollar,
  // IconMessageCircle,
  // IconTool,
  IconUserEdit,
  IconUsersGroup,
  IconNotebook,
  IconUserStar
} from '@tabler/icons-react';

export const NavLinks = [
  {
    role: 'Employee',
    url: 'employee/dashboard/profile',
    icon: IconUserEdit,
    name: 'My Profile'
  },
  {
    role: 'ContentWriter',
    url: 'employee/dashboard/profile',
    icon: IconUserEdit,
    name: 'My Profile'
  },
  {
    role: 'Recruiter',
    url: 'employee/dashboard/profile',
    icon: IconUserEdit,
    name: 'My Profile'
  },
  {
    role: 'Recruiter',
    icon: IconUserStar,
    name: 'Talent Pool',
    children: [
      {
        name: 'Pool Candidates',
        url: 'employee/dashboard/pool-candidates'
      },
      {
        name: 'Pool Companies',
        url: 'employee/dashboard/pool-companies'
      }
    ]
  },
  {
    role: 'Employee',
    url: 'employee/dashboard/dashboard',
    icon: IconLayoutDashboard,
    name: 'Dashboard'
  },
  {
    role: 'Recruiter',
    url: 'employee/dashboard/timesheet',
    icon: IconCalendarTime,
    name: 'Timesheet'
  },
  {
    role: 'Employee',
    url: 'employee/dashboard/timesheet',
    icon: IconCalendarTime,
    name: 'Timesheet'
  },
  {
    role: 'ContentWriter',
    url: 'employee/dashboard/content-writer',
    icon: IconBook,
    name: 'Content Writer'
  },
  {
    role: 'Recruiter',
    name: 'Reports',
    icon: IconNotebook,
    children: [
      {
        name: 'Salary Slip',
        url: 'employee/dashboard/reports/salary-slip'
      }
    ]
  },
  {
    role: 'Employee',
    name: 'Reports',
    icon: IconNotebook,
    children: [
      {
        name: 'Salary Slip',
        url: 'employee/dashboard/reports/salary-slip'
      }
    ]
  },
  {
    role: 'ContentWriter',
    name: 'Reports',
    icon: IconNotebook,
    children: [
      {
        name: 'Salary Slip',
        url: 'employee/dashboard/reports/salary-slip'
      }
    ]
  }
  // {
  //   role: 'Employee',
  //   url: 'employee/dashboard/announcements',
  //   icon: IconMessageCircle,
  //   name: 'Announcements'
  // },
  // {
  //   role: 'Recruiter',
  //   url: 'employee/dashboard/announcements',
  //   icon: IconMessageCircle,
  //   name: 'Announcements'
  // },
  // {
  //   role: 'Employee',
  //   url: 'employee/dashboard/mytasks',
  //   icon: IconCheckbox,
  //   name: 'My Tasks'
  // }
  // {
  //   role: 'Employee',
  //   url: 'employee/dashboard/support',
  //   icon: IconTool,
  //   name: 'Support'
  // },
  // {
  //   role: 'Recruiter',
  //   url: 'employee/dashboard/support',
  //   icon: IconTool,
  //   name: 'Support'
  // },
  // {
  //   role: 'Employee',
  //   url: 'employee/dashboard/mentees',
  //   icon: IconUsersGroup,
  //   name: 'Mentees'
  // }
].sort((a, b) => a.name.length - b.name.length);
