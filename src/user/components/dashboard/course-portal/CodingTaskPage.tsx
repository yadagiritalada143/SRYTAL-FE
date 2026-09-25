import { useNavigate, useParams } from 'react-router-dom';
import { Badge, Box, Card, Group, Stack, Text, Title } from '@mantine/core';
import {
  IconArrowLeft,
  IconChecks,
  IconRotateClockwise
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import { useGetMyAssignedCourse } from '@hooks/queries/useUserQueries';
import { useUpdateMyTaskProgress } from '@hooks/mutations/useUserMutations';
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
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const {
    data: course,
    isLoading,
    error,
    refetch
  } = useGetMyAssignedCourse(courseAssignmentId);
  const { mutate: updateProgress, isPending } = useUpdateMyTaskProgress();

  const task = course?.modules
    ?.flatMap(module => module.tasks)
    .find(candidate => candidate._id === taskId);

  const isCompleted = task?.isCompleted ?? false;

  const handleTaskSubmitted = () => {
    if (!task) return;
    updateProgress(
      { courseAssignmentId, taskId: task._id, isCompleted: true },
      {
        onError: caughtError =>
          showErrorToast(
            getErrorMessage(caughtError, 'Could not update your progress')
          )
      }
    );
  };

  const toggleCompletion = () => {
    if (!task) return;
    updateProgress(
      { courseAssignmentId, taskId: task._id, isCompleted: !isCompleted },
      {
        onSuccess: () => {
          if (!isCompleted) {
            showSuccessToast('Marked as complete');
          }
        },
        onError: caughtError =>
          showErrorToast(
            getErrorMessage(caughtError, 'Could not update your progress')
          )
      }
    );
  };

  return (
    <Box p={{ base: 'xs', sm: 'md' }}>
      <DataView
        isLoading={isLoading}
        error={error}
        isEmpty={!course}
        label='course'
        onRetry={refetch}
      >
        <Stack gap='md'>
          <Card withBorder radius='lg' p={{ base: 'md', sm: 'lg' }}>
            <Group justify='space-between' align='center' wrap='wrap' gap='sm'>
              <Stack gap={4} style={{ minWidth: 0 }}>
                <Title order={4} lineClamp={2}>
                  {task?.taskName || 'Coding challenge'}
                </Title>
                <Group gap='xs' wrap='wrap'>
                  <Badge variant='light' color='blue'>
                    Coding
                  </Badge>
                  <Text size='xs' c={themeConfig.mutedTextColor}>
                    {course?.courseName}
                  </Text>
                </Group>
              </Stack>

              <Group gap='xs' align='center' wrap='nowrap'>
                {task &&
                  (isCompleted ? (
                    <CommonButton
                      variant='light'
                      color='gray'
                      loading={isPending}
                      leftSection={<IconRotateClockwise size={16} />}
                      onClick={toggleCompletion}
                    >
                      Mark as incomplete
                    </CommonButton>
                  ) : (
                    <CommonButton
                      loading={isPending}
                      leftSection={<IconChecks size={16} />}
                      onClick={toggleCompletion}
                    >
                      Complete task
                    </CommonButton>
                  ))}
                <CommonButton
                  variant='default'
                  leftSection={<IconArrowLeft size={16} />}
                  onClick={() => navigate('../', { relative: 'path' })}
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
              key={task._id}
              task={task}
              onSubmitted={handleTaskSubmitted}
            />
          )}
        </Stack>
      </DataView>
    </Box>
  );
};

export default CodingTaskPage;
