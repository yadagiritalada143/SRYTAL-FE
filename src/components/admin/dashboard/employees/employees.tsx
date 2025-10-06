import {
  Button,
  Loader,
  TextInput,
  Pagination,
  Center,
  Table,
  Stack,
  Group,
  Text,
  ActionIcon,
  Tooltip,
  Badge,
  Container,
  Card,
  Flex,
  Select,
  ScrollArea,
  Divider
} from '@mantine/core';
import {
  IconCalendarTime,
  IconPackage,
  IconSearch,
  IconUser,
  IconPlus,
  IconSortAscending,
  IconSortDescending,
  IconFilter
} from '@tabler/icons-react';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEmployeeDetailsByAdmin } from '../../../../services/admin-services';
import { toast } from 'react-toastify';
import { organizationAdminUrls } from '../../../../utils/common/constants';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  organizationEmployeeAtom,
  organizationThemeAtom
} from '../../../../atoms/organization-atom';
import useHorizontalScroll from '../../../../hooks/horizontal-scroll';
import { debounce } from '../../../../utils/common/debounce';
import { EmployeeInterface } from '../../../../interfaces/employee';
import { themeAtom } from '../../../../atoms/theme';
import { useMediaQuery } from '@mantine/hooks';

// Constants
const ITEMS_PER_PAGE_OPTIONS = ['5', '10', '20', '50'];
const DEFAULT_ITEMS_PER_PAGE = 10;

// Types
type SortField = 'employeeId' | 'firstName' | 'lastName' | 'email';
type SortOrder = 'asc' | 'desc';

interface SortConfig {
  field: SortField;
  order: SortOrder;
}

// Custom hook for employee filtering and sorting
const useEmployeeFilters = (employees: EmployeeInterface[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'employeeId',
    order: 'asc'
  });
  const [roleFilter, setRoleFilter] = useState<string>('');

  const filteredAndSortedEmployees = useMemo(() => {
    let filtered = employees;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = employees.filter(
        employee =>
          employee.firstName.toLowerCase().includes(query) ||
          employee.lastName.toLowerCase().includes(query) ||
          employee.email.toLowerCase().includes(query) ||
          employee.mobileNumber.toString().includes(query) ||
          employee.employeeId?.toLowerCase().includes(query)
      );
    }

    // Apply role filter
    if (roleFilter) {
      filtered = filtered.filter(
        employee =>
          employee.userRole?.toLowerCase() === roleFilter.toLowerCase()
      );
    }
    // Apply sorting
    return [...filtered].sort((a, b) => {
      const aValue = a.employeeId
        ? a[sortConfig.field]?.toString().toLowerCase()
        : '';
      const bValue = b.employeeId
        ? b[sortConfig.field]?.toString().toLowerCase()
        : '';

      const comparison = aValue.localeCompare(bValue);
      return sortConfig.order === 'asc' ? comparison : -comparison;
    });
  }, [employees, searchQuery, sortConfig, roleFilter]);

  const handleSort = useCallback((field: SortField) => {
    setSortConfig(prev => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    sortConfig,
    handleSort,
    roleFilter,
    setRoleFilter,
    filteredEmployees: filteredAndSortedEmployees
  };
};

// Employee Actions Component
const EmployeeActions: React.FC<{
  employeeId: string;
  onEdit: (id: string) => void;
  onPackage: (id: string) => void;
  onTimesheet: (id: string) => void;
  isMobile?: boolean;
}> = ({ employeeId, onEdit, onPackage, onTimesheet, isMobile = false }) => (
  <Group gap="xs" justify="center">
    <Tooltip label="Edit Employee Details">
      <ActionIcon
        variant="subtle"
        color="blue"
        onClick={() => onEdit(employeeId)}
        size={isMobile ? 'md' : 'sm'}
      >
        <IconUser size={isMobile ? 18 : 16} />
      </ActionIcon>
    </Tooltip>
    <Tooltip label="Update Package">
      <ActionIcon
        variant="subtle"
        color="green"
        onClick={() => onPackage(employeeId)}
        size={isMobile ? 'md' : 'sm'}
      >
        <IconPackage size={isMobile ? 18 : 16} />
      </ActionIcon>
    </Tooltip>
    <Tooltip label="View Timesheet">
      <ActionIcon
        variant="subtle"
        color="orange"
        onClick={() => onTimesheet(employeeId)}
        size={isMobile ? 'md' : 'sm'}
      >
        <IconCalendarTime size={isMobile ? 18 : 16} />
      </ActionIcon>
    </Tooltip>
  </Group>
);

// Mobile Employee Card Component
const MobileEmployeeCard: React.FC<{
  employee: EmployeeInterface;
  index: number;
  activePage: number;
  itemsPerPage: number;
  onEdit: (id: string) => void;
  onPackage: (id: string) => void;
  onTimesheet: (id: string) => void;
}> = ({
  employee,
  index,
  activePage,
  itemsPerPage,
  onEdit,
  onPackage,
  onTimesheet
}) => {
  return (
    <Card
      key={employee._id}
      id={`employee-${employee._id}`}
      shadow="sm"
      p="md"
      mb="sm"
      withBorder
    >
      <Stack gap="sm">
        {/* Header Section */}
        <Group justify="space-between" align="center">
          <Badge variant="filled" color="blue">
            #{index + 1 + (activePage - 1) * itemsPerPage}
          </Badge>
          <Badge size="sm" color="teal" variant="light">
            {employee.userRole || 'N/A'}
          </Badge>
        </Group>

        <Divider />

        {/* Basic Info Section */}
        <Group grow align="start">
          <Stack gap={2}>
            <Text size="xs" fw={600} c="dimmed">
              Employee ID
            </Text>
            <Text size="sm">{employee.employeeId || 'N/A'}</Text>
          </Stack>

          <Stack gap={2}>
            <Text size="xs" fw={600} c="dimmed">
              Name
            </Text>
            <Text size="sm">
              {employee.firstName} {employee.lastName}
            </Text>
          </Stack>
        </Group>

        <Divider />

        {/* Contact Section */}
        <Stack gap={4}>
          <Text size="xs" fw={600} c="dimmed">
            Email
          </Text>
          <Text size="sm" lineClamp={1}>
            {employee.email}
          </Text>
        </Stack>

        <Group grow>
          <Stack gap={2}>
            <Text size="xs" fw={600} c="dimmed">
              Mobile
            </Text>
            <Text size="sm">{employee.mobileNumber || 'N/A'}</Text>
          </Stack>
          <Stack gap={2}>
            <Text size="xs" fw={600} c="dimmed">
              Blood Group
            </Text>
            <Badge size="sm" variant="light" color="red">
              {employee.bloodGroup?.type || 'N/A'}
            </Badge>
          </Stack>
        </Group>

        <Divider />

        {/* Employment Info */}
        <Stack gap={2}>
          <Text size="xs" fw={600} c="dimmed">
            Employment Type
          </Text>
          <Text size="sm">
            {employee.employmentType?.employmentType || 'N/A'}
          </Text>
        </Stack>

        <Stack gap={4}>
          <Text size="xs" fw={600} c="dimmed">
            Designations
          </Text>
          <Group gap={6} wrap="wrap">
            {employee.employeeRole?.length ? (
              employee.employeeRole.map(role => (
                <Badge key={role._id} size="xs" variant="outline" color="gray">
                  {role.designation}
                </Badge>
              ))
            ) : (
              <Text size="xs" c="dimmed">
                None
              </Text>
            )}
          </Group>
        </Stack>

        <Divider />

        {/* Actions */}
        <Card.Section withBorder mt="sm" p="md" style={{ borderRadius: '8px' }}>
          <EmployeeActions
            employeeId={employee._id}
            onEdit={onEdit}
            onPackage={onPackage}
            onTimesheet={onTimesheet}
            isMobile
          />
        </Card.Section>
      </Stack>
    </Card>
  );
};

// Table Header Component
const TableHeader: React.FC<{
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
  themeConfig: any;
  isTablet?: boolean;
}> = ({ sortConfig, onSort, themeConfig, isTablet = false }) => {
  const SortableHeader: React.FC<{
    field: SortField;
    children: React.ReactNode;
  }> = ({ field, children }) => (
    <Table.Th
      className="border cursor-pointer select-none hover:bg-opacity-80 transition-colors"
      onClick={() => onSort(field)}
      style={{ minWidth: isTablet ? '120px' : 'auto' }}
    >
      <Group justify="center">
        <Text size="sm" fw={500}>
          {children}
        </Text>
        {sortConfig.field === field &&
          (sortConfig.order === 'asc' ? (
            <IconSortAscending size={14} />
          ) : (
            <IconSortDescending size={14} />
          ))}
      </Group>
    </Table.Th>
  );

  return (
    <Table.Thead
      style={{
        backgroundColor: themeConfig.backgroundColor,
        color: themeConfig.color
      }}
    >
      <Table.Tr>
        <Table.Th
          className="p-3 border text-center"
          style={{ minWidth: '60px' }}
        >
          <Text size="sm" fw={500}>
            S.No
          </Text>
        </Table.Th>
        <SortableHeader field="employeeId">Employee ID</SortableHeader>
        <SortableHeader field="firstName">First Name</SortableHeader>
        {!isTablet && (
          <SortableHeader field="lastName">Last Name</SortableHeader>
        )}
        <SortableHeader field="email">Email</SortableHeader>
        {!isTablet && (
          <Table.Th className="p-3 border text-center">
            <Text size="sm" fw={500}>
              Mobile
            </Text>
          </Table.Th>
        )}
        <Table.Th className="p-3 border text-center">
          <Text size="sm" fw={500}>
            Role
          </Text>
        </Table.Th>
        {!isTablet && (
          <>
            <Table.Th className="p-3 border text-center">
              <Text size="sm" fw={500}>
                Employment
              </Text>
            </Table.Th>
            <Table.Th className="p-3 border text-center">
              <Text size="sm" fw={500}>
                Blood Group
              </Text>
            </Table.Th>
          </>
        )}
        <Table.Th className="p-3 border text-center">
          <Text size="sm" fw={500}>
            Designations
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

const HeadingComponent: React.FC<{
  filteredEmployees: number;
  handleAddEmployee: () => void;
  isMobile?: boolean;
}> = ({ filteredEmployees = 0, handleAddEmployee, isMobile = false }) => (
  <Card shadow="sm" p={isMobile ? 'md' : 'lg'} radius="md" withBorder>
    <Flex
      direction={isMobile ? 'column' : 'row'}
      justify="space-between"
      align="center"
      gap="md"
    >
      <Text
        size={isMobile ? 'lg' : 'xl'}
        fw={700}
        ta={isMobile ? 'center' : 'left'}
      >
        Employee Management ({filteredEmployees} employees)
      </Text>
      <Button
        leftSection={<IconPlus size={16} />}
        onClick={handleAddEmployee}
        variant="filled"
        fullWidth={isMobile}
        size={isMobile ? 'md' : 'sm'}
      >
        Add Employee
      </Button>
    </Flex>
  </Card>
);

const Employees = () => {
  const [employees, setEmployees] = useRecoilState(organizationEmployeeAtom);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isDarkTheme = useRecoilValue(themeAtom);
  const navigate = useNavigate();
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');

  // Get the current theme configuration based on theme mode
  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;
    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);

  const highlightEmployeeId = useRef<string | null>(null);

  const {
    searchQuery,
    setSearchQuery,
    sortConfig,
    handleSort,
    roleFilter,
    setRoleFilter,
    filteredEmployees
  } = useEmployeeFilters(employees);

  const {
    scrollRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart
  } = useHorizontalScroll();

  // Debounced search
  const debouncedSearch = useMemo(
    () => debounce((query: string) => setSearchQuery(query), 300),
    [setSearchQuery]
  );

  // Pagination logic
  const { paginatedEmployees, totalPages } = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginated = filteredEmployees.slice(start, end);
    const pages = Math.ceil(filteredEmployees.length / itemsPerPage);

    return { paginatedEmployees: paginated, totalPages: pages };
  }, [filteredEmployees, activePage, itemsPerPage]);

  // Unique roles for filter
  const uniqueRoles = useMemo(() => {
    const roles = employees.map(emp => emp.userRole).filter(Boolean);
    return Array.from(new Set(roles));
  }, [employees]);

  // Data fetching
  useEffect(() => {
    if (employees.length > 0) {
      setIsLoading(false);
      return;
    }

    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const employeesList = await getAllEmployeeDetailsByAdmin();
        setEmployees(employeesList);
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || 'Failed to load employees';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [employees.length, setEmployees]);

  // Reset page when filters change
  useEffect(() => {
    setActivePage(1);
  }, [searchQuery, roleFilter, itemsPerPage]);

  // Employee highlighting logic
  useEffect(() => {
    const selectedEmployeeId = localStorage.getItem('id');
    if (!selectedEmployeeId || filteredEmployees.length === 0) return;

    const employeeIndex = filteredEmployees.findIndex(
      emp => emp._id === selectedEmployeeId
    );

    if (employeeIndex === -1) return;

    const targetPage = Math.floor(employeeIndex / itemsPerPage) + 1;
    setActivePage(targetPage);
    highlightEmployeeId.current = selectedEmployeeId;

    const timer = setTimeout(() => {
      const element = document.getElementById(`employee-${selectedEmployeeId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.style.backgroundColor = `${currentThemeConfig.button.color}50`;
        element.style.color = `${currentThemeConfig.button.textColor}70`;

        setTimeout(() => {
          localStorage.removeItem('id');
          element.style.backgroundColor =
            currentThemeConfig.headerBackgroundColor;
          element.style.color = currentThemeConfig.color;
          highlightEmployeeId.current = null;
        }, 2000);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [
    filteredEmployees,
    itemsPerPage,
    currentThemeConfig.headerBackgroundColor,
    currentThemeConfig.color,
    currentThemeConfig.button.color,
    currentThemeConfig.button.textColor
  ]);

  // Navigation handlers
  const handleEmployeeEdit = useCallback(
    (employeeId: string) => {
      localStorage.setItem('id', employeeId);
      navigate(
        `${organizationAdminUrls(organizationConfig.organization_name)}/dashboard/update/${employeeId}`
      );
    },
    [navigate, organizationConfig.organization_name]
  );

  const handlePackageUpdate = useCallback(
    (employeeId: string) => {
      localStorage.setItem('id', employeeId);
      navigate(
        `${organizationAdminUrls(organizationConfig.organization_name)}/dashboard/package/${employeeId}`
      );
    },
    [navigate, organizationConfig.organization_name]
  );

  const handleTimesheet = useCallback(
    (employeeId: string) => {
      localStorage.setItem('id', employeeId);
      navigate(
        `${organizationAdminUrls(organizationConfig.organization_name)}/dashboard/timesheet/${employeeId}`
      );
    },
    [navigate, organizationConfig.organization_name]
  );

  const handleAddEmployee = useCallback(() => {
    navigate(
      `${organizationAdminUrls(organizationConfig.organization_name)}/dashboard/addemployee`
    );
  }, [navigate, organizationConfig.organization_name]);

  if (error) {
    return (
      <Container size={isMobile ? 'sm' : 'lg'} py="xl">
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
    <Container size="xl" py="md" my="xl" px={isSmallMobile ? 'xs' : 'md'}>
      <Stack gap="md">
        {/* Header */}
        <HeadingComponent
          filteredEmployees={filteredEmployees.length}
          handleAddEmployee={handleAddEmployee}
          isMobile={isMobile}
        />

        {/* Filters */}
        <Card shadow="sm" p={isMobile ? 'sm' : 'md'} radius="md" withBorder>
          <Stack gap="md">
            <Group grow={!isMobile}>
              <TextInput
                placeholder="Search by name, email, phone, or employee ID..."
                leftSection={<IconSearch size={16} />}
                onChange={e => debouncedSearch(e.target.value)}
                radius="md"
                size={isMobile ? 'sm' : 'md'}
              />
              <Select
                placeholder="Filter by role"
                data={uniqueRoles.map(role => ({ value: role, label: role }))}
                value={roleFilter}
                onChange={value => setRoleFilter(value ?? '')}
                clearable
                leftSection={<IconFilter size={16} />}
                radius="md"
                size={isMobile ? 'sm' : 'md'}
              />
            </Group>

            <Group justify="space-between" wrap={isMobile ? 'wrap' : 'nowrap'}>
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

              {filteredEmployees.length !== employees.length && (
                <Badge variant="light" color="blue">
                  {filteredEmployees.length} of {employees.length} employees
                </Badge>
              )}
            </Group>
          </Stack>
        </Card>

        {/* Table or Cards based on screen size */}
        <Card shadow="sm" p={0} radius="md" withBorder>
          {isLoading ? (
            <Center p="xl">
              <Stack align="center" gap="md">
                <Loader size="xl" />
                <Text>Loading employees...</Text>
              </Stack>
            </Center>
          ) : isMobile ? (
            // Mobile Card View
            <ScrollArea p="md">
              <Stack gap="sm">
                {paginatedEmployees.length > 0 ? (
                  paginatedEmployees.map((employee, index) => (
                    <MobileEmployeeCard
                      key={employee._id}
                      employee={employee}
                      index={index}
                      activePage={activePage}
                      itemsPerPage={itemsPerPage}
                      onEdit={handleEmployeeEdit}
                      onPackage={handlePackageUpdate}
                      onTimesheet={handleTimesheet}
                    />
                  ))
                ) : (
                  <Card p="xl" withBorder>
                    <Stack align="center" gap="md">
                      <Text size="lg" ta="center">
                        No employees found
                      </Text>
                      <Text size="sm" ta="center">
                        {searchQuery || roleFilter
                          ? 'Try adjusting your search or filters'
                          : 'Start by adding your first employee'}
                      </Text>
                      {!searchQuery && !roleFilter && (
                        <Button
                          variant="light"
                          leftSection={<IconPlus size={16} />}
                          onClick={handleAddEmployee}
                          fullWidth={isSmallMobile}
                        >
                          Add Employee
                        </Button>
                      )}
                    </Stack>
                  </Card>
                )}
              </Stack>
            </ScrollArea>
          ) : (
            // Desktop/Tablet Table View
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
                overflowX: 'auto'
              }}
            >
              <Table stickyHeader withTableBorder withColumnBorders>
                <TableHeader
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  themeConfig={currentThemeConfig}
                  isTablet={isTablet}
                />
                <Table.Tbody>
                  {paginatedEmployees.length > 0 ? (
                    paginatedEmployees.map((employee, index) => (
                      <Table.Tr
                        key={employee._id}
                        id={`employee-${employee._id}`}
                        className="transition-colors"
                      >
                        <Table.Td className="text-center p-3">
                          <Text size="sm">
                            {index + 1 + (activePage - 1) * itemsPerPage}
                          </Text>
                        </Table.Td>
                        <Table.Td className="p-3">
                          <Text size="sm" fw={500}>
                            {employee.employeeId || 'N/A'}
                          </Text>
                        </Table.Td>
                        <Table.Td className="p-3">
                          <Text size="sm">{employee.firstName}</Text>
                        </Table.Td>
                        {!isTablet && (
                          <Table.Td className="p-3">
                            <Text size="sm">{employee.lastName}</Text>
                          </Table.Td>
                        )}
                        <Table.Td className="p-3">
                          <Text size="sm" truncate>
                            {isTablet
                              ? employee.email.slice(0, 15) + '...'
                              : employee.email.slice(0, 20)}
                          </Text>
                        </Table.Td>
                        {!isTablet && (
                          <Table.Td className="p-3 text-center">
                            <Text size="sm">{employee.mobileNumber}</Text>
                          </Table.Td>
                        )}
                        <Table.Td className="p-3 text-center">
                          <Badge size="sm">{employee.userRole || 'N/A'}</Badge>
                        </Table.Td>
                        {!isTablet && (
                          <>
                            <Table.Td className="p-3 text-center">
                              <Text size="sm">
                                {employee.employmentType?.employmentType ||
                                  'N/A'}
                              </Text>
                            </Table.Td>
                            <Table.Td className="p-3 text-center">
                              <Badge size="sm">
                                {employee.bloodGroup?.type || 'N/A'}
                              </Badge>
                            </Table.Td>
                          </>
                        )}
                        <Table.Td className="p-3">
                          <Stack gap={4}>
                            {employee.employeeRole
                              ?.slice(0, isTablet ? 1 : 3)
                              .map(role => (
                                <Badge key={role._id} size="xs">
                                  {isTablet
                                    ? role.designation.slice(0, 10) + '...'
                                    : role.designation}
                                </Badge>
                              ))}
                            {employee.employeeRole &&
                              employee.employeeRole.length >
                                (isTablet ? 1 : 3) && (
                                <Badge size="xs" variant="light">
                                  +
                                  {employee.employeeRole.length -
                                    (isTablet ? 1 : 3)}{' '}
                                  more
                                </Badge>
                              )}
                          </Stack>
                        </Table.Td>
                        <Table.Td className="p-3">
                          <EmployeeActions
                            employeeId={employee._id}
                            onEdit={handleEmployeeEdit}
                            onPackage={handlePackageUpdate}
                            onTimesheet={handleTimesheet}
                          />
                        </Table.Td>
                      </Table.Tr>
                    ))
                  ) : (
                    <Table.Tr>
                      <Table.Td
                        colSpan={isTablet ? 8 : 11}
                        className="text-center p-8"
                      >
                        <Stack align="center" gap="md">
                          <Text size="lg">No employees found</Text>
                          <Text size="sm">
                            {searchQuery || roleFilter
                              ? 'Try adjusting your search or filters'
                              : 'Start by adding your first employee'}
                          </Text>
                          {!searchQuery && !roleFilter && (
                            <Button
                              variant="light"
                              leftSection={<IconPlus size={16} />}
                              onClick={handleAddEmployee}
                            >
                              Add Employee
                            </Button>
                          )}
                        </Stack>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
            </div>
          )}
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <Center>
            <Pagination
              value={activePage}
              onChange={setActivePage}
              total={totalPages}
              size={isMobile ? 'sm' : 'md'}
              radius="md"
              withEdges
            />
          </Center>
        )}
      </Stack>
    </Container>
  );
};

export default Employees;
