import React, { useState, useEffect, useMemo } from 'react';
import {
  Modal,
  Stack,
  TextInput,
  Textarea,
  Select,
  Group,
  Text,
  Alert,
  ThemeIcon,
  Paper
} from '@mantine/core';
import {
  IconListCheck,
  IconBook,
  IconLayersSubtract,
  IconAlertCircle,
  IconCheck,
  IconArrowRight
} from '@tabler/icons-react';
import { CommonButton } from '@components/common/button/CommonButton';
import { useAppTheme } from '@hooks/use-app-theme';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import { Course } from '@interfaces/contentwriter';
import { useAddCourseTask } from '@hooks/mutations/useUserMutations';
import { getNextOrderIdx } from '@utils/common/course-order';

export interface CreateQuizTaskModalProps {
  opened: boolean;
  onClose: () => void;
  courses: Course[];
  initialCourseId?: string;
  initialModuleId?: string;
  onCreated?: (
    quiz: {
      taskId: string;
      taskName: string;
      courseName: string;
      moduleName: string;
      courseId: string;
      moduleId: string;
    },
    openQuestionsBuilder?: boolean
  ) => void;
}

export const CreateQuizTaskModal: React.FC<CreateQuizTaskModalProps> = ({
  opened,
  onClose,
  courses,
  initialCourseId = '',
  initialModuleId = '',
  onCreated
}) => {
  const { themeConfig } = useAppTheme();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const [courseId, setCourseId] = useState(initialCourseId);
  const [moduleId, setModuleId] = useState(initialModuleId);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [touched, setTouched] = useState({
    courseId: false,
    moduleId: false,
    taskName: false,
    taskDescription: false
  });
  const [submittingAction, setSubmittingAction] = useState<
    'create' | 'createAndQuestions' | null
  >(null);

  const { mutateAsync: addTask, isPending } = useAddCourseTask(courseId);

  useEffect(() => {
    if (opened) {
      setCourseId(initialCourseId);
      setModuleId(initialModuleId);
      setTaskName('');
      setTaskDescription('');
      setSubmittingAction(null);
      setTouched({
        courseId: false,
        moduleId: false,
        taskName: false,
        taskDescription: false
      });
    }
  }, [opened, initialCourseId, initialModuleId]);

  const courseOptions = useMemo(
    () =>
      courses.map(c => ({
        value: c._id,
        label: c.courseName || 'Untitled Course'
      })),
    [courses]
  );

  const selectedCourse = useMemo(
    () => courses.find(c => c._id === courseId),
    [courses, courseId]
  );

  const moduleOptions = useMemo(() => {
    if (!selectedCourse?.modules) return [];
    return selectedCourse.modules.map(m => ({
      value: m._id,
      label: m.moduleName || 'Untitled Module'
    }));
  }, [selectedCourse]);

  const handleCourseChange = (newCourseId: string | null) => {
    const cid = newCourseId || '';
    setCourseId(cid);
    setTouched(prev => ({ ...prev, courseId: true }));

    const course = courses.find(c => c._id === cid);
    const hasCurrentModule = course?.modules?.some(m => m._id === moduleId);
    if (!hasCurrentModule) {
      setModuleId(course?.modules?.[0]?._id || '');
    }
  };

  const errors = {
    courseId: touched.courseId && !courseId ? 'Course is required.' : '',
    moduleId: touched.moduleId && !moduleId ? 'Module is required.' : '',
    taskName:
      touched.taskName && !taskName.trim()
        ? 'Quiz title is required.'
        : taskName.length > 100
          ? 'Quiz title must be at most 100 characters.'
          : '',
    taskDescription:
      touched.taskDescription && !taskDescription.trim()
        ? 'Quiz description is required.'
        : ''
  };

  const isFormValid =
    courseId &&
    moduleId &&
    taskName.trim() &&
    taskName.length <= 100 &&
    taskDescription.trim();

  const handleCreate = async (openQuestionsBuilder = false) => {
    setTouched({
      courseId: true,
      moduleId: true,
      taskName: true,
      taskDescription: true
    });

    if (!isFormValid || isPending) return;

    setSubmittingAction(openQuestionsBuilder ? 'createAndQuestions' : 'create');

    const selectedModule = selectedCourse?.modules?.find(
      m => m._id === moduleId
    );

    try {
      const response = await addTask({
        moduleId,
        taskName: taskName.trim(),
        taskDescription: taskDescription.trim(),
        type: 'QUIZ',
        orderIdx: getNextOrderIdx(selectedModule?.tasks),
        thumbnail: null
      });

      showSuccessToast(response?.message || 'Quiz task created successfully!');

      const createdTaskId =
        response?.task?._id || response?.data?._id || response?._id || '';

      onCreated?.(
        {
          taskId: createdTaskId,
          taskName: taskName.trim(),
          courseName: selectedCourse?.courseName || 'Course',
          moduleName: selectedModule?.moduleName || 'Module',
          courseId,
          moduleId
        },
        openQuestionsBuilder
      );

      onClose();
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to create quiz task'));
    } finally {
      setSubmittingAction(null);
    }
  };

  const isCreatingOnly = isPending && submittingAction === 'create';
  const isCreatingAndQuestions =
    isPending && submittingAction === 'createAndQuestions';

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap='xs' align='center'>
          <ThemeIcon size={30} radius='md' variant='light' color='indigo'>
            <IconListCheck size={18} />
          </ThemeIcon>
          <Stack gap={1}>
            <Text fw={700} size='sm' style={{ color: themeConfig.color }}>
              Create Quiz Task
            </Text>
            <Text size='xs' c='dimmed'>
              Add a new quiz assessment to any course module
            </Text>
          </Stack>
        </Group>
      }
      size='lg'
      centered
      radius='md'
      styles={{
        header: {
          backgroundColor: themeConfig.cardBackground,
          borderBottom: `1px solid ${themeConfig.borderColor}`
        },
        content: {
          backgroundColor: themeConfig.cardBackground,
          color: themeConfig.color
        }
      }}
    >
      <Stack gap='md' mt='xs'>
        <Paper
          p='sm'
          radius='md'
          withBorder
          style={{
            borderColor: themeConfig.borderColor,
            backgroundColor: 'rgba(99, 102, 241, 0.03)'
          }}
        >
          <Stack gap='xs'>
            <Select
              label='Select Course'
              placeholder='Choose which course this quiz belongs to'
              leftSection={<IconBook size={16} />}
              data={courseOptions}
              value={courseId}
              onChange={handleCourseChange}
              onBlur={() => setTouched(prev => ({ ...prev, courseId: true }))}
              error={errors.courseId}
              required
              searchable
              radius='md'
              comboboxProps={{ withinPortal: true }}
            />

            <Select
              label='Select Module'
              placeholder={
                !courseId
                  ? 'First choose a course above'
                  : moduleOptions.length === 0
                    ? 'No modules found in this course'
                    : 'Choose which module this quiz belongs to'
              }
              leftSection={<IconLayersSubtract size={16} />}
              data={moduleOptions}
              value={moduleId}
              onChange={val => {
                setModuleId(val || '');
                setTouched(prev => ({ ...prev, moduleId: true }));
              }}
              onBlur={() => setTouched(prev => ({ ...prev, moduleId: true }))}
              error={errors.moduleId}
              disabled={!courseId || moduleOptions.length === 0}
              required
              radius='md'
              comboboxProps={{ withinPortal: true }}
            />

            {courseId && moduleOptions.length === 0 && (
              <Alert
                icon={<IconAlertCircle size={16} />}
                color='orange'
                radius='md'
                py='xs'
              >
                This course does not have any modules yet. Please add a module
                to this course before creating quiz tasks.
              </Alert>
            )}
          </Stack>
        </Paper>

        <TextInput
          label='Quiz Title'
          placeholder='e.g. JavaScript Async & Promises Assessment'
          value={taskName}
          onChange={e => setTaskName(e.currentTarget.value)}
          onBlur={() => setTouched(prev => ({ ...prev, taskName: true }))}
          error={errors.taskName}
          required
          radius='md'
          description='Give your quiz a descriptive, professional title.'
        />

        <Textarea
          label='Quiz Description'
          placeholder='e.g. Test understanding of async/await, Promise chaining, and microtask queues.'
          value={taskDescription}
          onChange={e => setTaskDescription(e.currentTarget.value)}
          onBlur={() =>
            setTouched(prev => ({ ...prev, taskDescription: true }))
          }
          error={errors.taskDescription}
          required
          autosize
          minRows={3}
          maxRows={6}
          radius='md'
          description='Explain the concepts covered and the goal of this assessment.'
        />

        {/* Action Buttons */}
        <Group justify='flex-end' gap='sm' mt='sm'>
          <CommonButton
            variant='default'
            onClick={onClose}
            disabled={isPending}
            size='sm'
          >
            Cancel
          </CommonButton>

          <CommonButton
            variant='light'
            color='indigo'
            onClick={() => handleCreate(false)}
            loading={isCreatingOnly}
            disabled={isPending || !isFormValid}
            size='sm'
            leftSection={<IconCheck size={16} />}
          >
            {isCreatingOnly ? 'Creating...' : 'Create Quiz Task'}
          </CommonButton>

          <CommonButton
            variant='filled'
            color='indigo'
            onClick={() => handleCreate(true)}
            loading={isCreatingAndQuestions}
            disabled={isPending || !isFormValid}
            size='sm'
            rightSection={<IconArrowRight size={16} />}
          >
            {isCreatingAndQuestions ? 'Creating...' : 'Create & Add Questions'}
          </CommonButton>
        </Group>
      </Stack>
    </Modal>
  );
};

export default CreateQuizTaskModal;
