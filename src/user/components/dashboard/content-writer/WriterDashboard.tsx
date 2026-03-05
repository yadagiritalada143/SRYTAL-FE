import {
  Button,
  Card,
  Container,
  Divider,
  Group,
  Image,
  Loader,
  Stack,
  Text,
  Title,
  Badge,
  SimpleGrid,
  ScrollArea,
  Center,
  ThemeIcon,
  ActionIcon,
  Menu,
  Pagination,
  Modal,
  TextInput,
  Box
} from '@mantine/core';
import PremiumLoader from '@components/common/loaders/PremiumLoader';
import {
  IconBook,
  IconLayersSubtract,
  IconListCheck,
  IconPlus,
  IconDots,
  IconEdit,
  IconTrash,
  IconArchive,
  IconSearch,
  IconX,
  IconArrowLeft
} from '@tabler/icons-react';
import React, { useState, useMemo, useCallback } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { organizationEmployeeUrls } from '@utils/common/constants';
import { useAppTheme } from '@hooks/use-app-theme';
import { useGetAllCoursesByUser } from '@hooks/queries/useUserQueries';
import { Course } from '@interfaces/contentwriter';

const COURSES_PER_PAGE = 6;

const WriterDashboard = () => {
  const { themeConfig: currentThemeConfig, organizationConfig } = useAppTheme();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  const { data: courses = [], isLoading } = useGetAllCoursesByUser();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const stats = useMemo(() => {
    if (!courses.length)
      return { totalCourses: 0, totalModules: 0, totalTasks: 0 };
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

  const recentActivity = useMemo(() => {
    return courses
      .filter((c: Course) => c.updatedAt)
      .sort(
        (a: Course, b: Course) =>
          new Date(b.updatedAt || '').getTime() -
          new Date(a.updatedAt || '').getTime()
      )
      .slice(0, 4)
      .map((c: Course) => ({
        id: c._id,
        title: c.courseName,
        thumbnail: c.thumbnail || '/public/course-thumbnail.png',
        type: 'Course'
      }));
  }, [courses]);

  const overview = useMemo(
    () => ({
      title: 'Content Writer Dashboard',
      banner: {
        headline: 'Craft Your Written Journey',
        tag: "The Creator's Playground",
        thumbnailBanner: '/public/contentwriter.jpg'
      }
    }),
    []
  );

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses;
    const query = searchQuery.toLowerCase();
    return courses.filter(
      (course: Course) =>
        course.courseName.toLowerCase().includes(query) ||
        course.courseDescription?.toLowerCase().includes(query)
    );
  }, [courses, searchQuery]);

  const { paginatedCourses, totalPages } = useMemo(() => {
    const start = (activePage - 1) * COURSES_PER_PAGE;
    const end = start + COURSES_PER_PAGE;
    const paginated = filteredCourses.slice(start, end);
    const pages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
    return { paginatedCourses: paginated, totalPages: pages };
  }, [filteredCourses, activePage]);

  const handleEdit = (courseId: string) => {
    console.log('Edit course:', courseId);
  };

  const handleDelete = (courseId: string) => {
    setCourseToDelete(courseId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log('Delete course:', courseToDelete);
    setDeleteModalOpen(false);
    setCourseToDelete(null);
  };

  const handleArchive = (courseId: string) => {
    console.log('Archive course:', courseId);
  };

  const handleAddCourse = useCallback(() => {
    navigate(
      `${organizationEmployeeUrls(organizationConfig.organization_name)}/dashboard/add-course`
    );
  }, [navigate, organizationConfig.organization_name]);

  const CourseCard = ({ course }: { course: Course }) => (
    <Card
      shadow='xs'
      radius='md'
      p='md'
      withBorder
      onClick={() =>
        navigate(
          `${organizationEmployeeUrls(organizationConfig.organization_name)}/dashboard/course/${course._id}`
        )
      }
      style={{ position: 'relative', cursor: 'pointer' }}
    >
      <Menu position='bottom-end' shadow='md' width={160}>
        <Menu.Target>
          <ActionIcon
            variant='subtle'
            onClick={e => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
              color: currentThemeConfig.color
            }}
          >
            <IconDots size={18} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconEdit size={16} />}
            onClick={e => {
              e.stopPropagation();
              handleEdit(course._id);
            }}
            color={currentThemeConfig.button.color}
          >
            Edit
          </Menu.Item>
          <Menu.Item
            leftSection={<IconArchive size={16} />}
            onClick={e => {
              e.stopPropagation();
              handleArchive(course._id);
            }}
            color={currentThemeConfig.button.color}
          >
            Archive
          </Menu.Item>
          <Menu.Divider
            style={{ borderColor: currentThemeConfig.borderColor }}
          />
          <Menu.Item
            color='red'
            leftSection={<IconTrash size={16} />}
            onClick={e => {
              e.stopPropagation();
              handleDelete(course._id);
            }}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Image
        src={course.thumbnail || '/public/course-thumbnail.png'}
        height={140}
        radius='md'
        mb='sm'
      />
      <Stack gap={4}>
        <Text fw={600} size='md' lineClamp={1}>
          {course.courseName}
        </Text>
        <Text size='sm' c='dimmed' lineClamp={2}>
          {course.courseDescription
            ? `${course.courseDescription.replace(/<[^>]*>/g, '').slice(0, 64)}...`
            : 'No description available'}
        </Text>
        <Badge color='blue' mt='xs' radius='sm' variant='light'>
          {course.status || 'N/A'}
        </Badge>
      </Stack>
    </Card>
  );

  if (isLoading) {
    return (
      <Center h={400}>
        <PremiumLoader label='Loading content...' />
      </Center>
    );
  }

  if (showAllCourses) {
    return (
      <Container size='xl' py='xl'>
        <Stack gap='lg'>
          <Group justify='space-between' align='center' wrap='nowrap'>
            <Group gap='sm'>
              <ActionIcon
                variant='subtle'
                color='gray'
                size='lg'
                onClick={() => {
                  setShowAllCourses(false);
                  setActivePage(1);
                  setSearchQuery('');
                }}
              >
                <IconArrowLeft size={20} />
              </ActionIcon>
              <Title order={2}>All Courses ({filteredCourses.length})</Title>
            </Group>
            <Button
              leftSection={<IconPlus size={16} />}
              radius='md'
              visibleFrom='sm'
              onClick={handleAddCourse}
            >
              Create New Course
            </Button>
          </Group>

          <Card shadow='sm' p='md' radius='md' withBorder>
            <TextInput
              placeholder='Search courses...'
              leftSection={<IconSearch size={16} />}
              rightSection={
                searchQuery && (
                  <ActionIcon
                    variant='subtle'
                    onClick={() => setSearchQuery('')}
                  >
                    <IconX size={16} />
                  </ActionIcon>
                )
              }
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setActivePage(1);
              }}
              radius='md'
            />
          </Card>

          <SimpleGrid cols={{ base: 1, xs: 2, sm: 2, md: 3 }} spacing='lg'>
            {paginatedCourses.length > 0 ? (
              paginatedCourses.map((course: Course) => (
                <CourseCard key={course._id} course={course} />
              ))
            ) : (
              <Center style={{ gridColumn: '1 / -1' }} py='xl'>
                <Text size='sm' c='dimmed'>
                  {searchQuery
                    ? 'No courses found matching your search.'
                    : 'No courses available.'}
                </Text>
              </Center>
            )}
          </SimpleGrid>

          {totalPages > 1 && (
            <Center mt='md'>
              <Pagination
                value={activePage}
                onChange={setActivePage}
                total={totalPages}
                size={isMobile ? 'sm' : 'md'}
                radius='md'
                withEdges
              />
            </Center>
          )}
        </Stack>
      </Container>
    );
  }

  return (
    <Container size='xl' py='xl'>
      <Stack mb='xl' gap={4}>
        <Title order={1}>{overview.title}</Title>
        <Text c='dimmed'>
          Welcome to your dashboard! Here you can manage and track your content
          creation journey.
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing='xl'>
        {/* Left Side */}
        <Stack gap='lg'>
          <Card
            shadow='sm'
            p='xl'
            radius='xl'
            style={{
              background: 'linear-gradient(90deg, #6366F1, #8B5CF6, #EC4899)',
              color: 'white'
            }}
          >
            <Group justify='space-between' align='center' wrap='nowrap'>
              <Stack gap={6} style={{ flex: 1 }}>
                <Title order={2} fw={700}>
                  {overview.banner.headline}
                </Title>
                <Text size='sm' opacity={0.85}>
                  {overview.banner.tag}
                </Text>
              </Stack>
              {!isMobile && (
                <Image
                  src={overview.banner.thumbnailBanner}
                  radius='md'
                  alt='Banner'
                  fit='contain'
                  style={{ width: 150, height: 120 }}
                />
              )}
            </Group>
          </Card>

          <SimpleGrid cols={3} spacing='md'>
            {[
              {
                icon: <IconBook size={24} color='#4F46E5' />,
                label: 'Courses',
                value: stats.totalCourses,
                color: 'indigo'
              },
              {
                icon: <IconLayersSubtract size={24} color='#9333EA' />,
                label: 'Modules',
                value: stats.totalModules,
                color: 'purple'
              },
              {
                icon: <IconListCheck size={24} color='#EC4899' />,
                label: 'Tasks',
                value: stats.totalTasks,
                color: 'pink'
              }
            ].map((item, index) => (
              <Card
                key={index}
                shadow='sm'
                p='md'
                radius='md'
                withBorder
                style={{ textAlign: 'center' }}
              >
                <Stack align='center' gap={8}>
                  <ThemeIcon
                    size={48}
                    radius='xl'
                    color={item.color}
                    variant='light'
                  >
                    {item.icon}
                  </ThemeIcon>
                  <Text size='xs' c='dimmed'>
                    {item.label}
                  </Text>
                  <Title order={3}>{item.value}</Title>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>

          <Card shadow='sm' p='lg' radius='md' withBorder>
            <Title order={5} mb='sm'>
              Recent Activity
            </Title>
            <Divider mb='sm' />
            <Stack gap='sm'>
              {recentActivity.length > 0 ? (
                recentActivity.map((item: any) => (
                  <Group
                    key={item.id}
                    p='xs'
                    onClick={() =>
                      navigate(
                        `${organizationEmployeeUrls(organizationConfig.organization_name)}/dashboard/course/${item.id}`
                      )
                    }
                    style={{
                      borderRadius: 8,
                      cursor: 'pointer',
                      backgroundColor: 'rgba(0,0,0,0.02)'
                    }}
                  >
                    <Image
                      src={item.thumbnail}
                      width={40}
                      height={40}
                      radius='sm'
                    />
                    <Stack gap={0} style={{ flex: 1 }}>
                      <Text size='sm' fw={500} lineClamp={1}>
                        {item.title}
                      </Text>
                      <Text size='xs' c='dimmed'>
                        {item.type}
                      </Text>
                    </Stack>
                  </Group>
                ))
              ) : (
                <Text size='sm' c='dimmed'>
                  No recent updates found.
                </Text>
              )}
            </Stack>
          </Card>
        </Stack>

        {/* Right Side */}
        <Stack gap='lg'>
          <Group justify='space-between'>
            <Title order={3}>Content Pipeline</Title>
            <Button
              leftSection={<IconPlus size={16} />}
              radius='md'
              onClick={handleAddCourse}
            >
              New Course
            </Button>
          </Group>

          <Card shadow='sm' p='lg' radius='md' withBorder>
            <ScrollArea h={600} offsetScrollbars>
              <SimpleGrid cols={isMobile ? 1 : 2} spacing='lg'>
                {courses.slice(0, 4).map((course: Course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </SimpleGrid>
            </ScrollArea>
            <Button
              mt='md'
              fullWidth
              variant='outline'
              onClick={() => setShowAllCourses(true)}
            >
              Show All Courses
            </Button>
          </Card>
        </Stack>
      </SimpleGrid>

      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title='Delete Course'
        centered
      >
        <Stack gap='md'>
          <Text>
            Are you sure you want to delete this course? This action cannot be
            undone.
          </Text>
          <Group justify='flex-end'>
            <Button variant='default' onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button color='red' onClick={confirmDelete}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};

export default WriterDashboard;
