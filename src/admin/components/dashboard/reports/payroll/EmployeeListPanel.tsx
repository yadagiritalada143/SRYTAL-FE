import {
  Avatar,
  Badge,
  Box,
  Card,
  Center,
  Divider,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  rgba
} from '@mantine/core';
import {
  IconChevronRight,
  IconSearch,
  IconUsersGroup
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import type { EmployeeInterface } from '@interfaces/employee';

interface EmployeeListPanelProps {
  search: string;
  onSearchChange: (value: string) => void;
  isLoading: boolean;
  error: string | null;
  employees: EmployeeInterface[];
  selectedId?: string;
  onSelect: (employee: EmployeeInterface) => void;
}

const EmployeeListPanel = ({
  search,
  onSearchChange,
  isLoading,
  error,
  employees,
  selectedId,
  onSelect
}: EmployeeListPanelProps) => {
  const { themeConfig } = useAppTheme();
  const accent = themeConfig.button.color;

  return (
    <Card
      withBorder
      radius='lg'
      shadow='sm'
      p={0}
      style={{ borderColor: themeConfig.borderColor }}
    >
      <Box p='md'>
        <Group justify='space-between' align='center' wrap='nowrap'>
          <Group gap='xs' wrap='nowrap'>
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 34,
                height: 34,
                borderRadius: 9,
                color: themeConfig.accentColor,
                backgroundColor: rgba(themeConfig.accentColor, 0.14)
              }}
            >
              <IconUsersGroup size={18} />
            </Box>
            <Text fw={700}>Employees</Text>
          </Group>
          {!isLoading && !error && (
            <Badge variant='light' color={themeConfig.accentColor} radius='sm'>
              {employees.length}
            </Badge>
          )}
        </Group>
        <Text size='xs' c={themeConfig.mutedTextColor} mt={4}>
          Select an employee to view payroll records
        </Text>
      </Box>

      <Divider color={themeConfig.borderColor} />

      <Box p='md'>
        <TextInput
          placeholder='Search employee...'
          leftSection={<IconSearch size={16} stroke={1.5} />}
          value={search}
          onChange={e => onSearchChange(e.currentTarget.value)}
          radius='md'
        />
      </Box>

      <Divider color={themeConfig.borderColor} />

      {isLoading ? (
        <Center py='xl'>
          <Text size='sm' c={themeConfig.mutedTextColor}>
            Loading employees...
          </Text>
        </Center>
      ) : error ? (
        <Center py='xl'>
          <Text size='sm' c={themeConfig.dangerColor} ta='center' px='md'>
            {error}
          </Text>
        </Center>
      ) : employees.length === 0 ? (
        <Center py='xl'>
          <Text size='sm' c={themeConfig.mutedTextColor}>
            No employees found
          </Text>
        </Center>
      ) : (
        <ScrollArea h={480}>
          <Stack gap={6} p='sm'>
            {employees.map(emp => {
              const isActive = selectedId === emp.id;
              return (
                <Paper
                  key={emp.id}
                  p='sm'
                  radius='md'
                  onClick={() => onSelect(emp)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: isActive
                      ? rgba(accent, 0.16)
                      : 'transparent',
                    borderLeft: `3px solid ${isActive ? accent : 'transparent'}`,
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={e => {
                    if (!isActive)
                      e.currentTarget.style.backgroundColor = rgba(
                        accent,
                        0.07
                      );
                  }}
                  onMouseLeave={e => {
                    if (!isActive)
                      e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Group justify='space-between' wrap='nowrap'>
                    <Group gap='sm' wrap='nowrap' style={{ minWidth: 0 }}>
                      <Avatar
                        radius='xl'
                        color={themeConfig.accentColor}
                        variant={isActive ? 'filled' : 'light'}
                      >
                        {emp.firstName?.[0]}
                        {emp.lastName?.[0]}
                      </Avatar>

                      <Box style={{ minWidth: 0 }}>
                        <Text fw={600} size='sm' lineClamp={1}>
                          {emp.firstName} {emp.lastName}
                        </Text>
                        <Text
                          size='xs'
                          c={themeConfig.mutedTextColor}
                          lineClamp={1}
                        >
                          {emp.employeeId}
                        </Text>
                        <Text
                          size='xs'
                          c={themeConfig.accentColor}
                          tt='capitalize'
                          fw={500}
                          lineClamp={1}
                        >
                          {emp.userRole?.replace('_', ' ')}
                        </Text>
                      </Box>
                    </Group>

                    <IconChevronRight
                      size={16}
                      color={isActive ? accent : themeConfig.mutedTextColor}
                      style={{ flexShrink: 0 }}
                    />
                  </Group>
                </Paper>
              );
            })}
          </Stack>
        </ScrollArea>
      )}
    </Card>
  );
};

export default EmployeeListPanel;
