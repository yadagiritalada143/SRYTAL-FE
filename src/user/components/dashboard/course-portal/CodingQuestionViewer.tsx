import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Badge,
  Box,
  Card,
  Divider,
  Group,
  Kbd,
  Select,
  Stack,
  Text,
  Textarea
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconAlertCircle, IconPlayerPlay, IconSend } from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import { useGetCodingQuestion } from '@hooks/queries/useUserQueries';
import { useRunCode, useSubmitCode } from '@hooks/mutations/useUserMutations';
import { CommonButton } from '@components/common/button/CommonButton';
import {
  AssignedTask,
  CodeRunResult,
  CodeRunTestCaseResult
} from '@interfaces/course-assignment';

interface CodingQuestionViewerProps {
  task: AssignedTask;
  /** Called after a successful submission (used to mark the task complete). */
  onSubmitted?: () => void;
}

const MONO_FONT =
  "'Fira Code', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace";

const isSameLanguage = (a: string, b: string) =>
  a.trim().toLowerCase() === b.trim().toLowerCase();

/**
 * LeetCode-style problem pane: the statement and any authored description on the
 * left, with a full code editor and test-run results on the right.
 */
const CodingQuestionViewer = ({
  task,
  onSubmitted
}: CodingQuestionViewerProps) => {
  const { themeConfig } = useAppTheme();
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const [result, setResult] = useState<CodeRunResult | null>(null);
  const [runError, setRunError] = useState<string | null>(null);
  const seededLanguage = useRef<string | null>(null);

  const questionQuery = useGetCodingQuestion(task._id, language);
  const { mutateAsync: runCodeMutation, isPending: isRunning } = useRunCode();
  const { mutateAsync: submitCodeMutation, isPending: isSubmitting } =
    useSubmitCode();

  // The starter code always comes from the backend for the selected language,
  // unless the employee already submitted a final answer in that language — then
  // that submitted code is seeded instead. On first load (no explicit language
  // yet) adopt the backend's default language and seed it. Each language is
  // seeded exactly once, so later refetches never clobber what the learner is
  // typing.
  useEffect(() => {
    const data = questionQuery.data;
    if (!data) return;

    const options = Array.from(new Set(data.allowedLanguages || []));

    if (!language) {
      const defaultLanguage = options[0] || '';
      setLanguage(defaultLanguage);
      if (seededLanguage.current !== defaultLanguage) {
        seededLanguage.current = defaultLanguage;
        setCode(data.lastSubmittedCode?.code || data.starterCode || '');
      }
      return;
    }

    if (
      data.language &&
      isSameLanguage(data.language, language) &&
      seededLanguage.current !== language
    ) {
      seededLanguage.current = language;
      setCode(data.lastSubmittedCode?.code || data.starterCode || '');
    }
    // language is intentionally in the deps: switching it drives the refetch.
  }, [questionQuery.data, language]);

  const handleLanguageChange = (next: string | null) => {
    if (!next || next === language) return;
    setResult(null);
    setRunError(null);
    setLanguage(next);
  };

  const handleRun = async () => {
    setRunError(null);
    try {
      const executionResult = await runCodeMutation({
        questionId: task._id,
        language,
        code
      });
      setResult(executionResult);
    } catch (error) {
      setResult(null);
      const message = getErrorMessage(
        error,
        'Something went wrong while running your code.'
      );
      setRunError(message);
      showErrorToast(message);
    }
  };

  const handleSubmit = async () => {
    setRunError(null);
    try {
      const submission = await submitCodeMutation({
        questionId: task._id,
        language,
        code
      });
      setResult(submission.result);
      showSuccessToast(submission.message || 'Code submitted successfully');
      onSubmitted?.();
    } catch (error) {
      setResult(null);
      const message = getErrorMessage(
        error,
        'Something went wrong while submitting your code.'
      );
      setRunError(message);
      showErrorToast(message);
    }
  };

  const languages = Array.from(
    new Set(questionQuery.data?.allowedLanguages || [])
  );

  return (
    <Group align='flex-start' gap='md' wrap={isMobile ? 'wrap' : 'nowrap'}>
      {/* Problem statement — stays pinned while the editor scrolls */}
      <Box
        style={{
          flex: 1,
          minWidth: 0,
          width: isMobile ? '100%' : undefined,
          position: isMobile ? undefined : 'sticky',
          top: isMobile ? undefined : 80,
          alignSelf: 'flex-start',
          maxHeight: isMobile ? undefined : 'calc(100vh - 80px)',
          overflowY: isMobile ? undefined : 'auto'
        }}
      >
        <Card withBorder radius='lg' p={{ base: 'md', sm: 'lg' }}>
          <Stack gap='sm'>
            <Group gap='xs'>
              <Text fw={700}>Problem statement</Text>
              <Badge variant='light' color='blue'>
                Coding
              </Badge>
            </Group>
            <Divider />

            {questionQuery.isLoading && (
              <Text size='sm' c={themeConfig.mutedTextColor}>
                Loading question…
              </Text>
            )}
            {questionQuery.isError && (
              <Alert color='red' icon={<IconAlertCircle size={18} />}>
                <Text size='sm'>{getErrorMessage(questionQuery.error)}</Text>
                <CommonButton
                  mt='xs'
                  size='xs'
                  variant='light'
                  onClick={() => questionQuery.refetch()}
                >
                  Try again
                </CommonButton>
              </Alert>
            )}
            {questionQuery.data && (
              <Box>
                <Text
                  size='md'
                  style={{ whiteSpace: 'pre-wrap' }}
                  c={themeConfig.color}
                  lh={1.7}
                >
                  {questionQuery.data.question ||
                    task.taskDescription ||
                    'Solve the problem below.'}
                </Text>
                {task.taskDescription &&
                  questionQuery.data.question !== task.taskDescription && (
                    <>
                      <Divider my='sm' />
                      <Box
                        style={{
                          color: themeConfig.color,
                          fontSize: 14,
                          lineHeight: 1.6
                        }}
                        dangerouslySetInnerHTML={{
                          __html: task.taskDescription
                        }}
                      />
                    </>
                  )}
              </Box>
            )}
          </Stack>
        </Card>
      </Box>

      {/* Editor + run results — the only scrollable region on desktop */}
      <Box
        style={{
          flex: 1.4,
          minWidth: 0,
          width: isMobile ? '100%' : undefined,
          alignSelf: 'flex-start',
          maxHeight: isMobile ? undefined : 'calc(100vh - 80px)',
          overflowY: isMobile ? undefined : 'auto'
        }}
      >
        <Stack gap='md'>
          <Card withBorder radius='lg' p='lg'>
            <Stack gap='sm'>
              <Group justify='flex-end' align='flex-end' wrap='wrap' gap='sm'>
                <Select
                  label='Language'
                  placeholder='Pick a language'
                  data={languages}
                  value={language || null}
                  onChange={handleLanguageChange}
                  allowDeselect={false}
                  style={{ minWidth: 180, maxWidth: 260 }}
                />
              </Group>

              <Textarea
                value={code}
                onChange={event => setCode(event.currentTarget.value)}
                autosize
                minRows={isMobile ? 26 : 16}
                maxRows={isMobile ? 34 : 50}
                spellCheck={false}
                aria-label='Code editor'
                styles={{
                  input: {
                    fontFamily: MONO_FONT,
                    fontSize: 13,
                    lineHeight: 1.6,
                    whiteSpace: 'pre'
                  }
                }}
              />

              <Group gap={8}>
                <Kbd>Ctrl</Kbd>+<Kbd>Enter</Kbd>
                <Text size='xs' c={themeConfig.mutedTextColor}>
                  to run your code
                </Text>
              </Group>
            </Stack>
          </Card>

          {runError && (
            <Alert color='red' icon={<IconAlertCircle size={18} />}>
              <Text size='sm' style={{ whiteSpace: 'pre-wrap' }}>
                {runError}
              </Text>
            </Alert>
          )}

          {result && <RunResults result={result} themeConfig={themeConfig} />}

          <Group gap='xs' justify='flex-end' wrap='wrap'>
            <CommonButton
              leftSection={<IconPlayerPlay size={16} />}
              onClick={handleRun}
              loading={isRunning}
              disabled={isRunning || isSubmitting || !language}
            >
              Run code
            </CommonButton>
            <CommonButton
              leftSection={<IconSend size={16} />}
              onClick={handleSubmit}
              loading={isSubmitting}
              disabled={isSubmitting || isRunning || !language}
            >
              Submit code
            </CommonButton>
          </Group>
        </Stack>
      </Box>
    </Group>
  );
};

interface RunResultsProps {
  result: CodeRunResult;
  themeConfig: {
    color: string;
    borderColor: string;
    mutedTextColor: string;
    cardBackground: string;
  };
}

const RunResults = ({ result, themeConfig }: RunResultsProps) => {
  const allPassed = result.passedTestCases === result.totalTestCases;
  const badgeColor = allPassed ? 'green' : 'orange';

  const renderFailureDetail = (test: CodeRunTestCaseResult) => {
    if (test.compilationError) {
      return (
        <Alert color='red' radius='md' py='xs' title='Compilation error'>
          <Text
            size='sm'
            style={{ whiteSpace: 'pre-wrap', fontFamily: MONO_FONT }}
          >
            {test.compilationError}
          </Text>
        </Alert>
      );
    }
    if (test.runtimeError) {
      return (
        <Alert color='red' radius='md' py='xs' title='Runtime error'>
          <Text
            size='sm'
            style={{ whiteSpace: 'pre-wrap', fontFamily: MONO_FONT }}
          >
            {test.runtimeError}
          </Text>
        </Alert>
      );
    }
    return null;
  };

  return (
    <Card withBorder radius='lg' p='lg'>
      <Stack gap='md'>
        <Group gap='xs'>
          <Badge variant='light' color={badgeColor}>
            {result.passedTestCases} / {result.totalTestCases} tests passed
          </Badge>
          <Badge variant='light' color='blue'>
            Score: {result.score}/100
          </Badge>
        </Group>

        {result.results.length === 0 && (
          <Text size='sm' c={themeConfig.mutedTextColor}>
            We could not evaluate any test cases.
          </Text>
        )}

        <Stack gap='sm'>
          {result.results.map((test, index) => (
            <Box
              key={`${test.name}-${index}`}
              p='sm'
              style={{
                borderRadius: 8,
                border: `1px solid ${themeConfig.borderColor}`,
                backgroundColor: themeConfig.cardBackground
              }}
            >
              <Group justify='space-between'>
                <Text size='sm' fw={600}>
                  {test.name || `Test case ${index + 1}`}
                </Text>
                {test.isSample && (
                  <Badge variant='dot' color='blue' size='xs'>
                    Sample
                  </Badge>
                )}
                <Badge
                  variant='light'
                  color={test.passed ? 'green' : 'red'}
                  size='sm'
                >
                  {test.passed ? 'Passed' : 'Failed'}
                </Badge>
              </Group>

              <Group gap='md' grow mt={8} align='flex-start'>
                <Box>
                  <Text size='xs' c={themeConfig.mutedTextColor} mb={4}>
                    Input
                  </Text>
                  <Text
                    size='xs'
                    style={{ whiteSpace: 'pre-wrap', fontFamily: MONO_FONT }}
                  >
                    {test.input || '(none)'}
                  </Text>
                </Box>
                <Box>
                  <Text size='xs' c={themeConfig.mutedTextColor} mb={4}>
                    Expected
                  </Text>
                  <Text
                    size='xs'
                    style={{ whiteSpace: 'pre-wrap', fontFamily: MONO_FONT }}
                  >
                    {test.expectedOutput}
                  </Text>
                </Box>
                <Box>
                  <Text size='xs' c={themeConfig.mutedTextColor} mb={4}>
                    Actual
                  </Text>
                  <Text
                    size='xs'
                    c={test.passed ? undefined : 'red'}
                    style={{ whiteSpace: 'pre-wrap', fontFamily: MONO_FONT }}
                  >
                    {test.actualOutput}
                  </Text>
                </Box>
              </Group>

              {renderFailureDetail(test)}
            </Box>
          ))}
        </Stack>

        {result.aiEvaluation && (
          <Box
            p='md'
            style={{
              borderRadius: 8,
              border: `1px solid ${themeConfig.borderColor}`,
              backgroundColor: themeConfig.cardBackground
            }}
          >
            <Group gap='xs' mb='xs'>
              <Text size='sm' fw={600}>
                AI code quality
              </Text>
              <Badge variant='light' color='grape'>
                {result.aiEvaluation.score}/100
              </Badge>
            </Group>

            {result.aiEvaluation.explanation && (
              <Text
                size='sm'
                mb='sm'
                style={{ whiteSpace: 'pre-wrap' }}
                c={themeConfig.color}
              >
                {result.aiEvaluation.explanation}
              </Text>
            )}

            {result.aiEvaluation.codingStandards && (
              <Group gap='sm' mb='sm' align='flex-start'>
                {Object.entries(result.aiEvaluation.codingStandards).map(
                  ([key, value]) => (
                    <Box key={key} style={{ flex: 1, minWidth: 120 }}>
                      <Text
                        size='xs'
                        fw={600}
                        tt='capitalize'
                        c={themeConfig.mutedTextColor}
                      >
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Text>
                      <Text size='sm'>{value}</Text>
                    </Box>
                  )
                )}
              </Group>
            )}

            {result.aiEvaluation.suggestions &&
              result.aiEvaluation.suggestions.length > 0 && (
                <Stack gap={4}>
                  <Text size='xs' fw={600} c={themeConfig.mutedTextColor}>
                    Suggestions
                  </Text>
                  {result.aiEvaluation.suggestions.map((suggestion, index) => (
                    <Text key={index} size='sm'>
                      • {suggestion}
                    </Text>
                  ))}
                </Stack>
              )}
          </Box>
        )}
      </Stack>
    </Card>
  );
};

export default CodingQuestionViewer;
