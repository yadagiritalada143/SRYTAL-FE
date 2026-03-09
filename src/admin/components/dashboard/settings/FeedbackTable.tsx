import {
  Card,
  Tooltip,
  Center,
  Pagination,
  Stack,
  Text,
  TextInput,
  Group,
  Badge,
  Table,
  ScrollArea,
  Flex,
  ActionIcon,
  Select,
  Modal,
  Divider,
  Container
} from '@mantine/core';
import DataView from '@components/common/loaders/DataView';

import {
  IconEdit,
  IconPlus,
  IconSearch,
  IconTrash,
  IconAlertTriangle,
  IconDeviceFloppy,
  IconCategory
} from '@tabler/icons-react';

import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';

import { debounce } from '@utils/common/debounce';
import { useCustomToast } from '@utils/common/toast';
import { useAppTheme } from '@hooks/use-app-theme';
import type { Feedback } from '@interfaces/feedback';
import { useGetAllFeedbackAttributesByAdmin } from '@hooks/queries/useAdminQueries';
import {
  useAddFeedbackAttributeByAdmin,
  useUpdateFeedbackAttributeByAdmin,
  useDeleteFeedbackAttributeByAdmin
} from '@hooks/mutations/useAdminMutations';
import { CommonButton } from '@components/common/button/CommonButton';

const ITEMS_PER_PAGE_OPTIONS = ['5', '10', '20', '50'];
const DEFAULT_ITEMS_PER_PAGE = 10;

export default function FeedbackTable() {
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const {
    themeConfig: currentThemeConfig,
    organizationConfig,
    isDarkTheme
  } = useAppTheme();

  const { data: feedbacks = [], isLoading } =
    useGetAllFeedbackAttributesByAdmin();
  const { mutateAsync: addFeedback, isPending: isAdding } =
    useAddFeedbackAttributeByAdmin();
  const { mutateAsync: updateFeedback, isPending: isUpdating } =
    useUpdateFeedbackAttributeByAdmin();
  const { mutateAsync: deleteFeedback, isPending: isDeleting } =
    useDeleteFeedbackAttributeByAdmin();

  const isMutating = isAdding || isUpdating || isDeleting;

  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  const [selected, setSelected] = useState<Feedback | null>(null);
  const [newName, setNewName] = useState('');
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
    if (!filterString) return feedbacks;
    return feedbacks.filter((f: any) =>
      f.name.toLowerCase().includes(filterString)
    );
  }, [feedbacks, filterString]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    debouncedSearch(q);
  };

  /* ---------------- ADD ---------------- */
  const handleAdd = async () => {
    if (!newName.trim())
      return showErrorToast('Feedback attribute is required');

    try {
      await addFeedback({ name: newName.trim() } as any);
      showSuccessToast('Feedback attribute added successfully !!');
      setNewName('');
      closeAdd();
    } catch {
      showErrorToast('Failed to add');
    }
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (item: Feedback) => {
    setSelected(item);
    openEdit();
  };

  const confirmEdit = async () => {
    if (!selected?.name.trim()) return showErrorToast('Required');

    try {
      await updateFeedback({ id: selected.id, name: selected.name.trim() });
      showSuccessToast('Feedback attribute updated successfully !!');
      closeEdit();
    } catch {
      showErrorToast('Failed to update');
    }
  };

  /* ---------------- DELETE ---------------- */
  const confirmDelete = async () => {
    if (!selected) return;

    try {
      await deleteFeedback(selected.id);
      showSuccessToast('Feedback attribute deleted successfully !!');
      closeDelete();
      closeEdit();
    } catch {
      showErrorToast('Failed to delete');
    }
  };

  /* ---------------- PAGINATION ---------------- */
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
    type: Feedback;
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
              Employment Type
            </Text>
            <Text size='lg' fw={600}>
              {type.name}
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
          {/* HEADER */}
          <Card shadow='sm' p={isMobile ? 'md' : 'lg'} radius='md'>
            <Flex
              direction={isMobile ? 'column' : 'row'}
              justify='space-between'
              align='center'
              gap='md'
            >
              <Text size={isMobile ? 'lg' : 'xl'} fw={700}>
                Manage Feedback Attributes ({filtered.length})
              </Text>

              <CommonButton
                leftSection={<IconPlus size={16} />}
                onClick={openAdd}
                fullWidth={isMobile}
              >
                Add Feedback Attribute
              </CommonButton>
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
                placeholder='Search feedback attribute...'
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

                {filtered.length !== feedbacks.length && (
                  <Badge variant='light' color='blue'>
                    {filtered.length} of {feedbacks.length}
                  </Badge>
                )}
              </Group>
            </Flex>
          </Card>

          {/* TABLE */}
          <DataView isLoading={isLoading} label='feedback attributes'>
            {isMobile ? (
              <ScrollArea p='md'>
                <Stack gap='sm'>
                  {filtered.length === 0 ? (
                    <Card p='xl' withBorder>
                      <Stack align='center' gap='md'>
                        <IconCategory size={48} opacity={0.5} />
                        <Text size='lg' ta='center'>
                          No feedback attributes found
                        </Text>
                        <Text size='sm' ta='center'>
                          {searchQuery
                            ? 'Try adjusting your search'
                            : 'Start by adding your first feedback attribute'}
                        </Text>
                        {!searchQuery && (
                          <CommonButton
                            variant='light'
                            leftSection={<IconPlus size={16} />}
                            onClick={openAdd}
                            fullWidth={isSmallMobile}
                          >
                            Add Feedback Attribute
                          </CommonButton>
                        )}
                      </Stack>
                    </Card>
                  ) : (
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
                          Feedback Attributes
                        </Text>
                      </Table.Th>
                      <Table.Th className='p-3' style={{ width: '120px' }}>
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
                              <Text>No feedback attributes found</Text>
                              <Text size='sm'>
                                {searchQuery
                                  ? 'Try adjusting your search'
                                  : 'Start by adding your first feedback attribute'}
                              </Text>
                              {!searchQuery && (
                                <CommonButton
                                  leftSection={<IconPlus size={16} />}
                                  onClick={openAdd}
                                  fullWidth={isMobile}
                                  color={currentThemeConfig.button.color}
                                >
                                  Add Feedback Attribute
                                </CommonButton>
                              )}
                            </Stack>
                          </Center>
                        </Table.Td>
                      </Table.Tr>
                    ) : (
                      paginatedData.map((item: any, index: number) => (
                        <Table.Tr key={item.id}>
                          <Table.Td className='text-center'>
                            {index + 1 + (activePage - 1) * itemsPerPage}
                          </Table.Td>
                          <Table.Td>{item.name}</Table.Td>
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
                Add New Feedback Attribute
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
              label='Feedback Attribute'
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder='Enter the feedback attribute'
              required
            />
            <Group justify='flex-end'>
              <CommonButton variant='default' onClick={closeAdd}>
                Cancel
              </CommonButton>
              <CommonButton
                onClick={handleAdd}
                disabled={isMutating || !newName.trim()}
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
                Edit Feedback Attribute
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
              label='Feedback Attribute'
              placeholder='Enter the feedback attribute'
              value={selected?.name || ''}
              onChange={e =>
                setSelected(prev =>
                  prev ? { ...prev, name: e.target.value } : prev
                )
              }
              required
              size='md'
            />

            <Group justify='space-between'>
              {isMobile ? (
                <Tooltip label='Delete'>
                  <CommonButton onClick={openDelete} p='xs' variant='outline'>
                    <IconTrash size={16} />
                  </CommonButton>
                </Tooltip>
              ) : (
                <CommonButton
                  color='red'
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
              <IconAlertTriangle size={24} color='red' />
              <Text fw={600} size='lg' c='red'>
                Delete Feedback Attribute
              </Text>
            </Group>
          }
          centered
          size='md'
        >
          <Stack gap='md'>
            <Text size='md' mt='sm'>
              Are you sure you want to delete this feedback attribute? This
              action cannot be undone.
            </Text>
            <Group justify='flex-end' mt='md'>
              <CommonButton variant='default' onClick={closeDelete}>
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
}
