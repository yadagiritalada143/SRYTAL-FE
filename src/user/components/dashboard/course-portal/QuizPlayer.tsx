import { useMemo, useState } from 'react';
import {
  Badge,
  Box,
  Card,
  Center,
  Checkbox,
  Divider,
  Group,
  Loader,
  Paper,
  Progress,
  Radio,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  ThemeIcon
} from '@mantine/core';
import {
  IconAlertCircle,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconHelpCircle,
  IconRefresh,
  IconSparkles,
  IconTrophy,
  IconX
} from '@tabler/icons-react';
import { CommonButton } from '@components/common/button/CommonButton';
import { useAppTheme } from '@hooks/use-app-theme';
import { useGetAllQuizQuestions } from '@hooks/queries/useUserQueries';
import { useUpdateMyTaskProgress } from '@hooks/mutations/useUserMutations';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import { AssignedTask } from '@interfaces/course-assignment';
import {
  isMultiAnswerType,
  isTextAnswerType,
  fromQuizQuestionApi
} from '../edit-course/quiz-helpers';

interface QuizPlayerProps {
  task: AssignedTask;
  courseAssignmentId?: string;
  onFinished?: () => void;
}

const QuizPlayer = ({
  task,
  courseAssignmentId,
  onFinished
}: QuizPlayerProps) => {
  const { themeConfig } = useAppTheme();
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const { mutateAsync: updateProgress, isPending: isUpdatingProgress } =
    useUpdateMyTaskProgress();

  const {
    data: apiQuestions = [],
    isLoading,
    isError
  } = useGetAllQuizQuestions(task._id);

  const questions = useMemo(() => {
    const list = Array.isArray(apiQuestions)
      ? apiQuestions
      : Array.isArray((apiQuestions as any)?.data)
        ? (apiQuestions as any).data
        : [];
    return list
      .filter((q: any) => (q.status || 'SHOW').toUpperCase() === 'SHOW')
      .map(fromQuizQuestionApi);
  }, [apiQuestions]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);

  if (isLoading) {
    return (
      <Center p='xl' style={{ minHeight: 320 }}>
        <Stack align='center' gap='sm'>
          <Loader size='md' color='indigo' />
          <Text size='sm' c='dimmed'>
            Loading quiz questions...
          </Text>
        </Stack>
      </Center>
    );
  }

  if (isError) {
    return (
      <Center p='xl' style={{ minHeight: 280 }}>
        <Stack align='center' gap='xs' maw={400} ta='center'>
          <ThemeIcon size={48} radius='xl' variant='light' color='red'>
            <IconAlertCircle size={26} />
          </ThemeIcon>
          <Text fw={600} size='md'>
            Failed to load quiz
          </Text>
          <Text size='sm' c='dimmed'>
            We encountered an issue loading the questions for this quiz task.
            Please try refreshing.
          </Text>
        </Stack>
      </Center>
    );
  }

  if (questions.length === 0) {
    return (
      <Center p='xl' style={{ minHeight: 280 }}>
        <Stack align='center' gap='xs' maw={420} ta='center'>
          <ThemeIcon size={48} radius='xl' variant='light' color='indigo'>
            <IconHelpCircle size={26} />
          </ThemeIcon>
          <Text fw={600} size='md'>
            Quiz in progress
          </Text>
          <Text size='sm' c='dimmed'>
            There are no published questions in this quiz yet. Please check back
            later.
          </Text>
        </Stack>
      </Center>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const isFirst = currentIndex === 0;

  const currentAnswer =
    answers[currentQuestion.id] ??
    (isMultiAnswerType(currentQuestion.type) ? [] : '');

  const handleSelectOption = (optionId: string) => {
    if (isMultiAnswerType(currentQuestion.type)) {
      const selected = Array.isArray(currentAnswer) ? currentAnswer : [];
      const updated = selected.includes(optionId)
        ? selected.filter(id => id !== optionId)
        : [...selected, optionId];
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: updated }));
    } else {
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
    }
  };

  const handleTextChange = (text: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: text }));
  };

  const calculateResults = () => {
    let score = 0;
    const details = questions.map(q => {
      const ans = answers[q.id];
      let isCorrect = false;

      if (isTextAnswerType(q.type)) {
        isCorrect = typeof ans === 'string' && ans.trim().length > 0;
      } else if (isMultiAnswerType(q.type)) {
        const correctIds = q.options.filter(o => o.isCorrect).map(o => o.id);
        const userIds = Array.isArray(ans) ? ans : [];
        isCorrect =
          correctIds.length === userIds.length &&
          correctIds.every(id => userIds.includes(id));
      } else {
        const correctOption = q.options.find(o => o.isCorrect);
        isCorrect = Boolean(correctOption && ans === correctOption.id);
      }

      if (isCorrect) score++;

      return {
        question: q,
        userAnswer: ans,
        isCorrect
      };
    });

    const percent = Math.round((score / questions.length) * 100);
    const isPassing = percent >= 70;

    return { score, percent, isPassing, details };
  };

  const handleCompleteTask = async () => {
    if (!courseAssignmentId) {
      onFinished?.();
      return;
    }
    try {
      await updateProgress({
        courseAssignmentId,
        taskId: task._id,
        isCompleted: true
      });
      showSuccessToast('Quiz passed! Task marked as completed.');
      onFinished?.();
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to update progress'));
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
    setShowReview(false);
  };

  if (isSubmitted) {
    const { score, percent, isPassing, details } = calculateResults();

    return (
      <Card
        p='xl'
        radius='lg'
        withBorder
        style={{
          borderColor: themeConfig.borderColor,
          backgroundColor: themeConfig.cardBackground
        }}
      >
        <Stack gap='lg' align='center'>
          <ThemeIcon
            size={72}
            radius='xl'
            variant='light'
            color={isPassing ? 'teal' : 'orange'}
          >
            {isPassing ? <IconTrophy size={38} /> : <IconRefresh size={38} />}
          </ThemeIcon>

          <Stack align='center' gap={2} ta='center'>
            <Text fw={800} size='xl' style={{ color: themeConfig.color }}>
              {isPassing ? 'Congratulations! You Passed!' : 'Keep Practicing!'}
            </Text>
            <Text size='sm' c='dimmed' maw={440}>
              {isPassing
                ? 'Great job demonstrating your knowledge. Your quiz response has been recorded.'
                : 'You scored below the 70% threshold. Review the questions and retake the quiz to improve.'}
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md' w='100%' maw={420}>
            <Paper
              p='md'
              radius='md'
              withBorder
              ta='center'
              style={{
                borderColor: themeConfig.borderColor,
                backgroundColor: 'rgba(99, 102, 241, 0.03)'
              }}
            >
              <Text size='xs' c='dimmed' fw={600} tt='uppercase'>
                Score
              </Text>
              <Text size='xl' fw={800} c={isPassing ? 'teal' : 'orange'}>
                {score} / {questions.length}
              </Text>
            </Paper>

            <Paper
              p='md'
              radius='md'
              withBorder
              ta='center'
              style={{
                borderColor: themeConfig.borderColor,
                backgroundColor: 'rgba(99, 102, 241, 0.03)'
              }}
            >
              <Text size='xs' c='dimmed' fw={600} tt='uppercase'>
                Accuracy
              </Text>
              <Text size='xl' fw={800} c={isPassing ? 'teal' : 'orange'}>
                {percent}%
              </Text>
            </Paper>
          </SimpleGrid>

          <Group justify='center' gap='sm' wrap='wrap'>
            <CommonButton
              variant='default'
              size='sm'
              onClick={() => setShowReview(prev => !prev)}
            >
              {showReview ? 'Hide question review' : 'Review questions'}
            </CommonButton>

            <CommonButton
              variant='light'
              size='sm'
              leftSection={<IconRefresh size={14} />}
              onClick={handleRetake}
            >
              Retake Quiz
            </CommonButton>

            {isPassing && !task.isCompleted && (
              <CommonButton
                color='teal'
                size='sm'
                leftSection={<IconCheck size={14} />}
                loading={isUpdatingProgress}
                onClick={handleCompleteTask}
              >
                Complete Task
              </CommonButton>
            )}
          </Group>

          {showReview && (
            <Stack gap='sm' w='100%' mt='md'>
              <Divider
                label='Question-by-Question Review'
                labelPosition='center'
              />
              {details.map((item, idx) => {
                const q = item.question;
                return (
                  <Paper
                    key={q.id}
                    p='md'
                    radius='md'
                    withBorder
                    style={{
                      borderColor: item.isCorrect
                        ? 'rgba(16, 185, 129, 0.4)'
                        : 'rgba(239, 68, 68, 0.4)',
                      backgroundColor: item.isCorrect
                        ? 'rgba(16, 185, 129, 0.03)'
                        : 'rgba(239, 68, 68, 0.03)'
                    }}
                  >
                    <Stack gap='xs'>
                      <Group justify='space-between' align='flex-start'>
                        <Group gap='xs'>
                          <Badge
                            size='sm'
                            color={item.isCorrect ? 'teal' : 'red'}
                            variant='filled'
                          >
                            Q{idx + 1}
                          </Badge>
                          <Text fw={600} size='sm'>
                            {q.question}
                          </Text>
                        </Group>
                        <Badge
                          size='sm'
                          variant='light'
                          color={item.isCorrect ? 'teal' : 'red'}
                          leftSection={
                            item.isCorrect ? (
                              <IconCheck size={12} />
                            ) : (
                              <IconX size={12} />
                            )
                          }
                        >
                          {item.isCorrect ? 'Correct' : 'Incorrect'}
                        </Badge>
                      </Group>

                      {!isTextAnswerType(q.type) && (
                        <Stack gap={4} pl='sm'>
                          {q.options.map(opt => {
                            const isUserSelected = Array.isArray(
                              item.userAnswer
                            )
                              ? item.userAnswer.includes(opt.id)
                              : item.userAnswer === opt.id;
                            const isCorrectOpt = opt.isCorrect;

                            return (
                              <Group
                                key={opt.id}
                                gap='xs'
                                wrap='nowrap'
                                align='center'
                              >
                                {isCorrectOpt ? (
                                  <ThemeIcon
                                    size={18}
                                    radius='xl'
                                    color='teal'
                                    variant='filled'
                                  >
                                    <IconCheck size={12} />
                                  </ThemeIcon>
                                ) : isUserSelected ? (
                                  <ThemeIcon
                                    size={18}
                                    radius='xl'
                                    color='red'
                                    variant='filled'
                                  >
                                    <IconX size={12} />
                                  </ThemeIcon>
                                ) : (
                                  <Box w={18} />
                                )}
                                <Text
                                  size='xs'
                                  fw={
                                    isCorrectOpt || isUserSelected ? 600 : 400
                                  }
                                  c={
                                    isCorrectOpt
                                      ? 'teal'
                                      : isUserSelected
                                        ? 'red'
                                        : 'dimmed'
                                  }
                                >
                                  {opt.text}
                                  {isUserSelected && ' (Your answer)'}
                                  {isCorrectOpt &&
                                    !isUserSelected &&
                                    ' (Correct answer)'}
                                </Text>
                              </Group>
                            );
                          })}
                        </Stack>
                      )}

                      {isTextAnswerType(q.type) && (
                        <Text size='xs' c='dimmed' pl='sm'>
                          Your response:{' '}
                          <Text span fw={600} c={themeConfig.color}>
                            {String(item.userAnswer || 'No response provided')}
                          </Text>
                        </Text>
                      )}
                    </Stack>
                  </Paper>
                );
              })}
            </Stack>
          )}
        </Stack>
      </Card>
    );
  }

  const progressPercent = Math.round(
    ((currentIndex + 1) / questions.length) * 100
  );
  const answeredCount = Object.keys(answers).filter(k => {
    const val = answers[k];
    return Array.isArray(val) ? val.length > 0 : Boolean(String(val).trim());
  }).length;

  return (
    <Card
      p='lg'
      radius='lg'
      withBorder
      style={{
        borderColor: themeConfig.borderColor,
        backgroundColor: themeConfig.cardBackground
      }}
    >
      <Stack gap='md'>
        {/* Header Strip */}
        <Stack gap={6}>
          <Group justify='space-between' align='center' wrap='wrap'>
            <Group gap='xs'>
              <ThemeIcon size={28} radius='md' variant='light' color='indigo'>
                <IconSparkles size={16} />
              </ThemeIcon>
              <Text fw={700} size='sm' style={{ color: themeConfig.color }}>
                {task.taskName}
              </Text>
            </Group>

            <Group gap='xs'>
              <Badge variant='light' color='indigo' size='sm'>
                Question {currentIndex + 1} of {questions.length}
              </Badge>
              <Badge variant='outline' color='gray' size='sm'>
                {answeredCount}/{questions.length} answered
              </Badge>
            </Group>
          </Group>

          <Progress
            value={progressPercent}
            size='sm'
            radius='xl'
            color='indigo'
          />
        </Stack>

        <Group gap={6} wrap='wrap'>
          {questions.map((q, idx) => {
            const isAnswered = Boolean(
              Array.isArray(answers[q.id])
                ? (answers[q.id] as string[]).length > 0
                : String(answers[q.id] || '').trim()
            );
            const isCurrent = idx === currentIndex;

            return (
              <Badge
                key={q.id}
                size='xs'
                variant={
                  isCurrent ? 'filled' : isAnswered ? 'light' : 'outline'
                }
                color={isCurrent ? 'indigo' : isAnswered ? 'teal' : 'gray'}
                style={{ cursor: 'pointer' }}
                onClick={() => setCurrentIndex(idx)}
              >
                {idx + 1}
              </Badge>
            );
          })}
        </Group>

        <Paper
          p='lg'
          radius='md'
          withBorder
          style={{
            borderColor: themeConfig.borderColor,
            backgroundColor: 'rgba(99, 102, 241, 0.02)'
          }}
        >
          <Stack gap='md'>
            <Text
              fw={700}
              size='md'
              style={{ color: themeConfig.color, lineHeight: 1.4 }}
            >
              {currentQuestion.question}
            </Text>

            {isTextAnswerType(currentQuestion.type) ? (
              <Textarea
                placeholder='Type your answer here...'
                value={(currentAnswer as string) || ''}
                onChange={e => handleTextChange(e.currentTarget.value)}
                minRows={4}
                radius='md'
              />
            ) : currentQuestion.type === 'DROPDOWN' ? (
              <Select
                placeholder='Select an answer from dropdown...'
                data={currentQuestion.options.map(o => ({
                  value: o.id,
                  label: o.text
                }))}
                value={(currentAnswer as string) || null}
                onChange={val => val && handleSelectOption(val)}
                radius='md'
              />
            ) : currentQuestion.type === 'TOGGLE' ? (
              <Group grow>
                {currentQuestion.options.map(opt => {
                  const isSelected = currentAnswer === opt.id;
                  return (
                    <Paper
                      key={opt.id}
                      p='md'
                      radius='md'
                      withBorder
                      onClick={() => handleSelectOption(opt.id)}
                      style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        borderColor: isSelected
                          ? 'var(--mantine-color-indigo-6)'
                          : themeConfig.borderColor,
                        backgroundColor: isSelected
                          ? 'rgba(99, 102, 241, 0.12)'
                          : 'transparent',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Text fw={isSelected ? 700 : 500} size='sm'>
                        {opt.text}
                      </Text>
                    </Paper>
                  );
                })}
              </Group>
            ) : isMultiAnswerType(currentQuestion.type) ? (
              <Stack gap='xs'>
                {currentQuestion.options.map(opt => {
                  const isSelected =
                    Array.isArray(currentAnswer) &&
                    currentAnswer.includes(opt.id);
                  return (
                    <Paper
                      key={opt.id}
                      p='sm'
                      radius='md'
                      withBorder
                      onClick={() => handleSelectOption(opt.id)}
                      style={{
                        cursor: 'pointer',
                        borderColor: isSelected
                          ? 'var(--mantine-color-indigo-6)'
                          : themeConfig.borderColor,
                        backgroundColor: isSelected
                          ? 'rgba(99, 102, 241, 0.08)'
                          : 'transparent',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Checkbox
                        checked={isSelected}
                        label={opt.text}
                        readOnly
                        styles={{
                          label: { cursor: 'pointer', fontWeight: 500 }
                        }}
                      />
                    </Paper>
                  );
                })}
              </Stack>
            ) : (
              <Radio.Group
                value={(currentAnswer as string) || ''}
                onChange={val => handleSelectOption(val)}
              >
                <Stack gap='xs'>
                  {currentQuestion.options.map(opt => {
                    const isSelected = currentAnswer === opt.id;
                    return (
                      <Paper
                        key={opt.id}
                        p='sm'
                        radius='md'
                        withBorder
                        onClick={() => handleSelectOption(opt.id)}
                        style={{
                          cursor: 'pointer',
                          borderColor: isSelected
                            ? 'var(--mantine-color-indigo-6)'
                            : themeConfig.borderColor,
                          backgroundColor: isSelected
                            ? 'rgba(99, 102, 241, 0.08)'
                            : 'transparent',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Radio
                          value={opt.id}
                          label={opt.text}
                          readOnly
                          styles={{
                            label: { cursor: 'pointer', fontWeight: 500 }
                          }}
                        />
                      </Paper>
                    );
                  })}
                </Stack>
              </Radio.Group>
            )}
          </Stack>
        </Paper>

        <Group justify='space-between' align='center'>
          <CommonButton
            variant='default'
            size='xs'
            leftSection={<IconChevronLeft size={14} />}
            disabled={isFirst}
            onClick={() => setCurrentIndex(prev => prev - 1)}
          >
            Previous
          </CommonButton>

          {isLast ? (
            <CommonButton
              size='xs'
              color='teal'
              leftSection={<IconCheck size={14} />}
              onClick={() => setIsSubmitted(true)}
            >
              Submit Quiz
            </CommonButton>
          ) : (
            <CommonButton
              size='xs'
              rightSection={<IconChevronRight size={14} />}
              onClick={() => setCurrentIndex(prev => prev + 1)}
            >
              Next Question
            </CommonButton>
          )}
        </Group>
      </Stack>
    </Card>
  );
};

export default QuizPlayer;
