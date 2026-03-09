import React from 'react';
import { Group, Tooltip } from '@mantine/core';
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';
import { EmployeeTimesheet, TimesheetStatus } from '@interfaces/timesheet';
import { CommonButton } from '@components/common/button/CommonButton';

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
        <CommonButton
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
        </CommonButton>
      </Tooltip>
      <Tooltip label='Reject'>
        <CommonButton
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
        </CommonButton>
      </Tooltip>
    </Group>
  );
};
