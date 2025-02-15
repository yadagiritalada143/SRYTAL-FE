import {
  IconDroplet,
  IconNetwork,
  IconUser,
  IconUserEdit,
  IconWorldCheck,
} from "@tabler/icons-react";

export const adminNavLinks = [
  {
    role: "admin",
    url: "dashboard",
    icon: IconUser,
    name: "Employees",
  },
  {
    role: "admin",
    url: "dashboard/blood-group-management",
    icon: IconDroplet,
    name: "Blood-Groups",
  },
  {
    role: "admin",
    url: "dashboard/employment-type-management",
    icon: IconNetwork,
    name: "Employment-Types",
  },
  {
    role: "admin",
    url: "dashboard/employment-role-management",
    icon: IconWorldCheck,
    name: "Employment-Roles",
  },
  {
    role: "admin",
    url: "dashboard/profile",
    icon: IconUserEdit,
    name: "Profile",
  },
];
