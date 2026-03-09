import { useState, useEffect, useMemo, useCallback } from 'react';
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
import PremiumLoader from '@components/common/loaders/PremiumLoader';
import DataView from '@components/common/loaders/DataView';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconEdit,
  IconPlus,
  IconTrash,
  IconSearch,
  IconAlertTriangle,
  IconDeviceFloppy,
  IconBriefcase
} from '@tabler/icons-react';
import { debounce } from '@utils/common/debounce';
import { useCustomToast } from '@utils/common/toast';
import { useAppTheme } from '@hooks/use-app-theme';
import { useGetAllEmployeeRolesByAdmin } from '@hooks/queries/useAdminQueries';
import {
  useAddEmployeeRoleByAdmin,
  useUpdateEmployeeRoleByAdmin,
  useDeleteEmployeeRoleByAdmin
} from '@hooks/mutations/useAdminMutations';
import { CommonButton } from '@components/common/button/CommonButton';

const ITEMS_PER_PAGE_OPTIONS = ['5', '10', '20', '50'];
const DEFAULT_ITEMS_PER_PAGE = 10;

const isValidDesignation = (designation: string) =>
  /^([A-Za-z()\-\s_]|[0-9])+$/.test(designation) && !/\d{2,}/.test(designation);

// Role Actions Component
const RoleActions: React.FC<{
  role: any;
  onEdit: (role: any) => void;
  color: string;
  isMobile?: boolean;
}> = ({ role, onEdit, color, isMobile = false }) => (
  <Group gap='xs' justify='center'>
    <Tooltip label='Edit Role'>
      <ActionIcon
        variant='subtle'
        color={color}
        onClick={() => onEdit(role)}
        size={isMobile ? 'md' : 'sm'}
      >
        <IconEdit size={isMobile ? 18 : 16} />
      </ActionIcon>
    </Tooltip>
  </Group>
);

// Mobile Role Card Component
const MobileRoleCard: React.FC<{
  role: any;
  index: number;
  activePage: number;
  color: string;
  itemsPerPage: number;
  onEdit: (role: any) => void;
}> = ({ role, index, activePage, itemsPerPage, color, onEdit }) => {
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
            onClick={() => onEdit(role)}
            size='md'
          >
            <IconEdit size={18} />
          </ActionIcon>
        </Group>

        <Divider />

        <Stack gap={2}>
          <Text size='xs' fw={600} c='dimmed'>
            Employment Role
          </Text>
          <Text size='lg' fw={600}>
            {role.designation}
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
        Manage Employment Roles ({filteredCount} roles)
      </Text>
      <CommonButton
        leftSection={<IconPlus size={16} />}
        onClick={onAdd}
        variant='filled'
        fullWidth={isMobile}
        size={isMobile ? 'md' : 'sm'}
      >
        Add Role
      </CommonButton>
    </Flex>
  </Card>
);

const EmploymentRoles = () => {
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const {
    themeConfig: currentThemeConfig,
    organizationConfig,
    isDarkTheme
  } = useAppTheme();

  const {
    data: employmentRoles = [],
    isLoading,
    isFetching
  } = useGetAllEmployeeRolesByAdmin();
  const { mutateAsync: addEmployeeRole, isPending: isAdding } =
    useAddEmployeeRoleByAdmin();
  const { mutateAsync: updateEmployeeRole, isPending: isUpdating } =
    useUpdateEmployeeRoleByAdmin();
  const { mutateAsync: deleteEmployeeRole, isPending: isDeleting } =
    useDeleteEmployeeRoleByAdmin();

  const isMutating = isAdding || isUpdating || isDeleting;

  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [selectedRole, setSelectedRole] = useState<any | null>(null);
  const [newRoleName, setNewRoleName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');

  // Get the current theme configuration

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

  const filteredEmploymentRole = useMemo(() => {
    if (!filterString) return employmentRoles;
    return employmentRoles.filter((role: any) =>
      role.designation.toLowerCase().includes(filterString)
    );
  }, [employmentRoles, filterString]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleEdit = (role: any) => {
    setSelectedRole(role);
    openEditModal();
  };

  const handleDelete = (id: string) => {
    setSelectedRole({ id });
    openDeleteModal();
  };

  const confirmEdit = async () => {
    if (!isValidDesignation(selectedRole.designation)) {
      showErrorToast(
        'Only letters, numbers, spaces, underscores, hyphens, and parentheses are allowed. No two or more consecutive digits.'
      );
      return;
    }

    if (
      employmentRoles.some(
        (role: any) =>
          role.designation.toLowerCase() ===
            selectedRole.designation.toLowerCase() &&
          role.id !== selectedRole.id
      )
    ) {
      showErrorToast('This role already exists');
      return;
    }
    try {
      await updateEmployeeRole({
        id: selectedRole.id,
        designation: selectedRole.designation
      });
      showSuccessToast('Updated successfully');
      closeEditModal();
    } catch {
      showErrorToast('Failed to update');
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteEmployeeRole(selectedRole.id);
      showSuccessToast('Deleted successfully');
      closeDeleteModal();
      closeEditModal();
    } catch {
      showErrorToast('Failed to delete');
    }
  };

  const handleAdd = async () => {
    if (!isValidDesignation(newRoleName)) {
      showErrorToast(
        'Only letters, numbers, spaces, underscores, hyphens, and parentheses are allowed. No two or more consecutive digits.'
      );
      return;
    }

    if (
      employmentRoles.some(
        (role: any) =>
          role.designation.toLowerCase() === newRoleName.toLowerCase()
      )
    ) {
      showErrorToast('This role already exists');
      return;
    }
    try {
      await addEmployeeRole({ designation: newRoleName });
      showSuccessToast('Added successfully');
      closeAddModal();
      setNewRoleName('');
    } catch {
      showErrorToast('Failed to add');
    }
  };

  // Pagination logic
  const { paginatedData, totalPages } = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginated = filteredEmploymentRole.slice(start, end);
    const pages = Math.ceil(filteredEmploymentRole.length / itemsPerPage);

    return { paginatedData: paginated, totalPages: pages };
  }, [filteredEmploymentRole, activePage, itemsPerPage]);

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
            filteredCount={filteredEmploymentRole.length}
            onAdd={openAddModal}
            isMobile={isMobile}
          />

          <Card shadow='sm' p={isMobile ? 'sm' : 'md'} radius='md'>
            <Flex
              direction={isMobile ? 'column' : 'row'}
              justify='space-between'
              align={isMobile ? 'stretch' : 'center'}
              gap='md'
            >
              <TextInput
                placeholder='Search by employment role...'
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

                {filteredEmploymentRole.length !== employmentRoles.length && (
                  <Badge variant='light' color='blue'>
                    {filteredEmploymentRole.length} of {employmentRoles.length}{' '}
                    roles
                  </Badge>
                )}
              </Group>
            </Flex>
          </Card>

          {/* Table or Cards */}
          <DataView isLoading={isLoading} label='employment roles'>
            {isMobile ? (
              // Mobile Card View
              <ScrollArea p='md'>
                <Stack gap='sm'>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((role: any, index: number) => (
                      <MobileRoleCard
                        color={currentThemeConfig.button.color}
                        key={role.id}
                        role={role}
                        index={index}
                        activePage={activePage}
                        itemsPerPage={itemsPerPage}
                        onEdit={handleEdit}
                      />
                    ))
                  ) : (
                    <Card p='xl' withBorder>
                      <Stack align='center' gap='md'>
                        <IconBriefcase size={48} opacity={0.5} />
                        <Text size='lg' ta='center'>
                          No employment roles found
                        </Text>
                        <Text size='sm' ta='center'>
                          {searchQuery
                            ? 'Try adjusting your search'
                            : 'Start by adding your first employment role'}
                        </Text>
                        {!searchQuery && (
                          <CommonButton
                            variant='light'
                            leftSection={<IconPlus size={16} />}
                            onClick={openAddModal}
                            fullWidth={isSmallMobile}
                          >
                            Add Role
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
                          Employment Role
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
                      paginatedData.map((role: any, index: number) => (
                        <Table.Tr key={role.id} className='transition-colors'>
                          <Table.Td className='text-center'>
                            <Text size='sm'>
                              {index + 1 + (activePage - 1) * itemsPerPage}
                            </Text>
                          </Table.Td>
                          <Table.Td className='p-3'>
                            <Text size='sm'>{role.designation}</Text>
                          </Table.Td>
                          <Table.Td className='p-3'>
                            <RoleActions
                              role={role}
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
                            <IconBriefcase size={48} opacity={0.5} />
                            <Text size='lg'>No employment roles found</Text>
                            <Text size='sm'>
                              {searchQuery
                                ? 'Try adjusting your search'
                                : 'Start by adding your first employment role'}
                            </Text>
                            {!searchQuery && (
                              <CommonButton
                                variant='light'
                                leftSection={<IconPlus size={16} />}
                                onClick={openAddModal}
                              >
                                Add Role
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
              <IconBriefcase
                size={20}
                stroke={1.8}
                color={currentThemeConfig.button.color}
              />
              <Text fw={600} size='lg'>
                Add New Employment Role
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
              label='Role Name'
              value={newRoleName}
              onChange={e => {
                const value = e.target.value;
                if (value === '' || isValidDesignation(value)) {
                  setNewRoleName(value);
                }
              }}
              placeholder='Enter role name'
              required
              size='md'
            />
            <Group justify='flex-end' mt='xs'>
              <CommonButton variant='default' onClick={closeAddModal}>
                Cancel
              </CommonButton>
              <CommonButton
                onClick={handleAdd}
                disabled={isMutating || !newRoleName.trim()}
                leftSection={<IconDeviceFloppy size={16} />}
              >
                {isAdding ? 'Adding...' : 'Add Role'}
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
                Edit Employment Role
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
              label='Role Name'
              value={selectedRole?.designation || ''}
              onChange={e => {
                const value = e.target.value;
                if (value === '' || isValidDesignation(value)) {
                  setSelectedRole({
                    ...selectedRole,
                    designation: value
                  });
                }
              }}
              required
              size='md'
            />
            <Group justify='space-between' mt='xs'>
              {isMobile ? (
                <Tooltip label='Delete Role'>
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
                  color='red'
                  variant='outline'
                  leftSection={<IconTrash size={16} />}
                  onClick={() => handleDelete(selectedRole.id)}
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
              <IconAlertTriangle size={24} color='red' />
              <Text fw={600} size='lg' c='red'>
                Delete Employment Role
              </Text>
            </Group>
          }
          centered
          size='md'
        >
          <Stack gap='md'>
            <Text size='sm' mt='md'>
              Are you sure you want to delete this employment role? This action
              cannot be undone.
            </Text>
            <Group justify='flex-end' mt='md'>
              <CommonButton variant='default' onClick={closeDeleteModal}>
                Cancel
              </CommonButton>
              <CommonButton
                color='red'
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

export default EmploymentRoles;
