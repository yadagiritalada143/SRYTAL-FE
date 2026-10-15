import {
  Modal,
  Stack,
  Text,
  Group,
  ThemeIcon,
  Paper,
  Badge,
  TextInput,
  Checkbox,
  ActionIcon,
  Collapse,
  ScrollArea,
  Box
} from '@mantine/core';
import {
  IconCopy,
  IconChevronDown,
  IconLayersSubtract,
  IconCode,
  IconFileText,
  IconExternalLink,
  IconInfoCircle,
  IconCheck
} from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import { useAppTheme } from '@hooks/use-app-theme';
import { useCloneCourse } from '@hooks/mutations/useUserMutations';
import { useGetCourseById } from '@hooks/queries/useUserQueries';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import { CommonButton } from '@components/common/button/CommonButton';
import { Course, Module, Task } from '@interfaces/contentwriter';
import CourseThumbnail from './CourseThumbnail';

interface CloneCourseModalProps {
  opened: boolean;
  onClose: () => void;
  course: Course | null;
  onSuccess?: (clonedData: any) => void;
}

const CloneCourseModal = ({
  opened,
  onClose,
  course,
  onSuccess
}: CloneCourseModalProps) => {
  const { themeConfig: currentThemeConfig, isDarkTheme } = useAppTheme();
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const { mutateAsync: cloneCourse, isPending } = useCloneCourse();

  const shouldFetchDetails = Boolean(
    opened && course?._id && (!course?.modules || course.modules.length === 0)
  );
  const { data: fullCourseData, isLoading: isFetchingCourse } =
    useGetCourseById(course?._id || '', shouldFetchDetails);

  const effectiveCourse: Course | null = fullCourseData || course;

  const [courseName, setCourseName] = useState('');
  const [courseNameTouched, setCourseNameTouched] = useState(false);
  const [selectedModules, setSelectedModules] = useState<Set<string>>(
    new Set()
  );
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [expandedModules, setExpandedModules] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    if (opened && effectiveCourse) {
      setCourseName(
        effectiveCourse.courseName
          ? `${effectiveCourse.courseName} (Clone)`
          : ''
      );
      setCourseNameTouched(false);

      const modules = effectiveCourse.modules || [];
      const modIds = new Set<string>();
      const taskIds = new Set<string>();
      const expanded: Record<string, boolean> = {};

      modules.forEach((mod: Module) => {
        modIds.add(mod._id);
        expanded[mod._id] = true;
        (mod.tasks || []).forEach((t: Task) => {
          taskIds.add(t._id);
        });
      });

      setSelectedModules(modIds);
      setSelectedTasks(taskIds);
      setExpandedModules(expanded);
    }
  }, [opened, effectiveCourse?._id]);

  const modulesList = useMemo(
    () => effectiveCourse?.modules || [],
    [effectiveCourse]
  );

  const totalModulesCount = modulesList.length;
  const totalTasksCount = useMemo(() => {
    return modulesList.reduce(
      (sum, m) => sum + (Array.isArray(m.tasks) ? m.tasks.length : 0),
      0
    );
  }, [modulesList]);

  // Total selected counts
  const selectedModulesCount = useMemo(() => {
    return modulesList.filter(m => selectedModules.has(m._id)).length;
  }, [modulesList, selectedModules]);

  const selectedTasksCount = useMemo(() => {
    return modulesList.reduce((sum, m) => {
      if (!selectedModules.has(m._id)) return sum;
      const count = (m.tasks || []).filter(t =>
        selectedTasks.has(t._id)
      ).length;
      return sum + count;
    }, 0);
  }, [modulesList, selectedModules, selectedTasks]);

  // checkbox calculations
  const allChecked = useMemo(() => {
    if (totalModulesCount === 0) return false;
    return (
      selectedModulesCount === totalModulesCount &&
      selectedTasksCount === totalTasksCount
    );
  }, [
    selectedModulesCount,
    totalModulesCount,
    selectedTasksCount,
    totalTasksCount
  ]);

  const isMasterIndeterminate = useMemo(() => {
    const hasAnySelection = selectedModulesCount > 0 || selectedTasksCount > 0;
    return hasAnySelection && !allChecked;
  }, [selectedModulesCount, selectedTasksCount, allChecked]);

  // Master toggle
  const handleToggleMaster = () => {
    if (allChecked) {
      setSelectedModules(new Set());
      setSelectedTasks(new Set());
    } else {
      const allMods = new Set<string>();
      const allTasks = new Set<string>();
      modulesList.forEach(m => {
        allMods.add(m._id);
        (m.tasks || []).forEach(t => allTasks.add(t._id));
      });
      setSelectedModules(allMods);
      setSelectedTasks(allTasks);
    }
  };

  // Module toggle
  const handleToggleModule = (mod: Module) => {
    const isCurrentlySelected = selectedModules.has(mod._id);
    const modTasks = mod.tasks || [];
    const allModTasksSelected =
      modTasks.length > 0 && modTasks.every(t => selectedTasks.has(t._id));

    const nextModules = new Set(selectedModules);
    const nextTasks = new Set(selectedTasks);

    if (isCurrentlySelected && (allModTasksSelected || modTasks.length === 0)) {
      nextModules.delete(mod._id);
      modTasks.forEach(t => nextTasks.delete(t._id));
    } else {
      nextModules.add(mod._id);
      modTasks.forEach(t => nextTasks.add(t._id));
    }

    setSelectedModules(nextModules);
    setSelectedTasks(nextTasks);
  };

  // Task toggle
  const handleToggleTask = (modId: string, taskId: string) => {
    const nextTasks = new Set(selectedTasks);
    const nextModules = new Set(selectedModules);

    if (nextTasks.has(taskId)) {
      nextTasks.delete(taskId);
    } else {
      nextTasks.add(taskId);
      nextModules.add(modId);
    }

    setSelectedTasks(nextTasks);
    setSelectedModules(nextModules);
  };

  // Expand / collapse single module
  const toggleExpand = (modId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  // Expand / collapse all modules
  const areAllExpanded = useMemo(() => {
    return modulesList.every(m => Boolean(expandedModules[m._id]));
  }, [modulesList, expandedModules]);

  const handleToggleExpandAll = () => {
    const target = !areAllExpanded;
    const next: Record<string, boolean> = {};
    modulesList.forEach(m => {
      next[m._id] = target;
    });
    setExpandedModules(next);
  };

  // Validation
  const courseNameError = useMemo(() => {
    if (!courseNameTouched) return '';
    if (!courseName.trim()) return 'Course name is required.';
    if (courseName.trim().length > 150)
      return 'Course name cannot exceed 150 characters.';
    return '';
  }, [courseName, courseNameTouched]);

  const isFormValid =
    courseName.trim().length > 0 &&
    courseName.trim().length <= 150 &&
    selectedModulesCount > 0;

  // Submit Clone
  const handleSubmit = async () => {
    setCourseNameTouched(true);
    if (!effectiveCourse || !isFormValid) return;

    const modulesPayload = modulesList
      .filter(m => selectedModules.has(m._id))
      .map(m => ({
        moduleId: m._id,
        taskIds: (m.tasks || [])
          .filter(t => selectedTasks.has(t._id))
          .map(t => t._id)
      }));

    if (modulesPayload.length === 0) {
      showErrorToast('Please select at least one module to clone.');
      return;
    }

    try {
      const response = await cloneCourse({
        courseId: effectiveCourse._id,
        courseName: courseName.trim(),
        modules: modulesPayload
      });

      showSuccessToast(
        response?.message || 'Course cloned successfully into an active course!'
      );
      onSuccess?.(response?.data);
      onClose();
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to clone course'));
    }
  };

  if (!course || !effectiveCourse) return null;

  return (
    <Modal
      opened={opened}
      onClose={isPending ? () => {} : onClose}
      title='Clone Course'
      centered
      radius='lg'
      size='lg'
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      transitionProps={{ transition: 'pop', duration: 200 }}
      styles={{
        header: {
          backgroundColor: isDarkTheme ? '#1e293b' : '#ffffff',
          borderBottom: `1px solid ${isDarkTheme ? '#334155' : '#e2e8f0'}`,
          paddingBottom: '12px'
        },
        title: {
          fontWeight: 700,
          fontSize: '1.15rem',
          color: isDarkTheme ? '#f1f5f9' : '#0f172a'
        },
        content: {
          backgroundColor: isDarkTheme ? '#1e293b' : '#ffffff',
          color: isDarkTheme ? '#f1f5f9' : '#0f172a',
          borderRadius: '16px'
        }
      }}
    >
      <Stack gap='md' className='mt-3'>
        <Paper
          p='sm'
          radius='md'
          withBorder
          style={{
            borderColor: isDarkTheme ? '#334155' : 'rgba(99, 102, 241, 0.25)',
            backgroundColor: isDarkTheme
              ? 'rgba(99, 102, 241, 0.12)'
              : 'rgba(99, 102, 241, 0.05)'
          }}
        >
          <Group gap='sm' wrap='nowrap' align='flex-start'>
            <ThemeIcon size={38} radius='md' variant='light' color='indigo'>
              <IconCopy size={20} />
            </ThemeIcon>
            <Stack gap={2} style={{ minWidth: 0, flex: 1 }}>
              <Text fw={600} size='sm'>
                Clone Archived Curriculum into a New Active Course
              </Text>
              <Text size='xs' c='dimmed' style={{ lineHeight: 1.4 }}>
                Select the modules and tasks you wish to copy. A brand new{' '}
                <Text component='span' fw={600} c='green'>
                  ACTIVE
                </Text>{' '}
                course will be created immediately. The original archived course
                remains untouched.
              </Text>
            </Stack>
          </Group>
        </Paper>

        <Paper
          p='xs'
          px='sm'
          radius='md'
          withBorder
          style={{
            borderColor: isDarkTheme ? '#334155' : '#e2e8f0',
            backgroundColor: isDarkTheme ? '#0f172a' : '#f8fafc'
          }}
        >
          <Group justify='space-between' align='center' wrap='nowrap'>
            <Group gap='sm' wrap='nowrap' style={{ minWidth: 0 }}>
              <CourseThumbnail
                name={effectiveCourse.courseName}
                src={effectiveCourse.thumbnailUrl || effectiveCourse.thumbnail}
                size={38}
                radius='sm'
              />
              <Stack gap={0} style={{ minWidth: 0 }}>
                <Text size='xs' c='dimmed' tt='uppercase' fw={700}>
                  Archived Source Course
                </Text>
                <Text fw={600} size='sm' lineClamp={1}>
                  {effectiveCourse.courseName}
                </Text>
              </Stack>
            </Group>
            <Badge size='xs' variant='light' color='orange'>
              Archived
            </Badge>
          </Group>
        </Paper>

        <TextInput
          label='New Course Name'
          placeholder='e.g. Fullstack React & Node.js 2026'
          required
          radius='md'
          value={courseName}
          onChange={e => {
            setCourseName(e.target.value);
            if (!courseNameTouched) setCourseNameTouched(true);
          }}
          onBlur={() => setCourseNameTouched(true)}
          error={courseNameError}
          rightSection={
            <Text size='xs' c='dimmed' pr='xs'>
              {courseName.length}/150
            </Text>
          }
        />

        <Stack gap='xs'>
          <Group justify='space-between' align='center' wrap='wrap' gap='xs'>
            <Group gap='xs' align='center'>
              <Checkbox
                checked={allChecked}
                indeterminate={isMasterIndeterminate}
                onChange={handleToggleMaster}
                label={
                  <Text fw={600} size='sm'>
                    Select All Curriculum
                  </Text>
                }
                radius='sm'
                color='indigo'
              />
              <Badge
                size='sm'
                variant='light'
                color={selectedModulesCount > 0 ? 'indigo' : 'gray'}
              >
                {selectedModulesCount}/{totalModulesCount} Modules •{' '}
                {selectedTasksCount}/{totalTasksCount} Tasks
              </Badge>
            </Group>

            {modulesList.length > 0 && (
              <CommonButton
                variant='subtle'
                size='xs'
                onClick={handleToggleExpandAll}
                style={{ height: 26 }}
              >
                {areAllExpanded ? 'Collapse All' : 'Expand All'}
              </CommonButton>
            )}
          </Group>

          <Paper
            radius='md'
            withBorder
            style={{
              borderColor: isDarkTheme ? '#334155' : '#e2e8f0',
              backgroundColor: isDarkTheme ? '#1e293b' : '#ffffff',
              overflow: 'hidden'
            }}
          >
            {isFetchingCourse ? (
              <Box p='lg' ta='center'>
                <Text size='xs' c='dimmed'>
                  Loading course curriculum...
                </Text>
              </Box>
            ) : modulesList.length === 0 ? (
              <Box p='lg' ta='center'>
                <ThemeIcon
                  size={36}
                  radius='xl'
                  variant='light'
                  color='gray'
                  mb='xs'
                >
                  <IconLayersSubtract size={20} />
                </ThemeIcon>
                <Text size='sm' fw={500}>
                  No modules in this course
                </Text>
                <Text size='xs' c='dimmed'>
                  This archived course contains no curriculum to clone.
                </Text>
              </Box>
            ) : (
              <ScrollArea.Autosize mah={340} scrollbarSize={6} offsetScrollbars>
                <Stack gap={8} p='sm'>
                  {modulesList.map((module: Module) => {
                    const isModSelected = selectedModules.has(module._id);
                    const tasks = module.tasks || [];
                    const selectedTasksInMod = tasks.filter(t =>
                      selectedTasks.has(t._id)
                    ).length;

                    const allModTasksSelected =
                      tasks.length > 0 && selectedTasksInMod === tasks.length;
                    const isModIndeterminate =
                      selectedTasksInMod > 0 && !allModTasksSelected;

                    const isExpanded = Boolean(expandedModules[module._id]);

                    return (
                      <Paper
                        key={module._id}
                        radius='md'
                        withBorder
                        p='xs'
                        style={{
                          borderColor: isModSelected
                            ? 'var(--mantine-color-indigo-5)'
                            : isDarkTheme
                              ? '#334155'
                              : '#e2e8f0',
                          backgroundColor: isDarkTheme ? '#0f172a' : '#f8fafc',
                          transition: 'border-color 0.2s ease'
                        }}
                      >
                        {/* Module Header Row */}
                        <Group
                          justify='space-between'
                          align='center'
                          wrap='nowrap'
                        >
                          <Group
                            gap='sm'
                            wrap='nowrap'
                            style={{ minWidth: 0, flex: 1 }}
                          >
                            <Checkbox
                              checked={
                                tasks.length === 0
                                  ? isModSelected
                                  : allModTasksSelected
                              }
                              indeterminate={isModIndeterminate}
                              onChange={() => handleToggleModule(module)}
                              radius='sm'
                              color='indigo'
                            />

                            <Stack gap={0} style={{ minWidth: 0, flex: 1 }}>
                              <Group gap={6} wrap='nowrap'>
                                <Text
                                  fw={600}
                                  size='sm'
                                  lineClamp={1}
                                  onClick={() => toggleExpand(module._id)}
                                  style={{
                                    color: isModSelected
                                      ? currentThemeConfig.color
                                      : 'var(--mantine-color-dimmed)',
                                    cursor:
                                      tasks.length > 0 ? 'pointer' : 'default'
                                  }}
                                >
                                  {module.moduleName}
                                </Text>
                              </Group>
                            </Stack>
                          </Group>

                          <Group gap={6} wrap='nowrap'>
                            <Badge
                              size='xs'
                              variant={
                                selectedTasksInMod > 0 ? 'light' : 'outline'
                              }
                              color={selectedTasksInMod > 0 ? 'indigo' : 'gray'}
                            >
                              {selectedTasksInMod}/{tasks.length} tasks
                            </Badge>
                            {tasks.length > 0 && (
                              <ActionIcon
                                variant='subtle'
                                size='sm'
                                color='gray'
                                onClick={() => toggleExpand(module._id)}
                                aria-label={
                                  isExpanded ? 'Collapse tasks' : 'Expand tasks'
                                }
                                style={{
                                  transform: isExpanded
                                    ? 'rotate(180deg)'
                                    : 'rotate(0deg)',
                                  transition:
                                    'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                              >
                                <IconChevronDown size={16} />
                              </ActionIcon>
                            )}
                          </Group>
                        </Group>

                        {/* Collapsible Tasks */}
                        {tasks.length > 0 && (
                          <Collapse
                            in={isExpanded}
                            transitionDuration={250}
                            transitionTimingFunction='cubic-bezier(0.4, 0, 0.2, 1)'
                          >
                            <Box
                              mt='xs'
                              pt='xs'
                              pl='md'
                              style={{
                                borderLeft:
                                  '2px dashed var(--mantine-color-indigo-3)',
                                marginLeft: 16
                              }}
                            >
                              <Stack gap={6}>
                                {tasks.map((task: Task) => {
                                  const isTaskSelected = selectedTasks.has(
                                    task._id
                                  );
                                  const isCoding =
                                    task.isCoding || task.type === 'CODE';
                                  const isFile =
                                    !isCoding && task.type === 'FILE';

                                  return (
                                    <Group
                                      key={task._id}
                                      justify='space-between'
                                      align='center'
                                      wrap='nowrap'
                                      p={4}
                                      px={8}
                                      style={{
                                        borderRadius: 6,
                                        backgroundColor: isTaskSelected
                                          ? isDarkTheme
                                            ? 'rgba(99, 102, 241, 0.08)'
                                            : 'rgba(99, 102, 241, 0.04)'
                                          : 'transparent',
                                        transition:
                                          'background-color 0.15s ease'
                                      }}
                                    >
                                      <Group
                                        gap='xs'
                                        wrap='nowrap'
                                        style={{ minWidth: 0, flex: 1 }}
                                      >
                                        <Checkbox
                                          checked={isTaskSelected}
                                          onChange={() =>
                                            handleToggleTask(
                                              module._id,
                                              task._id
                                            )
                                          }
                                          radius='sm'
                                          color='indigo'
                                          size='xs'
                                        />

                                        <ThemeIcon
                                          size={22}
                                          radius='xs'
                                          variant='light'
                                          color={
                                            isCoding
                                              ? 'grape'
                                              : isFile
                                                ? 'blue'
                                                : 'teal'
                                          }
                                        >
                                          {isCoding ? (
                                            <IconCode size={12} />
                                          ) : isFile ? (
                                            <IconFileText size={12} />
                                          ) : (
                                            <IconExternalLink size={12} />
                                          )}
                                        </ThemeIcon>

                                        <Text
                                          size='xs'
                                          fw={isTaskSelected ? 500 : 400}
                                          lineClamp={1}
                                          style={{
                                            color: isTaskSelected
                                              ? currentThemeConfig.color
                                              : 'var(--mantine-color-dimmed)',
                                            flex: 1
                                          }}
                                        >
                                          {task.taskName}
                                        </Text>
                                      </Group>

                                      <Badge
                                        size='xs'
                                        radius='sm'
                                        variant='light'
                                        color={
                                          isCoding
                                            ? 'grape'
                                            : isFile
                                              ? 'blue'
                                              : 'teal'
                                        }
                                      >
                                        {isCoding
                                          ? 'Coding'
                                          : isFile
                                            ? 'File'
                                            : 'Link'}
                                      </Badge>
                                    </Group>
                                  );
                                })}
                              </Stack>
                            </Box>
                          </Collapse>
                        )}
                      </Paper>
                    );
                  })}
                </Stack>
              </ScrollArea.Autosize>
            )}
          </Paper>
        </Stack>

        {/* Ready Summary Alert */}
        <Paper
          p='xs'
          px='sm'
          radius='md'
          withBorder
          style={{
            borderColor:
              selectedModulesCount > 0
                ? 'var(--mantine-color-teal-5)'
                : 'var(--mantine-color-orange-5)',
            backgroundColor:
              selectedModulesCount > 0
                ? isDarkTheme
                  ? 'rgba(16, 185, 129, 0.08)'
                  : 'rgba(16, 185, 129, 0.05)'
                : isDarkTheme
                  ? 'rgba(245, 158, 11, 0.08)'
                  : 'rgba(245, 158, 11, 0.05)'
          }}
        >
          <Group justify='space-between' align='center' wrap='nowrap' gap='xs'>
            <Group gap='xs' wrap='nowrap' style={{ minWidth: 0, flex: 1 }}>
              <ThemeIcon
                size={26}
                radius='xl'
                variant='light'
                color={selectedModulesCount > 0 ? 'teal' : 'orange'}
                style={{ flexShrink: 0 }}
              >
                {selectedModulesCount > 0 ? (
                  <IconCheck size={14} />
                ) : (
                  <IconInfoCircle size={14} />
                )}
              </ThemeIcon>

              <Text size='xs' fw={500}>
                {selectedModulesCount > 0
                  ? `Ready to clone ${selectedModulesCount} module(s) and ${selectedTasksCount} task(s) into "${courseName || 'New Course'}"`
                  : 'Select at least one module above to enable course cloning'}
              </Text>
            </Group>

            <Badge
              size='xs'
              variant='filled'
              color={selectedModulesCount > 0 ? 'teal' : 'orange'}
              style={{
                flexShrink: 0,
                width: 'fit-content',
                whiteSpace: 'nowrap'
              }}
            >
              {selectedModulesCount > 0 ? 'Ready' : 'Pending Selection'}
            </Badge>
          </Group>
        </Paper>

        {/* Footer Buttons */}
        <Group justify='flex-end' gap='xs' mt='xs'>
          <CommonButton
            variant='default'
            onClick={onClose}
            disabled={isPending}
            size='sm'
            style={{ borderRadius: 'var(--mantine-radius-md)' }}
          >
            Cancel
          </CommonButton>

          <CommonButton
            leftSection={<IconCopy size={16} />}
            onClick={handleSubmit}
            disabled={!isFormValid || isPending}
            loading={isPending}
            size='sm'
            style={{ borderRadius: 'var(--mantine-radius-md)' }}
          >
            {isPending ? 'Cloning Course...' : 'Clone Course'}
          </CommonButton>
        </Group>
      </Stack>
    </Modal>
  );
};

export default CloneCourseModal;
