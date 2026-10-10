import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Modal,
  Stack,
  TextInput,
  FileInput,
  SegmentedControl,
  Group,
  Text,
  Loader,
  Paper,
  ThemeIcon
} from '@mantine/core';
import {
  IconUpload,
  IconCheck,
  IconLink,
  IconFile,
  IconCode
} from '@tabler/icons-react';
import { CommonButton } from '@components/common/button/CommonButton';
import { useAddCourseTask } from '@hooks/mutations/useUserMutations';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import { commonUrls } from '@utils/common/constants';
import { useAppTheme } from '@hooks/use-app-theme';
import {
  saveTaskPopupState,
  saveTaskDraft,
  readTaskDraft,
  clearTaskDraft,
  AddTaskContentMode
} from './task-popup-state';
import DescriptionEditor from './DescriptionEditor';

interface AddTaskModalProps {
  opened: boolean;
  onClose: () => void;
  moduleId: string;
  courseId: string;
}

type ContentMode = AddTaskContentMode;
type TaskField = 'taskName' | 'link' | 'file' | 'taskDescription' | 'thumbnail';

const VALIDATION_MESSAGES = {
  taskName: 'Task name is required.',
  link: 'A valid HTTP or HTTPS link is required for LINK tasks.',
  file: 'A file is required for FILE tasks.',
  taskDescription: 'Task description is required for coding tasks.',
  thumbnail: 'Thumbnail must be a JPG, PNG, or WEBP image.'
} as const;

const THUMBNAIL_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const isHttpUrl = (value: string): boolean => {
  try {
    const url = new URL(value.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

const hasVisibleText = (html: string): boolean =>
  html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim().length > 0;

const AddTaskModal = ({
  opened,
  onClose,
  moduleId,
  courseId
}: AddTaskModalProps) => {
  const { organization = '' } = useParams();
  const navigate = useNavigate();
  const { themeConfig: currentThemeConfig } = useAppTheme();
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [mode, setMode] = useState<ContentMode>('LINK');
  const [link, setLink] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [touched, setTouched] = useState<Record<TaskField, boolean>>({
    taskName: false,
    link: false,
    file: false,
    taskDescription: false,
    thumbnail: false
  });
  const [draftResetKey, setDraftResetKey] = useState(0);

  const { mutateAsync: addTask, isPending } = useAddCourseTask(courseId);
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const touch = (field: TaskField) =>
    setTouched(prev => ({ ...prev, [field]: true }));

  useEffect(() => {
    const draft = readTaskDraft();
    if (!draft || draft.courseId !== courseId || draft.moduleId !== moduleId) {
      return;
    }
    clearTaskDraft();
    setTaskName(draft.taskName);
    setTaskDescription(draft.taskDescription);
    setMode(draft.mode);
    setLink(draft.link);
    setFile(draft.file);
    setThumbnail(draft.thumbnail);
    setDraftResetKey(key => key + 1);
  }, [courseId, moduleId]);

  const reset = () => {
    clearTaskDraft();
    setTaskName('');
    setTaskDescription('');
    setMode('LINK');
    setLink('');
    setFile(null);
    setThumbnail(null);
    setTouched({
      taskName: false,
      link: false,
      file: false,
      taskDescription: false,
      thumbnail: false
    });
  };

  const handleClose = () => {
    if (isPending) return;
    reset();
    onClose();
  };

  const handleManageLanguages = () => {
    saveTaskDraft({
      courseId,
      moduleId,
      taskName,
      taskDescription,
      mode,
      link,
      file,
      thumbnail
    });
    saveTaskPopupState({ courseId, moduleId });
    navigate(
      `${commonUrls(organization)}/dashboard/content-writer/programming-languages`
    );
  };

  const errors: Partial<Record<TaskField, string>> = {};
  if (!taskName.trim()) errors.taskName = VALIDATION_MESSAGES.taskName;
  if (mode === 'LINK') {
    if (!link.trim() || !isHttpUrl(link))
      errors.link = VALIDATION_MESSAGES.link;
  } else if (mode === 'FILE') {
    if (!file) errors.file = VALIDATION_MESSAGES.file;
  } else if (!hasVisibleText(taskDescription)) {
    errors.taskDescription = VALIDATION_MESSAGES.taskDescription;
  }
  if (thumbnail && !THUMBNAIL_MIME_TYPES.includes(thumbnail.type)) {
    errors.thumbnail = VALIDATION_MESSAGES.thumbnail;
  }

  const isValid = Object.keys(errors).length === 0;
  const fieldError = (field: TaskField) =>
    touched[field] ? errors[field] : undefined;

  const handleSubmit = async () => {
    if (!isValid) return;
    try {
      const response = await addTask({
        moduleId,
        taskName: taskName.trim(),
        taskDescription: taskDescription.trim(),
        type: mode === 'CODING' ? 'CODE' : mode,
        link: mode === 'LINK' ? link.trim() : undefined,
        file: mode === 'FILE' ? file : undefined,
        thumbnail
      });
      showSuccessToast(response?.message || 'Task added successfully!');
      reset();
      onClose();
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to add task'));
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title='Add Task'
      centered
      radius='lg'
      size='md'
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      transitionProps={{ transition: 'pop', duration: 200 }}
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
          onBlur={() => touch('taskName')}
          error={fieldError('taskName')}
          radius='md'
        />
        <Box onBlur={() => touch('taskDescription')}>
          <DescriptionEditor
            label='Description'
            value={taskDescription}
            onChange={setTaskDescription}
            resetKey={draftResetKey}
            required={mode === 'CODING'}
          />
        </Box>
        {mode === 'CODING' && fieldError('taskDescription') && (
          <Text size='xs' c='red' mt={-10}>
            {errors.taskDescription}
          </Text>
        )}

        <Stack gap='xs'>
          <Text size='sm' fw={600}>
            Task Type
          </Text>
          <SegmentedControl
            fullWidth
            radius='md'
            color='indigo'
            value={mode}
            onChange={value => setMode(value as ContentMode)}
            data={[
              {
                value: 'LINK',
                label: (
                  <Group gap={6} justify='center'>
                    <IconLink size={16} />
                    <span>Link</span>
                  </Group>
                )
              },
              {
                value: 'FILE',
                label: (
                  <Group gap={6} justify='center'>
                    <IconFile size={16} />
                    <span>File</span>
                  </Group>
                )
              },
              {
                value: 'CODING',
                label: (
                  <Group gap={6} justify='center'>
                    <IconCode size={16} />
                    <span>Coding</span>
                  </Group>
                )
              }
            ]}
          />
        </Stack>

        {mode === 'LINK' ? (
          <TextInput
            label='Link URL'
            placeholder='https://youtube.com/... or any blog/article URL'
            required
            leftSection={<IconLink size={16} />}
            value={link}
            onChange={e => setLink(e.target.value)}
            onBlur={() => touch('link')}
            error={fieldError('link')}
            description='YouTube, blog posts, articles, or any public URL'
            radius='md'
          />
        ) : mode === 'FILE' ? (
          <FileInput
            label='File'
            placeholder='Upload a PDF, Word, or any file'
            leftSection={<IconUpload size={16} />}
            value={file}
            onChange={setFile}
            onBlur={() => touch('file')}
            error={fieldError('file')}
            required
            clearable
            description='Any file type is supported'
            radius='md'
          />
        ) : (
          <Stack gap='xs'>
            <Paper p='sm' radius='md' withBorder style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)' }}>
              <Group gap='xs' wrap='nowrap' align='flex-start'>
                <ThemeIcon size={24} radius='md' variant='light' color='indigo'>
                  <IconCode size={14} />
                </ThemeIcon>
                <Text size='xs' c='dimmed'>
                  The title above becomes the coding question and the
                  description becomes the problem statement learners solve.
                </Text>
              </Group>
            </Paper>
            <CommonButton
              variant='light'
              leftSection={<IconCode size={16} />}
              onClick={handleManageLanguages}
              style={{ width: 'fit-content' }}
            >
              Add Programming Language
            </CommonButton>
          </Stack>
        )}

        <FileInput
          label='Thumbnail (optional)'
          placeholder='Upload a thumbnail image'
          accept='image/jpeg,image/png,image/webp'
          leftSection={<IconUpload size={16} color='gray' />}
          value={thumbnail}
          onChange={setThumbnail}
          onBlur={() => touch('thumbnail')}
          error={fieldError('thumbnail')}
          description='JPG, PNG, or WEBP'
          clearable
          radius='md'
        />

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
            disabled={!isValid || isPending}
            onClick={handleSubmit}
          >
            {isPending ? 'Adding...' : 'Add Task'}
          </CommonButton>
        </Group>
      </Stack>
    </Modal>
  );
};

export default AddTaskModal;
