import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Divider,
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
import TaskAcknowledgement from './TaskAcknowledgement';
import {
  hasTaskAcknowledgement,
  isQuizTask,
  requiresTaskAcknowledgement
} from './task-content';
import { formatDueDate, statusColor } from './course-status';

/** A task paired with the module it belongs to, for prev/next navigation. */
interface FlatTask {
  task: AssignedTask;
  moduleId: string;
  moduleName: string;
  moduleTaskIndex: number;
  moduleTaskCount: number;
}

/**
 * The learning experience for one assigned course: content on the left, the
 * curriculum on the right (a drawer on mobile), with progress, prev/next and a
 * complete toggle — the shape a learner expects from a course platform.
 */
const CoursePlayer = () => {
  const { courseAssignmentId = '' } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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
        module.tasks.map((task, moduleTaskIndex) => ({
          task,
          moduleId: module._id,
          moduleName: module.moduleName,
          moduleTaskIndex,
          moduleTaskCount: module.tasks.length
        }))
      ),
    [modules]
  );

  // Resume where the learner left off: the first task they haven't finished.
  const nextUp = useMemo(
    () => flatTasks.find(entry => !entry.task.isCompleted) ?? flatTasks[0],
    [flatTasks]
  );

  const initialAutoSelectDone = useRef(false);

  useEffect(() => {
    if (initialAutoSelectDone.current || flatTasks.length === 0) return;
    const fromUrl = searchParams.get('taskId');
    if (fromUrl) {
      setActiveTaskId(fromUrl);
      const matched = flatTasks.find(entry => entry.task._id === fromUrl);
      if (matched) setOpenModuleIds([matched.moduleId]);
      initialAutoSelectDone.current = true;
      return;
    }
    if (nextUp) {
      setActiveTaskId(nextUp.task._id);
      setOpenModuleIds(modules.map(m => m._id));
    }
    initialAutoSelectDone.current = true;
  }, [flatTasks, nextUp, searchParams, modules]);

  const activeIndex = flatTasks.findIndex(
    entry => entry.task._id === activeTaskId
  );
  const active = activeIndex >= 0 ? flatTasks[activeIndex] : undefined;
  const progress = course?.progress;

  const needsAcknowledgement = active
    ? requiresTaskAcknowledgement(active.task) && !active.task.isCompleted
    : false;
  const showsAcknowledgement = active
    ? hasTaskAcknowledgement(active.task)
    : false;
  const showCurriculum = true;

  const hasNext = activeIndex >= 0 && activeIndex < flatTasks.length - 1;
  const nextTaskEntry = hasNext ? flatTasks[activeIndex + 1] : undefined;
  const nextTaskName = nextTaskEntry?.task.taskName;

  const handleNext = () => {
    if (hasNext) {
      goTo(activeIndex + 1);
    }
  };

  const handleBackToCourseContent = () => {
    setActiveTaskId(null);
  };

  const handleBack = () => {
    if (activeTaskId) {
      setActiveTaskId(null);
      return;
    }
    navigate('../course-assignments');
  };

  const selectTask = (task: AssignedTask, moduleId: string) => {
    if (needsAcknowledgement && task._id !== activeTaskId) {
      showErrorToast('Acknowledge this document before moving on.');
      return;
    }
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
    if (active && !active.task.isCompleted && !needsAcknowledgement) {
      setCompletion(true);
    }
  };

  const handleAcknowledged = () => {
    if (active && !active.task.isCompleted) {
      setCompletion(true);
    }
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
              <Group
                justify='space-between'
                align='center'
                wrap='wrap'
                gap='xs'
              >
                <Group gap='xs' align='center'>
                  <CommonButton
                    variant='default'
                    leftSection={<IconArrowLeft size={16} />}
                    onClick={handleBack}
                  >
                    Back
                  </CommonButton>
                  {isMobile && showCurriculum && (
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

                <Group
                  gap='xs'
                  wrap='wrap'
                  align='center'
                  pr={{ base: 0, sm: '80px', md: '120px' }}
                >
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
              </Group>

              <Title order={isMobile ? 4 : 3} lineClamp={2}>
                {course?.courseName}
              </Title>

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
                flatTasks.length === 0 ? (
                  <Card withBorder radius='lg' p='xl'>
                    <Text ta='center' c={themeConfig.mutedTextColor}>
                      This course has no published content yet. Check back soon.
                    </Text>
                  </Card>
                ) : (
                  <Card withBorder radius='lg' p={{ base: 'md', sm: 'xl' }}>
                    <Stack gap='md'>
                      <Group justify='space-between' align='center' wrap='wrap'>
                        <Stack gap={2}>
                          <Title order={isMobile ? 4 : 3}>Course Content</Title>
                          <Text size='xs' c={themeConfig.mutedTextColor}>
                            {modules.length}{' '}
                            {modules.length === 1 ? 'module' : 'modules'} ·{' '}
                            {flatTasks.length}{' '}
                            {flatTasks.length === 1 ? 'task' : 'tasks'}
                          </Text>
                        </Stack>

                        {nextUp && (
                          <CommonButton
                            color='teal'
                            rightSection={<IconChevronRight size={16} />}
                            onClick={() =>
                              selectTask(nextUp.task, nextUp.moduleId)
                            }
                          >
                            {nextUp.task.isCompleted
                              ? `Review: ${nextUp.task.taskName}`
                              : `Next Task: ${nextUp.task.taskName}`}
                          </CommonButton>
                        )}
                      </Group>

                      <Divider />

                      <CurriculumSidebar
                        modules={modules}
                        activeTaskId={undefined}
                        openModuleIds={openModuleIds}
                        onOpenModulesChange={setOpenModuleIds}
                        onSelectTask={selectTask}
                      />
                    </Stack>
                  </Card>
                )
              ) : (
                <>
                  {showsAcknowledgement ? (
                    <Card
                      withBorder
                      radius='lg'
                      p={0}
                      style={{ overflow: 'hidden' }}
                    >
                      <TaskContentViewer
                        task={active.task}
                        courseAssignmentId={courseAssignmentId}
                        onFinished={handleContentFinished}
                        onNext={hasNext ? handleNext : undefined}
                        hasNext={hasNext}
                        nextTaskName={nextTaskName}
                        onBackToCourse={handleBackToCourseContent}
                        embedded
                      />
                      <TaskAcknowledgement
                        courseAssignmentId={courseAssignmentId}
                        task={active.task}
                        onAcknowledged={handleAcknowledged}
                      />
                    </Card>
                  ) : (
                    <TaskContentViewer
                      task={active.task}
                      courseAssignmentId={courseAssignmentId}
                      onFinished={handleContentFinished}
                      onNext={hasNext ? handleNext : undefined}
                      hasNext={hasNext}
                      nextTaskName={nextTaskName}
                      onBackToCourse={handleBackToCourseContent}
                    />
                  )}

                  <Card withBorder radius='lg' p={{ base: 'md', sm: 'lg' }}>
                    <Stack gap='sm'>
                      <Stack gap={4}>
                        <Text size='xs' c={themeConfig.mutedTextColor}>
                          {active.moduleName} · Item{' '}
                          {active.moduleTaskIndex + 1} of{' '}
                          {active.moduleTaskCount}
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
                          <Tooltip
                            label={
                              needsAcknowledgement
                                ? 'Acknowledge this document to continue'
                                : 'Previous item'
                            }
                            withArrow
                          >
                            <CommonButton
                              variant='default'
                              disabled={
                                activeIndex <= 0 || needsAcknowledgement
                              }
                              leftSection={<IconChevronLeft size={16} />}
                              onClick={() => goTo(activeIndex - 1)}
                            >
                              Previous
                            </CommonButton>
                          </Tooltip>
                          <Tooltip
                            label={
                              needsAcknowledgement
                                ? 'Acknowledge this document to continue'
                                : 'Next item'
                            }
                            withArrow
                          >
                            <CommonButton
                              variant='default'
                              disabled={
                                activeIndex >= flatTasks.length - 1 ||
                                needsAcknowledgement
                              }
                              rightSection={<IconChevronRight size={16} />}
                              onClick={() => goTo(activeIndex + 1)}
                            >
                              Next
                            </CommonButton>
                          </Tooltip>
                        </Group>

                        {isQuizTask(active.task) ? (
                          active.task.isCompleted &&
                          hasNext && (
                            <CommonButton
                              color='teal'
                              rightSection={<IconChevronRight size={16} />}
                              onClick={handleNext}
                            >
                              Next Task{nextTaskName ? `: ${nextTaskName}` : ''}
                            </CommonButton>
                          )
                        ) : active.task.isCompleted ? (
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
                          <Tooltip
                            label='Acknowledge this document to continue'
                            withArrow
                            disabled={!needsAcknowledgement}
                          >
                            <CommonButton
                              loading={isPending}
                              disabled={needsAcknowledgement}
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
                          </Tooltip>
                        )}
                      </Group>
                    </Stack>
                  </Card>
                </>
              )}
            </Stack>

            {!isMobile && active && showCurriculum && (
              <Box
                style={{
                  width: 360,
                  flexShrink: 0,
                  position: 'sticky',
                  top: 80,
                  maxHeight: 'calc(100vh - 100px)',
                  overflowY: 'auto'
                }}
              >
                <Text fw={600} mb='xs'>
                  Course content
                </Text>
                {curriculum}
              </Box>
            )}
          </Group>
        </Stack>

        <Drawer
          opened={isMobile && showCurriculum && curriculumOpen}
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
