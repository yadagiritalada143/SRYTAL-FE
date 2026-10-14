import { useState } from 'react';
import {
  ActionIcon,
  Badge,
  Card,
  Checkbox,
  Group,
  Paper,
  Radio,
  SegmentedControl,
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
  IconArrowBackUp,
  IconCheck,
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
  createQuizOption,
  createQuizQuestion,
  validateQuizQuestion
} from './quiz-helpers';

interface QuestionEditorProps {
  value: QuizQuestion;
  error: string | null;
  isEditing: boolean;
  onChange: (question: QuizQuestion) => void;
  onSave: () => void;
  onCancel: () => void;
}

const QuestionEditor = ({
  value,
  error,
  isEditing,
  onChange,
  onSave,
  onCancel
}: QuestionEditorProps) => {
  const { themeConfig } = useAppTheme();
  const isMulti = isMultiAnswerType(value.type);
  const isText = isTextAnswerType(value.type);
  const correctOptionId =
    value.options.find(option => option.isCorrect)?.id ?? '';

  const patch = (partial: Partial<QuizQuestion>) =>
    onChange({ ...value, ...partial });

  const handleTypeChange = (type: QuizAnswerType) => {
    let options = value.options;
    if (!isMultiAnswerType(type) && !isTextAnswerType(type)) {
      const firstCorrect = options.find(option => option.isCorrect)?.id;
      options = options.map(option => ({
        ...option,
        isCorrect: option.id === firstCorrect
      }));
    }
    patch({ type, options });
  };

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
    if (isMulti) {
      const Control = value.type === 'TOGGLE' ? Switch : Checkbox;
      return (
        <Control
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

        <Stack gap={4}>
          <Text size='sm' fw={500}>
            Required
          </Text>
          <SegmentedControl
            aria-label='Required'
            radius='md'
            value={value.required ? 'REQUIRED' : 'OPTIONAL'}
            onChange={next => patch({ required: next === 'REQUIRED' })}
            data={[
              { value: 'REQUIRED', label: 'Required' },
              { value: 'OPTIONAL', label: 'Optional' }
            ]}
          />
        </Stack>

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
            {isMulti ? (
              value.options.map((option, index) => (
                <Group key={option.id} gap='xs' wrap='nowrap' align='center'>
                  {answerControl(option, index)}
                  <TextInput
                    aria-label={`Option ${index + 1}`}
                    placeholder={`Option ${index + 1}`}
                    value={option.text}
                    onChange={event =>
                      updateOption(option.id, event.currentTarget.value)
                    }
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
              ))
            ) : (
              <Radio.Group
                value={correctOptionId}
                onChange={selected => setSingleCorrect(selected)}
              >
                <Stack gap='xs'>
                  {value.options.map((option, index) => (
                    <Group
                      key={option.id}
                      gap='xs'
                      wrap='nowrap'
                      align='center'
                    >
                      {answerControl(option, index)}
                      <TextInput
                        aria-label={`Option ${index + 1}`}
                        placeholder={`Option ${index + 1}`}
                        value={option.text}
                        onChange={event =>
                          updateOption(option.id, event.currentTarget.value)
                        }
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
                  ))}
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
  value: QuizQuestion[];
  onChange: (questions: QuizQuestion[]) => void;
}

const QuizBuilder = ({ value, onChange }: QuizBuilderProps) => {
  const { themeConfig } = useAppTheme();
  const [draft, setDraft] = useState<QuizQuestion>(() => createQuizQuestion());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDeleted, setShowDeleted] = useState(false);

  const activeQuestions = value.filter(question => !question.isDeleted);
  const deletedQuestions = value.filter(question => question.isDeleted);
  const isEditing = editingId !== null;

  const resetDraft = () => {
    setDraft(createQuizQuestion());
    setEditingId(null);
    setError(null);
  };

  const beginEdit = (question: QuizQuestion) => {
    setError(null);
    setEditingId(question.id);
    setDraft({
      ...question,
      options: question.options.map(option => ({ ...option }))
    });
  };

  const handleSave = () => {
    const message = validateQuizQuestion(draft);
    if (message) {
      setError(message);
      return;
    }
    if (isEditing) {
      onChange(
        value.map(question => (question.id === editingId ? draft : question))
      );
    } else {
      onChange([...value, draft]);
    }
    resetDraft();
  };

  const softDelete = (id: string) =>
    onChange(
      value.map(question =>
        question.id === id ? { ...question, isDeleted: true } : question
      )
    );

  const restore = (id: string) =>
    onChange(
      value.map(question =>
        question.id === id ? { ...question, isDeleted: false } : question
      )
    );

  const renderQuestionCard = (question: QuizQuestion, deleted: boolean) => (
    <Card
      key={question.id}
      withBorder
      radius='md'
      p='sm'
      style={{
        borderColor: themeConfig.borderColor,
        backgroundColor: themeConfig.cardBackground,
        opacity: deleted ? 0.6 : 1
      }}
    >
      <Group justify='space-between' align='flex-start' wrap='nowrap'>
        <Stack gap={6} style={{ minWidth: 0, flex: 1 }}>
          <Text fw={600} size='sm' lineClamp={2}>
            {question.question || 'Untitled question'}
          </Text>

          <Group gap='xs'>
            <Badge variant='light' color='indigo' radius='sm' size='xs'>
              {quizAnswerTypeLabel(question.type)}
            </Badge>
            <Badge
              variant='light'
              color={question.required ? 'red' : 'gray'}
              radius='sm'
              size='xs'
            >
              {question.required ? 'Required' : 'Optional'}
            </Badge>
            <Badge
              variant='light'
              color={question.status === 'SHOW' ? 'teal' : 'gray'}
              radius='sm'
              size='xs'
            >
              {quizQuestionStatusLabel(question.status)}
            </Badge>
            {deleted && (
              <Badge variant='light' color='red' radius='sm' size='xs'>
                Deleted
              </Badge>
            )}
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

        <Group gap={4} wrap='nowrap'>
          {deleted ? (
            <Tooltip label='Restore question' withArrow>
              <ActionIcon
                variant='subtle'
                color='teal'
                aria-label={`Restore question: ${question.question}`}
                onClick={() => restore(question.id)}
              >
                <IconArrowBackUp size={16} />
              </ActionIcon>
            </Tooltip>
          ) : (
            <>
              <Tooltip label='Edit question' withArrow>
                <ActionIcon
                  variant='subtle'
                  color='gray'
                  aria-label={`Edit question: ${question.question}`}
                  onClick={() => beginEdit(question)}
                >
                  <IconPencil size={16} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label='Delete question' withArrow>
                <ActionIcon
                  variant='subtle'
                  color='red'
                  aria-label={`Delete question: ${question.question}`}
                  onClick={() => softDelete(question.id)}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Tooltip>
            </>
          )}
        </Group>
      </Group>
    </Card>
  );

  return (
    <Stack gap='lg'>
      <QuestionEditor
        value={draft}
        error={error}
        isEditing={isEditing}
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
              {activeQuestions.length} question
              {activeQuestions.length === 1 ? '' : 's'}
            </Text>
          </Stack>
        </Group>

        {activeQuestions.length === 0 ? (
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
          <Stack gap='xs'>
            {activeQuestions.map(question =>
              renderQuestionCard(question, false)
            )}
          </Stack>
        )}

        {deletedQuestions.length > 0 && (
          <Stack gap='xs'>
            <Group gap='xs'>
              <Switch
                size='xs'
                checked={showDeleted}
                onChange={event => setShowDeleted(event.currentTarget.checked)}
                label='Show deleted questions'
              />
              <Text size='xs' c='dimmed'>
                Deleted questions are kept (soft delete) and can be restored.
              </Text>
            </Group>
            {showDeleted &&
              deletedQuestions.map(question =>
                renderQuestionCard(question, true)
              )}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default QuizBuilder;
