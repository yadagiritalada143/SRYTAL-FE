import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Container,
  Stack,
  Card,
  Flex,
  Text,
  Button,
  Group,
  Badge,
  Modal,
  Select,
  Checkbox,
  ActionIcon,
  Tooltip,
  Table,
  Center,
  Loader,
  TextInput,
  Pagination
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
  IconMail,
  IconSortAscending,
  IconSortDescending,
  IconCalendar,
  IconFilter
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
import { themeAtom } from '../../../../atoms/theme';
import { toast } from 'react-toastify';
import { useCustomToast } from '../../../../utils/common/toast';

// Constants
const ITEMS_PER_PAGE_OPTIONS = ['10', '20', '50', '100'];
const DEFAULT_ITEMS_PER_PAGE = 20;

// Custom hook for timesheet filtering and sorting
const useTimesheetFilters = (timesheets: EmployeeTimesheet[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 300);
  const [selectedStatus, setSelectedStatus] = useState<TimesheetStatus | null>(
    TimesheetStatus.WaitingForApproval
  );
  const [dateRange, setDateRange] = useState<DatesRangeValue>([
    moment().startOf('month').toDate(),
    moment().endOf('month').toDate()
  ]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedTimesheets = useMemo(() => {
    let result = [...timesheets];

    // Apply status filter
    if (selectedStatus) {
      result = result.filter(ts => ts.status === selectedStatus);
    }

    // Apply date range filter
    if (dateRange[0] && dateRange[1]) {
      result = result.filter(ts => {
        const date = moment(ts.date);
        return (
          date.isSameOrAfter(dateRange[0]) && date.isSameOrBefore(dateRange[1])
        );
      });
    }

    // Apply search filter
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      result = result.filter(
        ts =>
          ts.project_name.toLowerCase().includes(query) ||
          ts.task_name.toLowerCase().includes(query) ||
          ts.comments?.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return result;
  }, [timesheets, selectedStatus, dateRange, debouncedSearchQuery, sortOrder]);

  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedStatus(null);
    setSearchQuery('');
    setDateRange([
      moment().startOf('month').toDate(),
      moment().endOf('month').toDate()
    ]);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    dateRange,
    setDateRange,
    sortOrder,
    toggleSortOrder,
    resetFilters,
    filteredTimesheets: filteredAndSortedTimesheets
  };
};

// Status Badge Component
const StatusBadge: React.FC<{ status: TimesheetStatus }> = ({ status }) => {
  switch (status) {
    case TimesheetStatus.Approved:
      return <Badge color="green">Approved</Badge>;
    case TimesheetStatus.Rejected:
      return <Badge color="red">Rejected</Badge>;
    default:
      return <Badge color="yellow">Pending</Badge>;
  }
};

// Timesheet Actions Component
const TimesheetActions: React.FC<{
  timesheet: EmployeeTimesheet;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}> = ({ timesheet, onApprove, onReject }) => {
  const isPending = timesheet.status === TimesheetStatus.WaitingForApproval;

  return (
    <Group gap="xs" justify="center">
      <Tooltip label="Approve timesheet">
        <Button
          size="xs"
          variant="light"
          color="green"
          onClick={() => onApprove(timesheet.id)}
          disabled={!isPending}
          leftSection={<IconCircleCheck size={14} />}
        >
          Approve
        </Button>
      </Tooltip>
      <Tooltip label="Reject timesheet">
        <Button
          size="xs"
          variant="light"
          color="red"
          onClick={() => onReject(timesheet.id)}
          disabled={!isPending}
          leftSection={<IconCircleX size={14} />}
        >
          Reject
        </Button>
      </Tooltip>
    </Group>
  );
};

// Table Header Component
const TableHeader: React.FC<{
  sortOrder: 'asc' | 'desc';
  onSort: () => void;
  themeConfig: any;
  isAllSelected: boolean;
  onToggleAll: (checked: boolean) => void;
}> = ({ sortOrder, onSort, themeConfig, isAllSelected, onToggleAll }) => {
  return (
    <Table.Thead
      style={{
        backgroundColor: themeConfig.backgroundColor,
        color: themeConfig.color
      }}
    >
      <Table.Tr>
        <Table.Th className="p-3 border text-center">
          <Checkbox
            checked={isAllSelected}
            onChange={e => onToggleAll(e.currentTarget.checked)}
          />
        </Table.Th>
        <Table.Th className="p-3 border text-center">
          <Text size="sm" fw={500}>
            S.No
          </Text>
        </Table.Th>
        <Table.Th
          className="border cursor-pointer select-none hover:bg-opacity-80 transition-colors"
          onClick={onSort}
        >
          <Group justify="center">
            <Text size="sm" fw={500}>
              Date
            </Text>
            {sortOrder === 'asc' ? (
              <IconSortAscending size={14} />
            ) : (
              <IconSortDescending size={14} />
            )}
          </Group>
        </Table.Th>
        <Table.Th className="p-3 border text-center">
          <Text size="sm" fw={500}>
            Project
          </Text>
        </Table.Th>
        <Table.Th className="p-3 border text-center">
          <Text size="sm" fw={500}>
            Task
          </Text>
        </Table.Th>
        <Table.Th className="p-3 border text-center">
          <Text size="sm" fw={500}>
            Hours
          </Text>
        </Table.Th>
        <Table.Th className="p-3 border text-center">
          <Text size="sm" fw={500}>
            Status
          </Text>
        </Table.Th>
        <Table.Th className="p-3 border text-center">
          <Text size="sm" fw={500}>
            Actions
          </Text>
        </Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
};

export const EmployeeTimesheetAdminView = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const isDarkTheme = useRecoilValue(themeAtom);
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const { showSuccessToast } = useCustomToast();
  const [employeeDetails, setEmployeeDetails] =
    useRecoilState(employeeDetailsAtom);

  const [timesheets, setTimesheets] = useState<EmployeeTimesheet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimesheets, setSelectedTimesheets] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState<TimesheetStatus>(
    TimesheetStatus.Approved
  );
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  const [opened, { open, close }] = useDisclosure(false);

  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;
    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);

  const {
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    dateRange,
    setDateRange,
    sortOrder,
    toggleSortOrder,
    resetFilters,
    filteredTimesheets
  } = useTimesheetFilters(timesheets);

  // Pagination logic
  const { paginatedTimesheets, totalPages } = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginated = filteredTimesheets.slice(start, end);
    const pages = Math.ceil(filteredTimesheets.length / itemsPerPage);

    return { paginatedTimesheets: paginated, totalPages: pages };
  }, [filteredTimesheets, activePage, itemsPerPage]);

  // Fetch employee details
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      if (!employeeId) return;

      try {
        const response = await getEmployeeDetailsByAdmin(employeeId);
        setEmployeeDetails(response);
      } catch (error: any) {
        console.error('Error fetching employee details:', error);
        toast.error('Failed to load employee details');
      }
    };

    fetchEmployeeDetails();
  }, [employeeId, setEmployeeDetails]);

  // Fetch timesheet data
  useEffect(() => {
    const fetchData = async () => {
      if (!employeeId || !dateRange[0] || !dateRange[1]) return;

      setIsLoading(true);
      setError(null);
      try {
        const responseData = await getTimesheetData(
          dateRange[0],
          dateRange[1],
          employeeId
        );

        const formattedTimesheet = formatData(responseData);
        setTimesheets(formattedTimesheet.filter(ts => ts.hours > 0));
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || 'Failed to load timesheets';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dateRange, employeeId]);

  // Reset page when filters change
  useEffect(() => {
    setActivePage(1);
  }, [searchQuery, selectedStatus, dateRange, itemsPerPage]);

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
        showSuccessToast(
          `Successfully ${status === TimesheetStatus.Approved ? 'approved' : 'rejected'} ${timesheetIds.length} timesheet(s)`
        );
        close();
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || 'Failed to update timesheet status';
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [timesheets, employeeId, close, showSuccessToast]
  );

  const toggleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectedTimesheets(
        checked ? paginatedTimesheets.map(ts => ts.id) : []
      );
    },
    [paginatedTimesheets]
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
      paginatedTimesheets.length > 0 &&
      paginatedTimesheets.every(ts => selectedTimesheets.includes(ts.id)),
    [paginatedTimesheets, selectedTimesheets]
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

  if (error) {
    return (
      <Container size="lg" py="xl">
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Text ta="center" size="lg">
            {error}
          </Text>
          <Center mt="md">
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </Center>
        </Card>
      </Container>
    );
  }

  return (
    <Container size="xl" py="md" my="xl">
      <Stack gap="md">
        {/* Header with Employee Info */}
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Stack gap="md">
            <Flex justify="space-between" align="center" wrap="wrap" gap="md">
              <Text size="xl" fw={700}>
                Timesheet Management ({filteredTimesheets.length} entries)
              </Text>
              <BackButton id={employeeId ?? ''} />
            </Flex>

            <Group wrap="wrap" gap="md">
              <Group gap="xs">
                <IconId size={18} color={currentThemeConfig.primaryColor} />
                <Text fw={500}>Employee ID:</Text>
                <Text>{employeeDetails?.employeeId || 'N/A'}</Text>
              </Group>
              <Group gap="xs">
                <IconUser size={18} color={currentThemeConfig.primaryColor} />
                <Text fw={500}>Name:</Text>
                <Text>
                  {employeeDetails?.firstName} {employeeDetails?.lastName}
                </Text>
              </Group>
              <Group gap="xs">
                <IconMail size={18} color={currentThemeConfig.primaryColor} />
                <Text fw={500}>Email:</Text>
                <Text>{employeeDetails?.email}</Text>
              </Group>
            </Group>
          </Stack>
        </Card>

        {/* Filters */}
        <Card shadow="sm" p="md" radius="md" withBorder>
          <Stack gap="md">
            <Group grow>
              <Select
                label="Status"
                placeholder="Filter by status"
                data={statusOptions}
                value={selectedStatus}
                onChange={value =>
                  setSelectedStatus(value as TimesheetStatus | null)
                }
                clearable
                leftSection={<IconFilter size={16} />}
                radius="md"
              />
              <DatePickerInput
                type="range"
                label="Date Range"
                placeholder="Select date range"
                value={dateRange}
                onChange={setDateRange}
                leftSection={<IconCalendar size={16} />}
                radius="md"
              />
              <TextInput
                label="Search"
                placeholder="Search by project, task..."
                leftSection={<IconSearch size={16} />}
                value={searchQuery}
                onChange={e => setSearchQuery(e.currentTarget.value)}
                radius="md"
              />
            </Group>

            <Group justify="space-between">
              <Group gap="xs">
                <Text size="sm">Items per page:</Text>
                <Select
                  data={ITEMS_PER_PAGE_OPTIONS}
                  value={itemsPerPage.toString()}
                  onChange={value =>
                    setItemsPerPage(Number(value) || DEFAULT_ITEMS_PER_PAGE)
                  }
                  w={80}
                  size="sm"
                />
              </Group>

              <Group gap="sm">
                {filteredTimesheets.length !== timesheets.length && (
                  <Badge variant="light" color="blue">
                    {filteredTimesheets.length} of {timesheets.length}{' '}
                    timesheets
                  </Badge>
                )}
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  leftSection={<IconX size={16} />}
                  size="sm"
                >
                  Clear Filters
                </Button>
              </Group>
            </Group>
          </Stack>
        </Card>

        {/* Bulk Actions */}
        {selectedTimesheets.length > 0 && (
          <Card shadow="sm" p="md" radius="md" withBorder>
            <Group justify="space-between" wrap="wrap">
              <Text fw={500}>
                <Badge variant="filled" color="blue" mr="sm">
                  {selectedTimesheets.length}
                </Badge>
                timesheet(s) selected
              </Text>

              <Group gap="sm">
                <Select
                  placeholder="Select action"
                  data={actionOptions}
                  value={bulkStatus}
                  onChange={value => setBulkStatus(value as TimesheetStatus)}
                  w={180}
                  leftSection={
                    bulkStatus === TimesheetStatus.Approved ? (
                      <IconCircleCheck size={16} />
                    ) : (
                      <IconCircleX size={16} />
                    )
                  }
                />

                <Button
                  color={
                    bulkStatus === TimesheetStatus.Approved ? 'green' : 'red'
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
                  onClick={() => setSelectedTimesheets([])}
                  aria-label="Clear selection"
                >
                  <IconX size={18} />
                </ActionIcon>
              </Group>
            </Group>
          </Card>
        )}

        {/* Table */}
        <Card shadow="sm" p={0} radius="md" withBorder>
          {isLoading ? (
            <Center p="xl">
              <Stack align="center" gap="md">
                <Loader size="xl" />
                <Text>Loading timesheets...</Text>
              </Stack>
            </Center>
          ) : (
            <Table stickyHeader withTableBorder withColumnBorders>
              <TableHeader
                sortOrder={sortOrder}
                onSort={toggleSortOrder}
                themeConfig={currentThemeConfig}
                isAllSelected={isAllSelected}
                onToggleAll={toggleSelectAll}
              />
              <Table.Tbody>
                {paginatedTimesheets.length > 0 ? (
                  paginatedTimesheets.map((timesheet, index) => (
                    <Table.Tr key={timesheet.id} className="transition-colors">
                      <Table.Td className="text-center p-3">
                        <Checkbox
                          checked={selectedTimesheets.includes(timesheet.id)}
                          onChange={() => toggleSingleSelection(timesheet.id)}
                        />
                      </Table.Td>
                      <Table.Td className="text-center p-3">
                        <Text size="sm">
                          {index + 1 + (activePage - 1) * itemsPerPage}
                        </Text>
                      </Table.Td>
                      <Table.Td className="p-3 text-center">
                        <Text size="sm">
                          {moment(timesheet.date).format('MMM D, YYYY')}
                        </Text>
                      </Table.Td>
                      <Table.Td className="p-3">
                        <Text size="sm">{timesheet.project_name}</Text>
                      </Table.Td>
                      <Table.Td className="p-3">
                        <Text size="sm">{timesheet.task_name}</Text>
                      </Table.Td>
                      <Table.Td className="p-3 text-center">
                        <Badge size="sm">{timesheet.hours}h</Badge>
                      </Table.Td>
                      <Table.Td className="p-3 text-center">
                        <StatusBadge status={timesheet.status} />
                      </Table.Td>
                      <Table.Td className="p-3">
                        <TimesheetActions
                          timesheet={timesheet}
                          onApprove={id =>
                            handleStatusChange([id], TimesheetStatus.Approved)
                          }
                          onReject={id =>
                            handleStatusChange([id], TimesheetStatus.Rejected)
                          }
                        />
                      </Table.Td>
                    </Table.Tr>
                  ))
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={8} className="text-center p-8">
                      <Stack align="center" gap="md">
                        <Text size="lg">No timesheets found</Text>
                        <Text size="sm">
                          {searchQuery ||
                          selectedStatus ||
                          (dateRange[0] && dateRange[1])
                            ? 'Try adjusting your filters'
                            : 'No timesheet entries available'}
                        </Text>
                      </Stack>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          )}
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <Center>
            <Pagination
              value={activePage}
              onChange={setActivePage}
              total={totalPages}
              size="sm"
              radius="md"
              withEdges
            />
          </Center>
        )}
      </Stack>

      {/* Confirmation Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title="Confirm Status Update"
        size="md"
        centered
      >
        <Stack gap="md">
          <Text>
            Are you sure you want to{' '}
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
              {bulkStatus === TimesheetStatus.Approved
                ? 'Approval'
                : 'Rejection'}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};
