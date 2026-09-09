import { useMemo, useState } from 'react';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Group,
  Modal,
  Progress,
  ScrollArea,
  Stack,
  Table,
  Text,
  ThemeIcon,
  Tooltip,
  UnstyledButton
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import {
  IconArrowLeft,
  IconBook,
  IconCalendar,
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconChevronUp,
  IconCircleDot,
  IconSelector,
  IconTrash
} from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppTheme } from '@hooks/use-app-theme';
import {
  useGetAllCourseAssignments,
  useGetCourseAssignmentDetails
} from '@hooks/queries/useAdminQueries';
import {
  useUpdateCourseAssignmentDueDate,
  useUnassignCourse
} from '@hooks/mutations/useAdminMutations';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import {
  AdminAssignment,
  CourseAssignmentStatus
} from '@interfaces/course-assignment';
import PageHeader from '@components/common/page-header/PageHeader';
import DataView from '@components/common/loaders/DataView';
import { CommonButton } from '@components/common/button/CommonButton';
import { organizationAdminUrls } from '@utils/common/constants';

const STATUS_COLORS: Record<CourseAssignmentStatus, string> = {
  Assigned: 'blue',
  'In Progress': 'orange',
  Completed: 'green'
};

const formatDate = (value?: string | Date) => {
  if (!value) return '—';
  const d = new Date(value);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

type SortKey = 'status' | 'dueDate' | 'progress';
type SortDir = 'asc' | 'desc';

const STATUS_ORDER: Record<string, number> = {
  Assigned: 0,
  'In Progress': 1,
  Completed: 2
};

const ThSortable = ({
  label,
  sortKey,
  activeKey,
  activeDir,
  onSort
}: {
  label: string;
  sortKey: SortKey;
  activeKey: SortKey | null;
  activeDir: SortDir;
  onSort: (key: SortKey) => void;
}) => {
  const isActive = activeKey === sortKey;
  return (
    <UnstyledButton
      onClick={() => onSort(sortKey)}
      style={{ display: 'flex', alignItems: 'center', gap: 4 }}
    >
      <Text size='sm' fw={500}>
        {label}
      </Text>
      {isActive ? (
        activeDir === 'asc' ? (
          <IconChevronUp size={14} />
        ) : (
          <IconChevronDown size={14} />
        )
      ) : (
        <IconSelector size={14} style={{ opacity: 0.4 }} />
      )}
    </UnstyledButton>
  );
};

const EmployeeCourseProgress = () => {
  const { themeConfig } = useAppTheme();
  const navigate = useNavigate();
  const { organization, employeeId = '' } = useParams<{
    organization: string;
    employeeId: string;
  }>();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const { data: assignments = [], isLoading } = useGetAllCourseAssignments();
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<
    string | null
  >(null);
  const [editingDate, setEditingDate] = useState<Date | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const employee = assignments.find(
    a => a.employee?.employeeId === employeeId
  )?.employee;

  const employeeAssignments = useMemo(() => {
    const filtered = assignments.filter(
      a => a.employee?.employeeId === employeeId
    );
    if (!sortKey) return filtered;

    return [...filtered].sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'status') {
        cmp = (STATUS_ORDER[a.status] ?? 0) - (STATUS_ORDER[b.status] ?? 0);
      } else if (sortKey === 'dueDate') {
        const da = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const db = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        cmp = da - db;
      } else if (sortKey === 'progress') {
        cmp =
          (a.progress.percentComplete ?? 0) - (b.progress.percentComplete ?? 0);
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [assignments, employeeId, sortKey, sortDir]);

  const { data: detail, isLoading: detailLoading } =
    useGetCourseAssignmentDetails(
      selectedAssignmentId ?? '',
      !!selectedAssignmentId
    );

  const updateDueDateMutation = useUpdateCourseAssignmentDueDate();
  const unassignMutation = useUnassignCourse();
  const [unassignTargetId, setUnassignTargetId] = useState<string | null>(null);
  const [unassignOpened, { open: openUnassign, close: closeUnassign }] =
    useDisclosure(false);

  const selectedAssignment = assignments.find(
    a => a.courseAssignmentId === selectedAssignmentId
  );

  const handleRowClick = (assignmentId: string) => {
    setSelectedAssignmentId(assignmentId);
    const assignment = assignments.find(
      a => a.courseAssignmentId === assignmentId
    );
    if (assignment?.dueDate) {
      setEditingDate(new Date(assignment.dueDate));
    } else {
      setEditingDate(null);
    }
    open();
  };

  const handleSaveDueDate = async () => {
    if (!selectedAssignmentId || !editingDate) return;
    try {
      await updateDueDateMutation.mutateAsync({
        courseAssignmentId: selectedAssignmentId,
        dueDate: editingDate.toISOString()
      });
      showSuccessToast('Due date updated successfully');
      close();
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to update due date'));
    }
  };

  const handleUnassignClick = (
    event: React.MouseEvent,
    assignmentId: string
  ) => {
    event.stopPropagation();
    setUnassignTargetId(assignmentId);
    openUnassign();
  };

  const handleConfirmUnassign = async () => {
    if (!unassignTargetId) return;
    try {
      const res: { message?: string } =
        await unassignMutation.mutateAsync(unassignTargetId);
      showSuccessToast(res?.message ?? 'Course un-assigned successfully');
      closeUnassign();
      setUnassignTargetId(null);
    } catch (error) {
      showErrorToast(getErrorMessage(error, 'Failed to un-assign course'));
    }
  };

  const unassignTarget = assignments.find(
    a => a.courseAssignmentId === unassignTargetId
  );

  const detailCourse = detail?.course;
  const isCompletedCourse =
    (detailCourse?.progress?.percentComplete ?? 0) >= 100;
  const completed = employeeAssignments.filter(
    a => a.status === 'Completed'
  ).length;
  const inProgress = employeeAssignments.filter(
    a => a.status === 'In Progress'
  ).length;

  const goBack = () =>
    navigate(
      `${organizationAdminUrls(organization ?? '')}/dashboard/track-progress`
    );

  return (
    <Container
      size='xl'
      py={{ base: 'md', sm: 'xl' }}
      px={{ base: 'xs', sm: 'md' }}
    >
      <Box mt={{ base: 'md', sm: 'xl' }} mb='md'>
        <PageHeader
          title='Employee Course Progress'
          subtitle='View and manage the courses assigned to this employee'
          actions={
            <CommonButton
              variant='default'
              leftSection={<IconArrowLeft size={16} />}
              onClick={goBack}
            >
              Back
            </CommonButton>
          }
        />
      </Box>

      <DataView isLoading={isLoading} label='courses' isEmpty={false}>
        <Stack gap='lg'>
          {employee && (
            <Card withBorder radius='md' p='lg'>
              <Group gap='md' justify='space-between' wrap='wrap'>
                <Group gap='md'>
                  <ThemeIcon
                    size={48}
                    radius='xl'
                    variant='light'
                    color={themeConfig.color}
                  >
                    <Text fw={700} size='lg'>
                      {employee.firstName?.[0] ?? ''}
                      {employee.lastName?.[0] ?? ''}
                    </Text>
                  </ThemeIcon>
                  <Stack gap={2}>
                    <Text fw={600} size='lg'>
                      {employee.firstName} {employee.lastName}
                    </Text>
                    <Text size='sm' c='dimmed'>
                      {employee.employeeCode} · {employee.email}
                    </Text>
                  </Stack>
                </Group>
                <Group gap='md'>
                  <Stack gap={0} align='center'>
                    <Text fw={700} size='lg'>
                      {employeeAssignments.length}
                    </Text>
                    <Text size='xs' c='dimmed'>
                      Courses
                    </Text>
                  </Stack>
                  <Stack gap={0} align='center'>
                    <Text fw={700} size='lg'>
                      {inProgress}
                    </Text>
                    <Text size='xs' c='dimmed'>
                      In Progress
                    </Text>
                  </Stack>
                  <Stack gap={0} align='center'>
                    <Text fw={700} size='lg'>
                      {completed}
                    </Text>
                    <Text size='xs' c='dimmed'>
                      Completed
                    </Text>
                  </Stack>
                </Group>
              </Group>
            </Card>
          )}

          {employeeAssignments.length === 0 ? (
            <Card withBorder radius='md' p='xl'>
              <Center py='xl'>
                <Stack align='center' gap='sm'>
                  <ThemeIcon size={48} radius='xl' variant='light' color='gray'>
                    <IconBook size={24} />
                  </ThemeIcon>
                  <Text c='dimmed'>No courses assigned to this employee</Text>
                </Stack>
              </Center>
            </Card>
          ) : (
            <Card withBorder radius='md' p={0}>
              <ScrollArea>
                <Table
                  highlightOnHover
                  verticalSpacing='sm'
                  horizontalSpacing='md'
                  style={{ minWidth: 760 }}
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Course</Table.Th>
                      <Table.Th>
                        <ThSortable
                          label='Status'
                          sortKey='status'
                          activeKey={sortKey}
                          activeDir={sortDir}
                          onSort={handleSort}
                        />
                      </Table.Th>
                      <Table.Th>
                        <ThSortable
                          label='Due Date'
                          sortKey='dueDate'
                          activeKey={sortKey}
                          activeDir={sortDir}
                          onSort={handleSort}
                        />
                      </Table.Th>
                      <Table.Th style={{ width: 220 }}>
                        <ThSortable
                          label='Progress'
                          sortKey='progress'
                          activeKey={sortKey}
                          activeDir={sortDir}
                          onSort={handleSort}
                        />
                      </Table.Th>
                      <Table.Th />
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {employeeAssignments.map((assignment: AdminAssignment) => (
                      <Table.Tr
                        key={assignment.courseAssignmentId}
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          handleRowClick(assignment.courseAssignmentId)
                        }
                      >
                        <Table.Td>
                          <Stack gap={2}>
                            <Text size='sm' fw={500}>
                              {assignment.courseName}
                            </Text>
                            <Text size='xs' c='dimmed'>
                              {assignment.totalModules} module(s)
                            </Text>
                          </Stack>
                        </Table.Td>
                        <Table.Td>
                          <Badge
                            color={STATUS_COLORS[assignment.status]}
                            variant='light'
                          >
                            {assignment.status}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Text
                            size='sm'
                            c={assignment.isOverdue ? 'red' : undefined}
                          >
                            {formatDate(assignment.dueDate)}
                            {assignment.isOverdue && (
                              <Text size='xs' c='red' component='span'>
                                {' '}
                                (overdue)
                              </Text>
                            )}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Stack gap={4}>
                            <Group justify='space-between'>
                              <Text size='xs' c='dimmed'>
                                {assignment.progress.completedTasks}/
                                {assignment.progress.totalTasks} tasks
                              </Text>
                              <Text size='xs' fw={600} c={themeConfig.color}>
                                {assignment.progress.percentComplete}%
                              </Text>
                            </Group>
                            <Progress.Root size='md'>
                              <Progress.Section
                                value={assignment.progress.percentComplete}
                                color={
                                  assignment.status === 'Completed'
                                    ? 'green'
                                    : assignment.status === 'In Progress'
                                      ? 'orange'
                                      : 'blue'
                                }
                              />
                            </Progress.Root>
                          </Stack>
                        </Table.Td>
                        <Table.Td align='right'>
                          <Group gap='xs' justify='flex-end' wrap='nowrap'>
                            <ActionIcon
                              variant='light'
                              color='red'
                              radius='xl'
                              loading={unassignMutation.isPending}
                              onClick={e =>
                                handleUnassignClick(
                                  e,
                                  assignment.courseAssignmentId
                                )
                              }
                            >
                              <IconTrash size={16} />
                            </ActionIcon>
                            <ActionIcon
                              variant='light'
                              color={themeConfig.color}
                              radius='xl'
                              onClick={() =>
                                handleRowClick(assignment.courseAssignmentId)
                              }
                            >
                              <IconChevronRight size={16} />
                            </ActionIcon>
                          </Group>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            </Card>
          )}
        </Stack>
      </DataView>

      {/* Course detail modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={selectedAssignment?.courseName ?? 'Course details'}
        size='xl'
      >
        <DataView isLoading={detailLoading} label='details' isEmpty={!detail}>
          {detailCourse && (
            <Stack gap='md' pt='sm'>
              <Group
                gap='sm'
                justify='space-between'
                align='start'
                wrap='wrap'
                mt='xs'
              >
                <Stack gap={0}>
                  <Text fw={600}>
                    {detail?.employee?.firstName} {detail?.employee?.lastName}
                  </Text>
                  <Text size='xs' c='dimmed'>
                    {detail?.employee?.employeeCode} · {detail?.employee?.email}
                  </Text>
                </Stack>
                <Badge
                  color={STATUS_COLORS[detailCourse.status]}
                  variant='light'
                >
                  {detailCourse.status}
                </Badge>
              </Group>

              {/* Due date edit */}
              <Card withBorder radius='md' p='md'>
                <Stack gap='sm'>
                  <Text size='sm' fw={600}>
                    Due Date
                  </Text>
                  <Group gap='sm' align='flex-end' wrap='wrap'>
                    <DatePickerInput
                      leftSection={<IconCalendar size={16} />}
                      value={editingDate}
                      onChange={date => {
                        if (date === null) {
                          setEditingDate(null);
                          return;
                        }
                        setEditingDate(new Date(date));
                      }}
                      placeholder='Pick a due date'
                      minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                      valueFormat='DD MMM YYYY'
                      w={{ base: '100%', sm: 240 }}
                      disabled={isCompletedCourse}
                    />
                    <Button
                      color={themeConfig.color}
                      loading={updateDueDateMutation.isPending}
                      disabled={!editingDate || isCompletedCourse}
                      onClick={handleSaveDueDate}
                    >
                      Save
                    </Button>
                  </Group>
                  {isCompletedCourse && (
                    <Text size='xs' c='dimmed'>
                      Due date cannot be changed for a completed course.
                    </Text>
                  )}
                  <Text size='xs' c='dimmed'>
                    Current due date:{' '}
                    <Text component='span' fw={600}>
                      {formatDate(detailCourse.dueDate)}
                    </Text>
                  </Text>
                </Stack>
              </Card>

              <Group justify='space-between'>
                <Text size='xs' c='dimmed'>
                  {detailCourse.progress.completedTasks}/
                  {detailCourse.progress.totalTasks} tasks completed
                </Text>
                <Text size='xs' fw={600} c={themeConfig.color}>
                  {detailCourse.progress.percentComplete}%
                </Text>
              </Group>
              <Progress.Root size='md'>
                <Progress.Section
                  value={detailCourse.progress.percentComplete}
                  color={
                    detailCourse.status === 'Completed'
                      ? 'green'
                      : detailCourse.status === 'In Progress'
                        ? 'orange'
                        : 'blue'
                  }
                />
              </Progress.Root>

              <Divider />

              {detailCourse.modules.length === 0 ? (
                <Center py='md'>
                  <Text c='dimmed' size='sm'>
                    No modules in this course.
                  </Text>
                </Center>
              ) : (
                <Stack gap='md'>
                  {detailCourse.modules.map(module => (
                    <Card key={module._id} withBorder radius='md' p='md'>
                      <Stack gap='sm'>
                        <Group justify='space-between' wrap='wrap'>
                          <Text fw={600} size='sm'>
                            {module.moduleName}
                          </Text>
                          <Badge variant='light' color='gray'>
                            {module.completedTasks}/{module.totalTasks} tasks
                          </Badge>
                        </Group>
                        <Stack gap={6}>
                          {module.tasks.map(task => (
                            <Group
                              key={task._id}
                              gap='sm'
                              justify='space-between'
                              p='xs'
                              style={{
                                borderRadius: 8,
                                background:
                                  'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-5))',
                                color:
                                  'light-dark(var(--mantine-color-dark-9), var(--mantine-color-gray-1))'
                              }}
                            >
                              <Group gap='sm'>
                                <ThemeIcon
                                  size={22}
                                  radius='xl'
                                  color={task.isCompleted ? 'green' : 'gray'}
                                  variant={
                                    task.isCompleted ? 'filled' : 'light'
                                  }
                                >
                                  {task.isCompleted ? (
                                    <IconCheck size={13} />
                                  ) : (
                                    <IconCircleDot size={13} />
                                  )}
                                </ThemeIcon>
                                <Text size='sm'>{task.taskName}</Text>
                              </Group>
                              <Group gap='xs'>
                                <Badge
                                  size='xs'
                                  variant='light'
                                  color={task.isCompleted ? 'green' : 'gray'}
                                >
                                  {task.type}
                                </Badge>
                                {task.isCompleted ? (
                                  <Badge
                                    size='xs'
                                    color='green'
                                    variant='light'
                                  >
                                    Done
                                  </Badge>
                                ) : task.completedAt ? (
                                  <Tooltip
                                    label={formatDate(task.completedAt)}
                                    withArrow
                                  >
                                    <Text
                                      size='xs'
                                      c='dimmed'
                                      style={{ cursor: 'default' }}
                                    >
                                      {formatDate(task.completedAt)}
                                    </Text>
                                  </Tooltip>
                                ) : null}
                              </Group>
                            </Group>
                          ))}
                        </Stack>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              )}
            </Stack>
          )}
        </DataView>

        <Group justify='flex-end' mt='md'>
          <Button variant='subtle' color='gray' onClick={close}>
            Close
          </Button>
        </Group>
      </Modal>

      {/* Un-assign confirmation modal */}
      <Modal
        opened={unassignOpened}
        onClose={closeUnassign}
        title='Un-assign Course'
        size='sm'
        centered
        styles={{
          header: { paddingBottom: '8px' },
          body: { paddingTop: '12px' }
        }}
      >
        <Stack gap='md'>
          <Text size='sm' pt='xs'>
            Are you sure you want to un-assign{' '}
            <Text component='span' fw={600}>
              {unassignTarget?.courseName ?? 'this course'}
            </Text>{' '}
            from{' '}
            <Text component='span' fw={600}>
              {employee?.firstName} {employee?.lastName}
            </Text>
            ? This will also remove their progress for this course.
          </Text>
          <Group justify='flex-end' gap='sm'>
            <Button variant='default' onClick={closeUnassign}>
              Cancel
            </Button>
            <Button
              color='red'
              loading={unassignMutation.isPending}
              leftSection={<IconTrash size={16} />}
              onClick={handleConfirmUnassign}
            >
              Un-assign
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};

export default EmployeeCourseProgress;
