import {
  Card,
  Text,
  Checkbox,
  Collapse,
  Badge,
  Button,
  Loader,
  Center,
  Group
} from '@mantine/core';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import ProgressBar from '../../UI/Buttonsanimate/ProgressBar';
import { taskAtom } from '../../../atoms/mytasks-atom';
import { Task } from '../../../interfaces/mytasks';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { IconVideo } from '@tabler/icons-react';
import BackButton from '../../UI/Buttonsanimate/BackButton';
import { organizationEmployeeUrls } from '../../../utils/common/constants';
import { toast } from 'react-toastify';

const fakeTask: Task = {
  id: '1',
  name: 'Html & CSS for Beginners',
  description: 'Learn HTML & CSS from scratch with hands-on projects',
  progress: 0,
  status: 'In Progress',
  image: '/html_css.jpg',
  duration: '3h 20m',
  sections: [
    {
      id: 'sec-1',
      title: 'Introduction',
      lessons: [
        { id: 'l-1', title: 'Welcome to the Course', duration: '5m' },
        { id: 'l-2', title: 'What is HTML?', duration: '8m' }
      ]
    },
    {
      id: 'sec-2',
      title: 'CSS Basics',
      lessons: [
        { id: 'l-3', title: 'Selectors & Properties', duration: '15m' },
        { id: 'l-4', title: 'Box Model', duration: '12m' }
      ]
    }
  ]
};

const TaskDetail = () => {
  const { taskId } = useParams();
  const [task, setTask] = useRecoilState<Task | null>(taskAtom);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setTask(fakeTask);
      setOpenSection(fakeTask.sections?.[0]?.id ?? null);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [taskId, setTask]);

  useEffect(() => {
    const saved = localStorage.getItem(`progress-${taskId}`);
    if (saved) setCompletedLessons(JSON.parse(saved));
  }, [taskId]);

  useEffect(() => {
    localStorage.setItem(
      `progress-${taskId}`,
      JSON.stringify(completedLessons)
    );
  }, [completedLessons, taskId]);

  const toggleLesson = (lessonId: string) => {
    setCompletedLessons(prev =>
      prev.includes(lessonId)
        ? prev.filter(l => l !== lessonId)
        : [...prev, lessonId]
    );
  };

  const handleResumeCourse = () => {
    if (!task) return;

    const allLessons = (task.sections ?? []).flatMap(section =>
      section.lessons.map(lesson => ({ ...lesson, sectionId: section.id }))
    );

    const nextLesson = allLessons.find(
      lesson => !completedLessons.includes(lesson.id)
    );

    if (nextLesson) {
      setOpenSection(nextLesson.sectionId);
      const element = document.getElementById(nextLesson.id);
      if (element)
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });

      toast.success(`Resuming next lesson: ${nextLesson.title}`);
    } else {
      toast.success('You have completed all lessons!');
    }
  };

  const handleMarkAsCompleted = () => {
    if (!task) return;

    const allLessonIds = (task.sections ?? []).flatMap(section =>
      section.lessons.map(lesson => lesson.id)
    );

    setCompletedLessons(allLessonIds);

    if (task.sections?.[0]) setOpenSection(task.sections[0].id);

    toast.success('All lessons marked as completed!');
  };

  if (loading) {
    return (
      <Center h={250}>
        <Loader
          mt={300}
          size="lg"
          type="bars"
          color={organizationConfig.organization_theme.theme.button.color}
        />
      </Center>
    );
  }

  if (!task) {
    return (
      <Center h="80vh">
        <Text>No task found</Text>
      </Center>
    );
  }

  const totalLessons =
    task.sections?.reduce((acc, sec) => acc + sec.lessons.length, 0) || 0;
  const progress = Math.round((completedLessons.length / totalLessons) * 100);

  return (
    <div className="flex flex-col gap-6 ml-20 mr-20">
      {/* Back Button */}
      <BackButton
        label="Go Back"
        onClick={() =>
          navigate(
            `${organizationEmployeeUrls(
              organizationConfig.organization_name
            )}/dashboard/mytasks`
          )
        }
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <Card shadow="md" radius="lg" withBorder p="lg">
            <div className="rounded-lg overflow-hidden">
              <img
                src={task.image}
                alt={task.name}
                className="w-full h-50 object-cover"
              />
            </div>
            <Text size="xl" fw={700} mt="md">
              {task.name}
            </Text>
            <Text size="sm" c="dimmed" mt="xs">
              {task.description}
            </Text>
            <div className="mt-4 flex gap-2 flex-wrap">
              <Badge variant="outline" radius="sm" size="lg" color="gray">
                {totalLessons} lessons
              </Badge>
              <Badge variant="outline" radius="sm" size="lg" color="gray">
                {task.duration}
              </Badge>
            </div>
          </Card>
        </div>
        <div className="flex-1">
          <Card shadow="lg" radius="lg" withBorder p="lg" className="bg-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <Text fw={700} size="lg" className="text-gray-800">
                Course Progress
              </Text>
              <Badge
                color={progress === 100 ? 'green' : 'yellow'}
                size="lg"
                radius="md"
                variant="light"
              >
                {progress === 100 ? 'Completed' : 'In Progress'}
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <ProgressBar progress={progress} />
            </div>
            <Text size="sm" c="dimmed" className="mb-4">
              {completedLessons.length} of {totalLessons} lessons completed
            </Text>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                fullWidth
                color="teal"
                radius="md"
                size="sm"
                className="shadow-sm hover:shadow-md transition"
                onClick={handleResumeCourse}
              >
                Resume Course
              </Button>
              <Button
                fullWidth
                variant="light"
                color="blue"
                radius="md"
                size="sm"
                className="shadow-sm hover:shadow-md transition"
                onClick={handleMarkAsCompleted}
              >
                Mark as Completed
              </Button>
            </div>
          </Card>

          {/* Sections */}
          <div className="mt-6">
            {task.sections?.map((section, secIndex) => (
              <Card
                key={section.id}
                shadow="xs"
                radius="md"
                withBorder
                p="md"
                className="mb-4 hover:shadow-lg transition-all"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setOpenSection(
                      openSection === section.id ? null : section.id
                    )
                  }
                >
                  <Text fw={600}>
                    {secIndex + 1}. {section.title}{' '}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {section.lessons.length} lessons
                  </Text>
                  <Text size="lg" fw={700}>
                    {openSection === section.id ? '−' : '+'}
                  </Text>
                </div>

                {/* Lessons List */}
                <Collapse in={openSection === section.id}>
                  <div className="mt-3 divide-y divide-gray-200">
                    {section.lessons.map(lesson => (
                      <div
                        key={lesson.id}
                        id={lesson.id}
                        className="flex items-center justify-between py-2 group hover:bg-gray-50 rounded-md px-2"
                      >
                        <Checkbox
                          label={lesson.title}
                          checked={completedLessons.includes(lesson.id)}
                          onChange={() => toggleLesson(lesson.id)}
                        />
                        <Group gap="xs" className="text-gray-500">
                          <IconVideo size={18} />
                          <Text size="sm" c="dimmed">
                            {lesson.duration}
                          </Text>
                        </Group>
                      </div>
                    ))}
                  </div>
                </Collapse>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
