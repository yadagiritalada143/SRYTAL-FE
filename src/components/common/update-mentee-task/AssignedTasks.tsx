import { Paper, Table, Select, Badge, Text, Stack, Group } from '@mantine/core';
import { Task } from '../../../interfaces/mentee';
import { CancelStyledButton } from '../../UI/Buttons/buttons';
import { useMediaQuery } from '@mantine/hooks';
import { Tooltip } from '@mantine/core';

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const AssignedTasks = ({ tasks, setTasks }: Props) => {
  const isMobile = useMediaQuery('(max-width: 640px)');

  const handleStatusChange = (taskId: string, status: Task['status']) => {
    setTasks(prev =>
      prev.map(t => (t.taskId === taskId ? { ...t, status } : t))
    );
  };

  const handleRemove = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.taskId !== taskId));
  };

  if (tasks.length === 0)
    return (
      <Text c="dimmed" mb="lg">
        No tasks assigned yet.
      </Text>
    );

  if (isMobile) {
    return (
      <div>
        <h3 className="text-lg font-bold underline mb-2">
          {' '}
          Already Assigned Tasks
        </h3>
        <Stack gap="sm" mb="lg">
          {tasks.map(task => (
            <Paper key={task.taskId} withBorder shadow="xs" p="sm" radius="md">
              <Group justify="space-between" mb="sm">
                <Text fw={600}>
                  {task.title.length > 25
                    ? task.title.substring(0, 20) + '...'
                    : task.title}
                </Text>
                <Badge
                  color={
                    task.priority === 'High'
                      ? 'red'
                      : task.priority === 'Medium'
                        ? 'yellow'
                        : 'green'
                  }
                >
                  {task.priority}
                </Badge>
              </Group>

              <Select
                data={['Not Started', 'In Progress', 'Completed']}
                value={task.status}
                onChange={val =>
                  val && handleStatusChange(task.taskId, val as Task['status'])
                }
                size="xs"
                radius="md"
                mb="sm"
              />

              <Group justify="space-between" align="center" mb="sm">
                <Text size="sm" c="dimmed">
                  Due: {task.dueDate}
                </Text>

                <CancelStyledButton
                  size="xs"
                  label="Remove"
                  onClick={() => handleRemove(task.taskId)}
                />
              </Group>
            </Paper>
          ))}
        </Stack>
      </div>
    );
  }

  return (
    <div>
      {' '}
      {/* Assigned tasks */}
      <h3 className="text-lg font-bold underline mb-2">
        Already Assigned Tasks
      </h3>
      <Paper shadow="sm" radius="md" withBorder p="sm" mb="lg">
        <div className="w-full overflow-x-auto">
          <Table
            striped
            highlightOnHover
            withColumnBorders
            mb="lg"
            className="text-sm sm:text-base"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ textAlign: 'center' }}>Task Title</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Status</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Due Date</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Priority</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {tasks.map(task => (
                <Table.Tr key={task.taskId}>
                  <Table.Td style={{ textAlign: 'center' }}>
                    <Tooltip
                      label={task.description || 'No description'}
                      withArrow
                      position="top"
                    >
                      <Text style={{ cursor: 'pointer' }}>
                        {task.title.length > 25
                          ? task.title.substring(0, 20) + '...'
                          : task.title}
                      </Text>
                    </Tooltip>
                  </Table.Td>
                  <Table.Td style={{ textAlign: 'center' }}>
                    <Select
                      data={['Not Started', 'In Progress', 'Completed']}
                      value={task.status}
                      onChange={val =>
                        val &&
                        handleStatusChange(task.taskId, val as Task['status'])
                      }
                      size="xs"
                      radius="md"
                    />
                  </Table.Td>
                  <Table.Td style={{ textAlign: 'center' }} w={110}>
                    {task.dueDate}
                  </Table.Td>
                  <Table.Td style={{ textAlign: 'center' }} w={100}>
                    <Badge
                      color={
                        task.priority === 'High'
                          ? 'red'
                          : task.priority === 'Medium'
                            ? 'yellow'
                            : 'green'
                      }
                    >
                      {task.priority}
                    </Badge>
                  </Table.Td>
                  <Table.Td style={{ textAlign: 'center' }}>
                    <CancelStyledButton
                      size="xs"
                      label="Remove"
                      onClick={() => handleRemove(task.taskId)}
                    />
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </Paper>
    </div>
  );
};

export default AssignedTasks;
