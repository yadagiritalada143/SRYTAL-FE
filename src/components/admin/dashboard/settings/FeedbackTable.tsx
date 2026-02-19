import {
  Card,
  Button,
  Loader,
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
  Modal
} from '@mantine/core';

import {
  IconEdit,
  IconPlus,
  IconSearch,
  IconTrash,
  IconAlertTriangle,
  IconDeviceFloppy
} from '@tabler/icons-react';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';

import { useRecoilState, useRecoilValue } from 'recoil';

import type { Feedback } from '../../../../interfaces/feedback';

import {
  getallfeedbackattributesbyadmin,
  addFeedbackAttributeByAdmin,
  updateFeedbackAttributeByAdmin,
  deleteFeedbackAttributeByAdmin
} from '../../../../services/admin-services';

import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { themeAtom } from '../../../../atoms/theme';
import { feedbackAtom } from '../../../../atoms/feedback-atom';

import { debounce } from '../../../../utils/common/debounce';
import { useCustomToast } from '../../../../utils/common/toast';
import { getThemeConfig } from '../../../../utils/common/theme-utils';

const ITEMS_PER_PAGE_OPTIONS = ['5', '10', '20', '50'];
const DEFAULT_ITEMS_PER_PAGE = 10;

export default function FeedbackTable() {
  const { showErrorToast, showSuccessToast } = useCustomToast();

  const [feedbacks, setFeedbacks] = useRecoilState(feedbackAtom);
  const [filtered, setFiltered] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

  const isMobile = useMediaQuery('(max-width: 768px)');

  const currentThemeConfig = useMemo(
    () => getThemeConfig(organizationConfig, isDarkTheme),
    [organizationConfig, isDarkTheme]
  );

  const isMountedRef = useRef(false);

  const fetchFeedback = async () => {
    setIsLoading(true);
    try {
      const res = await getallfeedbackattributesbyadmin();

      const list = Array.isArray(res)
        ? res
        : Array.isArray((res as any)?.data?.data)
          ? (res as any).data.data
          : [];

      if (isMountedRef.current) {
        setFeedbacks([...list]);
        setFiltered([...list]);
      }
    } catch {
      showErrorToast('Failed to fetch feedback');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    fetchFeedback();
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  /* ---------------- SEARCH ---------------- */
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        const result = feedbacks.filter(f =>
          f.name.toLowerCase().includes(query.toLowerCase())
        );
        setFiltered(result);
        setActivePage(1);
      }, 300),
    [feedbacks]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    debouncedSearch(q);
  };

  /* ---------------- ADD ---------------- */
  const handleAdd = async () => {
    if (!newName.trim())
      return showErrorToast('Feedback attribute is required');

    setIsLoading(true);
    try {
      await addFeedbackAttributeByAdmin({ name: newName.trim() } as any);
      showSuccessToast('Feedback attribute added successfully !!');
      setNewName('');
      closeAdd();
      await fetchFeedback();
    } catch {
      showErrorToast('Failed to add');
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (item: Feedback) => {
    setSelected(item);
    openEdit();
  };

  const confirmEdit = async () => {
    if (!selected?.name.trim()) return showErrorToast('Required');

    setIsLoading(true);
    try {
      await updateFeedbackAttributeByAdmin(selected.id, selected.name.trim());
      showSuccessToast('Feedback attribute updated successfully !!');
      closeEdit();
      await fetchFeedback();
    } catch {
      showErrorToast('Failed to update');
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- DELETE ---------------- */
  const confirmDelete = async () => {
    if (!selected) return;

    setIsLoading(true);
    try {
      await deleteFeedbackAttributeByAdmin(selected.id);
      showSuccessToast('Feedback attribute deleted successfully !!');
      closeDelete();
      closeEdit();
      await fetchFeedback();
    } catch {
      showErrorToast('Failed to delete');
    } finally {
      setIsLoading(false);
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

  return (
    <div>
      <Stack gap="md">
        {/* HEADER */}
        <Card shadow="sm" p={isMobile ? 'md' : 'lg'} radius="md" withBorder>
          <Flex
            direction={isMobile ? 'column' : 'row'}
            justify="space-between"
            align="center"
            gap="md"
          >
            <Text size={isMobile ? 'lg' : 'xl'} fw={700}>
              Manage Feedback ({filtered.length})
            </Text>

            <Button
              leftSection={<IconPlus size={16} />}
              onClick={openAdd}
              fullWidth={isMobile}
              radius="md"
            >
              Add Feedback Attribute
            </Button>
          </Flex>
        </Card>

        {/* SEARCH */}
        <Card shadow="sm" p="md" radius="md" withBorder>
          <Stack gap="md">
            <TextInput
              placeholder="Search feedback..."
              leftSection={<IconSearch size={16} />}
              value={searchQuery}
              onChange={handleSearch}
            />

            <Group justify="space-between">
              <Group gap="xs">
                <Text size="sm">Items per page:</Text>
                <Select
                  data={ITEMS_PER_PAGE_OPTIONS}
                  value={itemsPerPage.toString()}
                  onChange={v =>
                    setItemsPerPage(Number(v) || DEFAULT_ITEMS_PER_PAGE)
                  }
                  w={80}
                  size="sm"
                />
              </Group>

              {filtered.length !== feedbacks.length && (
                <Badge variant="light" color="blue">
                  {filtered.length} of {feedbacks.length}
                </Badge>
              )}
            </Group>
          </Stack>
        </Card>

        {/* TABLE */}
        <Card shadow="sm" p={0} radius="md" withBorder>
          {isLoading ? (
            <Center p="xl">
              <Stack align="center" gap="md">
                <Loader size="xl" />
              </Stack>
            </Center>
          ) : (
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
                      className="p-3 text-center"
                      style={{ width: '100px' }}
                    >
                      <Text size="sm" fw={500}>
                        S.No
                      </Text>
                    </Table.Th>
                    <Table.Th className="p-3 ">
                      <Text size="sm" fw={500}>
                        Feedback
                      </Text>
                    </Table.Th>
                    <Table.Th
                      className="p-3 text-center"
                      style={{ width: '120px' }}
                    >
                      <Text size="sm" fw={500}>
                        Actions
                      </Text>
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                  {paginatedData.map((item, index) => (
                    <Table.Tr key={item.id}>
                      <Table.Td className="text-center">
                        {index + 1 + (activePage - 1) * itemsPerPage}
                      </Table.Td>
                      <Table.Td>{item.name}</Table.Td>
                      <Table.Td className="text-center">
                        <Group justify="center">
                          <Tooltip label="Edit">
                            <ActionIcon
                              color={currentThemeConfig.button.color}
                              variant="subtle"
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
        </Card>

        {totalPages > 1 && (
          <Center>
            <Pagination
              value={activePage}
              onChange={setActivePage}
              total={totalPages}
            />
          </Center>
        )}
      </Stack>

      {/* ADD MODAL */}
      <Modal
        opened={addOpened}
        onClose={closeAdd}
        title={
          <Group gap="xs">
            <Text fw={600} size="lg">
              Add New Feedback
            </Text>
          </Group>
        }
        centered
        size="md"
      >
        <Stack>
          <TextInput
            mt="md"
            label="Feedback Attribute"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Enter the feedback attribute"
          />
          <Group justify="flex-end">
            <Button variant="default" onClick={closeAdd} radius="md">
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={!newName.trim()} radius="md">
              Add
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        opened={editOpened}
        onClose={closeEdit}
        title={
          <Group gap="xs">
            <IconEdit size={20} color={currentThemeConfig.button.color} />
            <Text fw={600} size="lg">
              Edit Feedback
            </Text>
          </Group>
        }
        centered
        size="md"
      >
        <Stack>
          <TextInput
            mt="md"
            label="Feedback Attribute"
            value={selected?.name || ''}
            onChange={e =>
              setSelected(prev =>
                prev ? { ...prev, name: e.target.value } : prev
              )
            }
            required
            size="md"
          />

          <Group justify="space-between">
            <Button
              color="red"
              variant="outline"
              onClick={openDelete}
              radius="md"
              leftSection={<IconTrash size={16} />}
            >
              Delete
            </Button>

            <Group>
              <Button variant="default" onClick={closeEdit} radius="md">
                Cancel
              </Button>
              <Button
                onClick={confirmEdit}
                leftSection={<IconDeviceFloppy size={16} />}
                disabled={isLoading}
                radius="md"
              >
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </Group>
          </Group>
        </Stack>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        opened={deleteOpened}
        onClose={closeDelete}
        title={
          <Group gap="xs">
            <IconAlertTriangle size={24} color="red" />
            <Text fw={600} size="lg" c="red">
              Delete Feedback Attributes
            </Text>
          </Group>
        }
        centered
        size="md"
      >
        <Stack gap="md">
          <Text size="md" mt="sm">
            Are you sure you want to delete this blood group? This action cannot
            be undone.
          </Text>
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={closeDelete} radius="md">
              Cancel
            </Button>
            <Button
              color="red"
              onClick={confirmDelete}
              disabled={isLoading}
              leftSection={<IconTrash size={16} />}
              radius="md"
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
}
