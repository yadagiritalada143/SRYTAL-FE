import { Paper, Title, Center, useMantineTheme } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useState, useEffect, useMemo } from 'react';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { themeAtom } from '../../../atoms/theme';
import { getThemeConfig } from '../../../utils/common/theme-utils';
import { organizationEmployeeUrls } from '../../../utils/common/constants';
import BackButton from '../../UI/Buttonsanimate/BackButton';
import { Mentee, Task } from '../../../interfaces/mentee';
import MenteeDetails from './MenteeDetails';
import AssignedTasks from './AssignedTasks';
import AssignNewTaskForm from './AssignNewTaskForm';

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
        title: 'React Timesheet',
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
  const isDarkTheme = useRecoilValue(themeAtom);
  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
  }, [organizationConfig, isDarkTheme]);
  const navigate = useNavigate();
  const [mentee, setMentee] = useState<Mentee | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState(initialTaskState);

  useEffect(() => {
    if (empId) {
      const found = mockMentees.find(m => m.empId === empId);
      if (found) {
        setMentee(found);
        setTasks(found.tasks ?? []);
      }
    }
  }, [empId]);

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
    <div className="flex items-center justify-center w-full px-2">
      <Paper
        shadow="md"
        radius="lg"
        p="xl"
        withBorder
        className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2"
        style={{
          backgroundColor: currentThemeConfig.backgroundColor,
          color: theme.colors.primary[2],
          fontFamily: theme.fontFamily
        }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 w-full">
          <Title order={2} className="underline text-center sm:text-left">
            Update Mentee Tasks
          </Title>
          <div className="flex justify-center sm:justify-end w-full sm:w-auto">
            <BackButton
              label="Back"
              onClick={() =>
                navigate(
                  `${organizationEmployeeUrls(organizationConfig.organization_name)}/dashboard/mentees`
                )
              }
            />
          </div>
        </div>

        <MenteeDetails mentee={mentee} tasksCount={tasks.length} />
        <AssignedTasks tasks={tasks} setTasks={setTasks} />
        <AssignNewTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          onAssign={handleAssign}
          buttonColor={currentThemeConfig.button.color}
          buttonTextColor={currentThemeConfig.button.textColor}
        />
      </Paper>
    </div>
  );
};

export default UpdateMenteeTasks;
