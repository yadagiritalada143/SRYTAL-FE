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
import { Lesson, Task } from '../../../interfaces/mytasks';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import {
  IconArrowLeft,
  IconArrowRight,
  IconFile,
  IconLink,
  IconVideo
} from '@tabler/icons-react';
import BackButton from '../../UI/Buttonsanimate/BackButton';
import { organizationEmployeeUrls } from '../../../utils/common/constants';
import { toast } from 'react-toastify';
import { StandardModal } from '../../UI/Models/base-model';

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
        {
          id: 'l-1',
          title: 'Welcome to the Course',
          duration: '5m',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          pdfUrl:
            'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        },
        {
          id: 'l-2',
          title: 'What is HTML?',
          duration: '8m',
          link: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'CSS Basics',
      lessons: [
        {
          id: 'l-3',
          title: 'Selectors & Properties',
          duration: '15m',
          videoUrl:
            'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
        },
        {
          id: 'l-4',
          title: 'Box Model',
          duration: '12m',
          pdfUrl:
            'https://file-examples.com/storage/fefb4c41f8a0f5d7c8a55c9/2017/10/file-sample_150kB.pdf'
        },
        {
          id: 'l-5',
          title: 'Empty Lesson',
          duration: '5m'
        }
      ]
    }
  ]
};

const TaskDetail = () => {
  const { taskId } = useParams();
  const [task, setTask] = useRecoilState<Task | null>(taskAtom);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [openedLessonModal, setOpenedLessonModal] = useState(false);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number | null>(
    null
  );
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

  const allLessons =
    task?.sections?.flatMap(section =>
      section.lessons.map(lesson => ({ ...lesson, sectionId: section.id }))
    ) ?? [];

  const handlePrev = () => {
    if (selectedLessonIndex === null) return;
    const prevIndex = selectedLessonIndex - 1;
    if (prevIndex >= 0) {
      setSelectedLesson(allLessons[prevIndex]);
      setSelectedLessonIndex(prevIndex);
    }
  };

  const handleNext = () => {
    if (selectedLessonIndex === null) return;
    const nextIndex = selectedLessonIndex + 1;
    if (nextIndex < allLessons.length) {
      setSelectedLesson(allLessons[nextIndex]);
      setSelectedLessonIndex(nextIndex);
    }
  };

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

  const handleLessonComplete = () => {
    if (!selectedLesson) return;

    setCompletedLessons(prev =>
      prev.includes(selectedLesson.id) ? prev : [...prev, selectedLesson.id]
    );
    toast.success(`Marked lesson as completed: ${selectedLesson.title}`);
  };

  const handleResumeCourse = () => {
    if (!task) return;

    const allLessons =
      (task.sections ?? []).flatMap(section =>
        section.lessons.map(lesson => ({ ...lesson, sectionId: section.id }))
      ) ?? [];

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
    task.sections?.reduce((acc, section) => acc + section.lessons.length, 0) ||
    0;
  const progress = Math.round((completedLessons.length / totalLessons) * 100);

  return (
    <div className="flex flex-col gap-6 px-5 sm:px-8 lg:px-20">
      {/* Back Button */}
      <BackButton
        label="Back"
        onClick={() =>
          navigate(
            `${organizationEmployeeUrls(
              organizationConfig.organization_name
            )}/dashboard/mytasks`
          )
        }
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3 flex-shrink-0">
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
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full items-center">
              <Button
                color="teal"
                radius="md"
                className="shadow-sm hover:shadow-md transition text-sm sm:text-base py-2 sm:py-3 [&>span]:whitespace-normal [&>span]:leading-snug text-center w-[90%] sm:w-1/2"
                onClick={handleResumeCourse}
              >
                Resume Course
              </Button>
              <Button
                variant="light"
                color="blue"
                radius="md"
                className="shadow-sm hover:shadow-md transition text-sm sm:text-base py-2 sm:py-3 [&>span]:whitespace-normal [&>span]:leading-snug text-center w-[90%] sm:w-1/2"
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
                        className="flex items-center justify-between py-2 group hover:bg-gray-50 rounded-md px-2 cursor-pointer flex-wrap"
                        onClick={() => {
                          const index = allLessons.findIndex(
                            (less: Lesson) => less.id === lesson.id
                          );

                          setSelectedLesson(lesson);
                          setSelectedLessonIndex(index);
                          setOpenedLessonModal(true);
                        }}
                      >
                        {/* Left side: checkbox with lesson title */}
                        <Checkbox
                          label={lesson.title}
                          checked={completedLessons.includes(lesson.id)}
                          onChange={() => toggleLesson(lesson.id)}
                          disabled={
                            !(lesson.videoUrl || lesson.pdfUrl || lesson.link)
                          }
                        />

                        {/* Right side: dynamic icon */}
                        <Group gap="xs" className="text-gray-500">
                          {lesson.videoUrl && (
                            <>
                              <IconVideo size={18} />
                              <Text size="sm" c="dimmed">
                                {lesson.duration}
                              </Text>
                            </>
                          )}

                          {lesson.pdfUrl && <IconFile size={18} />}

                          {lesson.link && <IconLink size={18} />}
                        </Group>
                      </div>
                    ))}
                  </div>
                </Collapse>
              </Card>
            ))}
          </div>

          <StandardModal
            opened={openedLessonModal}
            onClose={() => setOpenedLessonModal(false)}
            classNames={{
              content: 'w-[90%] sm:w-[50%] max-w-[90%]'
            }}
            centered
            title={selectedLesson?.title}
          >
            <div className="overflow-y-hidden">
              {selectedLesson && (
                <div>
                  {/* Right-side badges */}
                  <Group mb="md" mt={10} justify="space-between">
                    {selectedLesson.videoUrl && (
                      <Badge color="red" leftSection={<IconVideo size={16} />}>
                        {selectedLesson.duration ?? 'Video'}
                      </Badge>
                    )}
                    {selectedLesson.pdfUrl && (
                      <Badge color="blue" leftSection={<IconFile size={16} />}>
                        PDF
                      </Badge>
                    )}
                    {selectedLesson.link && (
                      <Badge color="teal" leftSection={<IconLink size={16} />}>
                        Link
                      </Badge>
                    )}
                  </Group>

                  {/* Video */}
                  {selectedLesson.videoUrl && (
                    <div className="mb-4 rounded-lg overflow-hidden shadow-sm">
                      <video
                        controls
                        className="w-full rounded-lg"
                        onEnded={() => {
                          handleLessonComplete();
                          handleNext();
                        }}
                      >
                        <source
                          src={selectedLesson.videoUrl}
                          type="video/mp4"
                        />
                        Your browser does not support video.
                      </video>
                    </div>
                  )}

                  {/* PDF */}
                  {selectedLesson.pdfUrl && (
                    <Button
                      component="a"
                      href={selectedLesson.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="light"
                      color="blue"
                      radius="md"
                      fullWidth
                      mt="sm"
                    >
                      <IconFile size={16} className="mr-2" /> View PDF
                    </Button>
                  )}

                  {/* Link */}
                  {selectedLesson.link && (
                    <Button
                      component="a"
                      href={selectedLesson.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="light"
                      color="teal"
                      radius="md"
                      fullWidth
                      mt="sm"
                    >
                      <IconLink size={16} className="mr-2" /> Open Resource
                    </Button>
                  )}

                  {!selectedLesson.videoUrl &&
                    !selectedLesson.pdfUrl &&
                    !selectedLesson.link && (
                      <p className="mt-6 text-center text-sm text-gray-500">
                        No content available for this lesson.
                      </p>
                    )}

                  {/* Action Buttons */}
                  <Group mt="xl" justify="space-between">
                    <Button
                      variant="default"
                      radius="md"
                      onClick={handlePrev}
                      disabled={selectedLessonIndex === 0}
                    >
                      <IconArrowLeft className="mr-1" /> Previous
                    </Button>

                    {(selectedLesson.videoUrl ||
                      selectedLesson.pdfUrl ||
                      selectedLesson.link) && (
                      <Button
                        color="teal"
                        radius="md"
                        onClick={handleLessonComplete}
                        disabled={completedLessons.includes(selectedLesson?.id)}
                      >
                        {completedLessons.includes(selectedLesson?.id)
                          ? 'Lesson Completed'
                          : 'Mark Lesson Completed'}
                      </Button>
                    )}

                    <Button
                      variant="filled"
                      color="blue"
                      radius="md"
                      onClick={handleNext}
                      disabled={
                        selectedLessonIndex === null ||
                        selectedLessonIndex === allLessons.length - 1
                      }
                    >
                      Next <IconArrowRight className="ml-1" />
                    </Button>
                  </Group>
                </div>
              )}
            </div>
          </StandardModal>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
