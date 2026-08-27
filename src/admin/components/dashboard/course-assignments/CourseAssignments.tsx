import { useMemo } from 'react';
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
  Center
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
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
import { useAppTheme } from '@hooks/use-app-theme';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import {
  useGetAllEmployeesByAdmin,
  useGetAllCoursesByAdmin,
  useGetCourseByIdAdmin
} from '@hooks/queries/useAdminQueries';
import { useAssignCourseToEmployee } from '@hooks/mutations/useAdminMutations';
import { assignCourseSchema, AssignCourseForm } from '@forms/assign-course';
import { EmployeeInterface } from '@interfaces/employee';
import { Course } from '@interfaces/contentwriter';
import { CommonButton } from '@components/common/button/CommonButton';
import PageHeader from '@components/common/page-header/PageHeader';
import DataView from '@components/common/loaders/DataView';

const CourseAssignments = () => {
  const { themeConfig } = useAppTheme();
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const navigate = useNavigate();

  const { data: employees = [], isLoading: employeesLoading } =
    useGetAllEmployeesByAdmin();
  const { data: courses = [], isLoading: coursesLoading } =
    useGetAllCoursesByAdmin();

  const assignMutation = useAssignCourseToEmployee();

  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<AssignCourseForm>({
    resolver: zodResolver(assignCourseSchema),
    defaultValues: {
      employeeId: '',
      courseId: '',
      dueDate: undefined
    }
  });

  const watchedEmployeeId = watch('employeeId');
  const watchedCourseId = watch('courseId');
  const watchedDueDate = watch('dueDate');

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

  const showReview = watchedEmployeeId && watchedCourseId && watchedDueDate;

  const onSubmit = async (data: AssignCourseForm) => {
    try {
      await assignMutation.mutateAsync({
        employeeId: data.employeeId,
        courseId: data.courseId,
        dueDate: data.dueDate.toISOString()
      });
      showSuccessToast('Course assigned successfully!');
      reset();
    } catch (error) {
      showErrorToast(
        getErrorMessage(error, 'Failed to assign course. Please try again.')
      );
    }
  };

  const isLoadingData = employeesLoading || coursesLoading;

  return (
    <Container
      size='xl'
      py={{ base: 'md', sm: 'xl' }}
      px={{ base: 'xs', sm: 'md' }}
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
          <Grid gutter='lg' mt='lg'>
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Stack gap='lg'>
                <Card withBorder radius='md' p='lg'>
                  <Stack gap='md'>
                    <Group gap='sm'>
                      <ThemeIcon
                        size={36}
                        radius='md'
                        variant='light'
                        color='blue'
                      >
                        <IconUser size={18} />
                      </ThemeIcon>
                      <Stack gap={0}>
                        <Text fw={600} size='sm'>
                          Select Employee
                        </Text>
                        <Text size='xs' c='dimmed'>
                          Choose the employee to assign this course to
                        </Text>
                      </Stack>
                    </Group>

                    <Controller
                      name='employeeId'
                      control={control}
                      render={({ field }) => (
                        <Select
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

                {/* Course Selection */}
                <Card withBorder radius='md' p='lg'>
                  <Stack gap='md'>
                    <Group gap='sm'>
                      <ThemeIcon
                        size={36}
                        radius='md'
                        variant='light'
                        color='green'
                      >
                        <IconBook size={18} />
                      </ThemeIcon>
                      <Stack gap={0}>
                        <Text fw={600} size='sm'>
                          Select Course
                        </Text>
                        <Text size='xs' c='dimmed'>
                          Choose the course to assign
                        </Text>
                      </Stack>
                    </Group>

                    <Controller
                      name='courseId'
                      control={control}
                      render={({ field }) => (
                        <Select
                          placeholder='Search courses...'
                          searchable
                          clearable
                          data={courseOptions}
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

                {/* Due Date */}
                <Card withBorder radius='md' p='lg'>
                  <Stack gap='md'>
                    <Group gap='sm'>
                      <ThemeIcon
                        size={36}
                        radius='md'
                        variant='light'
                        color='orange'
                      >
                        <IconCalendar size={18} />
                      </ThemeIcon>
                      <Stack gap={0}>
                        <Text fw={600} size='sm'>
                          Due Date
                        </Text>
                        <Text size='xs' c='dimmed'>
                          Set a deadline for this assignment
                        </Text>
                      </Stack>
                    </Group>

                    <Controller
                      name='dueDate'
                      control={control}
                      render={({ field }) => (
                        <DatePickerInput
                          placeholder='Pick a due date'
                          value={field.value ? new Date(field.value) : null}
                          onChange={date => {
                            if (!date) {
                              field.onChange(null);
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
              <Stack gap='lg' mt={{ base: 0, lg: 25 }}>
                {showReview && selectedEmployee && selectedCourse ? (
                  <Card
                    withBorder
                    radius='md'
                    p='lg'
                    style={{
                      borderColor: themeConfig.color,
                      borderWidth: 2,
                      position: 'sticky',
                      top: 80
                    }}
                  >
                    <Stack gap='md'>
                      <Group gap='sm'>
                        <ThemeIcon
                          size={36}
                          radius='md'
                          variant='light'
                          color='teal'
                        >
                          <IconCheck size={18} />
                        </ThemeIcon>
                        <Stack gap={0}>
                          <Text fw={600} size='sm'>
                            Assignment Summary
                          </Text>
                          <Text size='xs' c='dimmed'>
                            Review before submitting
                          </Text>
                        </Stack>
                      </Group>

                      <Divider />

                      {/* Employee Info */}
                      <Stack gap='xs'>
                        <Text fw={600} size='xs' c='dimmed' tt='uppercase'>
                          Employee
                        </Text>
                        <Group gap='sm'>
                          <ThemeIcon
                            size={40}
                            radius='md'
                            variant='light'
                            color={themeConfig.color}
                          >
                            <IconUser size={20} />
                          </ThemeIcon>
                          <Stack gap={0}>
                            <Text fw={600} size='sm'>
                              {selectedEmployee.firstName}{' '}
                              {selectedEmployee.lastName}
                            </Text>
                            <Group gap='xs' c='dimmed'>
                              <IconId size={12} />
                              <Text size='xs'>
                                {selectedEmployee.employeeId ||
                                  selectedEmployee.id}
                              </Text>
                            </Group>
                            {selectedEmployee.employeeRole?.[0] && (
                              <Group gap='xs' c='dimmed'>
                                <IconBriefcase size={12} />
                                <Text size='xs'>
                                  {selectedEmployee.employeeRole[0].designation}
                                </Text>
                              </Group>
                            )}
                          </Stack>
                        </Group>
                      </Stack>

                      <Divider />

                      {/* Course Info */}
                      <Stack gap='xs'>
                        <Text fw={600} size='xs' c='dimmed' tt='uppercase'>
                          Course
                        </Text>
                        <Group gap='sm'>
                          <ThemeIcon
                            size={40}
                            radius='md'
                            variant='light'
                            color={themeConfig.color}
                          >
                            <IconBook size={20} />
                          </ThemeIcon>
                          <Stack gap={0}>
                            <Text fw={600} size='sm'>
                              {selectedCourse.courseName}
                            </Text>
                            <Group gap='xs'>
                              <Badge
                                size='xs'
                                variant='light'
                                color='indigo'
                                leftSection={<IconLayersSubtract size={10} />}
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
                      </Stack>

                      <Divider />

                      {/* Due Date */}
                      <Stack gap='xs'>
                        <Text fw={600} size='xs' c='dimmed' tt='uppercase'>
                          Due Date
                        </Text>
                        <Group gap='sm'>
                          <ThemeIcon
                            size={40}
                            radius='md'
                            variant='light'
                            color={themeConfig.color}
                          >
                            <IconCalendar size={20} />
                          </ThemeIcon>
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
                        </Group>
                      </Stack>
                    </Stack>
                  </Card>
                ) : (
                  <Card withBorder radius='md' p='lg'>
                    <Center py='xl'>
                      <Stack align='center' gap='sm'>
                        <ThemeIcon
                          size={48}
                          radius='xl'
                          variant='light'
                          color='gray'
                        >
                          <IconCheck size={24} />
                        </ThemeIcon>
                        <Text size='sm' c='dimmed' ta='center'>
                          Select an employee, course, and due date to see the
                          summary
                        </Text>
                      </Stack>
                    </Center>
                  </Card>
                )}
              </Stack>
            </Grid.Col>
          </Grid>

          <Stack gap='md' mt='lg'>
            {/* Actions */}
            <Group justify='flex-end' gap='sm'>
              <CommonButton
                variant='default'
                onClick={() => reset()}
                disabled={isSubmitting || assignMutation.isPending}
              >
                Cancel
              </CommonButton>
              <CommonButton
                type='submit'
                loading={isSubmitting || assignMutation.isPending}
                disabled={!showReview}
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
