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
  IconCategory
} from '@tabler/icons-react';
import { debounce } from '@utils/common/debounce';
import { useCustomToast } from '@utils/common/toast';
import { useAppTheme } from '@hooks/use-app-theme';
import type { Department } from '@interfaces/department';
import { useGetAllDepartmentsByAdmin } from '@hooks/queries/useAdminQueries';
import { useAddDepartmentByAdmin } from '@hooks/mutations/useAdminMutations';

const ITEMS_PER_PAGE_OPTIONS = ['5', '10', '20', '50'];
const DEFAULT_ITEMS_PER_PAGE = 10;

export default function DepartmentTable() {
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const {
    themeConfig: currentThemeConfig,
    organizationConfig,
    isDarkTheme
  } = useAppTheme();

  const { data: departments = [], isLoading } = useGetAllDepartmentsByAdmin();
  const { mutateAsync: addDepartment, isPending: isAdding } =
    useAddDepartmentByAdmin();

  const isMutating = isAdding;

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
      return showErrorToast('Department name is required');
    try {
      await addDepartment({ departmentName: newDepartmentName.trim() } as any);
      showSuccessToast('Department Name added successfully !!');
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

  const MobileTypeCard: React.FC<{
    type: Department;
    index: number;
    activePage: number;
    color: string;
    itemsPerPage: number;
    onEdit: (type: any) => void;
  }> = ({ type, index, activePage, color, itemsPerPage, onEdit }) => {
    return (
      <Card shadow='sm' p='md' mb='sm'>
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
              Department Name
            </Text>
            <Text size='lg' fw={600}>
              {type.departmentName}
            </Text>
          </Stack>
        </Stack>
      </Card>
    );
  };

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
          {/*Header*/}
          <Card shadow='sm' p={isMobile ? 'md' : 'lg'} radius='md'>
            <Flex
              direction={isMobile ? 'column' : 'row'}
              justify='space-between'
              align='center'
              gap='md'
            >
              <Text size={isMobile ? 'lg' : 'xl'} fw={700}>
                Manage Department Names ({filtered.length})
              </Text>

              <Button
                leftSection={<IconPlus size={16} />}
                onClick={openAdd}
                fullWidth={isMobile}
                radius='md'
              >
                Add Department Name
              </Button>
            </Flex>
          </Card>

          <Card shadow='sm' p='md' radius='md'>
            <Flex
              direction={isMobile ? 'column' : 'row'}
              justify='space-between'
              align={isMobile ? 'stretch' : 'center'}
              gap='md'
            >
              <TextInput
                placeholder='Search department name....'
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
                  <Badge variant='light' color='blue'>
                    {filtered.length} of {departments.length}
                  </Badge>
                )}
              </Group>
            </Flex>
          </Card>

          {/*TABLE*/}
          <DataView isLoading={isLoading} label='Department Names'>
            {isMobile ? (
              <ScrollArea p='md'>
                <Stack gap='sm'>
                  {filtered.length === 0 ? (
                    <Card p='xl' withBorder>
                      <Stack align='center' gap='md'>
                        <IconCategory size={48} opacity={0.5} />
                        <Text size='lg' ta='center'>
                          No Department Names found
                        </Text>
                        <Text size='sm' ta='center'>
                          {searchQuery
                            ? 'Try adjusting your search'
                            : 'Start by adding your first department names'}
                        </Text>
                        {!searchQuery && (
                          <Button
                            variant='light'
                            leftSection={<IconPlus size={16} />}
                            onClick={openAdd}
                            fullWidth={isSmallMobile}
                          >
                            Add Department Name
                          </Button>
                        )}
                      </Stack>
                    </Card>
                  ) : (
                    paginatedData.map((type: Department, index: number) => (
                      <MobileTypeCard
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
                      <Table.Th className='p-3' style={{ width: '100px' }}>
                        <Group justify='center'>
                          <Text size='sm' fw={500}>
                            S.No
                          </Text>
                        </Group>
                      </Table.Th>
                      <Table.Th className='p-3'>
                        <Text size='sm' fw={500}>
                          Department Names
                        </Text>
                      </Table.Th>
                      <Table.Th className='p-3' style={{ width: '100px' }}>
                        <Group justify='center'>
                          <Text size='sm' fw={500}>
                            Actions
                          </Text>
                        </Group>
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>

                  <Table.Tbody>
                    {filtered.length === 0 ? (
                      <Table.Tr>
                        <Table.Td colSpan={3}>
                          <Center py='xl'>
                            <Stack align='center' gap='xs'>
                              <IconCategory size={40} opacity={0.5} />
                              <Text> No Department Names found </Text>
                              <Text size='sm'>
                                {searchQuery
                                  ? 'Try adjusting your search'
                                  : 'Start by adding your first department name'}
                              </Text>
                              {!searchQuery && (
                                <Button
                                  leftSection={<IconPlus size={16} />}
                                  onClick={openAdd}
                                  fullWidth={isMobile}
                                  radius='md'
                                  color={currentThemeConfig.button.color}
                                >
                                  Add Department Name
                                </Button>
                              )}
                            </Stack>
                          </Center>
                        </Table.Td>
                      </Table.Tr>
                    ) : (
                      paginatedData.map((item: any, index: number) => (
                        <Table.Tr key={item._id}>
                          <Table.Td className='text-center'>
                            {index + 1 + (activePage - 1) * itemsPerPage}
                          </Table.Td>
                          <Table.Td>{item.departmentName}</Table.Td>
                          <Table.Td className='text-center'>
                            <Group justify='center'>
                              <Tooltip label='Edit'>
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
                      ))
                    )}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            )}
          </DataView>

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
              <IconCategory
                size={20}
                stroke={1.8}
                color={currentThemeConfig.button.color}
              />
              <Text fw={600} size='lg'>
                Add New Department Name
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
          <Stack>
            <TextInput
              mt='md'
              label='Department Name'
              value={newDepartmentName}
              onChange={e => setNewDepartmentName(e.target.value)}
              placeholder='Enter the department Name'
              required
            />
            <Group justify='flex-end'>
              <Button variant='default' onClick={closeAdd} radius='md'>
                Cancel
              </Button>
              <Button
                onClick={handleAdd}
                disabled={isMutating || !newDepartmentName.trim()}
                radius='md'
              >
                {isAdding ? 'Adding...' : 'Add'}
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Card>
    </Container>
  );
}
