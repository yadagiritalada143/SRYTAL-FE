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
  IconCategory
} from '@tabler/icons-react';

import type { Feedback } from '../../../../interfaces/feedback';

import {
  //getAllFeedbackByAdmin,
  addFeedbackByAdmin
  //updateFeedbackByAdmin,
  // deleteFeedbackByAdmin
} from '../../../../services/admin-services';

import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { themeAtom } from '../../../../atoms/theme';
import { feedbackAtom } from '../../../../atoms/feedback-atom';
import { debounce } from '../../../../utils/common/debounce';
import { useCustomToast } from '../../../../utils/common/toast';
import { getThemeConfig } from '../../../../utils/common/theme-utils';
import {
  addfeedbackSchema,
  AddfeedbackForm
} from '../../../../forms/add-feedback';
import { updatefeedbackForm } from '../../../../forms/update-feedback';

const ITEMS_PER_PAGE_OPTIONS = ['5', '10', '20', '50'];
const DEFAULT_ITEMS_PER_PAGE = 10;

const isValidFeedbackAttributes = (feedbackAttributes: string) =>
  feedbackAttributes.trim().length > 0;

const FeedbackActions: React.FC<{
  item: Feedback;
  onEdit: (item: Feedback) => void;
  isMobile?: boolean;
}> = ({ item, onEdit, isMobile = false }) => (
  <Group gap="xs" justify="center">
    <Tooltip label="Edit Feedback Attributes">
      <ActionIcon
        variant="subtle"
        color="blue"
        onClick={() => onEdit(item)}
        size={isMobile ? 'md' : 'sm'}
      >
        <IconEdit size={isMobile ? 18 : 16} />
      </ActionIcon>
    </Tooltip>
  </Group>
);

/* ---------------- MOBILE CARD ---------------- */
const MobileFeedbackCard: React.FC<{
  item: Feedback;
  index: number;
  activePage: number;
  itemsPerPage: number;
  onEdit: (item: Feedback) => void;
}> = ({ item, index, activePage, itemsPerPage, onEdit }) => {
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
            onClick={() => onEdit(item)}
            size="md"
          >
            <IconEdit size={18} />
          </ActionIcon>
        </Group>

        <Divider />

        <Stack gap={2}>
          <Text size="xs" fw={600} c="dimmed">
            Feedback Attributes
          </Text>
          <Text size="lg" fw={600}>
            {item.name}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
};

//Header Compoenent
const HeadingComponent: React.FC<{
  filteredCount: number;
  onAdd: () => void;
  isMobile?: boolean;
}> = ({ filteredCount, onAdd, isMobile = false }) => (
  <Card shadow="sm" p={isMobile ? 'md' : 'lg'} radius="md" withBorder>
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
        Manage Feedback ({filteredCount})
      </Text>

      <Button
        leftSection={<IconPlus size={16} />}
        onClick={onAdd}
        variant="filled"
        fullWidth={isMobile}
        radius="md"
        size={isMobile ? 'md' : 'sm'}
      >
        Add Feedback Attributes
      </Button>
    </Flex>
  </Card>
);

const FeedbackForm = () => {
  const { showErrorToast, showSuccessToast } = useCustomToast();

  const [feedbacks, setFeedbacks] = useRecoilState(feedbackAtom);
  const [filtered, setFiltered] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  const [selected, setSelected] = useState<Feedback | null>(null);
  const [newfeedbackAttributes, setNewfeedbackAttributes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');
  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
  }, [organizationConfig, isDarkTheme]);
  const [editOpened, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure(false);

  const fetchFeedback = useCallback(async () => {
    setIsLoading(true);
    try {
      //const data = await getAllFeedbackByAdmin();
      // setFeedbacks(data);
      //setFiltered(data);
    } catch {
      showErrorToast('Failed to fetch feedback');
    } finally {
      setIsLoading(false);
    }
  }, [setFeedbacks, showErrorToast]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

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

  const handleEdit = (item: Feedback) => {
    setSelected(item);
    openEdit();
  };

  const handleDelete = (id: string) => {
    setSelected({ id, name: '' });
    openDelete();
  };

  const confirmEdit = async () => {
    if (!selected || !isValidFeedbackAttributes(selected.name)) {
      showErrorToast('Feedback Attributes is required');
      return;
    }

    const payload: updatefeedbackForm = {
      name: selected.name.trim()
    };

    setIsLoading(true);
    try {
      //await updateFeedbackByAdmin(selected.id, payload);
      showSuccessToast('Updated successfully');
      //fetchFeedback();
      closeEdit();
    } catch {
      showErrorToast('Failed to update');
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!selected) return;

    setIsLoading(true);
    try {
      //await deleteFeedbackByAdmin(selected.id);
      showSuccessToast('Deleted successfully');
      fetchFeedback();
      closeDelete();
      closeEdit();
    } catch {
      showErrorToast('Failed to delete');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!isValidFeedbackAttributes(newfeedbackAttributes)) {
      showErrorToast('Feedback Attributes is required');
      return;
    }
    if (
      feedbacks.some(
        feedback =>
          feedback.name.toLowerCase() === newfeedbackAttributes.toLowerCase()
      )
    ) {
      showErrorToast('This feedback attribute already exists');
      return;
    }
    setIsLoading(true);
    try {
      await addFeedbackByAdmin({
        name: newfeedbackAttributes.trim()
      } as any);

      showSuccessToast('Added successfully');
      fetchFeedback();
      closeAdd();
      setNewfeedbackAttributes('');
    } catch {
      showErrorToast('Failed to add');
    } finally {
      setIsLoading(false);
    }
  };

  //pagination logic
  const { paginatedData, totalPages } = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return {
      paginatedData: filtered.slice(start, end),
      totalPages: Math.ceil(filtered.length / itemsPerPage)
    };
  }, [filtered, activePage, itemsPerPage]);

  useEffect(() => {
    setActivePage(1);
  }, [itemsPerPage]);

  return (
    <Container size="xl" py="md" my="xl" px={isSmallMobile ? 'xs' : 'md'}>
      <Stack gap="md">
        <HeadingComponent
          filteredCount={filtered.length}
          onAdd={openAdd}
          isMobile={isMobile}
        />

        {/* Filters */}
        <Card shadow="sm" p={isMobile ? 'sm' : 'md'} radius="md" withBorder>
          <Stack gap="md">
            <TextInput
              placeholder="Search by feedback..."
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

              {filtered.length !== feedbacks.length && (
                <Badge variant="light" color="blue">
                  {filtered.length} of {feedbacks.length}
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
                <Text>Loading feedback...</Text>
              </Stack>
            </Center>
          ) : isMobile ? (
            <ScrollArea p="md">
              <Stack gap="sm">
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <MobileFeedbackCard
                      key={item.id}
                      item={item}
                      index={index}
                      activePage={activePage}
                      itemsPerPage={itemsPerPage}
                      onEdit={handleEdit}
                    />
                  ))
                ) : (
                  <Card p="xl" withBorder>
                    <Stack align="center" gap="md">
                      <IconCategory size={48} opacity={0.5} />
                      <Text size="lg" ta="center">
                        No feedback Attributes found
                      </Text>
                      <Text size="sm" ta="center">
                        {searchQuery
                          ? 'Try adjusting your search'
                          : 'Start by adding your first feedback Attributes'}
                      </Text>
                      {!searchQuery && (
                        <Button
                          variant="light"
                          leftSection={<IconPlus size={16} />}
                          onClick={openAdd}
                          radius="md"
                          fullWidth={isSmallMobile}
                        >
                          Add feedback Attributes
                        </Button>
                      )}
                    </Stack>
                  </Card>
                )}
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
                        Feedback Attributes
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
                    paginatedData.map((type, index) => (
                      <Table.Tr key={type.id} className="transition-colors">
                        <Table.Td className="text-center p-3">
                          <Text size="sm">
                            {index + 1 + (activePage - 1) * itemsPerPage}
                          </Text>
                        </Table.Td>
                        <Table.Td className="p-3">
                          <Text size="sm" fw={500}>
                            {type.name}
                          </Text>
                        </Table.Td>
                        <Table.Td className="p-3">
                          <FeedbackActions item={type} onEdit={handleEdit} />
                        </Table.Td>
                      </Table.Tr>
                    ))
                  ) : (
                    <Table.Tr>
                      <Table.Td colSpan={3} className="text-center p-8">
                        <Stack align="center" gap="md">
                          <IconCategory size={48} opacity={0.5} />
                          <Text size="lg">No feedback Attributes found</Text>
                          <Text size="sm">
                            {searchQuery
                              ? 'Try adjusting your search'
                              : 'Start by adding your first feedback Attributes'}
                          </Text>
                          {!searchQuery && (
                            <Button
                              variant="light"
                              radius="md"
                              leftSection={<IconPlus size={16} />}
                              onClick={openAdd}
                            >
                              Add feedback Attributes
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

      {/* ADD MODAL */}
      <Modal
        opened={addOpened}
        onClose={closeAdd}
        title={
          <Group gap="xs">
            <Text fw={600} size="lg">
              Add New Feedback Attributes
            </Text>
          </Group>
        }
        centered
        size="md"
      >
        <Stack>
          <TextInput
            label="Feedback Attributes"
            value={newfeedbackAttributes}
            onChange={e => setNewfeedbackAttributes(e.target.value)}
            placeholder="Enter feedback Attributes"
            required
            size="md"
          />

          <Group justify="flex-end">
            <Button variant="default" radius="md" onClick={closeAdd}>
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              disabled={isLoading || !newfeedbackAttributes.trim()}
              radius="md"
              leftSection={<IconDeviceFloppy size={16} />}
            >
              {isLoading ? 'Adding...' : 'Add Feedback Attributes'}
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
            <IconEdit size={20} />
            <Text fw={600} size="lg">
              Edit Feedback Attributes
            </Text>
          </Group>
        }
        centered
        size="md"
      >
        <Stack>
          <TextInput
            label="Feedback Attributes"
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
              radius="md"
              leftSection={<IconTrash size={16} />}
              onClick={() => handleDelete(selected!.id)}
            >
              Delete
            </Button>

            <Group>
              <Button variant="default" radius="md" onClick={closeEdit}>
                Cancel
              </Button>
              <Button
                onClick={confirmEdit}
                disabled={isLoading}
                radius="md"
                leftSection={<IconDeviceFloppy size={16} />}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
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
        <Stack>
          <Text>
            Are you sure you want to delete this Feedback Attributes? This
            action cannot be undone.
          </Text>

          <Group justify="flex-end">
            <Button variant="default" radius="md" onClick={closeDelete}>
              Cancel
            </Button>
            <Button
              color="red"
              radius="md"
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

export default FeedbackForm;
