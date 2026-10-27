import { useState } from 'react';
import {
  Badge,
  Card,
  Checkbox,
  Group,
  Paper,
  Progress,
  Radio,
  Select,
  Stack,
  Text,
  Textarea,
  ThemeIcon
} from '@mantine/core';
import {
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconRefresh,
  IconTrophy
} from '@tabler/icons-react';
import { CommonButton } from '@components/common/button/CommonButton';
import { useAppTheme } from '@hooks/use-app-theme';
import {
  QuizQuestion,
  isMultiAnswerType,
  isTextAnswerType
} from '@interfaces/quiz';

interface QuizPlayerPreviewProps {
  questions: QuizQuestion[];
}

const QuizPlayerPreview = ({ questions }: QuizPlayerPreviewProps) => {
  const { themeConfig } = useAppTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <Paper p='lg' radius='md' withBorder style={{ textAlign: 'center' }}>
        <Text size='sm' c='dimmed'>
          No questions available to preview.
        </Text>
      </Paper>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const isFirst = currentIndex === 0;

  const currentAnswer =
    answers[currentQuestion.id] ??
    (isMultiAnswerType(currentQuestion.type) ? [] : '');

  const handleSelectOption = (optionId: string) => {
    if (isMultiAnswerType(currentQuestion.type)) {
      const selected = Array.isArray(currentAnswer) ? currentAnswer : [];
      const updated = selected.includes(optionId)
        ? selected.filter(id => id !== optionId)
        : [...selected, optionId];
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: updated }));
    } else {
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
    }
  };

  const handleTextChange = (text: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: text }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach(q => {
      const ans = answers[q.id];
      if (isTextAnswerType(q.type)) {
        if (typeof ans === 'string' && ans.trim().length > 0) {
          correctCount++;
        }
      } else if (isMultiAnswerType(q.type)) {
        const correctIds = q.options.filter(o => o.isCorrect).map(o => o.id);
        const userIds = Array.isArray(ans) ? ans : [];
        if (
          correctIds.length === userIds.length &&
          correctIds.every(id => userIds.includes(id))
        ) {
          correctCount++;
        }
      } else {
        const correctOption = q.options.find(o => o.isCorrect);
        if (correctOption && ans === correctOption.id) {
          correctCount++;
        }
      }
    });
    return correctCount;
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    const score = calculateScore();
    const percent = Math.round((score / questions.length) * 100);
    const isPassing = percent >= 70;

    return (
      <Card
        p='xl'
        radius='md'
        withBorder
        style={{
          borderColor: themeConfig.borderColor,
          backgroundColor: themeConfig.cardBackground
        }}
      >
        <Stack align='center' gap='md'>
          <ThemeIcon
            size={64}
            radius='xl'
            variant='light'
            color={isPassing ? 'teal' : 'orange'}
          >
            <IconTrophy size={34} />
          </ThemeIcon>

          <Stack align='center' gap={2}>
            <Text fw={800} size='xl' style={{ color: themeConfig.color }}>
              Simulation Complete!
            </Text>
            <Text size='sm' c='dimmed'>
              Here is how a learner would be evaluated based on the answer keys.
            </Text>
          </Stack>

          <Paper
            p='md'
            radius='md'
            withBorder
            w='100%'
            maw={400}
            style={{ textAlign: 'center' }}
          >
            <Group justify='space-around'>
              <Stack gap={2}>
                <Text size='xs' c='dimmed' fw={600} tt='uppercase'>
                  Score
                </Text>
                <Text size='lg' fw={800} c={isPassing ? 'teal' : 'orange'}>
                  {score} / {questions.length}
                </Text>
              </Stack>
              <Stack gap={2}>
                <Text size='xs' c='dimmed' fw={600} tt='uppercase'>
                  Accuracy
                </Text>
                <Text size='lg' fw={800} c={isPassing ? 'teal' : 'orange'}>
                  {percent}%
                </Text>
              </Stack>
            </Group>
          </Paper>

          <CommonButton
            leftSection={<IconRefresh size={14} />}
            onClick={handleReset}
          >
            Run simulation again
          </CommonButton>
        </Stack>
      </Card>
    );
  }

  const answeredCount = Object.keys(answers).filter(k => {
    const val = answers[k];
    return Array.isArray(val) ? val.length > 0 : Boolean(String(val).trim());
  }).length;
  const progressPercent = Math.round(
    ((currentIndex + 1) / questions.length) * 100
  );

  return (
    <Card
      p='lg'
      radius='md'
      withBorder
      style={{
        borderColor: themeConfig.borderColor,
        backgroundColor: themeConfig.cardBackground
      }}
    >
      <Stack gap='md'>
        {/* Top Progress Bar */}
        <Stack gap={4}>
          <Group justify='space-between' align='center'>
            <Badge variant='light' color='indigo' size='sm'>
              Question {currentIndex + 1} of {questions.length}
            </Badge>
            <Text size='xs' c='dimmed'>
              {answeredCount} of {questions.length} answered
            </Text>
          </Group>
          <Progress
            value={progressPercent}
            size='sm'
            radius='xl'
            color='indigo'
          />
        </Stack>

        <Paper
          p='md'
          radius='md'
          withBorder
          style={{
            borderColor: themeConfig.borderColor,
            backgroundColor: 'rgba(99, 102, 241, 0.02)'
          }}
        >
          <Text fw={700} size='md' mb='sm' style={{ color: themeConfig.color }}>
            {currentQuestion.question}
          </Text>

          {isTextAnswerType(currentQuestion.type) ? (
            <Textarea
              placeholder='Type your response here...'
              value={(currentAnswer as string) || ''}
              onChange={e => handleTextChange(e.currentTarget.value)}
              minRows={3}
              radius='md'
            />
          ) : currentQuestion.type === 'DROPDOWN' ? (
            <Select
              placeholder='Choose option...'
              data={currentQuestion.options.map(o => ({
                value: o.id,
                label: o.text
              }))}
              value={(currentAnswer as string) || null}
              onChange={val => val && handleSelectOption(val)}
              radius='md'
            />
          ) : currentQuestion.type === 'TOGGLE' ? (
            <Group grow>
              {currentQuestion.options.map(opt => {
                const isSelected = currentAnswer === opt.id;
                return (
                  <Paper
                    key={opt.id}
                    p='sm'
                    radius='md'
                    withBorder
                    onClick={() => handleSelectOption(opt.id)}
                    style={{
                      cursor: 'pointer',
                      textAlign: 'center',
                      borderColor: isSelected
                        ? 'var(--mantine-color-indigo-6)'
                        : themeConfig.borderColor,
                      backgroundColor: isSelected
                        ? 'rgba(99, 102, 241, 0.1)'
                        : 'transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Text fw={isSelected ? 700 : 500} size='sm'>
                      {opt.text}
                    </Text>
                  </Paper>
                );
              })}
            </Group>
          ) : isMultiAnswerType(currentQuestion.type) ? (
            <Stack gap='xs'>
              {currentQuestion.options.map(opt => {
                const isSelected =
                  Array.isArray(currentAnswer) &&
                  currentAnswer.includes(opt.id);
                return (
                  <Paper
                    key={opt.id}
                    p='sm'
                    radius='md'
                    withBorder
                    onClick={() => handleSelectOption(opt.id)}
                    style={{
                      cursor: 'pointer',
                      borderColor: isSelected
                        ? 'var(--mantine-color-indigo-6)'
                        : themeConfig.borderColor,
                      backgroundColor: isSelected
                        ? 'rgba(99, 102, 241, 0.08)'
                        : 'transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Checkbox
                      checked={isSelected}
                      label={opt.text}
                      readOnly
                      styles={{ label: { cursor: 'pointer' } }}
                    />
                  </Paper>
                );
              })}
            </Stack>
          ) : (
            <Radio.Group
              value={(currentAnswer as string) || ''}
              onChange={val => handleSelectOption(val)}
            >
              <Stack gap='xs'>
                {currentQuestion.options.map(opt => {
                  const isSelected = currentAnswer === opt.id;
                  return (
                    <Paper
                      key={opt.id}
                      p='sm'
                      radius='md'
                      withBorder
                      onClick={() => handleSelectOption(opt.id)}
                      style={{
                        cursor: 'pointer',
                        borderColor: isSelected
                          ? 'var(--mantine-color-indigo-6)'
                          : themeConfig.borderColor,
                        backgroundColor: isSelected
                          ? 'rgba(99, 102, 241, 0.08)'
                          : 'transparent',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Radio
                        value={opt.id}
                        label={opt.text}
                        readOnly
                        styles={{ label: { cursor: 'pointer' } }}
                      />
                    </Paper>
                  );
                })}
              </Stack>
            </Radio.Group>
          )}
        </Paper>

        {/* Navigation Buttons */}
        <Group justify='space-between' align='center'>
          <CommonButton
            variant='default'
            size='xs'
            leftSection={<IconChevronLeft size={14} />}
            disabled={isFirst}
            onClick={() => setCurrentIndex(prev => prev - 1)}
          >
            Previous
          </CommonButton>

          {isLast ? (
            <CommonButton
              size='xs'
              color='teal'
              leftSection={<IconCheck size={14} />}
              onClick={() => setIsSubmitted(true)}
            >
              Submit & Grade
            </CommonButton>
          ) : (
            <CommonButton
              size='xs'
              rightSection={<IconChevronRight size={14} />}
              onClick={() => setCurrentIndex(prev => prev + 1)}
            >
              Next
            </CommonButton>
          )}
        </Group>
      </Stack>
    </Card>
  );
};

export default QuizPlayerPreview;
