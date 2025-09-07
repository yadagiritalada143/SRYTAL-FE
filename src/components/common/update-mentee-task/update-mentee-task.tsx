import {
  Paper,
  Title,
  Text,
  Group,
  Table,
  Button,
  Badge,
  Select,
  Textarea,
  Stack,
  Center,
  Box,
  useMantineTheme,
  Grid,
  Tooltip
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useState, useEffect } from 'react';
import { Task, Mentee } from '../../../interfaces/mentee';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { CancelStyledButton } from '../../UI/Buttons/buttons';
import BackButton from '../../UI/Buttonsanimate/BackButton';
import { organizationEmployeeUrls } from '../../../utils/common/constants';

// Dummy mentee list
const mockMentees: Mentee[] = [
  {
    empId: 'SSIPL-007',
    name: 'Sai Babu',
    email: 'sai@gmail.com',
    joiningDate: '2025-04-25',
    totalTasksAssigned: 3,
    tasks: [
      {
        taskId: 'T101',
        title: 'React Timesheet Feature',
        status: 'In Progress',
        dueDate: '2024-08-30',
        priority: 'High'
      },
      {
        taskId: 'T102',
        title: 'API Integration',
        status: 'Completed',
        dueDate: '2024-08-30',
        priority: 'Medium'
      }
    ]
  },
  {
    empId: 'SSIPL-010',
    name: 'Ravi Kumar',
    email: 'ravi@gmail.com',
    joiningDate: '2025-05-01',
    totalTasksAssigned: 2,
    tasks: []
  }
];

const initialTaskState = {
  title: null as string | null,
  description: '',
  startDate: null as Date | null,
  endDate: null as Date | null,
  priority: null as string | null
};

const UpdateMenteeTasks = () => {
  const { empId } = useParams<{ empId: string }>();
  const theme = useMantineTheme();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const [mentee, setMentee] = useState<Mentee | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  const [newTask, setNewTask] = useState(initialTaskState);

  // Load mentee
  useEffect(() => {
    if (empId) {
      const found = mockMentees.find(m => m.empId === empId);
      if (found) {
        setMentee(found);
        setTasks(found.tasks ?? []);
      }
    }
  }, [empId]);

  const handleRemove = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.taskId !== taskId));
  };

  const handleAssign = () => {
    if (!newTask.title || !newTask.priority) return;

    const newTaskObj: Task = {
      taskId: 'T' + (tasks.length + 1),
      title: newTask.title,
      status: 'Not Started',
      dueDate: newTask.endDate?.toISOString().split('T')[0] ?? '',
      priority: newTask.priority as 'High' | 'Medium' | 'Low'
    };

    setNewTask(initialTaskState);
    setTasks(prev => [...prev, newTaskObj]);
  };

  if (!mentee) {
    return (
      <Center>
        <Paper shadow="sm" radius="md" p="lg" withBorder w="50%">
          <Title order={4} ta="center">
            Mentee not found
          </Title>
        </Paper>
      </Center>
    );
  }

  return (
    <div className="flex items-center justify-center ">
      <Paper
        shadow="md"
        radius="lg"
        p="xl"
        withBorder
        w="50%"
        style={{
          backgroundColor:
            organizationConfig.organization_theme.theme.backgroundColor,
          color: theme.colors.primary[2],
          fontFamily: theme.fontFamily
        }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold underline text-center sm:text-left w-full sm:w-auto">
            Update Mentee Tasks
          </h2>

          <div className="w-full sm:w-auto flex justify-center sm:justify-end">
            <BackButton
              label="Back"
              onClick={() =>
                navigate(
                  `${organizationEmployeeUrls(
                    organizationConfig.organization_name
                  )}/dashboard/mentees`
                )
              }
            />
          </div>
        </div>

        {/* Employee details */}
        <Box
          mb="xl"
          p="md"
          style={{
            background: theme.colors.gray[0],
            borderRadius: theme.radius.md,
            color: theme.colors.dark[4]
          }}
        >
          <Stack gap="sm">
            {[
              { label: 'EMP-ID', value: mentee.empId },
              { label: 'Name', value: mentee.name },
              { label: 'Email', value: mentee.email },
              { label: 'Joining Date', value: mentee.joiningDate },
              { label: 'Total Tasks Assigned', value: tasks.length }
            ].map((item, idx) => (
              <Group key={idx} gap="md" grow>
                <Text w="40%" fw={600} c="dimmed">
                  {item.label}
                </Text>
                <Text w="60%" c="dark">
                  : {item.value}
                </Text>
              </Group>
            ))}
          </Stack>
        </Box>

        {/* Assigned tasks */}
        <h3 className="text-lg font-bold underline mb-2">
          Already Assigned Tasks
        </h3>
        {tasks.length === 0 ? (
          <Text c="dimmed" mb="lg">
            No tasks assigned yet.
          </Text>
        ) : (
          <Paper shadow="sm" radius="md" withBorder p="sm" mb="lg">
            <Table striped highlightOnHover withColumnBorders mb="lg">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th style={{ textAlign: 'center' }}>
                    Task Title
                  </Table.Th>
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

                    {/* Status Select */}
                    <Table.Td style={{ textAlign: 'center' }}>
                      <Select
                        data={['Not Started', 'In Progress', 'Completed']}
                        value={task.status}
                        onChange={val => {
                          if (!val) return;
                          setTasks(prev =>
                            prev.map(t =>
                              t.taskId === task.taskId
                                ? { ...t, status: val }
                                : t
                            )
                          );
                        }}
                        size="xs"
                        w={110}
                        radius="md"
                      />
                    </Table.Td>

                    {/* Due Date */}
                    <Table.Td style={{ textAlign: 'center' }}>
                      {task.dueDate}
                    </Table.Td>

                    {/* Priority Badge */}
                    <Table.Td style={{ textAlign: 'center' }}>
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

                    {/* Actions */}
                    <Table.Td style={{ textAlign: 'center' }}>
                      <CancelStyledButton
                        size="sm"
                        label="Remove"
                        onClick={() => handleRemove(task.taskId)}
                      >
                        Remove
                      </CancelStyledButton>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        )}

        {/* Assign new task */}
        <h3 className="text-lg font-bold underline mb-2">Assign New Task</h3>

        <Stack gap="sm">
          {/* Task - full width */}
          <Select
            label="Task"
            placeholder="Select Option"
            data={['Unit Testing', 'React Time Sheet', 'API Integration']}
            value={newTask.title}
            onChange={val => setNewTask({ ...newTask, title: val || '' })}
          />

          {/* Description - full width */}
          <Textarea
            label="Description"
            placeholder="Enter task description"
            value={newTask.description}
            onChange={e =>
              setNewTask({ ...newTask, description: e.currentTarget.value })
            }
          />

          {/* Start & End date side by side */}
          <Grid>
            <Grid.Col span={6}>
              <DateInput
                label="Start Date"
                value={newTask.startDate}
                onChange={date => setNewTask({ ...newTask, startDate: date })}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <DateInput
                label="End Date"
                value={newTask.endDate}
                onChange={date => setNewTask({ ...newTask, endDate: date })}
              />
            </Grid.Col>
          </Grid>

          {/* Priority & Assign button side by side */}
          <Grid>
            <Grid.Col span={6}>
              <Select
                label="Priority"
                placeholder="Select Option"
                data={['High', 'Medium', 'Low']}
                value={newTask.priority}
                onChange={val =>
                  setNewTask({ ...newTask, priority: val || '' })
                }
              />
            </Grid.Col>
            <Grid.Col
              span={6}
              style={{ display: 'flex', alignItems: 'flex-end' }}
            >
              <Button
                fullWidth
                radius="md"
                variant="filled"
                style={{
                  backgroundColor:
                    organizationConfig.organization_theme.theme.button.color,
                  color:
                    organizationConfig.organization_theme.theme.button.textColor
                }}
                onClick={handleAssign}
                disabled={!newTask.title || !newTask.priority}
              >
                Assign
              </Button>
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>
    </div>
  );
};

export default UpdateMenteeTasks;
