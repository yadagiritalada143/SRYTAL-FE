import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Group, Stack, Text, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { CommonButton } from '@components/common/button/CommonButton';
import { useAppTheme } from '@hooks/use-app-theme';
import { commonUrls } from '@utils/common/constants';
import { QuizQuestion } from '@interfaces/quiz';
import QuizBuilder from './QuizBuilder';
import {
  readTaskDraft,
  saveTaskDraft,
  saveTaskPopupState
} from './task-popup-state';

const QuizQuestionsPage = () => {
  const { organization = '' } = useParams();
  const navigate = useNavigate();
  const { themeConfig } = useAppTheme();

  const [draft] = useState(() => readTaskDraft());
  const [questions, setQuestions] = useState<QuizQuestion[]>(
    () => draft?.quizQuestions ?? []
  );

  const handleBack = () => {
    if (draft) {
      saveTaskDraft({ ...draft, quizQuestions: questions });
      saveTaskPopupState({
        courseId: draft.courseId,
        moduleId: draft.moduleId
      });
      navigate(
        `${commonUrls(organization)}/dashboard/course/${draft.courseId}`
      );
      return;
    }
    navigate(-1);
  };

  return (
    <Container size='md' py='lg'>
      <Stack gap='lg'>
        <Group gap='sm'>
          <CommonButton
            variant='default'
            leftSection={<IconArrowLeft size={16} />}
            onClick={handleBack}
          >
            Back
          </CommonButton>
          <Title order={3} style={{ color: themeConfig.color }}>
            Quiz Questions
          </Title>
        </Group>

        <Text size='sm' c='dimmed'>
          Add questions, choose how learners answer, mark the correct answers
          and save each question.
        </Text>

        <QuizBuilder value={questions} onChange={setQuestions} />
      </Stack>
    </Container>
  );
};

export default QuizQuestionsPage;
