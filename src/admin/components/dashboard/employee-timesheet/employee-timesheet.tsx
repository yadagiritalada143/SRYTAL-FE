import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Container,
  Stack,
  Card,
  Flex,
  Text,
  Group,
  Badge,
  Modal,
  Select,
  ActionIcon,
  Center,
  Pagination,
  Divider
} from '@mantine/core';
import { DatesRangeValue } from '@mantine/dates';
import {
  useDebouncedValue,
  useDisclosure,
  useMediaQuery
} from '@mantine/hooks';
import {
  IconX,
  IconCircleCheck,
  IconCircleX,
  IconCalendar
} from '@tabler/icons-react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { EmployeeTimesheet, TimesheetStatus } from '@interfaces/timesheet';
import { formatData, prepareSubmitData } from '@common/timesheet/helper';
import { getTimesheetData, submitTimeSheet } from '@services/common-services';
import { employeeDetailsAtom } from '@atoms/employee-atom';
import { getEmployeeDetailsByAdmin } from '@services/admin-services';
import { BackButton } from '@common/style-components/buttons';

import { InfoCard } from './components/InfoCard';
import { FilterSection } from './components/FilterSection';
import { TimesheetDataView } from './components/TimesheetDataView';

import { toast } from 'react-toastify';
import { useCustomToast } from '@utils/common/toast';
import { getEmployeeInfoItems } from '../update-employee/helper-functions/add-package';
import { useAppTheme } from '@hooks/use-app-theme';
import { CommonButton } from '@components/common/button/CommonButton';

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

export const EmployeeTimesheetAdminView = () => {
  const params = useParams();
  const employeeId = params.employeeId as string;

  const { showSuccessToast } = useCustomToast();
  const [employeeDetails, setEmployeeDetails] =
    useRecoilState(employeeDetailsAtom);
  const { themeConfig: currentThemeConfig } = useAppTheme();

  // Selected state breakpoints
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

  // Split filtered data into work and leaves
  const { workEntries, leaveEntries } = useMemo(() => {
    return {
      workEntries: filteredTimesheets.filter(ts => !ts.isVacation),
      leaveEntries: filteredTimesheets.filter(ts => ts.isVacation)
    };
  }, [filteredTimesheets]);

  // Pagination logic for work entries
  const { paginatedWork, totalPagesWork } = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginated = workEntries.slice(start, end);
    const pages = Math.ceil(workEntries.length / itemsPerPage);

    return { paginatedWork: paginated, totalPagesWork: pages };
  }, [workEntries, activePage, itemsPerPage]);

  // Pagination logic for leave entries (using same activePage for simplicity, or separate if preferred)
  // Re-evaluating: usually better to have separate pagination for separate sections, but for now I'll use same.
  const { paginatedLeaves, totalPagesLeaves } = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginated = leaveEntries.slice(start, end);
    const pages = Math.ceil(leaveEntries.length / itemsPerPage);

    return { paginatedLeaves: paginated, totalPagesLeaves: pages };
  }, [leaveEntries, activePage, itemsPerPage]);
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
        setTimesheets(
          formattedTimesheet.filter(ts => ts.hours > 0 || ts.isVacation)
        );
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

        const response = await submitTimeSheet(submitData, employeeId);
        setTimesheets(prev =>
          prev.map(ts =>
            timesheetIds.includes(ts.id) ? { ...ts, status } : ts
          )
        );
        setSelectedTimesheets([]);
        if (response?.success === false) {
          toast.error(response.message || 'Failed to update timesheet status');
          return;
        } else {
          showSuccessToast(
            `Successfully ${status === TimesheetStatus.Approved ? 'approved' : 'rejected'} ${timesheetIds.length} timesheet(s)`
          );
        }
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
      setSelectedTimesheets(checked ? workEntries.map(ts => ts.id) : []);
    },
    [workEntries]
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
      workEntries.length > 0 &&
      workEntries.every(ts => selectedTimesheets.includes(ts.id)),
    [workEntries, selectedTimesheets]
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
        py='xl'
        px={isSmallMobile ? 'xs' : 'md'}
      >
        <Card
          shadow='sm'
          p={isSmallMobile ? 'xs' : isMobile ? 'sm' : 'lg'}
          radius='md'
          withBorder
        >
          <Text
            ta='center'
            size={isSmallMobile ? 'sm' : isMobile ? 'md' : 'lg'}
          >
            {error}
          </Text>
          <Center mt='md'>
            <CommonButton
              onClick={() => window.location.reload()}
              fullWidth={isMobile}
              size={isSmallMobile ? 'sm' : 'md'}
            >
              Try Again
            </CommonButton>
          </Center>
        </Card>
      </Container>
    );
  }
  const employeeInfoItems = getEmployeeInfoItems(employeeDetails);
  return (
    <Container
      size={isTablet ? 'lg' : 'xl'}
      py={isSmallMobile ? 'xs' : isMobile ? 'sm' : 'md'}
      my={isSmallMobile ? 'xs' : isMobile ? 'sm' : 'xl'}
      px={isSmallMobile ? 'xs' : isMobile ? 'sm' : 'md'}
    >
      <Stack gap={isMobile ? 'sm' : 'md'}>
        <Card shadow='sm' p='lg' radius='md' withBorder mt='xl'>
          <Group
            justify='space-between'
            align={isMobile ? 'flex-start' : 'center'}
            wrap='nowrap'
            gap='sm'
          >
            <Stack
              gap={isMobile ? 4 : 6}
              style={{ flex: isMobile ? '1 1 100%' : 'auto' }}
            >
              <Group gap={isMobile ? 8 : 10} align='center'>
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
                c='dimmed'
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
        <InfoCard
          employeeDetails={employeeDetails}
          employeeInfoItems={employeeInfoItems}
        />

        {/* Filters */}
        <FilterSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          dateRange={dateRange}
          setDateRange={setDateRange}
          filtersExpanded={filtersExpanded}
          setFiltersExpanded={setFiltersExpanded}
          resetFilters={resetFilters}
          statusOptions={statusOptions}
        />

        {/* Bulk Actions */}
        {selectedTimesheets.length > 0 && (
          <Card
            shadow='sm'
            p={isSmallMobile ? 'xs' : isMobile ? 'sm' : 'md'}
            radius='md'
            withBorder
          >
            <Stack gap='sm'>
              <Text
                fw={500}
                size={isSmallMobile ? 'xs' : isMobile ? 'sm' : 'md'}
              >
                <Badge
                  variant='filled'
                  color='blue'
                  mr='xs'
                  size={isSmallMobile ? 'xs' : 'sm'}
                >
                  {selectedTimesheets.length}
                </Badge>
                {isSmallMobile ? 'sel.' : 'selected'}
              </Text>

              <Flex
                gap='xs'
                direction={isMobile ? 'column' : 'row'}
                align='stretch'
              >
                <Select
                  placeholder='Select action'
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

                <Group gap='xs' grow={isMobile}>
                  <CommonButton
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
                  </CommonButton>

                  <ActionIcon
                    variant='subtle'
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
        {/* Timesheet Entries Section */}
        <Stack gap='xs'>
          <Group justify='space-between'>
            <Text size='lg' fw={700} c={currentThemeConfig.color}>
              Timesheet Entries
            </Text>
            {!isMobile && (
              <Group gap='xs'>
                <Text size='xs'>Items per page:</Text>
                <Select
                  data={ITEMS_PER_PAGE_OPTIONS}
                  value={itemsPerPage.toString()}
                  onChange={value => setItemsPerPage(Number(value) || 20)}
                  w={80}
                  size='xs'
                />
              </Group>
            )}
          </Group>
          <TimesheetDataView
            data={paginatedWork}
            isLoading={isLoading}
            label='timesheets'
            isMobile={!!isMobile}
            selectedIds={selectedTimesheets}
            onToggleSelect={toggleSingleSelection}
            onToggleAll={toggleSelectAll}
            isAllSelected={isAllSelected}
            sortOrder={sortOrder}
            onSort={toggleSortOrder}
            onApprove={id => handleStatusChange([id], TimesheetStatus.Approved)}
            onReject={id => handleStatusChange([id], TimesheetStatus.Rejected)}
            activePage={activePage}
            itemsPerPage={itemsPerPage}
            themeConfig={currentThemeConfig}
            noDataMessage='No timesheet entries found'
            isLeaves={false}
          />
          {totalPagesWork > 1 && (
            <Center mt='md'>
              <Pagination
                value={activePage}
                onChange={setActivePage}
                total={totalPagesWork}
                size='sm'
                radius='md'
              />
            </Center>
          )}
        </Stack>

        <Divider my='md' />

        {/* Leaves Section */}
        <Stack gap='xs'>
          <Text size='lg' fw={700} c={currentThemeConfig.color}>
            Leaves
          </Text>
          <TimesheetDataView
            data={paginatedLeaves}
            isLoading={isLoading}
            label='leaves'
            isMobile={!!isMobile}
            selectedIds={selectedTimesheets}
            onToggleSelect={toggleSingleSelection}
            onToggleAll={checked => {
              setSelectedTimesheets(
                checked ? leaveEntries.map(ts => ts.id) : []
              );
            }}
            isAllSelected={
              leaveEntries.length > 0 &&
              leaveEntries.every(ts => selectedTimesheets.includes(ts.id))
            }
            sortOrder={sortOrder}
            onSort={toggleSortOrder}
            onApprove={id => handleStatusChange([id], TimesheetStatus.Approved)}
            onReject={id => handleStatusChange([id], TimesheetStatus.Rejected)}
            activePage={activePage}
            itemsPerPage={itemsPerPage}
            themeConfig={currentThemeConfig}
            noDataMessage='No leave entries found'
            isLeaves={true}
          />
          {totalPagesLeaves > 1 && (
            <Center mt='md'>
              <Pagination
                value={activePage}
                onChange={setActivePage}
                total={totalPagesLeaves}
                size='sm'
                radius='md'
              />
            </Center>
          )}
        </Stack>
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
        <Stack gap='md'>
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
          <Group justify='flex-end' grow={isMobile}>
            <CommonButton
              variant='outline'
              onClick={close}
              size={isSmallMobile ? 'xs' : 'sm'}
            >
              Cancel
            </CommonButton>
            <CommonButton
              color={bulkStatus === TimesheetStatus.Approved ? 'green' : 'red'}
              onClick={() => handleStatusChange(selectedTimesheets, bulkStatus)}
              size={isSmallMobile ? 'xs' : 'sm'}
            >
              {isSmallMobile
                ? 'Confirm'
                : `Confirm ${bulkStatus === TimesheetStatus.Approved ? 'Approval' : 'Rejection'}`}
            </CommonButton>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};
