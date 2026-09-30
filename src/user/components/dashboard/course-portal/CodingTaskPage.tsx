import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Card, Group, Stack, Text, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import {
  useGetMyAssignedCourse,
  useGetCourseTaskQuestions
} from '@hooks/queries/useUserQueries';
import { CommonButton } from '@components/common/button/CommonButton';
import DataView from '@components/common/loaders/DataView';
import CodingQuestionViewer from './CodingQuestionViewer';

/**
 * A coding problem opened on its own page, LeetCode-style: the statement and
 * description on the left, a full code editor + run results on the right. Route
 * `course-assignments/:courseAssignmentId/task/:taskId`.
 */
const CodingTaskPage = () => {
  const { courseAssignmentId = '', taskId = '' } = useParams();
  const navigate = useNavigate();
  const { themeConfig } = useAppTheme();
  const { showErrorToast } = useCustomToast();

  const {
    data: course,
    isLoading,
    error,
    refetch
  } = useGetMyAssignedCourse(courseAssignmentId);
  const {
    data: questionsData,
    isLoading: questionsLoading,
    refetch: refetchQuestions
  } = useGetCourseTaskQuestions(taskId, !!taskId);

  const task = course?.modules
    ?.flatMap(module => module.tasks)
    .find(candidate => candidate._id === taskId);

  const activeQuestions = (questionsData?.questions || []).filter(
    question => question.status !== 'ARCHIVE'
  );
  const questionCount = activeQuestions.length > 0 ? activeQuestions.length : 1;
  const [activeQuestion, setActiveQuestion] = useState(0);

  useEffect(() => {
    setActiveQuestion(0);
  }, [taskId]);

  const activeQuestionId =
    activeQuestions.length > 0
      ? (activeQuestions[activeQuestion]?.questionId ?? null)
      : null;

  const handleTaskSubmitted = () => {
    refetch().catch(caughtError =>
      showErrorToast(
        getErrorMessage(caughtError, 'Could not refresh your progress')
      )
    );
  };

  return (
    <Box p={{ base: 'xs', sm: 'md' }}>
      <DataView
        isLoading={isLoading || (questionsLoading && !!task)}
        error={error}
        isEmpty={!course}
        label='course'
        onRetry={() => {
          refetch();
          if (questionsLoading) refetchQuestions();
        }}
      >
        <Stack gap='md'>
          <Card
            withBorder
            radius='lg'
            p={{ base: 'md', sm: 'lg' }}
            style={{
              backgroundColor: themeConfig.cardBackground,
              borderColor: themeConfig.borderColor
            }}
          >
            <Group justify='space-between' align='center' wrap='wrap' gap='sm'>
              <Title
                order={4}
                lineClamp={2}
                style={{ color: themeConfig.color, minWidth: 0 }}
              >
                {task?.taskName || 'Coding challenge'}
              </Title>

              <Group gap='xs' align='center' wrap='nowrap'>
                <CommonButton
                  variant='default'
                  leftSection={<IconArrowLeft size={16} />}
                  onClick={() => navigate('../..', { relative: 'path' })}
                >
                  Back
                </CommonButton>
              </Group>
            </Group>
          </Card>

          {!task ? (
            <Card withBorder radius='lg' p='xl'>
              <Text ta='center' c={themeConfig.mutedTextColor}>
                This coding problem is no longer available in the course.
              </Text>
            </Card>
          ) : (
            <CodingQuestionViewer
              key={`${task._id}:${activeQuestionId ?? task._id}`}
              task={task}
              questionId={activeQuestionId}
              questionCount={questionCount}
              activeQuestionIndex={activeQuestion}
              onSelectQuestion={setActiveQuestion}
              onSubmitted={handleTaskSubmitted}
            />
          )}
        </Stack>
      </DataView>
    </Box>
  );
};

export default CodingTaskPage;
