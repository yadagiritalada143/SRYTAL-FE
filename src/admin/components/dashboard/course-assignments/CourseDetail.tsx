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
  Center
} from '@mantine/core';
import {
  IconArrowLeft,
  IconBook,
  IconLayersSubtract,
  IconListCheck,
  IconLink,
  IconFile,
  IconExternalLink
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppTheme } from '@hooks/use-app-theme';
import { useGetCourseByIdAdmin } from '@hooks/queries/useAdminQueries';
import { getCourseTaskContentUrl } from '@services/user-services';
import PremiumLoader from '@components/common/loaders/PremiumLoader';
import DataView from '@components/common/loaders/DataView';
import { Course, Module, Task } from '@interfaces/contentwriter';

const CourseDetail = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { themeConfig: currentThemeConfig, isDarkTheme } = useAppTheme();

  const { data: course, isLoading } = useGetCourseByIdAdmin(id) as {
    data?: Course;
    isLoading: boolean;
  };

  const modules: Module[] = course?.modules || [];
  const totalTasks = modules.reduce(
    (sum, m) => sum + (m.tasks?.length || 0),
    0
  );

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
                    Course details and content overview
                  </Text>
                </Stack>
              </Group>
              <Badge
                size={isMobile ? 'md' : 'lg'}
                variant='light'
                color={course?.status === 'ACTIVE' ? 'green' : 'blue'}
              >
                {course?.status || 'Draft'}
              </Badge>
            </Group>
            <Divider />
          </Stack>

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

          <Title order={3}>Modules</Title>

          {modules.length === 0 ? (
            <Card shadow='sm' p='xl' radius='md' withBorder>
              <Center>
                <Stack align='center' gap='xs'>
                  <ThemeIcon
                    size={48}
                    radius='xl'
                    variant='light'
                    color='gray'
                  >
                    <IconBook size={24} />
                  </ThemeIcon>
                  <Text c='dimmed' ta='center'>
                    No modules in this course yet.
                  </Text>
                </Stack>
              </Center>
            </Card>
          ) : (
            <Accordion variant='separated' radius='md' multiple>
              {modules.map(module => (
                <Accordion.Item key={module._id} value={module._id}>
                  <Accordion.Control>
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
                  <Accordion.Panel>
                    <Stack gap='sm'>
                      {module.tasks?.length ? (
                        module.tasks.map(task => (
                          <Paper
                            key={task._id}
                            p='sm'
                            radius='md'
                            withBorder
                            style={{
                              borderColor: currentThemeConfig.borderColor
                            }}
                          >
                            <Group
                              justify='space-between'
                              wrap='nowrap'
                            >
                              <Group
                                gap='sm'
                                wrap='nowrap'
                                style={{ minWidth: 0 }}
                              >
                                <ThemeIcon
                                  variant='light'
                                  radius='md'
                                  color={
                                    task.type === 'LINK' ? 'blue' : 'grape'
                                  }
                                >
                                  {task.type === 'LINK' ? (
                                    <IconLink size={18} />
                                  ) : (
                                    <IconFile size={18} />
                                  )}
                                </ThemeIcon>
                                <Stack gap={0} style={{ minWidth: 0 }}>
                                  <Group gap='xs' wrap='nowrap'>
                                    <Text fw={500} size='sm' lineClamp={1}>
                                      {task.taskName}
                                    </Text>
                                    {task.status === 'ARCHIVE' && (
                                      <Badge
                                        color='gray'
                                        radius='sm'
                                        variant='light'
                                        size='xs'
                                      >
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
                              <ActionIcon
                                variant='subtle'
                                size='lg'
                                color='gray'
                                style={{ flexShrink: 0 }}
                                onClick={() => handleViewContent(task)}
                                aria-label={`Open ${task.taskName}`}
                              >
                                <IconExternalLink size={18} />
                              </ActionIcon>
                            </Group>
                          </Paper>
                        ))
                      ) : (
                        <Text size='sm' c='dimmed'>
                          No content in this module.
                        </Text>
                      )}
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
        </Stack>
      </DataView>
    </Container>
  );
};

export default CourseDetail;
