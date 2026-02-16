import { useState, useEffect, useMemo } from 'react';
import {
  Button,
  Group,
  Modal,
  Table,
  TextInput,
  Text,
  Card,
  Stack,
  ActionIcon,
  Tooltip,
  Badge,
  ScrollArea,
  Center,
  Divider
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { toast } from 'react-toastify';
import moment from 'moment';
import {
  IconEdit,
  IconTrash,
  IconChecklist,
  IconDeviceFloppy,
  IconUser,
  IconCalendar
} from '@tabler/icons-react';
import { OrganizationConfig } from '../../../../interfaces/organization';
import {
  deleteTaskByAdmin,
  updateTaskByAdmin
} from '../../../../services/admin-services';
import { DeleteTaskModel } from './delete-task';
import { useCustomToast } from '../../../../utils/common/toast';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../../../../atoms/theme';
import { getThemeConfig } from '../../../../utils/common/theme-utils';

// Mobile Task Card Component
const MobileTaskCard: React.FC<{
  task: any;
  index: number;
  onEdit: (task: any) => void;
  onDelete: (taskId: string) => void;
}> = ({ task, index, onEdit, onDelete }) => {
  return (
    <Card shadow="sm" p="md" mb="sm" withBorder>
      <Stack gap="sm">
        <Group justify="space-between" align="flex-start">
          <Badge variant="filled" color="blue">
            #{index + 1}
          </Badge>
          <Group gap="xs">
            <ActionIcon
              variant="subtle"
              color="blue"
              onClick={() => onEdit(task)}
              size="md"
            >
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() => onDelete(task._id)}
              size="md"
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
        </Group>

        <Divider />

        <Stack gap="xs">
          <Stack gap={2}>
            <Text size="xs" fw={600} c="dimmed">
              Task
            </Text>
            <Text size="sm" fw={500}>
              {task.title}
            </Text>
          </Stack>

          <Stack gap={2}>
            <Text size="xs" fw={600} c="dimmed">
              <Group gap={4}>
                <IconUser size={12} />
                Created By
              </Group>
            </Text>
            <Text size="sm">
              {task?.createdBy?.firstName || ''}{' '}
              {task?.createdBy?.lastName || ''}
            </Text>
          </Stack>

          <Stack gap={2}>
            <Text size="xs" fw={600} c="dimmed">
              <Group gap={4}>
                <IconCalendar size={12} />
                Created At
              </Group>
            </Text>
            <Text size="xs">
              {moment(task.createdAt).format('MMM DD, YYYY - h:mm A')}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

const PackageTasksTable = ({
  tasks = [],
  organizationConfig,
  fetchPackageDetails
}: {
  tasks: any[];
  organizationConfig: OrganizationConfig;
  fetchPackageDetails: () => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [taskList, setTaskList] = useState([...tasks]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedTaskObj, setSelectedTaskObj] = useState<any>(null);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const { showSuccessToast } = useCustomToast();

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isDarkTheme = useRecoilValue(themeAtom);

  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
  }, [organizationConfig, isDarkTheme]);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const handleEdit = (task: any) => {
    setSelectedTaskObj(task);
    openEditModal();
  };

  const handleDelete = (taskId: string) => {
    setSelectedTask(taskId);
    open();
  };

  const handleDeleteTask = async (taskId: string, hardDelete: boolean) => {
    try {
      await deleteTaskByAdmin(taskId, hardDelete);
      setTaskList(prevTasks => prevTasks.filter(task => task._id !== taskId));
      setConfirmDelete(false);
      setAgreeTerms(false);
      close();
      showSuccessToast('Task deleted successfully');
      fetchPackageDetails();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  const handleUpdateTask = async () => {
    if (!selectedTaskObj?._id) return;

    try {
      await updateTaskByAdmin(selectedTaskObj._id, selectedTaskObj.title);
      showSuccessToast('Task updated successfully');

      setTaskList(prev =>
        prev.map(task =>
          task._id === selectedTaskObj._id
            ? { ...task, title: selectedTaskObj.title }
            : task
        )
      );

      fetchPackageDetails();
      closeEditModal();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update task');
    }
  };

  return (
    <>
      <Card shadow="sm" p={0} radius="md" withBorder>
        <Stack gap={0}>
          {/* Header */}
          <Group
            p={isMobile ? 'md' : 'lg'}
            justify="space-between"
            style={{
              borderBottom: '1px solid var(--mantine-color-gray-3)'
            }}
          >
            <Group gap="xs">
              <IconChecklist size={20} />
              <Text size="lg" fw={600}>
                Package Tasks ({taskList.length})
              </Text>
            </Group>
          </Group>

          {/* Content */}
          {taskList.length === 0 ? (
            <Center p="xl">
              <Stack align="center" gap="md">
                <IconChecklist size={48} opacity={0.5} />
                <Text size="lg">No tasks available</Text>
                <Text size="sm" c="dimmed">
                  Add your first task to get started
                </Text>
              </Stack>
            </Center>
          ) : isMobile ? (
            // Mobile Card View
            <ScrollArea p="md">
              <Stack gap="sm">
                {taskList.map((task, index) => (
                  <MobileTaskCard
                    key={task._id}
                    task={task}
                    index={index}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
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
                      style={{ width: '80px' }}
                    >
                      <Text size="sm" fw={500}>
                        S.No
                      </Text>
                    </Table.Th>
                    <Table.Th className="p-3 border">
                      <Text size="sm" fw={500}>
                        Task
                      </Text>
                    </Table.Th>
                    <Table.Th className="p-3 border" style={{ width: '200px' }}>
                      <Text size="sm" fw={500}>
                        Created By
                      </Text>
                    </Table.Th>
                    <Table.Th className="p-3 border" style={{ width: '220px' }}>
                      <Text size="sm" fw={500}>
                        Created At
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
                  {taskList.map((task, index) => (
                    <Table.Tr key={task._id} className="transition-colors">
                      <Table.Td className="text-center p-3">
                        <Text size="sm">{index + 1}</Text>
                      </Table.Td>
                      <Table.Td className="p-3">
                        <Text size="sm" fw={500}>
                          {task.title}
                        </Text>
                      </Table.Td>
                      <Table.Td className="p-3">
                        <Text size="sm">
                          {task?.createdBy?.firstName || ''}{' '}
                          {task?.createdBy?.lastName || ''}
                        </Text>
                      </Table.Td>
                      <Table.Td className="p-3">
                        <Text size="xs">
                          {moment(task.createdAt).format(
                            'MMM DD, YYYY - h:mm A'
                          )}
                        </Text>
                      </Table.Td>
                      <Table.Td className="p-3">
                        <Group gap="xs" justify="center">
                          <Tooltip label="Edit Task">
                            <ActionIcon
                              variant="subtle"
                              color="blue"
                              onClick={() => handleEdit(task)}
                              size="sm"
                            >
                              <IconEdit size={16} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="Delete Task">
                            <ActionIcon
                              variant="subtle"
                              color="red"
                              onClick={() => handleDelete(task._id)}
                              size="sm"
                            >
                              <IconTrash size={16} />
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
        </Stack>
      </Card>

      {/* Edit Modal */}
      <Modal
        opened={editModalOpened}
        onClose={closeEditModal}
        title={
          <Group gap="xs">
            <IconEdit size={20} />
            <Text fw={600} size="lg">
              Edit Task
            </Text>
          </Group>
        }
        centered
        size="md"
      >
        <Stack gap="md">
          <TextInput
            label="Task Title"
            value={selectedTaskObj?.title || ''}
            onChange={e =>
              setSelectedTaskObj({ ...selectedTaskObj, title: e.target.value })
            }
            required
            size="md"
            placeholder="Enter task title"
          />
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={closeEditModal}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateTask}
              leftSection={<IconDeviceFloppy size={16} />}
            >
              Save Changes
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Delete Task Modal */}
      <DeleteTaskModel
        agreeTerms={agreeTerms}
        close={close}
        opened={opened}
        confirmDelete={confirmDelete}
        handleDeleteTask={handleDeleteTask}
        setAgreeTerms={setAgreeTerms}
        setConfirmDelete={setConfirmDelete}
        selectedTask={selectedTask}
      />
    </>
  );
};

export default PackageTasksTable;
