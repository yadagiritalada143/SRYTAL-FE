import { useMemo, useState } from 'react';
import {
  Alert,
  Badge,
  Box,
  Card,
  Checkbox,
  Group,
  Radio,
  Select,
  Stack,
  Text,
  Textarea,
  ThemeIcon
} from '@mantine/core';
import {
  IconAlertCircle,
  IconCheck,
  IconCircleCheck,
  IconClipboardCheck,
  IconListCheck,
  IconRotateClockwise,
  IconSend
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import { useGetQuiz } from '@hooks/queries/useUserQueries';
import {
  useValidateQuiz,
  useSubmitQuiz
} from '@hooks/mutations/useUserMutations';
import { CommonButton } from '@components/common/button/CommonButton';
import { AssignedTask } from '@interfaces/course-assignment';
import {
  QuizAttemptQuestion,
  QuizReviewQuestion,
  QuizSubmitResult,
  QuizValidationResult
} from '@interfaces/quiz';
import {
  buildQuizAnswers,
  getQuizSubmitFailure,
  SelectedOptions,
  TextAnswers
} from './quiz-attempt';

interface QuizTaskViewerProps {
  task: AssignedTask;
  onPassed?: () => void;
}

const scoreText = (value: number | null | undefined) =>
  typeof value === 'number' ? `${value}%` : '—';

const QuizTaskViewer = ({ task, onPassed }: QuizTaskViewerProps) => {
  const { themeConfig } = useAppTheme();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [textAnswers, setTextAnswers] = useState<TextAnswers>({});
  const [validation, setValidation] = useState<QuizValidationResult | null>(
    null
  );
  const [submitResult, setSubmitResult] = useState<QuizSubmitResult | null>(
    null
  );
  const [errorText, setErrorText] = useState<string | null>(null);

  const quizQuery = useGetQuiz(task._id, !task.isCompleted);
  const { mutateAsync: validateMutation, isPending: isValidating } =
    useValidateQuiz();
  const { mutateAsync: submitMutation, isPending: isSubmitting } =
    useSubmitQuiz();

  const quiz = quizQuery.data;
  const questions = useMemo(() => quiz?.questions ?? [], [quiz]);
  const reviewById = useMemo(() => {
    const map = new Map<string, QuizReviewQuestion>();
    validation?.review?.forEach(entry => map.set(entry.questionId, entry));
    return map;
  }, [validation]);

  const busy = isValidating || isSubmitting || quizQuery.isFetching;
  const failedSubmit = submitResult?.passed === false;

  const setOptionAnswer = (questionId: string, optionIds: string[]) => {
    setSelectedOptions(current => ({ ...current, [questionId]: optionIds }));
  };

  const setTextAnswer = (questionId: string, value: string) => {
    setTextAnswers(current => ({ ...current, [questionId]: value }));
  };

  const clearAttemptState = () => {
    setSelectedOptions({});
    setTextAnswers({});
    setValidation(null);
    setSubmitResult(null);
    setErrorText(null);
  };

  const handleValidate = async () => {
    if (!quiz?.attemptId) return;
    setErrorText(null);
    try {
      const result = await validateMutation({
        taskId: task._id,
        attemptId: quiz.attemptId,
        answers: buildQuizAnswers(questions, selectedOptions, textAnswers)
      });
      setValidation(result);
      setSubmitResult(null);
    } catch (error) {
      const message = getErrorMessage(
        error,
        'Something went wrong while validating your answers.'
      );
      setErrorText(message);
      showErrorToast(message);
    }
  };

  const handleReattempt = async () => {
    clearAttemptState();
    try {
      await quizQuery.refetch();
    } catch (error) {
      const message = getErrorMessage(
        error,
        'Something went wrong while starting a new attempt.'
      );
      setErrorText(message);
      showErrorToast(message);
    }
  };

  const handleSubmit = async () => {
    if (!quiz?.attemptId) return;
    setErrorText(null);
    try {
      const result = await submitMutation({
        taskId: task._id,
        attemptId: quiz.attemptId
      });
      setSubmitResult(result);
      showSuccessToast(
        result.alreadySubmitted
          ? 'This quiz attempt was already submitted.'
          : 'Quiz submitted successfully'
      );
      if (result.passed !== false) onPassed?.();
    } catch (error) {
      const failure = getQuizSubmitFailure(error);
      if (failure) setSubmitResult(failure);
      const message = getErrorMessage(
        error,
        'Something went wrong while submitting your quiz.'
      );
      setErrorText(message);
      showErrorToast(message);
    }
  };

  if (!task.isCompleted && quizQuery.isLoading) {
    return (
      <Card withBorder radius='lg' p='xl'>
        <Text ta='center' c={themeConfig.mutedTextColor}>
          Loading quiz…
        </Text>
      </Card>
    );
  }

  if (!task.isCompleted && quizQuery.isError) {
    return (
      <Card withBorder radius='lg' p='xl'>
        <Stack align='center' gap='sm'>
          <ThemeIcon size={56} radius='xl' variant='light' color='red'>
            <IconAlertCircle size={28} />
          </ThemeIcon>
          <Text fw={600} ta='center'>
            We couldn’t load this quiz
          </Text>
          <Text size='sm' c={themeConfig.mutedTextColor} ta='center' maw={420}>
            {getErrorMessage(quizQuery.error)}
          </Text>
          <CommonButton
            leftSection={<IconRotateClockwise size={16} />}
            loading={quizQuery.isFetching}
            onClick={() => quizQuery.refetch()}
          >
            Try again
          </CommonButton>
        </Stack>
      </Card>
    );
  }

  if (task.isCompleted && !submitResult) {
    return (
      <Card withBorder radius='lg' p='xl'>
        <Stack align='center' gap='sm'>
          <ThemeIcon size={56} radius='xl' variant='light' color='teal'>
            <IconCircleCheck size={28} />
          </ThemeIcon>
          <Text fw={600} ta='center'>
            Quiz completed
          </Text>
          <Text size='sm' c={themeConfig.mutedTextColor} ta='center' maw={420}>
            You’ve already passed this quiz.
          </Text>
        </Stack>
      </Card>
    );
  }

  if (questions.length === 0) {
    return (
      <Card withBorder radius='lg' p='xl'>
        <Text ta='center' c={themeConfig.mutedTextColor}>
          This quiz has no published questions yet. Check back soon.
        </Text>
      </Card>
    );
  }

  const reviewing = Boolean(validation);

  return (
    <Card withBorder radius='lg' p={{ base: 'md', sm: 'lg' }}>
      <Stack gap='lg'>
        <Group gap='xs' align='center'>
          <ThemeIcon size={32} radius='md' variant='light' color='indigo'>
            <IconListCheck size={18} />
          </ThemeIcon>
          <Stack gap={0}>
            <Text fw={700}>{task.taskName || 'Quiz'}</Text>
            <Text size='xs' c={themeConfig.mutedTextColor}>
              {questions.length} question{questions.length === 1 ? '' : 's'}
            </Text>
          </Stack>
        </Group>

        {questions.map((question, index) => (
          <QuizQuestionBlock
            key={question.questionId}
            index={index}
            question={question}
            review={reviewById.get(question.questionId)}
            reviewing={reviewing}
            selected={selectedOptions[question.questionId] ?? []}
            textAnswer={textAnswers[question.questionId] ?? ''}
            themeConfig={themeConfig}
            onSelectOptions={ids => setOptionAnswer(question.questionId, ids)}
            onTextChange={value => setTextAnswer(question.questionId, value)}
          />
        ))}

        {validation && !submitResult && (
          <QuizSummary validation={validation} themeConfig={themeConfig} />
        )}

        {submitResult && (
          <SubmitOutcome result={submitResult} themeConfig={themeConfig} />
        )}

        {errorText && (
          <Alert color='red' icon={<IconAlertCircle size={18} />}>
            <Text size='sm' style={{ whiteSpace: 'pre-wrap' }}>
              {errorText}
            </Text>
          </Alert>
        )}

        <Group justify='flex-end' gap='xs' wrap='wrap'>
          {!reviewing && (
            <CommonButton
              leftSection={<IconClipboardCheck size={16} />}
              loading={isValidating}
              disabled={busy}
              onClick={handleValidate}
            >
              Validate
            </CommonButton>
          )}

          {reviewing && !submitResult?.passed && (
            <CommonButton
              variant='default'
              leftSection={<IconRotateClockwise size={16} />}
              loading={quizQuery.isFetching}
              disabled={busy}
              onClick={handleReattempt}
            >
              Re-attempt
            </CommonButton>
          )}

          {reviewing && !submitResult && (
            <CommonButton
              leftSection={<IconSend size={16} />}
              loading={isSubmitting}
              disabled={busy}
              onClick={handleSubmit}
            >
              Submit
            </CommonButton>
          )}
        </Group>

        {failedSubmit && (
          <Text size='xs' c={themeConfig.mutedTextColor} ta='right'>
            Start a new attempt to try again.
          </Text>
        )}
      </Stack>
    </Card>
  );
};

interface QuizQuestionBlockProps {
  index: number;
  question: QuizAttemptQuestion;
  review?: QuizReviewQuestion;
  reviewing: boolean;
  selected: string[];
  textAnswer: string;
  themeConfig: {
    color: string;
    borderColor: string;
    mutedTextColor: string;
    cardBackground: string;
  };
  onSelectOptions: (ids: string[]) => void;
  onTextChange: (value: string) => void;
}

const QuizQuestionBlock = ({
  index,
  question,
  review,
  reviewing,
  selected,
  textAnswer,
  themeConfig,
  onSelectOptions,
  onTextChange
}: QuizQuestionBlockProps) => {
  const type = String(question.type || '').toUpperCase();
  const isText = type === 'TEXTAREA';
  const isMulti = type === 'CHECKBOX';
  const options = question.options ?? [];
  const selectedIds = review?.selectedOptionIds ?? selected;

  const optionState = (optionId: string) => {
    const isSelected = selectedIds.includes(optionId);
    const isCorrect = Boolean(review?.correctOptionIds?.includes(optionId));
    return { isSelected, isCorrect };
  };

  return (
    <Box
      p='md'
      style={{
        borderRadius: 12,
        border: `1px solid ${themeConfig.borderColor}`,
        backgroundColor: themeConfig.cardBackground
      }}
    >
      <Stack gap='sm'>
        <Group justify='space-between' align='flex-start' wrap='nowrap'>
          <Text fw={600} style={{ minWidth: 0 }}>
            {index + 1}. {question.question}
          </Text>
          {reviewing && !isText && (
            <Badge
              variant='light'
              color={review?.isCorrect ? 'green' : 'red'}
              size='sm'
            >
              {review?.isCorrect ? 'Correct' : 'Incorrect'}
            </Badge>
          )}
        </Group>

        {isText ? (
          reviewing ? (
            <Text size='sm' style={{ whiteSpace: 'pre-wrap' }}>
              {review?.textAnswer || 'No answer provided.'}
            </Text>
          ) : (
            <Textarea
              value={textAnswer}
              onChange={event => onTextChange(event.currentTarget.value)}
              placeholder='Type your answer'
              autosize
              minRows={2}
              radius='md'
            />
          )
        ) : reviewing ? (
          <Stack gap='xs'>
            {options.map(option => {
              const { isSelected, isCorrect } = optionState(option.optionId);
              return (
                <Group
                  key={option.optionId}
                  gap='xs'
                  wrap='nowrap'
                  justify='space-between'
                >
                  <Text size='sm'>{option.value}</Text>
                  {(isCorrect || isSelected) && (
                    <Badge
                      variant='light'
                      color={isCorrect ? 'green' : 'red'}
                      size='sm'
                      radius='sm'
                      style={{ flexShrink: 0 }}
                    >
                      {isCorrect ? 'Correct' : 'Your answer'}
                    </Badge>
                  )}
                </Group>
              );
            })}
          </Stack>
        ) : isMulti ? (
          <Checkbox.Group value={selected} onChange={onSelectOptions}>
            <Stack gap='xs'>
              {options.map(option => (
                <Checkbox
                  key={option.optionId}
                  value={option.optionId}
                  label={option.value}
                />
              ))}
            </Stack>
          </Checkbox.Group>
        ) : type === 'DROPDOWN' ? (
          <Select
            data={options.map(option => ({
              value: option.optionId,
              label: option.value
            }))}
            value={selected[0] ?? null}
            onChange={value => onSelectOptions(value ? [value] : [])}
            placeholder='Select an answer'
            allowDeselect={false}
            comboboxProps={{ withinPortal: true }}
            radius='md'
          />
        ) : (
          <Radio.Group
            value={selected[0] ?? ''}
            onChange={value => onSelectOptions(value ? [value] : [])}
          >
            <Stack gap='xs'>
              {options.map(option => (
                <Radio
                  key={option.optionId}
                  value={option.optionId}
                  label={option.value}
                />
              ))}
            </Stack>
          </Radio.Group>
        )}
      </Stack>
    </Box>
  );
};

interface QuizSummaryProps {
  validation: QuizValidationResult;
  themeConfig: {
    mutedTextColor: string;
    borderColor: string;
    cardBackground: string;
  };
}

const QuizSummary = ({ validation, themeConfig }: QuizSummaryProps) => {
  const unscored = validation.percentage === null;
  return (
    <Group gap='xs' wrap='wrap'>
      <Badge variant='light' color='blue'>
        {validation.correctAnswers} / {validation.totalScoredQuestions} correct
      </Badge>
      {!unscored && (
        <Badge variant='light' color={validation.passed ? 'green' : 'orange'}>
          Score: {scoreText(validation.percentage)}
        </Badge>
      )}
      {unscored && (
        <Text size='xs' c={themeConfig.mutedTextColor}>
          This quiz is not scored.
        </Text>
      )}
    </Group>
  );
};

interface SubmitOutcomeProps {
  result: QuizSubmitResult;
  themeConfig: {
    mutedTextColor: string;
  };
}

const SubmitOutcome = ({ result, themeConfig }: SubmitOutcomeProps) => {
  if (result.passed === false) {
    return (
      <Alert color='red' icon={<IconAlertCircle size={18} />}>
        <Text size='sm'>
          You did not meet the passing percentage
          {typeof result.percentage === 'number'
            ? ` (${result.percentage}%)`
            : ''}
          . Please start a new attempt.
        </Text>
      </Alert>
    );
  }

  return (
    <Alert color='green' icon={<IconCheck size={18} />}>
      <Text size='sm'>
        {result.alreadySubmitted
          ? 'This quiz attempt was already submitted.'
          : 'Quiz submitted successfully.'}
      </Text>
      {typeof result.percentage === 'number' && (
        <Text size='xs' c={themeConfig.mutedTextColor} mt={4}>
          Final score: {result.percentage}%
        </Text>
      )}
    </Alert>
  );
};

export default QuizTaskViewer;
