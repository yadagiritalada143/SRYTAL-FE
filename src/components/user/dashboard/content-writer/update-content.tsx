import React, { useEffect, useMemo, useState } from 'react';
import {
  Container,
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
  Modal,
  FileInput,
  Box
} from '@mantine/core';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Highlight from '@tiptap/extension-highlight';
import {
  IconChevronDown,
  IconChevronUp,
  IconClock,
  IconFileText,
  IconPencil,
  IconPlayerPlay,
  IconPlus,
  IconTrash,
  IconChartBar,
  IconEyePlus,
  IconListCheck,
  IconUpload,
  IconPhoto,
  IconArrowLeft
} from '@tabler/icons-react';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../../../../atoms/theme';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';

interface Task {
  _id: string;
  taskName: string;
  taskDescription: string;
  type: string;
  status: string;
}

interface Module {
  _id: string;
  moduleName: string;
  moduleDescription: string;
  status: string;
  tasks: Task[];
}

interface Course {
  _id: string;
  courseName: string;
  courseDescription: string;
  thumbnail?: string;
  status: string;
  modules: Module[];
}

// Mock data for demonstration
const mockCourse: Course = {
  _id: '1',
  courseName: 'Introduction to Web Development',
  courseDescription:
    '<p>Learn the fundamentals of web development including HTML, CSS, and JavaScript.</p>',
  thumbnail:
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
  status: 'Draft',
  modules: [
    {
      _id: 'm1',
      moduleName: 'Getting Started with HTML',
      moduleDescription: 'Learn the basics of HTML structure and elements',
      status: 'Published',
      tasks: [
        {
          _id: 't1',
          taskName: 'Introduction to HTML',
          taskDescription: 'Learn HTML basics',
          type: 'video',
          status: 'Published'
        },
        {
          _id: 't2',
          taskName: 'HTML Elements',
          taskDescription: 'Understanding HTML elements',
          type: 'text',
          status: 'Draft'
        }
      ]
    },
    {
      _id: 'm2',
      moduleName: 'CSS Fundamentals',
      moduleDescription: 'Master CSS styling and layouts',
      status: 'Draft',
      tasks: []
    }
  ]
};

const CourseUpdatePage: React.FC = () => {
  const [course, setCourse] = useState<Course>(mockCourse);
  const [loading, setLoading] = useState<boolean>(false);
  const [openedModuleIndex, setOpenedModuleIndex] = useState<number | null>(
    null
  );
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Modal states
  const [moduleModalOpened, setModuleModalOpened] = useState<boolean>(false);
  const [taskModalOpened, setTaskModalOpened] = useState<boolean>(false);
  const [courseModalOpened, setCourseModalOpened] = useState<boolean>(false);

  // Form states
  const [moduleName, setModuleName] = useState<string>('');
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);

  const [courseName, setCourseName] = useState<string>('');
  const [courseThumbnail, setCourseThumbnail] = useState<File | null>(null);

  const [taskName, setTaskName] = useState<string>('');
  const [taskContent, setTaskContent] = useState<File | null>(null);
  const [taskThumbnail, setTaskThumbnail] = useState<File | null>(null);
  const [currentModuleId, setCurrentModuleId] = useState<string>('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // Rich Text Editors
  const courseEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] })
    ],
    content: ''
  });

  const moduleEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] })
    ],
    content: ''
  });

  const taskEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] })
    ],
    content: ''
  });

  // Check for mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const resetModuleForm = () => {
    setModuleName('');
    moduleEditor?.commands.setContent('');
    setEditingModuleId(null);
  };

  const resetTaskForm = () => {
    setTaskName('');
    taskEditor?.commands.setContent('');
    setTaskContent(null);
    setTaskThumbnail(null);
    setCurrentModuleId('');
    setEditingTaskId(null);
  };

  const resetCourseForm = () => {
    setCourseName('');
    courseEditor?.commands.setContent('');
    setCourseThumbnail(null);
  };

  const handleEditCourse = () => {
    setCourseName(course.courseName);
    courseEditor?.commands.setContent(course.courseDescription);
    setCourseModalOpened(true);
  };

  const handleUpdateCourse = () => {
    if (!courseEditor) return;
    setLoading(true);
    setTimeout(() => {
      setCourse(prev => ({
        ...prev,
        courseName,
        courseDescription: courseEditor.getHTML()
      }));
      setCourseModalOpened(false);
      resetCourseForm();
      setLoading(false);
    }, 500);
  };

  const handleSaveModule = () => {
    if (!moduleEditor) return;
    setLoading(true);
    const moduleDescription = moduleEditor.getHTML();

    setTimeout(() => {
      if (editingModuleId) {
        setCourse(prev => ({
          ...prev,
          modules: prev.modules.map(m =>
            m._id === editingModuleId
              ? { ...m, moduleName, moduleDescription }
              : m
          )
        }));
      } else {
        const newModule: Module = {
          _id: 'm' + Date.now(),
          moduleName,
          moduleDescription,
          status: 'Draft',
          tasks: []
        };
        setCourse(prev => ({
          ...prev,
          modules: [...prev.modules, newModule]
        }));
      }
      setModuleModalOpened(false);
      resetModuleForm();
      setLoading(false);
    }, 500);
  };

  const handleEditModule = (module: Module) => {
    setModuleName(module.moduleName);
    moduleEditor?.commands.setContent(module.moduleDescription);
    setEditingModuleId(module._id);
    setModuleModalOpened(true);
  };

  const handleDeleteModule = (moduleId: string) => {
    if (!window.confirm('Are you sure you want to delete this module?')) return;
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.filter(m => m._id !== moduleId)
    }));
  };

  const getFileType = (file: File): string => {
    const type = file.type;
    if (type.startsWith('video/')) return 'video';
    if (type.startsWith('image/')) return 'image';
    if (type === 'application/pdf') return 'pdf';
    if (type.startsWith('text/')) return 'text';
    return 'file';
  };

  const handleAddTask = (moduleId: string) => {
    setCurrentModuleId(moduleId);
    setTaskModalOpened(true);
  };

  const handleEditTask = (task: Task, moduleId: string) => {
    setTaskName(task.taskName);
    taskEditor?.commands.setContent(task.taskDescription);
    setCurrentModuleId(moduleId);
    setEditingTaskId(task._id);
    setTaskModalOpened(true);
  };

  const handleSaveTask = () => {
    if (!taskEditor || !taskName) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    const taskDescription = taskEditor.getHTML();

    setTimeout(() => {
      const taskType = taskContent ? getFileType(taskContent) : 'text';

      if (editingTaskId) {
        setCourse(prev => ({
          ...prev,
          modules: prev.modules.map(m => {
            if (m._id === currentModuleId) {
              return {
                ...m,
                tasks: m.tasks.map(t =>
                  t._id === editingTaskId
                    ? { ...t, taskName, taskDescription, type: taskType }
                    : t
                )
              };
            }
            return m;
          })
        }));
      } else {
        const newTask: Task = {
          _id: 't' + Date.now(),
          taskName,
          taskDescription,
          type: taskType,
          status: 'Draft'
        };

        setCourse(prev => ({
          ...prev,
          modules: prev.modules.map(m => {
            if (m._id === currentModuleId) {
              return {
                ...m,
                tasks: [...m.tasks, newTask]
              };
            }
            return m;
          })
        }));
      }

      setTaskModalOpened(false);
      resetTaskForm();
      setLoading(false);
    }, 500);
  };

  const handleDeleteTask = (taskId: string, moduleId: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(m => {
        if (m._id === moduleId) {
          return {
            ...m,
            tasks: m.tasks.filter(t => t._id !== taskId)
          };
        }
        return m;
      })
    }));
  };

  const toggleModule = (index: number) => {
    setOpenedModuleIndex(openedModuleIndex === index ? null : index);
  };

  const totalTasks = course.modules.reduce(
    (sum, m) => sum + (m.tasks?.length || 0),
    0
  );

  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;
    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);

  return (
    <Container size="xl" py="xl" px={{ base: 'xs', sm: 'md' }}>
      <Group justify="space-between" mb="lg" style={{ flexWrap: 'wrap' }}>
        <Button
          variant="subtle"
          color="grape"
          leftSection={<IconArrowLeft size={16} />}
        >
          Back
        </Button>
        <Group gap="sm" style={{ flexWrap: 'wrap' }}>
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
            onClick={handleEditCourse}
          >
            Edit Course
          </Button>
        </Group>
      </Group>

      {/* Header */}
      <Box
        style={{
          background: 'linear-gradient(90deg, #7950f2, #c92a2a)',
          color: 'white',
          borderRadius: '24px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}
      >
        <Stack gap="lg">
          <Box>
            <Text fw={600} size="xl" mb="xs">
              {course.courseName}
            </Text>
            <Text
              component="div"
              size="sm"
              opacity={0.9}
              dangerouslySetInnerHTML={{ __html: course.courseDescription }}
            />
          </Box>

          <SimpleGrid cols={{ base: 1, xs: 2, sm: 3 }} spacing="md">
            {[
              {
                label: 'Modules',
                value: course.modules.length,
                icon: <IconChartBar size={20} />
              },
              {
                label: 'Tasks',
                value: totalTasks,
                icon: <IconListCheck size={20} />
              },
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
                icon: <IconClock size={20} />
              }
            ].map((item, i) => (
              <Card
                key={i}
                radius="md"
                p="md"
                shadow="sm"
                style={{
                  backdropFilter: 'blur(6px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <Group gap="xs" mb={4}>
                  {item.icon}
                  <Text size="sm" fw={600} opacity={0.95}>
                    {item.label}
                  </Text>
                </Group>
                <Text fw={700} size="lg">
                  {item.value}
                </Text>
              </Card>
            ))}
          </SimpleGrid>

          {course.thumbnail && (
            <Image
              src={course.thumbnail}
              alt={course.courseName}
              radius="lg"
              maw={400}
              h={200}
              fit="cover"
              mx="auto"
            />
          )}
        </Stack>
      </Box>

      {/* Curriculum Section */}
      <Card withBorder shadow="sm" radius="md" p="md" mb="lg">
        <Stack gap="md">
          <Group justify="space-between" style={{ flexWrap: 'wrap' }}>
            <Box>
              <Text fw={700} size="xl" c="grape.9" mb={4}>
                Course Curriculum
              </Text>
              <Group gap="sm" mt="xs" style={{ flexWrap: 'wrap' }}>
                <Badge color="grape" variant="light" radius="sm" size="sm">
                  {course.modules.length} Modules
                </Badge>
                <Badge color="violet" variant="light" radius="sm" size="sm">
                  {totalTasks} Tasks
                </Badge>
              </Group>
            </Box>
            <Button
              color="grape"
              leftSection={<IconPlus size={16} />}
              radius="md"
              variant="filled"
              onClick={() => setModuleModalOpened(true)}
            >
              Add Module
            </Button>
          </Group>
        </Stack>
      </Card>

      {/* Edit Course Modal */}
      <Modal
        opened={courseModalOpened}
        onClose={() => {
          setCourseModalOpened(false);
          resetCourseForm();
        }}
        title={
          <Group gap="xs">
            <IconPencil size={24} />
            <Text fw={600} size="lg">
              Edit Course
            </Text>
          </Group>
        }
        centered
        size="lg"
      >
        <Stack gap="md">
          <TextInput
            required
            label="Course Name"
            placeholder="Enter course name"
            value={courseName}
            onChange={e => setCourseName(e.currentTarget.value)}
          />

          <Box>
            <Text size="sm" fw={500} mb={4}>
              Course Description *
            </Text>
            <RichTextEditor
              editor={courseEditor}
              styles={{
                root: {
                  backgroundColor: currentThemeConfig.headerBackgroundColor,
                  color: currentThemeConfig.color,
                  borderColor: currentThemeConfig.borderColor,
                  fontSize: isMobile ? '13px' : '14px'
                },
                toolbar: {
                  backgroundColor: currentThemeConfig.headerBackgroundColor,
                  color: currentThemeConfig.color,
                  border: 'none',
                  padding: isMobile ? '4px' : '8px',
                  gap: isMobile ? '2px' : '4px',
                  flexWrap: 'wrap'
                },
                control: {
                  backgroundColor: currentThemeConfig.headerBackgroundColor,
                  color: currentThemeConfig.color,
                  border: 'none',
                  minWidth: isMobile ? '28px' : '32px',
                  minHeight: isMobile ? '28px' : '32px',
                  padding: isMobile ? '4px' : '6px',
                  '&:hover': {
                    backgroundColor: currentThemeConfig.headerBackgroundColor
                  }
                },
                content: {
                  backgroundColor: currentThemeConfig.headerBackgroundColor,
                  color: currentThemeConfig.color,
                  minHeight: isMobile ? 150 : 200,
                  padding: isMobile ? '0.5rem' : '1rem',
                  fontSize: isMobile ? '13px' : '14px'
                },
                linkEditor: {
                  backgroundColor: currentThemeConfig.headerBackgroundColor,
                  color: currentThemeConfig.color
                }
              }}
            >
              <RichTextEditor.Toolbar sticky stickyOffset={isMobile ? 0 : 60}>
                {!isMobile ? (
                  <>
                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Bold />
                      <RichTextEditor.Italic />
                      <RichTextEditor.Underline />
                      <RichTextEditor.Strikethrough />
                      <RichTextEditor.ClearFormatting />
                      <RichTextEditor.Highlight />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.H1 />
                      <RichTextEditor.H2 />
                      <RichTextEditor.H3 />
                      <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Blockquote />
                      <RichTextEditor.Hr />
                      <RichTextEditor.BulletList />
                      <RichTextEditor.OrderedList />
                      <RichTextEditor.Subscript />
                      <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Link />
                      <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.AlignLeft />
                      <RichTextEditor.AlignCenter />
                      <RichTextEditor.AlignJustify />
                      <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Undo />
                      <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                  </>
                ) : (
                  <>
                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Bold />
                      <RichTextEditor.Italic />
                      <RichTextEditor.Underline />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.H2 />
                      <RichTextEditor.H3 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.BulletList />
                      <RichTextEditor.OrderedList />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Link />
                      <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Undo />
                      <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                  </>
                )}
              </RichTextEditor.Toolbar>
              <RichTextEditor.Content />
            </RichTextEditor>
          </Box>

          <FileInput
            label="Course Thumbnail"
            placeholder="Upload thumbnail image"
            accept="image/*"
            leftSection={<IconPhoto size={16} />}
            value={courseThumbnail}
            onChange={setCourseThumbnail}
            styles={{
              input: {
                cursor: 'pointer',
                minHeight: isMobile ? '80px' : '120px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: currentThemeConfig.headerBackgroundColor,
                color: currentThemeConfig.color,
                borderColor: currentThemeConfig.borderColor,
                fontSize: isMobile ? '12px' : '14px'
              }
            }}
          />
          <Group justify="flex-end" mt="md">
            <Button
              variant="outline"
              color="gray"
              onClick={() => {
                setCourseModalOpened(false);
                resetCourseForm();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateCourse}
              color="grape"
              loading={loading}
            >
              Update Course
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Add/Edit Module Modal */}
      <Modal
        opened={moduleModalOpened}
        onClose={() => {
          setModuleModalOpened(false);
          resetModuleForm();
        }}
        title={
          <Group gap="xs">
            <IconEyePlus size={24} />
            <Text fw={600} size="lg">
              {editingModuleId ? 'Edit Module' : 'Add New Module'}
            </Text>
          </Group>
        }
        centered
        size="lg"
      >
        <Stack gap="md">
          <TextInput
            required
            label="Module Name"
            placeholder="Enter module name"
            value={moduleName}
            onChange={e => setModuleName(e.currentTarget.value)}
            mt="sm"
          />

          <Box>
            <Text size="sm" fw={500} mb={4}>
              Module Description *
            </Text>
            <RichTextEditor
              editor={moduleEditor}
              styles={{
                root: {
                  backgroundColor: currentThemeConfig.headerBackgroundColor,
                  color: currentThemeConfig.color,
                  borderColor: currentThemeConfig.borderColor,
                  fontSize: isMobile ? '13px' : '14px'
                },
                toolbar: {
                  backgroundColor: currentThemeConfig.headerBackgroundColor,
                  color: currentThemeConfig.color,
                  border: 'none',
                  padding: isMobile ? '4px' : '8px',
                  gap: isMobile ? '2px' : '4px',
                  flexWrap: 'wrap'
                },
                control: {
                  backgroundColor: currentThemeConfig.headerBackgroundColor,
                  color: currentThemeConfig.color,
                  border: 'none',
                  minWidth: isMobile ? '28px' : '32px',
                  minHeight: isMobile ? '28px' : '32px',
                  padding: isMobile ? '4px' : '6px',
                  '&:hover': {
                    backgroundColor: currentThemeConfig.headerBackgroundColor
                  }
                },
                content: {
                  backgroundColor: currentThemeConfig.headerBackgroundColor,
                  color: currentThemeConfig.color,
                  minHeight: isMobile ? 150 : 200,
                  padding: isMobile ? '0.5rem' : '1rem',
                  fontSize: isMobile ? '13px' : '14px'
                },
                linkEditor: {
                  backgroundColor: currentThemeConfig.headerBackgroundColor,
                  color: currentThemeConfig.color
                }
              }}
            >
              <RichTextEditor.Toolbar sticky stickyOffset={isMobile ? 0 : 60}>
                {!isMobile ? (
                  <>
                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Bold />
                      <RichTextEditor.Italic />
                      <RichTextEditor.Underline />
                      <RichTextEditor.Strikethrough />
                      <RichTextEditor.ClearFormatting />
                      <RichTextEditor.Highlight />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.H1 />
                      <RichTextEditor.H2 />
                      <RichTextEditor.H3 />
                      <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Blockquote />
                      <RichTextEditor.Hr />
                      <RichTextEditor.BulletList />
                      <RichTextEditor.OrderedList />
                      <RichTextEditor.Subscript />
                      <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Link />
                      <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.AlignLeft />
                      <RichTextEditor.AlignCenter />
                      <RichTextEditor.AlignJustify />
                      <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Undo />
                      <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                  </>
                ) : (
                  <>
                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Bold />
                      <RichTextEditor.Italic />
                      <RichTextEditor.Underline />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.H2 />
                      <RichTextEditor.H3 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.BulletList />
                      <RichTextEditor.OrderedList />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Link />
                      <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Undo />
                      <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                  </>
                )}
              </RichTextEditor.Toolbar>
              <RichTextEditor.Content />
            </RichTextEditor>
          </Box>

          <Group justify="flex-end" mt="md">
            <Button
              variant="outline"
              color="gray"
              onClick={() => {
                setModuleModalOpened(false);
                resetModuleForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveModule} color="grape" loading={loading}>
              {editingModuleId ? 'Update Module' : 'Save Module'}
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Add/Edit Task Modal */}
      <Modal
        opened={taskModalOpened}
        onClose={() => {
          setTaskModalOpened(false);
          resetTaskForm();
        }}
        title={
          <Group gap="xs">
            <IconPlus size={24} />
            <Text fw={600} size="lg">
              {editingTaskId ? 'Edit Task' : 'Add New Task'}
            </Text>
          </Group>
        }
        centered
        size="lg"
      >
        <Stack gap="md">
          <TextInput
            required
            label="Task Name"
            placeholder="Enter task name"
            value={taskName}
            onChange={e => setTaskName(e.currentTarget.value)}
          />

          <Box>
            <Text size="sm" fw={500} mb={4}>
              Task Description *
            </Text>
            <RichTextEditor
              styles={{
                root: {
                  backgroundColor: currentThemeConfig.headerBackgroundColor,
                  color: currentThemeConfig.color,
                  borderColor: currentThemeConfig.borderColor,
                  fontSize: isMobile ? '13px' : '14px'
                },
                toolbar: {
                  backgroundColor: currentThemeConfig.headerBackgroundColor,
                  color: currentThemeConfig.color,
                  border: 'none',
                  padding: isMobile ? '4px' : '8px',
                  gap: isMobile ? '2px' : '4px',
                  flexWrap: 'wrap'
                },
                control: {
                  backgroundColor: currentThemeConfig.headerBackgroundColor,
                  color: currentThemeConfig.color,
                  border: 'none',
                  minWidth: isMobile ? '28px' : '32px',
                  minHeight: isMobile ? '28px' : '32px',
                  padding: isMobile ? '4px' : '6px',
                  '&:hover': {
                    backgroundColor: currentThemeConfig.headerBackgroundColor
                  }
                },
                content: {
                  backgroundColor: currentThemeConfig.headerBackgroundColor,
                  color: currentThemeConfig.color,
                  minHeight: isMobile ? 150 : 200,
                  padding: isMobile ? '0.5rem' : '1rem',
                  fontSize: isMobile ? '13px' : '14px'
                },
                linkEditor: {
                  backgroundColor: currentThemeConfig.headerBackgroundColor,
                  color: currentThemeConfig.color
                }
              }}
              editor={taskEditor}
            >
              <RichTextEditor.Toolbar sticky stickyOffset={isMobile ? 0 : 60}>
                {!isMobile ? (
                  <>
                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Bold />
                      <RichTextEditor.Italic />
                      <RichTextEditor.Underline />
                      <RichTextEditor.Strikethrough />
                      <RichTextEditor.ClearFormatting />
                      <RichTextEditor.Highlight />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.H1 />
                      <RichTextEditor.H2 />
                      <RichTextEditor.H3 />
                      <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Blockquote />
                      <RichTextEditor.Hr />
                      <RichTextEditor.BulletList />
                      <RichTextEditor.OrderedList />
                      <RichTextEditor.Subscript />
                      <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Link />
                      <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.AlignLeft />
                      <RichTextEditor.AlignCenter />
                      <RichTextEditor.AlignJustify />
                      <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Undo />
                      <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                  </>
                ) : (
                  <>
                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Bold />
                      <RichTextEditor.Italic />
                      <RichTextEditor.Underline />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.H2 />
                      <RichTextEditor.H3 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.BulletList />
                      <RichTextEditor.OrderedList />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Link />
                      <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Undo />
                      <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                  </>
                )}
              </RichTextEditor.Toolbar>
              <RichTextEditor.Content />
            </RichTextEditor>
          </Box>

          <FileInput
            label="Task Content"
            placeholder="Upload video, image, PDF, or text file"
            accept="video/*,image/*,application/pdf,text/*,.doc,.docx"
            leftSection={<IconUpload size={16} />}
            value={taskContent}
            onChange={setTaskContent}
            description="The file type will automatically determine the task type"
            styles={{
              input: {
                cursor: 'pointer',
                minHeight: isMobile ? '80px' : '120px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: currentThemeConfig.headerBackgroundColor,
                color: currentThemeConfig.color,
                borderColor: currentThemeConfig.borderColor,
                fontSize: isMobile ? '12px' : '14px'
              }
            }}
          />
          <FileInput
            label="Task Thumbnail (Optional)"
            placeholder="Upload thumbnail image"
            accept="image/*"
            leftSection={<IconPhoto size={16} />}
            value={taskThumbnail}
            onChange={setTaskThumbnail}
            styles={{
              input: {
                cursor: 'pointer',
                minHeight: isMobile ? '80px' : '120px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: currentThemeConfig.headerBackgroundColor,
                color: currentThemeConfig.color,
                borderColor: currentThemeConfig.borderColor,
                fontSize: isMobile ? '12px' : '14px'
              }
            }}
          />
          <Group justify="flex-end" mt="md">
            <Button
              variant="outline"
              color="gray"
              onClick={() => {
                setTaskModalOpened(false);
                resetTaskForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveTask} color="grape" loading={loading}>
              {editingTaskId ? 'Update Task' : 'Add Task'}
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Modules List */}
      <Stack gap="md">
        {course.modules.map((module, index) => {
          const isOpen = openedModuleIndex === index;
          return (
            <Card
              key={module._id}
              withBorder
              shadow="sm"
              radius="md"
              p={{ base: 'sm', sm: 'lg' }}
            >
              <Group
                justify="space-between"
                mb="sm"
                onClick={() => toggleModule(index)}
                style={{ cursor: 'pointer', flexWrap: 'wrap' }}
              >
                <Group gap="xs" style={{ flexWrap: 'wrap' }}>
                  <Text
                    fw={700}
                    className="flex items-center justify-center"
                    style={{
                      backgroundColor: '#7950f2',
                      color: 'white',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {index + 1}
                  </Text>
                  <Text fw={600} size="md">
                    {module.moduleName}
                  </Text>
                  <Badge color="green" variant="light" size="sm">
                    {module.status}
                  </Badge>
                  <Text size="xs" c="dimmed">
                    {module.tasks?.length || 0} tasks
                  </Text>
                </Group>

                <Group gap={4}>
                  <ActionIcon
                    variant="subtle"
                    color="grape"
                    size="sm"
                    onClick={e => {
                      e.stopPropagation();
                      handleEditModule(module);
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
                      handleAddTask(module._id);
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
                      handleDeleteModule(module._id);
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
                <Stack gap="xs" pl={{ base: 0, sm: 'md' }} mt="xs">
                  {module.tasks && module.tasks.length > 0 ? (
                    module.tasks.map(task => (
                      <Card key={task._id} radius="sm" p="xs" withBorder>
                        <Group
                          justify="space-between"
                          style={{ flexWrap: 'wrap' }}
                        >
                          <Group gap="xs" style={{ flexWrap: 'wrap' }}>
                            {task.type === 'video' ? (
                              <IconPlayerPlay
                                style={{ width: rem(14), height: rem(14) }}
                              />
                            ) : task.type === 'image' ? (
                              <IconPhoto
                                style={{ width: rem(14), height: rem(14) }}
                              />
                            ) : (
                              <IconFileText
                                style={{ width: rem(14), height: rem(14) }}
                              />
                            )}
                            <Text size="sm">{task.taskName}</Text>
                            <Badge size="xs" variant="outline">
                              {task.type}
                            </Badge>
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
                            <ActionIcon
                              variant="subtle"
                              color="grape"
                              size="sm"
                              onClick={() => handleEditTask(task, module._id)}
                            >
                              <IconPencil
                                style={{ width: rem(14), height: rem(14) }}
                              />
                            </ActionIcon>
                            <ActionIcon
                              variant="subtle"
                              color="red"
                              size="sm"
                              onClick={() =>
                                handleDeleteTask(task._id, module._id)
                              }
                            >
                              <IconTrash
                                style={{ width: rem(14), height: rem(14) }}
                              />
                            </ActionIcon>
                          </Group>
                        </Group>
                      </Card>
                    ))
                  ) : (
                    <Text size="sm" c="dimmed" ta="center" py="md">
                      No tasks yet. Click the + button to add a task.
                    </Text>
                  )}
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
