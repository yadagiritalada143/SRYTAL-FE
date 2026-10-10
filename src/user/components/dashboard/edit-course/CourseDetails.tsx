import {
  Container,
  Card,
  Stack,
  Title,
  Text,
  Group,
  Box,
  ActionIcon,
  Badge,
  Paper,
  SimpleGrid,
  ThemeIcon,
  Center,
  Tooltip,
  Modal,
  Collapse,
  UnstyledButton
} from '@mantine/core';
import {
  IconArrowLeft,
  IconPlus,
  IconBook,
  IconLayersSubtract,
  IconListCheck,
  IconExternalLink,
  IconEdit,
  IconCode,
  IconFileText,
  IconCheck,
  IconChevronDown,
  IconCornerDownRight
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppTheme } from '@hooks/use-app-theme';
import { useGetCourseById } from '@hooks/queries/useUserQueries';
import { getCourseTaskContentUrl } from '@services/user-services';
import { CommonButton } from '@components/common/button/CommonButton';
import PremiumLoader from '@components/common/loaders/PremiumLoader';
import DataView from '@components/common/loaders/DataView';
import { Course, Module, Task } from '@interfaces/contentwriter';
import AddModuleModal from './AddModuleModal';
import AddTaskModal from './AddTaskModal';
import EditCourseModal from './EditCourseModal';
import EditModuleModal from './EditModuleModal';
import EditTaskModal from './EditTaskModal';
import CourseThumbnail from '../content-writer/CourseThumbnail';
import { readTaskPopupState, clearTaskPopupState } from './task-popup-state';

const stripHtml = (html?: string): string =>
  (html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#160;/gi, ' ')
    .replace(/\u00A0/g, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();

const CourseDetails = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { themeConfig: currentThemeConfig } = useAppTheme();

  const { data: course, isLoading } = useGetCourseById(id) as {
    data?: Course;
    isLoading: boolean;
  };

  const [moduleModalOpen, setModuleModalOpen] = useState(false);
  const [taskModalModuleId, setTaskModalModuleId] = useState<string | null>(
    null
  );
  const [courseEditOpen, setCourseEditOpen] = useState(false);
  const [moduleToEdit, setModuleToEdit] = useState<Module | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToView, setTaskToView] = useState<Task | null>(null);

  const [expandedModules, setExpandedModules] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const pending = readTaskPopupState();
    clearTaskPopupState();
    if (pending && pending.courseId === id) {
      setTaskModalModuleId(pending.moduleId);
      setExpandedModules(prev => ({ ...prev, [pending.moduleId]: true }));
    }
  }, [id]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const modules: Module[] = course?.modules || [];
  const totalTasks = modules.reduce(
    (sum, m) => sum + (m.tasks?.length || 0),
    0
  );

  const handleViewContent = (task: Task) => {
    if (task.isCoding || task.type === 'CODE') {
      setTaskToView(task);
      return;
    }
    window.open(getCourseTaskContentUrl(task._id), '_blank', 'noopener');
  };

  if (isLoading) {
    return (
      <Center h={400}>
        <PremiumLoader label='Loading course...' />
      </Center>
    );
  }

  const stats = [
    {
      icon: <IconBook size={18} />,
      label: 'Modules',
      value: modules.length,
      color: 'indigo'
    },
    {
      icon: <IconListCheck size={18} />,
      label: 'Task Items',
      value: totalTasks,
      color: 'pink'
    },
    {
      icon: <IconLayersSubtract size={18} />,
      label: 'Status',
      value: course?.status || 'N/A',
      color: course?.status === 'ACTIVE' ? 'teal' : 'blue'
    }
  ];

  return (
    <Container
      size='lg'
      py={{ base: 'sm', sm: 'md' }}
      px={{ base: 'xs', sm: 'md' }}
    >
      <DataView isLoading={false} label='course' isEmpty={!course}>
        <Stack gap='md'>
          <Card
            shadow='sm'
            p={{ base: 'md', sm: 'lg' }}
            radius='md'
            withBorder
            style={{
              backgroundColor: currentThemeConfig.cardBackground,
              borderColor: currentThemeConfig.borderColor,
              color: currentThemeConfig.color
            }}
          >
            <Stack gap='md'>
              <Group
                justify='space-between'
                align='center'
                wrap='wrap'
                gap='sm'
              >
                <CommonButton
                  leftSection={<IconArrowLeft size={16} />}
                  variant='default'
                  size='xs'
                  onClick={() => navigate(-1)}
                >
                  Back
                </CommonButton>
                <Group gap='xs' wrap='wrap'>
                  <Badge
                    size={isMobile ? 'sm' : 'md'}
                    radius='sm'
                    variant='light'
                    color={course?.status === 'ACTIVE' ? 'teal' : 'blue'}
                    leftSection={<IconCheck size={12} />}
                  >
                    {course?.status || 'Draft'}
                  </Badge>
                  <CommonButton
                    leftSection={<IconEdit size={14} />}
                    onClick={() => setCourseEditOpen(true)}
                    disabled={!course}
                    size='xs'
                  >
                    Edit Course
                  </CommonButton>
                </Group>
              </Group>

              <Group
                gap='md'
                align='center'
                wrap='nowrap'
                style={{ minWidth: 0 }}
              >
                {course && (
                  <CourseThumbnail
                    name={course.courseName}
                    src={course.thumbnailUrl || course.thumbnail}
                    size={isMobile ? 54 : 64}
                    radius='md'
                  />
                )}
                <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
                  <Title
                    order={isMobile ? 3 : 2}
                    style={{
                      color: currentThemeConfig.color,
                      lineHeight: 1.2
                    }}
                  >
                    {course?.courseName}
                  </Title>
                  <Text size={isMobile ? 'xs' : 'sm'} c='dimmed' lineClamp={1}>
                    Manage modules and content for this course
                  </Text>
                </Stack>
              </Group>
            </Stack>
          </Card>

          <Group grow wrap='wrap' gap='sm'>
            {stats.map(item => (
              <Paper
                key={item.label}
                p='sm'
                radius='md'
                withBorder
                style={{
                  backgroundColor: currentThemeConfig.cardBackground,
                  borderColor: currentThemeConfig.borderColor,
                  flex: isMobile ? '1 1 100%' : 1
                }}
              >
                <Group gap='xs' justify='space-between' align='center'>
                  <Group gap='sm'>
                    <ThemeIcon
                      size={32}
                      radius='md'
                      color={item.color}
                      variant='light'
                    >
                      {item.icon}
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text size='xs' c='dimmed' fw={500}>
                        {item.label}
                      </Text>
                      <Text
                        fw={700}
                        size='md'
                        style={{ color: currentThemeConfig.color }}
                      >
                        {item.value}
                      </Text>
                    </Stack>
                  </Group>
                </Group>
              </Paper>
            ))}
          </Group>

          {course?.courseDescription && (
            <Card
              shadow='sm'
              p='md'
              radius='md'
              withBorder
              style={{
                backgroundColor: currentThemeConfig.cardBackground,
                borderColor: currentThemeConfig.borderColor
              }}
            >
              <Text
                fw={600}
                size='sm'
                mb='xs'
                style={{ color: currentThemeConfig.color }}
              >
                About this course
              </Text>
              <Paper
                p='sm'
                radius='md'
                style={{
                  backgroundColor: currentThemeConfig.headerBackgroundColor,
                  border: `1px solid ${currentThemeConfig.borderColor}`
                }}
              >
                <Box
                  style={{
                    color: currentThemeConfig.color,
                    fontSize: isMobile ? '13px' : '14px',
                    lineHeight: 1.5
                  }}
                  dangerouslySetInnerHTML={{
                    __html: course.courseDescription
                  }}
                />
              </Paper>
            </Card>
          )}

          <Paper
            p='md'
            radius='md'
            withBorder
            style={{
              backgroundColor: currentThemeConfig.cardBackground,
              borderColor: currentThemeConfig.borderColor
            }}
          >
            <Group justify='space-between' align='center' wrap='wrap' gap='xs'>
              <Stack gap={2}>
                <Group gap='xs' align='center'>
                  <ThemeIcon
                    size={28}
                    radius='md'
                    variant='light'
                    color='indigo'
                  >
                    <IconBook size={16} />
                  </ThemeIcon>
                  <Title
                    order={3}
                    style={{
                      color: currentThemeConfig.color,
                      fontSize: '1.15rem'
                    }}
                  >
                    Modules
                  </Title>
                </Group>
                <Text size='xs' c='dimmed'>
                  Course curriculum modules and task breakdown
                </Text>
              </Stack>
              <CommonButton
                leftSection={<IconPlus size={14} />}
                onClick={() => setModuleModalOpen(true)}
                size='xs'
              >
                Add Module
              </CommonButton>
            </Group>
          </Paper>

          {/* Parent Modules + Nested Tasks Hierarchy */}
          {modules.length === 0 ? (
            <Card
              shadow='sm'
              p='xl'
              radius='md'
              withBorder
              style={{
                backgroundColor: currentThemeConfig.cardBackground,
                borderColor: currentThemeConfig.borderColor
              }}
            >
              <Center py='lg'>
                <Stack align='center' gap='sm'>
                  <ThemeIcon
                    size={48}
                    radius='xl'
                    variant='light'
                    color='indigo'
                  >
                    <IconBook size={24} />
                  </ThemeIcon>
                  <Stack gap={4} align='center'>
                    <Text
                      fw={600}
                      size='sm'
                      style={{ color: currentThemeConfig.color }}
                    >
                      No modules created
                    </Text>
                    <Text c='dimmed' size='xs' ta='center' maw={400}>
                      No modules yet. Add your first module to start building
                      this course.
                    </Text>
                  </Stack>
                  <CommonButton
                    leftSection={<IconPlus size={14} />}
                    onClick={() => setModuleModalOpen(true)}
                    size='xs'
                    variant='light'
                  >
                    Add Module
                  </CommonButton>
                </Stack>
              </Center>
            </Card>
          ) : (
            <Stack gap='lg'>
              {modules.map((module, index) => {
                const isExpanded = Boolean(expandedModules[module._id]);

                return (
                  <Card
                    key={module._id}
                    shadow='sm'
                    p={0}
                    radius='lg'
                    withBorder
                    style={{
                      backgroundColor: currentThemeConfig.cardBackground,
                      borderColor: currentThemeConfig.borderColor,
                      overflow: 'hidden',
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <Box
                      p='md'
                      style={{
                        backgroundColor: currentThemeConfig.cardBackground,
                        borderLeft: '5px solid var(--mantine-color-indigo-6)',
                        transition: 'background-color 0.2s ease'
                      }}
                    >
                      <Stack gap='xs'>
                        <Group
                          justify='space-between'
                          align='center'
                          wrap='nowrap'
                        >
                          <Group
                            gap='sm'
                            align='center'
                            style={{ minWidth: 0, flex: 1 }}
                          >
                            <Badge
                              size='md'
                              variant='filled'
                              color='indigo'
                              radius='sm'
                              style={{ fontWeight: 700, flexShrink: 0 }}
                            >
                              MODULE {String(index + 1).padStart(2, '0')}
                            </Badge>
                            <CourseThumbnail
                              name={module.moduleName}
                              src={module.thumbnailUrl || module.thumbnail}
                              size={36}
                              radius='sm'
                            />
                            <UnstyledButton
                              onClick={() => toggleModule(module._id)}
                              style={{
                                minWidth: 0,
                                flex: 1,
                                textAlign: 'left'
                              }}
                            >
                              <Text
                                fw={700}
                                size='md'
                                lineClamp={1}
                                style={{ color: currentThemeConfig.color }}
                              >
                                {module.moduleName}
                              </Text>
                            </UnstyledButton>
                          </Group>

                          <Group
                            gap='xs'
                            wrap='nowrap'
                            style={{ flexShrink: 0 }}
                          >
                            {module.status === 'ARCHIVE' && (
                              <Badge
                                color='gray'
                                radius='sm'
                                variant='light'
                                size='xs'
                              >
                                Archived
                              </Badge>
                            )}
                            <Badge
                              variant='light'
                              color='blue'
                              radius='sm'
                              size='sm'
                              leftSection={<IconListCheck size={12} />}
                            >
                              {module.tasks?.length || 0} items
                            </Badge>
                            <Tooltip label='Edit module' withArrow>
                              <ActionIcon
                                variant='subtle'
                                color='gray'
                                size='md'
                                aria-label={`Edit ${module.moduleName}`}
                                onClick={() => setModuleToEdit(module)}
                              >
                                <IconEdit size={16} />
                              </ActionIcon>
                            </Tooltip>
                            <ActionIcon
                              variant='subtle'
                              color='gray'
                              size='md'
                              aria-label={
                                isExpanded ? 'Collapse module' : 'Expand module'
                              }
                              onClick={() => toggleModule(module._id)}
                              style={{
                                transform: isExpanded
                                  ? 'rotate(180deg)'
                                  : 'rotate(0deg)',
                                transition:
                                  'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                              }}
                            >
                              <IconChevronDown size={18} />
                            </ActionIcon>
                          </Group>
                        </Group>

                        {stripHtml(module.moduleDescription) && (
                          <Text
                            size='xs'
                            c='dimmed'
                            style={{
                              lineHeight: 1.5,
                              wordBreak: 'break-word',
                              paddingLeft: 4
                            }}
                          >
                            {stripHtml(module.moduleDescription)}
                          </Text>
                        )}
                      </Stack>
                    </Box>

                    <Collapse
                      in={isExpanded}
                      transitionDuration={300}
                      transitionTimingFunction='cubic-bezier(0.4, 0, 0.2, 1)'
                      keepMounted
                    >
                      <Box
                        p='md'
                        style={{
                          backgroundColor:
                            currentThemeConfig.headerBackgroundColor,
                          borderTop: `1px solid ${currentThemeConfig.borderColor}`
                        }}
                      >
                        <Box
                          style={{
                            borderLeft:
                              '2px dashed var(--mantine-color-indigo-4)',
                            paddingLeft: 12,
                            marginLeft: 4
                          }}
                        >
                          <Stack gap='sm'>
                            <Group justify='space-between' align='center'>
                              <Group gap={6} align='center'>
                                <IconCornerDownRight
                                  size={14}
                                  style={{
                                    color: 'var(--mantine-color-indigo-5)'
                                  }}
                                />
                                <Text
                                  fw={700}
                                  size='xs'
                                  c='dimmed'
                                  tt='uppercase'
                                  style={{ letterSpacing: '0.05em' }}
                                >
                                  Tasks in this Module (
                                  {module.tasks?.length || 0})
                                </Text>
                              </Group>

                              <CommonButton
                                variant='light'
                                size='xs'
                                leftSection={<IconPlus size={12} />}
                                onClick={() => setTaskModalModuleId(module._id)}
                              >
                                Add Task
                              </CommonButton>
                            </Group>

                            {module.tasks?.length ? (
                              <SimpleGrid
                                cols={{ base: 1, sm: 2, md: 3 }}
                                spacing='sm'
                              >
                                {module.tasks.map((task, taskIndex) => (
                                  <TaskRow
                                    key={task._id}
                                    task={task}
                                    moduleIndex={index + 1}
                                    taskIndex={taskIndex + 1}
                                    onView={() => handleViewContent(task)}
                                    onEdit={() => setTaskToEdit(task)}
                                    borderColor={currentThemeConfig.borderColor}
                                    cardBg={currentThemeConfig.cardBackground}
                                    textColor={currentThemeConfig.color}
                                  />
                                ))}
                              </SimpleGrid>
                            ) : (
                              <Paper
                                p='md'
                                radius='md'
                                withBorder
                                style={{
                                  borderColor: currentThemeConfig.borderColor,
                                  backgroundColor:
                                    currentThemeConfig.cardBackground,
                                  textAlign: 'center'
                                }}
                              >
                                <Text size='xs' c='dimmed'>
                                  No tasks in this module yet.
                                </Text>
                              </Paper>
                            )}
                          </Stack>
                        </Box>
                      </Box>
                    </Collapse>
                  </Card>
                );
              })}
            </Stack>
          )}
        </Stack>
      </DataView>

      <AddModuleModal
        opened={moduleModalOpen}
        onClose={() => setModuleModalOpen(false)}
        courseId={id}
      />
      <AddTaskModal
        opened={!!taskModalModuleId}
        onClose={() => setTaskModalModuleId(null)}
        moduleId={taskModalModuleId || ''}
        courseId={id}
      />
      <EditCourseModal
        opened={courseEditOpen}
        onClose={() => setCourseEditOpen(false)}
        course={course}
      />
      <EditModuleModal
        opened={!!moduleToEdit}
        onClose={() => setModuleToEdit(null)}
        module={moduleToEdit || undefined}
        courseId={id}
      />
      <EditTaskModal
        opened={!!taskToEdit}
        onClose={() => setTaskToEdit(null)}
        task={taskToEdit || undefined}
        courseId={id}
      />
      <Modal
        opened={!!taskToView}
        onClose={() => setTaskToView(null)}
        title='Coding Question'
        centered
      >
        <Stack gap='sm' className='mt-4'>
          <Text fw={600}>{taskToView?.taskName}</Text>
          <Paper
            p='md'
            radius='md'
            withBorder
            style={{ borderColor: currentThemeConfig.borderColor }}
          >
            <Text size='sm' style={{ whiteSpace: 'pre-wrap' }}>
              {taskToView?.question ||
                taskToView?.taskName ||
                'No question provided.'}
            </Text>
          </Paper>
          <Group justify='flex-end'>
            <CommonButton variant='default' onClick={() => setTaskToView(null)}>
              Close
            </CommonButton>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};

interface TaskRowProps {
  task: Task;
  moduleIndex: number;
  taskIndex: number;
  onView: () => void;
  onEdit: () => void;
  borderColor: string;
  cardBg: string;
  textColor: string;
}

const TaskRow = ({
  task,
  moduleIndex,
  taskIndex,
  onView,
  onEdit,
  borderColor,
  cardBg,
  textColor
}: TaskRowProps) => {
  const getStatusBadge = () => {
    if (!task.status) return null;
    const statusUpper = task.status.toUpperCase();
    if (statusUpper === 'ARCHIVE' || statusUpper === 'ARCHIVED') {
      return (
        <Badge color='gray' radius='sm' variant='light' size='xs'>
          Archived
        </Badge>
      );
    }
    if (statusUpper === 'ACTIVE') {
      return (
        <Badge color='teal' radius='sm' variant='light' size='xs'>
          Active
        </Badge>
      );
    }
    return (
      <Badge color='blue' radius='sm' variant='light' size='xs'>
        {task.status}
      </Badge>
    );
  };

  return (
    <Card
      p='sm'
      radius='md'
      withBorder
      style={{
        borderColor,
        backgroundColor: cardBg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <Stack gap='xs' justify='space-between' style={{ height: '100%' }}>
        <Stack gap='xs'>
          <Group justify='space-between' align='center'>
            <Group gap='xs'>
              <Badge
                variant='outline'
                color='indigo'
                size='xs'
                radius='sm'
                style={{ fontWeight: 700 }}
              >
                {moduleIndex}.{taskIndex}
              </Badge>
              <ThemeIcon
                size={26}
                radius='sm'
                variant='light'
                color={task.isCoding ? 'grape' : 'indigo'}
              >
                {task.isCoding ? (
                  <IconCode size={14} />
                ) : (
                  <IconFileText size={14} />
                )}
              </ThemeIcon>
              {task.isCoding && (
                <Badge color='grape' radius='sm' variant='light' size='xs'>
                  Coding
                </Badge>
              )}
              {getStatusBadge()}
            </Group>

            <Tooltip label='Edit task' withArrow>
              <ActionIcon
                variant='subtle'
                color='gray'
                size='sm'
                aria-label={`Edit ${task.taskName}`}
                onClick={onEdit}
              >
                <IconEdit size={14} />
              </ActionIcon>
            </Tooltip>
          </Group>

          <Group
            gap='xs'
            align='flex-start'
            wrap='nowrap'
            style={{ minWidth: 0 }}
          >
            <CourseThumbnail
              name={task.taskName}
              src={task.thumbnailUrl || task.thumbnail}
              size={34}
              radius='sm'
            />
            <Stack gap={2} style={{ minWidth: 0 }}>
              <Text
                fw={600}
                size='sm'
                lineClamp={1}
                style={{ color: textColor }}
              >
                {task.taskName}
              </Text>
              {stripHtml(task.taskDescription) && (
                <Text size='xs' c='dimmed' lineClamp={2}>
                  {stripHtml(task.taskDescription)}
                </Text>
              )}
            </Stack>
          </Group>
        </Stack>

        <Group
          justify='flex-end'
          pt='xs'
          style={{ borderTop: `1px solid ${borderColor}` }}
        >
          <CommonButton
            variant='light'
            size='xs'
            rightSection={<IconExternalLink size={12} />}
            onClick={onView}
          >
            Open
          </CommonButton>
        </Group>
      </Stack>
    </Card>
  );
};

export default CourseDetails;
