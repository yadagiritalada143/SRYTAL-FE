import { useState } from 'react';
import {
  ActionIcon,
  Badge,
  Card,
  Center,
  Checkbox,
  Group,
  Loader,
  Modal,
  Paper,
  Radio,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
  ThemeIcon,
  Tooltip
} from '@mantine/core';
import {
  IconCheck,
  IconEye,
  IconEyeOff,
  IconListCheck,
  IconPencil,
  IconPlus,
  IconTrash
} from '@tabler/icons-react';
import { CommonButton } from '@components/common/button/CommonButton';
import { useAppTheme } from '@hooks/use-app-theme';
import {
  QuizAnswerType,
  QuizOption,
  QuizQuestion,
  QUIZ_ANSWER_TYPES,
  QUIZ_QUESTION_STATUSES,
  isMultiAnswerType,
  isTextAnswerType,
  quizAnswerTypeLabel,
  quizQuestionStatusLabel
} from '@interfaces/quiz';
import {
  adjustOptionsForType,
  createQuizOption,
  createQuizQuestion,
  validateQuizQuestion
} from './quiz-helpers';

type EditorMode = 'create' | 'edit';

interface QuestionEditorProps {
  value: QuizQuestion;
  error: string | null;
  isSubmitting: boolean;
  mode: EditorMode;
  onChange: (question: QuizQuestion) => void;
  onSave: () => void;
  onCancel: () => void;
}

const QuestionEditor = ({
  value,
  error,
  isSubmitting,
  mode,
  onChange,
  onSave,
  onCancel
}: QuestionEditorProps) => {
  const { themeConfig } = useAppTheme();
  const isMulti = isMultiAnswerType(value.type);
  const isToggle = value.type === 'TOGGLE';
  const isText = isTextAnswerType(value.type);
  const isEditing = mode === 'edit';
  const correctOptionId =
    value.options.find(option => option.isCorrect)?.id ?? '';

  const patch = (partial: Partial<QuizQuestion>) =>
    onChange({ ...value, ...partial });

  const handleTypeChange = (type: QuizAnswerType) =>
    patch({ type, options: adjustOptionsForType(value.options, type) });

  const updateOption = (id: string, text: string) =>
    patch({
      options: value.options.map(option =>
        option.id === id ? { ...option, text } : option
      )
    });

  const setSingleCorrect = (id: string) =>
    patch({
      options: value.options.map(option => ({
        ...option,
        isCorrect: option.id === id
      }))
    });

  const toggleCorrect = (id: string) =>
    patch({
      options: value.options.map(option =>
        option.id === id ? { ...option, isCorrect: !option.isCorrect } : option
      )
    });

  const addOption = () =>
    patch({ options: [...value.options, createQuizOption()] });

  const removeOption = (id: string) =>
    patch({ options: value.options.filter(option => option.id !== id) });

  const answerControl = (option: QuizOption, index: number) => {
    if (isToggle) {
      return (
        <Switch
          checked={option.isCorrect}
          onChange={() => toggleCorrect(option.id)}
          aria-label={`Mark option ${index + 1} as answer`}
          label='Correct'
          styles={{ label: { whiteSpace: 'nowrap' } }}
        />
      );
    }
    if (isMulti) {
      return (
        <Checkbox
          checked={option.isCorrect}
          onChange={() => toggleCorrect(option.id)}
          aria-label={`Mark option ${index + 1} as answer`}
          label='Correct'
          styles={{ label: { whiteSpace: 'nowrap' } }}
        />
      );
    }
    return <Radio value={option.id} label='Correct' />;
  };

  const optionRow = (option: QuizOption, index: number) => (
    <Group key={option.id} gap='xs' wrap='nowrap' align='center'>
      {answerControl(option, index)}
      <TextInput
        aria-label={`Option ${index + 1}`}
        placeholder={`Option ${index + 1}`}
        value={option.text}
        onChange={event => updateOption(option.id, event.currentTarget.value)}
        style={{ flex: 1 }}
        radius='md'
      />
      <ActionIcon
        variant='subtle'
        color='red'
        aria-label={`Remove option ${index + 1}`}
        onClick={() => removeOption(option.id)}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
  );

  return (
    <Paper
      p='md'
      radius='md'
      withBorder
      style={{
        borderColor: themeConfig.borderColor,
        backgroundColor: themeConfig.cardBackground
      }}
    >
      <Stack gap='sm'>
        <Group gap='xs' align='center'>
          <ThemeIcon size={28} radius='md' variant='light' color='indigo'>
            {isEditing ? <IconPencil size={16} /> : <IconPlus size={16} />}
          </ThemeIcon>
          <Text fw={600} size='sm'>
            {isEditing ? 'Edit question' : 'Add a question'}
          </Text>
        </Group>

        <Textarea
          label='Question'
          placeholder='e.g. What best describes your role?'
          required
          autosize
          minRows={2}
          value={value.question}
          onChange={event => patch({ question: event.currentTarget.value })}
          radius='md'
        />

        <Group grow align='flex-start'>
          <Select
            label='Type'
            data={QUIZ_ANSWER_TYPES}
            value={value.type}
            onChange={type => type && handleTypeChange(type as QuizAnswerType)}
            allowDeselect={false}
            comboboxProps={{ withinPortal: true }}
            radius='md'
          />
          <Select
            label='Visibility'
            data={QUIZ_QUESTION_STATUSES}
            value={value.status}
            onChange={status =>
              status && patch({ status: status as QuizQuestion['status'] })
            }
            allowDeselect={false}
            comboboxProps={{ withinPortal: true }}
            radius='md'
          />
        </Group>

        {isText ? (
          <Paper p='sm' radius='md' withBorder>
            <Text size='xs' c='dimmed'>
              Learners type their answer into a free-text box. No options are
              needed for this type.
            </Text>
          </Paper>
        ) : (
          <Stack gap='xs'>
            <Text size='sm' fw={600}>
              Answer options
            </Text>
            {isMulti || isToggle ? (
              value.options.map((option, index) => optionRow(option, index))
            ) : (
              <Radio.Group
                value={correctOptionId}
                onChange={selected => setSingleCorrect(selected)}
              >
                <Stack gap='xs'>
                  {value.options.map((option, index) =>
                    optionRow(option, index)
                  )}
                </Stack>
              </Radio.Group>
            )}

            <CommonButton
              variant='light'
              size='xs'
              leftSection={<IconPlus size={12} />}
              onClick={addOption}
              style={{ width: 'fit-content' }}
            >
              Add option
            </CommonButton>
          </Stack>
        )}

        {error && (
          <Text size='xs' c='red'>
            {error}
          </Text>
        )}

        <Group justify='flex-end'>
          <CommonButton variant='default' size='xs' onClick={onCancel}>
            Cancel
          </CommonButton>
          <CommonButton
            size='xs'
            leftSection={<IconCheck size={14} />}
            loading={isSubmitting}
            disabled={isSubmitting}
            onClick={onSave}
          >
            {isEditing ? 'Save changes' : 'Add question'}
          </CommonButton>
        </Group>
      </Stack>
    </Paper>
  );
};

interface QuizBuilderProps {
  questions: QuizQuestion[];
  onAddQuestion: (question: QuizQuestion) => Promise<void> | void;
  onUpdateQuestion?: (question: QuizQuestion) => Promise<void> | void;
  onToggleStatus?: (question: QuizQuestion) => Promise<void> | void;
  onDeleteQuestion?: (question: QuizQuestion) => Promise<void> | void;
  isLoading?: boolean;
  isSubmitting?: boolean;
}

const cloneQuestion = (question: QuizQuestion): QuizQuestion => ({
  ...question,
  options: question.options.map(option => ({ ...option }))
});

const QuizBuilder = ({
  questions,
  onAddQuestion,
  onUpdateQuestion,
  onToggleStatus,
  onDeleteQuestion,
  isLoading = false,
  isSubmitting = false
}: QuizBuilderProps) => {
  const { themeConfig } = useAppTheme();
  const [draft, setDraft] = useState<QuizQuestion>(() => createQuizQuestion());
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<QuizQuestion | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const resetDraft = () => {
    setDraft(createQuizQuestion());
    setEditingId(null);
    setError(null);
  };

  const startEditing = (question: QuizQuestion) => {
    setDraft(cloneQuestion(question));
    setEditingId(question.id);
    setError(null);
  };

  const handleSave = async () => {
    const message = validateQuizQuestion(draft);
    if (message) {
      setError(message);
      return;
    }
    try {
      if (editingId) {
        await onUpdateQuestion?.(cloneQuestion(draft));
      } else {
        await onAddQuestion(draft);
      }
      resetDraft();
    } catch {
      // The page surfaces the request error; keep the draft so it can retry.
    }
  };

  const closeDeleteModal = () => {
    if (isDeleting) return;
    setDeleteTarget(null);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await onDeleteQuestion?.(deleteTarget);
      if (editingId === deleteTarget.id) resetDraft();
      setDeleteTarget(null);
    } catch {
    } finally {
      setIsDeleting(false);
    }
  };

  const renderQuestionCard = (question: QuizQuestion) => (
    <Card
      key={question.id}
      withBorder
      radius='md'
      p='sm'
      style={{
        borderColor: themeConfig.borderColor,
        backgroundColor: themeConfig.cardBackground
      }}
    >
      <Stack gap={6} style={{ minWidth: 0 }}>
        <Group gap='xs' justify='space-between' wrap='nowrap' align='start'>
          <Text fw={600} size='sm' lineClamp={2} style={{ minWidth: 0 }}>
            {question.question || 'Untitled question'}
          </Text>
          <Group gap={4} wrap='nowrap'>
            <Tooltip label='Edit' withArrow>
              <ActionIcon
                variant='subtle'
                aria-label='Edit question'
                onClick={() => startEditing(question)}
              >
                <IconPencil size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip
              label={question.status === 'SHOW' ? 'Hide' : 'Show'}
              withArrow
            >
              <ActionIcon
                variant='subtle'
                aria-label={
                  question.status === 'SHOW' ? 'Hide question' : 'Show question'
                }
                onClick={() => onToggleStatus?.(question)}
              >
                {question.status === 'SHOW' ? (
                  <IconEyeOff size={16} />
                ) : (
                  <IconEye size={16} />
                )}
              </ActionIcon>
            </Tooltip>
            <Tooltip label='Delete' withArrow>
              <ActionIcon
                variant='subtle'
                color='red'
                aria-label='Delete question'
                onClick={() => setDeleteTarget(question)}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        <Group gap='xs'>
          <Badge variant='light' color='indigo' radius='sm' size='xs'>
            {quizAnswerTypeLabel(question.type)}
          </Badge>
          <Badge
            variant='light'
            color={question.status === 'SHOW' ? 'teal' : 'gray'}
            radius='sm'
            size='xs'
          >
            {quizQuestionStatusLabel(question.status)}
          </Badge>
        </Group>

        {!isTextAnswerType(question.type) && question.options.length > 0 && (
          <Group gap={6}>
            {question.options.map(option => (
              <Badge
                key={option.id}
                variant='light'
                color='gray'
                radius='sm'
                size='xs'
                styles={{ label: { textTransform: 'none' } }}
              >
                {option.text.trim() || 'Untitled option'}
              </Badge>
            ))}
          </Group>
        )}

        {isTextAnswerType(question.type) && (
          <Text size='xs' c='dimmed'>
            Learners answer in their own words.
          </Text>
        )}
      </Stack>
    </Card>
  );

  return (
    <>
      <Stack gap='lg'>
        <QuestionEditor
          value={draft}
          error={error}
          isSubmitting={isSubmitting}
          mode={editingId ? 'edit' : 'create'}
          onChange={setDraft}
          onSave={handleSave}
          onCancel={resetDraft}
        />

        <Stack gap='sm'>
          <Group gap='xs' align='center'>
            <ThemeIcon size={28} radius='md' variant='light' color='teal'>
              <IconListCheck size={16} />
            </ThemeIcon>
            <Stack gap={0}>
              <Text fw={600} size='sm'>
                Existing questions
              </Text>
              <Text size='xs' c='dimmed'>
                {questions.length} question
                {questions.length === 1 ? '' : 's'}
              </Text>
            </Stack>
          </Group>

          {isLoading ? (
            <Center py='md'>
              <Loader size='sm' />
            </Center>
          ) : questions.length === 0 ? (
            <Paper
              p='md'
              radius='md'
              withBorder
              style={{
                borderColor: themeConfig.borderColor,
                textAlign: 'center'
              }}
            >
              <Text size='xs' c='dimmed'>
                No questions yet. Add your first question to build this quiz.
              </Text>
            </Paper>
          ) : (
            <Stack gap='xs'>{questions.map(renderQuestionCard)}</Stack>
          )}
        </Stack>
      </Stack>

      <Modal
        opened={!!deleteTarget}
        onClose={closeDeleteModal}
        title='Delete question'
        centered
        radius='md'
        transitionProps={{ duration: 0 }}
      >
        <Stack gap='md'>
          <Text size='sm' mt='sm'>
            Delete &ldquo;{deleteTarget?.question || 'this question'}&rdquo;?
            This cannot be undone.
          </Text>
          <Group justify='flex-end'>
            <CommonButton
              variant='default'
              size='xs'
              onClick={closeDeleteModal}
              disabled={isDeleting}
            >
              Keep question
            </CommonButton>
            <CommonButton
              color='red'
              size='xs'
              loading={isDeleting}
              disabled={isDeleting}
              onClick={handleConfirmDelete}
            >
              Yes, delete
            </CommonButton>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

export default QuizBuilder;
