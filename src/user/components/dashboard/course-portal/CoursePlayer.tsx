import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Drawer,
  Group,
  Paper,
  Progress,
  Stack,
  Text,
  Title,
  Tooltip
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconArrowLeft,
  IconChecks,
  IconChevronLeft,
  IconChevronRight,
  IconListCheck,
  IconRotateClockwise
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { useGetMyAssignedCourse } from '@hooks/queries/useUserQueries';
import { useUpdateMyTaskProgress } from '@hooks/mutations/useUserMutations';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import { CommonButton } from '@components/common/button/CommonButton';
import DataView from '@components/common/loaders/DataView';
import { AssignedTask } from '@interfaces/course-assignment';
import CurriculumSidebar from './CurriculumSidebar';
import TaskContentViewer from './TaskContentViewer';
import { formatDueDate, statusColor } from './course-status';

/** A task paired with the module it belongs to, for prev/next navigation. */
interface FlatTask {
  task: AssignedTask;
  moduleId: string;
  moduleName: string;
}

/**
 * The learning experience for one assigned course: content on the left, the
 * curriculum on the right (a drawer on mobile), with progress, prev/next and a
 * complete toggle — the shape a learner expects from a course platform.
 */
const CoursePlayer = () => {
  const { courseAssignmentId = '' } = useParams();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { themeConfig } = useAppTheme();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const {
    data: course,
    isLoading,
    error,
    refetch
  } = useGetMyAssignedCourse(courseAssignmentId);
  const { mutate: updateProgress, isPending } = useUpdateMyTaskProgress();

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [openModuleIds, setOpenModuleIds] = useState<string[]>([]);
  const [curriculumOpen, setCurriculumOpen] = useState(false);

  const modules = useMemo(() => course?.modules ?? [], [course]);

  // Flattened running order — the player moves through tasks, not modules.
  const flatTasks = useMemo<FlatTask[]>(
    () =>
      modules.flatMap(module =>
        module.tasks.map(task => ({
          task,
          moduleId: module._id,
          moduleName: module.moduleName
        }))
      ),
    [modules]
  );

  // Resume where the learner left off: the first task they haven't finished.
  useEffect(() => {
    if (activeTaskId || flatTasks.length === 0) return;
    const nextUp =
      flatTasks.find(entry => !entry.task.isCompleted) ?? flatTasks[0];
    setActiveTaskId(nextUp.task._id);
    setOpenModuleIds([nextUp.moduleId]);
  }, [flatTasks, activeTaskId]);

  const activeIndex = flatTasks.findIndex(
    entry => entry.task._id === activeTaskId
  );
  const active = activeIndex >= 0 ? flatTasks[activeIndex] : undefined;
  const progress = course?.progress;

  const selectTask = (task: AssignedTask, moduleId: string) => {
    setActiveTaskId(task._id);
    setOpenModuleIds(current =>
      current.includes(moduleId) ? current : [...current, moduleId]
    );
    setCurriculumOpen(false);
  };

  const goTo = (index: number) => {
    const entry = flatTasks[index];
    if (entry) selectTask(entry.task, entry.moduleId);
  };

  const setCompletion = (isCompleted: boolean, advance = false) => {
    if (!active) return;

    updateProgress(
      { courseAssignmentId, taskId: active.task._id, isCompleted },
      {
        onSuccess: response => {
          if (isCompleted) {
            showSuccessToast(
              response.courseStatus === 'Completed'
                ? 'Course completed. Well done!'
                : 'Marked as complete'
            );
          }
          if (advance) goTo(activeIndex + 1);
        },
        onError: caughtError =>
          showErrorToast(
            getErrorMessage(caughtError, 'Could not update your progress')
          )
      }
    );
  };

  /**
   * Finishing a video (or opening an external resource) completes the task the
   * way a course platform would — but never un-completes or re-fires on a task
   * the learner has already finished.
   */
  const handleContentFinished = () => {
    if (active && !active.task.isCompleted) setCompletion(true);
  };

  const curriculum = (
    <CurriculumSidebar
      modules={modules}
      activeTaskId={activeTaskId ?? undefined}
      openModuleIds={openModuleIds}
      onOpenModulesChange={setOpenModuleIds}
      onSelectTask={selectTask}
    />
  );

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
          {/* Course header + overall progress */}
          <Card withBorder radius='lg' p={{ base: 'md', sm: 'lg' }}>
            <Stack gap='sm'>
              <Group justify='space-between' align='flex-start' wrap='nowrap'>
                <Group gap='sm' align='flex-start' style={{ minWidth: 0 }}>
                  <ActionIcon
                    variant='subtle'
                    color='gray'
                    size='lg'
                    aria-label='Back to my courses'
                    onClick={() => navigate('../course-assignments')}
                  >
                    <IconArrowLeft size={20} />
                  </ActionIcon>
                  <Stack gap={4} style={{ minWidth: 0 }}>
                    <Title order={isMobile ? 4 : 3} lineClamp={2}>
                      {course?.courseName}
                    </Title>
                    <Group gap='xs' wrap='wrap'>
                      <Badge
                        variant='light'
                        color={statusColor(course?.status, course?.isOverdue)}
                      >
                        {course?.isOverdue ? 'Overdue' : course?.status}
                      </Badge>
                      <Text size='xs' c={themeConfig.mutedTextColor}>
                        Due {formatDueDate(course?.dueDate)}
                      </Text>
                    </Group>
                  </Stack>
                </Group>

                {isMobile && (
                  <ActionIcon
                    variant='light'
                    size='lg'
                    aria-label='Course content'
                    onClick={() => setCurriculumOpen(true)}
                  >
                    <IconListCheck size={20} />
                  </ActionIcon>
                )}
              </Group>

              <Stack gap={4}>
                <Group justify='space-between'>
                  <Text size='xs' c={themeConfig.mutedTextColor}>
                    {progress?.completedTasks ?? 0} of{' '}
                    {progress?.totalTasks ?? 0} items complete
                  </Text>
                  <Text size='xs' fw={600}>
                    {progress?.percentComplete ?? 0}%
                  </Text>
                </Group>
                <Progress
                  value={progress?.percentComplete ?? 0}
                  size='md'
                  radius='xl'
                  color={
                    progress?.percentComplete === 100
                      ? 'teal'
                      : themeConfig.primaryColor
                  }
                />
              </Stack>
            </Stack>
          </Card>

          {/* Player + curriculum */}
          <Group
            align='flex-start'
            gap='md'
            wrap={isMobile ? 'wrap' : 'nowrap'}
          >
            <Stack gap='md' style={{ flex: 1, minWidth: 0, width: '100%' }}>
              {!active ? (
                <Card withBorder radius='lg' p='xl'>
                  <Text ta='center' c={themeConfig.mutedTextColor}>
                    This course has no published content yet. Check back soon.
                  </Text>
                </Card>
              ) : (
                <>
                  <TaskContentViewer
                    task={active.task}
                    onFinished={handleContentFinished}
                  />

                  <Card withBorder radius='lg' p={{ base: 'md', sm: 'lg' }}>
                    <Stack gap='sm'>
                      <Stack gap={4}>
                        <Text size='xs' c={themeConfig.mutedTextColor}>
                          {active.moduleName} · Item {activeIndex + 1} of{' '}
                          {flatTasks.length}
                        </Text>
                        <Title order={isMobile ? 5 : 4}>
                          {active.task.taskName}
                        </Title>
                      </Stack>

                      {active.task.taskDescription && (
                        <Paper
                          p={{ base: 'sm', sm: 'md' }}
                          radius='md'
                          style={{
                            backgroundColor: themeConfig.cardBackground,
                            border: `1px solid ${themeConfig.borderColor}`
                          }}
                        >
                          <Box
                            style={{
                              color: themeConfig.color,
                              fontSize: isMobile ? '14px' : '15px',
                              lineHeight: 1.6
                            }}
                            dangerouslySetInnerHTML={{
                              __html: active.task.taskDescription
                            }}
                          />
                        </Paper>
                      )}

                      <Group justify='space-between' wrap='wrap' gap='sm'>
                        <Group gap='xs'>
                          <Tooltip label='Previous item' withArrow>
                            <CommonButton
                              variant='default'
                              disabled={activeIndex <= 0}
                              leftSection={<IconChevronLeft size={16} />}
                              onClick={() => goTo(activeIndex - 1)}
                            >
                              Previous
                            </CommonButton>
                          </Tooltip>
                          <Tooltip label='Next item' withArrow>
                            <CommonButton
                              variant='default'
                              disabled={activeIndex >= flatTasks.length - 1}
                              rightSection={<IconChevronRight size={16} />}
                              onClick={() => goTo(activeIndex + 1)}
                            >
                              Next
                            </CommonButton>
                          </Tooltip>
                        </Group>

                        {active.task.isCompleted ? (
                          <CommonButton
                            variant='light'
                            color='gray'
                            loading={isPending}
                            leftSection={<IconRotateClockwise size={16} />}
                            onClick={() => setCompletion(false)}
                          >
                            Mark as incomplete
                          </CommonButton>
                        ) : (
                          <CommonButton
                            loading={isPending}
                            leftSection={<IconChecks size={16} />}
                            onClick={() =>
                              setCompletion(
                                true,
                                activeIndex < flatTasks.length - 1
                              )
                            }
                          >
                            Complete and continue
                          </CommonButton>
                        )}
                      </Group>
                    </Stack>
                  </Card>
                </>
              )}
            </Stack>

            {!isMobile && (
              <Box style={{ width: 360, flexShrink: 0 }}>
                <Text fw={600} mb='xs'>
                  Course content
                </Text>
                {curriculum}
              </Box>
            )}
          </Group>
        </Stack>

        <Drawer
          opened={isMobile && curriculumOpen}
          onClose={() => setCurriculumOpen(false)}
          position='right'
          title='Course content'
          size='85%'
          // The renderer used here pins transform-based animations to their
          // start frame, so the panel fades instead of sliding.
          transitionProps={{ transition: 'fade', duration: 150 }}
        >
          {curriculum}
        </Drawer>
      </DataView>
    </Box>
  );
};

export default CoursePlayer;
