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
  IconMessage
} from '@tabler/icons-react';

import {
  getallfeedbackattributesbyadmin,
  addFeedbackAttributeByAdmin,
  updateFeedbackAttributeByAdmin,
  deleteFeedbackAttributeByAdmin
} from '../../../../services/admin-services';

import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { themeAtom } from '../../../../atoms/theme';
import { feedbackAtom } from '../../../../atoms/feedback-atom';

import { debounce } from '../../../../utils/common/debounce';
import { useCustomToast } from '../../../../utils/common/toast';
import { getThemeConfig } from '../../../../utils/common/theme-utils';

const ITEMS_PER_PAGE_OPTIONS = ['5', '10', '20', '50'];
const DEFAULT_ITEMS_PER_PAGE = 10;

const isValidFeedback = (name: string) => name.trim().length > 0;

/* ---------------- ACTIONS ---------------- */
const FeedbackActions: React.FC<{
  item: any;
  onEdit: (item: any) => void;
}> = ({ item, onEdit }) => (
  <Group gap="xs" justify="center">
    <Tooltip label="Edit Feedback">
      <ActionIcon variant="subtle" color="blue" onClick={() => onEdit(item)}>
        <IconEdit size={16} />
      </ActionIcon>
    </Tooltip>
  </Group>
);

/* ---------------- MOBILE CARD ---------------- */
const MobileFeedbackCard: React.FC<any> = ({
  item,
  index,
  activePage,
  itemsPerPage,
  onEdit
}) => (
  <Card shadow="sm" p="md" mb="sm" withBorder>
    <Stack gap="sm">
      <Group justify="space-between">
        <Badge>#{index + 1 + (activePage - 1) * itemsPerPage}</Badge>
        <ActionIcon variant="subtle" onClick={() => onEdit(item)}>
          <IconEdit size={18} />
        </ActionIcon>
      </Group>

      <Divider />

      <Group>
        <IconMessage size={20} />
        <Text fw={600}>{item.name}</Text>
      </Group>
    </Stack>
  </Card>
);

/* ---------------- HEADER ---------------- */
const HeadingComponent: React.FC<any> = ({ count, onAdd, isMobile }) => (
  <Card shadow="sm" p={isMobile ? 'md' : 'lg'} withBorder>
    <Flex
      direction={isMobile ? 'column' : 'row'}
      justify="space-between"
      align="center"
      gap="md"
    >
      <Text size={isMobile ? 'lg' : 'xl'} fw={700}>
        Manage Feedback ({count})
      </Text>

      <Button
        leftSection={<IconPlus size={16} />}
        onClick={onAdd}
        fullWidth={isMobile}
      >
        Add Feedback
      </Button>
    </Flex>
  </Card>
);

/* ================= MAIN TABLE ================= */
export default function FeedbackTable() {
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const [feedbacks, setFeedbacks] = useRecoilState(feedbackAtom);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  const [selected, setSelected] = useState<any | null>(null);
  const [newName, setNewName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');

  const currentThemeConfig = useMemo(
    () => getThemeConfig(organizationConfig, isDarkTheme),
    [organizationConfig, isDarkTheme]
  );

  const [editOpened, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure(false);

  /* ---------------- FETCH ---------------- */
  const fetchFeedback = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getallfeedbackattributesbyadmin();
      setFeedbacks(data);
      setFiltered(data);
    } catch {
      showErrorToast('Failed to fetch feedback');
    } finally {
      setIsLoading(false);
    }
  }, [setFeedbacks, showErrorToast]);

  useEffect(() => {
    if (feedbacks.length === 0) {
      fetchFeedback();
    } else {
      setFiltered(feedbacks);
      setIsLoading(false);
    }
  }, [feedbacks, fetchFeedback]);

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
    if (!isValidFeedback(newName))
      return showErrorToast('Feedback name required');

    setIsLoading(true);
    try {
      await addFeedbackAttributeByAdmin({ name: newName.trim() });
      showSuccessToast('Added successfully');
      closeAdd();
      setNewName('');
      fetchFeedback();
    } catch {
      showErrorToast('Failed to add');
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (item: any) => {
    setSelected(item);
    openEdit();
  };

  const confirmEdit = async () => {
    if (!isValidFeedback(selected?.name)) return showErrorToast('Required');

    setIsLoading(true);
    try {
      await updateFeedbackAttributeByAdmin(selected.id, selected.name.trim());
      showSuccessToast('Updated successfully');
      closeEdit();
      fetchFeedback();
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
      showSuccessToast('Deleted successfully');
      closeDelete();
      closeEdit();
      fetchFeedback();
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

  /* ================= UI ================= */
  return (
    <Container size="xl" py="md" my="xl" px={isSmallMobile ? 'xs' : 'md'}>
      <Stack gap="md">
        <HeadingComponent
          count={filtered.length}
          onAdd={openAdd}
          isMobile={isMobile}
        />

        {/* SEARCH */}
        <Card shadow="sm" p="md" withBorder>
          <Stack>
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
                <Badge variant="light">
                  {filtered.length} of {feedbacks.length}
                </Badge>
              )}
            </Group>
          </Stack>
        </Card>

        {/* TABLE / MOBILE */}
        <Card shadow="sm" p={0} withBorder>
          {isLoading ? (
            <Center p="xl">
              <Loader />
            </Center>
          ) : isMobile ? (
            <ScrollArea p="md">
              <Stack>
                {paginatedData.map((item, index) => (
                  <MobileFeedbackCard
                    key={item.id}
                    item={item}
                    index={index}
                    activePage={activePage}
                    itemsPerPage={itemsPerPage}
                    onEdit={handleEdit}
                  />
                ))}
              </Stack>
            </ScrollArea>
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
                    <Table.Th>S.No</Table.Th>
                    <Table.Th>Feedback</Table.Th>
                    <Table.Th className="text-center">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                  {paginatedData.map((item, index) => (
                    <Table.Tr key={item.id}>
                      <Table.Td>
                        {index + 1 + (activePage - 1) * itemsPerPage}
                      </Table.Td>
                      <Table.Td>{item.name}</Table.Td>
                      <Table.Td className="text-center">
                        <FeedbackActions item={item} onEdit={handleEdit} />
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
        title="Add Feedback"
        centered
      >
        <Stack>
          <TextInput
            label="Feedback"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <Group justify="flex-end">
            <Button variant="default" onClick={closeAdd}>
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={!newName.trim()}>
              Add
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        opened={editOpened}
        onClose={closeEdit}
        title="Edit Feedback"
        centered
      >
        <Stack>
          <TextInput
            label="Feedback"
            value={selected?.name || ''}
            onChange={e =>
              setSelected({
                ...selected!,
                name: e.target.value
              })
            }
          />

          <Group justify="space-between">
            <Button color="red" variant="outline" onClick={openDelete}>
              Delete
            </Button>

            <Group>
              <Button variant="default" onClick={closeEdit}>
                Cancel
              </Button>
              <Button onClick={confirmEdit}>Save</Button>
            </Group>
          </Group>
        </Stack>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        opened={deleteOpened}
        onClose={closeDelete}
        title="Delete Feedback"
        centered
      >
        <Stack>
          <Text>Are you sure you want to delete this feedback?</Text>
          <Group justify="flex-end">
            <Button variant="default" onClick={closeDelete}>
              Cancel
            </Button>
            <Button color="red" onClick={confirmDelete}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
