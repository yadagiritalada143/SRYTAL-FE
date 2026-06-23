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
import DataView from '@components/common/loaders/DataView';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconEdit,
  IconPlus,
  IconTrash,
  IconSearch,
  IconAlertTriangle,
  IconDeviceFloppy,
  IconCategory,
  IconBuildingBank
} from '@tabler/icons-react';
import { debounce } from '@utils/common/debounce';
import { useCustomToast } from '@utils/common/toast';
import { useAppTheme } from '@hooks/use-app-theme';
import type { Department } from '@interfaces/department';
import { useGetAllDepartmentsByAdmin } from '@hooks/queries/useAdminQueries';
import {
  useAddDepartmentByAdmin,
  useUpdateDepartmentByAdmin,
  useDeleteDepartmentByAdmin
} from '@hooks/mutations/useAdminMutations';
import { CommonButton } from '@components/common/button/CommonButton';
import PageHeader from '@components/common/page-header/PageHeader';

const ITEMS_PER_PAGE_OPTIONS = ['5', '10', '20', '50'];
const DEFAULT_ITEMS_PER_PAGE = 10;

// Mobile card view for a single department.
const MobileDepartmentCard: React.FC<{
  type: Department;
  index: number;
  activePage: number;
  color: string;
  itemsPerPage: number;
  onEdit: (type: Department) => void;
}> = ({ type, index, activePage, color, itemsPerPage, onEdit }) => (
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
          Department
        </Text>
        <Text size='lg' fw={600}>
          {type.departmentName}
        </Text>
      </Stack>
    </Stack>
  </Card>
);

export default function DepartmentTable() {
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const { themeConfig: currentThemeConfig, isDarkTheme } = useAppTheme();

  const { data: departments = [], isLoading } = useGetAllDepartmentsByAdmin();
  const { mutateAsync: addDepartment, isPending: isAdding } =
    useAddDepartmentByAdmin();
  const { mutateAsync: updateDepartment, isPending: isUpdating } =
    useUpdateDepartmentByAdmin();
  const { mutateAsync: deleteDepartment, isPending: isDeleting } =
    useDeleteDepartmentByAdmin();

  const isMutating = isAdding || isUpdating || isDeleting;

  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  const [selected, setSelected] = useState<Department | null>(null);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure(false);
  const [editOpened, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');

  const [filterString, setFilterString] = useState('');

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setFilterString(query.toLowerCase());
        setActivePage(1);
      }, 300),
    []
  );

  const filtered = useMemo(() => {
    if (!filterString) return departments;
    return departments.filter((department: Department) =>
      department.departmentName.toLowerCase().includes(filterString)
    );
  }, [departments, filterString]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleAdd = async () => {
    if (!newDepartmentName.trim())
      return showErrorToast('Department is required');
    try {
      await addDepartment({ departmentName: newDepartmentName.trim() } as any);
      showSuccessToast('Department added successfully');
      setNewDepartmentName('');
      closeAdd();
    } catch {
      showErrorToast('Failed to add');
    }
  };

  const handleEdit = (item: Department) => {
    setSelected(item);
    openEdit();
  };

  const confirmEdit = async () => {
    if (!selected?.departmentName.trim()) return showErrorToast('Required');

    try {
      await updateDepartment({
        id: selected._id,
        departmentName: selected.departmentName.trim()
      });
      showSuccessToast('Department updated successfully');
      closeEdit();
    } catch {
      showErrorToast('Failed to update');
    }
  };

  const confirmDelete = async () => {
    if (!selected) return;

    try {
      await deleteDepartment(selected._id);
      showSuccessToast('Department deleted successfully');
      closeDelete();
      closeEdit();
    } catch {
      showErrorToast('Failed to delete');
    }
  };

  /*---------------PAGINATION----------------*/
  const { paginatedData, totalPages } = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return {
      paginatedData: filtered.slice(start, end),
      totalPages: Math.ceil(filtered.length / itemsPerPage)
    };
  }, [filtered, activePage, itemsPerPage]);

  useEffect(() => setActivePage(1), [itemsPerPage]);

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
          <PageHeader
            title='Departments'
            subtitle='Organize employees into departments across the organization.'
            icon={<IconBuildingBank size={24} />}
            count={filtered.length}
            actions={
              <CommonButton
                leftSection={<IconPlus size={16} />}
                onClick={openAdd}
                variant='filled'
                fullWidth={isMobile}
                size={isMobile ? 'md' : 'sm'}
              >
                Add Department
              </CommonButton>
            }
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
                placeholder='Search departments...'
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
                    onChange={v =>
                      setItemsPerPage(Number(v) || DEFAULT_ITEMS_PER_PAGE)
                    }
                    w={80}
                    size='sm'
                  />
                </Group>

                {filtered.length !== departments.length && (
                  <Badge variant='light' color={currentThemeConfig.dangerColor}>
                    {filtered.length} of {departments.length}
                  </Badge>
                )}
              </Group>
            </Flex>
          </Card>

          {/* Table or Cards */}
          <Card shadow='sm' p={0} radius='md'>
            <DataView
              isLoading={isLoading}
              label='departments'
              isEmpty={paginatedData.length === 0 && !isLoading}
            >
              {isMobile ? (
                <ScrollArea p='md'>
                  <Stack gap='sm'>
                    {filtered.length === 0 ? (
                      <Card p='xl' withBorder>
                        <Stack align='center' gap='md'>
                          <IconCategory size={48} opacity={0.5} />
                          <Text size='lg' ta='center'>
                            No departments found
                          </Text>
                          <Text size='sm' ta='center'>
                            {searchQuery
                              ? 'Try adjusting your search'
                              : 'Start by adding your first department'}
                          </Text>
                          {!searchQuery && (
                            <CommonButton
                              variant='light'
                              leftSection={<IconPlus size={16} />}
                              onClick={openAdd}
                              fullWidth={isSmallMobile}
                            >
                              Add Department
                            </CommonButton>
                          )}
                        </Stack>
                      </Card>
                    ) : (
                      paginatedData.map((type: Department, index: number) => (
                        <MobileDepartmentCard
                          color={currentThemeConfig.button.color}
                          key={type._id}
                          type={type}
                          index={index}
                          activePage={activePage}
                          itemsPerPage={itemsPerPage}
                          onEdit={handleEdit}
                        />
                      ))
                    )}
                  </Stack>
                </ScrollArea>
              ) : (
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
                            Departments
                          </Text>
                        </Table.Th>
                        <Table.Th
                          className='p-3 border'
                          style={{ width: '100px' }}
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
                      {paginatedData.map((item: Department, index: number) => (
                        <Table.Tr key={item._id} className='transition-colors'>
                          <Table.Td className='text-center'>
                            {index + 1 + (activePage - 1) * itemsPerPage}
                          </Table.Td>
                          <Table.Td>{item.departmentName}</Table.Td>
                          <Table.Td className='text-center'>
                            <Group justify='center'>
                              <Tooltip label='Edit Department'>
                                <ActionIcon
                                  color={currentThemeConfig.button.color}
                                  variant='subtle'
                                  onClick={() => handleEdit(item)}
                                >
                                  <IconEdit size={16} />
                                </ActionIcon>
                              </Tooltip>
                            </Group>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </ScrollArea>
              )}
            </DataView>
          </Card>

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

        {/* ADD MODAL */}
        <Modal
          opened={addOpened}
          onClose={closeAdd}
          title={
            <Group gap='xs'>
              <IconBuildingBank
                size={20}
                stroke={1.8}
                color={currentThemeConfig.button.color}
              />
              <Text fw={600} size='lg'>
                Add New Department
              </Text>
            </Group>
          }
          centered
          size='md'
          styles={{ header: { paddingBottom: 4, paddingTop: 5 } }}
        >
          <Stack>
            <TextInput
              mt='md'
              label='Department'
              value={newDepartmentName}
              onChange={e => setNewDepartmentName(e.target.value)}
              placeholder='Enter the department'
              required
            />
            <Group justify='flex-end'>
              <CommonButton variant='default' onClick={closeAdd}>
                Cancel
              </CommonButton>
              <CommonButton
                onClick={handleAdd}
                disabled={isMutating || !newDepartmentName.trim()}
                leftSection={<IconDeviceFloppy size={16} />}
              >
                {isAdding ? 'Adding...' : 'Add'}
              </CommonButton>
            </Group>
          </Stack>
        </Modal>

        {/* EDIT MODAL */}
        <Modal
          opened={editOpened}
          onClose={closeEdit}
          title={
            <Group gap='xs'>
              <IconEdit size={20} color={currentThemeConfig.button.color} />
              <Text fw={600} size='lg'>
                Edit Department
              </Text>
            </Group>
          }
          centered
          size='md'
          styles={{ header: { paddingBottom: 4, paddingTop: 5 } }}
        >
          <Stack>
            <TextInput
              mt='md'
              label='Department'
              placeholder='Enter the department'
              value={selected?.departmentName || ''}
              onChange={e =>
                setSelected(prev =>
                  prev ? { ...prev, departmentName: e.target.value } : prev
                )
              }
              required
              size='md'
            />

            <Group justify='space-between'>
              {isMobile ? (
                <Tooltip label='Delete Department'>
                  <CommonButton onClick={openDelete} p='xs' variant='outline'>
                    <IconTrash size={16} />
                  </CommonButton>
                </Tooltip>
              ) : (
                <CommonButton
                  color={currentThemeConfig.dangerColor}
                  variant='outline'
                  onClick={openDelete}
                  leftSection={<IconTrash size={16} />}
                >
                  Delete
                </CommonButton>
              )}

              <Group>
                <CommonButton variant='default' onClick={closeEdit}>
                  Cancel
                </CommonButton>
                <CommonButton
                  onClick={confirmEdit}
                  leftSection={<IconDeviceFloppy size={16} />}
                  disabled={isMutating}
                >
                  {isUpdating ? 'Saving...' : 'Save'}
                </CommonButton>
              </Group>
            </Group>
          </Stack>
        </Modal>

        {/* DELETE MODAL */}
        <Modal
          opened={deleteOpened}
          onClose={closeDelete}
          title={
            <Group gap='xs'>
              <IconAlertTriangle
                size={24}
                color={currentThemeConfig.dangerColor}
              />
              <Text fw={600} size='lg' c={currentThemeConfig.dangerColor}>
                Delete Department
              </Text>
            </Group>
          }
          centered
          size='md'
        >
          <Stack gap='md'>
            <Text size='sm' mt='sm'>
              Are you sure you want to delete this department? This action
              cannot be undone.
            </Text>
            <Group justify='flex-end' mt='md'>
              <CommonButton variant='default' onClick={closeDelete}>
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
}
