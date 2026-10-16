import React, { useMemo } from 'react';
import { Modal, Center, Text, Stack, ThemeIcon, Group } from '@mantine/core';
import { IconPlayerPlay, IconListCheck } from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { useGetAllQuizQuestions } from '@hooks/queries/useUserQueries';
import { fromQuizQuestionApi } from './quiz-helpers';
import QuizPlayerPreview from './QuizPlayerPreview';
import { CourseQuizItem } from '@interfaces/quiz';

export interface QuickSimulationModalProps {
  quiz: CourseQuizItem | null;
  onClose: () => void;
}

export const QuickSimulationModal: React.FC<QuickSimulationModalProps> = ({
  quiz,
  onClose
}) => {
  const { themeConfig } = useAppTheme();
  const taskId = quiz?.taskId || '';
  const { data: apiQuestions = [], isLoading } = useGetAllQuizQuestions(
    taskId,
    Boolean(taskId)
  );

  const questions = useMemo(
    () => apiQuestions.map(fromQuizQuestionApi),
    [apiQuestions]
  );

  return (
    <Modal
      opened={Boolean(quiz)}
      onClose={onClose}
      title={
        <Group gap='xs'>
          <ThemeIcon size={26} radius='sm' variant='light' color='indigo'>
            <IconPlayerPlay size={14} />
          </ThemeIcon>
          <Text fw={700} size='sm'>
            Learner Simulation: {quiz?.taskName}
          </Text>
        </Group>
      }
      size='lg'
      centered
      radius='md'
      styles={{
        header: {
          backgroundColor: themeConfig.cardBackground,
          borderBottom: `1px solid ${themeConfig.borderColor}`
        },
        content: {
          backgroundColor: themeConfig.cardBackground,
          color: themeConfig.color
        }
      }}
    >
      {isLoading ? (
        <Center py='xl'>
          <Text size='sm' c='dimmed'>
            Loading simulation questions...
          </Text>
        </Center>
      ) : questions.length === 0 ? (
        <Center py='xl'>
          <Stack align='center' gap='xs'>
            <ThemeIcon size={40} radius='xl' variant='light' color='cyan'>
              <IconListCheck size={20} />
            </ThemeIcon>
            <Text size='sm' fw={600}>
              No questions added yet
            </Text>
            <Text size='xs' c='dimmed'>
              Add questions to this quiz in the builder before running
              simulations.
            </Text>
          </Stack>
        </Center>
      ) : (
        <QuizPlayerPreview questions={questions} />
      )}
    </Modal>
  );
};

export default QuickSimulationModal;
