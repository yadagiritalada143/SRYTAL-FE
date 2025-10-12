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
  IconBuildings,
  IconUserEdit,
  IconSearch,
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
import { getCompanyDetails } from '../../../../services/user-services';
import { toast } from 'react-toastify';
import { commonUrls } from '../../../../utils/common/constants';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { themeAtom } from '../../../../atoms/theme';
import useHorizontalScroll from '../../../../hooks/horizontal-scroll';
import { debounce } from '../../../../utils/common/debounce';
import { CompaniesInterface } from '../../../../interfaces/companies';
import moment from 'moment';
import { useMediaQuery } from '@mantine/hooks';

// Constants
const ITEMS_PER_PAGE_OPTIONS = ['5', '10', '20', '50'];
const DEFAULT_ITEMS_PER_PAGE = 10;

// Types
type SortField = 'companyName' | 'status' | 'lastUpdatedAt';
type SortOrder = 'asc' | 'desc';

interface SortConfig {
  field: SortField;
  order: SortOrder;
}

// Custom hook for company filtering and sorting
const useCompanyFilters = (companies: CompaniesInterface[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'companyName',
    order: 'asc'
  });
  const [statusFilter, setStatusFilter] = useState<string>('');

  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = companies;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = companies.filter(
        company =>
          company.companyName.toLowerCase().includes(query) ||
          company.primaryContact.name.toLowerCase().includes(query) ||
          company.primaryContact.email.toLowerCase().includes(query) ||
          company.primaryContact.phone.toString().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(
        company => company.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Apply sorting
    return [...filtered].sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      if (sortConfig.field === 'lastUpdatedAt') {
        aValue = new Date(a.lastUpdatedAt).getTime();
        bValue = new Date(b.lastUpdatedAt).getTime();
      } else {
        aValue =
          (a[sortConfig.field] as string)?.toString().toLowerCase() || '';
        bValue =
          (b[sortConfig.field] as string)?.toString().toLowerCase() || '';
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortConfig.order === 'asc' ? comparison : -comparison;
      } else {
        return sortConfig.order === 'asc'
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });
  }, [companies, searchQuery, sortConfig, statusFilter]);

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
    statusFilter,
    setStatusFilter,
    filteredCompanies: filteredAndSortedCompanies
  };
};

// Company Actions Component
const CompanyActions: React.FC<{
  companyId: string;
  onEdit: (id: string) => void;
  isMobile?: boolean;
}> = ({ companyId, onEdit, isMobile = false }) => (
  <Group gap="xs" justify="center">
    <Tooltip label="Edit Company Details">
      <ActionIcon
        variant="subtle"
        color="blue"
        onClick={() => onEdit(companyId)}
        size={isMobile ? 'md' : 'sm'}
      >
        <Group gap={4}>
          <IconBuildings size={isMobile ? 18 : 16} />
          <IconUserEdit size={isMobile ? 18 : 16} />
        </Group>
      </ActionIcon>
    </Tooltip>
  </Group>
);

// Mobile Company Card Component
const MobileCompanyCard: React.FC<{
  company: CompaniesInterface;
  index: number;
  activePage: number;
  itemsPerPage: number;
  onEdit: (id: string) => void;
}> = ({ company, index, activePage, itemsPerPage, onEdit }) => {
  return (
    <Card
      key={company.id}
      id={`company-${company.id}`}
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
            {company.status || 'N/A'}
          </Badge>
        </Group>

        <Divider />

        {/* Company Name */}
        <Stack gap={2}>
          <Text size="xs" fw={600} c="dimmed">
            Company Name
          </Text>
          <Text size="lg" fw={700}>
            {company.companyName}
          </Text>
        </Stack>

        <Divider />

        {/* Primary Contact */}
        <Stack gap={4}>
          <Text size="xs" fw={600} c="dimmed">
            Primary Contact
          </Text>
          <Group grow>
            <Stack gap={2}>
              <Text size="xs" c="dimmed">
                Name
              </Text>
              <Text size="sm">{company.primaryContact.name}</Text>
            </Stack>
          </Group>
          <Stack gap={2}>
            <Text size="xs" c="dimmed">
              Email
            </Text>
            <Text size="sm" lineClamp={1}>
              {company.primaryContact.email}
            </Text>
          </Stack>
          <Stack gap={2}>
            <Text size="xs" c="dimmed">
              Phone
            </Text>
            <Text size="sm">{company.primaryContact.phone}</Text>
          </Stack>
        </Stack>

        <Divider />

        {/* Secondary Contact 1 */}
        <Stack gap={4}>
          <Text size="xs" fw={600} c="dimmed">
            Secondary Contact 1
          </Text>
          <Group grow>
            <Stack gap={2}>
              <Text size="xs" c="dimmed">
                Name
              </Text>
              <Text size="sm">{company.secondaryContact_1.name || 'N/A'}</Text>
            </Stack>
          </Group>
          <Stack gap={2}>
            <Text size="xs" c="dimmed">
              Email
            </Text>
            <Text size="sm" lineClamp={1}>
              {company.secondaryContact_1.email || 'N/A'}
            </Text>
          </Stack>
          <Stack gap={2}>
            <Text size="xs" c="dimmed">
              Phone
            </Text>
            <Text size="sm">{company.secondaryContact_1.phone || 'N/A'}</Text>
          </Stack>
        </Stack>

        <Divider />

        {/* Secondary Contact 2 */}
        <Stack gap={4}>
          <Text size="xs" fw={600} c="dimmed">
            Secondary Contact 2
          </Text>
          <Group grow>
            <Stack gap={2}>
              <Text size="xs" c="dimmed">
                Name
              </Text>
              <Text size="sm">{company.secondaryContact_2.name || 'N/A'}</Text>
            </Stack>
          </Group>
          <Stack gap={2}>
            <Text size="xs" c="dimmed">
              Email
            </Text>
            <Text size="sm" lineClamp={1}>
              {company.secondaryContact_2.email || 'N/A'}
            </Text>
          </Stack>
          <Stack gap={2}>
            <Text size="xs" c="dimmed">
              Phone
            </Text>
            <Text size="sm">{company.secondaryContact_2.phone || 'N/A'}</Text>
          </Stack>
        </Stack>

        <Divider />

        {/* Last Update */}
        <Stack gap={2}>
          <Text size="xs" fw={600} c="dimmed">
            Last Updated
          </Text>
          <Text size="sm">
            {moment(company.lastUpdatedAt).format('DD MMM YYYY')}
          </Text>
        </Stack>

        <Divider />

        {/* Actions */}
        <Card.Section withBorder mt="sm" p="md" style={{ borderRadius: '8px' }}>
          <CompanyActions companyId={company.id} onEdit={onEdit} isMobile />
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
    rowSpan?: number;
  }> = ({ field, children, rowSpan = 2 }) => (
    <Table.Th
      className="border cursor-pointer select-none hover:bg-opacity-80 transition-colors"
      onClick={() => onSort(field)}
      rowSpan={rowSpan}
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
          rowSpan={2}
          style={{ minWidth: '60px' }}
        >
          <Text size="sm" fw={500}>
            S.No
          </Text>
        </Table.Th>
        <SortableHeader field="companyName">Company Name</SortableHeader>
        {!isTablet && (
          <>
            <Table.Th className="p-3 border text-center" colSpan={3}>
              <Text size="sm" fw={500}>
                Primary Contact
              </Text>
            </Table.Th>
            <Table.Th className="p-3 border text-center" colSpan={3}>
              <Text size="sm" fw={500}>
                Secondary Contact 1
              </Text>
            </Table.Th>
            <Table.Th className="p-3 border text-center" colSpan={3}>
              <Text size="sm" fw={500}>
                Secondary Contact 2
              </Text>
            </Table.Th>
          </>
        )}
        <SortableHeader field="status">Status</SortableHeader>
        <SortableHeader field="lastUpdatedAt">Last Update</SortableHeader>
        <Table.Th className="p-3 border text-center" rowSpan={2}>
          <Text size="sm" fw={500}>
            Actions
          </Text>
        </Table.Th>
      </Table.Tr>
      {!isTablet && (
        <Table.Tr>
          <Table.Th className="p-2 border text-center">
            <Text size="xs" fw={500}>
              Name
            </Text>
          </Table.Th>
          <Table.Th className="p-2 border text-center">
            <Text size="xs" fw={500}>
              Email
            </Text>
          </Table.Th>
          <Table.Th className="p-2 border text-center">
            <Text size="xs" fw={500}>
              Phone
            </Text>
          </Table.Th>
          <Table.Th className="p-2 border text-center">
            <Text size="xs" fw={500}>
              Name
            </Text>
          </Table.Th>
          <Table.Th className="p-2 border text-center">
            <Text size="xs" fw={500}>
              Email
            </Text>
          </Table.Th>
          <Table.Th className="p-2 border text-center">
            <Text size="xs" fw={500}>
              Phone
            </Text>
          </Table.Th>
          <Table.Th className="p-2 border text-center">
            <Text size="xs" fw={500}>
              Name
            </Text>
          </Table.Th>
          <Table.Th className="p-2 border text-center">
            <Text size="xs" fw={500}>
              Email
            </Text>
          </Table.Th>
          <Table.Th className="p-2 border text-center">
            <Text size="xs" fw={500}>
              Phone
            </Text>
          </Table.Th>
        </Table.Tr>
      )}
    </Table.Thead>
  );
};

const HeadingComponent: React.FC<{
  filteredCompanies: number;
  handleAddCompany: () => void;
  isMobile?: boolean;
}> = ({ filteredCompanies = 0, handleAddCompany, isMobile = false }) => (
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
        Manage Pool Companies ({filteredCompanies} companies)
      </Text>
      <Button
        leftSection={<IconPlus size={16} />}
        onClick={handleAddCompany}
        variant="filled"
        fullWidth={isMobile}
        size={isMobile ? 'md' : 'sm'}
      >
        Add Company
      </Button>
    </Flex>
  </Card>
);

const Companies = () => {
  const [companies, setCompanies] = useState<CompaniesInterface[]>([]);
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

  const highlightCompanyId = useRef<string | null>(null);

  const {
    searchQuery,
    setSearchQuery,
    sortConfig,
    handleSort,
    statusFilter,
    setStatusFilter,
    filteredCompanies
  } = useCompanyFilters(companies);

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
  const { paginatedCompanies, totalPages } = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginated = filteredCompanies.slice(start, end);
    const pages = Math.ceil(filteredCompanies.length / itemsPerPage);

    return { paginatedCompanies: paginated, totalPages: pages };
  }, [filteredCompanies, activePage, itemsPerPage]);

  // Unique statuses for filter
  const uniqueStatuses = useMemo(() => {
    const statuses = companies.map(comp => comp.status).filter(Boolean);
    return Array.from(new Set(statuses));
  }, [companies]);

  // Data fetching
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const companiesList = await getCompanyDetails();
        setCompanies(companiesList);
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || 'Failed to load companies';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setActivePage(1);
  }, [searchQuery, statusFilter, itemsPerPage]);

  // Company highlighting logic
  useEffect(() => {
    const selectedCompanyId = localStorage.getItem('id');
    if (!selectedCompanyId || filteredCompanies.length === 0) return;

    const companyIndex = filteredCompanies.findIndex(
      comp => comp.id === selectedCompanyId
    );

    if (companyIndex === -1) return;

    const targetPage = Math.floor(companyIndex / itemsPerPage) + 1;
    setActivePage(targetPage);
    highlightCompanyId.current = selectedCompanyId;

    const timer = setTimeout(() => {
      const element = document.getElementById(`company-${selectedCompanyId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.style.backgroundColor = `${currentThemeConfig.button.color}50`;
        element.style.color = `${currentThemeConfig.button.textColor}70`;

        setTimeout(() => {
          localStorage.removeItem('id');
          element.style.backgroundColor =
            currentThemeConfig.headerBackgroundColor;
          element.style.color = currentThemeConfig.color;
          highlightCompanyId.current = null;
        }, 2000);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [
    filteredCompanies,
    itemsPerPage,
    currentThemeConfig.headerBackgroundColor,
    currentThemeConfig.color,
    currentThemeConfig.button.color,
    currentThemeConfig.button.textColor
  ]);

  // Navigation handlers
  const handleCompanyEdit = useCallback(
    (companyId: string) => {
      localStorage.setItem('id', companyId);
      navigate(
        `${commonUrls(organizationConfig.organization_name)}/dashboard/update-pool-company/${companyId}`
      );
    },
    [navigate, organizationConfig.organization_name]
  );

  const handleAddCompany = useCallback(() => {
    navigate(
      `${commonUrls(organizationConfig.organization_name)}/dashboard/add-pool-companies`
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
          filteredCompanies={filteredCompanies.length}
          handleAddCompany={handleAddCompany}
          isMobile={isMobile}
        />

        {/* Filters */}
        <Card shadow="sm" p={isMobile ? 'sm' : 'md'} radius="md" withBorder>
          <Stack gap="md">
            <Group grow={!isMobile}>
              <TextInput
                placeholder="Search by company name, contact name, email, or phone..."
                leftSection={<IconSearch size={16} />}
                onChange={e => debouncedSearch(e.target.value)}
                radius="md"
                size={isMobile ? 'sm' : 'md'}
              />
              <Select
                placeholder="Filter by status"
                data={uniqueStatuses.map(status => ({
                  value: status,
                  label: status
                }))}
                value={statusFilter}
                onChange={value => setStatusFilter(value ?? '')}
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

              {filteredCompanies.length !== companies.length && (
                <Badge variant="light" color="blue">
                  {filteredCompanies.length} of {companies.length} companies
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
                <Text>Loading companies...</Text>
              </Stack>
            </Center>
          ) : isMobile ? (
            // Mobile Card View
            <ScrollArea p="md">
              <Stack gap="sm">
                {paginatedCompanies.length > 0 ? (
                  paginatedCompanies.map((company, index) => (
                    <MobileCompanyCard
                      key={company.id}
                      company={company}
                      index={index}
                      activePage={activePage}
                      itemsPerPage={itemsPerPage}
                      onEdit={handleCompanyEdit}
                    />
                  ))
                ) : (
                  <Card p="xl" withBorder>
                    <Stack align="center" gap="md">
                      <Text size="lg" ta="center">
                        No companies found
                      </Text>
                      <Text size="sm" ta="center">
                        {searchQuery || statusFilter
                          ? 'Try adjusting your search or filters'
                          : 'Start by adding your first company'}
                      </Text>
                      {!searchQuery && !statusFilter && (
                        <Button
                          variant="light"
                          leftSection={<IconPlus size={16} />}
                          onClick={handleAddCompany}
                          fullWidth={isSmallMobile}
                        >
                          Add Company
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
                  {paginatedCompanies.length > 0 ? (
                    paginatedCompanies.map((company, index) => (
                      <Table.Tr
                        key={company.id}
                        id={`company-${company.id}`}
                        className="transition-colors"
                      >
                        <Table.Td className="text-center p-3">
                          <Text size="sm">
                            {index + 1 + (activePage - 1) * itemsPerPage}
                          </Text>
                        </Table.Td>
                        <Table.Td className="p-3">
                          <Text size="sm" fw={500}>
                            {company.companyName}
                          </Text>
                        </Table.Td>
                        {!isTablet && (
                          <>
                            <Table.Td className="p-3">
                              <Text size="sm">
                                {company.primaryContact.name}
                              </Text>
                            </Table.Td>
                            <Table.Td className="p-3">
                              <Text size="sm" truncate>
                                {company.primaryContact.email}
                              </Text>
                            </Table.Td>
                            <Table.Td className="p-3">
                              <Text size="sm">
                                {company.primaryContact.phone}
                              </Text>
                            </Table.Td>
                            <Table.Td className="p-3">
                              <Text size="sm">
                                {company.secondaryContact_1.name || 'N/A'}
                              </Text>
                            </Table.Td>
                            <Table.Td className="p-3">
                              <Text size="sm" truncate>
                                {company.secondaryContact_1.email || 'N/A'}
                              </Text>
                            </Table.Td>
                            <Table.Td className="p-3">
                              <Text size="sm">
                                {company.secondaryContact_1.phone || 'N/A'}
                              </Text>
                            </Table.Td>
                            <Table.Td className="p-3">
                              <Text size="sm">
                                {company.secondaryContact_2.name || 'N/A'}
                              </Text>
                            </Table.Td>
                            <Table.Td className="p-3">
                              <Text size="sm" truncate>
                                {company.secondaryContact_2.email || 'N/A'}
                              </Text>
                            </Table.Td>
                            <Table.Td className="p-3">
                              <Text size="sm">
                                {company.secondaryContact_2.phone || 'N/A'}
                              </Text>
                            </Table.Td>
                          </>
                        )}
                        <Table.Td className="p-3 text-center">
                          <Text size="sm">{company.status || 'N/A'}</Text>
                        </Table.Td>

                        <Table.Td className="p-3 text-center">
                          <Text size="sm">
                            {moment(company.lastUpdatedAt).format(
                              'DD MMM YYYY'
                            )}
                          </Text>
                        </Table.Td>
                        <Table.Td className="p-3">
                          <CompanyActions
                            companyId={company.id}
                            onEdit={handleCompanyEdit}
                          />
                        </Table.Td>
                      </Table.Tr>
                    ))
                  ) : (
                    <Table.Tr>
                      <Table.Td
                        colSpan={isTablet ? 5 : 14}
                        className="text-center p-8"
                      >
                        <Stack align="center" gap="md">
                          <Text size="lg">No companies found</Text>
                          <Text size="sm">
                            {searchQuery || statusFilter
                              ? 'Try adjusting your search or filters'
                              : 'Start by adding your first company'}
                          </Text>
                          {!searchQuery && !statusFilter && (
                            <Button
                              variant="light"
                              leftSection={<IconPlus size={16} />}
                              onClick={handleAddCompany}
                            >
                              Add Company
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

export default Companies;
