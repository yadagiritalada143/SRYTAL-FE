import { useState } from 'react';
import {
  Modal,
  Stack,
  TextInput,
  Textarea,
  Select,
  Group,
  Loader,
  Text,
  Paper,
  ThemeIcon
} from '@mantine/core';
import { IconCheck, IconLink, IconFile } from '@tabler/icons-react';
import { CommonButton } from '@components/common/button/CommonButton';
import { useUpdateCourseTask } from '@hooks/mutations/useUserMutations';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import { useAppTheme } from '@hooks/use-app-theme';
import { Task, CourseStatus, COURSE_STATUSES } from '@interfaces/contentwriter';

interface EditTaskModalProps {
  opened: boolean;
  onClose: () => void;
  task?: Task;
  courseId: string;
}

const EditTaskModal = ({
  opened,
  onClose,
  task,
  courseId
}: EditTaskModalProps) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [status, setStatus] = useState<CourseStatus>('ACTIVE');

  const { mutateAsync: updateTask, isPending } = useUpdateCourseTask(courseId);
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const { themeConfig: currentThemeConfig } = useAppTheme();

  // Seeded during render so the form always reflects the task just opened.
  const [seededFor, setSeededFor] = useState<string | null>(null);
  if (opened && task && seededFor !== task._id) {
    setSeededFor(task._id);
    setTaskName(task.taskName || '');
    setTaskDescription(task.taskDescription || '');
    setStatus((task.status as CourseStatus) || 'ACTIVE');
  } else if (!opened && seededFor !== null) {
    setSeededFor(null);
  }

  const handleClose = () => {
    if (isPending) return;
    onClose();
  };

  const handleSubmit = async () => {
    if (!task) return;
    try {
      await updateTask({
        id: task._id,
        taskName: taskName.trim(),
        taskDescription: taskDescription.trim(),
        thumbnail: task.thumbnail,
        status
      });
      showSuccessToast('Content updated successfully!');
      onClose();
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to update content'));
    }
  };

  const isLink = task?.type === 'LINK';

  return (
    <Modal opened={opened} onClose={handleClose} title='Edit Content' centered>
      <Stack gap='md'>
        <TextInput
          label='Title'
          placeholder='e.g. Introduction video, Reading material'
          required
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
        />
        <Textarea
          label='Description'
          placeholder='Briefly describe this content'
          autosize
          minRows={2}
          value={taskDescription}
          onChange={e => setTaskDescription(e.target.value)}
        />
        <Select
          label='Status'
          data={COURSE_STATUSES}
          value={status}
          onChange={value => setStatus((value as CourseStatus) || 'ACTIVE')}
          allowDeselect={false}
          comboboxProps={{ withinPortal: true }}
        />

        {/* The update endpoint only covers the task's metadata, so the
            attached file/link is shown for reference but cannot be swapped. */}
        <Stack gap={6}>
          <Text size='sm' fw={500}>
            Attached Content
          </Text>
          <Paper
            p='sm'
            radius='md'
            withBorder
            style={{ borderColor: currentThemeConfig.borderColor }}
          >
            <Group gap='sm' wrap='nowrap'>
              <ThemeIcon
                variant='light'
                radius='md'
                color={isLink ? 'blue' : 'grape'}
              >
                {isLink ? <IconLink size={18} /> : <IconFile size={18} />}
              </ThemeIcon>
              <Stack gap={0} style={{ minWidth: 0 }}>
                <Text size='sm' lineClamp={1}>
                  {isLink
                    ? task?.content || 'External link'
                    : task?.contentFileName || 'Uploaded file'}
                </Text>
                <Text size='xs' c='dimmed'>
                  {isLink ? 'Link' : 'File'} — replace by adding new content
                </Text>
              </Stack>
            </Group>
          </Paper>
        </Stack>

        <Group justify='flex-end' mt='sm'>
          <CommonButton variant='default' onClick={handleClose}>
            Cancel
          </CommonButton>
          <CommonButton
            leftSection={
              isPending ? (
                <Loader size='xs' color='white' />
              ) : (
                <IconCheck size={16} />
              )
            }
            disabled={!taskName.trim() || isPending}
            onClick={handleSubmit}
          >
            {isPending ? 'Saving...' : 'Save Changes'}
          </CommonButton>
        </Group>
      </Stack>
    </Modal>
  );
};

export default EditTaskModal;
