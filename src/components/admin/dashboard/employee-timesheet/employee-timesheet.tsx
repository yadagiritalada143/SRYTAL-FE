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
  Pagination,
  Collapse,
  Paper,
  Divider,
  Box,
  rem,
  SimpleGrid
} from '@mantine/core';
import { DatePickerInput, DatesRangeValue } from '@mantine/dates';
import {
  useDebouncedValue,
  useDisclosure,
  useMediaQuery
} from '@mantine/hooks';
import {
  IconSearch,
  IconX,
  IconCircleCheck,
  IconCircleX,
  IconUser,
  IconMail,
  IconSortAscending,
  IconSortDescending,
  IconCalendar,
  IconFilter,
  IconChevronDown,
  IconChevronUp,
  IconPhone,
  IconBriefcase
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
import { getEmployeeInfoItems } from '../update-employee/helper-functions/add-package';
import { getThemeConfig } from '../../../../utils/common/theme-utils';

// Constants
const ITEMS_PER_PAGE_OPTIONS = ['10', '20', '50', '100'];
const DEFAULT_ITEMS_PER_PAGE = 20;
const MOBILE_ITEMS_PER_PAGE = 10;

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

    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      result = result.filter(
        ts =>
          ts.project_name.toLowerCase().includes(query) ||
          ts.task_name.toLowerCase().includes(query) ||
          ts.comments?.toLowerCase().includes(query)
      );
    }

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
      return (
        <Badge color="green" size="sm">
          Approved
        </Badge>
      );
    case TimesheetStatus.Rejected:
      return (
        <Badge color="red" size="sm">
          Rejected
        </Badge>
      );
    default:
      return (
        <Badge color="yellow" size="sm">
          Pending
        </Badge>
      );
  }
};

// Mobile Timesheet Card Component
const MobileTimesheetCard: React.FC<{
  timesheet: EmployeeTimesheet;
  index: number;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}> = ({
  timesheet,
  index,
  isSelected,
  onToggleSelect,
  onApprove,
  onReject
}) => {
  const [expanded, setExpanded] = useState(false);
  const isPending = timesheet.status === TimesheetStatus.WaitingForApproval;

  return (
    <Paper
      onClick={() => setExpanded(!expanded)}
      shadow="xs"
      p="sm"
      radius="md"
      withBorder
    >
      <Stack gap="xs">
        <Flex justify="space-between" align="center">
          <Group gap="xs">
            <Checkbox
              checked={isSelected}
              onChange={() => onToggleSelect(timesheet.id)}
            />
            <Text size="sm" fw={600}>
              #{index}
            </Text>
          </Group>
        </Flex>

        <Flex justify="space-between" align="center">
          <Text size="sm" c="dimmed">
            {moment(timesheet.date).format('MMM D, YYYY')}
          </Text>
          <StatusBadge status={timesheet.status} />
        </Flex>

        <Box>
          <Text size="xs" c="dimmed">
            Project
          </Text>
          <Text size="sm" fw={500}>
            {timesheet.project_name}
          </Text>
        </Box>

        <Collapse in={expanded}>
          <Stack gap="xs">
            <Divider />

            <Box>
              <Text size="xs" c="dimmed">
                Task
              </Text>
              <Text size="sm">{timesheet.task_name}</Text>
            </Box>

            <Flex justify="space-between" align="center">
              <Box>
                <Text size="xs" c="dimmed">
                  Hours
                </Text>
                <Badge size="sm" variant="light">
                  {timesheet.hours}h
                </Badge>
              </Box>
            </Flex>

            {timesheet.comments && (
              <Box>
                <Text size="xs" c="dimmed">
                  Comments
                </Text>
                <Text size="sm">{timesheet.comments}</Text>
              </Box>
            )}

            {isPending && (
              <>
                <Divider />
                <Group grow>
                  <Button
                    size="xs"
                    variant="light"
                    color="green"
                    onClick={() => onApprove(timesheet.id)}
                    leftSection={<IconCircleCheck size={14} />}
                  >
                    Approve
                  </Button>
                  <Button
                    size="xs"
                    variant="light"
                    color="red"
                    onClick={() => onReject(timesheet.id)}
                    leftSection={<IconCircleX size={14} />}
                  >
                    Reject
                  </Button>
                </Group>
              </>
            )}
          </Stack>
        </Collapse>
      </Stack>
    </Paper>
  );
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
        <Table.Th style={{ padding: rem(12), textAlign: 'center' }}>
          <Checkbox
            checked={isAllSelected}
            onChange={e => onToggleAll(e.currentTarget.checked)}
          />
        </Table.Th>
        <Table.Th style={{ padding: rem(12), textAlign: 'center' }}>
          <Text size="sm" fw={500}>
            S.No
          </Text>
        </Table.Th>
        <Table.Th
          style={{ cursor: 'pointer', userSelect: 'none' }}
          onClick={onSort}
        >
          <Group justify="center" gap="xs">
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
        <Table.Th style={{ padding: rem(12), textAlign: 'center' }}>
          <Text size="sm" fw={500}>
            Project
          </Text>
        </Table.Th>
        <Table.Th style={{ padding: rem(12), textAlign: 'center' }}>
          <Text size="sm" fw={500}>
            Task
          </Text>
        </Table.Th>
        <Table.Th style={{ padding: rem(12), textAlign: 'center' }}>
          <Text size="sm" fw={500}>
            Hours
          </Text>
        </Table.Th>
        <Table.Th style={{ padding: rem(12), textAlign: 'center' }}>
          <Text size="sm" fw={500}>
            Status
          </Text>
        </Table.Th>
        <Table.Th style={{ padding: rem(12), textAlign: 'center' }}>
          <Text size="sm" fw={500}>
            Actions
          </Text>
        </Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
};

export const EmployeeTimesheetAdminView = () => {
  const params = useParams();
  const employeeId = params.employeeId as string;
  const isDarkTheme = useRecoilValue(themeAtom);
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const { showSuccessToast } = useCustomToast();
  const [employeeDetails, setEmployeeDetails] =
    useRecoilState(employeeDetailsAtom);

  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');

  const [timesheets, setTimesheets] = useState<EmployeeTimesheet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimesheets, setSelectedTimesheets] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState<TimesheetStatus>(
    TimesheetStatus.Approved
  );
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [filtersExpanded, setFiltersExpanded] = useState(!isMobile);

  const [opened, { open, close }] = useDisclosure(false);

  // Adjust items per page for mobile
  useEffect(() => {
    if (isSmallMobile && itemsPerPage > 5) {
      setItemsPerPage(5);
    } else if (isMobile && itemsPerPage > MOBILE_ITEMS_PER_PAGE) {
      setItemsPerPage(MOBILE_ITEMS_PER_PAGE);
    }
  }, [isMobile, isSmallMobile, itemsPerPage]);

  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
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
      <Container
        size={isSmallMobile ? 'xs' : isMobile ? 'sm' : 'lg'}
        py="xl"
        px={isSmallMobile ? 'xs' : 'md'}
      >
        <Card
          shadow="sm"
          p={isSmallMobile ? 'xs' : isMobile ? 'sm' : 'lg'}
          radius="md"
          withBorder
        >
          <Text
            ta="center"
            size={isSmallMobile ? 'sm' : isMobile ? 'md' : 'lg'}
          >
            {error}
          </Text>
          <Center mt="md">
            <Button
              onClick={() => window.location.reload()}
              fullWidth={isMobile}
              size={isSmallMobile ? 'sm' : 'md'}
            >
              Try Again
            </Button>
          </Center>
        </Card>
      </Container>
    );
  }
  const employeeInfoItems = getEmployeeInfoItems(employeeDetails);
  const getInfoIcon = (label: string) => {
    const iconSize = isMobile ? 14 : 16;
    switch (label) {
      case 'Name':
        return <IconUser size={iconSize} />;
      case 'Email':
        return <IconMail size={iconSize} />;
      case 'Phone':
        return <IconPhone size={iconSize} />;
      case 'Join Date':
        return <IconCalendar size={iconSize} />;
      case 'Role':
        return <IconBriefcase size={iconSize} />;
      default:
        return <IconUser size={iconSize} />;
    }
  };

  return (
    <Container
      size={isTablet ? 'lg' : 'xl'}
      py={isSmallMobile ? 'xs' : isMobile ? 'sm' : 'md'}
      my={isSmallMobile ? 'xs' : isMobile ? 'sm' : 'xl'}
      px={isSmallMobile ? 'xs' : isMobile ? 'sm' : 'md'}
    >
      <Stack gap={isMobile ? 'sm' : 'md'}>
        <Card shadow="sm" p="lg" radius="md" withBorder mt="xl">
          <Group
            justify="space-between"
            align={isMobile ? 'flex-start' : 'center'}
            wrap="nowrap"
            gap="sm"
          >
            <Stack
              gap={isMobile ? 4 : 6}
              style={{ flex: isMobile ? '1 1 100%' : 'auto' }}
            >
              <Group gap={isMobile ? 8 : 10} align="center">
                <IconCalendar
                  size={isMobile ? 20 : 24}
                  color={currentThemeConfig.button.color}
                />
                <Text
                  size={isMobile ? 'lg' : 'xl'}
                  fw={700}
                  c={currentThemeConfig.color}
                >
                  Timesheet Management
                </Text>
              </Group>

              <Text
                size={isMobile ? 'xs' : 'sm'}
                c="dimmed"
                style={{ lineHeight: 1.4, marginLeft: isMobile ? 28 : 34 }}
              >
                Manage and review your employee timesheets —{' '}
                <Text span fw={600} c={currentThemeConfig.color}>
                  {filteredTimesheets.length}
                </Text>{' '}
                entries found
              </Text>
            </Stack>

            <BackButton id={employeeId} />
          </Group>
        </Card>
        <Card
          shadow="lg"
          radius="md"
          withBorder
          p={isMobile ? 'md' : 'lg'}
          style={{
            backgroundColor: currentThemeConfig.backgroundColor,
            borderColor: currentThemeConfig.borderColor
          }}
        >
          <Stack gap={isMobile ? 'md' : 'lg'}>
            <Group gap="sm">
              <IconUser
                size={isMobile ? 18 : 20}
                color={currentThemeConfig.button.color}
              />
              <Text
                size={isMobile ? 'md' : 'lg'}
                fw={600}
                c={currentThemeConfig.color}
              >
                Employee Information
              </Text>
            </Group>

            <SimpleGrid
              cols={{ base: 1, xs: 1, sm: 2, md: 2, lg: 3 }}
              spacing={isMobile ? 'md' : 'lg'}
            >
              {employeeInfoItems.map((item, index) => (
                <Card
                  key={index}
                  radius="md"
                  p={isMobile ? 'sm' : 'md'}
                  style={{
                    border: `1px solid ${currentThemeConfig.borderColor}`
                  }}
                >
                  <Stack gap="xs">
                    <Group gap="xs">
                      {getInfoIcon(item.label)}
                      <Text size={isMobile ? 'xs' : 'sm'} c="dimmed">
                        {item.label}
                      </Text>
                    </Group>
                    <Text
                      size={isMobile ? 'sm' : 'md'}
                      fw={500}
                      c={currentThemeConfig.color}
                      className="break-words"
                    >
                      {item.value || '-'}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Stack>
        </Card>

        {/* Filters */}
        <Card
          shadow="sm"
          p={isSmallMobile ? 'xs' : isMobile ? 'sm' : 'md'}
          radius="md"
          withBorder
        >
          <Stack gap="sm">
            {isMobile && (
              <Button
                variant="light"
                fullWidth
                size={isSmallMobile ? 'xs' : 'sm'}
                onClick={() => setFiltersExpanded(!filtersExpanded)}
                rightSection={
                  filtersExpanded ? (
                    <IconChevronUp size={14} />
                  ) : (
                    <IconChevronDown size={14} />
                  )
                }
                leftSection={<IconFilter size={14} />}
              >
                {filtersExpanded ? 'Hide Filters' : 'Show Filters'}
              </Button>
            )}

            <Collapse in={filtersExpanded || !isMobile}>
              <Stack gap="md">
                <Stack gap="sm">
                  <Select
                    label="Status"
                    placeholder="Filter by status"
                    data={statusOptions}
                    value={selectedStatus}
                    onChange={value =>
                      setSelectedStatus(value as TimesheetStatus | null)
                    }
                    clearable
                    leftSection={<IconFilter size={14} />}
                    radius="md"
                    size={isSmallMobile ? 'xs' : 'sm'}
                  />
                  <DatePickerInput
                    type="range"
                    label="Date Range"
                    placeholder="Select date range"
                    value={dateRange}
                    onChange={setDateRange}
                    leftSection={<IconCalendar size={14} />}
                    radius="md"
                    size={isSmallMobile ? 'xs' : 'sm'}
                    popoverProps={{ withinPortal: true }}
                  />
                  <TextInput
                    label="Search"
                    placeholder={
                      isSmallMobile ? 'Search...' : 'Search by project, task...'
                    }
                    leftSection={<IconSearch size={14} />}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.currentTarget.value)}
                    radius="md"
                    size={isSmallMobile ? 'xs' : 'sm'}
                  />
                </Stack>

                <Flex
                  justify="space-between"
                  align={isMobile ? 'stretch' : 'center'}
                  direction={isMobile ? 'column' : 'row'}
                  gap="sm"
                >
                  <Group gap="xs">
                    <Text size="xs">
                      {isSmallMobile ? 'Per page:' : 'Items per page:'}
                    </Text>
                    <Select
                      data={
                        isSmallMobile
                          ? ['5', '10']
                          : isMobile
                            ? ['10', '20']
                            : ITEMS_PER_PAGE_OPTIONS
                      }
                      value={itemsPerPage.toString()}
                      onChange={value =>
                        setItemsPerPage(Number(value) || DEFAULT_ITEMS_PER_PAGE)
                      }
                      w={isSmallMobile ? 60 : 80}
                      size="xs"
                    />
                  </Group>

                  <Group gap="sm" grow={isMobile}>
                    {filteredTimesheets.length !== timesheets.length && (
                      <Badge variant="light" color="blue" size="xs">
                        {filteredTimesheets.length} / {timesheets.length}
                      </Badge>
                    )}
                    <Button
                      variant="outline"
                      onClick={resetFilters}
                      leftSection={<IconX size={14} />}
                      size="xs"
                      fullWidth={isMobile}
                    >
                      {isSmallMobile ? 'Clear' : 'Clear Filters'}
                    </Button>
                  </Group>
                </Flex>
              </Stack>
            </Collapse>
          </Stack>
        </Card>

        {/* Bulk Actions */}
        {selectedTimesheets.length > 0 && (
          <Card
            shadow="sm"
            p={isSmallMobile ? 'xs' : isMobile ? 'sm' : 'md'}
            radius="md"
            withBorder
          >
            <Stack gap="sm">
              <Text
                fw={500}
                size={isSmallMobile ? 'xs' : isMobile ? 'sm' : 'md'}
              >
                <Badge
                  variant="filled"
                  color="blue"
                  mr="xs"
                  size={isSmallMobile ? 'xs' : 'sm'}
                >
                  {selectedTimesheets.length}
                </Badge>
                {isSmallMobile ? 'sel.' : 'selected'}
              </Text>

              <Flex
                gap="xs"
                direction={isMobile ? 'column' : 'row'}
                align="stretch"
              >
                <Select
                  placeholder="Select action"
                  data={actionOptions}
                  value={bulkStatus}
                  onChange={value => setBulkStatus(value as TimesheetStatus)}
                  flex={isMobile ? undefined : 1}
                  size={isSmallMobile ? 'xs' : 'sm'}
                  leftSection={
                    bulkStatus === TimesheetStatus.Approved ? (
                      <IconCircleCheck size={14} />
                    ) : (
                      <IconCircleX size={14} />
                    )
                  }
                />

                <Group gap="xs" grow={isMobile}>
                  <Button
                    color={
                      bulkStatus === TimesheetStatus.Approved ? 'green' : 'red'
                    }
                    size={isSmallMobile ? 'xs' : 'sm'}
                    leftSection={
                      bulkStatus === TimesheetStatus.Approved ? (
                        <IconCircleCheck size={16} />
                      ) : (
                        <IconCircleX size={16} />
                      )
                    }
                    onClick={open}
                  >
                    {isSmallMobile ? 'Apply' : 'Apply Action'}
                  </Button>

                  <ActionIcon
                    variant="subtle"
                    onClick={() => setSelectedTimesheets([])}
                    size={isSmallMobile ? 'md' : 'lg'}
                  >
                    <IconX size={16} />
                  </ActionIcon>
                </Group>
              </Flex>
            </Stack>
          </Card>
        )}

        {/* Content - Table or Cards */}
        {isLoading ? (
          <Card shadow="sm" p="xl" radius="md" withBorder>
            <Center>
              <Stack align="center" gap="md">
                <Loader size="xl" />
                <Text>Loading timesheets...</Text>
              </Stack>
            </Center>
          </Card>
        ) : isMobile ? (
          <Stack gap="sm">
            {paginatedTimesheets.length > 0 ? (
              paginatedTimesheets.map((timesheet, index) => (
                <MobileTimesheetCard
                  key={timesheet.id}
                  timesheet={timesheet}
                  index={index + 1 + (activePage - 1) * itemsPerPage}
                  isSelected={selectedTimesheets.includes(timesheet.id)}
                  onToggleSelect={toggleSingleSelection}
                  onApprove={id =>
                    handleStatusChange([id], TimesheetStatus.Approved)
                  }
                  onReject={id =>
                    handleStatusChange([id], TimesheetStatus.Rejected)
                  }
                />
              ))
            ) : (
              <Card shadow="sm" p="xl" radius="md" withBorder>
                <Stack align="center" gap="md">
                  <Text size="lg">No timesheets found</Text>
                  <Text size="sm" ta="center">
                    {searchQuery ||
                    selectedStatus ||
                    (dateRange[0] && dateRange[1])
                      ? 'Try adjusting your filters'
                      : 'No timesheet entries available'}
                  </Text>
                </Stack>
              </Card>
            )}
          </Stack>
        ) : (
          <Card
            shadow="sm"
            p={0}
            radius="md"
            withBorder
            style={{ overflowX: 'auto' }}
          >
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
                    <Table.Tr key={timesheet.id}>
                      <Table.Td
                        style={{ textAlign: 'center', padding: rem(12) }}
                      >
                        <Checkbox
                          checked={selectedTimesheets.includes(timesheet.id)}
                          onChange={() => toggleSingleSelection(timesheet.id)}
                        />
                      </Table.Td>
                      <Table.Td
                        style={{ textAlign: 'center', padding: rem(12) }}
                      >
                        <Text size="sm">
                          {index + 1 + (activePage - 1) * itemsPerPage}
                        </Text>
                      </Table.Td>
                      <Table.Td
                        style={{ padding: rem(12), textAlign: 'center' }}
                      >
                        <Text size="sm">
                          {moment(timesheet.date).format('MMM D, YYYY')}
                        </Text>
                      </Table.Td>
                      <Table.Td style={{ padding: rem(12) }}>
                        <Text size="sm">{timesheet.project_name}</Text>
                      </Table.Td>
                      <Table.Td style={{ padding: rem(12) }}>
                        <Text size="sm">{timesheet.task_name}</Text>
                      </Table.Td>
                      <Table.Td
                        style={{ padding: rem(12), textAlign: 'center' }}
                      >
                        <Badge size="sm">{timesheet.hours}h</Badge>
                      </Table.Td>
                      <Table.Td
                        style={{ padding: rem(12), textAlign: 'center' }}
                      >
                        <StatusBadge status={timesheet.status} />
                      </Table.Td>
                      <Table.Td style={{ padding: rem(12) }}>
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
                    <Table.Td
                      colSpan={8}
                      style={{ textAlign: 'center', padding: rem(32) }}
                    >
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
          </Card>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Center>
            <Pagination
              value={activePage}
              onChange={setActivePage}
              total={totalPages}
              size={isSmallMobile ? 'xs' : isMobile ? 'sm' : 'md'}
              radius="md"
              withEdges={!isMobile}
              siblings={isSmallMobile ? 0 : isMobile ? 0 : 1}
              boundaries={isSmallMobile ? 1 : isMobile ? 1 : 2}
            />
          </Center>
        )}
      </Stack>

      {/* Confirmation Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={isSmallMobile ? 'Confirm' : 'Confirm Status Update'}
        size={isSmallMobile ? 'xs' : isMobile ? 'sm' : 'md'}
        centered
        fullScreen={isSmallMobile}
      >
        <Stack gap="md">
          <Text size={isSmallMobile ? 'xs' : isMobile ? 'sm' : 'md'}>
            {isSmallMobile ? (
              <>
                {bulkStatus === TimesheetStatus.Approved ? 'Approve' : 'Reject'}{' '}
                {selectedTimesheets.length} timesheet(s)?
              </>
            ) : (
              <>
                Are you sure you want to{' '}
                {bulkStatus === TimesheetStatus.Approved ? 'approve' : 'reject'}{' '}
                {selectedTimesheets.length} timesheet(s)?
              </>
            )}
          </Text>
          <Group justify="flex-end" grow={isMobile}>
            <Button
              variant="outline"
              onClick={close}
              size={isSmallMobile ? 'xs' : 'sm'}
            >
              Cancel
            </Button>
            <Button
              color={bulkStatus === TimesheetStatus.Approved ? 'green' : 'red'}
              onClick={() => handleStatusChange(selectedTimesheets, bulkStatus)}
              size={isSmallMobile ? 'xs' : 'sm'}
            >
              {isSmallMobile
                ? 'Confirm'
                : `Confirm ${bulkStatus === TimesheetStatus.Approved ? 'Approval' : 'Rejection'}`}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};
