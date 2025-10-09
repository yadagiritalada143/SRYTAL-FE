import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Button,
  Group,
  Text,
  Loader,
  Pagination,
  Modal,
  TextInput,
  Center,
  Container,
  Card,
  Stack,
  Table,
  Badge,
  ActionIcon,
  Tooltip,
  Select,
  ScrollArea,
  Flex,
  Divider
} from '@mantine/core';
import { toast } from 'react-toastify';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconEdit,
  IconPlus,
  IconTrash,
  IconSearch,
  IconAlertTriangle,
  IconDeviceFloppy,
  IconCategory
} from '@tabler/icons-react';
import {
  addEmploymentTypeByAdmin,
  updateEmploymentTypeByAdmin,
  deleteEmploymentTypeByAdmin,
  getAllEmploymentTypes
} from '../../../../services/admin-services';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { themeAtom } from '../../../../atoms/theme';
import { employeeTypeAtom } from '../../../../atoms/employeetypes-atom';
import { debounce } from '../../../../utils/common/debounce';

const ITEMS_PER_PAGE_OPTIONS = ['5', '10', '20', '50'];
const DEFAULT_ITEMS_PER_PAGE = 10;

const isValidEmploymentType = (name: string) =>
  /^([A-Za-z()\-\s_]|[0-9])+$/.test(name) && !/\d{2,}/.test(name);

// Type Actions Component
const TypeActions: React.FC<{
  type: any;
  onEdit: (type: any) => void;
  isMobile?: boolean;
}> = ({ type, onEdit, isMobile = false }) => (
  <Group gap="xs" justify="center">
    <Tooltip label="Edit Type">
      <ActionIcon
        variant="subtle"
        color="blue"
        onClick={() => onEdit(type)}
        size={isMobile ? 'md' : 'sm'}
      >
        <IconEdit size={isMobile ? 18 : 16} />
      </ActionIcon>
    </Tooltip>
  </Group>
);

// Mobile Type Card Component
const MobileTypeCard: React.FC<{
  type: any;
  index: number;
  activePage: number;
  itemsPerPage: number;
  onEdit: (type: any) => void;
}> = ({ type, index, activePage, itemsPerPage, onEdit }) => {
  return (
    <Card shadow="sm" p="md" mb="sm" withBorder>
      <Stack gap="sm">
        <Group justify="space-between" align="center">
          <Badge variant="filled" color="blue">
            #{index + 1 + (activePage - 1) * itemsPerPage}
          </Badge>
          <ActionIcon
            variant="subtle"
            color="blue"
            onClick={() => onEdit(type)}
            size="md"
          >
            <IconEdit size={18} />
          </ActionIcon>
        </Group>

        <Divider />

        <Stack gap={2}>
          <Text size="xs" fw={600} c="dimmed">
            Employment Type
          </Text>
          <Text size="lg" fw={600}>
            {type.employmentType}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
};

// Header Component
const HeadingComponent: React.FC<{
  filteredCount: number;
  onAdd: () => void;
  isMobile?: boolean;
}> = ({ filteredCount, onAdd, isMobile = false }) => (
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
        Manage Employment Types ({filteredCount} types)
      </Text>
      <Button
        leftSection={<IconPlus size={16} />}
        onClick={onAdd}
        variant="filled"
        fullWidth={isMobile}
        size={isMobile ? 'md' : 'sm'}
      >
        Add Type
      </Button>
    </Flex>
  </Card>
);

const EmploymentTypes = () => {
  const [employmentTypes, setEmploymentTypes] =
    useRecoilState(employeeTypeAtom);
  const [filteredEmploymentType, setFilteredEmploymentType] = useState<any[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [selectedType, setSelectedType] = useState<any | null>(null);
  const [newTypeName, setNewTypeName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  const [editModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal }
  ] = useDisclosure(false);
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);

  const fetchEmploymentTypes = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllEmploymentTypes();
      setEmploymentTypes(data);
      setFilteredEmploymentType(data);
    } catch {
      toast.error('Failed to fetch employment types');
    } finally {
      setIsLoading(false);
    }
  }, [setEmploymentTypes]);

  useEffect(() => {
    if (employmentTypes.length === 0) {
      fetchEmploymentTypes();
    } else {
      setFilteredEmploymentType(employmentTypes);
      setIsLoading(false);
    }
  }, [employmentTypes, fetchEmploymentTypes]);
  // Debounced search
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        const filtered = employmentTypes.filter(type =>
          type.employmentType.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredEmploymentType(filtered);
        setActivePage(1);
      }, 300),
    [employmentTypes]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleEdit = (type: any) => {
    setSelectedType(type);
    openEditModal();
  };

  const handleDelete = (id: string) => {
    setSelectedType({ id });
    openDeleteModal();
  };

  const confirmEdit = async () => {
    if (!isValidEmploymentType(selectedType?.employmentType)) {
      toast.error(
        'Only letters, numbers, spaces, underscores, hyphens, and parentheses are allowed. No two or more consecutive digits.'
      );
      return;
    }

    if (
      employmentTypes.some(
        type =>
          type.employmentType.toLowerCase() ===
            selectedType.employmentType.toLowerCase() &&
          type.id !== selectedType.id
      )
    ) {
      toast.error('This employment type already exists');
      return;
    }

    setIsLoading(true);
    try {
      await updateEmploymentTypeByAdmin(
        selectedType.id,
        selectedType.employmentType.trim()
      );
      toast.success('Updated successfully');
      fetchEmploymentTypes();
      closeEditModal();
    } catch {
      toast.error('Failed to update');
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      await deleteEmploymentTypeByAdmin(selectedType.id);
      toast.success('Deleted successfully');
      fetchEmploymentTypes();
      closeDeleteModal();
      closeEditModal();
    } catch {
      toast.error('Failed to delete');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!isValidEmploymentType(newTypeName)) {
      toast.error(
        'Only letters, numbers, spaces, underscores, hyphens, and parentheses are allowed. No two or more consecutive digits.'
      );
      return;
    }

    if (
      employmentTypes.some(
        type => type.employmentType.toLowerCase() === newTypeName.toLowerCase()
      )
    ) {
      toast.error('This employment type already exists');
      return;
    }

    setIsLoading(true);
    try {
      await addEmploymentTypeByAdmin({ employmentType: newTypeName.trim() });
      toast.success('Added successfully');
      fetchEmploymentTypes();
      closeAddModal();
      setNewTypeName('');
    } catch {
      toast.error('Failed to add');
    } finally {
      setIsLoading(false);
    }
  };

  // Pagination logic
  const { paginatedData, totalPages } = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginated = filteredEmploymentType.slice(start, end);
    const pages = Math.ceil(filteredEmploymentType.length / itemsPerPage);

    return { paginatedData: paginated, totalPages: pages };
  }, [filteredEmploymentType, activePage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setActivePage(1);
  }, [itemsPerPage]);

  return (
    <Container size="xl" py="md" my="xl" px={isSmallMobile ? 'xs' : 'md'}>
      <Stack gap="md">
        {/* Header */}
        <HeadingComponent
          filteredCount={filteredEmploymentType.length}
          onAdd={openAddModal}
          isMobile={isMobile}
        />

        {/* Filters */}
        <Card shadow="sm" p={isMobile ? 'sm' : 'md'} radius="md" withBorder>
          <Stack gap="md">
            <TextInput
              placeholder="Search by employment type..."
              leftSection={<IconSearch size={16} />}
              value={searchQuery}
              onChange={handleSearch}
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

              {filteredEmploymentType.length !== employmentTypes.length && (
                <Badge variant="light" color="blue">
                  {filteredEmploymentType.length} of {employmentTypes.length}{' '}
                  types
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
                <Text>Loading employment types...</Text>
              </Stack>
            </Center>
          ) : isMobile ? (
            // Mobile Card View
            <ScrollArea p="md">
              <Stack gap="sm">
                {paginatedData.length > 0 ? (
                  paginatedData.map((type, index) => (
                    <MobileTypeCard
                      key={type.id}
                      type={type}
                      index={index}
                      activePage={activePage}
                      itemsPerPage={itemsPerPage}
                      onEdit={handleEdit}
                    />
                  ))
                ) : (
                  <Card p="xl" withBorder>
                    <Stack align="center" gap="md">
                      <IconCategory size={48} opacity={0.5} />
                      <Text size="lg" ta="center">
                        No employment types found
                      </Text>
                      <Text size="sm" ta="center">
                        {searchQuery
                          ? 'Try adjusting your search'
                          : 'Start by adding your first employment type'}
                      </Text>
                      {!searchQuery && (
                        <Button
                          variant="light"
                          leftSection={<IconPlus size={16} />}
                          onClick={openAddModal}
                          fullWidth={isSmallMobile}
                        >
                          Add Type
                        </Button>
                      )}
                    </Stack>
                  </Card>
                )}
              </Stack>
            </ScrollArea>
          ) : (
            // Desktop Table View
            <ScrollArea>
              <Table stickyHeader withTableBorder withColumnBorders>
                <Table.Thead
                  style={{
                    backgroundColor: currentThemeConfig.backgroundColor,
                    color: currentThemeConfig.color
                  }}
                >
                  <Table.Tr>
                    <Table.Th
                      className="p-3 border text-center"
                      style={{ width: '100px' }}
                    >
                      <Text size="sm" fw={500}>
                        S.No
                      </Text>
                    </Table.Th>
                    <Table.Th className="p-3 border">
                      <Text size="sm" fw={500}>
                        Employment Type
                      </Text>
                    </Table.Th>
                    <Table.Th
                      className="p-3 border text-center"
                      style={{ width: '120px' }}
                    >
                      <Text size="sm" fw={500}>
                        Actions
                      </Text>
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((type, index) => (
                      <Table.Tr key={type.id} className="transition-colors">
                        <Table.Td className="text-center p-3">
                          <Text size="sm">
                            {index + 1 + (activePage - 1) * itemsPerPage}
                          </Text>
                        </Table.Td>
                        <Table.Td className="p-3">
                          <Text size="sm" fw={500}>
                            {type.employmentType}
                          </Text>
                        </Table.Td>
                        <Table.Td className="p-3">
                          <TypeActions type={type} onEdit={handleEdit} />
                        </Table.Td>
                      </Table.Tr>
                    ))
                  ) : (
                    <Table.Tr>
                      <Table.Td colSpan={3} className="text-center p-8">
                        <Stack align="center" gap="md">
                          <IconCategory size={48} opacity={0.5} />
                          <Text size="lg">No employment types found</Text>
                          <Text size="sm">
                            {searchQuery
                              ? 'Try adjusting your search'
                              : 'Start by adding your first employment type'}
                          </Text>
                          {!searchQuery && (
                            <Button
                              variant="light"
                              leftSection={<IconPlus size={16} />}
                              onClick={openAddModal}
                            >
                              Add Type
                            </Button>
                          )}
                        </Stack>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
            </ScrollArea>
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

      {/* Add Modal */}
      <Modal
        opened={addModalOpened}
        onClose={closeAddModal}
        title={
          <Group gap="xs">
            <IconPlus size={20} />
            <Text fw={600} size="lg">
              Add New Employment Type
            </Text>
          </Group>
        }
        centered
        size="md"
      >
        <Stack gap="md">
          <TextInput
            label="Type Name"
            value={newTypeName}
            onChange={e => {
              const value = e.target.value;
              if (value === '' || isValidEmploymentType(value)) {
                setNewTypeName(value);
              }
            }}
            placeholder="Enter type name"
            required
            size="md"
          />
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={closeAddModal}>
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              disabled={isLoading || !newTypeName.trim()}
              leftSection={<IconDeviceFloppy size={16} />}
            >
              {isLoading ? 'Adding...' : 'Add Type'}
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Edit Modal */}
      <Modal
        opened={editModalOpened}
        onClose={closeEditModal}
        title={
          <Group gap="xs">
            <IconEdit size={20} />
            <Text fw={600} size="lg">
              Edit Employment Type
            </Text>
          </Group>
        }
        centered
        size="md"
      >
        <Stack gap="md">
          <TextInput
            label="Type Name"
            value={selectedType?.employmentType || ''}
            onChange={e => {
              const value = e.target.value;
              if (value === '' || isValidEmploymentType(value)) {
                setSelectedType({
                  ...selectedType,
                  employmentType: value
                });
              }
            }}
            required
            size="md"
          />
          <Group justify="space-between" mt="md">
            <Button
              color="red"
              variant="outline"
              leftSection={<IconTrash size={16} />}
              onClick={() => handleDelete(selectedType.id)}
            >
              Delete
            </Button>
            <Group>
              <Button variant="default" onClick={closeEditModal}>
                Cancel
              </Button>
              <Button
                onClick={confirmEdit}
                disabled={isLoading}
                leftSection={<IconDeviceFloppy size={16} />}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </Group>
          </Group>
        </Stack>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title={
          <Group gap="xs">
            <IconAlertTriangle size={24} color="red" />
            <Text fw={600} size="lg" c="red">
              Delete Employment Type
            </Text>
          </Group>
        }
        centered
        size="md"
      >
        <Stack gap="md">
          <Text size="sm">
            Are you sure you want to delete this employment type? This action
            cannot be undone.
          </Text>
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button
              color="red"
              onClick={confirmDelete}
              disabled={isLoading}
              leftSection={<IconTrash size={16} />}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};

export default EmploymentTypes;
