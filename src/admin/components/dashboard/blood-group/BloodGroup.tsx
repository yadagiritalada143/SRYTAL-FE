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
import DataView from '@components/common/loaders/DataView';
import {
  IconEdit,
  IconPlus,
  IconTrash,
  IconSearch,
  IconAlertTriangle,
  IconDeviceFloppy,
  IconDroplet
} from '@tabler/icons-react';
import { debounce } from '@utils/common/debounce';
import { useCustomToast } from '@utils/common/toast';
import { useAppTheme } from '@hooks/use-app-theme';
import { useGetAllBloodGroupsByAdmin } from '@hooks/queries/useAdminQueries';
import {
  useAddBloodGroupByAdmin as useAddBloodGroup,
  useUpdateBloodGroupByAdmin as useUpdateBloodGroup,
  useDeleteBloodGroupByAdmin as useDeleteBloodGroup
} from '@hooks/mutations/useAdminMutations';

const ITEMS_PER_PAGE_OPTIONS = ['5', '10', '20', '50'];
const DEFAULT_ITEMS_PER_PAGE = 10;

const isValidBloodGroup = (group: string) =>
  /^(A|B|AB|O)\s*(\+|-)(ve)?$/i.test(group.trim());

// Blood Group Actions Component
const BloodGroupActions: React.FC<{
  group: any;
  onEdit: (group: any) => void;
  color: string;
  isMobile?: boolean;
}> = ({ group, onEdit, color, isMobile = false }) => (
  <Group gap='xs' justify='center'>
    <Tooltip label='Edit Blood Group'>
      <ActionIcon
        variant='subtle'
        color={color}
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
  color: string;
  itemsPerPage: number;
  onEdit: (group: any) => void;
}> = ({ group, index, activePage, itemsPerPage, color, onEdit }) => {
  return (
    <Card shadow='sm' p='md' mb='sm' withBorder>
      <Stack gap='sm'>
        <Group justify='space-between' align='center'>
          <Badge variant='filled' color={color}>
            #{index + 1 + (activePage - 1) * itemsPerPage}
          </Badge>
          <ActionIcon
            variant='subtle'
            color={color}
            onClick={() => onEdit(group)}
            size='md'
          >
            <IconEdit size={18} />
          </ActionIcon>
        </Group>

        <Divider />

        <Stack gap={2}>
          <Text size='xs' fw={600} c='dimmed'>
            Blood Group
          </Text>
          <Group gap='xs'>
            <IconDroplet size={20} color='red' />
            <Text size='lg' fw={600}>
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
  <Card shadow='sm' p={isMobile ? 'md' : 'lg'} radius='md' withBorder>
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
        Manage Blood Groups ({filteredCount} groups)
      </Text>
      <Button
        leftSection={<IconPlus size={16} />}
        onClick={onAdd}
        variant='filled'
        fullWidth={isMobile}
        size={isMobile ? 'md' : 'sm'}
        radius='md'
      >
        Add Blood Group
      </Button>
    </Flex>
  </Card>
);

const BloodGroup = () => {
  const {
    data: bloodGroups = [],
    isLoading,
    isFetching
  } = useGetAllBloodGroupsByAdmin();
  const { mutateAsync: addBloodGroup, isPending: isAdding } =
    useAddBloodGroup();
  const { mutateAsync: updateBloodGroup, isPending: isUpdating } =
    useUpdateBloodGroup();
  const { mutateAsync: deleteBloodGroup, isPending: isDeleting } =
    useDeleteBloodGroup();

  const isMutating = isAdding || isUpdating || isDeleting;

  const {
    themeConfig: currentThemeConfig,
    organizationConfig,
    isDarkTheme
  } = useAppTheme();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [selectedGroup, setSelectedGroup] = useState<any | null>(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');

  const [editModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal }
  ] = useDisclosure(false);
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);

  const [filterString, setFilterString] = useState('');

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setFilterString(query.toLowerCase());
        setActivePage(1);
      }, 300),
    []
  );

  const filteredBloodGroups = useMemo(() => {
    if (!filterString) return bloodGroups;
    return bloodGroups.filter((group: any) =>
      group.type.toLowerCase().includes(filterString)
    );
  }, [bloodGroups, filterString]);

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
        (group: any) =>
          group.type.toLowerCase() === trimmedGroup.toLowerCase() &&
          group.id !== selectedGroup.id
      )
    ) {
      showErrorToast('This blood group already exists');
      return;
    }

    try {
      await updateBloodGroup({ id: selectedGroup.id, type: trimmedGroup });
      showSuccessToast('Updated successfully');
      closeEditModal();
    } catch {
      showErrorToast('Failed to update');
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteBloodGroup(selectedGroup.id);
      showSuccessToast('Deleted successfully');
      closeDeleteModal();
      closeEditModal();
    } catch {
      showErrorToast('Failed to delete');
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
        (group: any) => group.type.toLowerCase() === trimmedGroup.toLowerCase()
      )
    ) {
      showErrorToast('This blood group already exists');
      return;
    }

    try {
      await addBloodGroup({ type: trimmedGroup });
      showSuccessToast('Added successfully');
      closeAddModal();
      setNewGroupName('');
    } catch {
      showErrorToast('Failed to add');
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
    <Container size='lg'>
      <Card
        radius='lg'
        p='lg'
        withBorder
        shadow={isDarkTheme ? 'xs' : 'sm'}
        style={{
          backgroundColor: currentThemeConfig.backgroundColor,
          border: `1px solid ${currentThemeConfig.borderColor}`
        }}
      >
        <Stack gap='lg'>
          {/* Header */}
          <HeadingComponent
            filteredCount={filteredBloodGroups.length}
            onAdd={openAddModal}
            isMobile={isMobile}
          />

          {/* Filters */}
          <Card shadow='sm' p={isMobile ? 'sm' : 'md'} radius='md'>
            <Flex
              direction={isMobile ? 'column' : 'row'}
              justify='space-between'
              align={isMobile ? 'stretch' : 'center'}
              gap='md'
            >
              <TextInput
                placeholder='Search by blood group...'
                leftSection={<IconSearch size={16} />}
                value={searchQuery}
                onChange={handleSearch}
                radius='md'
                style={{ flex: 1 }}
              />

              <Group justify='space-between' wrap='nowrap'>
                <Group gap='xs'>
                  <Text size='sm'>Items per page:</Text>
                  <Select
                    data={ITEMS_PER_PAGE_OPTIONS}
                    value={itemsPerPage.toString()}
                    onChange={value =>
                      setItemsPerPage(Number(value) || DEFAULT_ITEMS_PER_PAGE)
                    }
                    w={80}
                    size='sm'
                  />
                </Group>

                {filteredBloodGroups.length !== bloodGroups.length && (
                  <Badge variant='light' color={currentThemeConfig.dangerColor}>
                    {filteredBloodGroups.length} of {bloodGroups.length} groups
                  </Badge>
                )}
              </Group>
            </Flex>
          </Card>

          {/* Table or Cards */}
          <Card shadow='sm' p={0} radius='md'>
            <DataView
              isLoading={isLoading}
              label='blood groups'
              isEmpty={paginatedData.length === 0 && !isLoading}
            >
              {isMobile ? (
                // Mobile Card View
                <ScrollArea p='md'>
                  <Stack gap='sm'>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((group: any, index: number) => (
                        <MobileBloodGroupCard
                          key={group.id}
                          color={currentThemeConfig.button.color}
                          group={group}
                          index={index}
                          activePage={activePage}
                          itemsPerPage={itemsPerPage}
                          onEdit={handleEdit}
                        />
                      ))
                    ) : (
                      <Card p='xl' withBorder>
                        <Stack align='center' gap='md'>
                          <IconDroplet
                            size={48}
                            opacity={0.5}
                            color={currentThemeConfig.dangerColor}
                          />
                          <Text size='lg' ta='center'>
                            No blood groups found
                          </Text>
                          <Text size='sm' ta='center'>
                            {searchQuery
                              ? 'Try adjusting your search'
                              : 'Start by adding your first blood group'}
                          </Text>
                          {!searchQuery && (
                            <Button
                              variant='light'
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
                  <Table
                    stickyHeader
                    styles={{
                      table: {
                        border: `1px solid ${currentThemeConfig.borderColor}`
                      },
                      th: {
                        borderBottom: `1px solid ${currentThemeConfig.borderColor}`
                      },
                      td: {
                        borderBottom: `1px solid ${currentThemeConfig.borderColor}`,
                        borderRight: `1px solid ${currentThemeConfig.borderColor}`
                      }
                    }}
                  >
                    <Table.Thead
                      style={{
                        backgroundColor: currentThemeConfig.backgroundColor,
                        color: currentThemeConfig.color
                      }}
                    >
                      <Table.Tr>
                        <Table.Th
                          className='p-3 border text-center'
                          style={{ width: '100px' }}
                        >
                          <Text size='sm' fw={500}>
                            S.No
                          </Text>
                        </Table.Th>
                        <Table.Th className='p-3 border'>
                          <Text size='sm' fw={500}>
                            Blood Group
                          </Text>
                        </Table.Th>
                        <Table.Th
                          className='p-3 border text-center'
                          style={{ width: '120px' }}
                        >
                          <Text size='sm' fw={500}>
                            Actions
                          </Text>
                        </Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {paginatedData.length > 0 ? (
                        paginatedData.map((group: any, index: number) => (
                          <Table.Tr
                            key={group.id}
                            className='transition-colors'
                          >
                            <Table.Td className='text-center'>
                              <Text size='sm'>
                                {index + 1 + (activePage - 1) * itemsPerPage}
                              </Text>
                            </Table.Td>
                            <Table.Td className='p-3'>
                              <Group gap='xs'>
                                <IconDroplet
                                  size={18}
                                  color={currentThemeConfig.dangerColor}
                                />
                                <Text size='sm'>{group.type}</Text>
                              </Group>
                            </Table.Td>
                            <Table.Td className='p-3'>
                              <BloodGroupActions
                                group={group}
                                onEdit={handleEdit}
                                color={currentThemeConfig.button.color}
                              />
                            </Table.Td>
                          </Table.Tr>
                        ))
                      ) : (
                        <Table.Tr>
                          <Table.Td colSpan={3} className='text-center p-8'>
                            <Stack align='center' gap='md'>
                              <IconDroplet
                                size={48}
                                opacity={0.5}
                                color={currentThemeConfig.dangerColor}
                              />
                              <Text size='lg'>No blood groups found</Text>
                              <Text size='sm'>
                                {searchQuery
                                  ? 'Try adjusting your search'
                                  : 'Start by adding your first blood group'}
                              </Text>
                              {!searchQuery && (
                                <Button
                                  variant='light'
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
            </DataView>
          </Card>

          {/* Pagination */}
          {totalPages > 1 && (
            <Center>
              <Pagination
                value={activePage}
                onChange={setActivePage}
                total={totalPages}
                color={currentThemeConfig.button.color}
                size={isMobile ? 'sm' : 'md'}
                radius='md'
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
            <Group gap='xs'>
              <IconDroplet
                size={20}
                stroke={1.8}
                color={currentThemeConfig.button.color}
              />
              <Text fw={600} size='lg'>
                Add New Blood Group
              </Text>
            </Group>
          }
          centered
          size='md'
          styles={{
            header: {
              paddingBottom: 4,
              paddingTop: 5
            }
          }}
        >
          <Stack gap='md'>
            <TextInput
              mt='md'
              label='Blood Group'
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
              placeholder='e.g., A+, B-, AB+, O-'
              required
              size='md'
              description='Valid formats: A+, B-, AB+, O-, etc.'
            />
            <Group justify='flex-end' mt='xs'>
              <Button variant='default' onClick={closeAddModal} radius='md'>
                Cancel
              </Button>
              <Button
                onClick={handleAdd}
                disabled={isMutating || !newGroupName.trim()}
                leftSection={<IconDeviceFloppy size={16} />}
                radius='md'
              >
                {isAdding ? 'Adding...' : 'Add Blood Group'}
              </Button>
            </Group>
          </Stack>
        </Modal>

        {/* Edit Modal */}
        <Modal
          opened={editModalOpened}
          onClose={closeEditModal}
          title={
            <Group gap='xs'>
              <IconEdit size={20} color={currentThemeConfig.button.color} />
              <Text fw={600} size='lg'>
                Edit Blood Group
              </Text>
            </Group>
          }
          centered
          size='md'
          styles={{
            header: {
              paddingBottom: 4,
              paddingTop: 5
            }
          }}
        >
          <Stack gap='md'>
            <TextInput
              mt='md'
              label='Blood Group'
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
              size='md'
              description='Valid formats: A+, B-, AB+, O-, etc.'
            />
            <Group justify='space-between'>
              {isMobile ? (
                <Tooltip label='Delete Blood Group'>
                  <Button
                    onClick={openDeleteModal}
                    p='xs'
                    radius='md'
                    variant='outline'
                  >
                    <IconTrash size={16} />
                  </Button>
                </Tooltip>
              ) : (
                <Button
                  color={currentThemeConfig.dangerColor}
                  variant='outline'
                  leftSection={<IconTrash size={16} />}
                  onClick={() => handleDelete(selectedGroup.id)}
                  radius='md'
                >
                  Delete
                </Button>
              )}
              <Group>
                <Button variant='default' onClick={closeEditModal} radius='md'>
                  Cancel
                </Button>
                <Button
                  onClick={confirmEdit}
                  disabled={isMutating}
                  leftSection={<IconDeviceFloppy size={16} />}
                  radius='md'
                >
                  {isUpdating ? 'Saving...' : 'Save'}
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
            <Group gap='xs'>
              <IconAlertTriangle
                size={24}
                color={currentThemeConfig.dangerColor}
              />
              <Text fw={600} size='lg' c={currentThemeConfig.dangerColor}>
                Delete Blood Group
              </Text>
            </Group>
          }
          centered
          size='md'
        >
          <Stack gap='md'>
            <Text size='sm' mt='md'>
              Are you sure you want to delete this blood group? This action
              cannot be undone.
            </Text>
            <Group justify='flex-end' mt='md'>
              <Button variant='default' onClick={closeDeleteModal} radius='md'>
                Cancel
              </Button>
              <Button
                color={currentThemeConfig.dangerColor}
                onClick={confirmDelete}
                disabled={isMutating}
                leftSection={<IconTrash size={16} />}
                radius='md'
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Card>
    </Container>
  );
};

export default BloodGroup;
