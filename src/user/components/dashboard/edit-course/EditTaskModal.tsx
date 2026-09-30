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
  IconX,
  IconPlus
} from '@tabler/icons-react';
import { CommonButton } from '@components/common/button/CommonButton';
import {
  useUpdateCourseTask,
  useAddCourseTaskQuestion,
  useUpdateCourseTaskQuestion,
  useDeleteCourseTaskQuestion
} from '@hooks/mutations/useUserMutations';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import { useAppTheme } from '@hooks/use-app-theme';
import { Task, CourseStatus, COURSE_STATUSES } from '@interfaces/contentwriter';
import CourseThumbnail from '../content-writer/CourseThumbnail';
import DescriptionEditor from './DescriptionEditor';

interface EditTaskModalProps {
  opened: boolean;
  onClose: () => void;
  task?: Task;
  courseId: string;
}

type QuestionDraft = {
  questionId: string | null;
  question: string;
};

const EditTaskModal = ({
  opened,
  onClose,
  task,
  courseId
}: EditTaskModalProps) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [questionDrafts, setQuestionDrafts] = useState<QuestionDraft[]>([]);
  const [removedQuestionIds, setRemovedQuestionIds] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<CourseStatus>('ACTIVE');

  const { mutateAsync: updateTask, isPending } = useUpdateCourseTask(courseId);
  const { mutateAsync: addQuestion } = useAddCourseTaskQuestion(courseId);
  const { mutateAsync: updateQuestion } = useUpdateCourseTaskQuestion(courseId);
  const { mutateAsync: deleteQuestion } = useDeleteCourseTaskQuestion(courseId);
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
    setQuestionDrafts(
      (task.questions && task.questions.length
        ? task.questions.filter(question => question.status !== 'ARCHIVE')
        : [{ questionId: null, question: task.question || '' }]
      ).map(question => ({
        questionId: question.questionId ?? null,
        question: question.question
      }))
    );
    setRemovedQuestionIds([]);
    setThumbnail(null);
    setStatus((task.status as CourseStatus) || 'ACTIVE');
  } else if (!opened && seededFor !== null) {
    setSeededFor(null);
  }

  const handleQuestionChange = (index: number, value: string) => {
    setQuestionDrafts(prev =>
      prev.map((entry, i) =>
        i === index ? { ...entry, question: value } : entry
      )
    );
  };

  const addQuestionRow = () => {
    setQuestionDrafts(prev => [...prev, { questionId: null, question: '' }]);
  };

  const removeQuestionRow = (index: number) => {
    const entry = questionDrafts[index];
    if (entry?.questionId) {
      setRemovedQuestionIds(prev => [...prev, entry.questionId!]);
    }
    setQuestionDrafts(prev => prev.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    if (isPending) return;
    onClose();
  };

  const handleSubmit = async () => {
    if (!task) return;
    try {
      const drafts = questionDrafts.map(entry => ({
        ...entry,
        question: entry.question.trim()
      }));
      await updateTask({
        id: task._id,
        taskName: taskName.trim(),
        taskDescription: taskDescription.trim(),
        thumbnail,
        status,
        ...(task.isCoding
          ? {
              isCoding: true,
              question: drafts.find(entry => entry.question)?.question
            }
          : {})
      });

      if (task.isCoding) {
        for (const entry of drafts) {
          if (entry.questionId) {
            await updateQuestion({
              taskId: task._id,
              questionId: entry.questionId,
              question: entry.question
            });
          } else if (entry.question) {
            await addQuestion({
              taskId: task._id,
              question: entry.question
            });
          }
        }
        for (const questionId of removedQuestionIds) {
          await deleteQuestion({ taskId: task._id, questionId });
        }
      }

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
        <DescriptionEditor
          label='Description'
          value={taskDescription}
          onChange={setTaskDescription}
          resetKey={seededFor ?? undefined}
        />

        {task?.isCoding && (
          <Stack gap='xs'>
            {questionDrafts.map((entry, index) => (
              <Group
                key={entry.questionId ?? `new-${index}`}
                align='flex-start'
                gap='xs'
                wrap='nowrap'
              >
                <Textarea
                  label={index === 0 ? 'Question' : `Question ${index + 1}`}
                  placeholder='Describe the coding problem to solve'
                  required
                  autosize
                  minRows={3}
                  value={entry.question}
                  onChange={e =>
                    handleQuestionChange(index, e.currentTarget.value)
                  }
                  description={
                    index === 0
                      ? 'The problem statement shown to learners.'
                      : undefined
                  }
                  style={{ flex: 1, minWidth: 0 }}
                />
                {questionDrafts.length > 1 && (
                  <CommonButton
                    variant='subtle'
                    color='red'
                    size='xs'
                    aria-label={`Remove Question ${index + 1}`}
                    leftSection={<IconX size={14} />}
                    onClick={() => removeQuestionRow(index)}
                    style={{ marginTop: 28, flexShrink: 0 }}
                  >
                    Remove
                  </CommonButton>
                )}
              </Group>
            ))}
            <CommonButton
              variant='light'
              size='xs'
              leftSection={<IconPlus size={14} />}
              onClick={addQuestionRow}
              style={{ width: 'fit-content' }}
            >
              Add Question
            </CommonButton>
          </Stack>
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

        {!task?.isCoding && (
          <>
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
          </>
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
