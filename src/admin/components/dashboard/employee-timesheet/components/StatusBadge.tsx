import React from 'react';
import { Badge } from '@mantine/core';
import { TimesheetStatus } from '@interfaces/timesheet';

interface StatusBadgeProps {
  status: TimesheetStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case TimesheetStatus.Approved:
      return (
        <Badge color='green' size='sm'>
          Approved
        </Badge>
      );
    case TimesheetStatus.Rejected:
      return (
        <Badge color='red' size='sm'>
          Rejected
        </Badge>
      );
    case TimesheetStatus.WaitingForApproval:
      return (
        <Badge color='yellow' size='sm'>
          Pending
        </Badge>
      );
    default:
      return (
        <Badge color='gray' size='sm'>
          {status || 'Unknown'}
        </Badge>
      );
  }
};
