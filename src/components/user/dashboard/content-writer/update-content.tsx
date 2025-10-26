import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Loader,
  Card,
  Group,
  Text,
  Button,
  SimpleGrid,
  Image,
  Stack,
  Badge
} from '@mantine/core';
import {
  IconClock,
  IconFileText,
  IconPencil,
  IconPlayerPlay,
  IconPlus,
  IconTrash,
  IconArrowLeft,
  IconChartBar,
  IconChecklist,
  IconListCheck
} from '@tabler/icons-react';
import { getCourseById } from '../../../../services/user-services';
import { Course } from '../../../../interfaces/contentwriter';

const CourseUpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (!id) return;
        const data = await getCourseById(id);
        setCourse(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="xl" />
      </div>
    );
  }

  if (!course) {
    return (
      <Text ta="center" mt="xl" c="red">
        Course not found.
      </Text>
    );
  }

  const totalTasks = (course.modules ?? []).reduce(
    (sum, m) => sum + (m.tasks?.length || 0),
    0
  );

  return (
    <Container size="xl" py="xl">
      <Group justify="space-between" mb="lg">
        <Button
          variant="subtle"
          color="grape"
          radius="md"
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => navigate(-1)}
        >
          Back to Dashboard
        </Button>

        <Group gap="lg">
          <Badge
            color={course.status === 'Published' ? 'teal' : 'yellow'}
            variant="light"
            size="lg"
          >
            {course.status}
          </Badge>
          <Button
            leftSection={<IconPencil size={14} />}
            color="grape"
            variant="outline"
            radius="md"
          >
            Edit Course
          </Button>
        </Group>
      </Group>

      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #2e026d 0%, #15162c 100%)',
          color: 'white',
          borderRadius: '35px',
          padding: '2rem 4rem',
          marginBottom: '3rem'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem'
          }}
        >
          <div style={{ flex: 1 }}>
            <Text fw={600} fz="xl" mb="xs">
              {course.courseName}
            </Text>
            <Text fz="sm" opacity={0.9} mb="lg">
              {course.courseDescription}
            </Text>

            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md" mt="xl">
              <Card
                radius="md"
                p="md"
                shadow="sm"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white'
                }}
              >
                <Group gap="xs" mb={4}>
                  <IconChartBar size={20} />
                  <Text fz="md" fw={600} opacity={0.9}>
                    Modules
                  </Text>
                </Group>
                <Text fw={700} fz="lg">
                  {course.modules?.length ?? 0}
                </Text>
              </Card>
              <Card
                radius="md"
                p="md"
                shadow="sm"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white'
                }}
              >
                <Group gap="xs" mb={4}>
                  <IconListCheck size={20} />
                  <Text fz="md" fw={600} opacity={0.9}>
                    Tasks
                  </Text>
                </Group>
                <Text fw={700} fz="lg">
                  {totalTasks}
                </Text>
              </Card>
              <Card
                radius="md"
                p="md"
                shadow="sm"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white'
                }}
              >
                <Group gap="xs" mb={8}>
                  <IconClock size={20} />
                  <Text fz="md" fw={600} opacity={0.9}>
                    Status
                  </Text>
                </Group>
                <Badge
                  color={course.status === 'Published' ? 'teal' : 'yellow'}
                  variant="light"
                  radius="sm"
                  size="sm"
                >
                  {course.status}
                </Badge>
              </Card>
            </SimpleGrid>
          </div>

          <Image
            src={course.thumbnail || '/public/course-thumbnail.png'}
            alt={course.courseName}
            radius="lg"
            w={360}
            h={240}
            fit="cover"
          />
        </div>
      </div>

      <Card
        withBorder
        shadow="sm"
        radius="md"
        p="xs"
        mb="lg"
        style={{ backgroundColor: 'transparent' }}
      >
        <Group justify="space-between" align="flex-start">
          <div>
            <Text fw={700} fz="xl" c="grape.9" mb={4}>
              Course Curriculum
            </Text>

            <Group gap="sm" mt="xs">
              <Badge color="grape" variant="light" radius="sm" size="sm">
                {course.modules?.length ?? 0} Modules
              </Badge>

              <Badge color="violet" variant="light" radius="sm" size="sm">
                {totalTasks} Tasks
              </Badge>
            </Group>
          </div>
          <Button
            color="grape"
            leftSection={<IconPlus size={16} />}
            radius="md"
            variant="filled"
            style={{
              transition: 'transform 0.15s ease',
              alignSelf: 'center'
            }}
            onMouseEnter={e =>
              (e.currentTarget.style.transform = 'scale(1.03)')
            }
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Add Module
          </Button>
        </Group>
      </Card>

      <Stack gap="md">
        {(course.modules ?? []).map((module, index) => (
          <Card key={module._id} withBorder shadow="sm" radius="md" p="lg">
            <Group justify="space-between" mb="sm">
              <Group gap="xs">
                <Text fw={700}>{index + 1}.</Text>
                <Text fw={600}>{module.moduleName}</Text>
                <Badge color="green" variant="light">
                  {module.status}
                </Badge>
                <Text fz="xs" c="dimmed">
                  {module.tasks?.length} tasks
                </Text>
              </Group>

              <Group gap="xs">
                <Button
                  size="xs"
                  variant="subtle"
                  color="grape"
                  leftSection={<IconPencil size={14} />}
                >
                  Edit
                </Button>
                <Button
                  size="xs"
                  variant="subtle"
                  color="grape"
                  leftSection={<IconPlus size={14} />}
                >
                  Add Task
                </Button>
                <Button
                  size="xs"
                  variant="subtle"
                  color="red"
                  leftSection={<IconTrash size={14} />}
                />
              </Group>
            </Group>

            <Stack gap="xs" pl="md">
              {module.tasks?.map(task => (
                <Card
                  key={task._id}
                  radius="sm"
                  p="xs"
                  withBorder
                  style={{ backgroundColor: '#fafafa' }}
                >
                  <Group justify="space-between">
                    <Group gap="xs">
                      {task.type === 'Video' ? (
                        <IconPlayerPlay size={14} />
                      ) : (
                        <IconFileText size={14} />
                      )}
                      <Text fz="sm">{task.taskName}</Text>
                      <Badge
                        size="sm"
                        color={task.status === 'Published' ? 'teal' : 'yellow'}
                        variant="light"
                      >
                        {task.status}
                      </Badge>
                    </Group>
                    <Group gap={4}>
                      <Button
                        variant="subtle"
                        color="grape"
                        size="compact-xs"
                        leftSection={<IconPencil size={12} />}
                      />
                      <Button
                        variant="subtle"
                        color="red"
                        size="compact-xs"
                        leftSection={<IconTrash size={12} />}
                      />
                    </Group>
                  </Group>
                </Card>
              ))}
            </Stack>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default CourseUpdatePage;
