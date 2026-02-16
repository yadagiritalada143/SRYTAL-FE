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
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconEdit,
  IconPlus,
  IconTrash,
  IconSearch,
  IconAlertTriangle,
  IconDeviceFloppy,
  IconDroplet
} from '@tabler/icons-react';
import {
  getAllBloodGroupByAdmin,
  addBloodGroupByAdmin,
  updateBloodGroupByAdmin,
  deleteBloodGroupByAdmin
} from '../../../../services/admin-services';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { themeAtom } from '../../../../atoms/theme';
import { bloodGroupAtom } from '../../../../atoms/bloodgroup-atom';
import { debounce } from '../../../../utils/common/debounce';
import { useCustomToast } from '../../../../utils/common/toast';
import { getThemeConfig } from '../../../../utils/common/theme-utils';

const ITEMS_PER_PAGE_OPTIONS = ['5', '10', '20', '50'];
const DEFAULT_ITEMS_PER_PAGE = 10;

const isValidBloodGroup = (group: string) =>
  /^(A|B|AB|O)\s*(\+|-)(ve)?$/i.test(group.trim());

// Blood Group Actions Component
const BloodGroupActions: React.FC<{
  group: any;
  onEdit: (group: any) => void;
  isMobile?: boolean;
}> = ({ group, onEdit, isMobile = false }) => (
  <Group gap="xs" justify="center">
    <Tooltip label="Edit Blood Group">
      <ActionIcon
        variant="subtle"
        color="blue"
        onClick={() => onEdit(group)}
        size={isMobile ? 'md' : 'sm'}
      >
        <IconEdit size={isMobile ? 18 : 16} />
      </ActionIcon>
    </Tooltip>
  </Group>
);

// Mobile Blood Group Card Component
const MobileBloodGroupCard: React.FC<{
  group: any;
  index: number;
  activePage: number;
  itemsPerPage: number;
  onEdit: (group: any) => void;
}> = ({ group, index, activePage, itemsPerPage, onEdit }) => {
  return (
    <Card shadow="sm" p="md" mb="sm" withBorder>
      <Stack gap="sm">
        <Group justify="space-between" align="center">
          <Badge variant="filled" color="red">
            #{index + 1 + (activePage - 1) * itemsPerPage}
          </Badge>
          <ActionIcon
            variant="subtle"
            color="blue"
            onClick={() => onEdit(group)}
            size="md"
          >
            <IconEdit size={18} />
          </ActionIcon>
        </Group>

        <Divider />

        <Stack gap={2}>
          <Text size="xs" fw={600} c="dimmed">
            Blood Group
          </Text>
          <Group gap="xs">
            <IconDroplet size={20} color="red" />
            <Text size="lg" fw={600}>
              {group.type}
            </Text>
          </Group>
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
        Manage Blood Groups ({filteredCount} groups)
      </Text>
      <Button
        leftSection={<IconPlus size={16} />}
        onClick={onAdd}
        variant="filled"
        fullWidth={isMobile}
        size={isMobile ? 'md' : 'sm'}
      >
        Add Blood Group
      </Button>
    </Flex>
  </Card>
);

const BloodGroupTable = () => {
  const [bloodGroups, setBloodGroups] = useRecoilState(bloodGroupAtom);
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const [filteredBloodGroups, setFilteredBloodGroups] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [selectedGroup, setSelectedGroup] = useState<any | null>(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');

  // Get the current theme configuration
  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
  }, [organizationConfig, isDarkTheme]);

  const [editModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal }
  ] = useDisclosure(false);
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);

  const fetchBloodGroups = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllBloodGroupByAdmin();
      setBloodGroups(data);
      setFilteredBloodGroups(data);
    } catch {
      showErrorToast('Failed to fetch blood groups');
    } finally {
      setIsLoading(false);
    }
  }, [setBloodGroups, showErrorToast]);

  useEffect(() => {
    if (bloodGroups.length === 0) {
      fetchBloodGroups();
    } else {
      setFilteredBloodGroups(bloodGroups);
      setIsLoading(false);
    }
  }, [bloodGroups, fetchBloodGroups]);

  // Debounced search
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        const filtered = bloodGroups.filter(group =>
          group.type.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredBloodGroups(filtered);
        setActivePage(1);
      }, 300),
    [bloodGroups]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleEdit = (group: any) => {
    setSelectedGroup(group);
    openEditModal();
  };

  const handleDelete = (id: string) => {
    setSelectedGroup({ id });
    openDeleteModal();
  };

  const confirmEdit = async () => {
    const trimmedGroup = selectedGroup?.type.trim();
    if (!isValidBloodGroup(trimmedGroup)) {
      showErrorToast('Invalid blood group format (e.g., A+, B-, AB+, O-)');
      return;
    }

    if (
      bloodGroups.some(
        group =>
          group.type.toLowerCase() === trimmedGroup.toLowerCase() &&
          group.id !== selectedGroup.id
      )
    ) {
      showErrorToast('This blood group already exists');
      return;
    }

    setIsLoading(true);
    try {
      await updateBloodGroupByAdmin(selectedGroup.id, trimmedGroup);
      showSuccessToast('Updated successfully');
      fetchBloodGroups();
      closeEditModal();
    } catch {
      showErrorToast('Failed to update');
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      await deleteBloodGroupByAdmin(selectedGroup.id);
      showSuccessToast('Deleted successfully');
      fetchBloodGroups();
      closeDeleteModal();
      closeEditModal();
    } catch {
      showErrorToast('Failed to delete');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async () => {
    const trimmedGroup = newGroupName.trim();
    if (!isValidBloodGroup(trimmedGroup)) {
      showErrorToast('Invalid blood group format (e.g., A+, B-, AB+, O-)');
      return;
    }

    if (
      bloodGroups.some(
        group => group.type.toLowerCase() === trimmedGroup.toLowerCase()
      )
    ) {
      showErrorToast('This blood group already exists');
      return;
    }

    setIsLoading(true);
    try {
      await addBloodGroupByAdmin({ type: trimmedGroup });
      showSuccessToast('Added successfully');
      fetchBloodGroups();
      closeAddModal();
      setNewGroupName('');
    } catch {
      showErrorToast('Failed to add');
    } finally {
      setIsLoading(false);
    }
  };

  // Pagination logic
  const { paginatedData, totalPages } = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginated = filteredBloodGroups.slice(start, end);
    const pages = Math.ceil(filteredBloodGroups.length / itemsPerPage);

    return { paginatedData: paginated, totalPages: pages };
  }, [filteredBloodGroups, activePage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setActivePage(1);
  }, [itemsPerPage]);

  return (
    <Container size="xl" py="md" my="xl" px={isSmallMobile ? 'xs' : 'md'}>
      <Stack gap="md">
        {/* Header */}
        <HeadingComponent
          filteredCount={filteredBloodGroups.length}
          onAdd={openAddModal}
          isMobile={isMobile}
        />

        {/* Filters */}
        <Card shadow="sm" p={isMobile ? 'sm' : 'md'} radius="md" withBorder>
          <Stack gap="md">
            <TextInput
              placeholder="Search by blood group..."
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

              {filteredBloodGroups.length !== bloodGroups.length && (
                <Badge variant="light" color="red">
                  {filteredBloodGroups.length} of {bloodGroups.length} groups
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
                <Text>Loading blood groups...</Text>
              </Stack>
            </Center>
          ) : isMobile ? (
            // Mobile Card View
            <ScrollArea p="md">
              <Stack gap="sm">
                {paginatedData.length > 0 ? (
                  paginatedData.map((group, index) => (
                    <MobileBloodGroupCard
                      key={group.id}
                      group={group}
                      index={index}
                      activePage={activePage}
                      itemsPerPage={itemsPerPage}
                      onEdit={handleEdit}
                    />
                  ))
                ) : (
                  <Card p="xl" withBorder>
                    <Stack align="center" gap="md">
                      <IconDroplet size={48} opacity={0.5} color="red" />
                      <Text size="lg" ta="center">
                        No blood groups found
                      </Text>
                      <Text size="sm" ta="center">
                        {searchQuery
                          ? 'Try adjusting your search'
                          : 'Start by adding your first blood group'}
                      </Text>
                      {!searchQuery && (
                        <Button
                          variant="light"
                          leftSection={<IconPlus size={16} />}
                          onClick={openAddModal}
                          fullWidth={isSmallMobile}
                        >
                          Add Blood Group
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
                        Blood Group
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
                    paginatedData.map((group, index) => (
                      <Table.Tr key={group.id} className="transition-colors">
                        <Table.Td className="text-center p-3">
                          <Text size="sm">
                            {index + 1 + (activePage - 1) * itemsPerPage}
                          </Text>
                        </Table.Td>
                        <Table.Td className="p-3">
                          <Group gap="xs">
                            <IconDroplet size={18} color="red" />
                            <Text size="sm" fw={500}>
                              {group.type}
                            </Text>
                          </Group>
                        </Table.Td>
                        <Table.Td className="p-3">
                          <BloodGroupActions
                            group={group}
                            onEdit={handleEdit}
                          />
                        </Table.Td>
                      </Table.Tr>
                    ))
                  ) : (
                    <Table.Tr>
                      <Table.Td colSpan={3} className="text-center p-8">
                        <Stack align="center" gap="md">
                          <IconDroplet size={48} opacity={0.5} color="red" />
                          <Text size="lg">No blood groups found</Text>
                          <Text size="sm">
                            {searchQuery
                              ? 'Try adjusting your search'
                              : 'Start by adding your first blood group'}
                          </Text>
                          {!searchQuery && (
                            <Button
                              variant="light"
                              leftSection={<IconPlus size={16} />}
                              onClick={openAddModal}
                            >
                              Add Blood Group
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
            <Text fw={600} size="lg">
              Add New Blood Group
            </Text>
          </Group>
        }
        centered
        size="md"
      >
        <Stack gap="md">
          <TextInput
            label="Blood Group"
            value={newGroupName}
            onChange={e => {
              const value = e.target.value;
              if (
                value === '' ||
                isValidBloodGroup(value) ||
                value.length < 5
              ) {
                setNewGroupName(value);
              }
            }}
            placeholder="e.g., A+, B-, AB+, O-"
            required
            size="md"
            description="Valid formats: A+, B-, AB+, O-, etc."
          />
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={closeAddModal}>
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              disabled={isLoading || !newGroupName.trim()}
              leftSection={<IconDeviceFloppy size={16} />}
            >
              {isLoading ? 'Adding...' : 'Add Blood Group'}
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
              Edit Blood Group
            </Text>
          </Group>
        }
        centered
        size="md"
      >
        <Stack gap="md">
          <TextInput
            label="Blood Group"
            value={selectedGroup?.type || ''}
            onChange={e => {
              const value = e.target.value;
              if (
                value === '' ||
                isValidBloodGroup(value) ||
                value.length < 5
              ) {
                setSelectedGroup({
                  ...selectedGroup,
                  type: value
                });
              }
            }}
            required
            size="md"
            description="Valid formats: A+, B-, AB+, O-, etc."
          />
          <Group justify="space-between" mt="md">
            <Button
              color="red"
              variant="outline"
              leftSection={<IconTrash size={16} />}
              onClick={() => handleDelete(selectedGroup.id)}
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
              Delete Blood Group
            </Text>
          </Group>
        }
        centered
        size="md"
      >
        <Stack gap="md">
          <Text size="sm">
            Are you sure you want to delete this blood group? This action cannot
            be undone.
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

export default BloodGroupTable;
