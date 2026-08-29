import { useMemo, useState } from 'react';
import {
  Box,
  Card,
  Center,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Table,
  Text,
  ThemeIcon,
  ScrollArea,
  TextInput,
  ActionIcon
} from '@mantine/core';
import {
  IconBook,
  IconChartLine,
  IconCheck,
  IconChevronRight,
  IconUsers,
  IconSearch
} from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppTheme } from '@hooks/use-app-theme';
import { useGetAllCourseAssignments } from '@hooks/queries/useAdminQueries';
import { AdminAssignment } from '@interfaces/course-assignment';
import PageHeader from '@components/common/page-header/PageHeader';
import DataView from '@components/common/loaders/DataView';
import { organizationAdminUrls } from '@utils/common/constants';

interface EmployeeGroup {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  employeeCode: string;
  assignments: AdminAssignment[];
}

const TrackProgress = () => {
  const { themeConfig } = useAppTheme();
  const navigate = useNavigate();
  const { organization } = useParams<{ organization: string }>();
  const { data: assignments = [], isLoading } = useGetAllCourseAssignments();
  const [search, setSearch] = useState('');

  const employeeGroups = useMemo(() => {
    const map = new Map<string, EmployeeGroup>();
    for (const a of assignments) {
      const emp = a.employee;
      if (!emp) continue;
      const key = emp.employeeId;
      if (!map.has(key)) {
        map.set(key, {
          employeeId: key,
          firstName: emp.firstName,
          lastName: emp.lastName,
          email: emp.email,
          employeeCode: emp.employeeCode,
          assignments: []
        });
      }
      map.get(key)!.assignments.push(a);
    }
    return Array.from(map.values());
  }, [assignments]);

  const filteredGroups = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return employeeGroups;
    return employeeGroups.filter(
      g =>
        `${g.firstName} ${g.lastName}`.toLowerCase().includes(q) ||
        g.employeeCode.toLowerCase().includes(q) ||
        g.email.toLowerCase().includes(q)
    );
  }, [employeeGroups, search]);

  const totalEmployees = employeeGroups.length;
  const totalAssignments = assignments.length;
  const inProgress = assignments.filter(a => a.status === 'In Progress').length;
  const completed = assignments.filter(a => a.status === 'Completed').length;

  const statCards = [
    {
      label: 'Employees',
      value: totalEmployees,
      icon: <IconUsers size={22} />,
      color: 'indigo'
    },
    {
      label: 'Total Assigned Courses',
      value: totalAssignments,
      icon: <IconBook size={22} />,
      color: 'blue'
    },
    {
      label: 'In Progress',
      value: inProgress,
      icon: <IconChartLine size={22} />,
      color: 'orange'
    },
    {
      label: 'Completed',
      value: completed,
      icon: <IconCheck size={22} />,
      color: 'green'
    }
  ];

  const handleRowClick = (employeeId: string) => {
    navigate(
      `${organizationAdminUrls(organization ?? '')}/dashboard/track-progress/${employeeId}`
    );
  };

  return (
    <Container
      size='xl'
      py={{ base: 'md', sm: 'xl' }}
      px={{ base: 'xs', sm: 'md' }}
    >
      <Box mb='xl'>
        <PageHeader
          title='Track Progress'
          subtitle='Select an employee to view their assigned courses and progress'
        />
      </Box>

      <DataView isLoading={isLoading} label='employees' isEmpty={false}>
        <Stack gap='lg'>
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 4 }}
            spacing='lg'
            verticalSpacing='lg'
            style={{
              rowGap: '1.5rem',
              columnGap: '1.5rem'
            }}
          >
            {statCards.map(card => (
              <Card key={card.label} withBorder radius='md' p='lg'>
                <Group gap='xs' justify='space-between' wrap='nowrap' align='center'>
                  <Stack gap={2} style={{ minWidth: 0, flex: 1 }}>
                    <Text
                      size='xs'
                      c='dimmed'
                      fw={500}
                      tt='uppercase'
                      lineClamp={1}
                    >
                      {card.label}
                    </Text>
                    <Text fw={700} size='xl'>
                      {card.value}
                    </Text>
                  </Stack>
                  <ThemeIcon
                    size={48}
                    radius='md'
                    variant='light'
                    color={card.color}
                    style={{ flexShrink: 0 }}
                  >
                    {card.icon}
                  </ThemeIcon>
                </Group>
              </Card>
            ))}
          </SimpleGrid>

          <Card withBorder radius='md' p='md'>
            <Group justify='space-between' align='center' wrap='wrap' gap='md'>
              <TextInput
                placeholder='Search by name, employee code...'
                leftSection={<IconSearch size={16} />}
                value={search}
                onChange={e => setSearch(e.currentTarget.value)}
                w={{ base: '100%', sm: 340 }}
              />
            </Group>
          </Card>

          {filteredGroups.length === 0 ? (
            <Card withBorder radius='md' p='xl'>
              <Center py='xl'>
                <Stack align='center' gap='sm'>
                  <ThemeIcon size={48} radius='xl' variant='light' color='gray'>
                    <IconUsers size={24} />
                  </ThemeIcon>
                  <Text c='dimmed'>
                    No employees with course assignments found
                  </Text>
                </Stack>
              </Center>
            </Card>
          ) : (
            <Card withBorder radius='md' p={0}>
              <ScrollArea>
                <Table
                  highlightOnHover
                  verticalSpacing='sm'
                  horizontalSpacing='md'
                  style={{ minWidth: 640 }}
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Employee</Table.Th>
                      <Table.Th />
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {filteredGroups.map(group => (
                      <Table.Tr
                        key={group.employeeId}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleRowClick(group.employeeId)}
                      >
                        <Table.Td>
                          <Group gap='sm'>
                            <ThemeIcon
                              size={36}
                              radius='xl'
                              variant='light'
                              color={themeConfig.color}
                            >
                              <Text fw={600} size='sm'>
                                {group.firstName?.[0] ?? ''}
                                {group.lastName?.[0] ?? ''}
                              </Text>
                            </ThemeIcon>
                            <Stack gap={0}>
                              <Text fw={500} size='sm'>
                                {group.firstName} {group.lastName}
                              </Text>
                              <Text size='xs' c='dimmed'>
                                {group.employeeCode}
                              </Text>
                            </Stack>
                          </Group>
                        </Table.Td>

                        <Table.Td align='right'>
                          <ActionIcon
                            variant='light'
                            color={themeConfig.color}
                            radius='xl'
                          >
                            <IconChevronRight size={16} />
                          </ActionIcon>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            </Card>
          )}
        </Stack>
      </DataView>
    </Container>
  );
};

export default TrackProgress;
