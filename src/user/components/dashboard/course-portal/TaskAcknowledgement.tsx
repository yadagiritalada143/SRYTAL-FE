import { useEffect, useState } from 'react';
import { Box, Checkbox, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconCheck, IconShieldCheck } from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { useUpdateMyTaskAcknowledgement } from '@hooks/mutations/useUserMutations';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import { CommonButton } from '@components/common/button/CommonButton';
import { AssignedTask } from '@interfaces/course-assignment';
import { isCodingTask } from './task-content';

interface TaskAcknowledgementProps {
  courseAssignmentId: string;
  task: AssignedTask;
  onAcknowledged?: () => void;
}

const TaskAcknowledgement = ({
  courseAssignmentId,
  task,
  onAcknowledged
}: TaskAcknowledgementProps) => {
  const { themeConfig } = useAppTheme();
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const { mutateAsync: acknowledge, isPending } =
    useUpdateMyTaskAcknowledgement();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(false);
  }, [task._id]);

  const isFileTask =
    !isCodingTask(task) && String(task.type || '').toUpperCase() === 'FILE';
  const requiresAcknowledgement = Boolean(task.acknowledgementText?.trim());

  if (!isFileTask || !requiresAcknowledgement) return null;

  const handleAcknowledge = async () => {
    if (!checked) return;
    try {
      await acknowledge({
        courseAssignmentId,
        taskId: task._id,
        acknowledged: true
      });
      showSuccessToast('Acknowledgement recorded');
      onAcknowledged?.();
    } catch (error) {
      showErrorToast(
        getErrorMessage(error, 'Could not record your acknowledgement')
      );
    }
  };

  return (
    <Box
      p={{ base: 'md', sm: 'lg' }}
      style={{ borderTop: `1px solid ${themeConfig.borderColor}` }}
    >
      {task.acknowledged ? (
        <Group gap='xs' wrap='nowrap'>
          <ThemeIcon size={26} radius='xl' variant='light' color='teal'>
            <IconCheck size={15} />
          </ThemeIcon>
          <Text size='sm' c={themeConfig.mutedTextColor}>
            You acknowledged this document
            {task.acknowledgedAt
              ? ` on ${new Date(task.acknowledgedAt).toLocaleDateString()}`
              : ''}
            .
          </Text>
        </Group>
      ) : (
        <Stack gap='sm'>
          <Group gap='xs' wrap='nowrap'>
            <ThemeIcon size={30} radius='md' variant='light' color='indigo'>
              <IconShieldCheck size={18} />
            </ThemeIcon>
            <Stack gap={0} style={{ flex: 1 }}>
              <Text fw={600}>Acknowledgement</Text>
            </Stack>
          </Group>

          <Checkbox
            checked={checked}
            onChange={event => setChecked(event.currentTarget.checked)}
            label={task.acknowledgementText?.trim()}
          />

          <Group justify='flex-end'>
            <CommonButton
              leftSection={<IconCheck size={16} />}
              loading={isPending}
              disabled={!checked || isPending}
              onClick={handleAcknowledge}
            >
              Acknowledge
            </CommonButton>
          </Group>
        </Stack>
      )}
    </Box>
  );
};

export default TaskAcknowledgement;
