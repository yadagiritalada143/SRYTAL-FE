// Maps catalog icon-name strings (stored in the DB) to Tabler icon components.
// The backend can only persist a name; the runtime resolves it here. Any icon
// referenced by the nav catalog/seed must be registered below, with a fallback.
import {
  IconBook,
  IconBook2,
  IconBuildings,
  IconCalendarTime,
  IconChartLine,
  IconCircle,
  IconLayoutDashboard,
  IconLock,
  IconNotebook,
  IconNotification,
  IconPackage,
  IconReport,
  IconReportMoney,
  IconSettings,
  IconUserEdit,
  IconUsers,
  IconUsersGroup,
  IconUserStar,
  type Icon
} from '@tabler/icons-react';

export const ICON_MAP: Record<string, Icon> = {
  IconBook,
  IconBook2,
  IconBuildings,
  IconCalendarTime,
  IconChartLine,
  IconLayoutDashboard,
  IconLock,
  IconNotebook,
  IconNotification,
  IconPackage,
  IconReport,
  IconReportMoney,
  IconSettings,
  IconUserEdit,
  IconUsers,
  IconUsersGroup,
  IconUserStar
};

export const resolveIcon = (name?: string): Icon =>
  (name && ICON_MAP[name]) || IconCircle;
