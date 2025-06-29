import { useDisclosure } from '@mantine/hooks';
import { Popover, Text, Box, Group, Badge } from '@mantine/core';

export const TaskPopover = ({
  short,
  full,
  bgColor,
  status,
}: {
  short: string;
  full: string;
  bgColor: string[];
  status?: string;
}) => {
  const [opened, { close, open }] = useDisclosure(false);

  // Define color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'yellow';
    }
  };

  return (
    <Popover
      opened={opened}
      width={280}
      position="bottom"
      withArrow
      shadow="md"
      offset={8}
    >
      <Popover.Target>
        <Text
          size="sm"
          fw={500}
          onMouseEnter={open}
          onMouseLeave={close}
          style={{ cursor: 'pointer' }}
        >
          {short}
        </Text>
      </Popover.Target>

      {full && (
        <Popover.Dropdown
          style={{
            pointerEvents: 'none',
            backgroundColor: bgColor[0],
            color: bgColor[1],
            borderRadius: '8px',
            padding: '12px',
          }}
        >
          <Box>
            <Text size="sm" mb="xs">
              <strong>Comment:</strong> {full}
            </Text>

            {status && (
              <Group gap="xs" align="center">
                <Text size="sm">Status:</Text>
                <Badge color={getStatusColor(status)} variant="light">
                  {status}
                </Badge>
              </Group>
            )}
          </Box>
        </Popover.Dropdown>
      )}
    </Popover>
  );
};
