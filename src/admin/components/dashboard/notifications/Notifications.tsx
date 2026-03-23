import { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Text,
  Group,
  Stack,
  Paper,
  Badge
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'warning' | 'info';
}

const Notifications = () => {
  const { themeConfig: currentThemeConfig } = useAppTheme();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications([
      {
        id: '1',
        title: 'New Employee Added',
        message: 'A new employee has been successfully registered',
        time: '5 mins ago',
        type: 'success'
      },
      {
        id: '2',
        title: 'Package Assigned',
        message: 'A package has been assigned to an employee',
        time: '15 mins ago',
        type: 'info'
      },
      {
        id: '3',
        title: 'Pending Approval',
        message: 'Multiple employee requests are awaiting approval',
        time: '30 mins ago',
        type: 'warning'
      },
      {
        id: '4',
        title: 'Package Updated',
        message: 'An existing package has been modified',
        time: '1 hour ago',
        type: 'info'
      },
      {
        id: '5',
        title: 'Employee Deactivated',
        message: 'An employee account has been deactivated',
        time: '2 hours ago',
        type: 'warning'
      }
    ]);
  }, []);

  const getColor = (type: string) => {
    switch (type) {
      case 'success':
        return currentThemeConfig.successColor;
      case 'warning':
        return currentThemeConfig.dangerColor;
      default:
        return currentThemeConfig.button.color;
    }
  };

  return (
    <Container size='lg' mt='xl' pb='lg'>
      <Group mb='lg'>
        <IconAlertCircle size='1.5rem' />
        <Title order={2} style={{ color: currentThemeConfig.color }}>
          Notifications
        </Title>
      </Group>

      <Paper
        withBorder
        p='lg'
        radius='md'
        style={{ backgroundColor: currentThemeConfig.backgroundColor }}
      >
        <Stack gap='sm' style={{ maxHeight: 400, overflowY: 'auto' }}>
          {notifications.length === 0 ? (
            <Text size='sm' c='dimmed' ta='center'>
              No notifications available
            </Text>
          ) : (
            notifications.map(item => (
              <Paper
                key={item.id}
                withBorder
                p='sm'
                radius='sm'
                style={{
                  border: currentThemeConfig.mutedColor
                }}
              >
                <Group justify='space-between' align='flex-start'>
                  <div>
                    <Text size='sm' fw={500}>
                      {item.title}
                    </Text>
                    <Text size='xs' c='dimmed'>
                      {item.message}
                    </Text>
                  </div>

                  <Badge size='xs' color={getColor(item.type)} variant='light'>
                    {item.time}
                  </Badge>
                </Group>
              </Paper>
            ))
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

export default Notifications;
