import {
  Container,
  Text,
  Group,
  Stack,
  Card,
  Badge,
  Box,
  Center
} from '@mantine/core';
import {
  IconBell,
  IconUserPlus,
  IconPackage,
  IconClock,
  IconUserOff,
  IconInbox,
  type Icon
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import PageHeader from '@components/common/page-header/PageHeader';

type NotificationType = 'success' | 'warning' | 'info';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: NotificationType;
  icon: Icon;
}

// NOTE: Placeholder data. There is no notifications API on the backend yet
// (only transactional email utilities exist). Replace this with a real query
// hook once a notifications endpoint is available.
const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'New Employee Added',
    message: 'A new employee has been successfully registered.',
    time: '5 mins ago',
    type: 'success',
    icon: IconUserPlus
  },
  {
    id: '2',
    title: 'Package Assigned',
    message: 'A package has been assigned to an employee.',
    time: '15 mins ago',
    type: 'info',
    icon: IconPackage
  },
  {
    id: '3',
    title: 'Pending Approval',
    message: 'Multiple employee requests are awaiting approval.',
    time: '30 mins ago',
    type: 'warning',
    icon: IconClock
  },
  {
    id: '4',
    title: 'Package Updated',
    message: 'An existing package has been modified.',
    time: '1 hour ago',
    type: 'info',
    icon: IconPackage
  },
  {
    id: '5',
    title: 'Employee Deactivated',
    message: 'An employee account has been deactivated.',
    time: '2 hours ago',
    type: 'warning',
    icon: IconUserOff
  }
];

/** Convert a #rrggbb hex to an rgba() string with the given alpha. */
const hexToRgba = (hex: string, alpha: number): string => {
  if (!hex || !hex.startsWith('#')) return hex;
  let h = hex.slice(1);
  if (h.length === 3)
    h = h
      .split('')
      .map(c => c + c)
      .join('');
  const num = parseInt(h, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
};

const Notifications = () => {
  const { themeConfig } = useAppTheme();
  const notifications = MOCK_NOTIFICATIONS;

  const colorForType = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return themeConfig.successColor;
      case 'warning':
        return themeConfig.dangerColor;
      default:
        return themeConfig.accentColor;
    }
  };

  return (
    <Container size='lg' py='xl'>
      <Stack gap='lg'>
        <PageHeader
          title='Notifications'
          subtitle='Recent activity and alerts across your organization.'
          icon={<IconBell size={24} />}
          count={notifications.length}
        />

        <Card
          withBorder
          radius='lg'
          p={0}
          style={{
            backgroundColor: themeConfig.backgroundColor,
            borderColor: themeConfig.borderColor
          }}
        >
          {notifications.length === 0 ? (
            <Center py={64}>
              <Stack align='center' gap='sm'>
                <IconInbox size={48} opacity={0.3} />
                <Text c={themeConfig.mutedTextColor}>
                  No notifications available
                </Text>
              </Stack>
            </Center>
          ) : (
            <Stack gap={0}>
              {notifications.map((item, index) => {
                const accent = colorForType(item.type);
                const ItemIcon = item.icon;
                return (
                  <Group
                    key={item.id}
                    align='flex-start'
                    wrap='nowrap'
                    gap='md'
                    p='md'
                    style={{
                      borderTop:
                        index === 0
                          ? undefined
                          : `1px solid ${themeConfig.borderColor}`
                    }}
                  >
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        flexShrink: 0,
                        borderRadius: 10,
                        color: accent,
                        backgroundColor: hexToRgba(accent, 0.14)
                      }}
                    >
                      <ItemIcon size={20} />
                    </Box>

                    <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
                      <Text size='sm' fw={600} c={themeConfig.color}>
                        {item.title}
                      </Text>
                      <Text size='xs' c={themeConfig.mutedTextColor}>
                        {item.message}
                      </Text>
                    </Stack>

                    <Badge
                      size='sm'
                      color={accent}
                      variant='light'
                      style={{ flexShrink: 0 }}
                    >
                      {item.time}
                    </Badge>
                  </Group>
                );
              })}
            </Stack>
          )}
        </Card>
      </Stack>
    </Container>
  );
};

export default Notifications;
