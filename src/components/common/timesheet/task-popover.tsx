import { useDisclosure } from '@mantine/hooks';
import { Popover, Text } from '@mantine/core';

export const TaskPopover = ({
  short,
  full,
}: {
  short: string;
  full: string;
}) => {
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <Popover opened={opened}>
      <Popover.Target>
        <Text size="sm" onMouseEnter={open} onMouseLeave={close}>
          {short.slice(0, 10)}
        </Text>
      </Popover.Target>
      {full && (
        <Popover.Dropdown style={{ pointerEvents: 'none' }}>
          <Text size="sm">{full}</Text>
        </Popover.Dropdown>
      )}
    </Popover>
  );
};
