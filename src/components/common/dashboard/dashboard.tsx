import { useMemo, useEffect, useState } from 'react';
import {
  Text,
  Group,
  SimpleGrid,
  Title,
  Badge,
  Avatar,
  Paper,
  Stack,
  Progress,
  Container,
  Tooltip,
  ActionIcon,
  Box,
  TextInput,
  Modal
} from '@mantine/core';
import {
  IconChecklist,
  IconClock,
  IconAlertCircle,
  IconCalendarEvent,
  IconPlayerPlay,
  IconCoffee,
  IconPlus,
  IconConfetti,
  IconPlayerPause
} from '@tabler/icons-react';

import { EmployeeInterface } from '@interfaces/employee';
import { getUserDetails } from '@services/user-services';
import { toast } from 'react-toastify';

import { useDisclosure } from '@mantine/hooks';
import { useAppTheme } from '@hooks/use-app-theme';
import { CommonButton } from '../button/CommonButton';

const Dashboard = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const { themeConfig: currentThemeConfig } = useAppTheme();
  const [opened, { open, close }] = useDisclosure(false);

  // Handle Timer Toggle
  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
    toast.info(
      isTimerRunning ? 'Timer Paused' : 'Timer Started for Current Task'
    );
  };

  const [userDetails, setUserDetails] = useState<EmployeeInterface | null>(
    null
  );

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }, []);

  useEffect(() => {
    getUserDetails()
      .then(res => setUserDetails(res))
      .catch(err =>
        toast.error(
          err?.message ||
            err?.response?.data?.message ||
            'Failed to fetch user details'
        )
      );
  }, []);

  const StatsCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <Paper
      withBorder
      p='md'
      radius='md'
      style={{ backgroundColor: currentThemeConfig.backgroundColor }}
    >
      <Group justify='space-between'>
        <div>
          <Text c='dimmed' tt='uppercase' fw={700} fz='xs'>
            {title}
          </Text>
          <Text fw={700} fz='xl'>
            {value}
          </Text>
          {trend && (
            <Text size='xs' c='teal' fw={500}>
              {trend} from last week
            </Text>
          )}
        </div>
        <Avatar color={color} radius='sm' variant='light'>
          <Icon size='1.4rem' />
        </Avatar>
      </Group>
    </Paper>
  );

  return (
    <Container size='lg' mt={60} pb={40}>
      <Modal opened={opened} onClose={close} title='Create New Task' centered>
        <Stack>
          <TextInput
            label='Task Name'
            placeholder='e.g. API Integration'
            data-autofocus
          />
          <CommonButton onClick={close} color={currentThemeConfig.button.color}>
            Create Task
          </CommonButton>
        </Stack>
      </Modal>
      {/* Header Section */}
      <Group justify='space-between' mb={30} align='flex-end'>
        <Stack gap={4}>
          <Text size='sm' fw={500} c='dimmed'>
            {greeting}
          </Text>
          <Title order={2} style={{ color: currentThemeConfig.color }}>
            {userDetails?.firstName || 'User'} {userDetails?.lastName || 'User'}
          </Title>
        </Stack>

        <Group gap='xs'>
          <Tooltip label={isTimerRunning ? 'Pause Timer' : 'Start Timer'}>
            <ActionIcon
              size='lg'
              variant={isTimerRunning ? 'filled' : 'light'}
              color={isTimerRunning ? 'red' : 'blue'}
              onClick={toggleTimer}
            >
              {isTimerRunning ? (
                <IconPlayerPause size='1.2rem' />
              ) : (
                <IconPlayerPlay size='1.2rem' />
              )}
            </ActionIcon>
          </Tooltip>

          <Tooltip label='Log Break'>
            <ActionIcon
              size='lg'
              variant='light'
              color='orange'
              onClick={() => toast.success('Break logged')}
            >
              <IconCoffee size='1.2rem' />
            </ActionIcon>
          </Tooltip>

          <Tooltip label='Add Task'>
            <ActionIcon
              size='lg'
              variant='filled'
              color={currentThemeConfig.button.color}
              onClick={open}
            >
              <IconPlus size='1.2rem' />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 3 }} mb='xl'>
        <StatsCard
          title='Tasks Completed'
          value='12'
          icon={IconChecklist}
          color='green'
          trend='+2'
        />
        <StatsCard
          title='Hours Logged'
          value='32.5h'
          icon={IconClock}
          color='blue'
        />
        <StatsCard
          title='Pending Review'
          value='02'
          icon={IconAlertCircle}
          color='orange'
        />
      </SimpleGrid>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <Paper
            withBorder
            p='xl'
            radius='md'
            mb='lg'
            style={{ backgroundColor: currentThemeConfig.backgroundColor }}
          >
            <Group justify='space-between' mb='lg'>
              <Title order={4}>Project Progress</Title>
              <Text
                size='xs'
                c='dimmed'
                className='cursor-pointer hover:underline'
              >
                View All Tasks
              </Text>
            </Group>
            <Stack gap='xl'>
              {[
                {
                  task: 'Implement Authentication',
                  date: 'In 2 days',
                  progress: 80,
                  tag: 'Urgent'
                },
                {
                  task: 'Frontend Optimization',
                  date: 'May 7',
                  progress: 30,
                  tag: 'Medium'
                }
              ].map((item, i) => (
                <Box key={i}>
                  <Group justify='space-between' mb={8}>
                    <Text fw={600} size='sm'>
                      {item.task}
                    </Text>
                    <Badge
                      size='xs'
                      variant='dot'
                      color={item.tag === 'Urgent' ? 'red' : 'blue'}
                    >
                      {item.tag}
                    </Badge>
                  </Group>
                  <Progress
                    value={item.progress}
                    size='md'
                    radius='xl'
                    color={currentThemeConfig.button.color}
                  />
                  <Group justify='space-between' mt={8}>
                    <Text size='xs' c='dimmed'>
                      Deadline: {item.date}
                    </Text>
                    <Text size='xs' fw={700}>
                      {item.progress}%
                    </Text>
                  </Group>
                </Box>
              ))}
            </Stack>
          </Paper>
        </div>

        <Stack>
          <Paper
            withBorder
            p='lg'
            radius='md'
            style={{ backgroundColor: currentThemeConfig.backgroundColor }}
          >
            <Group mb='md'>
              <IconCalendarEvent size='1.1rem' />
              <Title order={5}>Upcoming Meetings</Title>
            </Group>
            <Stack gap='sm'>
              <Paper withBorder p='xs' radius='sm'>
                <Text size='xs' fw={700} c='blue'>
                  11:00 AM
                </Text>
                <Text size='sm' fw={500}>
                  Daily Standup
                </Text>
              </Paper>
              <Paper withBorder p='xs' radius='sm'>
                <Text size='xs' fw={700} c='blue'>
                  07:00 PM
                </Text>
                <Text size='sm' fw={500}>
                  Srytal grooming
                </Text>
              </Paper>
            </Stack>
          </Paper>

          <Paper
            withBorder
            p='lg'
            radius='md'
            style={{ backgroundColor: currentThemeConfig.backgroundColor }}
          >
            <Group mb='sm'>
              <IconConfetti size='1.1rem' color='pink' />
              <Title order={5}>Next Holiday</Title>
            </Group>
            <Text size='sm' fw={600}>
              Labour Day
            </Text>
            <Text size='xs' c='dimmed'>
              Monday, May 1st (Long Weekend! 🥳)
            </Text>
          </Paper>
        </Stack>
      </div>
    </Container>
  );
};

export default Dashboard;
