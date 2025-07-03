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
  Center,
} from '@mantine/core';
import { DatePickerInput, DatesRangeValue } from '@mantine/dates';
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
import { EmployeeTimesheet } from '../../../interfaces/timesheet';
import { getTimesheetData } from '../../../services/common-services';
import {
  formatData,
  formatDisplayDate,
  getDateRangeArray,
  getDateStatus,
  getProjectTotalHours,
  getTasksByProject,
  navigateDateRange,
  openEditModal,
  trackChanges,
} from './helper';
import {
  ApplyLeaveTimesheetModal,
  ConfirmTimesheetSubmitModal,
  EditTimeEntryModal,
} from './modals';

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
  const [currentEntry, setCurrentEntry] = useState<EmployeeTimesheet>();
  const [originalEntries, setOriginalEntries] = useState<EmployeeTimesheet[]>(
    []
  );
  const [changesMade, setChangesMade] = useState<EmployeeTimesheet[]>([]);
  const organizationConfig = useRecoilValue(organizationThemeAtom);

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

  const handleEntrySubmit = () => {
    if (!currentEntry) return;

    if (!currentEntry.comments.trim()) {
      toast.error('Comments are required');
      return;
    }

    const formattedDate = moment(currentEntry.date).format('YYYY-MM-DD');

    const newEntry = {
      date: formattedDate,
      isVacation: false,
      isHoliday: false,
      isWeekOff: false,
      project_id: currentEntry.project_id,
      task_id: currentEntry.task_id,
      hours: currentEntry.hours,
      project_name: currentEntry.project_name,
      task_name: currentEntry.task_name,
      comments: currentEntry.comments,
      leaveReason: currentEntry.leaveReason,
      id: currentEntry.id,
      status: 'pending',
    };

    setTimeEntries(prev => {
      const existingIndex = prev.findIndex(
        e =>
          e.project_id === currentEntry.project_id &&
          e.task_id === currentEntry.task_id &&
          e.date === formattedDate
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newEntry;
        return updated;
      }

      toast.warning('No existing entry found to update');
      return prev;
    });

    trackChanges(newEntry, originalEntries, changesMade, setChangesMade);
    closeEntryModal();
  };

  const renderStatusBadge = ({
    label,
    comment,
    status,
  }: {
    label: string;
    comment: string;
    status: string;
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
          <TaskPopover
            full={config.comment}
            short={config.label}
            status={status}
            bgColor={[
              organizationConfig.organization_theme.theme.backgroundColor,
              organizationConfig.organization_theme.theme.color,
            ]}
          />
        </Text>
      </Badge>
    );
  };

  const renderHoursCell = (timesheet: EmployeeTimesheet, edit: boolean) => {
    const {
      date,
      task_id,
      project_id,
      hours,
      comments,
      status: timesheetStatus,
    } = timesheet;
    const status = getDateStatus(date, task_id, project_id, timeEntries);

    if (status) {
      return (
        <Box
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          {renderStatusBadge({ ...status, status: timesheetStatus })}
        </Box>
      );
    }

    return (
      <Tooltip label="Double click to edit hours" withArrow>
        <Box
          onDoubleClick={() =>
            edit && openEditModal(timesheet, setCurrentEntry, openEntryModal)
          }
          style={{
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <TaskPopover
            short={hours.toString() || '0'}
            full={edit ? comments : "Can't Edit"}
            status={edit ? timesheetStatus : 'Not started'}
            bgColor={[
              organizationConfig.organization_theme.theme.backgroundColor,
              organizationConfig.organization_theme.theme.color,
            ]}
          />
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
              onClick={() =>
                navigateDateRange('previous', dateRange, setDateRange)
              }
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
              minDate={moment().subtract(3, 'month').toDate()}
              maxDate={
                moment().date() >= 26
                  ? moment().add(1, 'month').toDate()
                  : moment().endOf('month').toDate()
              }
              value={dateRange}
              placeholder="Pick date range (max 14 days)"
              allowSingleDateInRange={false}
            />

            <ActionIcon
              variant="outline"
              color={organizationConfig.organization_theme.theme.color}
              radius="xl"
              size="lg"
              onClick={() => navigateDateRange('next', dateRange, setDateRange)}
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
                const tasks = getTasksByProject(
                  project.id,
                  timeEntries,
                  searchQuery
                );
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
                        <TaskPopover
                          short={task.title}
                          full={task.title}
                          bgColor={[
                            organizationConfig.organization_theme.theme
                              .backgroundColor,
                            organizationConfig.organization_theme.theme.color,
                          ]}
                        />
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
                          {entry
                            ? renderHoursCell(entry, true)
                            : renderHoursCell(
                                {
                                  date: moment(date).format('YYYY-MM-DD'),
                                  isVacation: false,
                                  isHoliday: false,
                                  isWeekOff: false,
                                  project_id: project.id,
                                  task_id: task.id,
                                  hours: 0,
                                  project_name: project.title,
                                  task_name: task.title,
                                  comments: '',
                                  leaveReason: '',
                                  id: '',
                                  status: 'pending',
                                },
                                false
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
                        {getProjectTotalHours(
                          project.id,
                          timeEntries,
                          dateRange,
                          filteredTasksIds
                        )}
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
        <EditTimeEntryModal
          openedEntryModal={openedEntryModal}
          closeEntryModal={closeEntryModal}
          currentEntry={currentEntry}
          setCurrentEntry={setCurrentEntry}
          handleEntrySubmit={handleEntrySubmit}
        />
      )}
      <ApplyLeaveTimesheetModal
        openedLeaveModal={openedLeaveModal}
        closeLeaveModal={closeLeaveModal}
        timeEntries={timeEntries}
        fetchTimesheetData={fetchTimesheetData}
      />

      {changesMade.length > 0 && (
        <ConfirmTimesheetSubmitModal
          changesMade={changesMade}
          setChangesMade={setChangesMade}
          organizationConfig={organizationConfig}
          setTimeEntries={setTimeEntries}
          originalEntries={originalEntries}
        />
      )}
    </ColorDiv>
  );
};

export default DateTableComponent;
