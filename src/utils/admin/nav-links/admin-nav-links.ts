import {
  IconBuildings,
  IconDroplet,
  IconNetwork,
  IconNotebook,
  IconPackage,
  IconSettings,
  IconUserEdit,
  IconUsers,
  IconUsersGroup,
  IconUserStar,
  IconWorldCheck
} from '@tabler/icons-react';
import { Children } from 'react';

export const adminNavLinks = [
  {
    role: 'admin',
    url: 'admin/dashboard',
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
