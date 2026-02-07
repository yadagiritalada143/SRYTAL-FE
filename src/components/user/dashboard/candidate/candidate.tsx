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
  IconSearch,
  IconPlus,
  IconEdit,
  IconUser,
  IconSortAscending,
  IconSortDescending
} from '@tabler/icons-react';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllPoolCandidatesByEmployee } from '../../../../services/user-services';
import {
  commonUrls,
  organizationAdminUrls,
  organizationEmployeeUrls
} from '../../../../utils/common/constants';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { themeAtom } from '../../../../atoms/theme';
import moment from 'moment';
import useHorizontalScroll from '../../../../hooks/horizontal-scroll';
import { CandidateInterface } from '../../../../interfaces/candidate';
import { debounce } from '../../../../utils/common/debounce';
import { useMediaQuery } from '@mantine/hooks';

// Constants
const ITEMS_PER_PAGE_OPTIONS = ['5', '10', '20', '50'];
const DEFAULT_ITEMS_PER_PAGE = 10;

// Types
type SortField = 'candidateName' | 'createdAt' | 'totalYearsOfExperience';
type SortOrder = 'asc' | 'desc';

interface SortConfig {
  field: SortField;
  order: SortOrder;
}

// Custom hook for candidate filtering and sorting
const useCandidateFilters = (candidates: CandidateInterface[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'candidateName',
    order: 'asc'
  });

  const filteredAndSortedCandidates = useMemo(() => {
    let filtered = candidates;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = candidates.filter(
        (candidate: any) =>
          candidate.candidateName?.toLowerCase().includes(query) ||
          candidate.contact?.email?.toLowerCase().includes(query) ||
          candidate.contact?.phone?.toString().includes(query) ||
          candidate.evaluatedSkills?.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    return [...filtered].sort((a: any, b: any) => {
      let aValue: any = '';
      let bValue: any = '';

      if (sortConfig.field === 'createdAt') {
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
      } else if (sortConfig.field === 'totalYearsOfExperience') {
        aValue = Number(a.totalYearsOfExperience) || 0;
        bValue = Number(b.totalYearsOfExperience) || 0;
      } else {
        aValue = a[sortConfig.field]?.toString().toLowerCase() || '';
        bValue = b[sortConfig.field]?.toString().toLowerCase() || '';
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortConfig.order === 'asc' ? comparison : -comparison;
      } else {
        return sortConfig.order === 'asc' ? aValue - bValue : bValue - aValue;
      }
    });
  }, [candidates, searchQuery, sortConfig]);

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
    filteredCandidates: filteredAndSortedCandidates
  };
};

// Candidate Actions Component
const CandidateActions: React.FC<{
  candidateId: string;
  onEdit: (id: string) => void;
  isMobile?: boolean;
}> = ({ candidateId, onEdit, isMobile = false }) => (
  <Group gap="xs" justify="center">
    <Tooltip label="Edit Candidate">
      <ActionIcon
        variant="subtle"
        color="blue"
        onClick={() => onEdit(candidateId)}
        size={isMobile ? 'md' : 'sm'}
      >
        <IconEdit size={isMobile ? 18 : 16} />
      </ActionIcon>
    </Tooltip>
  </Group>
);

// Mobile Candidate Card Component
const MobileCandidateCard: React.FC<{
  candidate: any;
  index: number;
  activePage: number;
  itemsPerPage: number;
  onEdit: (id: string) => void;
}> = ({ candidate, index, activePage, itemsPerPage, onEdit }) => {
  return (
    <Card
      key={candidate._id}
      id={`candidate-${candidate._id}`}
      shadow="sm"
      p="md"
      mb="sm"
      withBorder
    >
      <Stack gap="sm">
        <Group justify="space-between" align="center">
          <Badge variant="filled" color="blue">
            #{index + 1 + (activePage - 1) * itemsPerPage}
          </Badge>
          <ActionIcon
            variant="subtle"
            color="blue"
            onClick={() => onEdit(candidate._id)}
            size="md"
          >
            <IconEdit size={18} />
          </ActionIcon>
        </Group>

        <Divider />

        <Stack gap={2}>
          <Text size="xs" fw={600} c="dimmed">
            Candidate Name
          </Text>
          <Text size="lg" fw={700}>
            {candidate.candidateName}
          </Text>
        </Stack>

        <Group grow>
          <Stack gap={2}>
            <Text size="xs" fw={600} c="dimmed">
              Email
            </Text>
            <Text size="sm" lineClamp={1}>
              {candidate.contact?.email || 'N/A'}
            </Text>
          </Stack>
        </Group>

        <Group grow>
          <Stack gap={2}>
            <Text size="xs" fw={600} c="dimmed">
              Phone
            </Text>
            <Text size="sm">{candidate.contact?.phone || 'N/A'}</Text>
          </Stack>
          <Stack gap={2}>
            <Text size="xs" fw={600} c="dimmed">
              Experience
            </Text>
            <Badge size="sm" variant="light" color="teal">
              {candidate.totalYearsOfExperience || '0'} years
            </Badge>
          </Stack>
        </Group>

        <Divider />

        <Stack gap={2}>
          <Text size="xs" fw={600} c="dimmed">
            Created By
          </Text>
          <Text size="sm">
            {candidate.createdBy?.firstName || ''}{' '}
            {candidate.createdBy?.lastName || 'N/A'}
          </Text>
        </Stack>

        <Stack gap={2}>
          <Text size="xs" fw={600} c="dimmed">
            Created At
          </Text>
          <Text size="sm">
            {moment(new Date(candidate.createdAt)).format('MMM DD, YYYY')}
          </Text>
        </Stack>

        {candidate.comments?.length > 0 && (
          <>
            <Divider />
            <Stack gap={2}>
              <Text size="xs" fw={600} c="dimmed">
                Latest Comment By
              </Text>
              <Text size="sm">
                {candidate.comments[0].userId?.firstName}{' '}
                {candidate.comments[0].userId?.lastName}
              </Text>
            </Stack>
            <Stack gap={2}>
              <Text size="xs" fw={600} c="dimmed">
                Latest Comment At
              </Text>
              <Text size="sm">
                {moment(new Date(candidate.comments[0].updateAt)).format(
                  'MMM DD, YYYY'
                )}
              </Text>
            </Stack>
          </>
        )}
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
        <SortableHeader field="candidateName">Name</SortableHeader>
        {!isTablet && (
          <>
            <Table.Th className="p-3 border text-center">
              <Text size="sm" fw={500}>
                Email
              </Text>
            </Table.Th>
            <Table.Th className="p-3 border text-center">
              <Text size="sm" fw={500}>
                Phone
              </Text>
            </Table.Th>
          </>
        )}
        <SortableHeader field="totalYearsOfExperience">
          Experience
        </SortableHeader>
        {!isTablet && (
          <>
            <Table.Th className="p-3 border text-center">
              <Text size="sm" fw={500}>
                Created By
              </Text>
            </Table.Th>
            <SortableHeader field="createdAt">Created At</SortableHeader>
            <Table.Th className="p-3 border text-center">
              <Text size="sm" fw={500}>
                Latest Comment By
              </Text>
            </Table.Th>
            <Table.Th className="p-3 border text-center">
              <Text size="sm" fw={500}>
                Latest Comment At
              </Text>
            </Table.Th>
          </>
        )}
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
  filteredCount: number;
  handleAddCandidate: () => void;
  isMobile?: boolean;
}> = ({ filteredCount = 0, handleAddCandidate, isMobile = false }) => (
  <Card shadow="sm" p={isMobile ? 'md' : 'lg'} radius="md" withBorder mt="xl">
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
        Manage Candidates ({filteredCount} candidates)
      </Text>
      <Button
        leftSection={<IconPlus size={16} />}
        onClick={handleAddCandidate}
        variant="filled"
        fullWidth={isMobile}
        size={isMobile ? 'md' : 'sm'}
      >
        Add Candidate
      </Button>
    </Flex>
  </Card>
);

const PoolCandidateList = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<CandidateInterface[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isDarkTheme = useRecoilValue(themeAtom);
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');

  // Get the current theme configuration
  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;
    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);

  const highlightCandidateId = useRef<string | null>(null);

  const {
    searchQuery,
    setSearchQuery,
    sortConfig,
    handleSort,
    filteredCandidates
  } = useCandidateFilters(candidates);

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
  const { paginatedCandidates, totalPages } = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginated = filteredCandidates.slice(start, end);
    const pages = Math.ceil(filteredCandidates.length / itemsPerPage);

    return { paginatedCandidates: paginated, totalPages: pages };
  }, [filteredCandidates, activePage, itemsPerPage]);

  // Data fetching
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const candidatesList = await getAllPoolCandidatesByEmployee();
        setCandidates(candidatesList);
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || 'Failed to load candidates';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setActivePage(1);
  }, [searchQuery, itemsPerPage]);

  // Candidate highlighting logic
  useEffect(() => {
    const selectedCandidateId = localStorage.getItem('id');
    if (!selectedCandidateId || filteredCandidates.length === 0) return;

    const candidateIndex = filteredCandidates.findIndex(
      (cand: any) => cand._id === selectedCandidateId
    );

    if (candidateIndex === -1) return;

    const targetPage = Math.floor(candidateIndex / itemsPerPage) + 1;
    setActivePage(targetPage);
    highlightCandidateId.current = selectedCandidateId;

    const timer = setTimeout(() => {
      const element = document.getElementById(
        `candidate-${selectedCandidateId}`
      );
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.style.backgroundColor = `${currentThemeConfig.button.color}50`;
        element.style.color = `${currentThemeConfig.button.textColor}70`;

        setTimeout(() => {
          localStorage.removeItem('id');
          element.style.backgroundColor =
            currentThemeConfig.headerBackgroundColor;
          element.style.color = currentThemeConfig.color;
          highlightCandidateId.current = null;
        }, 2000);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [
    filteredCandidates,
    itemsPerPage,
    currentThemeConfig.headerBackgroundColor,
    currentThemeConfig.color,
    currentThemeConfig.button.color,
    currentThemeConfig.button.textColor
  ]);

  // Navigation handlers
  const handleCandidateEdit = useCallback(
    (candidateId: string) => {
      localStorage.setItem('id', candidateId);
      if (localStorage.getItem('userRole') === 'admin') {
        navigate(
          `${organizationAdminUrls(
            organizationConfig.organization_name
          )}/dashboard/${candidateId}/edit-pool-candidate`
        );
      } else {
        navigate(
          `${organizationEmployeeUrls(
            organizationConfig.organization_name
          )}/dashboard/${candidateId}/edit-pool-candidate`
        );
      }
    },
    [navigate, organizationConfig.organization_name]
  );

  const handleAddCandidate = useCallback(() => {
    navigate(
      `${commonUrls(
        organizationConfig.organization_name
      )}/dashboard/add-pool-candidate`
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
          filteredCount={filteredCandidates.length}
          handleAddCandidate={handleAddCandidate}
          isMobile={isMobile}
        />

        {/* Filters */}
        <Card shadow="sm" p={isMobile ? 'sm' : 'md'} radius="md" withBorder>
          <Stack gap="md">
            <TextInput
              placeholder="Search by name, email, phone, or skills..."
              leftSection={<IconSearch size={16} />}
              onChange={e => debouncedSearch(e.target.value)}
              radius="md"
              size={isMobile ? 'sm' : 'md'}
            />

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

              {filteredCandidates.length !== candidates.length && (
                <Badge variant="light" color="blue">
                  {filteredCandidates.length} of {candidates.length} candidates
                </Badge>
              )}
            </Group>
          </Stack>
        </Card>

        {/* Table or Cards */}
        <Card shadow="sm" p={0} radius="md" withBorder>
          {isLoading ? (
            <Center p="xl">
              <Stack align="center" gap="md">
                <Loader size="xl" />
                <Text>Loading candidates...</Text>
              </Stack>
            </Center>
          ) : isMobile ? (
            // Mobile Card View
            <ScrollArea p="md">
              <Stack gap="sm">
                {paginatedCandidates.length > 0 ? (
                  paginatedCandidates.map((candidate: any, index: number) => (
                    <MobileCandidateCard
                      key={candidate._id}
                      candidate={candidate}
                      index={index}
                      activePage={activePage}
                      itemsPerPage={itemsPerPage}
                      onEdit={handleCandidateEdit}
                    />
                  ))
                ) : (
                  <Card p="xl" withBorder>
                    <Stack align="center" gap="md">
                      <IconUser size={48} opacity={0.5} />
                      <Text size="lg" ta="center">
                        No candidates found
                      </Text>
                      <Text size="sm" ta="center">
                        {searchQuery
                          ? 'Try adjusting your search'
                          : 'Start by adding your first candidate'}
                      </Text>
                      {!searchQuery && (
                        <Button
                          variant="light"
                          leftSection={<IconPlus size={16} />}
                          onClick={handleAddCandidate}
                          fullWidth={isSmallMobile}
                        >
                          Add Candidate
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
                  {paginatedCandidates.length > 0 ? (
                    paginatedCandidates.map((candidate: any, index: number) => (
                      <Table.Tr
                        key={candidate._id}
                        id={`candidate-${candidate._id}`}
                        className="transition-colors"
                      >
                        <Table.Td className="text-center p-3">
                          <Text size="sm">
                            {index + 1 + (activePage - 1) * itemsPerPage}
                          </Text>
                        </Table.Td>
                        <Table.Td className="p-3">
                          <Text size="sm" fw={500}>
                            {candidate.candidateName}
                          </Text>
                        </Table.Td>
                        {!isTablet && (
                          <>
                            <Table.Td className="p-3">
                              <Text size="sm" truncate>
                                {candidate.contact?.email || 'N/A'}
                              </Text>
                            </Table.Td>
                            <Table.Td className="p-3">
                              <Text size="sm">
                                {candidate.contact?.phone || 'N/A'}
                              </Text>
                            </Table.Td>
                          </>
                        )}
                        <Table.Td className="p-3 text-center">
                          <Badge size="sm" variant="light" color="teal">
                            {candidate.totalYearsOfExperience || '0'} years
                          </Badge>
                        </Table.Td>
                        {!isTablet && (
                          <>
                            <Table.Td className="p-3">
                              <Text size="sm">
                                {candidate.createdBy?.firstName || ''}{' '}
                                {candidate.createdBy?.lastName || 'N/A'}
                              </Text>
                            </Table.Td>
                            <Table.Td className="p-3">
                              <Text size="sm">
                                {moment(new Date(candidate.createdAt)).format(
                                  'MMM DD, YYYY'
                                )}
                              </Text>
                            </Table.Td>
                            <Table.Td className="p-3">
                              <Text size="sm">
                                {candidate.comments?.length
                                  ? `${candidate.comments[0].userId?.firstName} ${candidate.comments[0].userId?.lastName}`
                                  : 'N/A'}
                              </Text>
                            </Table.Td>
                            <Table.Td className="p-3">
                              <Text size="sm">
                                {candidate.comments?.length
                                  ? moment(
                                      new Date(candidate.comments[0].updateAt)
                                    ).format('MMM DD, YYYY')
                                  : 'N/A'}
                              </Text>
                            </Table.Td>
                          </>
                        )}
                        <Table.Td className="p-3">
                          <CandidateActions
                            candidateId={candidate._id}
                            onEdit={handleCandidateEdit}
                          />
                        </Table.Td>
                      </Table.Tr>
                    ))
                  ) : (
                    <Table.Tr>
                      <Table.Td
                        colSpan={isTablet ? 4 : 10}
                        className="text-center p-8"
                      >
                        <Stack align="center" gap="md">
                          <IconUser size={48} opacity={0.5} />
                          <Text size="lg">No candidates found</Text>
                          <Text size="sm">
                            {searchQuery
                              ? 'Try adjusting your search'
                              : 'Start by adding your first candidate'}
                          </Text>
                          {!searchQuery && (
                            <Button
                              variant="light"
                              leftSection={<IconPlus size={16} />}
                              onClick={handleAddCandidate}
                            >
                              Add Candidate
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

export default PoolCandidateList;
