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
import { getTimesheetData } from '../../../services/common-services';
import { StandardModal } from '../../UI/Models/base-model';

const DateTableComponent = () => {
  const [openedLeaveModal, { open: openLeaveModal, close: closeLeaveModal }] =
    useDisclosure(false);
  const [openedEntryModal, { open: openEntryModal, close: closeEntryModal }] =
    useDisclosure(false);
  const [openedSearch, { toggle: toggleSearch }] = useDisclosure(false);
  const [dateRange, setDateRange] = useState<DatesRangeValue>([
    moment().tz('Asia/Kolkata').toDate(),
    moment().tz('Asia/Kolkata').add(6, 'days').toDate(),
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeEntries, setTimeEntries] = useState<EmployeeTimesheet[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentEntry, setCurrentEntry] = useState<{
    date: string;
    isLeave: boolean;
    isHoliday: boolean;
    isWeekOff: boolean;
    project_id: string;
    task_id: string;
    project_name: string;
    task_name: string;
    hours: number;
    comments: string;
    leaveReason: string;
  }>();
  const organizationConfig = useRecoilValue(organizationThemeAtom);

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
    } catch {
      toast.error('Failed to fetch timesheet data');
    } finally {
      setIsLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchTimesheetData();
  }, [fetchTimesheetData]);

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

  // Calculate project total hours
  const getProjectTotalHours = (projectId: string) => {
    const dateStrings = getDateRangeArray(...dateRange);
    return timeEntries
      .filter(entry => entry.project_id === projectId)
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
          idx === existingIndex
            ? {
                ...entry,
                hours: currentEntry.hours,
                comments: currentEntry.comments,
              }
            : entry
        );
      }

      return [
        ...prev,
        {
          date: formattedDate,
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
        },
      ];
    });

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
          { id: entry.project_id, title: entry.project_name },
        ])
    ).values()
  );

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

  const handleDateChange = (value: [Date | null, Date | null]) => {
    if (value[0] && value[1]) {
      setDateRange(value);
    } else if (value[0] === null && value[1] === null) {
      setDateRange([null, null]);
    }
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
              onChange={handleDateChange}
              leftSection={<IconCalendar size={16} />}
              size="sm"
              maxDate={moment().add(1, 'month').toDate()}
              placeholder="Pick date range"
              allowSingleDateInRange={false}
              clearable
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
      >
        <Box p="sm">
          <TextInput label="Reason" placeholder="Enter leave reason" mb="sm" />
          <DatePickerInput
            type="range"
            label="Leave Dates"
            placeholder="Select leave period"
            mb="sm"
          />
          <Group justify="flex-end">
            <Button variant="outline" onClick={closeLeaveModal}>
              Cancel
            </Button>
            <Button color="green" onClick={closeLeaveModal}>
              Submit
            </Button>
          </Group>
        </Box>
      </StandardModal>
    </ColorDiv>
  );
};

export default DateTableComponent;
