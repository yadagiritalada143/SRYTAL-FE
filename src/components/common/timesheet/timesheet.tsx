import { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Title,
  Table,
  Grid,
  Loader,
  TextInput,
  ActionIcon,
  Group,
  Badge,
  Text,
  Box,
  Tooltip,
  Collapse,
  Textarea,
  Center,
} from '@mantine/core';
import { DatePickerInput, DatesRangeValue, DateValue } from '@mantine/dates';
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconSearch,
  IconSunOff,
  IconBeach,
  IconCalendarOff,
  IconX,
  IconCheck,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import moment from 'moment-timezone';
import { toast } from 'react-toastify';
import { TaskPopover } from './task-popover';
import { ColorDiv } from '../style-components/c-div';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import {
  EmployeeTimesheet,
  Package,
  Task,
} from '../../../interfaces/timesheet';
import {
  getTimesheetData,
  submitTimeSheet,
} from '../../../services/common-services';
import { StandardModal } from '../../UI/Models/base-model';
import { useCustomToast } from '../../../utils/common/toast';

const DateTableComponent = () => {
  const [openedLeaveModal, { open: openLeaveModal, close: closeLeaveModal }] =
    useDisclosure(false);
  const [openedEntryModal, { open: openEntryModal, close: closeEntryModal }] =
    useDisclosure(false);
  const [
    openedSubmitModal,
    { open: openSubmitModal, close: closeSubmitModal },
  ] = useDisclosure(false);
  const [openedSearch, { toggle: toggleSearch }] = useDisclosure(false);
  const [dateRange, setDateRange] = useState<DatesRangeValue>([
    moment().tz('Asia/Kolkata').toDate(),
    moment().tz('Asia/Kolkata').add(6, 'days').toDate(),
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeEntries, setTimeEntries] = useState<EmployeeTimesheet[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentEntry, setCurrentEntry] = useState<EmployeeTimesheet>();
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveDates, setLeaveDates] = useState<DatesRangeValue>([null, null]);
  const [originalEntries, setOriginalEntries] = useState<EmployeeTimesheet[]>(
    []
  );
  const [changesMade, setChangesMade] = useState<EmployeeTimesheet[]>([]);
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const { showSuccessToast } = useCustomToast();
  // Get date range as string array
  const getDateRangeArray = (start: DateValue, end: DateValue): string[] => {
    if (start && end) {
      const dates: string[] = [];
      const current = new Date(start);

      while (current <= end) {
        dates.push(moment(current).format('YYYY-MM-DD'));
        current.setDate(current.getDate() + 1);
      }
      return dates;
    }
    return [];
  };

  // Format date for display
  const formatDisplayDate = (date: string) => {
    return moment(date).format('DD MMM ddd');
  };

  // Fetch timesheet data
  const fetchTimesheetData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [start, end] = dateRange;
      const responseData = await getTimesheetData(start, end);
      const formattedTimesheet = formatData(responseData);
      setTimeEntries(formattedTimesheet);
      setOriginalEntries(formattedTimesheet);
      setChangesMade([]);
    } catch {
      toast.error('Failed to fetch timesheet data');
    } finally {
      setIsLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    const [start, end] = dateRange;
    if (start && end) {
      fetchTimesheetData();
    }
  }, [fetchTimesheetData, dateRange]);

  // Navigate date range
  const navigateDateRange = (direction: 'previous' | 'next') => {
    const [start, end] = dateRange;
    const daysDiff = moment(end).diff(start, 'days') + 1;

    if (direction === 'previous') {
      const newStart = moment(start).subtract(daysDiff, 'days').toDate();
      const newEnd = moment(end).subtract(daysDiff, 'days').toDate();
      setDateRange([newStart, newEnd]);
    } else {
      const newStart = moment(start).add(daysDiff, 'days').toDate();
      const newEnd = moment(end).add(daysDiff, 'days').toDate();
      setDateRange([newStart, newEnd]);
    }
  };

  const trackChanges = (newEntry: EmployeeTimesheet) => {
    const originalEntry = originalEntries.find(
      e =>
        e.project_id === newEntry.project_id &&
        e.task_id === newEntry.task_id &&
        e.date === newEntry.date
    );

    // If entry is new or changed
    if (
      !originalEntry ||
      originalEntry.hours !== newEntry.hours ||
      originalEntry.comments !== newEntry.comments
    ) {
      // Check if this change is already tracked
      const existingChangeIndex = changesMade.findIndex(
        c =>
          c.project_id === newEntry.project_id &&
          c.task_id === newEntry.task_id &&
          c.date === newEntry.date
      );

      if (existingChangeIndex >= 0) {
        // Update existing change
        setChangesMade(prev =>
          prev.map((change, idx) =>
            idx === existingChangeIndex ? newEntry : change
          )
        );
      } else {
        // Add new change
        setChangesMade(prev => [...prev, newEntry]);
      }
    } else {
      // If change is reverted, remove from changes
      setChangesMade(prev =>
        prev.filter(
          c =>
            !(
              c.project_id === newEntry.project_id &&
              c.task_id === newEntry.task_id &&
              c.date === newEntry.date
            )
        )
      );
    }
  };

  // Format raw data
  const formatData = (data: { packageId: Package; tasks: Task[] }[]) => {
    return data.flatMap(pkg =>
      pkg.tasks.flatMap(task =>
        task.timesheet.map(timesheet => {
          return {
            date: moment.utc(timesheet.date).format('YYYY-MM-DD'),
            isLeave: timesheet.isLeave ?? false,
            isHoliday: timesheet.isHoliday ?? false,
            isWeekOff: timesheet.isWeekOff ?? false,
            project_id: pkg.packageId._id,
            task_id: task.taskId._id,
            project_name: pkg.packageId.title,
            task_name: task.taskId.title,
            hours: timesheet.hours ?? 0,
            comments: timesheet.comments ?? '',
            id: timesheet.id,
            leaveReason: timesheet.leaveReason,
          };
        })
      )
    );
  };

  const filteredProjects = Array.from(
    new Map(
      timeEntries
        .filter(
          entry =>
            entry.project_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            entry.task_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(entry => [
          entry.project_id,
          {
            id: entry.project_id,
            title: entry.project_name,
            taskId: entry.task_id,
            task_name: entry.task_name,
          },
        ])
    ).values()
  );

  const filteredTasks = Array.from(
    new Map(
      timeEntries
        .filter(
          entry =>
            entry.project_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            entry.task_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(entry => [
          entry.task_id,
          {
            id: entry.project_id,
            title: entry.project_name,
            taskId: entry.task_id,
            task_name: entry.task_name,
          },
        ])
    ).values()
  );

  const filteredTasksIds = new Set(filteredTasks.map(p => p.taskId));

  // Calculate project total hours
  const getProjectTotalHours = (projectId: string) => {
    const dateStrings = getDateRangeArray(...dateRange);

    return timeEntries
      .filter(
        entry =>
          entry.project_id === projectId && filteredTasksIds.has(entry.task_id)
      )
      .reduce((total, entry) => {
        if (dateStrings.includes(moment(entry.date).format('YYYY-MM-DD'))) {
          return total + (entry.hours || 0);
        }
        return total;
      }, 0);
  };

  // Handle hours and comments change
  const handleEntrySubmit = () => {
    if (!currentEntry) return;

    if (!currentEntry.comments.trim()) {
      toast.error('Comments are required');
      return;
    }

    const newEntry = {
      date: moment(currentEntry.date).format('YYYY-MM-DD'),
      isLeave: false,
      isHoliday: false,
      isWeekOff: false,
      project_id: currentEntry.project_id,
      task_id: currentEntry.task_id,
      hours: currentEntry.hours,
      project_name: currentEntry.project_name,
      task_name: currentEntry.task_name,
      comments: currentEntry.comments,
      leaveReason: '',
    };

    setTimeEntries(prev => {
      const formattedDate = moment(currentEntry.date).format('YYYY-MM-DD');
      const existingIndex = prev.findIndex(
        e =>
          e.project_id === currentEntry.project_id &&
          e.task_id === currentEntry.task_id &&
          e.date === formattedDate
      );

      if (existingIndex >= 0) {
        return prev.map((entry, idx) =>
          idx === existingIndex ? newEntry : entry
        );
      }

      return [...prev, newEntry];
    });

    // Track the change
    trackChanges(newEntry);

    closeEntryModal();
  };

  // Check if date is special (leave/holiday/week-off)
  const getDateStatus = (date: string, taskId: string, projectId: string) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const entry = timeEntries.find(
      e =>
        e.date === formattedDate &&
        e.task_id === taskId &&
        e.project_id === projectId
    );

    if (!entry) return null;

    if (entry.isWeekOff) return { label: 'weekoff', comment: entry.comments };
    if (entry.isLeave) return { label: 'leave', comment: entry.leaveReason };
    if (entry.isHoliday) return { label: 'holiday', comment: entry.comments };

    return null;
  };

  // Check if date is in the past
  const isPastDate = (date: string) => {
    return moment(date).isBefore(moment(), 'day');
  };

  // Filter projects and tasks based on search query

  // Get tasks by project with search filtering
  const getTasksByProject = (projectId: string) => {
    const seen = new Set();
    return timeEntries
      .filter(
        entry =>
          entry.project_id === projectId &&
          (entry.project_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            entry.task_name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .map(entry => ({ id: entry.task_id, title: entry.task_name }))
      .filter(task => {
        if (seen.has(task.id)) return false;
        seen.add(task.id);
        return true;
      });
  };

  // Render status badge
  const renderStatusBadge = ({
    label,
    comment,
  }: {
    label: string;
    comment: string;
  }) => {
    const statusConfig = {
      weekoff: {
        color: 'blue',
        icon: <IconSunOff size={14} />,
        label: 'Week Off',
        comment,
      },
      holiday: {
        color: 'orange',
        icon: <IconBeach size={14} />,
        label: 'Holiday',
        comment,
      },
      leave: {
        color: 'red',
        icon: <IconCalendarOff size={14} />,
        label: 'Leave',
        comment,
      },
    };

    const config = statusConfig[label as keyof typeof statusConfig];

    return (
      <Badge
        color={config.color}
        variant="light"
        leftSection={config.icon}
        style={{ textTransform: 'none' }}
      >
        <Text className="text-xs">
          <TaskPopover full={config.comment} short={config.label} />
        </Text>
      </Badge>
    );
  };

  const prepareSubmitData = () => {
    // Create a map to store all packages data (both changed and unchanged)
    const packagesMap = new Map<string, any>();

    // First, add all original entries to the map
    originalEntries.forEach(entry => {
      if (!packagesMap.has(entry.project_id)) {
        packagesMap.set(entry.project_id, {
          packageId: entry.project_id,
          tasks: [],
        });
      }

      const pkg = packagesMap.get(entry.project_id)!;
      let task = pkg.tasks.find((t: any) => t.taskId === entry.task_id);

      if (!task) {
        task = {
          taskId: entry.task_id,
          timesheet: [],
        };
        pkg.tasks.push(task);
      }

      task.timesheet.push({
        date: moment(entry.date).toDate(),
        hours: entry.hours,
        comments: entry.comments,
        isLeave: entry.isLeave,
        isHoliday: entry.isHoliday,
        isWeekOff: entry.isWeekOff,
        leaveReason: entry.leaveReason,
      });
    });

    // Then, apply the changes on top of the original data
    changesMade.forEach(entry => {
      const pkg = packagesMap.get(entry.project_id);
      if (!pkg) return;

      let task = pkg.tasks.find((t: any) => t.taskId === entry.task_id);
      if (!task) {
        task = {
          taskId: entry.task_id,
          timesheet: [],
        };
        pkg.tasks.push(task);
      }

      // Find existing timesheet entry for this date
      const existingEntryIndex = task.timesheet.findIndex(
        (ts: any) => moment(ts.date).format('YYYY-MM-DD') === entry.date
      );

      if (existingEntryIndex >= 0) {
        // Update existing entry
        task.timesheet[existingEntryIndex] = {
          ...task.timesheet[existingEntryIndex],
          hours: entry.hours,
          comments: entry.comments,
        };
      } else {
        // Add new entry
        task.timesheet.push({
          date: moment(entry.date).toDate(),
          hours: entry.hours,
          comments: entry.comments,
          isLeave: entry.isLeave,
          isHoliday: entry.isHoliday,
          isWeekOff: entry.isWeekOff,
          leaveReason: entry.leaveReason,
        });
      }
    });

    // Convert the map to array and format the packageId and taskId as objects
    return Array.from(packagesMap.values()).map(pkg => ({
      packageId: pkg.packageId,
      tasks: pkg.tasks.map((task: any) => ({
        taskId: task.taskId,
        timesheet: task.timesheet,
      })),
    }));
  };

  const handleSubmit = async () => {
    try {
      const submitData = prepareSubmitData();
      submitTimeSheet(submitData);
      showSuccessToast('Timesheet submitted successfully');
      setChangesMade([]);
      closeSubmitModal();
    } catch {
      toast.error('Failed to submit timesheet');
    }
  };

  const handleLeaveSubmit = async () => {
    if (!leaveReason.trim()) {
      toast.error('Please enter a leave reason');
      return;
    }

    if (!leaveDates[0] || !leaveDates[1]) {
      toast.error('Please select leave dates');
      return;
    }

    const dateRangeArray = getDateRangeArray(leaveDates[0], leaveDates[1]);
    if (dateRangeArray.length === 0) {
      toast.error('Invalid date range');
      return;
    }

    // Create a map to organize all timesheet data
    const packagesMap = new Map<
      string,
      {
        packageId: string;
        packageName: string;
        tasks: Map<
          string,
          {
            taskId: string;
            taskName: string;
            timesheet: Map<string, any>; // Key: date string (YYYY-MM-DD)
          }
        >;
      }
    >();

    // First process all existing entries
    timeEntries.forEach(entry => {
      if (!packagesMap.has(entry.project_id)) {
        packagesMap.set(entry.project_id, {
          packageId: entry.project_id,
          packageName: entry.project_name,
          tasks: new Map(),
        });
      }

      const project = packagesMap.get(entry.project_id)!;
      if (!project.tasks.has(entry.task_id)) {
        project.tasks.set(entry.task_id, {
          taskId: entry.task_id,
          taskName: entry.task_name,
          timesheet: new Map(),
        });
      }

      const task = project.tasks.get(entry.task_id)!;
      const dateKey = moment(entry.date).format('YYYY-MM-DD');
      task.timesheet.set(dateKey, {
        date: moment(entry.date).toDate(),
        hours: entry.hours,
        comments: entry.comments,
        isLeave: entry.isLeave,
        isHoliday: entry.isHoliday,
        isWeekOff: entry.isWeekOff,
        leaveReason: entry.leaveReason,
      });
    });

    // Then add leave entries where they don't exist
    packagesMap.forEach(project => {
      project.tasks.forEach(task => {
        dateRangeArray.forEach(date => {
          const dateKey = moment(date).format('YYYY-MM-DD');
          if (!task.timesheet.has(dateKey)) {
            task.timesheet.set(dateKey, {
              date: moment(date).toDate(),
              isLeave: true,
              isVacation: true,
              leaveReason,
              hours: 0,
              comments: 'Leave',
              isHoliday: false,
              isWeekOff: false,
            });
          }
        });
      });
    });

    // Convert to the required API format
    const submissionData = Array.from(packagesMap.values()).map(project => ({
      packageId: {
        _id: project.packageId,
        title: project.packageName,
      },
      tasks: Array.from(project.tasks.values()).map(task => ({
        taskId: {
          _id: task.taskId,
          title: task.taskName,
        },
        timesheet: Array.from(task.timesheet.values()),
      })),
    }));

    try {
      setIsLoading(true);
      await submitTimeSheet(submissionData);
      showSuccessToast('Leave applied successfully');
      closeLeaveModal();
      fetchTimesheetData();
      setLeaveReason('');
      setLeaveDates([null, null]);
    } catch (error) {
      toast.error('Failed to apply leave');
      console.error('Leave submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Open edit modal for a specific entry
  const openEditModal = (
    projectId: string,
    taskId: string,
    date: string,
    hours: number,
    comments: string,
    projectName: string,
    taskName: string
  ) => {
    if (isPastDate(date)) {
      toast.error("You can't edit for past dates");
      return;
    }

    setCurrentEntry({
      project_id: projectId,
      project_name: projectName,
      isHoliday: false,
      isLeave: false,
      isWeekOff: false,
      leaveReason: '',
      task_id: taskId,
      task_name: taskName,
      date,
      hours,
      comments,
    });
    openEntryModal();
  };

  // Render hours cell
  const renderHoursCell = (
    projectId: string,
    taskId: string,
    date: string,
    hours: number,
    comments: string,
    projectName: string,
    taskName: string
  ) => {
    const status = getDateStatus(date, taskId, projectId);

    if (status) {
      return (
        <Box
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {renderStatusBadge(status)}
        </Box>
      );
    }

    return (
      <Tooltip label="Double click to edit hours" withArrow>
        <Box
          onDoubleClick={() =>
            openEditModal(
              projectId,
              taskId,
              date,
              hours,
              comments,
              projectName,
              taskName
            )
          }
          style={{
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <TaskPopover short={hours.toString() || '0'} full={comments} />
        </Box>
      </Tooltip>
    );
  };

  return (
    <ColorDiv className="w-100 p-5">
      <Title
        order={2}
        className="text-xl sm:text-2xl md:text-3xl font-extrabold underline text-center px-2 py-4"
      >
        Timesheet
      </Title>

      <Grid align="center" gutter="md" className="mb-6 p-4 rounded-md">
        <Grid.Col span={{ xs: 12, md: 8 }}>
          <Group>
            <ActionIcon
              variant="outline"
              radius="xl"
              color={organizationConfig.organization_theme.theme.color}
              size="lg"
              onClick={() => navigateDateRange('previous')}
            >
              <IconChevronLeft size={18} />
            </ActionIcon>

            <DatePickerInput
              type="range"
              onChange={value => {
                if (value[0] && value[1]) {
                  const daysDiff =
                    moment(value[1]).diff(moment(value[0]), 'days') + 1;
                  if (daysDiff > 14) {
                    toast.error('Maximum date range is 14 days');
                    return;
                  }
                }
                setDateRange(value);
              }}
              leftSection={<IconCalendar size={16} />}
              size="sm"
              minDate={moment().subtract(1, 'month').toDate()}
              maxDate={moment().add(2, 'weeks').toDate()}
              value={dateRange}
              placeholder="Pick date range (max 14 days)"
              allowSingleDateInRange={false}
            />

            <ActionIcon
              variant="outline"
              color={organizationConfig.organization_theme.theme.color}
              radius="xl"
              size="lg"
              onClick={() => navigateDateRange('next')}
            >
              <IconChevronRight size={18} />
            </ActionIcon>
          </Group>
        </Grid.Col>

        <Grid.Col span={{ xs: 12, md: 4 }}>
          <Group justify="flex-end" gap="sm">
            <Button
              onClick={toggleSearch}
              variant="outline"
              color="gray"
              radius="md"
              size="sm"
              leftSection={
                openedSearch ? <IconX size={16} /> : <IconSearch size={16} />
              }
            >
              {openedSearch ? 'Close' : 'Search'}
            </Button>

            <Button
              onClick={openLeaveModal}
              color="green"
              radius="md"
              size="sm"
              leftSection={<IconCalendarOff size={16} />}
            >
              Apply Leave
            </Button>
          </Group>
        </Grid.Col>
      </Grid>

      <Collapse in={openedSearch} mb="md">
        <TextInput
          placeholder="Search projects or tasks..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.currentTarget.value)}
          rightSection={
            searchQuery && (
              <ActionIcon onClick={() => setSearchQuery('')}>
                <IconX size={16} />
              </ActionIcon>
            )
          }
        />
      </Collapse>
      {changesMade.length > 0 && (
        <Box mt="md" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            leftSection={<IconCheck size={16} />}
            color="green"
            onClick={openSubmitModal}
          >
            Submit Changes
          </Button>
        </Box>
      )}

      {isLoading ? (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
          }}
        >
          <Loader
            size="xl"
            color={organizationConfig.organization_theme.theme.button.color}
          />
        </Box>
      ) : (
        <Box style={{ overflowX: 'auto' }}>
          <Table striped highlightOnHover>
            <thead
              className="text-xs"
              style={{
                backgroundColor:
                  organizationConfig.organization_theme.theme.backgroundColor,
                color: organizationConfig.organization_theme.theme.color,
              }}
            >
              <tr
                style={{
                  backgroundColor:
                    organizationConfig.organization_theme.theme.backgroundColor,
                  color: organizationConfig.organization_theme.theme.color,
                }}
              >
                <th
                  className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ minWidth: '150px' }}
                >
                  Project
                </th>
                <th
                  className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ minWidth: '150px' }}
                >
                  Task
                </th>
                {getDateRangeArray(...dateRange).map(date => (
                  <th
                    key={date}
                    style={{ minWidth: '80px', textAlign: 'center' }}
                  >
                    {formatDisplayDate(date)}
                  </th>
                ))}
                <th style={{ minWidth: '80px' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map(project => {
                const tasks = getTasksByProject(project.id);
                if (tasks.length === 0) return null;

                return tasks.map((task, taskIndex) => (
                  <tr key={`${project.id}-${task.id}`}>
                    {taskIndex === 0 && (
                      <td
                        className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis "
                        rowSpan={tasks.length}
                        style={{ verticalAlign: 'middle' }}
                      >
                        <Center>
                          <Text fw={500} lineClamp={2}>
                            {project.title}
                          </Text>
                        </Center>
                      </td>
                    )}
                    <td className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis">
                      <Center>
                        <TaskPopover short={task.title} full={task.title} />
                      </Center>
                    </td>
                    {getDateRangeArray(...dateRange).map(date => {
                      const entry = timeEntries.find(
                        e =>
                          e.project_id === project.id &&
                          e.task_id === task.id &&
                          e.date === moment(date).format('YYYY-MM-DD')
                      );
                      return (
                        <td
                          className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
                          key={`${project.id}-${task.id}-${date}`}
                        >
                          {renderHoursCell(
                            project.id,
                            task.id,
                            date,
                            entry?.hours ?? 0,
                            entry?.comments ?? '',
                            project.title,
                            task.title
                          )}
                        </td>
                      );
                    })}
                    {taskIndex === 0 && (
                      <td
                        className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
                        rowSpan={tasks.length}
                        style={{ textAlign: 'center', verticalAlign: 'middle' }}
                      >
                        {getProjectTotalHours(project.id)}
                      </td>
                    )}
                  </tr>
                ));
              })}
            </tbody>
          </Table>
        </Box>
      )}
      {currentEntry && (
        <StandardModal
          opened={openedEntryModal}
          onClose={closeEntryModal}
          title="Edit Time Entry"
          size="sm"
        >
          <Box p="sm">
            <Text fw={500} mb="xs">
              Project: {currentEntry.project_name}
            </Text>
            <Text fw={500} mb="xs">
              Task: {currentEntry.task_name}
            </Text>
            <Text fw={500} mb="xs">
              Date:{' '}
              {currentEntry && moment(currentEntry.date).format('DD MMM YYYY')}
            </Text>

            <TextInput
              label="Hours"
              type="number"
              min={0}
              max={24}
              value={currentEntry.hours.toString()}
              onChange={e => {
                const rawValue = e.currentTarget.value;
                if (rawValue === '') {
                  setCurrentEntry(prev => ({
                    ...prev,
                    ...currentEntry,
                    hours: 0,
                  }));
                  return;
                }

                const numericValue = parseFloat(rawValue);
                if (!isNaN(numericValue)) {
                  const clampedValue = Math.min(24, Math.max(0, numericValue));
                  setCurrentEntry(prev => ({
                    ...prev,
                    ...currentEntry,
                    hours: clampedValue,
                  }));
                }
              }}
              mb="sm"
            />

            <Textarea
              label="Comments"
              placeholder="Enter comments (required)"
              value={currentEntry.comments}
              onChange={e => {
                setCurrentEntry(prev => ({
                  ...prev,
                  ...currentEntry,
                  comments: e.target.value,
                }));
              }}
              autosize
              minRows={3}
              mb="sm"
              required
            />

            <Group justify="flex-end">
              <Button variant="outline" onClick={closeEntryModal}>
                Cancel
              </Button>
              <Button color="blue" onClick={handleEntrySubmit}>
                Save
              </Button>
            </Group>
          </Box>
        </StandardModal>
      )}
      <StandardModal
        opened={openedLeaveModal}
        onClose={closeLeaveModal}
        title="Apply for Leave"
        size="md"
      >
        <Box p="sm">
          <Textarea
            label="Reason"
            placeholder="Enter leave reason"
            value={leaveReason}
            onChange={e => setLeaveReason(e.currentTarget.value)}
            mb="sm"
            required
            autosize
            minRows={3}
          />

          <DatePickerInput
            type="range"
            label="Leave Dates"
            placeholder="Select leave period"
            value={leaveDates}
            onChange={setLeaveDates}
            mb="sm"
            minDate={new Date()}
            maxDate={moment().add(3, 'months').toDate()}
            allowSingleDateInRange
            clearable
            required
          />

          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={closeLeaveModal}>
              Cancel
            </Button>
            <Button
              color="green"
              onClick={handleLeaveSubmit}
              loading={isLoading}
            >
              Submit Leave
            </Button>
          </Group>
        </Box>
      </StandardModal>
      <StandardModal
        opened={openedSubmitModal}
        onClose={closeSubmitModal}
        title={
          <Text fw={600} size="lg">
            Confirm Timesheet Submission
          </Text>
        }
        size="xl"
        radius="md"
        padding="lg"
      >
        <Box p="sm">
          <Text mb="lg" c="dimmed">
            Please review your changes before submission. You're about to update{' '}
            {changesMade.length} time entries.
          </Text>

          <Box>
            <Table
              striped
              highlightOnHover
              verticalSpacing="sm"
              horizontalSpacing="md"
              withColumnBorders
            >
              <thead
                style={{
                  position: 'sticky',
                }}
              >
                <tr>
                  <th
                    className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{ minWidth: '120px' }}
                  >
                    Date
                  </th>
                  <th
                    className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{ minWidth: '180px' }}
                  >
                    Project
                  </th>
                  <th
                    className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{ minWidth: '180px' }}
                  >
                    Task
                  </th>
                  <th
                    className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{ width: '80px', textAlign: 'center' }}
                  >
                    Hours
                  </th>
                  <th
                    className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{ minWidth: '200px' }}
                  >
                    Comments
                  </th>
                </tr>
              </thead>
              <tbody>
                {changesMade.map((change, index) => {
                  return (
                    <tr key={index} className="m-2 p-2">
                      <td className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis">
                        <Badge variant="light" color="blue" fullWidth>
                          {moment(change.date).format('ddd, DD MMM')}
                        </Badge>
                      </td>
                      <td className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis">
                        <Text fw={500} lineClamp={2}>
                          {change.project_name}
                        </Text>
                      </td>
                      <td className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis">
                        <Text lineClamp={2}>{change.task_name}</Text>
                      </td>
                      <td
                        className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
                        style={{ textAlign: 'center' }}
                      >
                        <Text fw={600}>{change.hours}</Text>
                      </td>
                      <td className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis">
                        <Text lineClamp={2} style={{ flex: 1 }}>
                          {change.comments}
                        </Text>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Box>

          <Group justify="space-between" mt="xl">
            <Text size="sm" c="dimmed">
              Total changes:{' '}
              <Badge color="blue" variant="light">
                {changesMade.length}
              </Badge>
            </Text>
            <Group>
              <Button
                variant="outline"
                onClick={closeSubmitModal}
                radius="md"
                leftSection={<IconX size={16} />}
              >
                Cancel
              </Button>
              <Button
                color="green"
                onClick={handleSubmit}
                radius="md"
                leftSection={<IconCheck size={16} />}
              >
                Confirm Submission
              </Button>
            </Group>
          </Group>
        </Box>
      </StandardModal>
    </ColorDiv>
  );
};

export default DateTableComponent;
