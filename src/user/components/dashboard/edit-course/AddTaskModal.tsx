import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Modal,
  Stack,
  TextInput,
  Textarea,
  Switch,
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
  IconCode,
  IconListCheck
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
  initialMode?: AddTaskContentMode;
  orderIdx?: number;
}

type ContentMode = AddTaskContentMode;
type TaskField =
  | 'taskName'
  | 'link'
  | 'file'
  | 'taskDescription'
  | 'acknowledgementText'
  | 'thumbnail';

const VALIDATION_MESSAGES = {
  taskName: 'Task name is required.',
  link: 'A valid HTTP or HTTPS link is required for LINK tasks.',
  file: 'A file is required for FILE tasks.',
  fileType:
    'Unsupported file format. Upload a PDF, Office document, TXT, CSV, or image file.',
  taskDescription: 'Task description is required.',
  acknowledgementText: 'Acknowledgement text is required.',
  thumbnail: 'Thumbnail must be a JPG, PNG, or WEBP image.'
} as const;

const THUMBNAIL_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const TASK_FILE_EXTENSIONS = [
  '.pdf',
  '.doc',
  '.docx',
  '.ppt',
  '.pptx',
  '.xls',
  '.xlsx',
  '.txt',
  '.csv',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp'
];
const TASK_FILE_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'text/csv',
  'application/csv',
  'text/comma-separated-values',
  'image/png',
  'image/jpeg',
  'image/webp'
];
const TASK_FILE_GENERIC_MIME_TYPES = ['application/octet-stream'];
const TASK_FILE_ACCEPT = TASK_FILE_EXTENSIONS.join(',');
const TASK_FILE_FORMATS_LABEL =
  'Supported formats: PDF, Word, Excel, PowerPoint, TXT, CSV, PNG, JPG, WEBP';

const isSupportedTaskFile = (file: File): boolean => {
  const dotIndex = file.name.lastIndexOf('.');
  const extension =
    dotIndex >= 0 ? file.name.slice(dotIndex).toLowerCase() : '';
  if (!TASK_FILE_EXTENSIONS.includes(extension)) return false;

  // An empty file.type reaches the backend as application/octet-stream.
  const mimeType = String(
    file.type || 'application/octet-stream'
  ).toLowerCase();
  return (
    TASK_FILE_MIME_TYPES.includes(mimeType) ||
    TASK_FILE_GENERIC_MIME_TYPES.includes(mimeType)
  );
};

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
  courseId,
  initialMode,
  orderIdx = 1
}: AddTaskModalProps) => {
  const { organization = '' } = useParams();
  const navigate = useNavigate();
  const { themeConfig: currentThemeConfig } = useAppTheme();
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [mode, setMode] = useState<ContentMode>(initialMode || 'LINK');
  const [link, setLink] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [requiresAcknowledgement, setRequiresAcknowledgement] = useState(false);
  const [acknowledgementText, setAcknowledgementText] = useState('');
  const [touched, setTouched] = useState<Record<TaskField, boolean>>({
    taskName: false,
    link: false,
    file: false,
    taskDescription: false,
    acknowledgementText: false,
    thumbnail: false
  });
  const [draftResetKey, setDraftResetKey] = useState(0);
  const [submittingAction, setSubmittingAction] = useState<
    'save' | 'saveAndQuestions' | null
  >(null);

  const { mutateAsync: addTask, isPending } = useAddCourseTask(courseId);
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const touch = (field: TaskField) =>
    setTouched(prev => ({ ...prev, [field]: true }));

  useEffect(() => {
    if (opened && initialMode) {
      setMode(initialMode);
    }
  }, [opened, initialMode]);

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
    setSubmittingAction(null);
    setTaskName('');
    setTaskDescription('');
    setMode(initialMode || 'LINK');
    setLink('');
    setFile(null);
    setThumbnail(null);
    setRequiresAcknowledgement(false);
    setAcknowledgementText('');
    setTouched({
      taskName: false,
      link: false,
      file: false,
      taskDescription: false,
      acknowledgementText: false,
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
    else if (!isSupportedTaskFile(file))
      errors.file = VALIDATION_MESSAGES.fileType;
  }
  if (!hasVisibleText(taskDescription)) {
    errors.taskDescription = VALIDATION_MESSAGES.taskDescription;
  }
  if (
    mode === 'FILE' &&
    requiresAcknowledgement &&
    !acknowledgementText.trim()
  ) {
    errors.acknowledgementText = VALIDATION_MESSAGES.acknowledgementText;
  }
  if (thumbnail && !THUMBNAIL_MIME_TYPES.includes(thumbnail.type)) {
    errors.thumbnail = VALIDATION_MESSAGES.thumbnail;
  }

  const isValid = Object.keys(errors).length === 0;
  const fieldError = (field: TaskField) =>
    touched[field] ? errors[field] : undefined;

  const handleSubmit = async (openQuestions = false) => {
    if (!isValid || isPending) return;
    setSubmittingAction(openQuestions ? 'saveAndQuestions' : 'save');
    try {
      const response = await addTask({
        moduleId,
        taskName: taskName.trim(),
        taskDescription: taskDescription.trim(),
        type: mode === 'CODING' ? 'CODE' : mode,
        orderIdx,
        link: mode === 'LINK' ? link.trim() : undefined,
        file: mode === 'FILE' ? file : undefined,
        ...(mode === 'FILE'
          ? {
              acknowledgementText: requiresAcknowledgement
                ? acknowledgementText.trim()
                : ''
            }
          : {}),
        thumbnail
      });
      showSuccessToast(response?.message || 'Task added successfully!');
      const createdTaskId =
        response?.task?._id || response?.data?._id || response?._id || '';
      reset();
      onClose();

      if (openQuestions && createdTaskId) {
        const params = new URLSearchParams({
          taskId: createdTaskId,
          courseId,
          moduleId,
          taskName: taskName.trim()
        });
        navigate(
          `${commonUrls(organization)}/dashboard/quiz-questions?${params.toString()}`
        );
      }
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to add task'));
    } finally {
      setSubmittingAction(null);
    }
  };

  const isSavingAndAddingQuestions =
    isPending && submittingAction === 'saveAndQuestions';
  const isSavingTask = isPending && submittingAction === 'save';

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title='Add Task'
      centered
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
          placeholder={
            mode === 'QUIZ'
              ? 'e.g. Module 1 Knowledge Check, Final Assessment'
              : 'e.g. Introduction video, Reading material'
          }
          required
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
          onBlur={() => touch('taskName')}
          error={fieldError('taskName')}
          radius='md'
        />
        <Box onBlur={() => touch('taskDescription')}>
          <DescriptionEditor
            label={
              mode === 'QUIZ'
                ? 'Quiz Description & Instructions'
                : 'Description'
            }
            value={taskDescription}
            onChange={setTaskDescription}
            resetKey={draftResetKey}
            required
          />
        </Box>
        {fieldError('taskDescription') && (
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
              },
              {
                value: 'QUIZ',
                label: (
                  <Group gap={6} justify='center'>
                    <IconListCheck size={16} />
                    <span>Quiz</span>
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
            placeholder='Upload a supported file'
            leftSection={<IconUpload size={16} />}
            value={file}
            onChange={setFile}
            onBlur={() => touch('file')}
            error={fieldError('file')}
            required
            clearable
            accept={TASK_FILE_ACCEPT}
            description={TASK_FILE_FORMATS_LABEL}
            radius='md'
          />
        ) : mode === 'QUIZ' ? (
          <Paper
            p='sm'
            radius='md'
            withBorder
            style={{
              backgroundColor: 'rgba(6, 182, 212, 0.05)',
              borderColor: 'rgba(6, 182, 212, 0.25)'
            }}
          >
            <Group gap='xs' wrap='nowrap' align='flex-start'>
              <ThemeIcon size={26} radius='md' variant='light' color='cyan'>
                <IconListCheck size={15} />
              </ThemeIcon>
              <Stack gap={2}>
                <Text
                  size='xs'
                  fw={600}
                  style={{ color: currentThemeConfig.color }}
                >
                  Quiz Assessment Task
                </Text>
                <Text size='xs' c='dimmed'>
                  Enter the quiz title and instructions above. Click{' '}
                  <strong>Save &amp; Add Questions</strong> to immediately
                  compose questions, or <strong>Save Quiz Task</strong> to add
                  questions later.
                </Text>
              </Stack>
            </Group>
          </Paper>
        ) : (
          <Stack gap='xs'>
            <Paper
              p='sm'
              radius='md'
              withBorder
              style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
            >
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

        {mode === 'FILE' && (
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
                onBlur={() => touch('acknowledgementText')}
                error={fieldError('acknowledgementText')}
                radius='md'
              />
            )}
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
          <CommonButton
            variant='default'
            onClick={handleClose}
            disabled={isPending}
          >
            Cancel
          </CommonButton>
          {mode === 'QUIZ' && (
            <CommonButton
              variant='filled'
              color='cyan'
              leftSection={
                isSavingAndAddingQuestions ? (
                  <Loader size='xs' color='white' />
                ) : (
                  <IconListCheck size={16} />
                )
              }
              disabled={!isValid || isPending}
              onClick={() => handleSubmit(true)}
            >
              {isSavingAndAddingQuestions
                ? 'Saving...'
                : 'Save & Add Questions'}
            </CommonButton>
          )}
          <CommonButton
            leftSection={
              isSavingTask ? (
                <Loader size='xs' color='white' />
              ) : (
                <IconCheck size={16} />
              )
            }
            disabled={!isValid || isPending}
            onClick={() => handleSubmit(false)}
          >
            {isSavingTask
              ? mode === 'QUIZ'
                ? 'Saving...'
                : 'Adding...'
              : mode === 'QUIZ'
                ? 'Save Quiz Task'
                : 'Add Task'}
          </CommonButton>
        </Group>
      </Stack>
    </Modal>
  );
};

export default AddTaskModal;
