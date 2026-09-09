import {
  IconBook,
  IconLayoutDashboard,
  IconNotebook,
  IconNotification,
  IconPackage,
  IconSettings,
  IconUserEdit,
  IconUsers,
  IconUserStar
} from '@tabler/icons-react';

export const adminNavLinks = [
  {
    role: 'admin',
    url: 'admin/dashboard',
    icon: IconLayoutDashboard,
    name: 'Dashboard'
  },
  {
    role: 'admin',
    url: 'admin/dashboard/employees',
    icon: IconUsers,
    name: 'Employees'
  },
  {
    role: 'admin',
    url: 'admin/dashboard/profile',
    icon: IconUserEdit,
    name: 'Profile'
  },
  {
    role: 'admin',
    url: 'admin/dashboard/packages',
    icon: IconPackage,
    name: 'Packages'
  },
  {
    role: 'admin',
    icon: IconBook,
    name: 'Courses',
    children: [
      {
        name: 'Assign Course',
        url: 'admin/dashboard/course-assignments'
      },
      {
        name: 'Track Progress',
        url: 'admin/dashboard/track-progress'
      }
    ]
  },
  {
    role: 'admin',
    url: 'admin/dashboard/notification',
    icon: IconNotification,
    name: 'Notification'
  },
  {
    role: 'admin',
    icon: IconUserStar,
    name: 'Talent Pool',
    children: [
      {
        name: 'Pool Candidates',
        url: 'admin/dashboard/pool-candidates'
      },
      {
        name: 'Pool Companies',
        url: 'admin/dashboard/pool-companies'
      }
    ]
  },
  {
    role: 'admin',
    url: 'admin/dashboard/reports',
    icon: IconNotebook,
    name: 'Payroll Management',
    children: [
      //{
      //name: 'Generate Offer',
      //url: 'admin/dashboard/reports/generate-offer'
      //},
      {
        name: 'Generate Salary Slip',
        url: 'admin/dashboard/reports/generate-salary-slip'
      },
      {
        name: 'Payroll Reports',
        url: 'admin/dashboard/reports/all-employee-reports'
      }
    ]
  },
  {
    role: 'admin',
    url: 'admin/dashboard/settings',
    icon: IconSettings,
    name: 'Settings'
  }
];
