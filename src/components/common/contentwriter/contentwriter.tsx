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
  ThemeIcon
} from '@mantine/core';
import {
  IconBook,
  IconLayersSubtract,
  IconListCheck,
  IconPlus
} from '@tabler/icons-react';
import React, { useEffect, useState, useMemo } from 'react';
import { getAllCoursesByUser } from '../../../services/user-services';
import { Course } from '../../../interfaces/contentwriter';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';

const WriterDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalModules: 0,
    totalTasks: 0
  });
  const [recentActivity, setRecentActivity] = useState<
    { id: string; title: string; thumbnail: string; type: string }[]
  >([]);

  const overview = useMemo(
    () => ({
      title: 'Content Writer Dashboard',
      banner: {
        headline: 'Craft Your Written Journey',
        tag: 'The Creator’s Playground',
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
          thumbnail: c.thumbnail || '/assets/default-thumbnail.png',
          type: 'Course'
        }));
      setRecentActivity(recent);
    }
  }, [courses]);

  return (
    <Container size="xl" py="xl">
      {loading ? (
        <Center h={400}>
          <Loader
            size="lg"
            type="bars"
            color={organizationConfig.organization_theme.theme.button.color}
          />
        </Center>
      ) : (
        <>
          <Stack mb="lg" gap={4}>
            <Title order={1}>{overview.title}</Title>
            <Text c="dimmed" mb="md">
              Welcome to your dashboard! Here you can manage and track your
              content creation journey.
            </Text>
          </Stack>
          <Group align="start" grow>
            {/* ================= Left Side (Banner + Stats + Recent Activity) ================= */}
            <Stack gap="lg" w="40%">
              {/* Banner Section */}
              <Card
                shadow="sm"
                p="xl"
                radius="xl"
                style={{
                  background:
                    'linear-gradient(90deg, #6366F1, #8B5CF6, #EC4899)',
                  color: 'white'
                }}
              >
                <Group justify="space-between" align="center" wrap="nowrap">
                  {/* Left Side — Headline + Tag */}
                  <Stack gap={6} style={{ flex: 1 }}>
                    <Title order={2} fw={700}>
                      {overview.banner.headline}
                    </Title>
                    <Text size="sm" opacity={0.85}>
                      {overview.banner.tag}
                    </Text>
                  </Stack>

                  {/* Right Side — Thumbnail */}
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

            {/* ================= Right Side (Content Pipeline) ================= */}
            <Stack gap="lg" w="60%">
              <Group justify="space-between">
                <Title order={3}>Content Pipeline</Title>
                <Button
                  leftSection={<IconPlus size={16} />}
                  color="green"
                  radius="md"
                >
                  Create New Course
                </Button>
              </Group>

              <Card shadow="sm" p="lg" radius="md" withBorder>
                <ScrollArea h={650}>
                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                    {courses.length > 0 ? (
                      courses.map(course => (
                        <Card
                          key={course._id}
                          shadow="xs"
                          radius="md"
                          p="md"
                          withBorder
                        >
                          <Image
                            src={
                              course.thumbnail ||
                              '/assets/default-thumbnail.png'
                            }
                            height={140}
                            radius="md"
                            mb="sm"
                          />
                          <Stack gap={4}>
                            <Text fw={600} size="md">
                              {course.courseName}
                            </Text>
                            <Text size="sm" c="dimmed" lineClamp={2}>
                              {course.courseDescription}
                            </Text>
                            <Badge
                              color="blue"
                              mt="xs"
                              radius="sm"
                              variant="light"
                            >
                              {course.status || 'N/A'}
                            </Badge>
                          </Stack>
                        </Card>
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
              </Card>
            </Stack>
          </Group>
        </>
      )}
    </Container>
  );
};

export default WriterDashboard;
