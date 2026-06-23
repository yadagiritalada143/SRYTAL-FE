import { useMemo } from 'react';
import {
  Avatar,
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
  Text,
  ThemeIcon,
  Title
} from '@mantine/core';
import {
  IconAlertCircle,
  IconBriefcase,
  IconCalendarStats,
  IconChecklist,
  IconClock,
  IconClockHour4,
  IconFolders,
  IconHourglassHigh
} from '@tabler/icons-react';

import { useAppTheme } from '@hooks/use-app-theme';
import { useGetEmployeeDashboard } from '@hooks/queries/useUserQueries';

const STATUS_COLOR: Record<string, string> = {
  Approved: 'green',
  'Waiting For Approval': 'yellow',
  Rejected: 'red',
  'Not Submitted': 'gray'
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

const Dashboard = () => {
  const { themeConfig } = useAppTheme();
  const { data, isLoading } = useGetEmployeeDashboard();

  const profile = data?.profile;
  const stats = data?.stats;
  const statusCounts = data?.statusCounts;
  const projects: any[] = data?.projects ?? [];
  const recentEntries: any[] = data?.recentEntries ?? [];

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }, []);

  const fullName =
    `${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`.trim() || 'there';
  const initials =
    `${profile?.firstName?.[0] ?? ''}${profile?.lastName?.[0] ?? ''}`.toUpperCase() ||
    'U';

  const statCards = [
    {
      label: 'Hours This Month',
      value: stats ? `${stats.hoursThisMonth}h` : '—',
      icon: <IconClock size={22} />,
      color: themeConfig.color
    },
    {
      label: 'Hours This Week',
      value: stats ? `${stats.hoursThisWeek}h` : '—',
      icon: <IconClockHour4 size={22} />,
      color: 'teal'
    },
    {
      label: 'Active Projects',
      value: stats?.activeProjects ?? 0,
      icon: <IconFolders size={22} />,
      color: 'indigo'
    },
    {
      label: 'Pending Approvals',
      value: stats?.pendingApprovals ?? 0,
      icon: <IconHourglassHigh size={22} />,
      color: 'orange'
    }
  ];

  // For project progress bars, scale each project's hours against the busiest one.
  const maxProjectHours = Math.max(1, ...projects.map(p => p.hours ?? 0));

  const totalStatusEntries =
    (statusCounts?.approved ?? 0) +
    (statusCounts?.waiting ?? 0) +
    (statusCounts?.rejected ?? 0) +
    (statusCounts?.notSubmitted ?? 0);

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
          <Group gap='md' wrap='nowrap'>
            <Avatar size={64} radius='xl' color={themeConfig.color} variant='filled'>
              {initials}
            </Avatar>
            <Stack gap={2}>
              <Text size='sm' c='dimmed'>
                {greeting},
              </Text>
              {isLoading ? (
                <Skeleton height={28} width={200} />
              ) : (
                <Title order={2} style={{ color: themeConfig.color }}>
                  {fullName}
                </Title>
              )}
              <Group gap='xs'>
                {profile?.designation && (
                  <Badge variant='light' color={themeConfig.color} size='sm'>
                    {profile.designation}
                  </Badge>
                )}
                {profile?.employeeId && (
                  <Text size='xs' c='dimmed'>
                    ID: {profile.employeeId}
                  </Text>
                )}
              </Group>
            </Stack>
          </Group>

          <Group gap='xl'>
            {profile?.department && (
              <Stack gap={0} align='flex-start'>
                <Text size='xs' c='dimmed' tt='uppercase' fw={700}>
                  Department
                </Text>
                <Text size='sm' fw={600}>
                  {profile.department}
                </Text>
              </Stack>
            )}
            {profile?.employmentType && (
              <Stack gap={0} align='flex-start'>
                <Text size='xs' c='dimmed' tt='uppercase' fw={700}>
                  Type
                </Text>
                <Text size='sm' fw={600}>
                  {profile.employmentType}
                </Text>
              </Stack>
            )}
            {profile?.tenure && (
              <Stack gap={0} align='flex-start'>
                <Text size='xs' c='dimmed' tt='uppercase' fw={700}>
                  Tenure
                </Text>
                <Group gap={4}>
                  <IconBriefcase size={14} />
                  <Text size='sm' fw={600}>
                    {profile.tenure}
                  </Text>
                </Group>
              </Stack>
            )}
          </Group>
        </Group>
      </Box>

      {/* Stat cards */}
      <SimpleGrid cols={{ base: 2, md: 4 }} spacing='md' mb='xl'>
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={92} radius='md' />
            ))
          : statCards.map((s, i) => (
              <Card key={i} withBorder radius='md' p='md'>
                <Group gap='sm' wrap='nowrap'>
                  <ThemeIcon size={44} radius='md' variant='light' color={s.color}>
                    {s.icon}
                  </ThemeIcon>
                  <Stack gap={2}>
                    <Title order={3} lh={1}>
                      {s.value}
                    </Title>
                    <Text size='xs' c='dimmed'>
                      {s.label}
                    </Text>
                  </Stack>
                </Group>
              </Card>
            ))}
      </SimpleGrid>

      <Grid gutter='xl'>
        {/* Left: projects */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Card withBorder radius='md' p='lg' mb='xl'>
            <Group justify='space-between' mb='md'>
              <Group gap='xs'>
                <IconFolders size={20} color={themeConfig.color} />
                <Text fw={600} size='lg'>
                  My Projects
                </Text>
              </Group>
              <Text size='xs' c='dimmed'>
                Hours logged this month
              </Text>
            </Group>

            {isLoading ? (
              <Stack gap='lg'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} height={48} radius='sm' />
                ))}
              </Stack>
            ) : projects.length === 0 ? (
              <Center py={40}>
                <Stack align='center' gap='sm'>
                  <ThemeIcon
                    size={48}
                    radius='xl'
                    variant='light'
                    color={themeConfig.color}
                  >
                    <IconFolders size={24} />
                  </ThemeIcon>
                  <Text size='sm' c='dimmed'>
                    No projects assigned yet
                  </Text>
                </Stack>
              </Center>
            ) : (
              <Stack gap='lg'>
                {projects.map((p, i) => (
                  <Box key={i}>
                    <Group justify='space-between' mb={6}>
                      <Text fw={600} size='sm' lineClamp={1}>
                        {p.title}
                      </Text>
                      <Text size='sm' fw={700} c={themeConfig.color}>
                        {Math.round((p.hours ?? 0) * 10) / 10}h
                      </Text>
                    </Group>
                    <Progress
                      value={((p.hours ?? 0) / maxProjectHours) * 100}
                      size='md'
                      radius='xl'
                      color={themeConfig.color}
                    />
                    {p.endDate && (
                      <Text size='xs' c='dimmed' mt={4}>
                        Ends {formatDate(p.endDate)}
                      </Text>
                    )}
                  </Box>
                ))}
              </Stack>
            )}
          </Card>

          {/* Recent activity */}
          <Card withBorder radius='md' p='lg'>
            <Group gap='xs' mb='md'>
              <IconCalendarStats size={20} color={themeConfig.color} />
              <Text fw={600} size='lg'>
                Recent Timesheet Activity
              </Text>
            </Group>

            {isLoading ? (
              <Stack gap='xs'>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} height={44} radius='sm' />
                ))}
              </Stack>
            ) : recentEntries.length === 0 ? (
              <Center py={32}>
                <Text size='sm' c='dimmed'>
                  No timesheet entries yet
                </Text>
              </Center>
            ) : (
              <Stack gap={0}>
                {recentEntries.map((e, i) => (
                  <div key={i}>
                    <Group justify='space-between' py='sm' wrap='nowrap'>
                      <Group gap='sm' wrap='nowrap' style={{ minWidth: 0 }}>
                        <ThemeIcon
                          size={36}
                          radius='md'
                          variant='light'
                          color={STATUS_COLOR[e.status] ?? 'gray'}
                        >
                          <IconChecklist size={16} />
                        </ThemeIcon>
                        <Stack gap={1} style={{ minWidth: 0 }}>
                          <Text size='sm' fw={500} lineClamp={1}>
                            {e.taskTitle}
                          </Text>
                          <Text size='xs' c='dimmed' lineClamp={1}>
                            {e.projectTitle} · {formatDate(e.date)}
                          </Text>
                        </Stack>
                      </Group>
                      <Group gap='xs' wrap='nowrap'>
                        <Text size='sm' fw={700}>
                          {e.hours}h
                        </Text>
                        <Badge
                          size='xs'
                          variant='light'
                          color={STATUS_COLOR[e.status] ?? 'gray'}
                          radius='sm'
                        >
                          {e.status}
                        </Badge>
                      </Group>
                    </Group>
                    {i < recentEntries.length - 1 && <Divider />}
                  </div>
                ))}
              </Stack>
            )}
          </Card>
        </Grid.Col>

        {/* Right: summary sidebar */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack gap='xl'>
            {/* Timesheet status breakdown */}
            <Card withBorder radius='md' p='lg'>
              <Group gap='xs' mb='md'>
                <IconChecklist size={20} color={themeConfig.color} />
                <Text fw={600} size='lg'>
                  Timesheet Status
                </Text>
              </Group>
              {isLoading ? (
                <Stack gap='xs'>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} height={28} radius='sm' />
                  ))}
                </Stack>
              ) : totalStatusEntries === 0 ? (
                <Text size='sm' c='dimmed'>
                  No timesheet records yet
                </Text>
              ) : (
                <Stack gap='sm'>
                  {[
                    { label: 'Approved', value: statusCounts?.approved ?? 0, color: 'green' },
                    { label: 'Waiting For Approval', value: statusCounts?.waiting ?? 0, color: 'yellow' },
                    { label: 'Rejected', value: statusCounts?.rejected ?? 0, color: 'red' },
                    { label: 'Not Submitted', value: statusCounts?.notSubmitted ?? 0, color: 'gray' }
                  ].map((row, i) => (
                    <Group key={i} justify='space-between'>
                      <Group gap='xs'>
                        <Box
                          w={10}
                          h={10}
                          style={{
                            borderRadius: '50%',
                            backgroundColor: `var(--mantine-color-${row.color}-6)`
                          }}
                        />
                        <Text size='sm'>{row.label}</Text>
                      </Group>
                      <Text size='sm' fw={700}>
                        {row.value}
                      </Text>
                    </Group>
                  ))}
                </Stack>
              )}
            </Card>

            {/* Snapshot */}
            <Card withBorder radius='md' p='lg'>
              <Group gap='xs' mb='md'>
                <IconAlertCircle size={20} color={themeConfig.color} />
                <Text fw={600} size='lg'>
                  This Month
                </Text>
              </Group>
              {isLoading ? (
                <Stack gap='xs'>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} height={28} radius='sm' />
                  ))}
                </Stack>
              ) : (
                <Stack gap='sm'>
                  <Group justify='space-between'>
                    <Text size='sm' c='dimmed'>
                      Days Logged
                    </Text>
                    <Text size='sm' fw={700}>
                      {stats?.daysLoggedThisMonth ?? 0}
                    </Text>
                  </Group>
                  <Divider />
                  <Group justify='space-between'>
                    <Text size='sm' c='dimmed'>
                      Tasks Assigned
                    </Text>
                    <Text size='sm' fw={700}>
                      {stats?.tasksAssigned ?? 0}
                    </Text>
                  </Group>
                  <Divider />
                  <Group justify='space-between'>
                    <Text size='sm' c='dimmed'>
                      Joined
                    </Text>
                    <Text size='sm' fw={700}>
                      {formatDate(profile?.dateOfJoining)}
                    </Text>
                  </Group>
                </Stack>
              )}
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Dashboard;
