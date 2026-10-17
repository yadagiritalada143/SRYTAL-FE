import {
  Box,
  Card,
  Center,
  Container,
  Divider,
  Grid,
  Group,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
  ActionIcon,
  Pagination,
  Badge,
  Modal,
  Paper,
  Tabs
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconBook,
  IconLayersSubtract,
  IconListCheck,
  IconPlus,
  IconSearch,
  IconX,
  IconClock,
  IconPencil,
  IconArchive
} from '@tabler/icons-react';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { commonUrls } from '@utils/common/constants';
import { useAppTheme } from '@hooks/use-app-theme';
import { useGetAllCoursesByUser } from '@hooks/queries/useUserQueries';
import { useUpdateCourse } from '@hooks/mutations/useUserMutations';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import { Course } from '@interfaces/contentwriter';
import { CommonButton } from '@components/common/button/CommonButton';
import CourseCard from './CourseCard';
import CourseThumbnail from './CourseThumbnail';
import EditCourseModal from '../edit-course/EditCourseModal';
import ArchiveCourseModal from './ArchiveCourseModal';
import CloneCourseModal from './CloneCourseModal';

const COURSES_PER_PAGE = 6;

const WriterDashboard = () => {
  const { themeConfig, organizationConfig, isDarkTheme } = useAppTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [, setCourseToDelete] = useState<string | null>(null);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');
  const [courseToArchive, setCourseToArchive] = useState<{
    course: Course;
    mode: 'archive' | 'activate';
  } | null>(null);
  const [courseToClone, setCourseToClone] = useState<Course | null>(null);
  const [isArchiving, setIsArchiving] = useState(false);

  const { data: courses = [], isLoading } = useGetAllCoursesByUser();
  const { mutateAsync: updateCourse } = useUpdateCourse();
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const courseList: Course[] = Array.isArray(courses)
      ? courses
      : (courses as any)?.courses || [];

    const totalCourses = courseList.length;
    const totalActiveCourses = courseList.filter(
      (c: Course) => (c.status || '').toUpperCase() === 'ACTIVE'
    ).length;
    const totalArchivedCourses = courseList.filter(
      (c: Course) => (c.status || '').toUpperCase() === 'ARCHIVE'
    ).length;

    let totalModules = 0;
    let totalActiveModules = 0;
    let totalArchivedModules = 0;

    let totalTasks = 0;
    let totalActiveTasks = 0;
    let totalInactiveTasks = 0;

    courseList.forEach((c: Course) => {
      (c.modules || []).forEach((m: any) => {
        totalModules++;
        if ((m.status || '').toUpperCase() === 'ARCHIVE') {
          totalArchivedModules++;
        } else {
          totalActiveModules++;
        }

        (m.tasks || []).forEach((t: any) => {
          totalTasks++;
          if (
            (t.status || '').toUpperCase() === 'INACTIVE' ||
            (t.status || '').toUpperCase() === 'ARCHIVE'
          ) {
            totalInactiveTasks++;
          } else {
            totalActiveTasks++;
          }
        });
      });
    });

    const beData = courses as any;
    return {
      totalCourses: beData?.totalCourses ?? totalCourses,
      totalActiveCourses: beData?.totalActiveCourses ?? totalActiveCourses,
      totalArchivedCourses:
        beData?.totalArchivedCourses ?? totalArchivedCourses,
      totalModules: beData?.totalModules ?? totalModules,
      totalActiveModules: beData?.totalActiveModules ?? totalActiveModules,
      totalArchivedModules:
        beData?.totalArchivedModules ?? totalArchivedModules,
      totalTasks: beData?.totalTasks ?? totalTasks,
      totalActiveTasks: beData?.totalActiveTasks ?? totalActiveTasks,
      totalInactiveTasks: beData?.totalInactiveTasks ?? totalInactiveTasks
    };
  }, [courses]);

  const sortedCourses = useMemo(
    () =>
      [...courses].sort((a: Course, b: Course) => {
        const da = new Date(a.updatedAt || a.createdAt || 0).getTime();
        const db = new Date(b.updatedAt || b.createdAt || 0).getTime();
        return db - da;
      }),
    [courses]
  );

  const recentActivity = useMemo(
    () => sortedCourses.slice(0, 6),
    [sortedCourses]
  );

  const tabCourses = useMemo(() => {
    return sortedCourses.filter((c: Course) => {
      const isArchived = (c.status || '').toUpperCase() === 'ARCHIVE';
      return activeTab === 'archived' ? isArchived : !isArchived;
    });
  }, [sortedCourses, activeTab]);

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return tabCourses;
    const q = searchQuery.toLowerCase();
    return tabCourses.filter(
      (c: Course) =>
        c.courseName.toLowerCase().includes(q) ||
        c.courseDescription?.toLowerCase().includes(q)
    );
  }, [tabCourses, searchQuery]);

  const { paginatedCourses, totalPages } = useMemo(() => {
    const start = (activePage - 1) * COURSES_PER_PAGE;
    return {
      paginatedCourses: filteredCourses.slice(start, start + COURSES_PER_PAGE),
      totalPages: Math.ceil(filteredCourses.length / COURSES_PER_PAGE)
    };
  }, [filteredCourses, activePage]);

  const handleEdit = (courseId: string) => {
    const course = courses.find((c: Course) => c._id === courseId);
    if (course) setCourseToEdit(course);
  };

  const handleDelete = (courseId: string) => {
    setCourseToDelete(courseId);
    setDeleteModalOpen(true);
  };

  const handleArchiveClick = (courseId: string) => {
    const course = courses.find((c: Course) => c._id === courseId);
    if (!course) return;
    const isArchived = (course.status || '').toUpperCase() === 'ARCHIVE';
    setCourseToArchive({
      course,
      mode: isArchived ? 'activate' : 'archive'
    });
  };

  const handleConfirmArchive = async (courseId: string) => {
    const course = courses.find((c: Course) => c._id === courseId);
    if (!course) return;
    const isArchived = (course.status || '').toUpperCase() === 'ARCHIVE';
    const nextStatus = isArchived ? 'ACTIVE' : 'ARCHIVE';
    setIsArchiving(true);
    try {
      await updateCourse({
        id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        status: nextStatus
      });
      showSuccessToast(
        isArchived
          ? 'Course activated successfully!'
          : 'Course archived successfully!'
      );
      setCourseToArchive(null);
    } catch (error) {
      showErrorToast(
        getErrorMessage(
          error,
          isArchived ? 'Failed to activate course' : 'Failed to archive course'
        )
      );
    } finally {
      setIsArchiving(false);
    }
  };

  const confirmDelete = () => {
    setDeleteModalOpen(false);
    setCourseToDelete(null);
  };

  const handleAddCourse = () => {
    navigate(
      `${commonUrls(organizationConfig.organization_name)}/dashboard/add-course`
    );
  };

  const goToCourse = (courseId: string) =>
    navigate(
      `${commonUrls(organizationConfig.organization_name)}/dashboard/course/${courseId}`
    );

  const statCards = [
    {
      label: 'Total Courses',
      value: stats.totalCourses,
      icon: <IconBook size={22} />,
      color: themeConfig.color,
      badges: (
        <Group gap={4} mt={4} wrap='wrap'>
          <Badge size='xs' variant='light' color='green'>
            {stats.totalActiveCourses} Active
          </Badge>
          <Badge size='xs' variant='light' color='orange'>
            {stats.totalArchivedCourses} Archived
          </Badge>
        </Group>
      )
    },
    {
      label: 'Archived Courses',
      value: stats.totalArchivedCourses,
      icon: <IconArchive size={22} />,
      color: 'orange',
      badges: (
        <Group gap={4} mt={4} wrap='wrap'>
          <Badge size='xs' variant='light' color='orange'>
            {stats.totalArchivedCourses} Total
          </Badge>
          <Badge size='xs' variant='light' color='green'>
            {stats.totalActiveCourses} Active
          </Badge>
        </Group>
      )
    },
    {
      label: 'Total Modules',
      value: stats.totalModules,
      icon: <IconLayersSubtract size={22} />,
      color: 'indigo',
      badges: (
        <Group gap={4} mt={4} wrap='wrap'>
          <Badge size='xs' variant='light' color='indigo'>
            {stats.totalActiveModules} Active
          </Badge>
          {stats.totalArchivedModules > 0 && (
            <Badge size='xs' variant='light' color='gray'>
              {stats.totalArchivedModules} Archived
            </Badge>
          )}
        </Group>
      )
    },
    {
      label: 'Total Tasks',
      value: stats.totalTasks,
      icon: <IconListCheck size={22} />,
      color: 'violet',
      badges: (
        <Group gap={4} mt={4} wrap='wrap'>
          <Badge size='xs' variant='light' color='violet'>
            {stats.totalActiveTasks} Active
          </Badge>
          {stats.totalInactiveTasks > 0 && (
            <Badge size='xs' variant='light' color='gray'>
              {stats.totalInactiveTasks} Inactive
            </Badge>
          )}
        </Group>
      )
    }
  ];

  if (isLoading) {
    return (
      <Container size='xl' pt={80} pb='xl'>
        <Skeleton height={120} radius='lg' mb='xl' />
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing='md' mb='xl'>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} height={105} radius='md' />
          ))}
        </SimpleGrid>
        <Grid gutter='xl'>
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <Skeleton height={48} radius='lg' mb='lg' />
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} height={280} radius='lg' />
              ))}
            </SimpleGrid>
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <Skeleton height={48} radius='lg' mb='lg' />
            <Card withBorder radius='lg' p='lg'>
              <Stack gap='md'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} height={52} radius='sm' />
                ))}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    );
  }

  return (
    <Container size='xl' pt={80} pb='xl'>
      {/* Page Header */}
      <Box
        mb='xl'
        p={isMobile ? 'md' : 'lg'}
        style={{
          backgroundImage: `linear-gradient(135deg, ${themeConfig.color}14 0%, ${themeConfig.color}06 100%)`,
          border: `1px solid ${themeConfig.color}28`,
          borderRadius: 'var(--mantine-radius-lg)'
        }}
      >
        <Group justify='space-between' align='center' wrap='wrap' gap='md'>
          <Stack gap={2}>
            <Title
              order={isMobile ? 4 : 2}
              style={{ color: themeConfig.color }}
            >
              Content Writer
            </Title>
            <Text size='sm' c='dimmed'>
              Create and manage your courses, modules, and tasks
            </Text>
          </Stack>
          <Group gap='sm' wrap='wrap'>
            <CommonButton
              variant='light'
              color='cyan'
              leftSection={<IconListCheck size={16} />}
              onClick={() =>
                navigate(
                  `${commonUrls(organizationConfig.organization_name)}/dashboard/quizzes`
                )
              }
            >
              Quizzes
            </CommonButton>
            <CommonButton
              leftSection={<IconPlus size={16} />}
              onClick={handleAddCourse}
            >
              New Course
            </CommonButton>
          </Group>
        </Group>
      </Box>

      {/* Stats */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing='md' mb='xl'>
        {statCards.map((s, i) => (
          <Card key={i} withBorder radius='md' p='md'>
            <Group gap='sm' wrap='nowrap' align='flex-start'>
              <ThemeIcon size={44} radius='md' variant='light' color={s.color}>
                {s.icon}
              </ThemeIcon>
              <Stack gap={2} style={{ minWidth: 0, flex: 1 }}>
                <Title order={3} lh={1}>
                  {s.value}
                </Title>
                <Text size='xs' c='dimmed' lineClamp={1}>
                  {s.label}
                </Text>
                {s.badges}
              </Stack>
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      {/* Main content */}
      <Grid gutter='xl'>
        {/* Courses section */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Card withBorder radius='lg' p='lg' h='100%'>
            <Group
              justify='space-between'
              align='center'
              wrap='wrap'
              gap='md'
              mb='md'
            >
              <Group gap='xs'>
                <IconPencil size={20} color={themeConfig.color} />
                <Text fw={600} size='lg'>
                  My Courses
                </Text>
              </Group>
              <TextInput
                placeholder='Search courses...'
                leftSection={<IconSearch size={14} />}
                rightSection={
                  searchQuery ? (
                    <ActionIcon
                      variant='subtle'
                      size='sm'
                      onClick={() => {
                        setSearchQuery('');
                        setActivePage(1);
                      }}
                      aria-label='Clear search'
                    >
                      <IconX size={14} />
                    </ActionIcon>
                  ) : null
                }
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setActivePage(1);
                }}
                size='sm'
                radius='md'
                w={{ base: '100%', sm: 240 }}
              />
            </Group>

            <Tabs
              value={activeTab}
              onChange={value => {
                if (value === 'active' || value === 'archived') {
                  setActiveTab(value);
                  setActivePage(1);
                }
              }}
              variant='default'
              color={themeConfig.button.color}
              classNames={{
                tab: 'settings-tab'
              }}
              styles={{
                list: {
                  flexWrap: isMobile ? 'wrap' : 'nowrap',
                  justifyContent: isMobile ? 'center' : 'flex-start',
                  gap: isMobile ? 8 : 0,
                  ...(isMobile
                    ? {}
                    : {
                        overflowX: 'auto',
                        scrollbarWidth: 'thin'
                      })
                },
                tab: {
                  fontWeight: 500,
                  flexShrink: 0,
                  transition: 'color 0.2s ease',
                  ...(isDarkTheme && {
                    color: themeConfig.color,
                    '&[data-active]': {
                      color: '#ffffff'
                    },
                    '&[data-active] svg': {
                      color: '#ffffff'
                    }
                  })
                }
              }}
              mb='md'
            >
              <Tabs.List>
                <Tabs.Tab
                  value='active'
                  leftSection={<IconBook size={16} stroke={1.8} />}
                  rightSection={
                    <Badge
                      size='xs'
                      radius='xl'
                      variant={activeTab === 'active' ? 'filled' : 'light'}
                      color='teal'
                      style={{ marginLeft: 6 }}
                    >
                      {stats.totalActiveCourses}
                    </Badge>
                  }
                >
                  Active Courses
                </Tabs.Tab>

                <Tabs.Tab
                  value='archived'
                  leftSection={<IconArchive size={16} stroke={1.8} />}
                  rightSection={
                    <Badge
                      size='xs'
                      radius='xl'
                      variant={activeTab === 'archived' ? 'filled' : 'light'}
                      color='orange'
                      style={{ marginLeft: 6 }}
                    >
                      {stats.totalArchivedCourses}
                    </Badge>
                  }
                >
                  Archived Courses
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>

            {activeTab === 'archived' && (
              <Paper
                p='sm'
                mb='md'
                radius='md'
                style={{
                  backgroundColor: isDarkTheme
                    ? 'rgba(245, 159, 0, 0.08)'
                    : '#fff9db',
                  border: '1px solid rgba(245, 159, 0, 0.35)',
                  transition: 'all 0.2s ease'
                }}
              >
                <Group
                  justify='space-between'
                  align='center'
                  wrap='wrap'
                  gap='xs'
                >
                  <Group gap='xs' wrap='nowrap'>
                    <ThemeIcon
                      size={28}
                      radius='md'
                      color='orange'
                      variant='light'
                      style={{ flexShrink: 0 }}
                    >
                      <IconArchive size={16} />
                    </ThemeIcon>
                    <Stack gap={1}>
                      <Text
                        size='xs'
                        fw={600}
                        c={isDarkTheme ? 'yellow.4' : 'orange.9'}
                      >
                        Archived Courses
                      </Text>
                      <Text size='xs' c='dimmed'>
                        Archived courses are hidden from learners. You can clone
                        their modules and tasks into a new active course, or
                        reactivate anytime.
                      </Text>
                    </Stack>
                  </Group>
                </Group>
              </Paper>
            )}

            {paginatedCourses.length > 0 ? (
              <>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
                  {paginatedCourses.map((course: Course) => (
                    <CourseCard
                      key={course._id}
                      course={course}
                      onEdit={handleEdit}
                      onArchive={handleArchiveClick}
                      onDelete={handleDelete}
                      onClone={setCourseToClone}
                    />
                  ))}
                </SimpleGrid>
                {totalPages > 1 && (
                  <Center mt='lg'>
                    <Pagination
                      value={activePage}
                      onChange={setActivePage}
                      total={totalPages}
                      size='sm'
                      radius='md'
                      withEdges
                    />
                  </Center>
                )}
              </>
            ) : (
              <Center py={48}>
                <Stack align='center' gap='sm'>
                  <ThemeIcon
                    size={56}
                    radius='xl'
                    variant='light'
                    color={
                      activeTab === 'archived' ? 'orange' : themeConfig.color
                    }
                  >
                    {activeTab === 'archived' ? (
                      <IconArchive size={28} />
                    ) : (
                      <IconBook size={28} />
                    )}
                  </ThemeIcon>
                  <Text fw={500} size='md'>
                    {searchQuery
                      ? activeTab === 'archived'
                        ? 'No matching archived courses'
                        : 'No matching courses'
                      : activeTab === 'archived'
                        ? 'No archived courses'
                        : 'No courses yet'}
                  </Text>
                  <Text size='sm' c='dimmed' ta='center' maw={340}>
                    {searchQuery
                      ? 'Try adjusting your search term'
                      : activeTab === 'archived'
                        ? 'When you archive courses, they are safely preserved here for future reference, reactivating, or cloning.'
                        : 'Create your first course to start building content'}
                  </Text>
                  {!searchQuery && activeTab === 'active' && (
                    <CommonButton
                      mt='xs'
                      leftSection={<IconPlus size={14} />}
                      onClick={handleAddCourse}
                    >
                      Create Course
                    </CommonButton>
                  )}
                  {!searchQuery &&
                    activeTab === 'archived' &&
                    stats.totalActiveCourses > 0 && (
                      <CommonButton
                        mt='xs'
                        variant='light'
                        color={themeConfig.color}
                        leftSection={<IconBook size={14} />}
                        onClick={() => setActiveTab('active')}
                      >
                        View Active Courses
                      </CommonButton>
                    )}
                </Stack>
              </Center>
            )}
          </Card>
        </Grid.Col>

        {/* Recent Activity sidebar */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Card withBorder radius='lg' p='lg'>
            <Group gap='xs' mb='lg'>
              <IconClock size={20} color={themeConfig.color} />
              <Text fw={600} size='lg'>
                Recent Activity
              </Text>
            </Group>

            {recentActivity.length > 0 ? (
              <Stack gap={0}>
                {recentActivity.map((course: Course, i: number) => {
                  const isArchived =
                    (course.status || '').toUpperCase() === 'ARCHIVE';
                  return (
                    <div key={course._id}>
                      <Group
                        p='sm'
                        gap='sm'
                        style={{
                          cursor: isArchived ? 'default' : 'pointer',
                          borderRadius: 'var(--mantine-radius-sm)',
                          transition: 'background-color 0.15s ease'
                        }}
                        title={
                          isArchived
                            ? undefined
                            : 'Click to view course details'
                        }
                        onClick={
                          isArchived ? undefined : () => goToCourse(course._id)
                        }
                        onMouseEnter={e => {
                          if (!isArchived) {
                            e.currentTarget.style.backgroundColor = isDarkTheme
                              ? 'var(--mantine-color-dark-6)'
                              : 'var(--mantine-color-gray-1)';
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isArchived) {
                            e.currentTarget.style.backgroundColor = '';
                          }
                        }}
                      >
                        <CourseThumbnail
                          name={course.courseName}
                          src={course.thumbnailUrl}
                          size={40}
                          radius='sm'
                        />
                        <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
                          <Text
                            size='sm'
                            fw={500}
                            lineClamp={1}
                            style={{
                              color: isArchived
                                ? isDarkTheme
                                  ? 'var(--mantine-color-gray-4)'
                                  : 'var(--mantine-color-gray-7)'
                                : undefined
                            }}
                          >
                            {course.courseName}
                          </Text>
                          <Group gap={4} wrap='nowrap'>
                            <IconClock size={11} color='dimmed' />
                            <Text size='xs' c='dimmed'>
                              {course.updatedAt
                                ? new Date(course.updatedAt).toLocaleDateString(
                                    undefined,
                                    {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric'
                                    }
                                  )
                                : '—'}
                            </Text>
                          </Group>
                        </Stack>
                        <Badge
                          size='xs'
                          variant='light'
                          color={isArchived ? 'orange' : 'green'}
                        >
                          {isArchived ? 'Archived' : 'Active'}
                        </Badge>
                      </Group>
                      {i < recentActivity.length - 1 && <Divider />}
                    </div>
                  );
                })}
              </Stack>
            ) : (
              <Center p='xl'>
                <Text size='sm' c='dimmed'>
                  No recent activity
                </Text>
              </Center>
            )}
          </Card>
        </Grid.Col>
      </Grid>

      {/* Delete confirmation modal */}
      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title='Delete Course'
        centered
        size='sm'
      >
        <Stack gap='md' mt='md'>
          <Text size='sm'>
            Are you sure you want to delete this course? This action cannot be
            undone.
          </Text>
          <Group justify='flex-end'>
            <CommonButton
              variant='default'
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </CommonButton>
            <CommonButton color='red' onClick={confirmDelete}>
              Delete
            </CommonButton>
          </Group>
        </Stack>
      </Modal>

      <EditCourseModal
        opened={!!courseToEdit}
        onClose={() => setCourseToEdit(null)}
        course={courseToEdit || undefined}
      />

      <ArchiveCourseModal
        opened={!!courseToArchive}
        onClose={() => setCourseToArchive(null)}
        course={courseToArchive?.course || null}
        mode={courseToArchive?.mode || 'archive'}
        onConfirm={handleConfirmArchive}
        loading={isArchiving}
      />

      <CloneCourseModal
        opened={!!courseToClone}
        onClose={() => setCourseToClone(null)}
        course={courseToClone}
        onSuccess={() => {
          setCourseToClone(null);
          setActiveTab('active');
          setActivePage(1);
        }}
      />
    </Container>
  );
};

export default WriterDashboard;
