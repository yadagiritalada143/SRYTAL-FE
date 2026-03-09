import React from 'react';
import { Group, Tooltip, Button } from '@mantine/core';
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';
import { EmployeeTimesheet, TimesheetStatus } from '@interfaces/timesheet';

interface TimesheetActionsProps {
  timesheet: EmployeeTimesheet;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const TimesheetActions: React.FC<TimesheetActionsProps> = ({
  timesheet,
  onApprove,
  onReject
}) => {
  const isPending = timesheet.status === TimesheetStatus.WaitingForApproval;

  return (
    <Group gap='xs' justify='center'>
      <Tooltip label='Approve'>
        <Button
          size='xs'
          variant='light'
          color='green'
          onClick={e => {
            e.stopPropagation();
            onApprove(timesheet.id);
          }}
          disabled={!isPending}
          leftSection={<IconCircleCheck size={14} />}
        >
          Approve
        </Button>
      </Tooltip>
      <Tooltip label='Reject'>
        <Button
          size='xs'
          variant='light'
          color='red'
          onClick={e => {
            e.stopPropagation();
            onReject(timesheet.id);
          }}
          disabled={!isPending}
          leftSection={<IconCircleX size={14} />}
        >
          Reject
        </Button>
      </Tooltip>
    </Group>
  );
};
