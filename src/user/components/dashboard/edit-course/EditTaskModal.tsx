import { useEffect, useState } from 'react';
import {
  Box,
  Modal,
  Stack,
  TextInput,
  Textarea,
  Switch,
  Select,
  Group,
  Loader,
  Text,
  Paper,
  ThemeIcon,
  FileInput,
  Image
} from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import {
  IconArrowRight,
  IconCheck,
  IconFile,
  IconLink,
  IconListCheck,
  IconUpload,
  IconX
} from '@tabler/icons-react';
import { CommonButton } from '@components/common/button/CommonButton';
import { useUpdateCourseTask } from '@hooks/mutations/useUserMutations';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import { commonUrls } from '@utils/common/constants';
import { useAppTheme } from '@hooks/use-app-theme';
import { Task, CourseStatus, COURSE_STATUSES } from '@interfaces/contentwriter';
import CourseThumbnail from '../content-writer/CourseThumbnail';
import DescriptionEditor from './DescriptionEditor';
import {
  saveQuizTaskState,
  taskRequiresAcknowledgement,
  clearTaskPopupState,
  clearTaskDraft
} from './task-popup-state';

const hasVisibleText = (html: string): boolean =>
  html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim().length > 0;

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
  const [descriptionTouched, setDescriptionTouched] = useState(false);
  const [requiresAcknowledgement, setRequiresAcknowledgement] = useState(false);
  const [acknowledgementText, setAcknowledgementText] = useState('');
  const [acknowledgementTouched, setAcknowledgementTouched] = useState(false);

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
    setDescriptionTouched(false);
    setRequiresAcknowledgement(
      taskRequiresAcknowledgement(task.acknowledgementText)
    );
    setAcknowledgementText(task.acknowledgementText || '');
    setAcknowledgementTouched(false);
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
        status,
        ...(isFile
          ? {
              acknowledgementText: requiresAcknowledgement
                ? acknowledgementText.trim()
                : ''
            }
          : {})
      });
      showSuccessToast('Task updated successfully!');
      onClose();
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to update task'));
    }
  };

  const { organization = '' } = useParams();
  const navigate = useNavigate();

  const isCoding = task?.isCoding || task?.type === 'CODE';
  const isLink = task?.type === 'LINK';
  const isQuiz = task?.type === 'QUIZ';
  const isFile = !isCoding && !isQuiz && task?.type === 'FILE';

  const handleManageQuizQuestions = () => {
    if (!task?._id) return;
    const params = new URLSearchParams({
      taskId: task._id,
      courseId: courseId || '',
      moduleId: task.moduleId || '',
      taskName: taskName || task?.taskName || ''
    });
    saveQuizTaskState({
      courseId: courseId || '',
      moduleId: task.moduleId || '',
      taskId: task._id,
      taskName: taskName || task?.taskName || ''
    });
    clearTaskPopupState();
    clearTaskDraft();
    onClose();
    navigate(
      `${commonUrls(organization)}/dashboard/content-writer/quiz-questions?${params.toString()}`
    );
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title='Edit Task'
      centered
      size='lg'
      radius='lg'
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      transitionProps={{ transition: 'fade-down', duration: 200 }}
      styles={{
        header: {
          backgroundColor: currentThemeConfig.cardBackground,
          borderBottom: `1px solid ${currentThemeConfig.borderColor}`,
          paddingBottom: '12px'
        },
        title: {
          fontWeight: 700,
          fontSize: '1.1rem',
          color: currentThemeConfig.color
        },
        content: {
          backgroundColor: currentThemeConfig.cardBackground,
          color: currentThemeConfig.color,
          borderRadius: '16px'
        }
      }}
    >
      <Stack gap='md' className='mt-4'>
        <TextInput
          label='Title'
          placeholder='e.g. Introduction video, Reading material'
          required
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
          radius='md'
        />
        <Box onBlur={() => setDescriptionTouched(true)}>
          <DescriptionEditor
            label='Description'
            value={taskDescription}
            onChange={setTaskDescription}
            resetKey={seededFor ?? undefined}
            required
          />
        </Box>
        {descriptionTouched && !hasVisibleText(taskDescription) && (
          <Text size='xs' c='red' mt={-10}>
            Task description is required.
          </Text>
        )}

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
                    name={task?.taskName || 'Task'}
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
            radius='md'
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
          radius='md'
        />

        {isQuiz && (
          <Paper
            p='md'
            radius='md'
            withBorder
            style={{
              borderColor: 'var(--mantine-color-indigo-3)',
              backgroundColor: 'rgba(99, 102, 241, 0.05)'
            }}
          >
            <Group justify='space-between' align='center' wrap='wrap' gap='sm'>
              <Group gap='sm'>
                <ThemeIcon size={36} radius='md' variant='light' color='indigo'>
                  <IconListCheck size={20} />
                </ThemeIcon>
                <Stack gap={2}>
                  <Text size='sm' fw={600}>
                    Quiz Questions
                  </Text>
                  <Text size='xs' c='dimmed'>
                    Manage, edit, or add questions for this quiz
                  </Text>
                </Stack>
              </Group>
              <CommonButton
                variant='light'
                size='xs'
                leftSection={<IconListCheck size={14} />}
                rightSection={<IconArrowRight size={14} />}
                onClick={handleManageQuizQuestions}
              >
                Manage Quiz Questions
              </CommonButton>
            </Group>
          </Paper>
        )}

        {!isCoding && !isQuiz && (
          <>
            <Stack gap={6}>
              <Text size='sm' fw={500}>
                Attached Resource
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
          </>
        )}

        {isFile && (
          <Stack gap='xs'>
            <Switch
              label='Require acknowledgement'
              checked={requiresAcknowledgement}
              onChange={event =>
                setRequiresAcknowledgement(event.currentTarget.checked)
              }
              description='Employees must tick a checkbox confirming they have read this file before they can complete the task or move on.'
            />
            {requiresAcknowledgement && (
              <Textarea
                label='Acknowledgement text'
                placeholder='e.g. I confirm that I have read and understood the attached document.'
                required
                autosize
                minRows={2}
                value={acknowledgementText}
                onChange={event =>
                  setAcknowledgementText(event.currentTarget.value)
                }
                onBlur={() => setAcknowledgementTouched(true)}
                error={
                  acknowledgementTouched && !acknowledgementText.trim()
                    ? 'Acknowledgement text is required.'
                    : undefined
                }
                radius='md'
              />
            )}
          </Stack>
        )}

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
            disabled={
              !taskName.trim() ||
              !hasVisibleText(taskDescription) ||
              (isFile &&
                requiresAcknowledgement &&
                !acknowledgementText.trim()) ||
              isPending
            }
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
