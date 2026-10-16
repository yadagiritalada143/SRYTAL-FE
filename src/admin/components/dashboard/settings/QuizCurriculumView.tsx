import React from 'react';
import {
  Accordion,
  Badge,
  Box,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
  ActionIcon
} from '@mantine/core';
import {
  IconBook,
  IconLayersSubtract,
  IconListCheck,
  IconPlayerPlay,
  IconPlus
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { CommonButton } from '@components/common/button/CommonButton';
import { CourseGroup, CourseQuizItem } from '@interfaces/quiz';

export interface QuizCurriculumViewProps {
  courseGroups: CourseGroup[];
  onSelectQuiz: (quiz: CourseQuizItem) => void;
  onSimulateQuiz: (quiz: CourseQuizItem) => void;
  onAddQuiz?: (courseId: string, moduleId?: string) => void;
}

export const QuizCurriculumView: React.FC<QuizCurriculumViewProps> = ({
  courseGroups,
  onSelectQuiz,
  onSimulateQuiz,
  onAddQuiz
}) => {
  const { themeConfig, isDarkTheme } = useAppTheme();

  const defaultExpanded = courseGroups.map(g => g.courseId);

  return (
    <Accordion
      multiple
      defaultValue={defaultExpanded}
      variant='separated'
      radius='md'
      styles={{
        item: {
          backgroundColor: themeConfig.cardBackground,
          borderColor: themeConfig.borderColor,
          boxShadow: isDarkTheme ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.05)',
          marginBottom: '1rem'
        },
        control: {
          padding: '1rem',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: isDarkTheme
              ? 'rgba(255, 255, 255, 0.03)'
              : 'rgba(0, 0, 0, 0.02)'
          }
        },
        content: {
          padding: '0.75rem 1rem 1.25rem 1rem'
        }
      }}
    >
      {courseGroups.map(courseGroup => (
        <Accordion.Item key={courseGroup.courseId} value={courseGroup.courseId}>
          <Accordion.Control>
            <Group justify='space-between' align='center' wrap='wrap' gap='sm'>
              <Group gap='sm' align='center' style={{ minWidth: 0 }}>
                <ThemeIcon
                  size={36}
                  radius='md'
                  variant='light'
                  color='indigo'
                  style={{ flexShrink: 0 }}
                >
                  <IconBook size={20} />
                </ThemeIcon>
                <Stack gap={2}>
                  <Text fw={700} size='md' style={{ color: themeConfig.color }}>
                    {courseGroup.courseName}
                  </Text>
                  <Group gap={6} align='center'>
                    <Badge
                      size='xs'
                      variant='light'
                      color={
                        (courseGroup.courseStatus || '').toUpperCase() ===
                        'ACTIVE'
                          ? 'teal'
                          : 'orange'
                      }
                    >
                      {courseGroup.courseStatus}
                    </Badge>
                    <Text size='xs' c='dimmed'>
                      •
                    </Text>
                    <Text size='xs' c='dimmed'>
                      {courseGroup.modules.length}{' '}
                      {courseGroup.modules.length === 1 ? 'Module' : 'Modules'}
                    </Text>
                  </Group>
                </Stack>
              </Group>

              <Badge size='sm' variant='filled' color='indigo'>
                {courseGroup.totalQuizzes}{' '}
                {courseGroup.totalQuizzes === 1 ? 'Quiz' : 'Quizzes'}
              </Badge>
            </Group>
          </Accordion.Control>

          <Accordion.Panel>
            <Divider mb='md' />
            <Stack gap='md'>
              {courseGroup.modules.map(modGroup => (
                <Box key={modGroup.moduleId}>
                  <Group justify='space-between' align='center' mb='xs'>
                    <Group gap='xs' align='center'>
                      <ThemeIcon
                        size={24}
                        radius='sm'
                        variant='light'
                        color='cyan'
                      >
                        <IconLayersSubtract size={14} />
                      </ThemeIcon>
                      <Text
                        size='sm'
                        fw={600}
                        style={{ color: themeConfig.color }}
                      >
                        Module: {modGroup.moduleName}
                      </Text>
                      <Badge size='xs' variant='outline' color='cyan'>
                        {modGroup.quizzes.length}{' '}
                        {modGroup.quizzes.length === 1 ? 'Quiz' : 'Quizzes'}
                      </Badge>
                    </Group>

                    {onAddQuiz && (
                      <CommonButton
                        variant='subtle'
                        color='cyan'
                        size='compact-xs'
                        leftSection={<IconPlus size={12} />}
                        onClick={() =>
                          onAddQuiz(courseGroup.courseId, modGroup.moduleId)
                        }
                      >
                        Add Quiz
                      </CommonButton>
                    )}
                  </Group>

                  <Stack gap='xs'>
                    {modGroup.quizzes.map((quiz, quizIndex) => {
                      const sNo = quizIndex + 1;
                      const isQuizActive =
                        (quiz.status || '').toUpperCase() === 'ACTIVE';

                      return (
                        <Card
                          key={quiz.taskId}
                          p='sm'
                          radius='md'
                          withBorder
                          style={{
                            borderColor: themeConfig.borderColor,
                            backgroundColor: isDarkTheme
                              ? 'rgba(255, 255, 255, 0.02)'
                              : 'rgba(0, 0, 0, 0.01)'
                          }}
                        >
                          <Group
                            justify='space-between'
                            align='center'
                            wrap='wrap'
                            gap='sm'
                          >
                            <Group
                              gap='sm'
                              align='flex-start'
                              style={{ flex: 1, minWidth: 0 }}
                            >
                              <Badge
                                size='sm'
                                variant='filled'
                                color='cyan'
                                radius='sm'
                                data-testid='quiz-sno-badge'
                                style={{
                                  flexShrink: 0,
                                  fontWeight: 700,
                                  alignSelf: 'center'
                                }}
                              >
                                {sNo}
                              </Badge>

                              <ThemeIcon
                                size={28}
                                radius='sm'
                                variant='light'
                                color='cyan'
                                style={{
                                  flexShrink: 0,
                                  marginTop: 2,
                                  alignSelf: 'center'
                                }}
                              >
                                <IconListCheck size={16} />
                              </ThemeIcon>

                              <Box style={{ flex: 1, minWidth: 0 }}>
                                <Group gap='xs' align='center' wrap='wrap'>
                                  <Text
                                    fw={600}
                                    size='sm'
                                    style={{
                                      color: themeConfig.color,
                                      overflowWrap: 'anywhere',
                                      minWidth: 0
                                    }}
                                  >
                                    {quiz.taskName}
                                  </Text>

                                  <Badge
                                    size='xs'
                                    variant='light'
                                    color={isQuizActive ? 'teal' : 'orange'}
                                    style={{ flexShrink: 0 }}
                                  >
                                    {quiz.status}
                                  </Badge>
                                </Group>

                                {quiz.taskDescription && (
                                  <Text
                                    size='xs'
                                    c='dimmed'
                                    mt={4}
                                    style={{
                                      whiteSpace: 'normal',
                                      overflowWrap: 'anywhere',
                                      wordBreak: 'normal'
                                    }}
                                  >
                                    {quiz.taskDescription
                                      .replace(/<[^>]*>/g, '')
                                      .replace(/&nbsp;/g, ' ')
                                      .trim()}
                                  </Text>
                                )}
                              </Box>
                            </Group>

                            {/* Actions */}
                            <Group gap='xs' wrap='nowrap'>
                              <CommonButton
                                variant='light'
                                color='cyan'
                                size='xs'
                                leftSection={<IconListCheck size={14} />}
                                onClick={() => onSelectQuiz(quiz)}
                              >
                                Manage Questions
                              </CommonButton>
                              <Tooltip label='Simulate Quiz' withArrow>
                                <ActionIcon
                                  variant='subtle'
                                  color='indigo'
                                  size='md'
                                  radius='sm'
                                  onClick={() => onSimulateQuiz(quiz)}
                                  aria-label={`Simulate ${quiz.taskName}`}
                                >
                                  <IconPlayerPlay size={16} />
                                </ActionIcon>
                              </Tooltip>
                            </Group>
                          </Group>
                        </Card>
                      );
                    })}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default QuizCurriculumView;
