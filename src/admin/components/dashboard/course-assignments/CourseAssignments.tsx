import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  Stack,
  Text,
  Group,
  Grid,
  Select,
  Divider,
  ThemeIcon,
  Badge,
  Center,
  Paper
} from '@mantine/core';
import {
  IconUser,
  IconBook,
  IconBriefcase,
  IconLayersSubtract,
  IconListCheck,
  IconCheck,
  IconId,
  IconCalendar,
  IconArrowLeft
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { useAppTheme } from '@hooks/use-app-theme';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import {
  useGetAllEmployeesByAdmin,
  useGetAllActiveCoursesByAdmin,
  useGetCourseByIdAdmin,
  useFetchAssignedCoursesForEmployee
} from '@hooks/queries/useAdminQueries';
import { useAssignCourseToEmployee } from '@hooks/mutations/useAdminMutations';
import { assignCourseSchema, AssignCourseForm } from '@forms/assign-course';
import { EmployeeInterface } from '@interfaces/employee';
import { Course } from '@interfaces/contentwriter';
import { AssignedCourseForEmployee } from '@interfaces/course-assignment';
import { CommonButton } from '@components/common/button/CommonButton';
import { CommonDatePickerInput } from '@components/common/date-picker/CommonDatePickerInput';
import CourseThumbnail from '@user/components/dashboard/content-writer/CourseThumbnail';
import PageHeader from '@components/common/page-header/PageHeader';
import DataView from '@components/common/loaders/DataView';

const CourseAssignments = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { themeConfig } = useAppTheme();
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const navigate = useNavigate();

  const { data: employees = [], isLoading: employeesLoading } =
    useGetAllEmployeesByAdmin();
  const { data: courses = [], isLoading: coursesLoading } =
    useGetAllActiveCoursesByAdmin();

  const assignMutation = useAssignCourseToEmployee();

  const [formKey, setFormKey] = useState(0);

  const {
    control,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<AssignCourseForm>({
    resolver: zodResolver(assignCourseSchema),
    defaultValues: {
      employeeId: '',
      courseId: '',
      dueDate: new Date()
    }
  });

  const watchedEmployeeId = watch('employeeId');
  const watchedCourseId = watch('courseId');
  const watchedDueDate = watch('dueDate');

  const { data: assignedCourses = [], isLoading: assignedCoursesLoading } =
    useFetchAssignedCoursesForEmployee(watchedEmployeeId);

  const { data: detailedCourse } = useGetCourseByIdAdmin(
    watchedCourseId,
    !!watchedCourseId
  ) as { data?: Course };

  const employeeOptions = useMemo(
    () =>
      (employees as EmployeeInterface[]).map(emp => ({
        value: emp.id || emp.employeeId,
        label: `${emp.employeeId} - ${emp.firstName} ${emp.lastName}`
      })),
    [employees]
  );

  const courseOptions = useMemo(
    () =>
      (courses as Course[]).map(c => ({
        value: c._id,
        label: c.courseName,
        status: c.status
      })),
    [courses]
  );

  const assignedCourseIds = useMemo(
    () =>
      new Set(
        (assignedCourses as AssignedCourseForEmployee[]).map(a => a.courseId)
      ),
    [assignedCourses]
  );

  const availableCourseOptions = useMemo(() => {
    if (!watchedEmployeeId) return courseOptions;
    if (assignedCourseIds.size === 0) return courseOptions;
    return courseOptions.filter(c => !assignedCourseIds.has(c.value));
  }, [courseOptions, assignedCourseIds, watchedEmployeeId]);

  useEffect(() => {
    if (!watchedEmployeeId || !watchedCourseId) return;
    if (assignedCourseIds.has(watchedCourseId)) {
      setValue('courseId', '');
    }
  }, [watchedEmployeeId, watchedCourseId, assignedCourseIds, setValue]);

  const selectedEmployee = useMemo(
    () =>
      (employees as EmployeeInterface[]).find(
        emp => (emp.id || emp.employeeId) === watchedEmployeeId
      ),
    [employees, watchedEmployeeId]
  );

  const listCourse = useMemo(
    () => (courses as Course[]).find(c => c._id === watchedCourseId),
    [courses, watchedCourseId]
  );

  const selectedCourse = detailedCourse ?? listCourse;

  const courseMeta = useMemo(() => {
    if (!selectedCourse) return null;
    const moduleCount = selectedCourse.modules?.length ?? 0;
    const taskCount =
      selectedCourse.modules?.reduce(
        (sum: number, m: any) => sum + (m.tasks?.length ?? 0),
        0
      ) ?? 0;
    return { moduleCount, taskCount };
  }, [selectedCourse]);

  const isFormComplete = Boolean(
    watchedEmployeeId && watchedCourseId && watchedDueDate
  );

  const onSubmit = async (data: AssignCourseForm) => {
    try {
      await assignMutation.mutateAsync({
        employeeId: data.employeeId,
        courseId: data.courseId,
        dueDate: data.dueDate.toISOString()
      });
      showSuccessToast('Course assigned successfully!');
      reset({ employeeId: '', courseId: '', dueDate: new Date() });
      setFormKey(k => k + 1);
    } catch (error) {
      showErrorToast(
        getErrorMessage(error, 'Failed to assign course. Please try again.')
      );
    }
  };

  const isLoadingData =
    employeesLoading || coursesLoading || assignedCoursesLoading;

  return (
    <Container
      size='xl'
      pt={{ base: 'md', sm: 'xl' }}
      pb={{ base: 10, sm: 'xl' }}
      px={{ base: 'sm', sm: 'md' }}
    >
      <PageHeader
        title='Assign Course'
        subtitle='Assign a course to an employee'
        actions={
          <CommonButton
            variant='default'
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => navigate(-1)}
          >
            Back
          </CommonButton>
        }
      />

      <DataView isLoading={isLoadingData} label='data' isEmpty={false}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid gutter={{ base: 'md', sm: 'lg' }} mt={{ base: 'md', sm: 'lg' }}>
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Stack gap='lg'>
                {/* Step 1: Select Employee */}
                <Card
                  withBorder
                  radius='lg'
                  p={{ base: 'md', sm: 'lg' }}
                  shadow='xs'
                  style={{
                    backgroundColor: themeConfig.cardBackground || '#ffffff',
                    borderColor: watchedEmployeeId
                      ? 'var(--mantine-color-blue-4)'
                      : themeConfig.borderColor,
                    boxShadow: watchedEmployeeId
                      ? '0 4px 14px rgba(34, 139, 230, 0.08)'
                      : '0 2px 6px rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <Stack gap='md'>
                    <Group justify='space-between' align='center'>
                      <Group gap='sm'>
                        <ThemeIcon
                          size={38}
                          radius='md'
                          variant='light'
                          color='blue'
                          style={{ transition: 'all 0.2s ease' }}
                        >
                          <IconUser size={20} />
                        </ThemeIcon>
                        <Stack gap={0}>
                          <Text fw={700} size='sm'>
                            Select Employee
                          </Text>
                          <Text size='xs' c='dimmed'>
                            Choose the employee to assign this course to
                          </Text>
                        </Stack>
                      </Group>
                      <Badge
                        size='xs'
                        variant={watchedEmployeeId ? 'filled' : 'light'}
                        color={watchedEmployeeId ? 'teal' : 'gray'}
                        leftSection={
                          watchedEmployeeId ? (
                            <IconCheck size={10} />
                          ) : undefined
                        }
                      >
                        Step 1
                      </Badge>
                    </Group>

                    <Controller
                      name='employeeId'
                      control={control}
                      render={({ field }) => (
                        <Select
                          key={`emp-${formKey}`}
                          placeholder='Search by ID or name...'
                          searchable
                          clearable
                          data={employeeOptions}
                          value={field.value}
                          onChange={field.onChange}
                          error={errors.employeeId?.message}
                          size='md'
                          nothingFoundMessage='No employees found'
                          comboboxProps={{ withinPortal: true }}
                        />
                      )}
                    />
                  </Stack>
                </Card>

                {/* Step 2: Course Selection */}
                <Card
                  withBorder
                  radius='lg'
                  p={{ base: 'md', sm: 'lg' }}
                  shadow='xs'
                  style={{
                    backgroundColor: themeConfig.cardBackground || '#ffffff',
                    borderColor: watchedCourseId
                      ? 'var(--mantine-color-teal-4)'
                      : themeConfig.borderColor,
                    boxShadow: watchedCourseId
                      ? '0 4px 14px rgba(18, 184, 134, 0.08)'
                      : '0 2px 6px rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <Stack gap='md'>
                    <Group justify='space-between' align='center'>
                      <Group gap='sm'>
                        <ThemeIcon
                          size={38}
                          radius='md'
                          variant='light'
                          color='green'
                          style={{ transition: 'all 0.2s ease' }}
                        >
                          <IconBook size={20} />
                        </ThemeIcon>
                        <Stack gap={0}>
                          <Text fw={700} size='sm'>
                            Select Course
                          </Text>
                          <Text size='xs' c='dimmed'>
                            Choose the course to assign
                          </Text>
                        </Stack>
                      </Group>
                      <Badge
                        size='xs'
                        variant={watchedCourseId ? 'filled' : 'light'}
                        color={watchedCourseId ? 'teal' : 'gray'}
                        leftSection={
                          watchedCourseId ? <IconCheck size={10} /> : undefined
                        }
                      >
                        Step 2
                      </Badge>
                    </Group>

                    <Controller
                      name='courseId'
                      control={control}
                      render={({ field }) => (
                        <Select
                          key={`course-${formKey}`}
                          placeholder='Search courses...'
                          searchable
                          clearable
                          data={availableCourseOptions}
                          value={field.value}
                          onChange={field.onChange}
                          error={errors.courseId?.message}
                          size='md'
                          nothingFoundMessage='No courses found'
                          comboboxProps={{ withinPortal: true }}
                          renderOption={({ option }) => {
                            const meta = courseOptions.find(
                              c => c.value === option.value
                            );
                            const isCurrent = option.value === watchedCourseId;
                            const modules = isCurrent
                              ? courseMeta?.moduleCount
                              : undefined;
                            const tasks = isCurrent
                              ? courseMeta?.taskCount
                              : undefined;
                            return (
                              <Group gap='sm' justify='space-between' w='100%'>
                                <Stack gap={2}>
                                  <Text size='sm' fw={500}>
                                    {option.label}
                                  </Text>
                                  {isCurrent &&
                                    modules !== undefined &&
                                    tasks !== undefined && (
                                      <Group gap='xs'>
                                        <Badge
                                          size='xs'
                                          variant='light'
                                          color='indigo'
                                          leftSection={
                                            <IconLayersSubtract size={10} />
                                          }
                                        >
                                          {modules} modules
                                        </Badge>
                                        <Badge
                                          size='xs'
                                          variant='light'
                                          color='pink'
                                          leftSection={
                                            <IconListCheck size={10} />
                                          }
                                        >
                                          {tasks} tasks
                                        </Badge>
                                      </Group>
                                    )}
                                </Stack>
                                <Badge
                                  size='xs'
                                  color={
                                    meta?.status === 'ACTIVE' ? 'green' : 'blue'
                                  }
                                  variant='light'
                                >
                                  {meta?.status}
                                </Badge>
                              </Group>
                            );
                          }}
                        />
                      )}
                    />
                  </Stack>
                </Card>

                {/* Step 3: Due Date */}
                <Card
                  withBorder
                  radius='lg'
                  p={{ base: 'md', sm: 'lg' }}
                  shadow='xs'
                  style={{
                    backgroundColor: themeConfig.cardBackground || '#ffffff',
                    borderColor: watchedDueDate
                      ? 'var(--mantine-color-orange-4)'
                      : themeConfig.borderColor,
                    boxShadow: watchedDueDate
                      ? '0 4px 14px rgba(247, 103, 7, 0.08)'
                      : '0 2px 6px rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <Stack gap='md'>
                    <Group justify='space-between' align='center'>
                      <Group gap='sm'>
                        <ThemeIcon
                          size={38}
                          radius='md'
                          variant='light'
                          color='orange'
                          style={{ transition: 'all 0.2s ease' }}
                        >
                          <IconCalendar size={20} />
                        </ThemeIcon>
                        <Stack gap={0}>
                          <Text fw={700} size='sm'>
                            Due Date
                          </Text>
                          <Text size='xs' c='dimmed'>
                            Set a deadline for this assignment
                          </Text>
                        </Stack>
                      </Group>
                      <Badge
                        size='xs'
                        variant={watchedDueDate ? 'filled' : 'light'}
                        color={watchedDueDate ? 'teal' : 'gray'}
                        leftSection={
                          watchedDueDate ? <IconCheck size={10} /> : undefined
                        }
                      >
                        Step 3
                      </Badge>
                    </Group>

                    <Controller
                      name='dueDate'
                      control={control}
                      render={({ field }) => (
                        <CommonDatePickerInput
                          key={`due-${formKey}`}
                          placeholder='Pick a due date'
                          value={
                            field.value ? new Date(field.value) : new Date()
                          }
                          defaultDate={
                            field.value ? new Date(field.value) : new Date()
                          }
                          onChange={date => {
                            if (!date) {
                              field.onChange(new Date());
                              return;
                            }
                            field.onChange(new Date(date));
                          }}
                          error={errors.dueDate?.message}
                          size='md'
                          clearable
                          minDate={new Date()}
                          valueFormat='MMM DD, YYYY'
                        />
                      )}
                    />
                  </Stack>
                </Card>
              </Stack>
            </Grid.Col>

            {/* Review Summary */}
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Stack gap='lg'>
                {selectedEmployee ? (
                  <Card
                    withBorder
                    radius='lg'
                    p={{ base: 'md', sm: 'lg' }}
                    shadow='sm'
                    style={{
                      borderColor: isFormComplete
                        ? 'var(--mantine-color-teal-5)'
                        : themeConfig.borderColor,
                      borderWidth: isFormComplete ? 2 : 1,
                      position: isMobile ? 'static' : 'sticky',
                      top: 80,
                      backgroundColor: themeConfig.cardBackground || '#ffffff',
                      boxShadow: '0 6px 24px rgba(0, 0, 0, 0.06)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <Stack gap='md'>
                      <Group
                        justify='space-between'
                        align='center'
                        wrap='wrap'
                        gap='xs'
                      >
                        <Group gap='sm'>
                          <ThemeIcon
                            size={38}
                            radius='md'
                            variant='light'
                            color={isFormComplete ? 'teal' : 'blue'}
                            style={{ transition: 'all 0.3s ease' }}
                          >
                            <IconCheck size={20} />
                          </ThemeIcon>
                          <Stack gap={0}>
                            <Text fw={700} size='sm'>
                              Assignment Summary
                            </Text>
                            <Text size='xs' c='dimmed'>
                              Review details before assigning
                            </Text>
                          </Stack>
                        </Group>

                        <Badge
                          size='sm'
                          variant='light'
                          color={isFormComplete ? 'teal' : 'orange'}
                          leftSection={
                            isFormComplete ? <IconCheck size={12} /> : undefined
                          }
                          style={{ transition: 'all 0.3s ease' }}
                        >
                          {isFormComplete
                            ? 'Ready to Assign'
                            : 'Select Course to Finish'}
                        </Badge>
                      </Group>

                      {/* Step Progress Pills */}
                      <Group gap={isMobile ? 6 : 'xs'} grow>
                        <Badge
                          size='xs'
                          variant='filled'
                          color='teal'
                          leftSection={<IconCheck size={10} />}
                        >
                          Employee
                        </Badge>
                        <Badge
                          size='xs'
                          variant={selectedCourse ? 'filled' : 'light'}
                          color={selectedCourse ? 'teal' : 'orange'}
                          leftSection={
                            selectedCourse ? <IconCheck size={10} /> : undefined
                          }
                          style={{ transition: 'all 0.25s ease' }}
                        >
                          {selectedCourse ? 'Course Added' : 'Course Pending'}
                        </Badge>
                        <Badge
                          size='xs'
                          variant={watchedDueDate ? 'filled' : 'light'}
                          color={watchedDueDate ? 'teal' : 'gray'}
                          leftSection={
                            watchedDueDate ? <IconCheck size={10} /> : undefined
                          }
                        >
                          Due Date Set
                        </Badge>
                      </Group>

                      <Divider />

                      {/* Employee Info */}
                      <Stack gap='xs'>
                        <Group justify='space-between' align='center'>
                          <Text fw={700} size='xs' c='dimmed' tt='uppercase'>
                            Employee
                          </Text>
                          <Badge size='xs' variant='light' color='blue'>
                            Selected
                          </Badge>
                        </Group>

                        <Paper
                          p='sm'
                          radius='md'
                          withBorder
                          style={{
                            borderColor: themeConfig.borderColor,
                            backgroundColor:
                              themeConfig.headerBackgroundColor || '#fafafa',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <Group gap='sm'>
                            <ThemeIcon
                              size={42}
                              radius='md'
                              variant='light'
                              color={themeConfig.color || 'blue'}
                            >
                              <IconUser size={22} />
                            </ThemeIcon>
                            <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
                              <Text fw={600} size='sm' lineClamp={1}>
                                {selectedEmployee.firstName}{' '}
                                {selectedEmployee.lastName}
                              </Text>
                              <Group gap='xs' wrap='wrap'>
                                <Badge
                                  size='xs'
                                  variant='outline'
                                  color='gray'
                                  leftSection={<IconId size={10} />}
                                >
                                  {selectedEmployee.employeeId ||
                                    selectedEmployee.id}
                                </Badge>
                                {selectedEmployee.employeeRole?.[0] && (
                                  <Badge
                                    size='xs'
                                    variant='light'
                                    color='blue'
                                    leftSection={<IconBriefcase size={10} />}
                                  >
                                    {
                                      selectedEmployee.employeeRole[0]
                                        .designation
                                    }
                                  </Badge>
                                )}
                              </Group>
                            </Stack>
                          </Group>
                        </Paper>
                      </Stack>

                      <Divider />

                      {/* Course Info */}
                      <Stack gap='xs'>
                        <Group justify='space-between' align='center'>
                          <Text fw={700} size='xs' c='dimmed' tt='uppercase'>
                            Course
                          </Text>
                          {selectedCourse ? (
                            <Badge size='xs' variant='light' color='green'>
                              Selected
                            </Badge>
                          ) : (
                            <Badge size='xs' variant='light' color='orange'>
                              Required
                            </Badge>
                          )}
                        </Group>

                        {selectedCourse ? (
                          <Paper
                            p='sm'
                            radius='md'
                            withBorder
                            style={{
                              borderColor: themeConfig.borderColor,
                              backgroundColor:
                                themeConfig.headerBackgroundColor || '#fafafa',
                              transition: 'all 0.25s ease'
                            }}
                          >
                            <Group gap='sm' align='flex-start' wrap='nowrap'>
                              <CourseThumbnail
                                name={selectedCourse.courseName}
                                src={
                                  selectedCourse.thumbnailUrl ||
                                  selectedCourse.thumbnail
                                }
                                size={isMobile ? 38 : 44}
                                radius='md'
                              />
                              <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                                <Text fw={600} size='sm' lineClamp={1}>
                                  {selectedCourse.courseName}
                                </Text>
                                <Group gap='xs' wrap='wrap'>
                                  <Badge
                                    size='xs'
                                    variant='light'
                                    color='indigo'
                                    leftSection={
                                      <IconLayersSubtract size={10} />
                                    }
                                  >
                                    {courseMeta?.moduleCount ?? 0} modules
                                  </Badge>
                                  <Badge
                                    size='xs'
                                    variant='light'
                                    color='pink'
                                    leftSection={<IconListCheck size={10} />}
                                  >
                                    {courseMeta?.taskCount ?? 0} tasks
                                  </Badge>
                                  <Badge
                                    size='xs'
                                    color={
                                      selectedCourse.status === 'ACTIVE'
                                        ? 'green'
                                        : 'blue'
                                    }
                                    variant='light'
                                  >
                                    {selectedCourse.status}
                                  </Badge>
                                </Group>
                              </Stack>
                            </Group>
                          </Paper>
                        ) : (
                          <Paper
                            p='md'
                            radius='md'
                            style={{
                              border:
                                '1.5px dashed var(--mantine-color-orange-3)',
                              backgroundColor: 'var(--mantine-color-orange-0)',
                              textAlign: 'center',
                              transition: 'all 0.25s ease'
                            }}
                          >
                            <Stack gap={4} align='center'>
                              <ThemeIcon
                                size={32}
                                radius='xl'
                                variant='light'
                                color='orange'
                              >
                                <IconBook size={16} />
                              </ThemeIcon>
                              <Text size='xs' fw={600} c='orange.8'>
                                No course selected
                              </Text>
                              <Text size='xs' c='dimmed'>
                                Choose a course from the dropdown on the left
                              </Text>
                            </Stack>
                          </Paper>
                        )}
                      </Stack>

                      <Divider />

                      {/* Due Date */}
                      <Stack gap='xs'>
                        <Group justify='space-between' align='center'>
                          <Text fw={700} size='xs' c='dimmed' tt='uppercase'>
                            Due Date
                          </Text>
                          <Badge size='xs' variant='light' color='orange'>
                            Deadline
                          </Badge>
                        </Group>

                        <Paper
                          p='sm'
                          radius='md'
                          withBorder
                          style={{
                            borderColor: themeConfig.borderColor,
                            backgroundColor:
                              themeConfig.headerBackgroundColor || '#fafafa',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <Group gap='sm'>
                            <ThemeIcon
                              size={40}
                              radius='md'
                              variant='light'
                              color='orange'
                            >
                              <IconCalendar size={20} />
                            </ThemeIcon>
                            <Stack gap={0}>
                              <Text fw={600} size='sm'>
                                {watchedDueDate
                                  ? new Date(watchedDueDate).toLocaleDateString(
                                      undefined,
                                      {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                      }
                                    )
                                  : 'Not set'}
                              </Text>
                              <Text size='xs' c='dimmed'>
                                Target completion date
                              </Text>
                            </Stack>
                          </Group>
                        </Paper>
                      </Stack>
                    </Stack>
                  </Card>
                ) : (
                  <Card
                    withBorder
                    radius='lg'
                    p={{ base: 'md', sm: 'xl' }}
                    shadow='sm'
                    style={{
                      borderStyle: 'dashed',
                      borderColor: themeConfig.borderColor,
                      backgroundColor: themeConfig.cardBackground || '#ffffff',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Center py={{ base: 'md', sm: 'xl' }}>
                      <Stack align='center' gap='sm'>
                        <ThemeIcon
                          size={52}
                          radius='xl'
                          variant='light'
                          color='gray'
                        >
                          <IconCheck size={26} />
                        </ThemeIcon>
                        <Stack gap={2} align='center'>
                          <Text fw={600} size='sm' ta='center'>
                            Assignment Summary Preview
                          </Text>
                          <Text size='xs' c='dimmed' ta='center' maw={280}>
                            Select an employee, course, and due date to see the
                            summary
                          </Text>
                        </Stack>
                      </Stack>
                    </Center>
                  </Card>
                )}
              </Stack>
            </Grid.Col>
          </Grid>

          <Stack
            gap='md'
            mt={{ base: 'xl', sm: 'lg' }}
            mb={{ base: 60, sm: 0 }}
          >
            {/* Actions */}
            <Group
              justify='flex-end'
              gap='sm'
              grow={Boolean(isMobile)}
              wrap='wrap'
            >
              <CommonButton
                variant='default'
                onClick={() => reset()}
                disabled={isSubmitting || assignMutation.isPending}
                size={isMobile ? 'md' : 'sm'}
              >
                Cancel
              </CommonButton>
              <CommonButton
                type='submit'
                loading={isSubmitting || assignMutation.isPending}
                disabled={!isFormComplete}
                leftSection={<IconCheck size={16} />}
                size={isMobile ? 'md' : 'sm'}
              >
                Assign Course
              </CommonButton>
            </Group>
          </Stack>
        </form>
      </DataView>
    </Container>
  );
};

export default CourseAssignments;
