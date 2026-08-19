import {
  Card,
  Container,
  Divider,
  Grid,
  Group,
  Stack,
  Text,
  Title,
  SimpleGrid,
  TextInput,
  ActionIcon,
  Pagination,
  Center,
  ThemeIcon,
  Badge,
  Modal
} from '@mantine/core';
import SkeletonLoader from '@components/common/loaders/SkeletonLoader';
import {
  IconBook,
  IconLayersSubtract,
  IconListCheck,
  IconPlus,
  IconSearch,
  IconX,
  IconClock
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
  const { themeConfig, organizationConfig } = useAppTheme();
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
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



  // Most recently updated first, so an edit moves its course to the top.
  const sortedCourses = useMemo(
    () =>
      [...courses].sort((a: Course, b: Course) => {
        const da = new Date(a.updatedAt || a.createdAt || 0).getTime();
        const db = new Date(b.updatedAt || b.createdAt || 0).getTime();
        return db - da;
      }),
    [courses]
  );

  const recentActivity = useMemo(() => sortedCourses.slice(0, 6), [sortedCourses]);

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

  // Archiving is just a status update through the same course update endpoint.
  const handleArchive = async (courseId: string) => {
    const course = courses.find((c: Course) => c._id === courseId);
    if (!course) return;
    try {
      await updateCourse({
        id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
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

  const statItems = [
    {
      icon: <IconBook size={22} />,
      label: 'Total Courses',
      value: stats.totalCourses
    },
    {
      icon: <IconLayersSubtract size={22} />,
      label: 'Total Modules',
      value: stats.totalModules
    },
    {
      icon: <IconListCheck size={22} />,
      label: 'Total Tasks',
      value: stats.totalTasks
    }
  ];

  if (isLoading) {
    return (
      <Container size='xl' py='xl'>
        <Group justify='space-between' mb='xl'>
          <Stack gap={4}>
            <Title order={2} fw={700}>
              Content Writer
            </Title>
            <Text size='sm' c='dimmed'>
              Loading your workspace...
            </Text>
          </Stack>
        </Group>
        <SkeletonLoader type='cards' rows={4} />
      </Container>
    );
  }

  return (
    <Container size='xl' py='xl'>
      {/* Page Header */}
      <Group justify='space-between' align='flex-start' mb='xl'>
        <Stack gap={2}>
          <Title order={2} fw={700}>
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

      {/* Stats */}
      <SimpleGrid cols={{ base: 1, xs: 3 }} spacing='md' mb='xl'>
        {statItems.map((item, i) => (
          <Card key={i} withBorder radius='md' p='lg'>
            <Group gap='md' wrap='nowrap'>
              <ThemeIcon
                size={48}
                radius='md'
                variant='light'
                color={themeConfig.color}
              >
                {item.icon}
              </ThemeIcon>
              <Stack gap={2}>
                <Title order={3} lh={1}>
                  {item.value}
                </Title>
                <Text size='xs' c='dimmed'>
                  {item.label}
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
          <Stack gap='md'>
            <Group justify='space-between' align='center' wrap='nowrap'>
              <Group gap='xs'>
                <Text fw={600} size='lg'>
                  My Courses
                </Text>
                {courses.length > 0 && (
                  <Badge
                    variant='light'
                    color={themeConfig.color}
                    radius='sm'
                    size='sm'
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
                w={{ base: 160, sm: 220 }}
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
                  <Center mt='sm'>
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
              <Card withBorder radius='md'>
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
              </Card>
            )}
          </Stack>
        </Grid.Col>

        {/* Recent Activity sidebar */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack gap='md'>
            <Text fw={600} size='lg'>
              Recent Activity
            </Text>
            <Card withBorder radius='md' p={0}>
              {recentActivity.length > 0 ? (
                <Stack gap={0}>
                  {recentActivity.map((course: Course, i: number) => (
                    <div key={course._id}>
                      <Group
                        p='md'
                        gap='sm'
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          navigate(
                            `${organizationEmployeeUrls(organizationConfig.organization_name)}/dashboard/course/${course._id}`
                          )
                        }
                      >
                        <CourseThumbnail
                          name={course.courseName}
                          size={38}
                          radius='sm'
                        />
                        <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
                          <Text size='sm' fw={500} lineClamp={1}>
                            {course.courseName}
                          </Text>
                          <Group gap={4}>
                            <IconClock size={11} color='gray' />
                            <Text size='xs' c='dimmed'>
                              {course.updatedAt
                                ? new Date(course.updatedAt).toLocaleDateString(
                                    undefined,
                                    { month: 'short', day: 'numeric', year: 'numeric' }
                                  )
                                : '—'}
                            </Text>
                          </Group>
                        </Stack>
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
          </Stack>
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
