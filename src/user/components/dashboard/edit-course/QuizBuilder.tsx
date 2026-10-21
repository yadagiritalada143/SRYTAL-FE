import { useEffect, useMemo, useState } from 'react';
import {
  ActionIcon,
  Alert,
  Badge,
  Box,
  Card,
  Center,
  Checkbox,
  Divider,
  Group,
  Loader,
  Modal,
  Paper,
  Radio,
  SegmentedControl,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
  ThemeIcon,
  Tooltip
} from '@mantine/core';
import {
  IconAlertCircle,
  IconCheck,
  IconCheckbox,
  IconCircleDot,
  IconCopy,
  IconDeviceFloppy,
  IconEye,
  IconEyeOff,
  IconFileText,
  IconHelpCircle,
  IconListCheck,
  IconPencil,
  IconPlus,
  IconSearch,
  IconSelect,
  IconSwitchHorizontal,
  IconTextCaption,
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
  checkDuplicateQuestion,
  createQuizOption,
  createQuizQuestion,
  duplicateQuizQuestion,
  getQuizQuestionFieldErrors,
  QuizQuestionField,
  TOGGLE_PRESETS,
  validateQuizQuestion
} from './quiz-helpers';
import styles from './QuizBuilder.module.css';

const QUESTION_TYPE_CARDS = [
  {
    type: 'RADIO' as QuizAnswerType,
    label: 'Single choice',
    subtitle: '1 correct answer from choices',
    icon: IconCircleDot,
    color: 'indigo'
  },
  {
    type: 'CHECKBOX' as QuizAnswerType,
    label: 'Multiple choice',
    subtitle: 'Multiple correct answers allowed',
    icon: IconCheckbox,
    color: 'teal'
  },
  {
    type: 'DROPDOWN' as QuizAnswerType,
    label: 'Dropdown',
    subtitle: 'Select from dropdown list',
    icon: IconSelect,
    color: 'blue'
  },
  {
    type: 'TOGGLE' as QuizAnswerType,
    label: 'Toggle',
    subtitle: 'Binary 2-choice decision',
    icon: IconSwitchHorizontal,
    color: 'orange'
  },
  {
    type: 'TEXTAREA' as QuizAnswerType,
    label: 'Short text',
    subtitle: 'Open-ended reflective answer',
    icon: IconFileText,
    color: 'grape'
  }
];

type EditorMode = 'create' | 'edit';

interface QuestionEditorProps {
  value: QuizQuestion;
  existingQuestions: QuizQuestion[];
  error: string | null;
  isSubmitting: boolean;
  mode: EditorMode;
  onChange: (question: QuizQuestion) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const QuestionEditor = ({
  value,
  existingQuestions,
  error,
  isSubmitting,
  mode,
  onChange,
  onSave,
  onCancel,
  onDelete
}: QuestionEditorProps) => {
  const { themeConfig, isDarkTheme } = useAppTheme();

  const isMulti = isMultiAnswerType(value.type);
  const isToggle = value.type === 'TOGGLE';
  const isText = isTextAnswerType(value.type);
  const isDropdown = value.type === 'DROPDOWN';
  const isEditing = mode === 'edit';
  const correctOptionId =
    value.options.find(option => option.isCorrect)?.id ?? '';

  const isDuplicate = checkDuplicateQuestion(
    value.question,
    existingQuestions,
    isEditing ? value.id : null
  );

  const [touched, setTouched] = useState<Record<QuizQuestionField, boolean>>({
    question: false,
    options: false,
    correctAnswer: false
  });

  useEffect(() => {
    setTouched({ question: false, options: false, correctAnswer: false });
  }, [value.id, mode]);

  const touch = (field: QuizQuestionField) =>
    setTouched(prev => ({ ...prev, [field]: true }));

  const fieldErrors = getQuizQuestionFieldErrors(value);
  const fieldError = (field: QuizQuestionField) =>
    touched[field] ? fieldErrors[field] : undefined;
  const isValid =
    !fieldErrors.question && !fieldErrors.options && !fieldErrors.correctAnswer;

  const patch = (partial: Partial<QuizQuestion>) =>
    onChange({ ...value, ...partial });

  const handleTypeChange = (type: QuizAnswerType) => {
    touch('options');
    touch('correctAnswer');
    patch({ type, options: adjustOptionsForType(value.options, type) });
  };

  const updateOption = (id: string, text: string) =>
    patch({
      options: value.options.map(option =>
        option.id === id ? { ...option, text } : option
      )
    });

  const setSingleCorrect = (id: string) => {
    touch('correctAnswer');
    patch({
      options: value.options.map(option => ({
        ...option,
        isCorrect: option.id === id
      }))
    });
  };

  const toggleCorrect = (id: string) => {
    touch('correctAnswer');
    patch({
      options: value.options.map(option =>
        option.id === id ? { ...option, isCorrect: !option.isCorrect } : option
      )
    });
  };

  const addOption = () => {
    touch('options');
    patch({ options: [...value.options, createQuizOption()] });
  };

  const removeOption = (id: string) => {
    touch('options');
    patch({ options: value.options.filter(option => option.id !== id) });
  };

  const applyTogglePreset = (opt1: string, opt2: string) => {
    touch('options');
    touch('correctAnswer');
    patch({
      options: [createQuizOption(opt1, true), createQuizOption(opt2, false)]
    });
  };

  const answerControl = (option: QuizOption, index: number) => {
    const isThisCorrect = option.isCorrect;

    if (isToggle) {
      return (
        <Switch
          checked={option.isCorrect}
          onChange={() => toggleCorrect(option.id)}
          aria-label={`Mark option ${index + 1} as answer`}
          label='Correct'
          styles={{ label: { whiteSpace: 'nowrap', fontWeight: 500 } }}
        />
      );
    }

    if (isMulti) {
      return (
        <Checkbox
          checked={option.isCorrect}
          onChange={() => toggleCorrect(option.id)}
          color='teal'
          size='sm'
          aria-label={`Mark option ${index + 1} as answer`}
          label={
            <Group gap={6} wrap='nowrap' align='center'>
              {isThisCorrect ? (
                <span
                  className={`${styles.animatedTick} ${styles.tickBadgeActive}`}
                >
                  <IconCheck
                    size={14}
                    stroke={3}
                    color='var(--mantine-color-teal-6)'
                  />
                </span>
              ) : (
                <IconCheck size={14} stroke={2} style={{ opacity: 0.3 }} />
              )}
              <Text
                size='xs'
                fw={isThisCorrect ? 700 : 500}
                c={isThisCorrect ? 'teal.7' : 'dimmed'}
              >
                {isThisCorrect ? 'Correct Answer' : 'Correct'}
              </Text>
            </Group>
          }
          styles={{
            root: {
              cursor: 'pointer',
              padding: '4px 10px',
              borderRadius: '8px',
              border: isThisCorrect
                ? '1px solid var(--mantine-color-teal-4)'
                : '1px solid rgba(0, 0, 0, 0.08)',
              backgroundColor: isThisCorrect
                ? 'rgba(16, 185, 129, 0.1)'
                : 'transparent',
              transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)'
            },
            input: {
              cursor: 'pointer',
              borderColor: isThisCorrect
                ? 'var(--mantine-color-teal-6)'
                : undefined,
              transition: 'all 0.2s ease',
              ...(isThisCorrect
                ? { boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.25)' }
                : {})
            }
          }}
        />
      );
    }

    // Single Choice (RADIO) and Dropdown (DROPDOWN)
    return (
      <Radio
        value={option.id}
        color='teal'
        size='sm'
        aria-label='Correct'
        label={
          <Group gap={6} wrap='nowrap' align='center'>
            {isThisCorrect ? (
              <span
                className={`${styles.animatedTick} ${styles.tickBadgeActive}`}
              >
                <IconCheck
                  size={14}
                  stroke={3}
                  color='var(--mantine-color-teal-6)'
                />
              </span>
            ) : (
              <IconCheck size={14} stroke={2} style={{ opacity: 0.3 }} />
            )}
            <Text
              size='xs'
              fw={isThisCorrect ? 700 : 500}
              c={isThisCorrect ? 'teal.7' : 'dimmed'}
            >
              {isThisCorrect
                ? isDropdown
                  ? 'Correct Option'
                  : 'Correct Answer'
                : 'Correct'}
            </Text>
          </Group>
        }
        styles={{
          root: {
            cursor: 'pointer',
            padding: '4px 10px',
            borderRadius: '8px',
            border: isThisCorrect
              ? '1px solid var(--mantine-color-teal-4)'
              : '1px solid rgba(0, 0, 0, 0.08)',
            backgroundColor: isThisCorrect
              ? 'rgba(16, 185, 129, 0.1)'
              : 'transparent',
            transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)'
          },
          radio: {
            cursor: 'pointer',
            borderColor: isThisCorrect
              ? 'var(--mantine-color-teal-6)'
              : undefined,
            transition: 'all 0.2s ease',
            ...(isThisCorrect
              ? { boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.25)' }
              : {})
          }
        }}
      />
    );
  };

  const optionRow = (option: QuizOption, index: number) => {
    const isThisCorrect = option.isCorrect;
    return (
      <Paper
        key={option.id}
        p='xs'
        radius='md'
        withBorder
        className={`${styles.optionRow} ${isThisCorrect ? styles.optionRowCorrect : ''}`}
        style={{
          backgroundColor: isThisCorrect
            ? 'rgba(16, 185, 129, 0.06)'
            : isDarkTheme
              ? 'rgba(255, 255, 255, 0.02)'
              : 'rgba(0, 0, 0, 0.01)',
          borderColor: isThisCorrect
            ? 'var(--mantine-color-teal-5)'
            : themeConfig.borderColor,
          boxShadow: isThisCorrect
            ? '0 2px 8px rgba(16, 185, 129, 0.15)'
            : 'none',
          transition: 'all 0.25s cubic-bezier(0.2, 0, 0, 1)'
        }}
      >
        <Group gap='sm' wrap='nowrap' align='center'>
          <Badge
            size='md'
            variant={isThisCorrect ? 'filled' : 'light'}
            color={isThisCorrect ? 'teal' : 'gray'}
            radius='md'
            style={{
              width: 28,
              height: 28,
              padding: 0,
              textAlign: 'center',
              fontWeight: 700,
              fontSize: '0.82rem',
              flexShrink: 0,
              transition: 'all 0.2s ease'
            }}
          >
            {String.fromCharCode(65 + index)}
          </Badge>

          {answerControl(option, index)}

          <TextInput
            aria-label={`Option ${index + 1}`}
            placeholder={`Option ${index + 1}`}
            value={option.text}
            onChange={event =>
              updateOption(option.id, event.currentTarget.value)
            }
            onBlur={() => touch('options')}
            style={{ flex: 1 }}
            radius='md'
            styles={{
              input: {
                borderColor: isThisCorrect
                  ? 'rgba(16, 185, 129, 0.4)'
                  : undefined
              }
            }}
          />

          <ActionIcon
            variant='subtle'
            color='red'
            aria-label={`Remove option ${index + 1}`}
            onClick={() => removeOption(option.id)}
            disabled={isToggle && value.options.length <= 2}
            radius='md'
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Paper>
    );
  };

  return (
    <Paper
      p='lg'
      radius='md'
      withBorder
      className={`${styles.questionCard} ${isEditing ? styles.questionCardEditing : ''}`}
      style={{
        borderColor: isEditing
          ? 'var(--mantine-color-indigo-5)'
          : themeConfig.borderColor,
        backgroundColor: themeConfig.cardBackground
      }}
    >
      <Stack gap='md'>
        {/* Editor Header */}
        <Group justify='space-between' align='center'>
          <Group gap='xs' align='center'>
            <ThemeIcon
              size={32}
              radius='md'
              variant='light'
              color={isEditing ? 'indigo' : 'teal'}
            >
              {isEditing ? <IconPencil size={18} /> : <IconPlus size={18} />}
            </ThemeIcon>
            <Stack gap={1}>
              <Text fw={700} size='sm' style={{ color: themeConfig.color }}>
                {isEditing ? 'Edit question' : 'Add a question'}
              </Text>
              <Text size='xs' c='dimmed'>
                {isEditing
                  ? 'Update question details, options, and visibility'
                  : 'Compose a scenario-based question and set the answer key'}
              </Text>
            </Stack>
          </Group>

          {isEditing && (
            <Badge variant='light' color='indigo' size='sm'>
              Editing Q#{value.id}
            </Badge>
          )}
        </Group>

        <Textarea
          label='Question'
          placeholder='e.g. In an event-driven Node.js architecture, what happens when the event loop is blocked?'
          required
          autosize
          minRows={2}
          maxRows={6}
          value={value.question}
          onChange={event => patch({ question: event.currentTarget.value })}
          onBlur={() => touch('question')}
          error={fieldError('question')}
          radius='md'
          description='Be specific and descriptive so learners understand the context.'
        />
        <Group justify='flex-end' mt={-8}>
          <Text size='xs' c={value.question.length > 500 ? 'red' : 'dimmed'}>
            {value.question.length} chars
          </Text>
        </Group>

        {isDuplicate && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title='Duplicate Question Notice'
            color='yellow'
            radius='md'
            py='xs'
          >
            A question with this exact text already exists in this quiz. Each
            question must be unique.
          </Alert>
        )}

        <Stack gap='xs'>
          <Group justify='space-between' align='center'>
            <Text size='sm' fw={600} style={{ color: themeConfig.color }}>
              Question Format
            </Text>
            <Badge size='xs' variant='light' color='indigo'>
              {QUESTION_TYPE_CARDS.find(c => c.type === value.type)?.label}
            </Badge>
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing='xs'>
            {QUESTION_TYPE_CARDS.map(item => {
              const isSelected = value.type === item.type;
              const Icon = item.icon;
              return (
                <Paper
                  key={item.type}
                  p='sm'
                  radius='md'
                  withBorder
                  onClick={() => handleTypeChange(item.type)}
                  className={styles.typeCard}
                  style={{
                    borderColor: isSelected
                      ? 'var(--mantine-color-indigo-6)'
                      : themeConfig.borderColor,
                    backgroundColor: isSelected
                      ? 'rgba(99, 102, 241, 0.08)'
                      : themeConfig.cardBackground,
                    boxShadow: isSelected
                      ? '0 0 0 2px rgba(99, 102, 241, 0.25)'
                      : 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Group justify='space-between' align='flex-start' mb={6}>
                    <ThemeIcon
                      size={30}
                      radius='md'
                      variant={isSelected ? 'filled' : 'light'}
                      color={isSelected ? item.color : 'gray'}
                    >
                      <Icon size={16} />
                    </ThemeIcon>
                    {isSelected && (
                      <ThemeIcon
                        size={16}
                        radius='xl'
                        color='indigo'
                        variant='filled'
                      >
                        <IconCheck size={10} stroke={3} />
                      </ThemeIcon>
                    )}
                  </Group>
                  <Text size='xs' fw={700} style={{ color: themeConfig.color }}>
                    {item.label}
                  </Text>
                  <Text size='10px' c='dimmed' lineClamp={2} mt={2}>
                    {item.subtitle}
                  </Text>
                </Paper>
              );
            })}
          </SimpleGrid>

          <Box
            style={{
              position: 'absolute',
              opacity: 0,
              pointerEvents: 'none',
              height: 0,
              overflow: 'hidden'
            }}
          >
            <Select
              label='Type'
              data={QUIZ_ANSWER_TYPES}
              value={value.type}
              onChange={type =>
                type && handleTypeChange(type as QuizAnswerType)
              }
              allowDeselect={false}
              comboboxProps={{ withinPortal: true }}
            />
          </Box>
        </Stack>

        <Stack gap='xs'>
          <Text size='sm' fw={600} style={{ color: themeConfig.color }}>
            Learner Visibility
          </Text>
          <SegmentedControl
            fullWidth
            radius='md'
            size='sm'
            color={value.status === 'SHOW' ? 'teal' : 'orange'}
            value={value.status}
            onChange={status =>
              patch({ status: status as QuizQuestion['status'] })
            }
            data={[
              {
                value: 'SHOW',
                label: (
                  <Group gap={6} justify='center'>
                    <IconEye size={15} />
                    <Text size='xs' fw={600}>
                      Published (Visible to learners)
                    </Text>
                  </Group>
                )
              },
              {
                value: 'HIDE',
                label: (
                  <Group gap={6} justify='center'>
                    <IconEyeOff size={15} />
                    <Text size='xs' fw={600}>
                      Draft (Author only)
                    </Text>
                  </Group>
                )
              }
            ]}
          />

          <Box
            style={{
              position: 'absolute',
              opacity: 0,
              pointerEvents: 'none',
              height: 0,
              overflow: 'hidden'
            }}
          >
            <Select
              label='Visibility'
              data={QUIZ_QUESTION_STATUSES}
              value={value.status}
              onChange={status =>
                status && patch({ status: status as QuizQuestion['status'] })
              }
              allowDeselect={false}
              comboboxProps={{ withinPortal: true }}
            />
          </Box>
        </Stack>

        {/* Toggle Presets */}
        {isToggle && (
          <Group gap='xs' align='center'>
            <Text size='xs' fw={600} c='dimmed'>
              Quick presets:
            </Text>
            {TOGGLE_PRESETS.map(preset => (
              <CommonButton
                key={preset.label}
                variant='light'
                size='compact-xs'
                onClick={() => applyTogglePreset(preset.opt1, preset.opt2)}
                className={styles.presetButton}
              >
                {preset.label}
              </CommonButton>
            ))}
          </Group>
        )}

        {isText ? (
          <Paper
            p='md'
            radius='md'
            withBorder
            style={{
              backgroundColor: 'rgba(99, 102, 241, 0.03)',
              borderColor: themeConfig.borderColor
            }}
          >
            <Group gap='sm'>
              <ThemeIcon size={32} radius='md' variant='light' color='indigo'>
                <IconTextCaption size={18} />
              </ThemeIcon>
              <Stack gap={2}>
                <Text size='xs' fw={600}>
                  Open-ended response format
                </Text>
                <Text size='xs' c='dimmed'>
                  Learners type their answer into a free-text box. No options
                  are needed for this type.
                </Text>
              </Stack>
            </Group>
          </Paper>
        ) : (
          <Stack gap='xs'>
            <Group justify='space-between' align='center'>
              <Text size='sm' fw={600}>
                Answer options
              </Text>
              <Text size='xs' c='dimmed'>
                Select the checkbox/radio next to an option to mark it as the
                correct answer key.
              </Text>
            </Group>

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

            {!isToggle && (
              <CommonButton
                variant='light'
                size='xs'
                leftSection={<IconPlus size={12} />}
                onClick={addOption}
                style={{ width: 'fit-content' }}
              >
                Add option
              </CommonButton>
            )}

            {fieldError('options') && (
              <Text size='xs' c='red' role='alert'>
                {fieldErrors.options}
              </Text>
            )}
            {fieldError('correctAnswer') && (
              <Text size='xs' c='red' role='alert'>
                {fieldErrors.correctAnswer}
              </Text>
            )}
          </Stack>
        )}

        {/* Error Notice */}
        {error && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            color='red'
            radius='md'
            py='xs'
          >
            <Text size='xs' c='red'>
              {error}
            </Text>
          </Alert>
        )}

        {/* Action Buttons */}
        <Divider my={4} />
        <Group
          justify={isEditing && onDelete ? 'space-between' : 'flex-end'}
          gap='xs'
        >
          {isEditing && onDelete && (
            <CommonButton
              variant='light'
              color='red'
              size='xs'
              leftSection={<IconTrash size={14} />}
              onClick={onDelete}
              disabled={isSubmitting}
            >
              Delete question
            </CommonButton>
          )}
          <Group gap='xs'>
            <CommonButton variant='default' size='xs' onClick={onCancel}>
              Cancel
            </CommonButton>
            <CommonButton
              size='xs'
              leftSection={
                isEditing ? (
                  <IconDeviceFloppy size={14} />
                ) : (
                  <IconCheck size={14} />
                )
              }
              loading={isSubmitting}
              disabled={isSubmitting || !isValid}
              onClick={onSave}
            >
              {isEditing ? 'Save changes' : 'Add question'}
            </CommonButton>
          </Group>
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

  const [searchQuery, setSearchQuery] = useState('');

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

  const handleDuplicate = (question: QuizQuestion) => {
    const cloned = duplicateQuizQuestion(question);
    setDraft(cloned);
    setEditingId(null);
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
      // Handled upstream by mutation toast handler
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredQuestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return questions;
    return questions.filter(question =>
      question.question.toLowerCase().includes(q)
    );
  }, [questions, searchQuery]);

  const renderQuestionCard = (question: QuizQuestion, index: number) => {
    const isEditingThis = editingId === question.id;
    return (
      <Card
        key={question.id}
        withBorder
        radius='md'
        p='md'
        className={`${styles.questionCard} ${isEditingThis ? styles.questionCardEditing : ''}`}
        style={{
          borderColor: isEditingThis
            ? 'var(--mantine-color-indigo-5)'
            : themeConfig.borderColor,
          backgroundColor: themeConfig.cardBackground
        }}
      >
        <Stack gap='xs' style={{ minWidth: 0 }}>
          <Group justify='space-between' wrap='nowrap' align='flex-start'>
            <Group gap='xs' align='flex-start' style={{ minWidth: 0, flex: 1 }}>
              <Badge
                size='sm'
                variant='filled'
                color='indigo'
                radius='sm'
                style={{ fontWeight: 700, flexShrink: 0 }}
              >
                Q{index + 1}
              </Badge>
              <Text
                fw={600}
                size='sm'
                lineClamp={2}
                style={{ minWidth: 0, color: themeConfig.color }}
              >
                {question.question || 'Untitled question'}
              </Text>
            </Group>

            <Group gap={4} wrap='nowrap' style={{ flexShrink: 0 }}>
              <Tooltip label='Duplicate question' withArrow>
                <ActionIcon
                  variant='subtle'
                  color='indigo'
                  aria-label='Duplicate question'
                  onClick={() => handleDuplicate(question)}
                >
                  <IconCopy size={16} />
                </ActionIcon>
              </Tooltip>
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
                    question.status === 'SHOW'
                      ? 'Hide question'
                      : 'Show question'
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
            <Group gap={6} wrap='wrap'>
              {question.options.map(option => (
                <Badge
                  key={option.id}
                  variant={option.isCorrect ? 'filled' : 'light'}
                  color={option.isCorrect ? 'teal' : 'gray'}
                  radius='sm'
                  size='xs'
                  leftSection={
                    option.isCorrect ? (
                      <IconCheck size={11} stroke={2.5} />
                    ) : undefined
                  }
                  styles={{ label: { textTransform: 'none' } }}
                  className={
                    option.isCorrect ? styles.correctAnswerBadge : undefined
                  }
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
  };

  return (
    <>
      <Stack gap='lg' className={styles.quizContainer}>
        <QuestionEditor
          value={draft}
          existingQuestions={questions}
          error={error}
          isSubmitting={isSubmitting}
          mode={editingId ? 'edit' : 'create'}
          onChange={setDraft}
          onSave={handleSave}
          onCancel={resetDraft}
          onDelete={
            editingId
              ? () => {
                  const target =
                    questions.find(q => q.id === editingId) || draft;
                  setDeleteTarget(target);
                }
              : undefined
          }
        />

        <Stack gap='sm'>
          <Group justify='space-between' align='center' wrap='wrap'>
            <Group gap='xs' align='center'>
              <ThemeIcon size={28} radius='md' variant='light' color='teal'>
                <IconListCheck size={16} />
              </ThemeIcon>
              <Stack gap={0}>
                <Text fw={600} size='sm' style={{ color: themeConfig.color }}>
                  Existing questions
                </Text>
                <Text size='xs' c='dimmed'>
                  {questions.length} question
                  {questions.length === 1 ? '' : 's'}
                </Text>
              </Stack>
            </Group>

            {questions.length > 0 && (
              <TextInput
                placeholder='Search questions...'
                leftSection={<IconSearch size={14} />}
                value={searchQuery}
                onChange={e => setSearchQuery(e.currentTarget.value)}
                size='xs'
                radius='md'
                w={{ base: '100%', sm: 260 }}
              />
            )}
          </Group>

          {isLoading ? (
            <Center py='xl'>
              <Loader size='sm' />
            </Center>
          ) : questions.length === 0 ? (
            <Paper
              p='xl'
              radius='md'
              withBorder
              style={{
                borderColor: themeConfig.borderColor,
                textAlign: 'center',
                backgroundColor: themeConfig.cardBackground
              }}
            >
              <Stack align='center' gap='xs'>
                <ThemeIcon size={44} radius='xl' variant='light' color='indigo'>
                  <IconHelpCircle size={24} />
                </ThemeIcon>
                <Text size='xs' c='dimmed'>
                  No questions yet. Add your first question to build this quiz.
                </Text>
              </Stack>
            </Paper>
          ) : filteredQuestions.length === 0 ? (
            <Paper
              p='md'
              radius='md'
              withBorder
              style={{
                borderColor: themeConfig.borderColor,
                textAlign: 'center',
                backgroundColor: themeConfig.cardBackground
              }}
            >
              <Text size='xs' c='dimmed'>
                No questions match your search query.
              </Text>
            </Paper>
          ) : (
            <Stack gap='xs'>
              {filteredQuestions.map((q, idx) => renderQuestionCard(q, idx))}
            </Stack>
          )}
        </Stack>
      </Stack>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={!!deleteTarget}
        onClose={closeDeleteModal}
        title={
          <Group gap='xs'>
            <ThemeIcon color='red' variant='light' size={26} radius='sm'>
              <IconTrash size={15} />
            </ThemeIcon>
            <Text fw={700} size='sm'>
              Delete Quiz Question
            </Text>
          </Group>
        }
        centered
        radius='md'
        transitionProps={{ duration: 0 }}
      >
        <Stack gap='md' className='mt-5'>
          <Text size='sm'>
            Are you sure you want to delete this quiz question? This will remove
            the question from the quiz.
          </Text>
          <Paper
            p='sm'
            radius='md'
            withBorder
            style={{
              borderColor: themeConfig.borderColor,
              backgroundColor: 'rgba(239, 68, 68, 0.03)'
            }}
          >
            <Text fw={600} size='sm' lineClamp={3}>
              &ldquo;{deleteTarget?.question || 'Untitled question'}&rdquo;
            </Text>
          </Paper>
          <Group justify='flex-end' gap='xs'>
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
              leftSection={<IconTrash size={14} />}
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
