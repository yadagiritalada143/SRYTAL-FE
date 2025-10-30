import React, { useEffect, useMemo, useState } from 'react';
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
  Badge,
  ActionIcon,
  Collapse,
  rem,
  TextInput,
  Textarea,
  Select,
  Modal
} from '@mantine/core';
import {
  IconChevronDown,
  IconChevronUp,
  IconClock,
  IconFileText,
  IconPencil,
  IconPlayerPlay,
  IconPlus,
  IconTrash,
  IconArrowLeft,
  IconChartBar,
  IconListCheck
} from '@tabler/icons-react';
import {
  addCourseModule,
  getCourseById
} from '../../../../services/user-services';
import { Course } from '../../../../interfaces/contentwriter';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../../../../atoms/theme';

const CourseUpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [openedModuleIndex, setOpenedModuleIndex] = useState<number | null>(
    null
  );
  const [opened, setOpened] = useState(false);
  const [moduleName, setModuleName] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [status, setStatus] = useState<'Draft' | 'Published'>('Draft');

  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;
    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (!id) return;
        setLoading(true);

        const data = await getCourseById(id);
        setCourse(data);
      } catch (err) {
        console.error('Failed to fetch course:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleAddModule = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!course) return;
    try {
      setLoading(true);
      const response = await addCourseModule(
        course._id,
        moduleName,
        moduleDescription,
        null
      );
      const newModule = response.data?.data || response.data;
      setCourse(prev =>
        prev ? { ...prev, modules: [...(prev.modules ?? []), newModule] } : prev
      );
      console.log('Module added:', response);
      setOpened(false);
      setModuleName('');
      setModuleDescription('');
      setStatus('Draft');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleModule = (index: number) => {
    setOpenedModuleIndex(openedModuleIndex === index ? null : index);
  };

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
              {[
                {
                  label: 'Modules',
                  value: course.modules?.length ?? 0,
                  icon: <IconChartBar />
                },
                { label: 'Tasks', value: totalTasks, icon: <IconListCheck /> },
                {
                  label: 'Status',
                  value: (
                    <Badge
                      color={course.status === 'Published' ? 'teal' : 'yellow'}
                      variant="light"
                      radius="sm"
                      size="sm"
                    >
                      {course.status}
                    </Badge>
                  ),
                  icon: <IconClock />
                }
              ].map((item, i) => (
                <Card
                  key={i}
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
                    {item.icon}
                    <Text fz="md" fw={600} opacity={0.9}>
                      {item.label}
                    </Text>
                  </Group>
                  <Text fw={700} fz="lg">
                    {item.value}
                  </Text>
                </Card>
              ))}
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
            onClick={() => setOpened(true)}
            onMouseEnter={e =>
              (e.currentTarget.style.transform = 'scale(1.03)')
            }
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Add Module
          </Button>
        </Group>
      </Card>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <form onSubmit={handleAddModule}>
          <TextInput
            required
            label="Module Name"
            placeholder="Enter module name"
            value={moduleName}
            onChange={e => setModuleName(e.currentTarget.value)}
            mb="sm"
          />

          <Textarea
            required
            label="Module Description"
            placeholder="Enter module description"
            value={moduleDescription}
            onChange={e => setModuleDescription(e.currentTarget.value)}
            mb="sm"
          />

          <Select
            label="Status"
            data={['Draft', 'Published']}
            value={status}
            onChange={value => setStatus(value as 'Draft' | 'Published')}
            mb="md"
          />

          <Group justify="flex-end" mt="md">
            <Button
              variant="outline"
              color="gray"
              onClick={() => setOpened(false)}
            >
              Cancel
            </Button>
            <Button type="submit" color="grape" loading={loading}>
              Save Module
            </Button>
          </Group>
        </form>
      </Modal>
      <Stack gap="md">
        {(course.modules ?? []).map((module, index) => {
          const isOpen = openedModuleIndex === index;
          return (
            <Card
              key={module._id}
              withBorder
              shadow="sm"
              radius="md"
              p="lg"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <Group
                justify="space-between"
                mb="sm"
                onClick={() => toggleModule(index)}
                style={{ cursor: 'pointer' }}
              >
                <Group gap="xs">
                  <Text
                    fw={700}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-400 text-purple-950 text-sm shadow-md"
                  >
                    {index + 1}
                  </Text>

                  <Text fw={600}>{module.moduleName}</Text>
                  <Badge color="green" variant="light">
                    {module.status}
                  </Badge>
                  <Text fz="xs" c="dimmed">
                    {module.tasks?.length} tasks
                  </Text>
                </Group>

                <Group gap="xs">
                  <ActionIcon
                    variant="subtle"
                    color="grape"
                    size="sm"
                    onClick={e => {
                      e.stopPropagation();
                    }}
                  >
                    <IconPencil style={{ width: rem(16), height: rem(16) }} />
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    color="grape"
                    size="sm"
                    onClick={e => {
                      e.stopPropagation();
                    }}
                  >
                    <IconPlus style={{ width: rem(16), height: rem(16) }} />
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    size="sm"
                    onClick={e => {
                      e.stopPropagation();
                    }}
                  >
                    <IconTrash style={{ width: rem(16), height: rem(16) }} />
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    color="grape"
                    size="sm"
                    onClick={e => {
                      e.stopPropagation();
                      toggleModule(index);
                    }}
                  >
                    {isOpen ? (
                      <IconChevronUp
                        style={{ width: rem(18), height: rem(18) }}
                      />
                    ) : (
                      <IconChevronDown
                        style={{ width: rem(18), height: rem(18) }}
                      />
                    )}
                  </ActionIcon>
                </Group>
              </Group>

              <Collapse in={isOpen}>
                <Stack gap="xs" pl="md" mt="xs">
                  {module.tasks?.map(task => (
                    <Card key={task._id} radius="sm" p="xs" withBorder>
                      <Group justify="space-between">
                        <Group gap="xs">
                          {task.type === 'Video' ? (
                            <IconPlayerPlay
                              style={{ width: rem(14), height: rem(14) }}
                            />
                          ) : (
                            <IconFileText
                              style={{ width: rem(14), height: rem(14) }}
                            />
                          )}
                          <Text fz="sm">{task.taskName}</Text>
                          <Text
                            fz="xs"
                            variant="outline"
                            style={{
                              borderWidth: '1px',
                              opacity: 0.9,
                              marginLeft: rem(8),
                              padding: '0 5px',
                              width: 'auto',
                              borderRadius: rem(4),
                              textAlign: 'center'
                            }}
                          >
                            {task.type}
                          </Text>
                          <Badge
                            size="sm"
                            color={
                              task.status === 'Published' ? 'teal' : 'yellow'
                            }
                            variant="light"
                          >
                            {task.status}
                          </Badge>
                        </Group>
                        <Group gap={4}>
                          <ActionIcon variant="subtle" color="grape" size="sm">
                            <IconPencil
                              style={{ width: rem(14), height: rem(14) }}
                            />
                          </ActionIcon>
                          <ActionIcon variant="subtle" color="red" size="sm">
                            <IconTrash
                              style={{ width: rem(14), height: rem(14) }}
                            />
                          </ActionIcon>
                        </Group>
                      </Group>
                    </Card>
                  ))}
                </Stack>
              </Collapse>
            </Card>
          );
        })}
      </Stack>
    </Container>
  );
};

export default CourseUpdatePage;
