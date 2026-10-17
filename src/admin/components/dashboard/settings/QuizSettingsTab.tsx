import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Card,
  Stack,
  Group,
  Text,
  TextInput,
  Select,
  Flex,
  SimpleGrid,
  Paper,
  ThemeIcon,
  Pagination,
  Center,
  SegmentedControl
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconListCheck,
  IconSearch,
  IconArrowLeft,
  IconBook,
  IconCheck,
  IconFilter,
  IconFolder,
  IconTable,
  IconPlus
} from '@tabler/icons-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppTheme } from '@hooks/use-app-theme';
import { commonUrls } from '@utils/common/constants';
import { Course } from '@interfaces/contentwriter';
import { CourseQuizItem, CourseGroup } from '@interfaces/quiz';
import { useGetAllCoursesByUser } from '@hooks/queries/useUserQueries';
import PageHeader from '@components/common/page-header/PageHeader';
import { CommonButton } from '@components/common/button/CommonButton';
import DataView from '@components/common/loaders/DataView';
import QuizManager from '@user/components/dashboard/edit-course/QuizManager';
import QuickSimulationModal from '@user/components/dashboard/edit-course/QuickSimulationModal';
import CreateQuizTaskModal from '@user/components/dashboard/edit-course/CreateQuizTaskModal';
import QuizCurriculumView from './QuizCurriculumView';
import QuizTableView from './QuizTableView';

const ITEMS_PER_PAGE_OPTIONS = ['5', '10', '20', '50', '100'];
const DEFAULT_ITEMS_PER_PAGE = 10;

export interface QuizSettingsTabProps {
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function QuizSettingsTab({
  showBackButton = false,
  onBack
}: QuizSettingsTabProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    themeConfig: currentThemeConfig,
    isDarkTheme,
    organizationConfig
  } = useAppTheme();
  const organization = organizationConfig?.organization_name || '';

  const isMobile = useMediaQuery('(max-width: 768px)');

  const { data: courses = [], isLoading: isLoadingCourses } =
    useGetAllCoursesByUser();

  const [activeQuiz, setActiveQuiz] = useState<CourseQuizItem | null>(null);
  const [quickSimulatingQuiz, setQuickSimulatingQuiz] =
    useState<CourseQuizItem | null>(null);
  const [createModalOpened, setCreateModalOpened] = useState(false);
  const [selectedCourseForCreate, setSelectedCourseForCreate] = useState('');
  const [selectedModuleForCreate, setSelectedModuleForCreate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState<'curriculum' | 'table'>(
    'curriculum'
  );
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  const allQuizzes = useMemo(() => {
    const courseList: Course[] = Array.isArray(courses)
      ? courses
      : (courses as any)?.courses || [];

    const list: CourseQuizItem[] = [];
    courseList.forEach((course: Course) => {
      (course.modules || []).forEach((module: any) => {
        (module.tasks || []).forEach((task: any) => {
          if ((task.type || '').toUpperCase() === 'QUIZ') {
            list.push({
              courseId: course._id,
              courseName: course.courseName || 'Untitled Course',
              courseStatus: course.status || 'ACTIVE',
              moduleId: module._id,
              moduleName: module.moduleName || 'Untitled Module',
              taskId: task._id,
              taskName: task.taskName || 'Untitled Quiz',
              taskDescription: task.taskDescription || '',
              status: task.status || 'ACTIVE',
              updatedAt: task.updatedAt
            });
          }
        });
      });
    });
    return list;
  }, [courses]);

  const urlTaskId = searchParams.get('taskId');
  useEffect(() => {
    if (urlTaskId && allQuizzes.length > 0) {
      const match = allQuizzes.find(q => q.taskId === urlTaskId);
      if (match) {
        setActiveQuiz(match);
      }
    } else if (!urlTaskId) {
      setActiveQuiz(null);
    }
  }, [urlTaskId, allQuizzes]);

  const courseFilterOptions = useMemo(() => {
    const uniqueCourses = Array.from(
      new Set(allQuizzes.map(q => q.courseName))
    );
    return [
      { value: 'ALL', label: 'All Courses' },
      ...uniqueCourses.map(c => ({ value: c, label: c }))
    ];
  }, [allQuizzes]);

  const filteredQuizzes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allQuizzes.filter(item => {
      const matchesSearch =
        !q ||
        item.taskName.toLowerCase().includes(q) ||
        item.courseName.toLowerCase().includes(q) ||
        item.moduleName.toLowerCase().includes(q);

      const matchesCourse =
        courseFilter === 'ALL' || item.courseName === courseFilter;

      return matchesSearch && matchesCourse;
    });
  }, [allQuizzes, searchQuery, courseFilter]);

  const { paginatedData, totalPages } = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return {
      paginatedData: filteredQuizzes.slice(start, end),
      totalPages: Math.ceil(filteredQuizzes.length / itemsPerPage)
    };
  }, [filteredQuizzes, activePage, itemsPerPage]);

  const paginatedCourseGroups = useMemo(() => {
    const groups: CourseGroup[] = [];
    const courseMap = new Map<string, CourseGroup>();

    paginatedData.forEach(item => {
      let cGroup = courseMap.get(item.courseId);
      if (!cGroup) {
        cGroup = {
          courseId: item.courseId,
          courseName: item.courseName,
          courseStatus: item.courseStatus,
          modules: [],
          totalQuizzes: 0
        };
        courseMap.set(item.courseId, cGroup);
        groups.push(cGroup);
      }
      cGroup.totalQuizzes += 1;

      let mGroup = cGroup.modules.find(m => m.moduleId === item.moduleId);
      if (!mGroup) {
        mGroup = {
          moduleId: item.moduleId,
          moduleName: item.moduleName,
          quizzes: []
        };
        cGroup.modules.push(mGroup);
      }
      mGroup.quizzes.push(item);
    });

    return groups;
  }, [paginatedData]);

  // Reset page on filter changes
  useEffect(() => {
    setActivePage(1);
  }, [searchQuery, courseFilter, itemsPerPage]);

  const handleSelectQuiz = (quiz: CourseQuizItem) => {
    setActiveQuiz(quiz);
    setSearchParams({ taskId: quiz.taskId }, { replace: true });
  };

  const handleQuizCreated = (
    newQuiz: {
      taskId: string;
      taskName: string;
      courseName: string;
      moduleName: string;
      courseId: string;
      moduleId: string;
    },
    openQuestionsBuilder?: boolean
  ) => {
    if (openQuestionsBuilder && newQuiz.taskId) {
      handleSelectQuiz({
        courseId: newQuiz.courseId,
        courseName: newQuiz.courseName,
        courseStatus: 'ACTIVE',
        moduleId: newQuiz.moduleId,
        moduleName: newQuiz.moduleName,
        taskId: newQuiz.taskId,
        taskName: newQuiz.taskName,
        taskDescription: '',
        status: 'ACTIVE'
      });
    }
  };

  const handleBackToTable = () => {
    setActiveQuiz(null);
    setSearchParams({}, { replace: true });
  };

  const handleBackToCourse = () => {
    if (!activeQuiz?.courseId) return;
    const query = activeQuiz.moduleId
      ? `?expandedModuleId=${activeQuiz.moduleId}`
      : '';
    navigate(
      `${commonUrls(organization)}/dashboard/course/${activeQuiz.courseId}${query}`
    );
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    const fromCourseId = searchParams.get('courseId');
    if (fromCourseId) {
      const fromModuleId = searchParams.get('moduleId');
      const query = fromModuleId ? `?expandedModuleId=${fromModuleId}` : '';
      navigate(
        `${commonUrls(organization)}/dashboard/course/${fromCourseId}${query}`
      );
      return;
    }
    navigate(-1);
  };

  const totalActiveQuizzes = useMemo(
    () =>
      allQuizzes.filter(q => (q.status || '').toUpperCase() === 'ACTIVE')
        .length,
    [allQuizzes]
  );
  const totalCoursesWithQuizzes = useMemo(
    () => new Set(allQuizzes.map(q => q.courseId)).size,
    [allQuizzes]
  );

  return (
    <Container size='lg'>
      <Card
        radius='lg'
        p='lg'
        withBorder
        shadow={isDarkTheme ? 'xs' : 'sm'}
        style={{
          backgroundColor: currentThemeConfig.backgroundColor,
          border: `1px solid ${currentThemeConfig.borderColor}`
        }}
      >
        <Stack gap='lg'>
          {activeQuiz ? (
            <QuizManager
              taskId={activeQuiz.taskId}
              taskName={activeQuiz.taskName}
              courseName={activeQuiz.courseName}
              moduleName={activeQuiz.moduleName}
              onBack={handleBackToTable}
              backLabel='All Quizzes'
              onBackToCourse={
                activeQuiz.courseId ? handleBackToCourse : undefined
              }
            />
          ) : (
            <>
              <PageHeader
                title='Quizzes'
                subtitle='View and manage quiz questions, answer choices, and simulations across all courses.'
                icon={<IconListCheck size={24} />}
                count={allQuizzes.length}
                actions={
                  <Group wrap='nowrap' gap='sm'>
                    {showBackButton && (
                      <CommonButton
                        variant='default'
                        leftSection={<IconArrowLeft size={16} />}
                        onClick={handleBack}
                        fullWidth={isMobile}
                        size={isMobile ? 'md' : 'sm'}
                      >
                        Back
                      </CommonButton>
                    )}
                    <CommonButton
                      variant='filled'
                      color={currentThemeConfig.button.color}
                      leftSection={<IconPlus size={16} />}
                      onClick={() => {
                        const courseList = Array.isArray(courses)
                          ? courses
                          : (courses as any)?.courses || [];
                        const preselectCourse =
                          courseFilter !== 'ALL'
                            ? courseList.find(
                                (c: Course) => c.courseName === courseFilter
                              )?._id || ''
                            : '';
                        setSelectedCourseForCreate(preselectCourse);
                        setSelectedModuleForCreate('');
                        setCreateModalOpened(true);
                      }}
                      fullWidth={isMobile}
                      size={isMobile ? 'md' : 'sm'}
                    >
                      Create Quiz Task
                    </CommonButton>
                    <CommonButton
                      variant='light'
                      leftSection={<IconBook size={16} />}
                      onClick={() =>
                        navigate(
                          `${commonUrls(organization)}/dashboard/content-writer`
                        )
                      }
                      fullWidth={isMobile}
                      size={isMobile ? 'md' : 'sm'}
                    >
                      View Courses
                    </CommonButton>
                  </Group>
                }
              />

              {/* Stats Overview */}
              {allQuizzes.length > 0 && (
                <SimpleGrid cols={{ base: 1, sm: 3 }} spacing='md'>
                  <Paper
                    p='md'
                    radius='md'
                    withBorder
                    style={{
                      borderColor: currentThemeConfig.borderColor,
                      backgroundColor: currentThemeConfig.cardBackground
                    }}
                  >
                    <Group justify='space-between' align='center'>
                      <Stack gap={2}>
                        <Text size='xs' c='dimmed' fw={600} tt='uppercase'>
                          Total Quizzes
                        </Text>
                        <Text
                          size='xl'
                          fw={800}
                          style={{ color: currentThemeConfig.color }}
                        >
                          {allQuizzes.length}
                        </Text>
                      </Stack>
                      <ThemeIcon
                        size={38}
                        radius='md'
                        variant='light'
                        color='indigo'
                      >
                        <IconListCheck size={20} />
                      </ThemeIcon>
                    </Group>
                  </Paper>

                  <Paper
                    p='md'
                    radius='md'
                    withBorder
                    style={{
                      borderColor: currentThemeConfig.borderColor,
                      backgroundColor: currentThemeConfig.cardBackground
                    }}
                  >
                    <Group justify='space-between' align='center'>
                      <Stack gap={2}>
                        <Text size='xs' c='dimmed' fw={600} tt='uppercase'>
                          Active Quizzes
                        </Text>
                        <Text size='xl' fw={800} c='teal'>
                          {totalActiveQuizzes}
                        </Text>
                      </Stack>
                      <ThemeIcon
                        size={38}
                        radius='md'
                        variant='light'
                        color='teal'
                      >
                        <IconCheck size={20} />
                      </ThemeIcon>
                    </Group>
                  </Paper>

                  <Paper
                    p='md'
                    radius='md'
                    withBorder
                    style={{
                      borderColor: currentThemeConfig.borderColor,
                      backgroundColor: currentThemeConfig.cardBackground
                    }}
                  >
                    <Group justify='space-between' align='center'>
                      <Stack gap={2}>
                        <Text size='xs' c='dimmed' fw={600} tt='uppercase'>
                          Courses with Quizzes
                        </Text>
                        <Text size='xl' fw={800} c='indigo'>
                          {totalCoursesWithQuizzes}
                        </Text>
                      </Stack>
                      <ThemeIcon
                        size={38}
                        radius='md'
                        variant='light'
                        color='cyan'
                      >
                        <IconBook size={20} />
                      </ThemeIcon>
                    </Group>
                  </Paper>
                </SimpleGrid>
              )}

              <Card
                p='sm'
                radius='md'
                withBorder
                style={{
                  backgroundColor: currentThemeConfig.cardBackground,
                  borderColor: currentThemeConfig.borderColor
                }}
              >
                <Flex
                  direction={{ base: 'column', md: 'row' }}
                  justify='space-between'
                  align={{ base: 'stretch', md: 'center' }}
                  gap='md'
                >
                  <Group gap='md' style={{ flex: 1 }} wrap='wrap'>
                    <TextInput
                      placeholder='Search by quiz, course, or module...'
                      leftSection={<IconSearch size={16} />}
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      style={{ flex: 1, minWidth: 220 }}
                      radius='md'
                    />

                    {courseFilterOptions.length > 2 && (
                      <Select
                        placeholder='Filter by course'
                        leftSection={<IconFilter size={16} />}
                        data={courseFilterOptions}
                        value={courseFilter}
                        onChange={val => setCourseFilter(val || 'ALL')}
                        style={{ minWidth: 180 }}
                        radius='md'
                        comboboxProps={{ withinPortal: true }}
                      />
                    )}
                  </Group>

                  <Group
                    gap='md'
                    justify={isMobile ? 'space-between' : 'flex-end'}
                    wrap='wrap'
                  >
                    {!isMobile && (
                      <SegmentedControl
                        value={viewMode}
                        onChange={val =>
                          setViewMode(val as 'curriculum' | 'table')
                        }
                        size='xs'
                        radius='md'
                        data={[
                          {
                            value: 'curriculum',
                            label: (
                              <Center style={{ gap: 6 }}>
                                <IconFolder size={14} />
                                <span>Curriculum</span>
                              </Center>
                            )
                          },
                          {
                            value: 'table',
                            label: (
                              <Center style={{ gap: 6 }}>
                                <IconTable size={14} />
                                <span>Table</span>
                              </Center>
                            )
                          }
                        ]}
                      />
                    )}

                    <Group gap='xs'>
                      <Text size='sm' c='dimmed'>
                        Per page:
                      </Text>
                      <Select
                        data={ITEMS_PER_PAGE_OPTIONS}
                        value={String(itemsPerPage)}
                        onChange={val =>
                          setItemsPerPage(Number(val) || DEFAULT_ITEMS_PER_PAGE)
                        }
                        w={75}
                        radius='md'
                        comboboxProps={{ withinPortal: true }}
                      />
                    </Group>
                  </Group>
                </Flex>
              </Card>

              <DataView
                isLoading={isLoadingCourses}
                label='quizzes'
                isEmpty={filteredQuizzes.length === 0 && !isLoadingCourses}
              >
                {viewMode === 'table' && !isMobile ? (
                  <QuizTableView
                    quizzes={paginatedData}
                    onSelectQuiz={handleSelectQuiz}
                    onSimulateQuiz={quiz => setQuickSimulatingQuiz(quiz)}
                    activePage={activePage}
                    itemsPerPage={itemsPerPage}
                  />
                ) : (
                  <QuizCurriculumView
                    courseGroups={paginatedCourseGroups}
                    onSelectQuiz={handleSelectQuiz}
                    onSimulateQuiz={quiz => setQuickSimulatingQuiz(quiz)}
                    onAddQuiz={(courseId, moduleId) => {
                      setSelectedCourseForCreate(courseId);
                      setSelectedModuleForCreate(moduleId || '');
                      setCreateModalOpened(true);
                    }}
                  />
                )}
              </DataView>

              {/* Pagination */}
              {totalPages > 1 && (
                <Flex justify='center' mt='md'>
                  <Pagination
                    total={totalPages}
                    value={activePage}
                    onChange={setActivePage}
                    color={currentThemeConfig.button.color}
                  />
                </Flex>
              )}
            </>
          )}
        </Stack>
      </Card>

      <QuickSimulationModal
        quiz={quickSimulatingQuiz}
        onClose={() => setQuickSimulatingQuiz(null)}
      />

      <CreateQuizTaskModal
        opened={createModalOpened}
        onClose={() => setCreateModalOpened(false)}
        courses={courses as Course[]}
        initialCourseId={selectedCourseForCreate}
        initialModuleId={selectedModuleForCreate}
        onCreated={handleQuizCreated}
      />
    </Container>
  );
}
