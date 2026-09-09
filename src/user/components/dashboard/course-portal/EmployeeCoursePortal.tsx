import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userDetailsAtom } from '@atoms/user';
import {
  Card,
  Center,
  Container,
  Group,
  Progress,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  TextInput,
  ThemeIcon
} from '@mantine/core';
import {
  IconBook,
  IconCircleCheck,
  IconPlayerPlay,
  IconSearch,
  IconTrophy
} from '@tabler/icons-react';
import OpenRouterSetup, { OPENROUTER_API_KEY_STORAGE } from './OpenRouterSetup';
import { useAppTheme } from '@hooks/use-app-theme';
import {
  useGetMyAssignedCourses,
  useGetUserDetails,
  useGetUserOpenRouterKey
} from '@hooks/queries/useUserQueries';
import PageHeader from '@components/common/page-header/PageHeader';
import DataView from '@components/common/loaders/DataView';
import SkeletonLoader from '@components/common/loaders/SkeletonLoader';
import { AssignedCourse } from '@interfaces/course-assignment';
import AssignedCourseCard from './AssignedCourseCard';
import { COURSE_FILTERS, CourseFilter } from './course-status';

/**
 * The employee's learning home: every course an admin has assigned to them,
 * with how far along they are. Opening a course hands off to the course player
 * at `course-assignments/:courseAssignmentId`.
 */
const EmployeeCoursePortal = () => {
  const navigate = useNavigate();
  const { themeConfig } = useAppTheme();

  const {
    data: courses = [],
    isLoading,
    error,
    refetch
  } = useGetMyAssignedCourses();

  const [filter, setFilter] = useState<CourseFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const user = useRecoilValue(userDetailsAtom);
  const { data: userDetails, isLoading: isUserLoading } = useGetUserDetails();
  const userId = user.id || userDetails?.id || userDetails?._id || '';

  const {
    data: openRouterKeyResponse,
    isLoading: isKeyLoading,
    isFetched: isKeyFetched,
    refetch: refetchKey
  } = useGetUserOpenRouterKey(userId, !!userId);

  const [sessionKey, setSessionKey] = useState<string>('');
  const [showManualSetup, setShowManualSetup] = useState<boolean>(false);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const isSetupParam = searchParams.get('setup') === 'true';
    const isSetupState = Boolean((location.state as any)?.openSetup);

    if (isSetupParam || isSetupState) {
      setShowManualSetup(true);
      if (isSetupParam) {
        const nextParams = new URLSearchParams(searchParams);
        nextParams.delete('setup');
        setSearchParams(nextParams, { replace: true });
      }
    }
  }, [searchParams, location.state, setSearchParams]);

  const backendKey = (
    openRouterKeyResponse?.data?.openrouterKey ||
    (openRouterKeyResponse as any)?.openrouterKey ||
    ''
  ).trim();

  useEffect(() => {
    if (isKeyFetched || !isKeyLoading) {
      if (backendKey) {
        try {
          localStorage.setItem(OPENROUTER_API_KEY_STORAGE, backendKey);
        } catch {
          // ignore
        }
      } else {
        try {
          localStorage.removeItem(OPENROUTER_API_KEY_STORAGE);
        } catch {
          // ignore
        }
        setSessionKey('');
      }
    }
  }, [backendKey, isKeyFetched, isKeyLoading]);

  const stats = useMemo(() => {
    const completed = courses.filter(
      (course: AssignedCourse) => course.status === 'Completed'
    ).length;
    const inProgress = courses.filter(
      (course: AssignedCourse) => course.status === 'In Progress'
    ).length;
    const overall = courses.length
      ? Math.round(
          courses.reduce(
            (sum: number, course: AssignedCourse) =>
              sum + course.progress.percentComplete,
            0
          ) / courses.length
        )
      : 0;

    return { total: courses.length, completed, inProgress, overall };
  }, [courses]);

  const visibleCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return courses.filter((course: AssignedCourse) => {
      const matchesFilter = filter === 'all' || course.status === filter;
      const matchesQuery =
        !query || course.courseName.toLowerCase().includes(query);
      return matchesFilter && matchesQuery;
    });
  }, [courses, filter, searchQuery]);

  const summaryCards = [
    {
      icon: <IconBook size={20} />,
      label: 'All',
      value: stats.total,
      color: 'indigo'
    },
    {
      icon: <IconCircleCheck size={20} />,
      label: 'Not started',
      value: stats.total - stats.completed - stats.inProgress,
      color: 'gray'
    },
    {
      icon: <IconPlayerPlay size={20} />,
      label: 'In progress',
      value: stats.inProgress,
      color: 'blue'
    },
    {
      icon: <IconCircleCheck size={20} />,
      label: 'Completed',
      value: stats.completed,
      color: 'teal'
    },
    {
      icon: <IconTrophy size={20} />,
      label: 'Overall progress',
      value: `${stats.overall}%`,
      color: 'grape'
    }
  ];

  const hasKey = Boolean(backendKey || sessionKey);

  const isCheckingKey =
    (!userId && isUserLoading) || (!!userId && isKeyLoading && !isKeyFetched);

  if (isCheckingKey) {
    return (
      <Container
        size='xl'
        py={{ base: 'md', sm: 'xl' }}
        px={{ base: 'xs', sm: 'md' }}
      >
        <SkeletonLoader type='cards' />
      </Container>
    );
  }

  if (!hasKey || showManualSetup) {
    return (
      <OpenRouterSetup
        currentApiKey={backendKey || sessionKey}
        onKeySaved={key => {
          setSessionKey(key);
          try {
            localStorage.setItem(OPENROUTER_API_KEY_STORAGE, key);
          } catch {
            // ignore
          }
          refetchKey();
          setShowManualSetup(false);
        }}
        onCancel={hasKey ? () => setShowManualSetup(false) : undefined}
      />
    );
  }

  return (
    <Container
      size='xl'
      py={{ base: 'md', sm: 'xl' }}
      px={{ base: 'xs', sm: 'md' }}
    >
      <Stack gap='lg'>
        <PageHeader
          title='My Courses'
          subtitle='Learning assigned to you — pick up where you left off'
          icon={<IconBook size={24} />}
          count={courses.length || undefined}
        />

        {isLoading ? (
          <SkeletonLoader type='cards' />
        ) : (
          <>
            <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing='md'>
              {' '}
              {summaryCards.map(card => (
                <Card key={card.label} withBorder radius='md' p='md'>
                  <Group gap='sm' wrap='nowrap'>
                    <ThemeIcon
                      size={40}
                      radius='md'
                      color={card.color}
                      variant='light'
                    >
                      {card.icon}
                    </ThemeIcon>
                    <Stack gap={0} style={{ minWidth: 0 }}>
                      <Text
                        size='xs'
                        c={themeConfig.mutedTextColor}
                        lineClamp={1}
                      >
                        {card.label}
                      </Text>
                      <Text fw={700} size='lg'>
                        {card.value}
                      </Text>
                    </Stack>
                  </Group>
                </Card>
              ))}
            </SimpleGrid>

            {stats.total > 0 && (
              <Card withBorder radius='md' p='md'>
                <Stack gap={6}>
                  <Group justify='space-between'>
                    <Text size='sm' fw={600}>
                      Overall learning progress
                    </Text>
                    <Text size='sm' fw={700}>
                      {stats.overall}%
                    </Text>
                  </Group>
                  <Progress
                    value={stats.overall}
                    size='lg'
                    radius='xl'
                    color={
                      stats.overall === 100 ? 'teal' : themeConfig.primaryColor
                    }
                  />
                  <Text size='xs' c={themeConfig.mutedTextColor}>
                    {stats.completed} of {stats.total} courses completed
                  </Text>
                </Stack>
              </Card>
            )}

            <Group justify='space-between' align='center' wrap='wrap' gap='sm'>
              <Tabs
                value={filter}
                onChange={value => setFilter((value as CourseFilter) ?? 'all')}
              >
                <Tabs.List>
                  {COURSE_FILTERS.map(option => (
                    <Tabs.Tab key={option.value} value={option.value}>
                      {option.label}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
              </Tabs>

              <TextInput
                placeholder='Search courses'
                leftSection={<IconSearch size={16} />}
                value={searchQuery}
                onChange={event => setSearchQuery(event.currentTarget.value)}
                w={{ base: '100%', sm: 260 }}
              />
            </Group>

            <DataView
              isLoading={false}
              error={error}
              isEmpty={courses.length === 0}
              label='assigned courses'
              onRetry={refetch}
              minHeight={280}
            >
              {visibleCourses.length === 0 ? (
                <Center h={200}>
                  <Text c={themeConfig.mutedTextColor}>
                    No courses match this filter.
                  </Text>
                </Center>
              ) : (
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing='md'>
                  {visibleCourses.map((course: AssignedCourse) => (
                    <AssignedCourseCard
                      key={course.courseAssignmentId}
                      course={course}
                      onOpen={courseAssignmentId =>
                        navigate(`${courseAssignmentId}`)
                      }
                    />
                  ))}
                </SimpleGrid>
              )}
            </DataView>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default EmployeeCoursePortal;
