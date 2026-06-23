import { useMemo } from 'react';
import {
  Badge,
  Box,
  Card,
  Center,
  Container,
  Divider,
  Grid,
  Group,
  Progress,
  SimpleGrid,
  Skeleton,
  Stack,
  Table,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton
} from '@mantine/core';
import {
  IconAlertTriangle,
  IconBriefcase,
  IconBuildingCommunity,
  IconCake,
  IconChevronRight,
  IconClockHour4,
  IconFolders,
  IconHourglassHigh,
  IconKey,
  IconReportMoney,
  IconSettings,
  IconTrophy,
  IconUserPlus,
  IconUsers
} from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { useAppTheme } from '@hooks/use-app-theme';
import { useGetDashboardStatsByAdmin } from '@hooks/queries/useAdminQueries';
import { organizationAdminUrls } from '@utils/common/constants';
import { userDetailsAtom } from '@atoms/user';

const ROLE_COLORS: Record<string, string> = {
  Employee: 'blue',
  Recruiter: 'grape',
  ContentWriter: 'teal',
  admin: 'orange'
};

const formatDate = (value?: string | Date) => {
  if (!value) return '—';
  const d = new Date(value);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const monthName = new Date().toLocaleDateString(undefined, { month: 'long' });

const AdminDashboard = () => {
  const { themeConfig, organizationConfig } = useAppTheme();
  const navigate = useNavigate();
  const { organization } = useParams<{ organization: string }>();
  const user = useRecoilValue(userDetailsAtom);
  const { data, isLoading } = useGetDashboardStatsByAdmin();

  const stats = data?.stats;
  const roleBreakdown: Record<string, number> = data?.roleBreakdown ?? {};
  const departmentBreakdown: Record<string, number> = data?.departmentBreakdown ?? {};
  const recentHires: any[] = data?.recentHires ?? [];
  const birthdays: any[] = data?.upcomingBirthdays ?? [];
  const anniversaries: any[] = data?.workAnniversaries ?? [];

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }, []);

  const adminUrl = organizationAdminUrls(
    organizationConfig?.organization_name || organization || ''
  );

  const roleRows = Object.entries(roleBreakdown).sort((a, b) => b[1] - a[1]);
  const maxRole = Math.max(1, ...roleRows.map(([, n]) => n));
  const deptRows = Object.entries(departmentBreakdown).sort((a, b) => b[1] - a[1]);
  const maxDept = Math.max(1, ...deptRows.map(([, n]) => n));

  const statCards = [
    {
      label: 'Total Employees',
      value: stats?.totalEmployees ?? 0,
      icon: <IconUsers size={22} />,
      color: themeConfig.color,
      onClick: () => navigate(`${adminUrl}/dashboard/employees`)
    },
    {
      label: 'Active Projects',
      value: stats?.activeProjects ?? 0,
      icon: <IconFolders size={22} />,
      color: 'indigo',
      onClick: () => navigate(`${adminUrl}/dashboard/packages`)
    },
    {
      label: 'Pending Approvals',
      value: stats?.pendingTimesheetApprovals ?? 0,
      icon: <IconHourglassHigh size={22} />,
      color: 'orange'
    },
    {
      label: 'Hours This Month',
      value: stats ? `${stats.hoursLoggedThisMonth}h` : '—',
      icon: <IconClockHour4 size={22} />,
      color: 'teal'
    },
    {
      label: 'Password Resets',
      value: stats?.pendingPasswordResets ?? 0,
      icon: <IconKey size={22} />,
      color: 'red',
      onClick: () => navigate(`${adminUrl}/dashboard/employees`)
    }
  ];

  const quickActions = [
    { label: 'Add Employee', icon: <IconUserPlus size={18} />, to: `${adminUrl}/dashboard/addemployee` },
    { label: 'Packages', icon: <IconFolders size={18} />, to: `${adminUrl}/dashboard/packages` },
    { label: 'Generate Salary Slip', icon: <IconReportMoney size={18} />, to: `${adminUrl}/dashboard/reports/generate-salary-slip` },
    { label: 'Settings', icon: <IconSettings size={18} />, to: `${adminUrl}/dashboard/settings` }
  ];

  return (
    <Container size='xl' py='xl'>
      {/* Header */}
      <Box
        mb='xl'
        p='lg'
        style={{
          backgroundImage: `linear-gradient(135deg, ${themeConfig.color}14 0%, ${themeConfig.color}06 100%)`,
          border: `1px solid ${themeConfig.color}28`,
          borderRadius: 'var(--mantine-radius-lg)'
        }}
      >
        <Group justify='space-between' align='center' wrap='wrap'>
          <Stack gap={2}>
            <Text size='sm' c='dimmed'>
              {greeting},
            </Text>
            <Title order={2} style={{ color: themeConfig.color }}>
              {user?.firstName ? `${user.firstName} ${user.lastName ?? ''}`.trim() : 'Admin'}
            </Title>
            <Text size='sm' c='dimmed'>
              Here's what's happening at{' '}
              <Text span fw={600}>
                {organizationConfig?.organization_name || 'your organization'}
              </Text>
            </Text>
          </Stack>
          <ThemeIcon size={64} radius='xl' variant='light' color={themeConfig.color}>
            <IconBuildingCommunity size={32} />
          </ThemeIcon>
        </Group>
      </Box>

      {/* Stat cards */}
      <SimpleGrid cols={{ base: 2, md: 5 }} spacing='md' mb='xl'>
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} height={92} radius='md' />)
          : statCards.map((s, i) => (
              <Card
                key={i}
                withBorder
                radius='md'
                p='md'
                onClick={s.onClick}
                style={{ cursor: s.onClick ? 'pointer' : 'default' }}
              >
                <Group gap='sm' wrap='nowrap'>
                  <ThemeIcon size={44} radius='md' variant='light' color={s.color}>
                    {s.icon}
                  </ThemeIcon>
                  <Stack gap={2} style={{ minWidth: 0 }}>
                    <Title order={3} lh={1}>
                      {s.value}
                    </Title>
                    <Text size='xs' c='dimmed' lineClamp={1}>
                      {s.label}
                    </Text>
                  </Stack>
                </Group>
              </Card>
            ))}
      </SimpleGrid>

      <Grid gutter='xl'>
        {/* Left column */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Stack gap='xl'>
            {/* Workforce by role */}
            <Card withBorder radius='md' p='lg'>
              <Group gap='xs' mb='md'>
                <IconUsers size={20} color={themeConfig.color} />
                <Text fw={600} size='lg'>
                  Workforce by Role
                </Text>
              </Group>
              {isLoading ? (
                <Stack gap='md'>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} height={36} radius='sm' />
                  ))}
                </Stack>
              ) : roleRows.length === 0 ? (
                <Text size='sm' c='dimmed'>
                  No employees yet
                </Text>
              ) : (
                <Stack gap='md'>
                  {roleRows.map(([role, count]) => (
                    <Box key={role}>
                      <Group justify='space-between' mb={4}>
                        <Group gap='xs'>
                          <Badge
                            size='sm'
                            variant='light'
                            color={ROLE_COLORS[role] ?? 'gray'}
                            radius='sm'
                          >
                            {role}
                          </Badge>
                        </Group>
                        <Text size='sm' fw={700}>
                          {count}
                        </Text>
                      </Group>
                      <Progress
                        value={(count / maxRole) * 100}
                        size='md'
                        radius='xl'
                        color={ROLE_COLORS[role] ?? themeConfig.color}
                      />
                    </Box>
                  ))}
                </Stack>
              )}
            </Card>

            {/* Recent hires */}
            <Card withBorder radius='md' p='lg'>
              <Group justify='space-between' mb='md'>
                <Group gap='xs'>
                  <IconUserPlus size={20} color={themeConfig.color} />
                  <Text fw={600} size='lg'>
                    Recent Hires
                  </Text>
                </Group>
                <UnstyledButton onClick={() => navigate(`${adminUrl}/dashboard/employees`)}>
                  <Group gap={2}>
                    <Text size='xs' c={themeConfig.color} fw={600}>
                      View all
                    </Text>
                    <IconChevronRight size={14} color={themeConfig.color} />
                  </Group>
                </UnstyledButton>
              </Group>
              {isLoading ? (
                <Stack gap='xs'>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} height={40} radius='sm' />
                  ))}
                </Stack>
              ) : recentHires.length === 0 ? (
                <Center py={28}>
                  <Text size='sm' c='dimmed'>
                    No hires recorded
                  </Text>
                </Center>
              ) : (
                <Table.ScrollContainer minWidth={420}>
                  <Table verticalSpacing='sm' highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Employee</Table.Th>
                        <Table.Th>Role</Table.Th>
                        <Table.Th>Department</Table.Th>
                        <Table.Th>Joined</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {recentHires.map((h, i) => (
                        <Table.Tr key={i}>
                          <Table.Td>
                            <Stack gap={0}>
                              <Text size='sm' fw={500} lineClamp={1}>
                                {h.name || '—'}
                              </Text>
                              {h.employeeId && (
                                <Text size='xs' c='dimmed'>
                                  {h.employeeId}
                                </Text>
                              )}
                            </Stack>
                          </Table.Td>
                          <Table.Td>
                            <Badge
                              size='sm'
                              variant='light'
                              color={ROLE_COLORS[h.userRole] ?? 'gray'}
                              radius='sm'
                            >
                              {h.userRole || '—'}
                            </Badge>
                          </Table.Td>
                          <Table.Td>
                            <Text size='sm'>{h.department || '—'}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Text size='sm'>{formatDate(h.dateOfJoining)}</Text>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Table.ScrollContainer>
              )}
            </Card>
          </Stack>
        </Grid.Col>

        {/* Right column */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack gap='xl'>
            {/* Quick actions */}
            <Card withBorder radius='md' p='lg'>
              <Text fw={600} size='lg' mb='md'>
                Quick Actions
              </Text>
              <SimpleGrid cols={2} spacing='sm'>
                {quickActions.map((a, i) => (
                  <UnstyledButton
                    key={i}
                    onClick={() => navigate(a.to)}
                    style={{
                      border: `1px solid ${themeConfig.color}22`,
                      borderRadius: 8,
                      padding: '12px 10px'
                    }}
                  >
                    <Stack gap={6} align='center'>
                      <ThemeIcon size={34} radius='md' variant='light' color={themeConfig.color}>
                        {a.icon}
                      </ThemeIcon>
                      <Text size='xs' fw={500} ta='center' lineClamp={2}>
                        {a.label}
                      </Text>
                    </Stack>
                  </UnstyledButton>
                ))}
              </SimpleGrid>
            </Card>

            {/* Department distribution */}
            <Card withBorder radius='md' p='lg'>
              <Group gap='xs' mb='md'>
                <IconBriefcase size={20} color={themeConfig.color} />
                <Text fw={600} size='lg'>
                  By Department
                </Text>
              </Group>
              {isLoading ? (
                <Stack gap='sm'>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} height={28} radius='sm' />
                  ))}
                </Stack>
              ) : deptRows.length === 0 ? (
                <Text size='sm' c='dimmed'>
                  No departments assigned
                </Text>
              ) : (
                <Stack gap='sm'>
                  {deptRows.slice(0, 6).map(([dept, count]) => (
                    <Box key={dept}>
                      <Group justify='space-between' mb={3}>
                        <Text size='sm' lineClamp={1}>
                          {dept}
                        </Text>
                        <Text size='sm' fw={700}>
                          {count}
                        </Text>
                      </Group>
                      <Progress
                        value={(count / maxDept) * 100}
                        size='sm'
                        radius='xl'
                        color={themeConfig.color}
                      />
                    </Box>
                  ))}
                </Stack>
              )}
            </Card>

            {/* Birthdays this month */}
            <Card withBorder radius='md' p='lg'>
              <Group gap='xs' mb='md'>
                <IconCake size={20} color='var(--mantine-color-pink-6)' />
                <Text fw={600} size='lg'>
                  Birthdays in {monthName}
                </Text>
              </Group>
              {isLoading ? (
                <Skeleton height={60} radius='sm' />
              ) : birthdays.length === 0 ? (
                <Text size='sm' c='dimmed'>
                  None this month
                </Text>
              ) : (
                <Stack gap={0}>
                  {birthdays.map((b, i) => (
                    <div key={i}>
                      <Group justify='space-between' py={6}>
                        <Text size='sm' fw={500} lineClamp={1}>
                          {b.name}
                        </Text>
                        <Badge size='sm' variant='light' color='pink' radius='sm'>
                          {monthName.slice(0, 3)} {b.date}
                        </Badge>
                      </Group>
                      {i < birthdays.length - 1 && <Divider />}
                    </div>
                  ))}
                </Stack>
              )}
            </Card>

            {/* Work anniversaries */}
            <Card withBorder radius='md' p='lg'>
              <Group gap='xs' mb='md'>
                <IconTrophy size={20} color='var(--mantine-color-yellow-6)' />
                <Text fw={600} size='lg'>
                  Work Anniversaries
                </Text>
              </Group>
              {isLoading ? (
                <Skeleton height={60} radius='sm' />
              ) : anniversaries.length === 0 ? (
                <Text size='sm' c='dimmed'>
                  None this month
                </Text>
              ) : (
                <Stack gap={0}>
                  {anniversaries.map((a, i) => (
                    <div key={i}>
                      <Group justify='space-between' py={6}>
                        <Text size='sm' fw={500} lineClamp={1}>
                          {a.name}
                        </Text>
                        <Badge size='sm' variant='light' color='yellow' radius='sm'>
                          {a.years} {a.years === 1 ? 'yr' : 'yrs'}
                        </Badge>
                      </Group>
                      {i < anniversaries.length - 1 && <Divider />}
                    </div>
                  ))}
                </Stack>
              )}
            </Card>

            {/* Action items */}
            {!isLoading && (stats?.pendingPasswordResets > 0 || stats?.pendingTimesheetApprovals > 0) && (
              <Card
                withBorder
                radius='md'
                p='lg'
                style={{ borderColor: 'var(--mantine-color-orange-4)' }}
              >
                <Group gap='xs' mb='sm'>
                  <IconAlertTriangle size={20} color='var(--mantine-color-orange-6)' />
                  <Text fw={600} size='lg'>
                    Needs Attention
                  </Text>
                </Group>
                <Stack gap='xs'>
                  {stats?.pendingTimesheetApprovals > 0 && (
                    <Text size='sm'>
                      <Text span fw={700}>
                        {stats.pendingTimesheetApprovals}
                      </Text>{' '}
                      timesheet entr{stats.pendingTimesheetApprovals === 1 ? 'y' : 'ies'} awaiting approval
                    </Text>
                  )}
                  {stats?.pendingPasswordResets > 0 && (
                    <Text size='sm'>
                      <Text span fw={700}>
                        {stats.pendingPasswordResets}
                      </Text>{' '}
                      employee{stats.pendingPasswordResets === 1 ? '' : 's'} pending password reset
                    </Text>
                  )}
                </Stack>
              </Card>
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
