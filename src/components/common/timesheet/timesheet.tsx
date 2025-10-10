import { useCallback, useEffect, useMemo, useState } from 'react';
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
  Container,
  Card,
  Stack,
  Divider
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
  IconCheck,
  IconClock
} from '@tabler/icons-react';
import {
  useDebouncedValue,
  useDisclosure,
  useMediaQuery
} from '@mantine/hooks';
import moment from 'moment-timezone';
import { toast } from 'react-toastify';
import { TaskPopover } from './task-popover';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { themeAtom } from '../../../atoms/theme';
import {
  EmployeeTimesheet,
  TimesheetStatus
} from '../../../interfaces/timesheet';
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
  trackChanges
} from './helper';
import {
  ApplyLeaveTimesheetModal,
  ConfirmTimesheetSubmitModal,
  EditTimeEntryModal
} from './modals';
import { TimeEntriesTable } from './time-entries';
import useHorizontalScroll from '../../../hooks/horizontal-scroll';

const DateTableComponent = () => {
  const [
    openedSubmitModal,
    { open: openSubmitModal, close: closeSubmitModal }
  ] = useDisclosure(false);
  const [openedLeaveModal, { open: openLeaveModal, close: closeLeaveModal }] =
    useDisclosure(false);
  const [openedEntryModal, { open: openEntryModal, close: closeEntryModal }] =
    useDisclosure(false);
  const [openedSearch, { toggle: toggleSearch }] = useDisclosure(false);

  const [dateRange, setDateRange] = useState<DatesRangeValue>(() => {
    const today = moment().tz('Asia/Kolkata');
    const startOfWeek = today.clone().startOf('isoWeek');
    const endOfWeek = today.clone().endOf('isoWeek');
    return [startOfWeek.toDate(), endOfWeek.toDate()];
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeEntries, setTimeEntries] = useState<EmployeeTimesheet[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 1000);
  const [currentEntry, setCurrentEntry] = useState<EmployeeTimesheet>();
  const [originalEntries, setOriginalEntries] = useState<EmployeeTimesheet[]>(
    []
  );
  const [changesMade, setChangesMade] = useState<EmployeeTimesheet[]>([]);

  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');

  // Get the current theme configuration
  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;
    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);

  const {
    scrollRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart
  } = useHorizontalScroll();

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

  const filteredProjects = useMemo(
    () =>
      Array.from(
        new Map(
          timeEntries
            .filter(
              entry =>
                entry.project_name
                  .toLowerCase()
                  .includes(debouncedSearchQuery.toLowerCase()) ||
                entry.task_name
                  .toLowerCase()
                  .includes(debouncedSearchQuery.toLowerCase())
            )
            .map(entry => [
              entry.project_id,
              {
                id: entry.project_id,
                title: entry.project_name,
                taskId: entry.task_id,
                task_name: entry.task_name
              }
            ])
        ).values()
      ),
    [timeEntries, debouncedSearchQuery]
  );

  const filteredTasks = useMemo(
    () =>
      Array.from(
        new Map(
          timeEntries
            .filter(
              entry =>
                entry.project_name
                  .toLowerCase()
                  .includes(debouncedSearchQuery.toLowerCase()) ||
                entry.task_name
                  .toLowerCase()
                  .includes(debouncedSearchQuery.toLowerCase())
            )
            .map(entry => [
              entry.task_id,
              {
                id: entry.project_id,
                title: entry.project_name,
                taskId: entry.task_id,
                task_name: entry.task_name
              }
            ])
        ).values()
      ),
    [timeEntries, debouncedSearchQuery]
  );

  const filteredTasksIds = useMemo(
    () => new Set(filteredTasks.map(p => p.taskId)),
    [filteredTasks]
  );

  const dateRangeArray = useMemo(
    () => getDateRangeArray(...dateRange),
    [dateRange]
  );

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
      status: 'Not Submitted' as TimesheetStatus
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

      return prev;
    });

    trackChanges(newEntry, originalEntries, changesMade, setChangesMade);
    closeEntryModal();
  };

  const renderStatusBadge = ({
    label,
    comment,
    status
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
        comment
      },
      holiday: {
        color: 'orange',
        icon: <IconBeach size={14} />,
        label: 'Holiday',
        comment
      },
      leave: {
        color: 'red',
        icon: <IconCalendarOff size={14} />,
        label: 'Leave',
        comment
      }
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
              currentThemeConfig.backgroundColor,
              currentThemeConfig.color
            ]}
          />
        </Text>
      </Badge>
    );
  };

  const renderHoursCell = (timesheet: EmployeeTimesheet) => {
    const {
      date,
      task_id,
      project_id,
      hours,
      comments,
      status: timesheetStatus
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
            cursor: 'pointer'
          }}
        >
          {renderStatusBadge({ ...status, status: timesheetStatus })}
        </Box>
      );
    }
    const isEditableDate =
      moment(date).isSame(moment(), 'month') ||
      moment(date).isoWeek() === moment().isoWeek();
    return (
      <Tooltip
        label={
          isEditableDate ? 'Double click to edit hours' : 'Editing not allowed'
        }
        withArrow
      >
        <Box
          onDoubleClick={() =>
            isEditableDate &&
            openEditModal(timesheet, setCurrentEntry, openEntryModal)
          }
          style={{
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isEditableDate ? 'pointer' : 'not-allowed'
          }}
        >
          <TaskPopover
            short={hours.toString() || '0'}
            full={isEditableDate ? comments : "Can't Edit"}
            status={isEditableDate ? timesheetStatus : 'Not started'}
            bgColor={[
              currentThemeConfig.backgroundColor,
              currentThemeConfig.color
            ]}
          />
        </Box>
      </Tooltip>
    );
  };

  return (
    <Container size="xl" py="md" my="xl" px={isSmallMobile ? 'xs' : 'md'}>
      <Stack gap="md">
        {/* Header Card */}
        <Card shadow="sm" p={isMobile ? 'md' : 'lg'} radius="md" withBorder>
          <Stack gap="md">
            <Group justify="space-between" align="center">
              <Group gap="xs">
                <IconClock size={28} />
                <Title order={isMobile ? 4 : 2} fw={700}>
                  Timesheet
                </Title>
              </Group>
              {changesMade.length > 0 && (
                <Badge size="lg" variant="filled" color="green">
                  {changesMade.length} pending change
                  {changesMade.length !== 1 ? 's' : ''}
                </Badge>
              )}
            </Group>

            <Divider />

            {/* Date Controls */}
            <Grid gutter="md">
              <Grid.Col span={{ base: 12, md: 7 }}>
                <Group wrap="nowrap">
                  <ActionIcon
                    variant="outline"
                    radius="xl"
                    size={isMobile ? 'md' : 'lg'}
                    onClick={() =>
                      navigateDateRange('previous', dateRange, setDateRange)
                    }
                  >
                    <IconChevronLeft size={isMobile ? 16 : 18} />
                  </ActionIcon>

                  <DatePickerInput
                    type="range"
                    onChange={value => setDateRange(value)}
                    leftSection={<IconCalendar size={16} />}
                    size={isMobile ? 'xs' : 'sm'}
                    minDate={moment().subtract(3, 'month').toDate()}
                    maxDate={
                      moment().date() >= 26
                        ? moment().add(1, 'month').toDate()
                        : moment().endOf('month').toDate()
                    }
                    value={dateRange}
                    placeholder="Pick date range"
                    allowSingleDateInRange={false}
                    style={{ flex: 1 }}
                  />

                  <ActionIcon
                    variant="outline"
                    radius="xl"
                    size={isMobile ? 'md' : 'lg'}
                    onClick={() =>
                      navigateDateRange('next', dateRange, setDateRange)
                    }
                  >
                    <IconChevronRight size={isMobile ? 16 : 18} />
                  </ActionIcon>
                </Group>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 5 }}>
                <Group
                  justify={isMobile ? 'stretch' : 'flex-end'}
                  gap="xs"
                  grow={isMobile}
                >
                  <Button
                    onClick={toggleSearch}
                    variant="outline"
                    color="gray"
                    radius="md"
                    size={isMobile ? 'sm' : 'sm'}
                    leftSection={
                      openedSearch ? (
                        <IconX size={16} />
                      ) : (
                        <IconSearch size={16} />
                      )
                    }
                    fullWidth={isMobile}
                  >
                    {openedSearch ? 'Close' : 'Search'}
                  </Button>

                  <Button
                    onClick={openLeaveModal}
                    color="green"
                    radius="md"
                    size={isMobile ? 'sm' : 'sm'}
                    leftSection={<IconCalendarOff size={16} />}
                    fullWidth={isMobile}
                  >
                    Apply Leave
                  </Button>
                </Group>
              </Grid.Col>
            </Grid>

            {/* Search Collapse */}
            <Collapse in={openedSearch}>
              <TextInput
                placeholder="Search projects or tasks..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.currentTarget.value)}
                leftSection={<IconSearch size={16} />}
                rightSection={
                  searchQuery && (
                    <ActionIcon
                      onClick={() => setSearchQuery('')}
                      variant="subtle"
                    >
                      <IconX size={16} />
                    </ActionIcon>
                  )
                }
                size={isMobile ? 'sm' : 'md'}
              />
            </Collapse>

            {/* Submit Changes Button */}
            {changesMade.length > 0 && (
              <>
                <Divider />
                <Group justify="flex-end">
                  <Button
                    leftSection={<IconCheck size={16} />}
                    color="green"
                    onClick={openSubmitModal}
                    size={isMobile ? 'sm' : 'md'}
                    fullWidth={isMobile}
                  >
                    Submit {changesMade.length} Change
                    {changesMade.length !== 1 ? 's' : ''}
                  </Button>
                </Group>
              </>
            )}
          </Stack>
        </Card>

        {/* Timesheet Table Card */}
        <Card shadow="sm" p={0} radius="md" withBorder>
          {isLoading ? (
            <Center p="xl">
              <Stack align="center" gap="md">
                <Loader size="xl" />
                <Text>Loading timesheet data...</Text>
              </Stack>
            </Center>
          ) : filteredProjects.length === 0 ? (
            <Card p="xl">
              <Stack align="center" gap="md">
                <IconClock size={48} opacity={0.5} />
                <Text size="lg" ta="center">
                  No timesheet entries found
                </Text>
                <Text size="sm" ta="center" c="dimmed">
                  {searchQuery
                    ? 'Try adjusting your search filters'
                    : 'Start by logging your hours for the selected date range'}
                </Text>
              </Stack>
            </Card>
          ) : (
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                overflowX: 'auto',
                cursor: 'grab'
              }}
            >
              <Table withTableBorder withColumnBorders stickyHeader>
                <Table.Thead
                  style={{
                    backgroundColor: currentThemeConfig.backgroundColor,
                    color: currentThemeConfig.color
                  }}
                >
                  <Table.Tr>
                    <Table.Th
                      className="p-2 border"
                      style={{ minWidth: '150px' }}
                    >
                      <Text size="sm" fw={600}>
                        Project
                      </Text>
                    </Table.Th>
                    <Table.Th
                      className="p-2 border"
                      style={{ minWidth: '150px' }}
                    >
                      <Text size="sm" fw={600}>
                        Task
                      </Text>
                    </Table.Th>
                    {dateRangeArray.map(date => (
                      <Table.Th
                        key={date}
                        className="p-2 border"
                        style={{ minWidth: '80px', textAlign: 'center' }}
                      >
                        <Text size="xs" fw={500}>
                          {formatDisplayDate(date)}
                        </Text>
                      </Table.Th>
                    ))}
                    <Table.Th
                      className="p-2 border"
                      style={{ minWidth: '80px', textAlign: 'center' }}
                    >
                      <Text size="sm" fw={600}>
                        Total
                      </Text>
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filteredProjects.map(project => {
                    const tasks = getTasksByProject(
                      project.id,
                      timeEntries,
                      debouncedSearchQuery
                    );
                    if (tasks.length === 0) return null;

                    return tasks.map((task, taskIndex) => (
                      <Table.Tr key={`${project.id}-${task.id}`}>
                        {taskIndex === 0 && (
                          <Table.Td
                            className="p-2 border"
                            rowSpan={tasks.length}
                            style={{ verticalAlign: 'middle' }}
                          >
                            <Center>
                              <Text fw={500} size="sm" lineClamp={2}>
                                {project.title}
                              </Text>
                            </Center>
                          </Table.Td>
                        )}
                        <Table.Td className="p-2 border">
                          <Center>
                            <TaskPopover
                              short={task.title}
                              full={task.title}
                              bgColor={[
                                currentThemeConfig.backgroundColor,
                                currentThemeConfig.color
                              ]}
                            />
                          </Center>
                        </Table.Td>
                        {getDateRangeArray(...dateRange).map(date => {
                          const entry = timeEntries.find(
                            e =>
                              e.project_id === project.id &&
                              e.task_id === task.id &&
                              e.date === moment(date).format('YYYY-MM-DD')
                          );
                          return (
                            <Table.Td
                              className="p-2 border"
                              key={`${project.id}-${task.id}-${date}`}
                            >
                              {entry
                                ? renderHoursCell(entry)
                                : renderHoursCell({
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
                                    status: 'Not Submitted' as TimesheetStatus
                                  })}
                            </Table.Td>
                          );
                        })}
                        {taskIndex === 0 && (
                          <Table.Td
                            className="p-2 border"
                            rowSpan={tasks.length}
                            style={{
                              textAlign: 'center',
                              verticalAlign: 'middle'
                            }}
                          >
                            <Text fw={600} size="sm">
                              {getProjectTotalHours(
                                project.id,
                                timeEntries,
                                dateRange,
                                filteredTasksIds
                              )}
                            </Text>
                          </Table.Td>
                        )}
                      </Table.Tr>
                    ));
                  })}
                </Table.Tbody>
              </Table>
            </div>
          )}
        </Card>

        {/* Time Entries Summary */}
        <TimeEntriesTable
          organizationConfig={organizationConfig}
          pendingChanges={changesMade.length}
          changesMade={timeEntries.filter(time => time.hours > 0)}
        />
      </Stack>

      {/* Modals */}
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
          openedSubmitModal={openedSubmitModal}
          closeSubmitModal={closeSubmitModal}
          changesMade={changesMade}
          setChangesMade={setChangesMade}
        />
      )}
    </Container>
  );
};

export default DateTableComponent;
