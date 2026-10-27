import { useMemo, useState } from 'react';
import {
  Alert,
  Badge,
  Box,
  Card,
  Checkbox,
  Group,
  Progress,
  Radio,
  Select,
  Stack,
  Text,
  Textarea,
  ThemeIcon
} from '@mantine/core';
import {
  IconAlertCircle,
  IconArrowLeft,
  IconCheck,
  IconChevronRight,
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
import styles from './QuizTaskViewer.module.css';

interface QuizTaskViewerProps {
  task: AssignedTask;
  onPassed?: () => void;
  onNext?: () => void;
  hasNext?: boolean;
  nextTaskName?: string;
  onBackToCourse?: () => void;
}

const scoreText = (value: number | null | undefined) =>
  typeof value === 'number' ? `${value}%` : '—';

const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const QuizTaskViewer = ({
  task,
  onPassed,
  onNext,
  hasNext,
  nextTaskName,
  onBackToCourse
}: QuizTaskViewerProps) => {
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
  const [validationErrorText, setValidationErrorText] = useState<string | null>(
    null
  );
  const [attemptedValidateWithoutAnswers, setAttemptedValidateWithoutAnswers] =
    useState(false);

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

  const isQuestionAnswered = (q: QuizAttemptQuestion) => {
    const type = String(q.type || '').toUpperCase();
    if (type === 'TEXTAREA') {
      return Boolean(textAnswers[q.questionId]?.trim());
    }
    return Boolean(selectedOptions[q.questionId]?.length);
  };

  const answeredCount = useMemo(() => {
    return questions.filter(q => {
      const type = String(q.type || '').toUpperCase();
      if (type === 'TEXTAREA') {
        return Boolean(textAnswers[q.questionId]?.trim());
      }
      return Boolean(selectedOptions[q.questionId]?.length);
    }).length;
  }, [questions, selectedOptions, textAnswers]);

  const progressPercent =
    questions.length > 0
      ? Math.round((answeredCount / questions.length) * 100)
      : 0;

  const setOptionAnswer = (questionId: string, optionIds: string[]) => {
    setSelectedOptions(current => ({ ...current, [questionId]: optionIds }));
    if (validationErrorText) setValidationErrorText(null);
    if (attemptedValidateWithoutAnswers)
      setAttemptedValidateWithoutAnswers(false);
  };

  const setTextAnswer = (questionId: string, value: string) => {
    setTextAnswers(current => ({ ...current, [questionId]: value }));
    if (validationErrorText) setValidationErrorText(null);
    if (attemptedValidateWithoutAnswers)
      setAttemptedValidateWithoutAnswers(false);
  };

  const clearAttemptState = () => {
    setSelectedOptions({});
    setTextAnswers({});
    setValidation(null);
    setSubmitResult(null);
    setErrorText(null);
    setValidationErrorText(null);
    setAttemptedValidateWithoutAnswers(false);
  };

  const handleValidate = async () => {
    if (!quiz?.attemptId) return;
    setErrorText(null);

    const hasAnyAnswer =
      Object.values(selectedOptions).some(
        opts => Array.isArray(opts) && opts.length > 0
      ) ||
      Object.values(textAnswers).some(
        txt => typeof txt === 'string' && txt.trim().length > 0
      );

    if (!hasAnyAnswer) {
      const msg = 'Please answer the quiz questions before validating.';
      setValidationErrorText(msg);
      setAttemptedValidateWithoutAnswers(true);
      showErrorToast('Please select an answer before validating your quiz.');
      return;
    }

    setValidationErrorText(null);
    setAttemptedValidateWithoutAnswers(false);

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
          : 'Quiz submitted successfully.'
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
          <Group gap='xs' mt='sm' wrap='wrap' justify='center'>
            {onBackToCourse && (
              <CommonButton
                variant='default'
                size='sm'
                leftSection={<IconArrowLeft size={16} />}
                onClick={onBackToCourse}
              >
                Back to Course
              </CommonButton>
            )}
            {hasNext && onNext && (
              <CommonButton
                color='teal'
                size='sm'
                rightSection={<IconChevronRight size={16} />}
                onClick={onNext}
              >
                Next Task{nextTaskName ? `: ${nextTaskName}` : ''}
              </CommonButton>
            )}
          </Group>
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
    <Card
      withBorder
      radius='lg'
      p={{ base: 'md', sm: 'lg' }}
      className={styles.quizContainer}
    >
      <Box className={styles.quizScrollArea}>
        <Stack gap='lg'>
          {/* Quiz Header & Live Progress */}
          <Stack gap='xs'>
            <Group justify='space-between' align='center' wrap='wrap'>
              <Group gap='sm' align='center'>
                <ThemeIcon size={34} radius='md' variant='light' color='indigo'>
                  <IconListCheck size={20} />
                </ThemeIcon>
                <Stack gap={1}>
                  <Text fw={700}>{task.taskName || 'Quiz'}</Text>
                  <Text size='xs' c={themeConfig.mutedTextColor}>
                    {questions.length} question
                    {questions.length === 1 ? '' : 's'} total
                  </Text>
                </Stack>
              </Group>

              {!reviewing && (
                <Badge
                  variant='light'
                  color={
                    answeredCount === questions.length
                      ? 'teal'
                      : answeredCount > 0
                        ? 'indigo'
                        : 'gray'
                  }
                  size='sm'
                  radius='sm'
                >
                  {answeredCount} of {questions.length} answered (
                  {progressPercent}
                  %)
                </Badge>
              )}
            </Group>

            {!reviewing && (
              <Progress
                value={progressPercent}
                color={answeredCount === questions.length ? 'teal' : 'indigo'}
                radius='xl'
                size='xs'
                animated={answeredCount > 0 && answeredCount < questions.length}
              />
            )}
          </Stack>

          {/* Question Blocks */}
          {questions.map((question, index) => {
            const isAnswered = isQuestionAnswered(question);
            const isUnansweredHighlight =
              attemptedValidateWithoutAnswers && !isAnswered;

            return (
              <QuizQuestionBlock
                key={question.questionId}
                index={index}
                question={question}
                review={reviewById.get(question.questionId)}
                reviewing={reviewing}
                selected={selectedOptions[question.questionId] ?? []}
                textAnswer={textAnswers[question.questionId] ?? ''}
                themeConfig={themeConfig}
                isAnswered={isAnswered}
                isUnansweredHighlight={isUnansweredHighlight}
                onSelectOptions={ids =>
                  setOptionAnswer(question.questionId, ids)
                }
                onTextChange={value =>
                  setTextAnswer(question.questionId, value)
                }
              />
            );
          })}

          {/* Validation & Feedback Alerts */}
          {validationErrorText && (
            <Alert
              color='red'
              variant='light'
              icon={<IconAlertCircle size={18} />}
              radius='md'
            >
              <Text size='sm'>{validationErrorText}</Text>
            </Alert>
          )}

          {validation && !submitResult && (
            <QuizSummary validation={validation} themeConfig={themeConfig} />
          )}

          {submitResult && (
            <SubmitOutcome
              result={submitResult}
              themeConfig={themeConfig}
              onNext={onNext}
              hasNext={hasNext}
              nextTaskName={nextTaskName}
              onBackToCourse={onBackToCourse}
            />
          )}

          {errorText && (
            <Alert color='red' icon={<IconAlertCircle size={18} />} radius='md'>
              <Text size='sm' style={{ whiteSpace: 'pre-wrap' }}>
                {errorText}
              </Text>
            </Alert>
          )}

          {/* Action Buttons */}
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

            {submitResult && submitResult.passed !== false && (
              <Group gap='xs'>
                {onBackToCourse && (
                  <CommonButton
                    variant='default'
                    size='sm'
                    leftSection={<IconArrowLeft size={16} />}
                    onClick={onBackToCourse}
                  >
                    Back to Course
                  </CommonButton>
                )}
                {hasNext && onNext && (
                  <CommonButton
                    color='teal'
                    size='sm'
                    rightSection={<IconChevronRight size={16} />}
                    onClick={onNext}
                  >
                    Next Task{nextTaskName ? `: ${nextTaskName}` : ''}
                  </CommonButton>
                )}
              </Group>
            )}
          </Group>

          {failedSubmit && (
            <Text size='xs' c={themeConfig.mutedTextColor} ta='right'>
              Start a new attempt to try again.
            </Text>
          )}
        </Stack>
      </Box>
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
  isAnswered: boolean;
  isUnansweredHighlight: boolean;
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
  isAnswered,
  isUnansweredHighlight,
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

  const formatBadgeLabel = () => {
    if (isText) return 'Text response';
    if (isMulti) return 'Multiple choice';
    if (type === 'DROPDOWN') return 'Dropdown';
    return 'Single choice';
  };

  return (
    <Box
      p='md'
      className={`${styles.questionCard} ${
        isUnansweredHighlight ? styles.questionCardUnanswered : ''
      }`}
      style={{
        borderRadius: 14,
        border: `1px solid ${
          isUnansweredHighlight
            ? 'var(--mantine-color-red-5)'
            : themeConfig.borderColor
        }`,
        backgroundColor: themeConfig.cardBackground
      }}
    >
      <Stack gap='sm'>
        <Group justify='space-between' align='flex-start' wrap='nowrap'>
          <Group gap='xs' align='center' style={{ minWidth: 0, flex: 1 }}>
            <Badge size='xs' variant='light' color='indigo' radius='sm'>
              Q{index + 1}
            </Badge>
            <Text fw={600} style={{ minWidth: 0, flex: 1 }}>
              {index + 1}. {question.question}
            </Text>
          </Group>

          <Group gap='xs' align='center' style={{ flexShrink: 0 }}>
            <Badge size='xs' variant='outline' color='gray'>
              {formatBadgeLabel()}
            </Badge>

            {reviewing && !isText && (
              <Badge
                variant='light'
                color={review?.isCorrect ? 'green' : 'red'}
                size='sm'
              >
                {review?.isCorrect ? 'Correct' : 'Incorrect'}
              </Badge>
            )}

            {!reviewing && (
              <Badge
                size='xs'
                variant='light'
                color={
                  isUnansweredHighlight ? 'red' : isAnswered ? 'teal' : 'gray'
                }
              >
                {isUnansweredHighlight
                  ? 'Answer required'
                  : isAnswered
                    ? 'Answered'
                    : 'Not answered'}
              </Badge>
            )}
          </Group>
        </Group>

        {isText ? (
          reviewing ? (
            <Text size='sm' style={{ whiteSpace: 'pre-wrap' }}>
              {review?.textAnswer || 'No answer provided.'}
            </Text>
          ) : (
            <Stack gap={4}>
              <Textarea
                value={textAnswer}
                onChange={event => onTextChange(event.currentTarget.value)}
                placeholder='Type your answer'
                autosize
                minRows={3}
                radius='md'
              />
              <Group justify='flex-end'>
                <Text size='xs' c={themeConfig.mutedTextColor}>
                  {textAnswer.trim().length} characters
                </Text>
              </Group>
            </Stack>
          )
        ) : reviewing ? (
          <Stack gap='xs'>
            {options.map((option, optIdx) => {
              const { isSelected, isCorrect } = optionState(option.optionId);
              const letter = optionLetters[optIdx % optionLetters.length];
              return (
                <Box
                  key={option.optionId}
                  p='xs'
                  style={{
                    borderRadius: 8,
                    border: `1px solid ${
                      isCorrect
                        ? 'var(--mantine-color-teal-5)'
                        : isSelected
                          ? 'var(--mantine-color-red-4)'
                          : themeConfig.borderColor
                    }`,
                    backgroundColor: isCorrect
                      ? 'rgba(16, 185, 129, 0.08)'
                      : isSelected
                        ? 'rgba(239, 68, 68, 0.06)'
                        : 'transparent'
                  }}
                >
                  <Group gap='xs' wrap='nowrap' justify='space-between'>
                    <Group gap='xs' wrap='nowrap'>
                      <Badge size='xs' variant='light' color='gray'>
                        {letter}
                      </Badge>
                      <Text size='sm'>{option.value}</Text>
                    </Group>
                    <Group gap='xs' wrap='nowrap'>
                      {isCorrect && (
                        <span className={styles.animatedTick}>
                          <IconCheck size={14} stroke={3} />
                        </span>
                      )}
                      {(isCorrect || isSelected) && (
                        <Badge
                          variant='light'
                          color={isCorrect ? 'green' : 'red'}
                          size='sm'
                          radius='sm'
                          style={{ flexShrink: 0 }}
                        >
                          {isCorrect && isSelected
                            ? 'Correct & Selected'
                            : isCorrect
                              ? 'Correct'
                              : 'Your answer'}
                        </Badge>
                      )}
                    </Group>
                  </Group>
                </Box>
              );
            })}
          </Stack>
        ) : isMulti ? (
          <Checkbox.Group value={selected} onChange={onSelectOptions}>
            <Stack gap='xs'>
              {options.map((option, optIdx) => {
                const isSelected = selected.includes(option.optionId);
                const letter = optionLetters[optIdx % optionLetters.length];
                const handleToggle = () => {
                  const next = isSelected
                    ? selected.filter(id => id !== option.optionId)
                    : [...selected, option.optionId];
                  onSelectOptions(next);
                };

                return (
                  <Box
                    key={option.optionId}
                    className={`${styles.optionCard} ${
                      isSelected ? styles.optionCardSelected : ''
                    }`}
                    onClick={handleToggle}
                    role='button'
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleToggle();
                      }
                    }}
                  >
                    <Group
                      justify='space-between'
                      align='center'
                      w='100%'
                      wrap='nowrap'
                    >
                      <Group
                        gap='sm'
                        align='center'
                        wrap='nowrap'
                        style={{ flex: 1 }}
                      >
                        <Badge
                          size='sm'
                          variant={isSelected ? 'filled' : 'light'}
                          color={isSelected ? 'teal' : 'gray'}
                          radius='sm'
                          style={{ minWidth: 26, textAlign: 'center' }}
                        >
                          {letter}
                        </Badge>
                        <Checkbox
                          value={option.optionId}
                          label={option.value}
                          checked={isSelected}
                          onChange={handleToggle}
                          styles={{
                            root: { cursor: 'pointer', flex: 1 },
                            label: {
                              cursor: 'pointer',
                              fontWeight: isSelected ? 600 : 400
                            }
                          }}
                        />
                      </Group>
                      {isSelected ? (
                        <span className={styles.animatedTick}>
                          <IconCheck size={14} stroke={3} />
                        </span>
                      ) : (
                        <span className={styles.tickCircleIdle} />
                      )}
                    </Group>
                  </Box>
                );
              })}
            </Stack>
          </Checkbox.Group>
        ) : type === 'DROPDOWN' ? (
          <Stack gap='xs'>
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
              rightSection={
                selected.length > 0 ? (
                  <span
                    className={styles.animatedTick}
                    style={{ width: 20, height: 20 }}
                  >
                    <IconCheck size={12} stroke={3} />
                  </span>
                ) : undefined
              }
            />
            {selected.length > 0 && (
              <Group gap='xs' align='center'>
                <Text size='xs' c={themeConfig.mutedTextColor}>
                  Selected:
                </Text>
                <Badge
                  size='sm'
                  variant='light'
                  color='teal'
                  radius='sm'
                  leftSection={<IconCheck size={12} />}
                >
                  {options.find(o => o.optionId === selected[0])?.value}
                </Badge>
              </Group>
            )}
          </Stack>
        ) : (
          <Radio.Group
            value={selected[0] ?? ''}
            onChange={value => onSelectOptions(value ? [value] : [])}
          >
            <Stack gap='xs'>
              {options.map((option, optIdx) => {
                const isSelected = selected.includes(option.optionId);
                const letter = optionLetters[optIdx % optionLetters.length];
                const handleSelect = () => onSelectOptions([option.optionId]);

                return (
                  <Box
                    key={option.optionId}
                    className={`${styles.optionCard} ${
                      isSelected ? styles.optionCardSelected : ''
                    }`}
                    onClick={handleSelect}
                    role='button'
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelect();
                      }
                    }}
                  >
                    <Group
                      justify='space-between'
                      align='center'
                      w='100%'
                      wrap='nowrap'
                    >
                      <Group
                        gap='sm'
                        align='center'
                        wrap='nowrap'
                        style={{ flex: 1 }}
                      >
                        <Badge
                          size='sm'
                          variant={isSelected ? 'filled' : 'light'}
                          color={isSelected ? 'teal' : 'gray'}
                          radius='sm'
                          style={{ minWidth: 26, textAlign: 'center' }}
                        >
                          {letter}
                        </Badge>
                        <Radio
                          value={option.optionId}
                          label={option.value}
                          checked={isSelected}
                          onChange={handleSelect}
                          styles={{
                            root: { cursor: 'pointer', flex: 1 },
                            label: {
                              cursor: 'pointer',
                              fontWeight: isSelected ? 600 : 400
                            }
                          }}
                        />
                      </Group>
                      {isSelected ? (
                        <span className={styles.animatedTick}>
                          <IconCheck size={14} stroke={3} />
                        </span>
                      ) : (
                        <span className={styles.tickCircleIdle} />
                      )}
                    </Group>
                  </Box>
                );
              })}
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
  onNext?: () => void;
  hasNext?: boolean;
  nextTaskName?: string;
  onBackToCourse?: () => void;
}

const SubmitOutcome = ({
  result,
  themeConfig,
  onNext,
  hasNext,
  nextTaskName,
  onBackToCourse
}: SubmitOutcomeProps) => {
  if (result.passed === false) {
    return (
      <Alert color='red' icon={<IconAlertCircle size={18} />} radius='md'>
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
    <Card className={styles.resultSuccessCard} radius='md' p='md'>
      <Stack gap='sm'>
        <Group justify='space-between' align='center' wrap='wrap'>
          <Group gap='sm' align='center'>
            <ThemeIcon size={36} radius='xl' color='teal' variant='filled'>
              <IconCheck size={20} stroke={3} />
            </ThemeIcon>
            <Stack gap={2}>
              <Text fw={700} c='teal'>
                {result.alreadySubmitted
                  ? 'This quiz attempt was already submitted.'
                  : 'Quiz submitted successfully.'}
              </Text>
              {typeof result.percentage === 'number' && (
                <Text size='xs' c={themeConfig.mutedTextColor}>
                  Final score: {result.percentage}%
                </Text>
              )}
            </Stack>
          </Group>

          <Group gap='xs' wrap='wrap'>
            {onBackToCourse && (
              <CommonButton
                variant='default'
                size='xs'
                leftSection={<IconArrowLeft size={14} />}
                onClick={onBackToCourse}
              >
                Course Content
              </CommonButton>
            )}
            {hasNext && onNext && (
              <CommonButton
                color='teal'
                size='xs'
                rightSection={<IconChevronRight size={14} />}
                onClick={onNext}
              >
                Next Task{nextTaskName ? `: ${nextTaskName}` : ''}
              </CommonButton>
            )}
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};

export default QuizTaskViewer;
