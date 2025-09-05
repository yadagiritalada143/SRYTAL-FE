import { useMantineTheme, Card, Text, Badge } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../UI/Buttonsanimate/ProgressBar';
import { Task } from '../../../interfaces/mytasks';

const tasks: Task[] = [
  {
    id: '1',
    name: 'Html & CSS for Beginners',
    progress: 70,
    status: 'In Progress',
    description: 'The complete HTML & CSS course for beginners',
    image: '/html_css.jpg'
  },
  {
    id: '2',
    name: 'MongoDB Fundamentals',
    progress: 40,
    status: 'In Progress',
    description: 'Learn MongoDB from scratch with practical projects',
    image: '/database.jpg'
  },
  {
    id: '3',
    name: 'Javascript Advanced',
    progress: 100,
    status: 'Completed',
    description: 'Deep dive into Javascript advanced concepts',
    image: '/js.jpg'
  }
];

const MyTasks = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  return (
    <div
      style={{
        color: organizationConfig.organization_theme.theme.button.textColor,
        fontFamily: theme.fontFamily
      }}
      className="h-auto px-4 sm:px-8 py-6"
    >
      <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold underline text-center px-2 py-4">
        My Tasks
      </h1>

      {/* Grid layout */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map(task => (
          <Card
            key={task.id}
            shadow="md"
            radius="lg"
            withBorder
            className="cursor-pointer transition-transform duration-200 hover:shadow-xl hover:-translate-y-1"
            onClick={() =>
              navigate(`/srytal/employee/dashboard/mytasks/${task.id}`)
            }
          >
            {/* Thumbnail */}
            <img
              src={task.image}
              alt={task.name}
              className="rounded-lg mb-4 w-full h-40 object-cover"
            />

            {/* Title */}
            <Text fw={600} size="lg" mb="xs">
              {task.name}
            </Text>

            {/* Description */}
            <Text size="sm" color="dimmed" mb="sm" lineClamp={2}>
              {task.description}
            </Text>

            {/* Progress */}
            <div className="mb-2">
              <ProgressBar
                progress={isNaN(task.progress) ? 0 : task.progress}
              />
            </div>

            {/* Status */}
            <Badge
              color={task.status === 'Completed' ? 'green' : 'blue'}
              variant="light"
              className="mt-2"
            >
              {task.status}
            </Badge>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
