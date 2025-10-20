import {
  Container,
  Card,
  Stack,
  Title,
  Text,
  Group,
  Image,
  Box,
  ActionIcon,
  Badge,
  Divider,
  Button,
  Paper
} from '@mantine/core';
import {
  IconArrowLeft,
  IconEdit,
  IconTrash,
  IconClock,
  IconUsers,
  IconBook
} from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { themeAtom } from '../../../../atoms/theme';
import { useMediaQuery } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

// Mock course data - replace with actual data from props or API
const mockCourse = {
  id: '1',
  courseName: 'Introduction to Web Development',
  courseDescription: `
    <h2>Course Overview</h2>
    <p>This comprehensive course will guide you through the fundamentals of web development, covering HTML, CSS, and JavaScript.</p>

    <h3>What You'll Learn</h3>
    <ul>
      <li>Build responsive websites from scratch</li>
      <li>Master modern CSS techniques and frameworks</li>
      <li>Create interactive web applications with JavaScript</li>
      <li>Understand web development best practices</li>
    </ul>

    <h3>Prerequisites</h3>
    <p>No prior programming experience required! This course is designed for complete beginners.</p>

    <h3>Course Structure</h3>
    <p>The course consists of 12 modules, each building on the previous one to ensure a solid understanding of core concepts.</p>
  `,
  thumbnailUrl:
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
  createdAt: '2024-10-15',
  status: 'published',
  students: 245,
  modules: 12,
  duration: '8 weeks'
};

export const ContentWriterEditCourse = () => {
  const [course] = useState(mockCourse);
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;
    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);

  const handleEdit = () => {
    // Navigate to edit page
    navigate(`/courses/edit/${course.id}`);
  };

  const handleDelete = () => {
    // Show confirmation modal and handle delete
    console.log('Delete course');
  };

  return (
    <Container
      size="lg"
      py={{ base: 'md', sm: 'xl' }}
      px={{ base: 'xs', sm: 'md' }}
    >
      <Stack gap="lg">
        {/* Header */}
        <Stack gap="sm">
          <Group justify="space-between" align="flex-start" wrap="wrap">
            <Group gap="sm" align="flex-start" style={{ flex: 1 }}>
              <ActionIcon
                variant="subtle"
                color="gray"
                size={isMobile ? 'md' : 'lg'}
                onClick={() => window.history.back()}
                mt={{ base: 4, sm: 0 }}
              >
                <IconArrowLeft size={isMobile ? 18 : 20} />
              </ActionIcon>
              <Stack gap={4} style={{ flex: 1 }}>
                <Title order={isMobile ? 2 : 1}>{course.courseName}</Title>
                <Text size={isMobile ? 'xs' : 'sm'} c="dimmed">
                  Created on{' '}
                  {new Date(course.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              </Stack>
            </Group>
            <Badge
              size={isMobile ? 'md' : 'lg'}
              variant="light"
              color={course.status === 'published' ? 'green' : 'blue'}
              mt={{ base: 'xs', sm: 0 }}
            >
              {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
            </Badge>
          </Group>
          <Divider />
        </Stack>

        {/* Course Stats */}
        <Card
          shadow="sm"
          p={{ base: 'md', sm: 'lg' }}
          radius="md"
          withBorder
          style={{
            backgroundColor: currentThemeConfig.headerBackgroundColor,
            color: currentThemeConfig.color,
            borderColor: currentThemeConfig.borderColor
          }}
        >
          <Group
            gap={isMobile ? 'md' : 'xl'}
            justify="space-around"
            wrap="wrap"
          >
            <Stack gap={4} align="center">
              <Group gap="xs">
                <IconUsers size={isMobile ? 18 : 20} color="#228BE6" />
                <Text size={isMobile ? 'lg' : 'xl'} fw={700}>
                  {course.students}
                </Text>
              </Group>
              <Text size={isMobile ? 'xs' : 'sm'} c="dimmed">
                Students
              </Text>
            </Stack>

            <Stack gap={4} align="center">
              <Group gap="xs">
                <IconBook size={isMobile ? 18 : 20} color="#228BE6" />
                <Text size={isMobile ? 'lg' : 'xl'} fw={700}>
                  {course.modules}
                </Text>
              </Group>
              <Text size={isMobile ? 'xs' : 'sm'} c="dimmed">
                Modules
              </Text>
            </Stack>

            <Stack gap={4} align="center">
              <Group gap="xs">
                <IconClock size={isMobile ? 18 : 20} color="#228BE6" />
                <Text size={isMobile ? 'lg' : 'xl'} fw={700}>
                  {course.duration}
                </Text>
              </Group>
              <Text size={isMobile ? 'xs' : 'sm'} c="dimmed">
                Duration
              </Text>
            </Stack>
          </Group>
        </Card>

        {/* Course Thumbnail */}
        <Card
          shadow="sm"
          p={{ base: 'md', sm: 'xl' }}
          radius="md"
          withBorder
          style={{
            backgroundColor: currentThemeConfig.headerBackgroundColor,
            color: currentThemeConfig.color,
            borderColor: currentThemeConfig.borderColor
          }}
        >
          <Stack gap="md">
            <Text size={isMobile ? 'sm' : 'md'} fw={600}>
              Course Thumbnail
            </Text>
            <Image
              src={course.thumbnailUrl}
              height={isMobile ? 200 : 400}
              radius="md"
              fit="cover"
              alt="Course thumbnail"
            />
          </Stack>
        </Card>

        {/* Course Description */}
        <Card
          shadow="sm"
          p={{ base: 'md', sm: 'xl' }}
          radius="md"
          withBorder
          style={{
            backgroundColor: currentThemeConfig.headerBackgroundColor,
            color: currentThemeConfig.color,
            borderColor: currentThemeConfig.borderColor
          }}
        >
          <Stack gap="md">
            <Text size={isMobile ? 'sm' : 'md'} fw={600}>
              Course Description
            </Text>
            <Paper
              p={{ base: 'sm', sm: 'md' }}
              radius="md"
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
                dangerouslySetInnerHTML={{ __html: course.courseDescription }}
              />
            </Paper>
          </Stack>
        </Card>

        {/* Action Buttons */}
        <Card shadow="sm" p={{ base: 'md', sm: 'lg' }} radius="md" withBorder>
          <Stack gap="sm" hiddenFrom="sm">
            {/* Mobile: Stacked buttons */}
            <Button
              fullWidth
              leftSection={<IconEdit size={16} />}
              onClick={handleEdit}
            >
              Edit Course
            </Button>

            <Button
              fullWidth
              variant="light"
              color="red"
              leftSection={<IconTrash size={16} />}
              onClick={handleDelete}
            >
              Delete Course
            </Button>
          </Stack>

          <Group justify="space-between" wrap="nowrap" visibleFrom="sm">
            {/* Desktop: Horizontal buttons */}
            <Button
              variant="light"
              color="red"
              leftSection={<IconTrash size={18} />}
              onClick={handleDelete}
            >
              Delete Course
            </Button>
            <Button leftSection={<IconEdit size={18} />} onClick={handleEdit}>
              Edit Course
            </Button>
          </Group>
        </Card>
      </Stack>
    </Container>
  );
};

export default ContentWriterEditCourse;
