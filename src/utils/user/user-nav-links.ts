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
  IconNotebook
} from '@tabler/icons-react';

export const NavLinks = [
  {
    role: 'employee',
    url: 'employee/dashboard/profile',
    icon: IconUserEdit,
    name: 'My Profile'
  },
  {
    role: 'content-writer',
    url: 'employee/dashboard/profile',
    icon: IconUserEdit,
    name: 'My Profile'
  },
  {
    role: 'recruiter',
    url: 'employee/dashboard/profile',
    icon: IconUserEdit,
    name: 'My Profile'
  },
  {
    role: 'recruiter',
    url: 'employee/dashboard/pool-candidates',
    icon: IconUsersGroup,
    name: 'Pool Candidates'
  },
  {
    role: 'recruiter',
    url: 'employee/dashboard/pool-companies',
    icon: IconBuildings,
    name: 'Pool Companies'
  },
  {
    role: 'employee',
    url: 'employee/dashboard/dashboard',
    icon: IconLayoutDashboard,
    name: 'Dashboard'
  },
  {
    role: 'recruiter',
    url: 'employee/dashboard/timesheet',
    icon: IconCalendarTime,
    name: 'Timesheet'
  },
  {
    role: 'employee',
    url: 'employee/dashboard/timesheet',
    icon: IconCalendarTime,
    name: 'Timesheet'
  },
  {
    role: 'content-writer',
    url: 'employee/dashboard/content-writer',
    icon: IconBook,
    name: 'Content Writer'
  },
  {
    role: 'recruiter',
    name: 'Reports',
    icon: IconNotebook,
    children: [
      {
        name: 'Salary Slip',
        url: 'employee/dashboard/common/reports/salary-slip'
      }
    ]
  },
  {
    role: 'employee',
    name: 'Reports',
    icon: IconNotebook,
    children: [
      {
        name: 'Salary Slip',
        url: 'employee/dashboard/common/reports/salary-slip'
      }
    ]
  },
  {
    role: 'content-writer',
    name: 'Reports',
    icon: IconNotebook,
    children: [
      {
        name: 'Salary Slip',
        url: 'employee/dashboard/common/reports/salary-slip'
      }
    ]
  }
  // {
  //   role: 'employee',
  //   url: 'employee/dashboard/announcements',
  //   icon: IconMessageCircle,
  //   name: 'Announcements'
  // },
  // {
  //   role: 'recruiter',
  //   url: 'employee/dashboard/announcements',
  //   icon: IconMessageCircle,
  //   name: 'Announcements'
  // },
  // {
  //   role: 'employee',
  //   url: 'employee/dashboard/mytasks',
  //   icon: IconCheckbox,
  //   name: 'My Tasks'
  // }
  // {
  //   role: 'employee',
  //   url: 'employee/dashboard/support',
  //   icon: IconTool,
  //   name: 'Support'
  // },
  // {
  //   role: 'recruiter',
  //   url: 'employee/dashboard/support',
  //   icon: IconTool,
  //   name: 'Support'
  // },
  // {
  //   role: 'employee',
  //   url: 'employee/dashboard/mentees',
  //   icon: IconUsersGroup,
  //   name: 'Mentees'
  // }
].sort((a, b) => a.name.length - b.name.length);
