import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Card,
  Group,
  Text,
  Badge,
  Button,
  Table,
  Title,
  Stack,
  Modal,
  TextInput,
  Textarea,
  Select
} from '@mantine/core';

// Writers + tasks in one place
const mockWriters = [
  {
    empId: 'CW-001',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    joiningDate: '2025-01-15',
    tasks: [
      {
        id: 1,
        title: 'Blog on React Best Practices',
        status: 'In Progress',
        dueDate: '2025-09-20',
        priority: 'High'
      },
      {
        id: 2,
        title: 'API Docs for Timesheet Module',
        status: 'Completed',
        dueDate: '2025-09-10',
        priority: 'Medium'
      }
    ]
  },
  {
    empId: 'CW-002',
    name: 'Rohit Verma',
    email: 'rohit@example.com',
    joiningDate: '2025-03-20',
    tasks: [
      {
        id: 3,
        title: 'SEO Content for Landing Page',
        status: 'Assigned',
        dueDate: '2025-09-25',
        priority: 'Low'
      }
    ]
  },
  {
    empId: 'CW-003',
    name: 'Anjali Singh',
    email: 'anjali@example.com',
    joiningDate: '2025-05-10',
    tasks: [
      {
        id: 4,
        title: 'Write Knowledge Base Docs',
        status: 'In Progress',
        dueDate: '2025-09-30',
        priority: 'High'
      },
      {
        id: 5,
        title: 'Internal Newsletter',
        status: 'Completed',
        dueDate: '2025-09-05',
        priority: 'Medium'
      },
      {
        id: 6,
        title: 'UI Copy Review',
        status: 'Assigned',
        dueDate: '2025-09-18',
        priority: 'Low'
      }
    ]
  }
];

const WriterDetails = () => {
  const { empId } = useParams();
  const [writer, setWriter] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const found = mockWriters.find(w => w.empId === empId);
    if (found) {
      setWriter(found);
      setTasks(found.tasks);
    }
  }, [empId]);

  if (!writer) {
    return (
      <Stack align="center" mt="xl">
        <Text>No writer found with EMP-ID {empId}</Text>
      </Stack>
    );
  }

  return (
    <Stack gap="lg" p="md">
      {/* Writer Profile Header */}
      <Card shadow="sm" withBorder radius="md" p="lg">
        <Group justify="space-between">
          <Stack gap={4}>
            <Title order={3}>{writer.name}</Title>
            <Text size="sm" c="dimmed">
              EMP-ID: {writer.empId} • {writer.email}
            </Text>
            <Text size="sm">Joined: {writer.joiningDate}</Text>
          </Stack>
          <Badge color="blue" size="lg" radius="sm">
            {tasks.length} Tasks
          </Badge>
        </Group>
      </Card>

      {/* Tasks Table */}
      <Card shadow="sm" withBorder radius="md" p="lg">
        <Group justify="space-between" mb="md">
          <Title order={4}>Writing Tasks</Title>
          <Button
            size="sm"
            radius="md"
            onClick={() => setOpenModal(true)}
            variant="gradient"
            gradient={{ from: 'blue', to: 'indigo' }}
          >
            + Assign Task
          </Button>
        </Group>

        <Table striped highlightOnHover withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Task Title</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Due Date</Table.Th>
              <Table.Th>Priority</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tasks.map(task => (
              <Table.Tr key={task.id}>
                <Table.Td>{task.title}</Table.Td>
                <Table.Td>{task.status}</Table.Td>
                <Table.Td>{task.dueDate}</Table.Td>
                <Table.Td>{task.priority}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Button
                      size="xs"
                      variant="light"
                      color="blue"
                      onClick={() => console.log('Edit', task.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="xs"
                      variant="light"
                      color="red"
                      onClick={() =>
                        setTasks(tasks.filter(t => t.id !== task.id))
                      }
                    >
                      Delete
                    </Button>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      {/* Assign Task Modal */}
      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title="Assign New Writing Task"
        centered
      >
        <Stack gap="sm">
          <TextInput label="Task Title" placeholder="Enter task title" />
          <Textarea label="Description" placeholder="Enter task description" />
          <TextInput label="Due Date" type="date" />
          <Select
            label="Priority"
            placeholder="Select priority"
            data={['High', 'Medium', 'Low']}
          />
          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button color="blue">Save</Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default WriterDetails;
