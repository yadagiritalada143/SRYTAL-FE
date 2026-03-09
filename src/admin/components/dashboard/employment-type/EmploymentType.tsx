import { useState, useEffect, useMemo } from 'react';
import {
  Group,
  Text,
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
  IconCategory
} from '@tabler/icons-react';
import { debounce } from '@utils/common/debounce';
import { useCustomToast } from '@utils/common/toast';
import { useAppTheme } from '@hooks/use-app-theme';
import { useGetAllEmploymentTypes } from '@hooks/queries/useAdminQueries';
import {
  useAddEmploymentTypeByAdmin,
  useUpdateEmploymentTypeByAdmin,
  useDeleteEmploymentTypeByAdmin
} from '@hooks/mutations/useAdminMutations';
import { CommonButton } from '@components/common/button/CommonButton';

const ITEMS_PER_PAGE_OPTIONS = ['5', '10', '20', '50'];
const DEFAULT_ITEMS_PER_PAGE = 10;

const isValidEmploymentType = (name: string) =>
  /^([A-Za-z()\-\s_]|[0-9])+$/.test(name) && !/\d{2,}/.test(name);

// Type Actions Component
const TypeActions: React.FC<{
  type: any;
  onEdit: (type: any) => void;
  color: string;
  isMobile?: boolean;
}> = ({ type, onEdit, color, isMobile = false }) => (
  <Group gap='xs' justify='center'>
    <Tooltip label='Edit Type'>
      <ActionIcon
        variant='subtle'
        color={color}
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
  color: string;
  itemsPerPage: number;
  onEdit: (type: any) => void;
}> = ({ type, index, activePage, itemsPerPage, color, onEdit }) => {
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
            onClick={() => onEdit(type)}
            size='md'
          >
            <IconEdit size={18} />
          </ActionIcon>
        </Group>

        <Divider />

        <Stack gap={2}>
          <Text size='xs' fw={600} c='dimmed'>
            Employment Type
          </Text>
          <Text size='lg' fw={600}>
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
  <Card shadow='sm' p={isMobile ? 'md' : 'lg'} radius='md'>
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
        Manage Employment Types ({filteredCount} types)
      </Text>
      <CommonButton
        leftSection={<IconPlus size={16} />}
        onClick={onAdd}
        variant='filled'
        fullWidth={isMobile}
        size={isMobile ? 'md' : 'sm'}
      >
        Add Type
      </CommonButton>
    </Flex>
  </Card>
);

const EmploymentType = () => {
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const {
    themeConfig: currentThemeConfig,
    organizationConfig,
    isDarkTheme
  } = useAppTheme();
  const {
    data: employmentTypes = [],
    isLoading,
    isFetching
  } = useGetAllEmploymentTypes();
  const { mutateAsync: addEmploymentType, isPending: isAdding } =
    useAddEmploymentTypeByAdmin();
  const { mutateAsync: updateEmploymentType, isPending: isUpdating } =
    useUpdateEmploymentTypeByAdmin();
  const { mutateAsync: deleteEmploymentType, isPending: isDeleting } =
    useDeleteEmploymentTypeByAdmin();

  const isMutating = isAdding || isUpdating || isDeleting;

  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [selectedType, setSelectedType] = useState<any | null>(null);
  const [newTypeName, setNewTypeName] = useState('');
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

  const filteredEmploymentType = useMemo(() => {
    if (!filterString) return employmentTypes;
    return employmentTypes.filter((type: any) =>
      type.employmentType.toLowerCase().includes(filterString)
    );
  }, [employmentTypes, filterString]);

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
    setSelectedType((prev: any) => ({ ...prev, id }));
    openDeleteModal();
  };

  const confirmEdit = async () => {
    if (!isValidEmploymentType(selectedType?.employmentType)) {
      showErrorToast(
        'Only letters, numbers, spaces, underscores, hyphens, and parentheses are allowed. No two or more consecutive digits.'
      );
      return;
    }

    if (
      employmentTypes.some(
        (type: any) =>
          type.employmentType.toLowerCase() ===
            selectedType.employmentType.toLowerCase() &&
          type.id !== selectedType.id
      )
    ) {
      showErrorToast('This employment type already exists');
      return;
    }

    try {
      await updateEmploymentType({
        id: selectedType.id,
        employmentType: selectedType.employmentType.trim()
      });
      showSuccessToast('Updated successfully');
      closeEditModal();
    } catch {
      showErrorToast('Failed to update');
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteEmploymentType(selectedType.id);
      showSuccessToast('Deleted successfully');
      closeDeleteModal();
      closeEditModal();
    } catch {
      showErrorToast('Failed to delete');
    }
  };

  const handleAdd = async () => {
    if (!isValidEmploymentType(newTypeName)) {
      showErrorToast(
        'Only letters, numbers, spaces, underscores, hyphens, and parentheses are allowed. No two or more consecutive digits.'
      );
      return;
    }

    if (
      employmentTypes.some(
        (type: any) =>
          type.employmentType.toLowerCase() === newTypeName.toLowerCase()
      )
    ) {
      showErrorToast('This employment type already exists');
      return;
    }

    try {
      await addEmploymentType({ employmentType: newTypeName.trim() });
      showSuccessToast('Added successfully');
      closeAddModal();
      setNewTypeName('');
    } catch {
      showErrorToast('Failed to add');
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
            filteredCount={filteredEmploymentType.length}
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
                placeholder='Search by employment type...'
                leftSection={<IconSearch size={16} />}
                value={searchQuery}
                onChange={handleSearch}
                radius='md'
                style={{ flex: 1 }}
              />

              <Group wrap='nowrap' gap='md'>
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

                {filteredEmploymentType.length !== employmentTypes.length && (
                  <Badge variant='light' color='blue'>
                    {filteredEmploymentType.length} of {employmentTypes.length}{' '}
                    types
                  </Badge>
                )}
              </Group>
            </Flex>
          </Card>

          {/* Table or Cards */}
          <Card shadow='sm' p={0} radius='md'>
            <DataView
              isLoading={isLoading}
              label='employment types'
              isEmpty={paginatedData.length === 0 && !isLoading}
            >
              {isMobile ? (
                // Mobile Card View
                <ScrollArea p='md'>
                  <Stack gap='sm'>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((type: any, index: number) => (
                        <MobileTypeCard
                          color={currentThemeConfig.button.color}
                          key={type.id}
                          type={type}
                          index={index}
                          activePage={activePage}
                          itemsPerPage={itemsPerPage}
                          onEdit={handleEdit}
                        />
                      ))
                    ) : (
                      <Card p='xl' withBorder>
                        <Stack align='center' gap='md'>
                          <IconCategory size={48} opacity={0.5} />
                          <Text size='lg' ta='center'>
                            No employment types found
                          </Text>
                          <Text size='sm' ta='center'>
                            {searchQuery
                              ? 'Try adjusting your search'
                              : 'Start by adding your first employment type'}
                          </Text>
                          {!searchQuery && (
                            <CommonButton
                              variant='light'
                              leftSection={<IconPlus size={16} />}
                              onClick={openAddModal}
                              fullWidth={isSmallMobile}
                            >
                              Add Type
                            </CommonButton>
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
                    {' '}
                    <Table.Thead
                      style={{
                        backgroundColor: currentThemeConfig.backgroundColor,
                        color: currentThemeConfig.color
                      }}
                    >
                      <Table.Tr>
                        <Table.Th
                          className='p-3 border'
                          style={{ width: '100px' }}
                        >
                          <Group justify='center'>
                            <Text size='sm' fw={500}>
                              S.No
                            </Text>
                          </Group>
                        </Table.Th>
                        <Table.Th className='p-3 border'>
                          <Text size='sm' fw={500}>
                            Employment Type
                          </Text>
                        </Table.Th>
                        <Table.Th
                          className='p-3 border'
                          style={{ width: '120px' }}
                        >
                          <Group justify='center'>
                            <Text size='sm' fw={500}>
                              Actions
                            </Text>
                          </Group>
                        </Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {paginatedData.length > 0 ? (
                        paginatedData.map((type: any, index: number) => (
                          <Table.Tr key={type.id} className='transition-colors'>
                            <Table.Td className='text-center'>
                              <Text size='sm'>
                                {index + 1 + (activePage - 1) * itemsPerPage}
                              </Text>
                            </Table.Td>
                            <Table.Td className='p-3'>
                              <Text size='sm'>{type.employmentType}</Text>
                            </Table.Td>
                            <Table.Td className='p-3'>
                              <TypeActions
                                type={type}
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
                              <IconCategory size={48} opacity={0.5} />
                              <Text size='lg'>No employment types found</Text>
                              <Text size='sm'>
                                {searchQuery
                                  ? 'Try adjusting your search'
                                  : 'Start by adding your first employment type'}
                              </Text>
                              {!searchQuery && (
                                <CommonButton
                                  variant='light'
                                  leftSection={<IconPlus size={16} />}
                                  onClick={openAddModal}
                                >
                                  Add Type
                                </CommonButton>
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
              <IconCategory
                size={20}
                stroke={1.8}
                color={currentThemeConfig.button.color}
              />
              <Text fw={600} size='lg'>
                Add New Employment Type
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
              label='Type Name'
              value={newTypeName}
              onChange={e => {
                const value = e.target.value;
                if (value === '' || isValidEmploymentType(value)) {
                  setNewTypeName(value);
                }
              }}
              placeholder='Enter type name'
              required
              size='md'
            />
            <Group justify='flex-end' mt='xs'>
              <CommonButton variant='default' onClick={closeAddModal}>
                Cancel
              </CommonButton>
              <CommonButton
                onClick={handleAdd}
                disabled={isMutating || !newTypeName.trim()}
                leftSection={<IconDeviceFloppy size={16} />}
              >
                {isAdding ? 'Adding...' : 'Add Type'}
              </CommonButton>
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
                Edit Employment Type
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
              label='Type Name'
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
              size='md'
            />
            <Group justify='space-between'>
              {isMobile ? (
                <Tooltip label='Delete Type'>
                  <CommonButton
                    onClick={openDeleteModal}
                    p='xs'
                    variant='outline'
                  >
                    <IconTrash size={16} />
                  </CommonButton>
                </Tooltip>
              ) : (
                <CommonButton
                  color={currentThemeConfig.dangerColor}
                  variant='outline'
                  leftSection={<IconTrash size={16} />}
                  onClick={() => handleDelete(selectedType.id)}
                >
                  Delete
                </CommonButton>
              )}
              <Group>
                <CommonButton variant='default' onClick={closeEditModal}>
                  Cancel
                </CommonButton>
                <CommonButton
                  onClick={confirmEdit}
                  disabled={isMutating}
                  leftSection={<IconDeviceFloppy size={16} />}
                >
                  {isUpdating ? 'Saving...' : 'Save'}
                </CommonButton>
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
                Delete Employment Type
              </Text>
            </Group>
          }
          centered
          size='md'
        >
          <Stack gap='md'>
            <Text size='sm' mt='md'>
              Are you sure you want to delete this employment type? This action
              cannot be undone.
            </Text>
            <Group justify='flex-end' mt='md'>
              <CommonButton variant='default' onClick={closeDeleteModal}>
                Cancel
              </CommonButton>
              <CommonButton
                color={currentThemeConfig.dangerColor}
                onClick={confirmDelete}
                disabled={isMutating}
                leftSection={<IconTrash size={16} />}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </CommonButton>
            </Group>
          </Stack>
        </Modal>
      </Card>
    </Container>
  );
};

export default EmploymentType;
