import React from 'react';
import {
  Table,
  ScrollArea,
  Badge,
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
  IconPlayerPlay
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { CommonButton } from '@components/common/button/CommonButton';
import { CourseQuizItem } from '@interfaces/quiz';

export interface QuizTableViewProps {
  quizzes: CourseQuizItem[];
  onSelectQuiz: (quiz: CourseQuizItem) => void;
  onSimulateQuiz: (quiz: CourseQuizItem) => void;
  activePage: number;
  itemsPerPage: number;
}

export const QuizTableView: React.FC<QuizTableViewProps> = ({
  quizzes,
  onSelectQuiz,
  onSimulateQuiz,
  activePage,
  itemsPerPage
}) => {
  const { themeConfig, isDarkTheme } = useAppTheme();

  return (
    <ScrollArea>
      <Table
        withTableBorder
        withColumnBorders
        highlightOnHover
        verticalSpacing='sm'
        style={{ minWidth: 700 }}
      >
        <Table.Thead
          style={{
            backgroundColor: isDarkTheme
              ? 'rgba(255, 255, 255, 0.04)'
              : 'rgba(0, 0, 0, 0.02)'
          }}
        >
          <Table.Tr>
            <Table.Th style={{ width: 60, textAlign: 'center' }}>S.No</Table.Th>
            <Table.Th style={{ minWidth: 200 }}>Quiz Title</Table.Th>
            <Table.Th style={{ minWidth: 170 }}>Course</Table.Th>
            <Table.Th style={{ minWidth: 150 }}>Module</Table.Th>
            <Table.Th style={{ width: 100, textAlign: 'center' }}>
              Status
            </Table.Th>
            <Table.Th style={{ width: 180, textAlign: 'right' }}>
              Actions
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {quizzes.map((quiz, index) => {
            const sNo = (activePage - 1) * itemsPerPage + index + 1;
            const isQuizActive = (quiz.status || '').toUpperCase() === 'ACTIVE';

            return (
              <Table.Tr key={quiz.taskId}>
                {/* S.No */}
                <Table.Td
                  style={{
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    color: 'var(--mantine-color-dimmed)'
                  }}
                >
                  {sNo}
                </Table.Td>

                {/* Quiz Title */}
                <Table.Td>
                  <Group gap='xs' wrap='nowrap'>
                    <ThemeIcon
                      size={28}
                      radius='sm'
                      variant='light'
                      color='cyan'
                      style={{ flexShrink: 0 }}
                    >
                      <IconListCheck size={16} />
                    </ThemeIcon>
                    <Stack gap={2} style={{ minWidth: 0 }}>
                      <Text
                        fw={600}
                        size='sm'
                        lineClamp={1}
                        style={{ color: themeConfig.color }}
                      >
                        {quiz.taskName}
                      </Text>
                      {quiz.taskDescription && (
                        <Text size='xs' c='dimmed' lineClamp={1}>
                          {quiz.taskDescription
                            .replace(/<[^>]*>/g, '')
                            .replace(/&nbsp;/g, ' ')
                            .trim()}
                        </Text>
                      )}
                    </Stack>
                  </Group>
                </Table.Td>

                {/* Course */}
                <Table.Td>
                  <Group gap='xs' wrap='nowrap'>
                    <ThemeIcon
                      size={22}
                      radius='sm'
                      variant='light'
                      color='indigo'
                      style={{ flexShrink: 0 }}
                    >
                      <IconBook size={13} />
                    </ThemeIcon>
                    <Text size='xs' fw={600} lineClamp={1}>
                      {quiz.courseName}
                    </Text>
                  </Group>
                </Table.Td>

                {/* Module */}
                <Table.Td>
                  <Group gap='xs' wrap='nowrap'>
                    <ThemeIcon
                      size={22}
                      radius='sm'
                      variant='subtle'
                      color='gray'
                      style={{ flexShrink: 0 }}
                    >
                      <IconLayersSubtract size={13} />
                    </ThemeIcon>
                    <Text size='xs' c='dimmed' lineClamp={1}>
                      {quiz.moduleName}
                    </Text>
                  </Group>
                </Table.Td>

                {/* Status */}
                <Table.Td style={{ textAlign: 'center' }}>
                  <Badge
                    size='xs'
                    variant='light'
                    color={isQuizActive ? 'teal' : 'orange'}
                  >
                    {quiz.status}
                  </Badge>
                </Table.Td>

                {/* Actions */}
                <Table.Td style={{ textAlign: 'right' }}>
                  <Group justify='flex-end' gap='xs' wrap='nowrap'>
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
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default QuizTableView;
