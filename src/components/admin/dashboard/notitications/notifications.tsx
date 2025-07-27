import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { NotificationsTable } from './notifications-table';
import { TimesheetNotification } from '../../../../interfaces/notifications';

const Notifications = () => {
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const [notifications, setNotifications] = useState<TimesheetNotification[]>([
    {
      id: '1',
      employeeName: 'John Doe',
      date: '2025-07-26',
      hours: 8,
      comments: 'Worked on Project X',
      status: 'Waiting For Approval'
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      date: '2025-07-25',
      hours: 7,
      comments: 'Bug Fixing on Module Y',
      status: 'Waiting For Approval'
    }
  ]);

  const handleAction = (id: string, action: 'Approved' | 'Rejected') => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        setNotifications(prev =>
          prev.map(n => (n.id === id ? { ...n, status: action } : n))
        );
        toast.success(`Timesheet ${action}`);
        resolve();
      }, 1000);
    });
  };

  return (
    <NotificationsTable
      notifications={notifications}
      organizationConfig={organizationConfig}
      onAction={handleAction}
    />
  );
};

export default Notifications;
