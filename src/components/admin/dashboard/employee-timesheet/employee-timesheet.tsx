import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box,
  Select,
  Text,
  Button,
  Group,
  Badge,
  Modal,
  TextInput,
  Checkbox,
  ActionIcon,
  Paper,
  Divider
} from '@mantine/core';
import { DatePickerInput, DatesRangeValue } from '@mantine/dates';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import {
  IconSearch,
  IconX,
  IconCircleCheck,
  IconCircleX,
  IconId,
  IconUser,
  IconMail
} from '@tabler/icons-react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import {
  EmployeeTimesheet,
  TimesheetStatus
} from '../../../../interfaces/timesheet';
import {
  formatData,
  prepareSubmitData
} from '../../../common/timesheet/helper';
import {
  getTimesheetData,
  submitTimeSheet
} from '../../../../services/common-services';
import { employeeDetailsAtom } from '../../../../atoms/employee-atom';
import { getEmployeeDetailsByAdmin } from '../../../../services/admin-services';
import { BackButton } from '../../../common/style-components/buttons';
import { Loader } from '@mantine/core';

export const EmployeeTimesheetAdminView = () => {
  const [dateSortOrder, setDateSortOrder] = useState<'asc' | 'desc'>('asc');
  const { employeeId } = useParams<{ employeeId: string }>();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const theme = organizationConfig.organization_theme.theme;
  const [timesheets, setTimesheets] = useState<EmployeeTimesheet[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<TimesheetStatus | null>(
    TimesheetStatus.WaitingForApproval
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 500);
  const [dateRange, setDateRange] = useState<DatesRangeValue>([
    moment().startOf('month').toDate(),
    moment().endOf('month').toDate()
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimesheets, setSelectedTimesheets] = useState<string[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [bulkStatus, setBulkStatus] = useState<TimesheetStatus>(
    TimesheetStatus.Approved
  );
  const [employeeDetails, setEmployeeDetails] =
    useRecoilState(employeeDetailsAtom);

  const handleDateSort = () => {
    setDateSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  // Fetch employee details
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      if (!employeeId) return;

      try {
        const response = await getEmployeeDetailsByAdmin(employeeId);
        setEmployeeDetails(response);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployeeDetails();
  }, [employeeId, setEmployeeDetails]);

  // Fetch timesheet data
  useEffect(() => {
    const fetchData = async () => {
      if (!employeeId || !dateRange[0] || !dateRange[1]) return;

      setIsLoading(true);
      try {
        const responseData = await getTimesheetData(
          dateRange[0],
          dateRange[1],
          employeeId
        );
        const formattedTimesheet = formatData(responseData);
        setTimesheets(formattedTimesheet.filter(ts => ts.hours > 0));
      } catch (error) {
        console.error('Error fetching timesheets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dateRange, employeeId]);

  // Filter timesheets
  const filteredTimesheets = useMemo(() => {
    let result = [...timesheets];

    if (selectedStatus) {
      result = result.filter(ts => ts.status === selectedStatus);
    }

    if (dateRange[0] && dateRange[1]) {
      result = result.filter(ts => {
        const date = moment(ts.date);
        return (
          date.isSameOrAfter(dateRange[0]) && date.isSameOrBefore(dateRange[1])
        );
      });
    }

    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      result = result.filter(
        ts =>
          ts.project_name.toLowerCase().includes(query) ||
          ts.task_name.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateSortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return result;
  }, [
    timesheets,
    selectedStatus,
    dateRange,
    debouncedSearchQuery,
    dateSortOrder
  ]);

  const handleStatusChange = useCallback(
    async (timesheetIds: string[], status: TimesheetStatus) => {
      if (!employeeId) return;

      setIsLoading(true);
      try {
        const submitData = prepareSubmitData(
          timesheets
            .filter(timesheet => timesheetIds.includes(timesheet.id))
            .map(timesheet => ({
              ...timesheet,
              status: status
            })),
          status
        );

        await submitTimeSheet(submitData, employeeId);
        setTimesheets(prev =>
          prev.map(ts =>
            timesheetIds.includes(ts.id) ? { ...ts, status } : ts
          )
        );
        setSelectedTimesheets([]);
        close();
      } catch (error) {
        console.error('Error updating status:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [timesheets, employeeId, close]
  );

  const getStatusBadge = useCallback((status: TimesheetStatus) => {
    switch (status) {
      case TimesheetStatus.Approved:
        return <Badge color="green">Approved</Badge>;
      case TimesheetStatus.Rejected:
        return <Badge color="red">Rejected</Badge>;
      default:
        return <Badge color="yellow">Pending</Badge>;
    }
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedStatus(null);
    setSearchQuery('');
    setDateRange([
      moment().startOf('month').toDate(),
      moment().endOf('month').toDate()
    ]);
    setSelectedTimesheets([]);
  }, []);

  const toggleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectedTimesheets(checked ? filteredTimesheets.map(ts => ts.id) : []);
    },
    [filteredTimesheets]
  );

  const toggleSingleSelection = useCallback((timesheetId: string) => {
    setSelectedTimesheets(prev =>
      prev.includes(timesheetId)
        ? prev.filter(id => id !== timesheetId)
        : [...prev, timesheetId]
    );
  }, []);

  const isAllSelected = useMemo(
    () =>
      filteredTimesheets.length > 0 &&
      selectedTimesheets.length === filteredTimesheets.length,
    [filteredTimesheets.length, selectedTimesheets.length]
  );

  const statusOptions = useMemo(
    () => [
      { value: TimesheetStatus.WaitingForApproval, label: 'Pending' },
      { value: TimesheetStatus.Approved, label: 'Approved' },
      { value: TimesheetStatus.Rejected, label: 'Rejected' }
    ],
    []
  );

  const actionOptions = useMemo(
    () => [
      { value: TimesheetStatus.Approved, label: 'Approve Selected' },
      { value: TimesheetStatus.Rejected, label: 'Reject Selected' }
    ],
    []
  );
  return (
    <div style={{ color: theme.button.textColor }}>
      <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold underline text-center px-2 py-5">
        Timesheet Management
      </h1>

      <Paper
        p="md"
        mb="xl"
        shadow="sm"
        style={{
          backgroundColor: theme.backgroundColor,
          borderLeft: `4px solid ${theme.primaryColor}`
        }}
      >
        <Group
          wrap="wrap"
          gap="md"
          justify="space-between"
          align="center"
          c={theme.button.color}
        >
          <Group gap="xs">
            <IconId size={18} color={theme.primaryColor} />
            <Text fw={500}>Employee ID:</Text>
            <Text>{employeeDetails?.employeeId}</Text>
          </Group>
          <Group gap="xs">
            <IconUser size={18} color={theme.primaryColor} />
            <Text fw={500}>Name:</Text>
            <Text>
              {employeeDetails?.firstName} {employeeDetails?.lastName}
            </Text>
          </Group>
          <Group gap="xs">
            <IconMail size={18} color={theme.primaryColor} />
            <Text fw={500}>Email:</Text>
            <Text>{employeeDetails?.email}</Text>
          </Group>
          <div className="w-full sm:w-auto flex justify-center sm:justify-end">
            <BackButton id={employeeId ?? ''} />
          </div>
        </Group>

        <Divider my="md" />

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-3 w-full">
          <Select
            label="Status"
            c={theme.button.color}
            placeholder="Filter by status"
            data={statusOptions}
            value={selectedStatus}
            onChange={value =>
              setSelectedStatus(value as TimesheetStatus | null)
            }
            clearable
            className="w-full md:flex-1"
          />

          <DatePickerInput
            type="range"
            label="Date Range"
            c={theme.button.color}
            placeholder="Select date range"
            value={dateRange}
            onChange={setDateRange}
            className="w-full md:flex-1"
          />

          <TextInput
            label="Search"
            c={theme.button.color}
            placeholder="Search by project, task or comments"
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={e => setSearchQuery(e.currentTarget.value)}
            className="w-full md:flex-1"
          />

          <Button
            variant="outline"
            onClick={resetFilters}
            leftSection={<IconX size={16} />}
            className="w-full md:flex-1 self-end md:self-auto"
          >
            Clear Filters
          </Button>
        </div>
      </Paper>

      {selectedTimesheets.length > 0 && (
        <Paper
          mb="md"
          p="md"
          withBorder
          shadow="sm"
          style={{
            borderRadius: '8px',
            backgroundColor: theme.backgroundColor,
            borderLeft: `4px solid ${
              bulkStatus === TimesheetStatus.Approved
                ? theme.primaryColor
                : theme.primaryColor
            }`,
            color: theme.button.color
          }}
        >
          <Group
            justify="space-between"
            wrap="wrap"
            gap="sm"
            style={{ flexDirection: 'row', rowGap: '0.5rem' }}
          >
            <Text fw={500}>
              <Badge variant="filled" color="blue" mr="sm">
                {selectedTimesheets.length}
              </Badge>
              timesheet(s) selected
            </Text>

            <Group wrap="wrap" gap="sm">
              <Select
                placeholder="Select action"
                data={actionOptions}
                value={bulkStatus}
                onChange={value => setBulkStatus(value as TimesheetStatus)}
                style={{ width: '180px', minWidth: '150px' }}
                leftSection={
                  bulkStatus === TimesheetStatus.Approved ? (
                    <IconCircleCheck
                      size={16}
                      color="var(--mantine-color-green-6)"
                    />
                  ) : (
                    <IconCircleX size={16} color="var(--mantine-color-red-6)" />
                  )
                }
              />

              <Button
                variant="filled"
                color={
                  bulkStatus === TimesheetStatus.Approved ? 'green.6' : 'red.6'
                }
                leftSection={
                  bulkStatus === TimesheetStatus.Approved ? (
                    <IconCircleCheck size={18} />
                  ) : (
                    <IconCircleX size={18} />
                  )
                }
                onClick={open}
              >
                Apply
              </Button>

              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => setSelectedTimesheets([])}
                aria-label="Clear selection"
              >
                <IconX size={18} />
              </ActionIcon>
            </Group>
          </Group>
        </Paper>
      )}

      <Box pos="relative">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loader size="xl" color={theme.primaryColor} />
          </div>
        ) : filteredTimesheets.length === 0 ? (
          <Text ta="center" my="xl">
            No timesheets found matching your criteria
          </Text>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[700px] text-center shadow-md border">
              <thead
                className="text-xs"
                style={{
                  backgroundColor: theme.backgroundColor,
                  color: theme.button.textColor
                }}
              >
                <tr>
                  <th className="p-2 border text-center align-middle">
                    <div className="flex justify-center items-center">
                      <Checkbox
                        checked={isAllSelected}
                        indeterminate={
                          selectedTimesheets.length > 0 && !isAllSelected
                        }
                        onChange={e => toggleSelectAll(e.currentTarget.checked)}
                      />
                    </div>
                  </th>
                  <th
                    className="p-2 border cursor-pointer select-none text-center align-middle"
                    onClick={handleDateSort}
                  >
                    <div className="flex justify-center items-center gap-1">
                      <span style={{ color: theme.button.color }}>Date</span>
                      <span className="text-xsm text-white">
                        {dateSortOrder === 'asc' ? '▲' : '▼'}
                      </span>
                    </div>
                  </th>
                  <th
                    style={{ color: theme.button.color }}
                    className="p-2 border"
                  >
                    Project
                  </th>
                  <th
                    style={{ color: theme.button.color }}
                    className="p-2 border"
                  >
                    Task
                  </th>
                  <th
                    style={{ color: theme.button.color }}
                    className="p-2 border"
                  >
                    Hours
                  </th>
                  <th
                    style={{ color: theme.button.color }}
                    className="p-2 border"
                  >
                    Status
                  </th>
                  <th
                    style={{ color: theme.button.color }}
                    className="p-2 border"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredTimesheets.map(timesheet => (
                  <tr key={timesheet.id}>
                    <td className="p-2 border text-center align-middle">
                      <div className="flex justify-center items-center">
                        <Checkbox
                          checked={selectedTimesheets.includes(timesheet.id)}
                          onChange={() => toggleSingleSelection(timesheet.id)}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      {moment(timesheet.date).format('MMM D, YYYY')}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      {timesheet.project_name}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      {timesheet.task_name}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      {timesheet.hours}
                    </td>
                    <td className="px-4 py-2 border">
                      {getStatusBadge(timesheet.status)}
                    </td>
                    <td className="p-2 border text-center align-middle">
                      <div className="flex justify-center items-center gap-2">
                        <Button
                          size="xs"
                          variant="outline"
                          color="green"
                          onClick={() => {
                            setSelectedTimesheets([timesheet.id]);
                            setBulkStatus(TimesheetStatus.Approved);
                            handleStatusChange(
                              [timesheet.id],
                              TimesheetStatus.Approved
                            );
                          }}
                          disabled={
                            timesheet.status !==
                            TimesheetStatus.WaitingForApproval
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          size="xs"
                          variant="outline"
                          color="red"
                          onClick={() => {
                            setSelectedTimesheets([timesheet.id]);
                            setBulkStatus(TimesheetStatus.Rejected);
                            handleStatusChange(
                              [timesheet.id],
                              TimesheetStatus.Rejected
                            );
                          }}
                          disabled={
                            timesheet.status !==
                            TimesheetStatus.WaitingForApproval
                          }
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Box>

      <Modal
        opened={opened}
        onClose={close}
        title={`Confirm Status Update`}
        size="md"
        centered
      >
        <Text mb="md">
          Are you sure you want to
          {bulkStatus === TimesheetStatus.Approved ? 'approve' : 'reject'}{' '}
          {selectedTimesheets.length} timesheet(s)?
        </Text>
        <Group justify="flex-end">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button
            color={bulkStatus === TimesheetStatus.Approved ? 'green' : 'red'}
            onClick={() => handleStatusChange(selectedTimesheets, bulkStatus)}
          >
            Confirm{' '}
            {bulkStatus === TimesheetStatus.Approved ? 'Approval' : 'Rejection'}
          </Button>
        </Group>
      </Modal>
    </div>
  );
};
