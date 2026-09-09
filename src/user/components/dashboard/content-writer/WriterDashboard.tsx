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
  Modal
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
  IconPencil
} from '@tabler/icons-react';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { organizationEmployeeUrls } from '@utils/common/constants';
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

const COURSES_PER_PAGE = 6;

const WriterDashboard = () => {
  const { themeConfig, organizationConfig, isDarkTheme } = useAppTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [, setCourseToDelete] = useState<string | null>(null);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);

  const { data: courses = [], isLoading } = useGetAllCoursesByUser();
  const { mutateAsync: updateCourse } = useUpdateCourse();
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const totalCourses = courses.length;
    const totalModules = courses.reduce(
      (sum: number, c: Course) => sum + (c.modules?.length || 0),
      0
    );
    const totalTasks = courses.reduce(
      (sum: number, c: Course) =>
        sum +
        (c.modules?.reduce(
          (mSum: number, m: any) => mSum + (m.tasks?.length || 0),
          0
        ) || 0),
      0
    );
    return { totalCourses, totalModules, totalTasks };
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

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return sortedCourses;
    const q = searchQuery.toLowerCase();
    return sortedCourses.filter(
      (c: Course) =>
        c.courseName.toLowerCase().includes(q) ||
        c.courseDescription?.toLowerCase().includes(q)
    );
  }, [sortedCourses, searchQuery]);

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

  const handleArchive = async (courseId: string) => {
    const course = courses.find((c: Course) => c._id === courseId);
    if (!course) return;
    try {
      await updateCourse({
        id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        status: 'ARCHIVE'
      });
      showSuccessToast('Course archived successfully!');
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to archive course'));
    }
  };

  const confirmDelete = () => {
    setDeleteModalOpen(false);
    setCourseToDelete(null);
  };

  const handleAddCourse = () => {
    navigate(
      `${organizationEmployeeUrls(organizationConfig.organization_name)}/dashboard/add-course`
    );
  };

  const goToCourse = (courseId: string) =>
    navigate(
      `${organizationEmployeeUrls(organizationConfig.organization_name)}/dashboard/course/${courseId}`
    );

  const statCards = [
    {
      label: 'Total Courses',
      value: stats.totalCourses,
      icon: <IconBook size={22} />,
      color: themeConfig.color
    },
    {
      label: 'Total Modules',
      value: stats.totalModules,
      icon: <IconLayersSubtract size={22} />,
      color: 'indigo'
    },
    {
      label: 'Total Tasks',
      value: stats.totalTasks,
      icon: <IconListCheck size={22} />,
      color: 'violet'
    }
  ];

  if (isLoading) {
    return (
      <Container size='xl' pt={80} pb='xl'>
        <Skeleton height={120} radius='lg' mb='xl' />
        <SimpleGrid cols={{ base: 1, xs: 3 }} spacing='md' mb='xl'>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} height={92} radius='md' />
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
          <CommonButton
            leftSection={<IconPlus size={16} />}
            onClick={handleAddCourse}
          >
            New Course
          </CommonButton>
        </Group>
      </Box>

      {/* Stats*/}
      <SimpleGrid cols={{ base: 1, xs: 3 }} spacing='md' mb='xl'>
        {statCards.map((s, i) => (
          <Card key={i} withBorder radius='md' p='md'>
            <Group gap='sm' wrap='nowrap'>
              <ThemeIcon size={44} radius='md' variant='light' color={s.color}>
                {s.icon}
              </ThemeIcon>
              <Stack gap={2} style={{ minWidth: 0 }}>
                <Title order={3} lh={1}>
                  {s.value}
                </Title>
                <Text size='xs' c='dimmed' lineClamp={1}>
                  {s.label}
                </Text>
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
              mb='lg'
            >
              <Group gap='xs'>
                <IconPencil size={20} color={themeConfig.color} />
                <Text fw={600} size='lg'>
                  My Courses
                </Text>
                {courses.length > 0 && (
                  <Badge
                    variant='light'
                    color={themeConfig.color}
                    radius='sm'
                    size='lg'
                  >
                    {filteredCourses.length}
                  </Badge>
                )}
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

            {paginatedCourses.length > 0 ? (
              <>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
                  {paginatedCourses.map((course: Course) => (
                    <CourseCard
                      key={course._id}
                      course={course}
                      onEdit={handleEdit}
                      onArchive={handleArchive}
                      onDelete={handleDelete}
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
                    color={themeConfig.color}
                  >
                    <IconBook size={28} />
                  </ThemeIcon>
                  <Text fw={500} size='md'>
                    {searchQuery ? 'No matching courses' : 'No courses yet'}
                  </Text>
                  <Text size='sm' c='dimmed' ta='center' maw={280}>
                    {searchQuery
                      ? 'Try adjusting your search term'
                      : 'Create your first course to start building content'}
                  </Text>
                  {!searchQuery && (
                    <CommonButton
                      mt='xs'
                      leftSection={<IconPlus size={14} />}
                      onClick={handleAddCourse}
                    >
                      Create Course
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
                {recentActivity.map((course: Course, i: number) => (
                  <div key={course._id}>
                    <Group
                      p='sm'
                      gap='sm'
                      style={{
                        cursor: 'pointer',
                        borderRadius: 'var(--mantine-radius-sm)',
                        transition: 'background-color 0.15s ease'
                      }}
                      onClick={() => goToCourse(course._id)}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = isDarkTheme
                          ? 'var(--mantine-color-dark-6)'
                          : 'var(--mantine-color-gray-1)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = '';
                      }}
                    >
                      <CourseThumbnail
                        name={course.courseName}
                        src={course.thumbnailUrl}
                        size={40}
                        radius='sm'
                      />
                      <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
                        <Text size='sm' fw={500} lineClamp={1}>
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
                        color={course.status === 'ACTIVE' ? 'green' : 'blue'}
                      >
                        {course.status === 'ACTIVE' ? 'Active' : 'Archived'}
                      </Badge>
                    </Group>
                    {i < recentActivity.length - 1 && <Divider />}
                  </div>
                ))}
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
        <Stack gap='md'>
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
    </Container>
  );
};

export default WriterDashboard;
