import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Popover, Text, Box, Badge, Stack } from '@mantine/core';

export const TaskPopover = ({
  short,
  full,
  bgColor,
  status
}: {
  short: string;
  full: string;
  bgColor: string[];
  status?: string;
}) => {
  const [opened, { close, open }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Define color based on status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'accepted':
        return 'green';
      case 'rejected':
        return 'red';
      case 'pending':
      case 'waiting for approval':
        return 'orange';
      case 'not submitted':
        return 'gray';
      default:
        return 'blue';
    }
  };

  const getStatusLabel = (status: string) => {
    return status
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <Popover
      opened={opened}
      width={isMobile ? 260 : 300}
      position="bottom"
      withArrow
      shadow="md"
      offset={8}
    >
      <Popover.Target>
        <Text
          size={isMobile ? 'xs' : 'sm'}
          fw={500}
          onMouseEnter={open}
          onMouseLeave={close}
          onClick={isMobile ? (opened ? close : open) : undefined}
          style={{
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          {short}
        </Text>
      </Popover.Target>

      {full && (
        <Popover.Dropdown
          style={{
            pointerEvents: isMobile ? 'auto' : 'none',
            backgroundColor: bgColor[0],
            color: bgColor[1],
            borderRadius: '8px',
            padding: '12px'
          }}
        >
          <Stack gap="xs">
            <Box>
              <Text size="xs" c="dimmed" fw={600} mb={4}>
                Details:
              </Text>
              <Text size="sm">{full}</Text>
            </Box>

            {status && (
              <Box>
                <Text size="xs" c="dimmed" fw={600} mb={4}>
                  Status:
                </Text>
                <Badge
                  color={getStatusColor(status)}
                  variant="light"
                  size="md"
                  fullWidth
                >
                  {getStatusLabel(status)}
                </Badge>
              </Box>
            )}
          </Stack>
        </Popover.Dropdown>
      )}
    </Popover>
  );
};
