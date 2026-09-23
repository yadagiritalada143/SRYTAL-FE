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
  IconCode,
  IconEdit,
  IconPlus,
  IconSearch,
  IconTrash,
  IconAlertTriangle,
  IconDeviceFloppy,
  IconArrowLeft
} from '@tabler/icons-react';
import { debounce } from '@utils/common/debounce';
import { getErrorMessage } from '@utils/common/get-error-message';
import { useCustomToast } from '@utils/common/toast';
import { useAppTheme } from '@hooks/use-app-theme';
import { useNavigate } from 'react-router-dom';
import type { ProgrammingLanguage } from '@interfaces/programming-language';
import { useGetAllProgrammingLanguages } from '@hooks/queries/useAdminQueries';
import {
  useAddProgrammingLanguage,
  useUpdateProgrammingLanguage,
  useDeleteProgrammingLanguage
} from '@hooks/mutations/useAdminMutations';
import { CommonButton } from '@components/common/button/CommonButton';
import PageHeader from '@components/common/page-header/PageHeader';

const ITEMS_PER_PAGE_OPTIONS = ['5', '10', '20', '50'];
const DEFAULT_ITEMS_PER_PAGE = 10;

const MobileLanguageCard: React.FC<{
  item: ProgrammingLanguage;
  index: number;
  activePage: number;
  color: string;
  itemsPerPage: number;
  onEdit: (item: ProgrammingLanguage) => void;
}> = ({ item, index, activePage, color, itemsPerPage, onEdit }) => (
  <Card shadow='sm' p='md' mb='sm' withBorder>
    <Stack gap='sm'>
      <Group justify='space-between' align='center'>
        <Badge variant='filled' color={color}>
          #{index + 1 + (activePage - 1) * itemsPerPage}
        </Badge>
        <ActionIcon
          variant='subtle'
          color={color}
          onClick={() => onEdit(item)}
          size='md'
        >
          <IconEdit size={18} />
        </ActionIcon>
      </Group>

      <Divider />

      <Stack gap={2}>
        <Text size='xs' fw={600} c='dimmed'>
          Language
        </Text>
        <Text size='lg' fw={600}>
          {item.languageName}
        </Text>
      </Stack>
    </Stack>
  </Card>
);

export default function ProgrammingLanguagesTable({
  showBackButton = false
}: {
  showBackButton?: boolean;
}) {
  const navigate = useNavigate();
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const { themeConfig: currentThemeConfig, isDarkTheme } = useAppTheme();

  const { data: languages = [], isLoading } = useGetAllProgrammingLanguages();
  const { mutateAsync: addLanguage, isPending: isAdding } =
    useAddProgrammingLanguage();
  const { mutateAsync: updateLanguage, isPending: isUpdating } =
    useUpdateProgrammingLanguage();
  const { mutateAsync: deleteLanguage, isPending: isDeleting } =
    useDeleteProgrammingLanguage();

  const isMutating = isAdding || isUpdating || isDeleting;

  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  const [selected, setSelected] = useState<ProgrammingLanguage | null>(null);
  const [newLanguageName, setNewLanguageName] = useState('');
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
    if (!filterString) return languages;
    return languages.filter((language: ProgrammingLanguage) =>
      language.languageName.toLowerCase().includes(filterString)
    );
  }, [languages, filterString]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleAdd = async () => {
    if (!newLanguageName.trim())
      return showErrorToast('Programming language is required');
    try {
      const result = await addLanguage({
        languageName: newLanguageName.trim()
      });
      showSuccessToast(result.message);
      setNewLanguageName('');
      closeAdd();
    } catch (error) {
      showErrorToast(getErrorMessage(error));
    }
  };

  const handleEdit = (item: ProgrammingLanguage) => {
    setSelected(item);
    openEdit();
  };

  const confirmEdit = async () => {
    if (!selected?.languageName.trim()) return showErrorToast('Required');

    try {
      const result = await updateLanguage({
        id: selected._id,
        languageName: selected.languageName.trim()
      });
      showSuccessToast(result.message);
      closeEdit();
    } catch (error) {
      showErrorToast(getErrorMessage(error));
    }
  };

  const confirmDelete = async () => {
    if (!selected) return;

    try {
      const result = await deleteLanguage(selected._id);
      showSuccessToast(result.message);
      closeDelete();
      closeEdit();
    } catch (error) {
      showErrorToast(getErrorMessage(error));
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
    <Container size='lg' pt={{ base: 'xl', sm: 56 }}>
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
            title='Programming Languages'
            subtitle='Manage the languages available for coding tasks.'
            icon={<IconCode size={24} />}
            count={filtered.length}
            actions={
              <Group wrap='nowrap' gap='sm'>
                {showBackButton && (
                  <CommonButton
                    variant='default'
                    leftSection={<IconArrowLeft size={16} />}
                    onClick={() => navigate(-1)}
                    fullWidth={isMobile}
                    size={isMobile ? 'md' : 'sm'}
                  >
                    Back
                  </CommonButton>
                )}
                <CommonButton
                  leftSection={<IconPlus size={16} />}
                  onClick={openAdd}
                  variant='filled'
                  fullWidth={isMobile}
                  size={isMobile ? 'md' : 'sm'}
                >
                  Add Language
                </CommonButton>
              </Group>
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
                placeholder='Search languages...'
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

                {filtered.length !== languages.length && (
                  <Badge variant='light' color={currentThemeConfig.dangerColor}>
                    {filtered.length} of {languages.length}
                  </Badge>
                )}
              </Group>
            </Flex>
          </Card>

          {/* Table or Cards */}
          <Card shadow='sm' p={0} radius='md'>
            <DataView
              isLoading={isLoading}
              label='programming languages'
              isEmpty={paginatedData.length === 0 && !isLoading}
            >
              {isMobile ? (
                <ScrollArea p='md'>
                  <Stack gap='sm'>
                    {filtered.length === 0 ? (
                      <Card p='xl' withBorder>
                        <Stack align='center' gap='md'>
                          <IconCode size={48} opacity={0.5} />
                          <Text size='lg' ta='center'>
                            No programming languages found
                          </Text>
                          <Text size='sm' ta='center'>
                            {searchQuery
                              ? 'Try adjusting your search'
                              : 'Start by adding your first language'}
                          </Text>
                          {!searchQuery && (
                            <CommonButton
                              variant='light'
                              leftSection={<IconPlus size={16} />}
                              onClick={openAdd}
                              fullWidth={isSmallMobile}
                            >
                              Add Language
                            </CommonButton>
                          )}
                        </Stack>
                      </Card>
                    ) : (
                      paginatedData.map((item: ProgrammingLanguage, index) => (
                        <MobileLanguageCard
                          color={currentThemeConfig.button.color}
                          key={item._id}
                          item={item}
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
                            Programming Language
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
                      {paginatedData.map((item: ProgrammingLanguage, index) => (
                        <Table.Tr key={item._id} className='transition-colors'>
                          <Table.Td className='text-center'>
                            {index + 1 + (activePage - 1) * itemsPerPage}
                          </Table.Td>
                          <Table.Td>{item.languageName}</Table.Td>
                          <Table.Td className='text-center'>
                            <Group justify='center'>
                              <Tooltip label='Edit Language'>
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
              <IconCode
                size={20}
                stroke={1.8}
                color={currentThemeConfig.button.color}
              />
              <Text fw={600} size='lg'>
                Add Programming Language
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
              label='Programming Language'
              value={newLanguageName}
              onChange={e => setNewLanguageName(e.target.value)}
              placeholder='Enter the programming language'
              required
            />
            <Group justify='flex-end'>
              <CommonButton variant='default' onClick={closeAdd}>
                Cancel
              </CommonButton>
              <CommonButton
                onClick={handleAdd}
                disabled={isMutating || !newLanguageName.trim()}
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
                Edit Programming Language
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
              label='Programming Language'
              placeholder='Enter the programming language'
              value={selected?.languageName || ''}
              onChange={e =>
                setSelected(prev =>
                  prev ? { ...prev, languageName: e.target.value } : prev
                )
              }
              required
              size='md'
            />

            <Group justify='space-between'>
              {isMobile ? (
                <Tooltip label='Delete Language'>
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
                Delete Programming Language
              </Text>
            </Group>
          }
          centered
          size='md'
        >
          <Stack gap='md'>
            <Text size='sm' mt='sm'>
              Are you sure you want to delete this programming language? This
              action cannot be undone.
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
