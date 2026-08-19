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
  Divider,
  Paper,
  Accordion,
  ThemeIcon,
  Center,
  Tooltip
} from '@mantine/core';
import {
  IconArrowLeft,
  IconPlus,
  IconBook,
  IconLayersSubtract,
  IconListCheck,
  IconLink,
  IconFile,
  IconExternalLink,
  IconEdit
} from '@tabler/icons-react';
import { useState } from 'react';
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

const CourseDetails = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { themeConfig: currentThemeConfig, isDarkTheme } = useAppTheme();

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

  const modules: Module[] = course?.modules || [];
  const totalTasks = modules.reduce(
    (sum, m) => sum + (m.tasks?.length || 0),
    0
  );

  // Opening goes through the backend, which redirects to the link or streams
  // the uploaded file inline. Always opened in a fresh browser tab.
  const handleViewContent = (task: Task) => {
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
      icon: <IconBook size={20} />,
      label: 'Modules',
      value: modules.length,
      color: 'indigo'
    },
    {
      icon: <IconListCheck size={20} />,
      label: 'Content Items',
      value: totalTasks,
      color: 'pink'
    },
    {
      icon: <IconLayersSubtract size={20} />,
      label: 'Status',
      value: course?.status || 'N/A',
      color: 'teal'
    }
  ];

  return (
    <Container
      size='lg'
      py={{ base: 'md', sm: 'xl' }}
      px={{ base: 'xs', sm: 'md' }}
    >
      <DataView isLoading={false} label='course' isEmpty={!course}>
        <Stack gap='lg'>
          {/* Header */}
          <Stack gap='sm'>
            <Group justify='space-between' align='flex-start' wrap='wrap'>
              <Group gap='sm' align='flex-start' style={{ flex: 1 }}>
                <ActionIcon
                  variant='subtle'
                  color='gray'
                  size={isMobile ? 'md' : 'lg'}
                  onClick={() => navigate(-1)}
                  mt={{ base: 4, sm: 0 }}
                >
                  <IconArrowLeft size={isMobile ? 18 : 20} />
                </ActionIcon>
                <Stack gap={4} style={{ flex: 1 }}>
                  <Title order={isMobile ? 2 : 1}>{course?.courseName}</Title>
                  <Text size={isMobile ? 'xs' : 'sm'} c='dimmed'>
                    Manage modules and content for this course
                  </Text>
                </Stack>
              </Group>
              <Group gap='sm' mt={{ base: 'xs', sm: 0 }} wrap='nowrap'>
                <Badge
                  size={isMobile ? 'md' : 'lg'}
                  variant='light'
                  color={course?.status === 'ACTIVE' ? 'green' : 'blue'}
                >
                  {course?.status || 'Draft'}
                </Badge>
                <CommonButton
                  leftSection={<IconEdit size={16} />}
                  onClick={() => setCourseEditOpen(true)}
                  disabled={!course}
                >
                  Edit Course
                </CommonButton>
              </Group>
            </Group>
            <Divider />
          </Stack>

          {/* Stats */}
          <Group grow={!isMobile} wrap='wrap'>
            {stats.map(item => (
              <Card
                key={item.label}
                shadow='sm'
                p='md'
                radius='md'
                withBorder
                style={{ flex: isMobile ? '1 1 100%' : 1 }}
              >
                <Group gap='sm'>
                  <ThemeIcon
                    size={42}
                    radius='md'
                    color={item.color}
                    variant='light'
                  >
                    {item.icon}
                  </ThemeIcon>
                  <Stack gap={0}>
                    <Text size='xs' c='dimmed'>
                      {item.label}
                    </Text>
                    <Text fw={700} size='lg'>
                      {item.value}
                    </Text>
                  </Stack>
                </Group>
              </Card>
            ))}
          </Group>

          {/* Description */}
          {course?.courseDescription && (
            <Card
              shadow='sm'
              p={{ base: 'md', sm: 'lg' }}
              radius='md'
              withBorder
            >
              <Text fw={600} mb='sm'>
                About this course
              </Text>
              <Paper
                p={{ base: 'sm', sm: 'md' }}
                radius='md'
                style={{
                  backgroundColor: isDarkTheme ? '#1a1b1e' : '#f8f9fa',
                  border: `1px solid ${currentThemeConfig.borderColor}`
                }}
              >
                <Box
                  style={{
                    color: currentThemeConfig.color,
                    fontSize: isMobile ? '14px' : '15px',
                    lineHeight: 1.6
                  }}
                  dangerouslySetInnerHTML={{
                    __html: course.courseDescription
                  }}
                />
              </Paper>
            </Card>
          )}

          {/* Modules + Content */}
          <Group justify='space-between' align='center' wrap='wrap'>
            <Title order={3}>Modules</Title>
            <CommonButton
              leftSection={<IconPlus size={16} />}
              onClick={() => setModuleModalOpen(true)}
            >
              Add Module
            </CommonButton>
          </Group>

          {modules.length === 0 ? (
            <Card shadow='sm' p='xl' radius='md' withBorder>
              <Center>
                <Stack align='center' gap='xs'>
                  <ThemeIcon size={48} radius='xl' variant='light' color='gray'>
                    <IconBook size={24} />
                  </ThemeIcon>
                  <Text c='dimmed' ta='center'>
                    No modules yet. Add your first module to start building this
                    course.
                  </Text>
                </Stack>
              </Center>
            </Card>
          ) : (
            <Accordion variant='separated' radius='md' multiple>
              {modules.map(module => (
                <Accordion.Item key={module._id} value={module._id}>
                  {/* The edit control sits beside Accordion.Control rather
                      than inside it, so it is not a button within a button. */}
                  <Center>
                    <Accordion.Control style={{ flex: 1, minWidth: 0 }}>
                      <Group justify='space-between' wrap='nowrap' pr='sm'>
                        <Stack gap={2} style={{ minWidth: 0 }}>
                          <Text fw={600} lineClamp={1}>
                            {module.moduleName}
                          </Text>
                          {module.moduleDescription && (
                            <Text size='xs' c='dimmed' lineClamp={1}>
                              {module.moduleDescription}
                            </Text>
                          )}
                        </Stack>
                        <Group gap='xs' wrap='nowrap' style={{ flexShrink: 0 }}>
                          {module.status === 'ARCHIVE' && (
                            <Badge color='gray' radius='sm' variant='light'>
                              Archived
                            </Badge>
                          )}
                          <Badge variant='gradient' radius='sm'>
                            {module.tasks?.length || 0} items
                          </Badge>
                        </Group>
                      </Group>
                    </Accordion.Control>
                    <Tooltip label='Edit module' withArrow>
                      <ActionIcon
                        variant='subtle'
                        color='gray'
                        size='lg'
                        mr='xs'
                        aria-label={`Edit ${module.moduleName}`}
                        onClick={() => setModuleToEdit(module)}
                      >
                        <IconEdit size={18} />
                      </ActionIcon>
                    </Tooltip>
                  </Center>
                  <Accordion.Panel>
                    <Stack gap='sm'>
                      {module.tasks?.length ? (
                        module.tasks.map(task => (
                          <TaskRow
                            key={task._id}
                            task={task}
                            onView={() => handleViewContent(task)}
                            onEdit={() => setTaskToEdit(task)}
                            borderColor={currentThemeConfig.borderColor}
                          />
                        ))
                      ) : (
                        <Text size='sm' c='dimmed'>
                          No content in this module yet.
                        </Text>
                      )}
                      <CommonButton
                        variant='light'
                        size='xs'
                        leftSection={<IconPlus size={14} />}
                        onClick={() => setTaskModalModuleId(module._id)}
                        style={{ width: 'fit-content' }}
                      >
                        Add Content
                      </CommonButton>
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
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
    </Container>
  );
};

interface TaskRowProps {
  task: Task;
  onView: () => void;
  onEdit: () => void;
  borderColor: string;
}

const TaskRow = ({ task, onView, onEdit, borderColor }: TaskRowProps) => {
  const isLink = task.type === 'LINK';
  return (
    <Paper p='sm' radius='md' withBorder style={{ borderColor }}>
      <Group justify='space-between' wrap='nowrap'>
        <Group gap='sm' wrap='nowrap' style={{ minWidth: 0 }}>
          <ThemeIcon
            variant='light'
            radius='md'
            color={isLink ? 'blue' : 'grape'}
          >
            {isLink ? <IconLink size={18} /> : <IconFile size={18} />}
          </ThemeIcon>
          <Stack gap={0} style={{ minWidth: 0 }}>
            <Group gap='xs' wrap='nowrap'>
              <Text fw={500} size='sm' lineClamp={1}>
                {task.taskName}
              </Text>
              {task.status === 'ARCHIVE' && (
                <Badge color='gray' radius='sm' variant='light' size='xs'>
                  Archived
                </Badge>
              )}
            </Group>
            {task.taskDescription && (
              <Text size='xs' c='dimmed' lineClamp={1}>
                {task.taskDescription}
              </Text>
            )}
          </Stack>
        </Group>
        <Group gap={4} wrap='nowrap' style={{ flexShrink: 0 }}>
          <CommonButton
            variant='subtle'
            size='xs'
            rightSection={<IconExternalLink size={14} />}
            onClick={onView}
          >
            Open
          </CommonButton>
          <Tooltip label='Edit content' withArrow>
            <ActionIcon
              variant='subtle'
              color='gray'
              aria-label={`Edit ${task.taskName}`}
              onClick={onEdit}
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </Paper>
  );
};

export default CourseDetails;
