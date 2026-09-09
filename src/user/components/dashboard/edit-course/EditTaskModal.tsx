import { useEffect, useState } from 'react';
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
  ThemeIcon,
  FileInput,
  Image
} from '@mantine/core';
import {
  IconCheck,
  IconLink,
  IconFile,
  IconUpload,
  IconX
} from '@tabler/icons-react';
import { CommonButton } from '@components/common/button/CommonButton';
import { useUpdateCourseTask } from '@hooks/mutations/useUserMutations';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import { useAppTheme } from '@hooks/use-app-theme';
import { Task, CourseStatus, COURSE_STATUSES } from '@interfaces/contentwriter';
import CourseThumbnail from '../content-writer/CourseThumbnail';

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
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<CourseStatus>('ACTIVE');

  const { mutateAsync: updateTask, isPending } = useUpdateCourseTask(courseId);
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const { themeConfig: currentThemeConfig } = useAppTheme();

  // Show a live preview of the chosen replacement file.
  useEffect(() => {
    if (!thumbnail) {
      setThumbPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setThumbPreview(reader.result as string);
    reader.readAsDataURL(thumbnail);
  }, [thumbnail]);

  // Seeded during render so the form always reflects the task just opened.
  const [seededFor, setSeededFor] = useState<string | null>(null);
  if (opened && task && seededFor !== task._id) {
    setSeededFor(task._id);
    setTaskName(task.taskName || '');
    setTaskDescription(task.taskDescription || '');
    setThumbnail(null);
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
        thumbnail,
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

        <Stack gap={6}>
          <Text size='sm' fw={500}>
            Thumbnail{' '}
            {(task?.thumbnailUrl || task?.thumbnail) && (
              <Text component='span' c='dimmed' size='xs' fw={400}>
                (optional)
              </Text>
            )}
          </Text>

          {(thumbPreview || task?.thumbnailUrl || task?.thumbnail) && (
            <Paper
              p='xs'
              radius='md'
              withBorder
              style={{ borderColor: currentThemeConfig.borderColor }}
            >
              <Group gap='sm' wrap='nowrap'>
                {thumbPreview ? (
                  <Image
                    src={thumbPreview}
                    w={64}
                    h={48}
                    radius='sm'
                    fit='cover'
                    alt='New thumbnail preview'
                    style={{ flexShrink: 0 }}
                  />
                ) : (
                  <CourseThumbnail
                    name={task?.taskName || 'Content'}
                    src={task?.thumbnailUrl || task?.thumbnail}
                    size={64}
                    height={48}
                    radius='sm'
                  />
                )}
                <Stack gap={0} style={{ minWidth: 0, flex: 1 }}>
                  <Text size='sm' fw={500} lineClamp={1}>
                    {thumbPreview ? thumbnail?.name : 'Current thumbnail'}
                  </Text>
                  <Text size='xs' c='dimmed' lineClamp={1}>
                    {thumbPreview
                      ? 'Replaces the current thumbnail when saved'
                      : 'Pick a file below to replace it'}
                  </Text>
                  {thumbPreview && (
                    <CommonButton
                      variant='light'
                      color='red'
                      size='xs'
                      leftSection={<IconX size={12} />}
                      onClick={() => setThumbnail(null)}
                      style={{ width: 'fit-content' }}
                      mt={4}
                    >
                      Remove
                    </CommonButton>
                  )}
                </Stack>
              </Group>
            </Paper>
          )}

          <FileInput
            placeholder={
              task?.thumbnailUrl || task?.thumbnail
                ? 'Choose a new thumbnail image'
                : 'Upload a thumbnail image'
            }
            accept='image/*'
            leftSection={<IconUpload size={16} />}
            value={thumbnail}
            onChange={setThumbnail}
            clearable
            description={
              !task?.thumbnailUrl && !task?.thumbnail && !thumbPreview
                ? 'No thumbnail yet — optional, but recommended'
                : undefined
            }
          />
        </Stack>

        <Select
          label='Status'
          data={COURSE_STATUSES}
          value={status}
          onChange={value => setStatus((value as CourseStatus) || 'ACTIVE')}
          allowDeselect={false}
          comboboxProps={{ withinPortal: true }}
        />

        {/* The update endpoint only replaces the thumbnail; the attached
            file/link is shown for reference but cannot be swapped. */}
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
