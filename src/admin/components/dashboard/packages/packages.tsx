import {
  Button,
  Loader,
  Tooltip,
  Center,
  Pagination,
  Card,
  Stack,
  Text,
  TextInput,
  Group,
  Badge,
  Table,
  ScrollArea,
  Container,
  Flex,
  Divider,
  ActionIcon,
  Select
} from '@mantine/core';
import {
  IconEdit,
  IconPlus,
  IconSearch,
  IconPackage,
  IconSortAscending,
  IconSortDescending
} from '@tabler/icons-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PackageInterface } from '@interfaces/package';
import { organizationAdminUrls } from '@utils/common/constants';
import useHorizontalScroll from '@hooks/horizontal-scroll';
import moment from 'moment';
import { useMediaQuery } from '@mantine/hooks';
import DataView from '@components/common/loaders/DataView';
import { debounce } from '@utils/common/debounce';
import { useAppTheme } from '@hooks/use-app-theme';
import { useGetAllPackagesByAdmin } from '@hooks/queries/useAdminQueries';

const ITEMS_PER_PAGE_OPTIONS = ['5', '10', '20', '50'];
const DEFAULT_ITEMS_PER_PAGE = 10;

type SortField = 'title' | 'startDate' | 'endDate';
type SortOrder = 'asc' | 'desc';

interface SortConfig {
  field: SortField;
  order: SortOrder;
}

const usePackageFilters = (packages: PackageInterface[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'title',
    order: 'asc'
  });

  const filteredAndSortedPackages = useMemo(() => {
    let filtered = packages;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = packages.filter(
        pkg =>
          pkg.title?.toLowerCase().includes(query) ||
          pkg.description?.toLowerCase().includes(query)
      );
    }

    return [...filtered].sort((a, b) => {
      let aValue: any = '';
      let bValue: any = '';

      if (sortConfig.field === 'startDate' || sortConfig.field === 'endDate') {
        aValue = new Date(a[sortConfig.field]).getTime();
        bValue = new Date(b[sortConfig.field]).getTime();
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
  }, [packages, searchQuery, sortConfig]);

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
    filteredPackages: filteredAndSortedPackages
  };
};

const MobilePackageCard = ({
  pkg,
  index,
  activePage,
  itemsPerPage,
  onEdit,
  themeConfig
}: {
  pkg: PackageInterface;
  index: number;
  activePage: number;
  itemsPerPage: number;
  onEdit: (id: string) => void;
  themeConfig: any;
}) => {
  const isExpired = moment(pkg.endDate).isBefore(moment(), 'day');
  return (
    <Card
      key={pkg._id}
      id={`package-${pkg._id}`}
      shadow='sm'
      p='md'
      mb='sm'
      withBorder
    >
      <Stack gap='sm'>
        <Group justify='space-between' align='center'>
          <Badge variant='filled' color={themeConfig.accentColor}>
            #{index + 1 + (activePage - 1) * itemsPerPage}
          </Badge>
          <ActionIcon
            variant='subtle'
            color={themeConfig.button.color}
            onClick={() => onEdit(pkg._id)}
            size='md'
          >
            <IconEdit size={18} />
          </ActionIcon>
        </Group>

        <Divider />

        <Stack gap={2}>
          <Text size='xs' fw={600} c='dimmed'>
            Package Title
          </Text>
          <Text size='lg' fw={700}>
            {pkg.title}
          </Text>
        </Stack>

        <Stack gap={2}>
          <Text size='xs' fw={600} c='dimmed'>
            Description
          </Text>
          <Text size='sm' lineClamp={3}>
            {pkg.description}
          </Text>
        </Stack>

        <Group grow>
          <Stack gap={2}>
            <Text size='xs' fw={600} c='dimmed'>
              Start Date
            </Text>
            <Badge size='sm' variant='light' color={themeConfig.successColor}>
              {moment(pkg.startDate).format('MMM DD, YYYY')}
            </Badge>
          </Stack>
          <Stack gap={2}>
            <Text size='xs' fw={600} c='dimmed'>
              End Date
            </Text>
            <Badge
              size='sm'
              variant='light'
              color={
                isExpired ? themeConfig.dangerColor : themeConfig.successColor
              }
            >
              {moment(pkg.endDate).format('MMM DD, YYYY')}
            </Badge>
          </Stack>
        </Group>
      </Stack>
    </Card>
  );
};

const TableHeader = ({
  sortConfig,
  onSort,
  themeConfig,
  isTablet
}: {
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
  themeConfig: any;
  isTablet?: boolean;
}) => {
  const SortableHeader = ({
    field,
    children
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => (
    <Table.Th
      className='border cursor-pointer select-none hover:bg-opacity-80 transition-colors'
      onClick={() => onSort(field)}
    >
      <Group justify='center'>
        <Text size='sm' fw={500}>
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
          className='p-3 border'
          ta='center'
          style={{ minWidth: '60px' }}
        >
          <Text size='sm' fw={500}>
            S.No
          </Text>
        </Table.Th>
        <SortableHeader field='title'>Title</SortableHeader>
        {!isTablet && (
          <Table.Th
            className='p-3 border text-center'
            style={{ minWidth: '250px' }}
          >
            <Text size='sm' fw={500}>
              Description
            </Text>
          </Table.Th>
        )}
        <SortableHeader field='startDate'>Start Date</SortableHeader>
        <SortableHeader field='endDate'>End Date</SortableHeader>
        <Table.Th className='p-3 border' ta='center'>
          <Text size='sm' fw={500}>
            Actions
          </Text>
        </Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
};

const HeadingComponent = ({
  filteredCount,
  handleAddPackage,
  isMobile
}: {
  filteredCount: number;
  handleAddPackage: () => void;
  isMobile?: boolean;
}) => (
  <Card shadow='sm' p={isMobile ? 'md' : 'lg'} radius='md' withBorder mt='xl'>
    <Flex
      direction={isMobile ? 'column' : 'row'}
      justify='space-between'
      align='center'
      gap='md'
    >
      <Text
        size={isMobile ? 'lg' : 'xl'}
        fw={700}
        ta={isMobile ? 'center' : 'left'}
      >
        Manage Packages ({filteredCount} packages)
      </Text>
      <Button
        leftSection={<IconPlus size={16} />}
        onClick={handleAddPackage}
        variant='filled'
        fullWidth={isMobile}
        size={isMobile ? 'md' : 'sm'}
        radius='md'
      >
        Add Package
      </Button>
    </Flex>
  </Card>
);

const Packages = () => {
  const {
    data: packages = [],
    isLoading,
    error: queryError
  } = useGetAllPackagesByAdmin();
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const navigate = useNavigate();
  const { themeConfig: currentThemeConfig, organizationConfig } = useAppTheme();

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');

  const highlightPackageId = useRef<string | null>(null);

  const {
    searchQuery,
    setSearchQuery,
    sortConfig,
    handleSort,
    filteredPackages
  } = usePackageFilters(packages);

  const {
    scrollRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart
  } = useHorizontalScroll();

  const debouncedSearch = useMemo(
    () => debounce((query: string) => setSearchQuery(query), 300),
    [setSearchQuery]
  );

  const { paginatedPackages, totalPages } = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginated = filteredPackages.slice(start, end);
    const pages = Math.ceil(filteredPackages.length / itemsPerPage);

    return { paginatedPackages: paginated, totalPages: pages };
  }, [filteredPackages, activePage, itemsPerPage]);

  useEffect(() => {
    setActivePage(1);
  }, [searchQuery, itemsPerPage]);

  useEffect(() => {
    const selectedPackage = localStorage.getItem('packageId');
    if (!selectedPackage || filteredPackages.length === 0) return;

    const packageIndex = filteredPackages.findIndex(
      pkg => pkg._id === selectedPackage
    );

    if (packageIndex === -1) return;

    const targetPage = Math.floor(packageIndex / itemsPerPage) + 1;
    setActivePage(targetPage);
    highlightPackageId.current = selectedPackage;

    const timer = setTimeout(() => {
      const element = document.getElementById(`package-${selectedPackage}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.style.backgroundColor = `${currentThemeConfig.button.color}50`;
        element.style.color = `${currentThemeConfig.button.textColor}70`;

        setTimeout(() => {
          localStorage.removeItem('packageId');
          element.style.backgroundColor =
            currentThemeConfig.headerBackgroundColor;
          element.style.color = currentThemeConfig.color;
          highlightPackageId.current = null;
        }, 2000);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [
    filteredPackages,
    itemsPerPage,
    currentThemeConfig.headerBackgroundColor,
    currentThemeConfig.color,
    currentThemeConfig.button.color,
    currentThemeConfig.button.textColor
  ]);

  const handlePackageEdit = useCallback(
    (packageId: string) => {
      localStorage.setItem('packageId', packageId);
      navigate(
        `${organizationAdminUrls(
          organizationConfig.organization_name
        )}/dashboard/updates/${packageId}`
      );
    },
    [navigate, organizationConfig.organization_name]
  );

  const handleAddPackage = useCallback(() => {
    navigate(
      `${organizationAdminUrls(
        organizationConfig.organization_name
      )}/dashboard/addPackage`
    );
  }, [navigate, organizationConfig.organization_name]);

  if (queryError) {
    return (
      <Container size={isMobile ? 'sm' : 'lg'} py='xl'>
        <Card shadow='sm' p='lg' radius='md' withBorder>
          <Text ta='center' size='lg'>
            Failed to fetch packages.
          </Text>
          <Center mt='md'>
            <Button radius='md' onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </Center>
        </Card>
      </Container>
    );
  }

  return (
    <Container size='xl' py='md' my='xl' px={isSmallMobile ? 'xs' : 'md'}>
      <Stack gap='md'>
        <HeadingComponent
          filteredCount={filteredPackages.length}
          handleAddPackage={handleAddPackage}
          isMobile={isMobile}
        />

        <Card shadow='sm' p={isMobile ? 'sm' : 'md'} radius='md' withBorder>
          <Flex
            gap='md'
            align='center'
            wrap={isMobile ? 'wrap' : 'nowrap'}
            justify='space-between'
          >
            <TextInput
              placeholder='Search by title or description...'
              leftSection={<IconSearch size={16} />}
              onChange={e => debouncedSearch(e.target.value)}
              radius='md'
              size={isMobile ? 'sm' : 'md'}
              style={{ flex: 1, minWidth: isMobile ? '100%' : '320px' }}
            />

            <Group gap='xs'>
              <Text size='sm'>Items per page:</Text>
              <Select
                data={ITEMS_PER_PAGE_OPTIONS}
                value={itemsPerPage.toString()}
                onChange={value =>
                  setItemsPerPage(Number(value) || DEFAULT_ITEMS_PER_PAGE)
                }
                w={70}
                size='sm'
              />
            </Group>

            {filteredPackages.length !== packages.length && (
              <Badge variant='light' color={currentThemeConfig.accentColor}>
                {filteredPackages.length} of {packages.length} packages
              </Badge>
            )}
          </Flex>
        </Card>

        <Card shadow='sm' p={0} radius='md' withBorder>
          <DataView
            isLoading={isLoading}
            label='packages'
            isEmpty={paginatedPackages.length === 0 && !isLoading}
          >
            {isMobile ? (
              <ScrollArea p='md'>
                <Stack gap='sm'>
                  {paginatedPackages.length > 0 ? (
                    paginatedPackages.map((pkg, index) => (
                      <MobilePackageCard
                        key={pkg._id}
                        pkg={pkg}
                        index={index}
                        activePage={activePage}
                        itemsPerPage={itemsPerPage}
                        onEdit={handlePackageEdit}
                        themeConfig={currentThemeConfig}
                      />
                    ))
                  ) : (
                    <Card p='xl' withBorder>
                      <Stack align='center' gap='md'>
                        <IconPackage size={48} opacity={0.5} />
                        <Text size='lg' ta='center'>
                          No packages found
                        </Text>
                        <Text size='sm' ta='center'>
                          {searchQuery
                            ? 'Try adjusting your search'
                            : 'Start by adding your first package'}
                        </Text>
                        {!searchQuery && (
                          <Button
                            radius='md'
                            variant='light'
                            leftSection={<IconPlus size={16} />}
                            onClick={handleAddPackage}
                            fullWidth={isSmallMobile}
                          >
                            Add Package
                          </Button>
                        )}
                      </Stack>
                    </Card>
                  )}
                </Stack>
              </ScrollArea>
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
                style={{ overflowX: 'auto' }}
              >
                <Table stickyHeader withTableBorder withColumnBorders>
                  <TableHeader
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    themeConfig={currentThemeConfig}
                    isTablet={isTablet}
                  />
                  <Table.Tbody>
                    {paginatedPackages.length > 0 ? (
                      paginatedPackages.map((pkg, index) => {
                        const isExpired = moment(pkg.endDate).isBefore(
                          moment(),
                          'day'
                        );
                        return (
                          <Table.Tr
                            key={pkg._id}
                            id={`package-${pkg._id}`}
                            className='transition-colors'
                          >
                            <Table.Td className='text-center p-3'>
                              <Text size='sm'>
                                {index + 1 + (activePage - 1) * itemsPerPage}
                              </Text>
                            </Table.Td>
                            <Table.Td className='p-3'>
                              <Text size='sm' fw={500}>
                                {pkg.title}
                              </Text>
                            </Table.Td>
                            {!isTablet && (
                              <Table.Td className='p-3'>
                                <Tooltip label={pkg.description} withArrow>
                                  <Text size='sm' lineClamp={2}>
                                    {pkg.description}
                                  </Text>
                                </Tooltip>
                              </Table.Td>
                            )}
                            <Table.Td className='p-3 text-center'>
                              <Badge
                                size='sm'
                                variant='light'
                                color={currentThemeConfig.successColor}
                              >
                                {moment(pkg.startDate).format('MMM DD, YYYY')}
                              </Badge>
                            </Table.Td>
                            <Table.Td className='p-3 text-center'>
                              <Badge
                                size='sm'
                                variant='light'
                                color={
                                  isExpired
                                    ? currentThemeConfig.dangerColor
                                    : currentThemeConfig.successColor
                                }
                              >
                                {moment(pkg.endDate).format('MMM DD, YYYY')}
                              </Badge>
                            </Table.Td>
                            <Table.Td className='p-3 text-center'>
                              <Group gap='xs' justify='center'>
                                <Tooltip label='Edit Package'>
                                  <ActionIcon
                                    variant='subtle'
                                    color={currentThemeConfig.button.color}
                                    onClick={() => handlePackageEdit(pkg._id)}
                                    size='sm'
                                  >
                                    <IconEdit size={16} />
                                  </ActionIcon>
                                </Tooltip>
                              </Group>
                            </Table.Td>
                          </Table.Tr>
                        );
                      })
                    ) : (
                      <Table.Tr>
                        <Table.Td
                          colSpan={isTablet ? 5 : 6}
                          className='text-center p-8'
                        >
                          <Stack align='center' gap='md'>
                            <IconPackage size={48} opacity={0.5} />
                            <Text size='lg'>No packages found</Text>
                            <Text size='sm'>
                              {searchQuery
                                ? 'Try adjusting your search'
                                : 'Start by adding your first package'}
                            </Text>
                            {!searchQuery && (
                              <Button
                                radius='md'
                                variant='light'
                                leftSection={<IconPlus size={16} />}
                                onClick={handleAddPackage}
                              >
                                Add Package
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
          </DataView>
        </Card>

        {totalPages > 1 && (
          <Center>
            <Pagination
              value={activePage}
              onChange={setActivePage}
              total={totalPages}
              size={isMobile ? 'sm' : 'md'}
              radius='md'
              withEdges
              color={currentThemeConfig.button.color}
            />
          </Center>
        )}
      </Stack>
    </Container>
  );
};

export default Packages;
