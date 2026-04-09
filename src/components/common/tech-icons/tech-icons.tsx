import { useDisclosure } from '@mantine/hooks';
import { Popover } from '@mantine/core';
import { Icon } from '@tabler/icons-react';

function TechIcon({
  icon,
  name,
  color,
  hoverColor,
  size
}: {
  icon: Icon;
  name: string;
  color: string;
  hoverColor: string;
  size: number;
}) {
  const IconComponent = icon;
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <Popover position='bottom' withArrow shadow='md' opened={opened}>
      <Popover.Target>
        <IconComponent
          onMouseEnter={open}
          onMouseLeave={close}
          className={`w-${size}   h-${size} ${color} hover:${hoverColor} transform transition-transform ease-in-out duration-500 hover:scale-150`}
        />
      </Popover.Target>
      <Popover.Dropdown className='border-1 border-black bg-gradient-to-r from-purple-500 to-blue-500'>
        <p className='text-white text-md font-semibold'>{name}</p>
      </Popover.Dropdown>
    </Popover>
  );
}

export default TechIcon;
