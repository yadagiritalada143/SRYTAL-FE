import { Avatar, Card, Divider, Group, Stack, Text } from '@mantine/core';
import {
  IconAlertTriangle,
  IconKey,
  IconMail,
  IconPhone,
  IconTrash
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { CommonButton } from '@components/common/button/CommonButton';

interface EmployeeSidebarProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNumber?: string | number;
  onPasswordReset: () => void;
  onDelete: () => void;
}

const EmployeeSidebar = ({
  firstName,
  lastName,
  email,
  mobileNumber,
  onPasswordReset,
  onDelete
}: EmployeeSidebarProps) => {
  const { themeConfig } = useAppTheme();

  return (
    <Stack>
      <Card withBorder shadow='sm' p='lg' radius='md'>
        <Stack align='center' gap='xs'>
          <Avatar size={80} radius='xl' />

          <Text fw={700}>
            {firstName} {lastName}
          </Text>

          <Group gap={6}>
            <IconMail size={14} color={themeConfig.dangerColor} />
            <Text size='sm' c='dimmed'>
              {email}
            </Text>
          </Group>

          <Group gap={6}>
            <IconPhone size={14} color={themeConfig.successColor} />
            <Text size='sm' c='dimmed'>
              {mobileNumber}
            </Text>
          </Group>

          <Divider my='sm' />

          <CommonButton
            variant='light'
            color='blue'
            fullWidth
            leftSection={<IconKey size={16} />}
            onClick={onPasswordReset}
          >
            Reset Password
          </CommonButton>
        </Stack>
      </Card>

      <Card withBorder shadow='xs' p='lg' radius='md'>
        <Group gap='xs' mb='xs'>
          <IconAlertTriangle size={16} color={themeConfig.dangerColor} />
          <Text fw={600} c={themeConfig.dangerColor}>
            Delete Employee
          </Text>
        </Group>

        <Text size='sm' c='dimmed' mb='sm'>
          Permanently delete this employee and all associated records.
        </Text>

        <CommonButton
          color={themeConfig.dangerColor}
          variant='light'
          leftSection={<IconTrash size={16} />}
          onClick={onDelete}
        >
          Delete Employee
        </CommonButton>
      </Card>
    </Stack>
  );
};

export default EmployeeSidebar;
