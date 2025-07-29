import { useState, useEffect } from 'react';
import {
  Box,
  Select,
  Table,
  Text,
  Button,
  Group,
  LoadingOverlay,
  Badge,
  Modal,
  Title,
  TextInput
} from '@mantine/core';
import { DatePickerInput, DatesRangeValue } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch, IconCheck, IconX } from '@tabler/icons-react';
import moment from 'moment';

interface EmployeeTimesheet {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  projectName: string;
  taskName: string;
  hours: number;
  comments: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const EmployeeTimesheetUpdateByAdmin = () => {
  const [timesheets, setTimesheets] = useState<EmployeeTimesheet[]>([]);
  const [filteredTimesheets, setFilteredTimesheets] = useState<
    EmployeeTimesheet[]
  >([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(
    'pending'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DatesRangeValue>([
    moment().startOf('month').toDate(),
    moment().endOf('month').toDate()
  ]);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [selectedTimesheet, setSelectedTimesheet] =
    useState<EmployeeTimesheet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [employees, setEmployees] = useState<
    { value: string; label: string }[]
  >([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Mock data - replace with actual API call
        const mockData: EmployeeTimesheet[] = [
          {
            id: '1',
            employeeId: 'emp1',
            employeeName: 'John Doe',
            date: '2023-06-01',
            projectName: 'Website Redesign',
            taskName: 'Homepage Development',
            hours: 8,
            comments: 'Completed homepage layout',
            status: 'pending'
          },
          {
            id: '2',
            employeeId: 'emp1',
            employeeName: 'John Doe',
            date: '2023-06-02',
            projectName: 'Website Redesign',
            taskName: 'API Integration',
            hours: 6,
            comments: 'Connected to backend services',
            status: 'pending'
          },
          {
            id: '3',
            employeeId: 'emp2',
            employeeName: 'Jane Smith',
            date: '2023-06-01',
            projectName: 'Mobile App',
            taskName: 'UI Design',
            hours: 7.5,
            comments: 'Designed dashboard screens',
            status: 'approved'
          }
        ];

        setTimesheets(mockData);
        setFilteredTimesheets(mockData);

        // Extract unique employees for dropdown
        const uniqueEmployees = Array.from(
          new Set(mockData.map(ts => ts.employeeId))
        ).map(id => {
          const emp = mockData.find(ts => ts.employeeId === id);
          return {
            value: id,
            label: emp?.employeeName || id
          };
        });

        setEmployees(uniqueEmployees);
      } catch (error) {
        console.error('Error fetching timesheets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters whenever filter criteria change
  useEffect(() => {
    let result = [...timesheets];

    // Filter by status
    if (selectedStatus) {
      result = result.filter(ts => ts.status === selectedStatus);
    }

    // Filter by employee
    if (selectedEmployee) {
      result = result.filter(ts => ts.employeeId === selectedEmployee);
    }

    // Filter by date range
    if (dateRange[0] && dateRange[1]) {
      result = result.filter(ts => {
        const date = moment(ts.date);
        return (
          date.isSameOrAfter(dateRange[0]) && date.isSameOrBefore(dateRange[1])
        );
      });
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        ts =>
          ts.employeeName.toLowerCase().includes(query) ||
          ts.projectName.toLowerCase().includes(query) ||
          ts.taskName.toLowerCase().includes(query) ||
          ts.comments.toLowerCase().includes(query)
      );
    }

    setFilteredTimesheets(result);
  }, [timesheets, selectedStatus, selectedEmployee, dateRange, searchQuery]);

  const handleStatusChange = async (
    timesheetId: string,
    newStatus: 'approved' | 'rejected'
  ) => {
    setIsLoading(true);
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 500));

      setTimesheets(prev =>
        prev.map(ts =>
          ts.id === timesheetId ? { ...ts, status: newStatus } : ts
        )
      );

      close();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge color="green">Approved</Badge>;
      case 'rejected':
        return <Badge color="red">Rejected</Badge>;
      default:
        return <Badge color="yellow">Pending</Badge>;
    }
  };

  const resetFilters = () => {
    setSelectedStatus(null);
    setSelectedEmployee(null);
    setSearchQuery('');
    setDateRange([
      moment().startOf('month').toDate(),
      moment().endOf('month').toDate()
    ]);
  };

  return (
    <Box p="md">
      <Title order={2} mb="xl">
        Employee Timesheet Administration
      </Title>

      {/* Filters Section */}
      <Box
        mb="xl"
        p="md"
        style={{ border: '1px solid #ddd', borderRadius: '8px' }}
      >
        <Group mb="md" justify="space-between">
          <Text fw={500}>Filters</Text>
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            leftSection={<IconX size={16} />}
          >
            Clear Filters
          </Button>
        </Group>

        <Group grow>
          <Select
            label="Status"
            placeholder="Filter by status"
            data={[
              { value: 'pending', label: 'Pending' },
              { value: 'approved', label: 'Approved' },
              { value: 'rejected', label: 'Rejected' }
            ]}
            value={selectedStatus}
            onChange={setSelectedStatus}
            clearable
          />

          <Select
            label="Employee"
            placeholder="Filter by employee"
            data={employees}
            value={selectedEmployee}
            onChange={setSelectedEmployee}
            clearable
            searchable
          />

          <DatePickerInput
            type="range"
            label="Date Range"
            placeholder="Select date range"
            value={dateRange}
            onChange={setDateRange}
          />
        </Group>

        <TextInput
          mt="md"
          label="Search"
          placeholder="Search by employee, project, task or comments"
          leftSection={<IconSearch size={16} />}
          value={searchQuery}
          onChange={e => setSearchQuery(e.currentTarget.value)}
        />
      </Box>

      {/* Timesheet Table */}
      <Box pos="relative">
        <LoadingOverlay visible={isLoading} overlayProps={{ blur: 2 }} />

        {filteredTimesheets.length === 0 ? (
          <Text ta="center" my="xl">
            No timesheets found matching your criteria
          </Text>
        ) : (
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Project</th>
                <th>Task</th>
                <th>Hours</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTimesheets.map(timesheet => (
                <tr key={timesheet.id}>
                  <td>{timesheet.employeeName}</td>
                  <td>{moment(timesheet.date).format('MMM D, YYYY')}</td>
                  <td>{timesheet.projectName}</td>
                  <td>{timesheet.taskName}</td>
                  <td>{timesheet.hours}</td>
                  <td>{getStatusBadge(timesheet.status)}</td>
                  <td>
                    {timesheet.status === 'pending' && (
                      <Group gap="xs">
                        <Button
                          size="xs"
                          variant="outline"
                          color="green"
                          onClick={() => {
                            setSelectedTimesheet(timesheet);
                            open();
                          }}
                        >
                          Review
                        </Button>
                      </Group>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Box>

      {/* Status Update Modal */}
      <Modal
        opened={opened && selectedTimesheet !== null}
        onClose={close}
        title={`Review Timesheet - ${selectedTimesheet?.employeeName}`}
        size="lg"
      >
        {selectedTimesheet && (
          <Box>
            <Text mb="sm">
              <strong>Date:</strong>{' '}
              {moment(selectedTimesheet.date).format('MMMM D, YYYY')}
            </Text>
            <Text mb="sm">
              <strong>Project:</strong> {selectedTimesheet.projectName}
            </Text>
            <Text mb="sm">
              <strong>Task:</strong> {selectedTimesheet.taskName}
            </Text>
            <Text mb="sm">
              <strong>Hours:</strong> {selectedTimesheet.hours}
            </Text>
            <Text mb="md">
              <strong>Comments:</strong> {selectedTimesheet.comments}
            </Text>

            <Group justify="center" mt="xl">
              <Button
                color="red"
                leftSection={<IconX size={16} />}
                onClick={() =>
                  handleStatusChange(selectedTimesheet.id, 'rejected')
                }
              >
                Reject
              </Button>
              <Button
                color="green"
                leftSection={<IconCheck size={16} />}
                onClick={() =>
                  handleStatusChange(selectedTimesheet.id, 'approved')
                }
              >
                Approve
              </Button>
            </Group>
          </Box>
        )}
      </Modal>
    </Box>
  );
};
