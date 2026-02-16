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
  IconBriefcase
} from '@tabler/icons-react';
import {
  addEmployeeRoleByAdmin,
  deleteEmployeeRoleByAdmin,
  getAllEmployeeRoleByAdmin,
  updateEmployeeRoleByAdmin
} from '../../../../services/admin-services';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { themeAtom } from '../../../../atoms/theme';
import { debounce } from '../../../../utils/common/debounce';
import { useCustomToast } from '../../../../utils/common/toast';
import { getThemeConfig } from '../../../../utils/common/theme-utils';

const ITEMS_PER_PAGE_OPTIONS = ['5', '10', '20', '50'];
const DEFAULT_ITEMS_PER_PAGE = 10;

const isValidDesignation = (designation: string) =>
  /^([A-Za-z()\-\s_]|[0-9])+$/.test(designation) && !/\d{2,}/.test(designation);

// Role Actions Component
const RoleActions: React.FC<{
  role: any;
  onEdit: (role: any) => void;
  isMobile?: boolean;
}> = ({ role, onEdit, isMobile = false }) => (
  <Group gap="xs" justify="center">
    <Tooltip label="Edit Role">
      <ActionIcon
        variant="subtle"
        color="blue"
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
  itemsPerPage: number;
  onEdit: (role: any) => void;
}> = ({ role, index, activePage, itemsPerPage, onEdit }) => {
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
            onClick={() => onEdit(role)}
            size="md"
          >
            <IconEdit size={18} />
          </ActionIcon>
        </Group>

        <Divider />

        <Stack gap={2}>
          <Text size="xs" fw={600} c="dimmed">
            Employment Role
          </Text>
          <Text size="lg" fw={600}>
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
        Manage Employment Roles ({filteredCount} roles)
      </Text>
      <Button
        leftSection={<IconPlus size={16} />}
        onClick={onAdd}
        variant="filled"
        fullWidth={isMobile}
        size={isMobile ? 'md' : 'sm'}
      >
        Add Role
      </Button>
    </Flex>
  </Card>
);

const EmploymentRoles = () => {
  const { showErrorToast, showSuccessToast } = useCustomToast();

  const [employmentRoles, setEmploymentRoles] = useState<
    { id: string; designation: string }[]
  >([]);
  const [filteredEmploymentRole, setFilteredEmploymentRole] = useState<any[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [selectedRole, setSelectedRole] = useState<any | null>(null);
  const [newRoleName, setNewRoleName] = useState('');
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

  const fetchEmploymentRoles = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllEmployeeRoleByAdmin();
      setEmploymentRoles(data);
      setFilteredEmploymentRole(data);
    } catch {
      showErrorToast('Failed to fetch employment roles');
    } finally {
      setIsLoading(false);
    }
  }, [setEmploymentRoles, showErrorToast]);

  useEffect(() => {
    if (employmentRoles.length === 0) {
      fetchEmploymentRoles();
    } else {
      setFilteredEmploymentRole(employmentRoles);
      setIsLoading(false);
    }
  }, [employmentRoles, fetchEmploymentRoles]);

  // Debounced search
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        const filtered = employmentRoles.filter(role =>
          role.designation.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredEmploymentRole(filtered);
        setActivePage(1);
      }, 300),
    [employmentRoles]
  );

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
        role =>
          role.designation.toLowerCase() ===
            selectedRole.designation.toLowerCase() &&
          role.id !== selectedRole.id
      )
    ) {
      showErrorToast('This role already exists');
      return;
    }
    setIsLoading(true);
    try {
      await updateEmployeeRoleByAdmin(
        selectedRole.id,
        selectedRole.designation
      );
      showSuccessToast('Updated successfully');
      fetchEmploymentRoles();
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
      await deleteEmployeeRoleByAdmin(selectedRole.id);
      showSuccessToast('Deleted successfully');
      fetchEmploymentRoles();
      closeDeleteModal();
      closeEditModal();
    } catch {
      showErrorToast('Failed to delete');
    } finally {
      setIsLoading(false);
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
        role => role.designation.toLowerCase() === newRoleName.toLowerCase()
      )
    ) {
      showErrorToast('This role already exists');
      return;
    }
    setIsLoading(true);
    try {
      await addEmployeeRoleByAdmin({ designation: newRoleName });
      showSuccessToast('Added successfully');
      fetchEmploymentRoles();
      closeAddModal();
      setNewRoleName('');
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
    const paginated = filteredEmploymentRole.slice(start, end);
    const pages = Math.ceil(filteredEmploymentRole.length / itemsPerPage);

    return { paginatedData: paginated, totalPages: pages };
  }, [filteredEmploymentRole, activePage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setActivePage(1);
  }, [itemsPerPage]);

  return (
    <Container size="xl" py="md" my="xl" px={isSmallMobile ? 'xs' : 'md'}>
      <Stack gap="md">
        {/* Header */}
        <HeadingComponent
          filteredCount={filteredEmploymentRole.length}
          onAdd={openAddModal}
          isMobile={isMobile}
        />

        {/* Filters */}
        <Card shadow="sm" p={isMobile ? 'sm' : 'md'} radius="md" withBorder>
          <Stack gap="md">
            <TextInput
              placeholder="Search by employment role..."
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

              {filteredEmploymentRole.length !== employmentRoles.length && (
                <Badge variant="light" color="blue">
                  {filteredEmploymentRole.length} of {employmentRoles.length}{' '}
                  roles
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
                <Text>Loading employment roles...</Text>
              </Stack>
            </Center>
          ) : isMobile ? (
            // Mobile Card View
            <ScrollArea p="md">
              <Stack gap="sm">
                {paginatedData.length > 0 ? (
                  paginatedData.map((role, index) => (
                    <MobileRoleCard
                      key={role.id}
                      role={role}
                      index={index}
                      activePage={activePage}
                      itemsPerPage={itemsPerPage}
                      onEdit={handleEdit}
                    />
                  ))
                ) : (
                  <Card p="xl" withBorder>
                    <Stack align="center" gap="md">
                      <IconBriefcase size={48} opacity={0.5} />
                      <Text size="lg" ta="center">
                        No employment roles found
                      </Text>
                      <Text size="sm" ta="center">
                        {searchQuery
                          ? 'Try adjusting your search'
                          : 'Start by adding your first employment role'}
                      </Text>
                      {!searchQuery && (
                        <Button
                          variant="light"
                          leftSection={<IconPlus size={16} />}
                          onClick={openAddModal}
                          fullWidth={isSmallMobile}
                        >
                          Add Role
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
                        Employment Role
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
                    paginatedData.map((role, index) => (
                      <Table.Tr key={role.id} className="transition-colors">
                        <Table.Td className="text-center p-3">
                          <Text size="sm">
                            {index + 1 + (activePage - 1) * itemsPerPage}
                          </Text>
                        </Table.Td>
                        <Table.Td className="p-3">
                          <Text size="sm" fw={500}>
                            {role.designation}
                          </Text>
                        </Table.Td>
                        <Table.Td className="p-3">
                          <RoleActions role={role} onEdit={handleEdit} />
                        </Table.Td>
                      </Table.Tr>
                    ))
                  ) : (
                    <Table.Tr>
                      <Table.Td colSpan={3} className="text-center p-8">
                        <Stack align="center" gap="md">
                          <IconBriefcase size={48} opacity={0.5} />
                          <Text size="lg">No employment roles found</Text>
                          <Text size="sm">
                            {searchQuery
                              ? 'Try adjusting your search'
                              : 'Start by adding your first employment role'}
                          </Text>
                          {!searchQuery && (
                            <Button
                              variant="light"
                              leftSection={<IconPlus size={16} />}
                              onClick={openAddModal}
                            >
                              Add Role
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
              Add New Employment Role
            </Text>
          </Group>
        }
        centered
        size="md"
      >
        <Stack gap="md">
          <TextInput
            label="Role Name"
            value={newRoleName}
            onChange={e => {
              const value = e.target.value;
              if (value === '' || isValidDesignation(value)) {
                setNewRoleName(value);
              }
            }}
            placeholder="Enter role name"
            required
            size="md"
          />
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={closeAddModal}>
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              disabled={isLoading || !newRoleName.trim()}
              leftSection={<IconDeviceFloppy size={16} />}
            >
              {isLoading ? 'Adding...' : 'Add Role'}
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
              Edit Employment Role
            </Text>
          </Group>
        }
        centered
        size="md"
      >
        <Stack gap="md">
          <TextInput
            label="Role Name"
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
            size="md"
          />
          <Group justify="space-between" mt="md">
            <Button
              color="red"
              variant="outline"
              leftSection={<IconTrash size={16} />}
              onClick={() => handleDelete(selectedRole.id)}
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
              Delete Employment Role
            </Text>
          </Group>
        }
        centered
        size="md"
      >
        <Stack gap="md">
          <Text size="sm">
            Are you sure you want to delete this employment role? This action
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

export default EmploymentRoles;
