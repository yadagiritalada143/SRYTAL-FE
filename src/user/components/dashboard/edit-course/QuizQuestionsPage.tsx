import { useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Container, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
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
import { clearQuizTaskState, readQuizTaskState } from './task-popup-state';
import {
  fromQuizQuestionApi,
  toQuizQuestionPayload,
  toQuizQuestionUpdatePayload
} from './quiz-helpers';

const QuizQuestionsPage = () => {
  const { organization = '' } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { themeConfig } = useAppTheme();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const [taskState] = useState(() => readQuizTaskState());

  const taskId = searchParams.get('taskId')?.trim() || taskState?.taskId || '';
  const courseId =
    searchParams.get('courseId')?.trim() || taskState?.courseId || '';

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
    () => apiQuestions.map(fromQuizQuestionApi),
    [apiQuestions]
  );

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
    try {
      const response = await deleteQuestion(question.id);
      showSuccessToast(response?.message || 'Question deleted successfully!');
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to delete question'));
      throw error;
    }
  };

  const handleBack = () => {
    clearQuizTaskState();
    if (courseId) {
      navigate(`${commonUrls(organization)}/dashboard/course/${courseId}`);
      return;
    }
    navigate(-1);
  };

  return (
    <Container size='md' py='lg'>
      <Stack gap='lg'>
        <Group gap='sm'>
          <CommonButton
            variant='default'
            leftSection={<IconArrowLeft size={16} />}
            onClick={handleBack}
          >
            Back
          </CommonButton>
          <Title order={3} style={{ color: themeConfig.color }}>
            Quiz Questions
          </Title>
        </Group>

        <Text size='sm' c='dimmed'>
          Add questions, choose how learners answer, mark the correct answers
          and save each question.
        </Text>

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
          <QuizBuilder
            questions={questions}
            isLoading={isLoading}
            isSubmitting={isPending || isUpdating}
            onAddQuestion={handleAddQuestion}
            onUpdateQuestion={handleUpdateQuestion}
            onToggleStatus={handleToggleStatus}
            onDeleteQuestion={handleDeleteQuestion}
          />
        )}
      </Stack>
    </Container>
  );
};

export default QuizQuestionsPage;
