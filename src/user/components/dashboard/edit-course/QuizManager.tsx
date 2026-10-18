import React, { useState, useMemo } from 'react';
import {
  Stack,
  Group,
  Text,
  Badge,
  Paper,
  ThemeIcon,
  Modal,
  Title,
  SimpleGrid,
  Card
} from '@mantine/core';
import {
  IconListCheck,
  IconEye,
  IconEyeOff,
  IconPlayerPlay,
  IconArrowLeft,
  IconBook
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import { QuizQuestion } from '@interfaces/quiz';
import { useGetAllQuizQuestions } from '@hooks/queries/useUserQueries';
import {
  useCreateQuizQuestion,
  useUpdateQuizQuestion,
  useUpdateQuizQuestionStatus,
  useDeleteQuizQuestion
} from '@hooks/mutations/useUserMutations';
import { CommonButton } from '@components/common/button/CommonButton';
import QuizBuilder from './QuizBuilder';
import QuizPlayerPreview from './QuizPlayerPreview';
import {
  fromQuizQuestionApi,
  toQuizQuestionPayload,
  toQuizQuestionUpdatePayload
} from './quiz-helpers';
import styles from './QuizBuilder.module.css';

export interface QuizManagerProps {
  taskId: string;
  taskName?: string;
  courseName?: string;
  moduleName?: string;
  onBack?: () => void;
  backLabel?: string;
  onBackToCourse?: () => void;
}

export const QuizManager: React.FC<QuizManagerProps> = ({
  taskId,
  taskName = 'Quiz Task',
  courseName,
  moduleName,
  onBack,
  backLabel = 'All Quizzes',
  onBackToCourse
}) => {
  const { themeConfig } = useAppTheme();
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const [simulationOpened, setSimulationOpened] = useState(false);

  const {
    data: apiQuestions = [],
    isLoading,
    isError
  } = useGetAllQuizQuestions(taskId, Boolean(taskId));

  const { mutateAsync: createQuestion, isPending: isCreating } =
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

  return (
    <Stack gap='md'>
      {/* Quiz Details Header */}
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
              {onBack && (
                <CommonButton
                  variant='subtle'
                  size='xs'
                  leftSection={<IconArrowLeft size={16} />}
                  onClick={onBack}
                >
                  {backLabel}
                </CommonButton>
              )}
              {onBackToCourse && (
                <CommonButton
                  variant='light'
                  color='cyan'
                  size='xs'
                  leftSection={<IconBook size={14} />}
                  onClick={onBackToCourse}
                >
                  Back to Course
                </CommonButton>
              )}
              <Stack gap={2}>
                <Group gap='xs' align='center'>
                  <Title order={4} style={{ color: themeConfig.color }}>
                    {taskName}
                  </Title>
                  <Badge variant='light' color='cyan' size='sm'>
                    Quiz Task
                  </Badge>
                </Group>
                {(courseName || moduleName) && (
                  <Group gap={6} align='center'>
                    {courseName && (
                      <Text size='xs' c='dimmed'>
                        Course:{' '}
                        <strong style={{ color: themeConfig.color }}>
                          {courseName}
                        </strong>
                      </Text>
                    )}
                    {courseName && moduleName && (
                      <Text size='xs' c='dimmed'>
                        •
                      </Text>
                    )}
                    {moduleName && (
                      <Text size='xs' c='dimmed'>
                        Module: <strong>{moduleName}</strong>
                      </Text>
                    )}
                  </Group>
                )}
              </Stack>
            </Group>

            <Group gap='xs' wrap='wrap'>
              {questions.length > 0 && (
                <CommonButton
                  variant='light'
                  color='indigo'
                  size='xs'
                  leftSection={<IconPlayerPlay size={14} />}
                  onClick={() => setSimulationOpened(true)}
                >
                  Simulate Quiz
                </CommonButton>
              )}
            </Group>
          </Group>
        </Stack>
      </Paper>

      {!isError && questions.length > 0 && (
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

      {isError ? (
        <Paper
          p='lg'
          radius='md'
          withBorder
          style={{ borderColor: 'var(--mantine-color-red-4)' }}
        >
          <Text size='sm' c='red'>
            Failed to load quiz questions. Please verify your connection or try
            again.
          </Text>
        </Paper>
      ) : (
        <QuizBuilder
          questions={questions}
          isLoading={isLoading}
          isSubmitting={isCreating || isUpdating}
          onAddQuestion={handleAddQuestion}
          onUpdateQuestion={handleUpdateQuestion}
          onToggleStatus={handleToggleStatus}
          onDeleteQuestion={handleDeleteQuestion}
        />
      )}

      <Modal
        opened={simulationOpened}
        onClose={() => setSimulationOpened(false)}
        title='Learner Quiz Simulation'
        size='lg'
        centered
        radius='md'
        styles={{
          header: {
            backgroundColor: themeConfig.cardBackground,
            borderBottom: `1px solid ${themeConfig.borderColor}`
          },
          content: {
            backgroundColor: themeConfig.cardBackground,
            color: themeConfig.color
          }
        }}
      >
        <QuizPlayerPreview questions={questions} />
      </Modal>
    </Stack>
  );
};

export default QuizManager;
