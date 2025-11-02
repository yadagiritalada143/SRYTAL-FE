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
  IconX
} from '@tabler/icons-react';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { getAllCoursesByUser } from '../../../../services/user-services';
import { Course } from '../../../../interfaces/contentwriter';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { themeAtom } from '../../../../atoms/theme';
import { useMediaQuery } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { organizationEmployeeUrls } from '../../../../utils/common/constants';
import { BackButton } from '../../../common/style-components/buttons';

const COURSES_PER_PAGE = 6;

const WriterDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

  const isMobile = useMediaQuery('(max-width: 768px)');

  const [stats, setStats] = useState({
    totalCourses: 0,
    totalModules: 0,
    totalTasks: 0
  });
  const [recentActivity, setRecentActivity] = useState<
    { id: string; title: string; thumbnail: string; type: string }[]
  >([]);

  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;
    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);

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

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllCoursesByUser();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (courses?.length) {
      const totalCourses = courses.length;
      const totalModules = courses.reduce(
        (sum, c) => sum + (c.modules?.length || 0),
        0
      );
      const totalTasks = courses.reduce(
        (sum, c) =>
          sum +
          (c.modules?.reduce((mSum, m) => mSum + (m.tasks?.length || 0), 0) ||
            0),
        0
      );
      setStats({ totalCourses, totalModules, totalTasks });

      const recent = courses
        .filter(c => c.updatedAt)
        .sort(
          (a, b) =>
            new Date(b.updatedAt || '').getTime() -
            new Date(a.updatedAt || '').getTime()
        )
        .slice(0, 4)
        .map(c => ({
          id: c._id,
          title: c.courseName,
          thumbnail: c.thumbnail || '/public/course-thumbnail.png',
          type: 'Course'
        }));
      setRecentActivity(recent);
    }
  }, [courses]);

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses;
    const query = searchQuery.toLowerCase();
    return courses.filter(
      course =>
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
    // Add your edit navigation logic here
  };

  const handleDelete = (courseId: string) => {
    setCourseToDelete(courseId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log('Delete course:', courseToDelete);
    // Add your delete API call here
    setDeleteModalOpen(false);
    setCourseToDelete(null);
  };

  const handleArchive = (courseId: string) => {
    console.log('Archive course:', courseId);
    // Add your archive API call here
  };
  const navigate = useNavigate();

  const handleAddCourse = useCallback(() => {
    navigate(
      `${organizationEmployeeUrls(organizationConfig.organization_name)}/dashboard/add-course`
    );
  }, [navigate, organizationConfig.organization_name]);

  const handleViewCourse = useCallback(
    (courseId: string) => {
      navigate(
        `${organizationEmployeeUrls(organizationConfig.organization_name)}/dashboard/course/${courseId}`
      );
    },
    [navigate, organizationConfig.organization_name]
  );

  const CourseCard = ({ course }: { course: Course }) => (
    <Card
      shadow="xs"
      radius="md"
      p="md"
      withBorder
      style={{
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
      onClick={() => handleViewCourse(course._id)}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
      }}
    >
      <Menu position="bottom-end" shadow="md" width={160}>
        <Menu.Target>
          <ActionIcon
            variant="subtle"
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
              color: currentThemeConfig.color
            }}
            onClick={e => e.stopPropagation()}
          >
            <IconDots size={18} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconEdit size={16} />}
            onClick={() => handleEdit(course._id)}
            color={currentThemeConfig.button.color}
          >
            Edit
          </Menu.Item>
          <Menu.Item
            leftSection={<IconArchive size={16} />}
            onClick={() => handleArchive(course._id)}
            color={currentThemeConfig.button.color}
          >
            Archive
          </Menu.Item>
          <Menu.Divider
            style={{ borderColor: currentThemeConfig.borderColor }}
          />
          <Menu.Item
            color="red"
            leftSection={<IconTrash size={16} />}
            onClick={() => handleDelete(course._id)}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Image
        src={course.thumbnail || '/public/course-thumbnail.png'}
        height={140}
        radius="md"
        mb="sm"
      />
      <Stack gap={4}>
        <Text fw={600} size="md" lineClamp={1}>
          {course.courseName}
        </Text>
        <Text
          component="div"
          fz="sm"
          opacity={0.9}
          mb="lg"
          dangerouslySetInnerHTML={{
            __html: course.courseDescription?.slice(0, 32)
          }}
        />
        <Badge color="blue" mt="xs" radius="sm" variant="light">
          {course.status || 'N/A'}
        </Badge>
      </Stack>
    </Card>
  );

  if (showAllCourses) {
    return (
      <Container size="xl" py="xl">
        <Stack gap="lg">
          <Group justify="space-between" align="center" wrap="nowrap">
            <Group gap="sm">
              <BackButton id="" />
              <Title order={2}>All Courses ({filteredCourses.length})</Title>
            </Group>
            <Button
              leftSection={<IconPlus size={16} />}
              color="green"
              radius="md"
              visibleFrom="sm"
              onClick={handleAddCourse}
            >
              Create New Course
            </Button>
          </Group>

          <Card shadow="sm" p="md" radius="md" withBorder>
            <TextInput
              placeholder="Search courses..."
              leftSection={<IconSearch size={16} />}
              rightSection={
                searchQuery && (
                  <ActionIcon
                    variant="subtle"
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
              radius="md"
            />
          </Card>

          <SimpleGrid cols={{ base: 1, xs: 2, sm: 2, md: 3 }} spacing="lg">
            {paginatedCourses.length > 0 ? (
              paginatedCourses.map(course => (
                <CourseCard key={course._id} course={course} />
              ))
            ) : (
              <Center style={{ gridColumn: '1 / -1' }} py="xl">
                <Text size="sm" c="dimmed">
                  {searchQuery
                    ? 'No courses found matching your search.'
                    : 'No courses available.'}
                </Text>
              </Center>
            )}
          </SimpleGrid>

          {totalPages > 1 && (
            <Center mt="md">
              <Pagination
                value={activePage}
                onChange={setActivePage}
                total={totalPages}
                size={isMobile ? 'sm' : 'md'}
                radius="md"
                withEdges
              />
            </Center>
          )}
        </Stack>

        <Modal
          opened={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="Delete Course"
          centered
        >
          <Stack gap="md">
            <Text>
              Are you sure you want to delete this course? This action cannot be
              undone.
            </Text>
            <Group justify="flex-end">
              <Button
                variant="default"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button color="red" onClick={confirmDelete}>
                Delete
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      {loading ? (
        <Center h={400}>
          <Loader
            size="lg"
            type="bars"
            color={currentThemeConfig.button.color}
          />
        </Center>
      ) : (
        <>
          <Stack m={isMobile ? 'md' : 'lg'} gap={4}>
            <Title order={1}>{overview.title}</Title>
            <Text c="dimmed" mb="md">
              Welcome to your dashboard! Here you can manage and track your
              content creation journey.
            </Text>
          </Stack>

          <Box>
            <Stack gap="lg" hiddenFrom="lg">
              {/* Mobile/Tablet Layout - Stacked */}

              {/* Banner Section */}
              <Card
                shadow="sm"
                p={isMobile ? 'md' : 'xl'}
                radius="xl"
                style={{
                  background: `linear-gradient(90deg, ${currentThemeConfig.colors.primary[8]}, ${currentThemeConfig.colors.secondary[8]})`,
                  color: 'white'
                }}
              >
                <Group justify="space-between" align="center" wrap="nowrap">
                  <Stack gap={6} style={{ flex: 1 }}>
                    <Title order={isMobile ? 3 : 2} fw={700}>
                      {overview.banner.headline}
                    </Title>
                    <Text size="sm" opacity={0.85}>
                      {overview.banner.tag}
                    </Text>
                  </Stack>
                  {!isMobile && (
                    <Image
                      src={overview.banner.thumbnailBanner}
                      radius="md"
                      alt="Banner"
                      fit="cover"
                      style={{
                        width: '100%',
                        height: '100%',
                        maxWidth: '150px',
                        maxHeight: '120px',
                        objectFit: 'cover',
                        flexShrink: 0,
                        boxShadow: '0 0 10px rgba(0,0,0,0.2)'
                      }}
                    />
                  )}
                </Group>
              </Card>

              {/* Dashboard Stats */}
              <SimpleGrid cols={3} spacing={isMobile ? 'xs' : 'md'}>
                {[
                  {
                    icon: (
                      <IconBook size={isMobile ? 20 : 24} color="#4F46E5" />
                    ),
                    label: 'Total Courses',
                    value: stats.totalCourses,
                    color: 'indigo'
                  },
                  {
                    icon: (
                      <IconLayersSubtract
                        size={isMobile ? 20 : 24}
                        color="#9333EA"
                      />
                    ),
                    label: 'Total Modules',
                    value: stats.totalModules,
                    color: 'purple'
                  },
                  {
                    icon: (
                      <IconListCheck
                        size={isMobile ? 20 : 24}
                        color="#EC4899"
                      />
                    ),
                    label: 'Total Tasks',
                    value: stats.totalTasks,
                    color: 'pink'
                  }
                ].map((item, index) => (
                  <Card
                    key={index}
                    shadow="sm"
                    p={isMobile ? 'xs' : 'md'}
                    radius="md"
                    withBorder
                    style={{
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <Stack align="center" gap={isMobile ? 4 : 8}>
                      <ThemeIcon
                        size={isMobile ? 32 : 48}
                        radius="xl"
                        color={item.color}
                        variant="light"
                      >
                        {item.icon}
                      </ThemeIcon>
                      <Text
                        size={isMobile ? 'xs' : 'sm'}
                        c="dimmed"
                        ta="center"
                      >
                        {item.label}
                      </Text>
                      <Title order={isMobile ? 4 : 3}>{item.value}</Title>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>

              {/* Recent Activity */}
              <Card
                shadow="sm"
                p={isMobile ? 'md' : 'lg'}
                radius="md"
                withBorder
              >
                <Group justify="space-between" mb="xs">
                  <Title order={5}>Recent Activity</Title>
                </Group>
                <Divider mb="sm" />
                <Stack gap="sm">
                  {recentActivity.length > 0 ? (
                    recentActivity.map(item => (
                      <Group
                        key={item.id}
                        className="hover:bg-gray-50"
                        p="xs"
                        style={{
                          borderRadius: 8,
                          cursor: 'pointer',
                          transition: '0.2s'
                        }}
                      >
                        <Image
                          src={item.thumbnail}
                          width={40}
                          height={40}
                          radius="sm"
                          alt={item.title}
                        />
                        <Stack gap={0} style={{ flex: 1, minWidth: 0 }}>
                          <Text size="sm" fw={500} lineClamp={1}>
                            {item.title}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {item.type}
                          </Text>
                        </Stack>
                      </Group>
                    ))
                  ) : (
                    <Text size="sm" c="dimmed">
                      No recent updates found.
                    </Text>
                  )}
                </Stack>
              </Card>

              {/* Content Pipeline */}
              <Stack gap="md">
                <Group justify="space-between">
                  <Title order={3}>Content Pipeline</Title>
                  <Button
                    leftSection={<IconPlus size={16} />}
                    color="green"
                    radius="md"
                    onClick={handleAddCourse}
                  >
                    Create New Course
                  </Button>
                </Group>

                <Card
                  shadow="sm"
                  p={isMobile ? 'sm' : 'lg'}
                  radius="md"
                  withBorder
                >
                  <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="lg">
                    {courses.length > 0 ? (
                      courses
                        .slice(recentActivity.length, recentActivity.length + 1)
                        .map(course => (
                          <CourseCard key={course._id} course={course} />
                        ))
                    ) : (
                      <Center>
                        <Text size="sm" c="dimmed">
                          No courses available.
                        </Text>
                      </Center>
                    )}
                  </SimpleGrid>
                </Card>
                <Button
                  m={20}
                  leftSection={<IconPlus size={16} />}
                  color="green"
                  radius="md"
                  onClick={() => setShowAllCourses(true)}
                >
                  Show More
                </Button>
              </Stack>
            </Stack>

            <Group align="start" grow visibleFrom="lg">
              {/* Desktop Layout - Side by Side */}

              {/* Left Side (Banner + Stats + Recent Activity) */}
              <Stack gap="lg" w="40%">
                {/* Banner Section */}
                <Card
                  shadow="sm"
                  p="xl"
                  radius="xl"
                  style={{
                    background: `linear-gradient(90deg, ${currentThemeConfig.colors.primary[8]}, ${currentThemeConfig.colors.secondary[8]})`,
                    color: 'white'
                  }}
                >
                  <Group justify="space-between" align="center" wrap="nowrap">
                    <Stack gap={6} style={{ flex: 1 }}>
                      <Title order={2} fw={700}>
                        {overview.banner.headline}
                      </Title>
                      <Text size="sm" opacity={0.85}>
                        {overview.banner.tag}
                      </Text>
                    </Stack>
                    <Image
                      src={overview.banner.thumbnailBanner}
                      radius="md"
                      alt="Banner"
                      fit="cover"
                      style={{
                        width: '100%',
                        height: '100%',
                        maxWidth: '200px',
                        maxHeight: '150px',
                        objectFit: 'cover',
                        flexShrink: 0,
                        boxShadow: '0 0 10px rgba(0,0,0,0.2)'
                      }}
                    />
                  </Group>
                </Card>

                {/* Dashboard Stats */}
                <SimpleGrid cols={3} spacing={60} mx="auto" my="sm">
                  {[
                    {
                      icon: <IconBook size={24} color="#4F46E5" />,
                      label: 'Total Courses',
                      value: stats.totalCourses,
                      color: 'indigo'
                    },
                    {
                      icon: <IconLayersSubtract size={24} color="#9333EA" />,
                      label: 'Total Modules',
                      value: stats.totalModules,
                      color: 'purple'
                    },
                    {
                      icon: <IconListCheck size={24} color="#EC4899" />,
                      label: 'Total Tasks',
                      value: stats.totalTasks,
                      color: 'pink'
                    }
                  ].map((item, index) => (
                    <Card
                      key={index}
                      shadow="sm"
                      p="md"
                      radius="50%"
                      withBorder
                      style={{
                        width: 150,
                        height: 150,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={e => {
                        const target = e.currentTarget;
                        target.style.transform = 'scale(1.05)';
                        target.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
                      }}
                      onMouseLeave={e => {
                        const target = e.currentTarget;
                        target.style.transform = 'scale(1)';
                        target.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
                      }}
                    >
                      <ThemeIcon
                        size={48}
                        radius="xl"
                        color={item.color}
                        variant="light"
                      >
                        {item.icon}
                      </ThemeIcon>
                      <Text size="sm" c="dimmed" mt={10}>
                        {item.label}
                      </Text>
                      <Title order={3}>{item.value}</Title>
                    </Card>
                  ))}
                </SimpleGrid>

                {/* Recent Activity */}
                <Card shadow="sm" p="lg" radius="md" withBorder>
                  <Group justify="space-between" mb="xs">
                    <Title order={5}>Recent Activity</Title>
                  </Group>
                  <Divider mb="sm" />
                  <Stack gap="sm">
                    {recentActivity.length > 0 ? (
                      recentActivity.map(item => (
                        <Group
                          key={item.id}
                          className="hover:bg-gray-50"
                          p="xs"
                          style={{
                            borderRadius: 8,
                            cursor: 'pointer',
                            transition: '0.2s'
                          }}
                        >
                          <Image
                            src={item.thumbnail}
                            width={40}
                            height={40}
                            radius="sm"
                            alt={item.title}
                          />
                          <Stack gap={0}>
                            <Text size="sm" fw={500}>
                              {item.title}
                            </Text>
                            <Text size="xs" c="dimmed">
                              {item.type}
                            </Text>
                          </Stack>
                        </Group>
                      ))
                    ) : (
                      <Text size="sm" c="dimmed">
                        No recent updates found.
                      </Text>
                    )}
                  </Stack>
                </Card>
              </Stack>

              {/* Right Side (Content Pipeline) */}
              <Stack gap="lg" w="60%">
                <Group justify="space-between">
                  <Title order={3}>Content Pipeline</Title>
                  <Button
                    leftSection={<IconPlus size={16} />}
                    color="green"
                    radius="md"
                    onClick={handleAddCourse}
                  >
                    Create New Course
                  </Button>
                </Group>

                <Card shadow="sm" p="lg" radius="md" withBorder>
                  <ScrollArea h={650}>
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                      {courses.length > 0 ? (
                        courses
                          .slice(
                            recentActivity.length,
                            recentActivity.length + 4
                          )
                          .map(course => (
                            <CourseCard key={course._id} course={course} />
                          ))
                      ) : (
                        <Center>
                          <Text size="sm" c="dimmed">
                            No courses available.
                          </Text>
                        </Center>
                      )}
                    </SimpleGrid>
                  </ScrollArea>
                  <Button
                    m={20}
                    leftSection={<IconPlus size={16} />}
                    color="green"
                    radius="md"
                    onClick={() => setShowAllCourses(true)}
                  >
                    Show More
                  </Button>
                </Card>
              </Stack>
            </Group>
          </Box>
        </>
      )}

      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Course"
        centered
      >
        <Stack gap="md">
          <Text>
            Are you sure you want to delete this course? This action cannot be
            undone.
          </Text>
          <Group justify="flex-end">
            <Button variant="default" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button color="red" onClick={confirmDelete}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};

export default WriterDashboard;
