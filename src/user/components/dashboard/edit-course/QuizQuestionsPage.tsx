import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  Badge,
  Card,
  Container,
  Group,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title
} from '@mantine/core';
import {
  IconArrowLeft,
  IconCheck,
  IconEye,
  IconEyeOff,
  IconListCheck,
  IconPlayerPlay
} from '@tabler/icons-react';
import { CommonButton } from '@components/common/button/CommonButton';
import { useAppTheme } from '@hooks/use-app-theme';
import { useGetAllQuizQuestions } from '@hooks/queries/useUserQueries';
import {
  useCreateQuizQuestion,
  useUpdateQuizQuestion,
  useUpdateQuizQuestionStatus,
  useDeleteQuizQuestion
} from '@hooks/mutations/useUserMutations';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import { commonUrls } from '@utils/common/constants';
import { QuizQuestion } from '@interfaces/quiz';
import QuizBuilder from './QuizBuilder';
import {
  clearQuizTaskState,
  readQuizTaskState,
  clearTaskPopupState,
  clearTaskDraft
} from './task-popup-state';
import {
  fromQuizQuestionApi,
  toQuizQuestionPayload,
  toQuizQuestionUpdatePayload
} from './quiz-helpers';
import QuizPlayerPreview from './QuizPlayerPreview';
import styles from './QuizBuilder.module.css';

const QuizQuestionsPage = () => {
  const { organization = '' } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { themeConfig } = useAppTheme();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const [simulationOpened, setSimulationOpened] = useState(false);
  const [taskState] = useState(() => readQuizTaskState());

  const taskId = searchParams.get('taskId')?.trim() || taskState?.taskId || '';
  const courseId =
    searchParams.get('courseId')?.trim() || taskState?.courseId || '';
  const moduleId =
    searchParams.get('moduleId')?.trim() || taskState?.moduleId || '';
  const taskName =
    searchParams.get('taskName')?.trim() || taskState?.taskName || '';

  useEffect(() => {
    clearTaskPopupState();
    clearTaskDraft();
  }, []);

  const {
    data: apiQuestions = [],
    isLoading,
    isError
  } = useGetAllQuizQuestions(taskId);

  const { mutateAsync: createQuestion, isPending } =
    useCreateQuizQuestion(taskId);

  const { mutateAsync: updateQuestion, isPending: isUpdating } =
    useUpdateQuizQuestion(taskId);
  const { mutateAsync: updateQuestionStatus } =
    useUpdateQuizQuestionStatus(taskId);
  const { mutateAsync: deleteQuestion } = useDeleteQuizQuestion(taskId);

  const questions = useMemo(
    () => apiQuestions.filter(q => !q.isDeleted).map(fromQuizQuestionApi),
    [apiQuestions]
  );

  const totalCount = questions.length;
  const visibleCount = questions.filter(q => q.status === 'SHOW').length;
  const hiddenCount = totalCount - visibleCount;

  const handleAddQuestion = async (question: QuizQuestion) => {
    try {
      const response = await createQuestion(
        toQuizQuestionPayload(question, taskId)
      );
      showSuccessToast(response?.message || 'Question added successfully!');
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to add question'));
      throw error;
    }
  };

  const handleUpdateQuestion = async (question: QuizQuestion) => {
    try {
      const response = await updateQuestion({
        questionId: question.id,
        data: toQuizQuestionUpdatePayload(question)
      });
      showSuccessToast(response?.message || 'Question updated successfully!');
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to update question'));
      throw error;
    }
  };

  const handleToggleStatus = async (question: QuizQuestion) => {
    const status = question.status === 'SHOW' ? 'HIDE' : 'SHOW';
    try {
      const response = await updateQuestionStatus({
        questionId: question.id,
        status
      });
      showSuccessToast(
        response?.message ||
          (status === 'SHOW' ? 'Question is now visible.' : 'Question hidden.')
      );
    } catch (error) {
      showErrorToast(
        getErrorMessage(error, 'Failed to update question status')
      );
      throw error;
    }
  };

  const handleDeleteQuestion = async (question: QuizQuestion) => {
    const qId = question.id || (question as any)._id;
    if (!qId) {
      showErrorToast('Question ID is missing.');
      return;
    }
    try {
      const response = await deleteQuestion(qId);
      showSuccessToast(response?.message || 'Question deleted successfully!');
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to delete question'));
      throw error;
    }
  };

  const handleBack = () => {
    clearQuizTaskState();
    clearTaskPopupState();
    clearTaskDraft();
    if (courseId) {
      const query = moduleId ? `?expandedModuleId=${moduleId}` : '';
      navigate(
        `${commonUrls(organization)}/dashboard/course/${courseId}${query}`
      );
      return;
    }
    const from = searchParams.get('from');
    if (from === 'quizzes') {
      navigate(`${commonUrls(organization)}/dashboard/quizzes`);
      return;
    }
    navigate(-1);
  };

  return (
    <Container size='md' py='lg'>
      <Stack gap='lg'>
        <Paper
          p='md'
          radius='md'
          withBorder
          style={{
            borderColor: themeConfig.borderColor,
            backgroundColor: themeConfig.cardBackground
          }}
        >
          <Stack gap='xs'>
            <Group justify='space-between' align='center' wrap='wrap'>
              <Group gap='sm'>
                <CommonButton
                  variant='default'
                  leftSection={<IconArrowLeft size={16} />}
                  onClick={handleBack}
                >
                  {courseId ? 'Back to Course' : 'Back'}
                </CommonButton>
                <Group gap='xs' align='center'>
                  <Title order={3} style={{ color: themeConfig.color }}>
                    Quiz Questions
                  </Title>
                  {taskName && (
                    <Badge variant='light' color='cyan' size='sm'>
                      {taskName}
                    </Badge>
                  )}
                </Group>
              </Group>

              <Group gap='xs'>
                {questions.length > 0 && (
                  <CommonButton
                    variant='light'
                    size='xs'
                    leftSection={<IconPlayerPlay size={14} />}
                    onClick={() => setSimulationOpened(true)}
                  >
                    Simulate Quiz
                  </CommonButton>
                )}
                <CommonButton
                  variant='light'
                  color='teal'
                  size='xs'
                  leftSection={<IconCheck size={14} />}
                  onClick={handleBack}
                >
                  Done & Return to Course
                </CommonButton>
              </Group>
            </Group>

            <Text size='sm' c='dimmed'>
              Add questions, choose how learners answer, mark the correct
              answers and save each question.
            </Text>
          </Stack>
        </Paper>

        {/* Quick Stats Grid */}
        {taskId && !isError && questions.length > 0 && (
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing='sm'>
            <Card
              p='sm'
              radius='md'
              withBorder
              className={styles.statCard}
              style={{
                borderColor: themeConfig.borderColor,
                backgroundColor: themeConfig.cardBackground
              }}
            >
              <Group justify='space-between' align='center'>
                <Stack gap={2}>
                  <Text size='xs' c='dimmed' fw={600} tt='uppercase'>
                    Total Questions
                  </Text>
                  <Text size='xl' fw={800} style={{ color: themeConfig.color }}>
                    {totalCount}
                  </Text>
                </Stack>
                <ThemeIcon size={38} radius='md' variant='light' color='indigo'>
                  <IconListCheck size={20} />
                </ThemeIcon>
              </Group>
            </Card>

            <Card
              p='sm'
              radius='md'
              withBorder
              className={styles.statCard}
              style={{
                borderColor: themeConfig.borderColor,
                backgroundColor: themeConfig.cardBackground
              }}
            >
              <Group justify='space-between' align='center'>
                <Stack gap={2}>
                  <Text size='xs' c='dimmed' fw={600} tt='uppercase'>
                    Published (Show)
                  </Text>
                  <Text size='xl' fw={800} c='teal'>
                    {visibleCount}
                  </Text>
                </Stack>
                <ThemeIcon size={38} radius='md' variant='light' color='teal'>
                  <IconEye size={20} />
                </ThemeIcon>
              </Group>
            </Card>

            <Card
              p='sm'
              radius='md'
              withBorder
              className={styles.statCard}
              style={{
                borderColor: themeConfig.borderColor,
                backgroundColor: themeConfig.cardBackground
              }}
            >
              <Group justify='space-between' align='center'>
                <Stack gap={2}>
                  <Text size='xs' c='dimmed' fw={600} tt='uppercase'>
                    Draft / Hidden (Hide)
                  </Text>
                  <Text size='xl' fw={800} c='orange'>
                    {hiddenCount}
                  </Text>
                </Stack>
                <ThemeIcon size={38} radius='md' variant='light' color='orange'>
                  <IconEyeOff size={20} />
                </ThemeIcon>
              </Group>
            </Card>
          </SimpleGrid>
        )}

        {/* Content Body */}
        {!taskId ? (
          <Paper
            p='md'
            radius='md'
            withBorder
            style={{ borderColor: themeConfig.borderColor }}
          >
            <Text size='sm' c='dimmed'>
              Open this page from a quiz task to add its questions.
            </Text>
          </Paper>
        ) : isError ? (
          <Text size='sm' c='red'>
            We could not load the quiz questions. Please try again.
          </Text>
        ) : (
          <>
            <QuizBuilder
              questions={questions}
              isLoading={isLoading}
              isSubmitting={isPending || isUpdating}
              onAddQuestion={handleAddQuestion}
              onUpdateQuestion={handleUpdateQuestion}
              onToggleStatus={handleToggleStatus}
              onDeleteQuestion={handleDeleteQuestion}
            />

            <Modal
              opened={simulationOpened}
              onClose={() => setSimulationOpened(false)}
              title='Learner Quiz Simulation'
              size='lg'
              centered
              radius='md'
            >
              <QuizPlayerPreview questions={questions} />
            </Modal>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default QuizQuestionsPage;
