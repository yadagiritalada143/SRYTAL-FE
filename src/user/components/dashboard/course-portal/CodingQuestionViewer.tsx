import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Badge,
  Box,
  Card,
  Group,
  Stack,
  Text,
  Textarea
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconAlertCircle,
  IconChevronDown,
  IconCode,
  IconPlayerPlay,
  IconSend,
  IconSquareCheck
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import {
  useGetCodingQuestion,
  useGetProgrammingLanguages
} from '@hooks/queries/useUserQueries';
import { useRunCode, useSubmitCode } from '@hooks/mutations/useUserMutations';
import { CommonButton } from '@components/common/button/CommonButton';
import {
  AssignedTask,
  CodeRunResult,
  CodeRunTestCaseResult,
  CodingLanguage
} from '@interfaces/course-assignment';

interface CodingQuestionViewerProps {
  task: AssignedTask;
  questionId: string | null;
  questionCount?: number;
  activeQuestionIndex?: number;
  onSelectQuestion?: (index: number) => void;
  onSubmitted?: () => void;
}

const MONO_FONT =
  "'Fira Code', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace";

const TAB_SIZE = 4;

const handleEditorKeyDown = (
  event: React.KeyboardEvent<HTMLTextAreaElement>,
  value: string,
  onChange: (value: string) => void
) => {
  if (event.key !== 'Tab') return;

  event.preventDefault();

  const target = event.currentTarget;
  const { selectionStart, selectionEnd } = target;
  const before = value.slice(0, selectionStart);
  const after = value.slice(selectionEnd);

  if (event.shiftKey) {
    const removed = /[ \t]{1,4}$/.exec(before)?.[0].length ?? 0;
    const caret = before.length - removed;
    onChange(`${before.slice(0, caret)}${after}`);
    requestAnimationFrame(() => {
      target.selectionStart = caret;
      target.selectionEnd = caret;
    });
    return;
  }

  const spaces = ' '.repeat(TAB_SIZE);
  const caret = selectionStart + spaces.length;
  onChange(`${before}${spaces}${after}`);
  requestAnimationFrame(() => {
    target.selectionStart = caret;
    target.selectionEnd = caret;
  });
};

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun: () => void;
  minRows: number;
  maxRows: number;
}

const CodeEditor = ({
  value,
  onChange,
  onRun,
  minRows,
  maxRows
}: CodeEditorProps) => (
  <Textarea
    value={value}
    onChange={event => onChange(event.currentTarget.value)}
    onKeyDown={event => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        onRun();
        return;
      }
      handleEditorKeyDown(event, value, onChange);
    }}
    autosize
    minRows={minRows}
    maxRows={maxRows}
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
);

interface TabButtonProps {
  label: string;
  icon?: React.ReactNode;
  active: boolean;
  themeConfig: { color: string; borderColor: string; warningColor: string };
  onClick: () => void;
}

const TabButton = ({
  label,
  icon,
  active,
  themeConfig,
  onClick
}: TabButtonProps) => (
  <Box
    component='button'
    type='button'
    onClick={onClick}
    style={{
      background: 'none',
      border: 'none',
      borderBottom: active ? `2px solid ${themeConfig.warningColor}` : 'none',
      color: active ? themeConfig.warningColor : themeConfig.color,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'inherit',
      fontSize: 14,
      fontWeight: active ? 700 : 500,
      padding: '6px 12px'
    }}
  >
    {icon}
    {label}
  </Box>
);

interface LanguagePickerProps {
  languages: CodingLanguage[];
  valueId: string;
  themeConfig: {
    color: string;
    borderColor: string;
    cardBackground: string;
    warningColor: string;
  };
  onChange: (languageId: string, languageName: string) => void;
}

const LanguagePicker = ({
  languages,
  valueId,
  themeConfig,
  onChange
}: LanguagePickerProps) => {
  const [open, setOpen] = useState(false);

  const selected = languages.find(language => language.languageId === valueId);

  const pick = (language: CodingLanguage) => {
    setOpen(false);
    onChange(language.languageId, language.languageName);
  };

  return (
    <Box style={{ position: 'relative' }}>
      <CommonButton
        variant='default'
        size='xs'
        aria-label='Language'
        leftSection={<IconCode size={14} />}
        rightSection={<IconChevronDown size={14} />}
        onClick={() => setOpen(openState => !openState)}
        disabled={languages.length === 0}
      >
        {selected?.languageName || 'Pick a language'}
      </CommonButton>

      {open && (
        <>
          <Box
            style={{ position: 'fixed', inset: 0, zIndex: 40 }}
            onClick={() => setOpen(false)}
          />
          <Box
            style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              right: 0,
              zIndex: 41,
              width: 340,
              maxHeight: 260,
              overflowY: 'auto',
              padding: 8,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 4,
              backgroundColor: themeConfig.cardBackground,
              border: `1px solid ${themeConfig.borderColor}`,
              borderRadius: 10,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
            }}
          >
            {languages.map(language => {
              const isSelected = language.languageId === valueId;
              return (
                <Box
                  key={language.languageId || language.languageName}
                  component='button'
                  type='button'
                  onClick={() => pick(language)}
                  aria-label={language.languageName}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    minWidth: 0,
                    padding: '6px 8px',
                    borderRadius: 6,
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 12,
                    fontWeight: isSelected ? 700 : 500,
                    textAlign: 'left',
                    color: isSelected
                      ? themeConfig.warningColor
                      : themeConfig.color
                  }}
                >
                  <IconCode
                    size={13}
                    style={{
                      flexShrink: 0,
                      color: isSelected ? themeConfig.warningColor : undefined
                    }}
                  />
                  <Text
                    size='xs'
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {language.languageName}
                  </Text>
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
};

const CodingQuestionViewer = ({
  task,
  questionId,
  questionCount = 1,
  activeQuestionIndex = 0,
  onSelectQuestion,
  onSubmitted
}: CodingQuestionViewerProps) => {
  const { themeConfig } = useAppTheme();
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [languageId, setLanguageId] = useState('');
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const [result, setResult] = useState<CodeRunResult | null>(null);
  const [runError, setRunError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'code' | 'testCases'>('code');
  const seededLanguage = useRef('');
  const seededSources = useRef<Record<string, string>>({});

  const languagesQuery = useGetProgrammingLanguages();
  const questionQuery = useGetCodingQuestion(
    task._id,
    questionId || '',
    languageId
  );
  const { mutateAsync: runCodeMutation, isPending: isRunning } = useRunCode();
  const { mutateAsync: submitCodeMutation, isPending: isSubmitting } =
    useSubmitCode();

  useEffect(() => {
    if (languageId) return;
    const first = (languagesQuery.data || [])[0];
    if (!first?.languageId) return;
    setLanguageId(first.languageId);
    setLanguage(first.languageName);
  }, [languagesQuery.data, languageId]);

  // The starter code always comes from the backend for the selected language,
  // unless the employee already submitted a final answer in that language — then
  // that submitted code is seeded instead. On first load (no explicit language
  // yet) adopt the backend's default language and seed it. A later background
  // refetch (e.g. after the query is invalidated on submit) may bring a
  // `lastSubmittedCode` that was saved after the first response, so the editor
  // is re-seeded whenever the server source changes while the learner has not
  // diverged from what was last seeded.
  useEffect(() => {
    const data = questionQuery.data;
    if (!data || !languageId) return;

    if (data.languageId && data.languageId !== languageId) return;

    const source = data.lastSubmittedCode?.code || data.starterCode || '';
    const previous = seededSources.current[languageId];

    if (
      seededLanguage.current !== languageId ||
      previous === undefined ||
      (code === previous && source !== previous)
    ) {
      seededLanguage.current = languageId;
      seededSources.current[languageId] = source;
      setCode(source);
    }
    // languageId and code are intentionally in the deps: switching the language
    // drives the refetch, and re-seeding must respect what the learner types.
  }, [questionQuery.data, languageId, code]);

  const handleLanguageChange = (nextLanguageId: string, nextName: string) => {
    if (!nextLanguageId || nextLanguageId === languageId) return;
    setResult(null);
    setRunError(null);
    setLanguageId(nextLanguageId);
    setLanguage(nextName);
  };

  const handleRun = async () => {
    setRunError(null);
    try {
      const executionResult = await runCodeMutation({
        taskId: task._id,
        questionId: questionId || '',
        language,
        code
      });
      setResult(executionResult);
      setActiveTab('testCases');
    } catch (error) {
      setResult(null);
      const message = getErrorMessage(
        error,
        'Something went wrong while running your code.'
      );
      setRunError(message);
      setActiveTab('testCases');
      showErrorToast(message);
    }
  };

  const handleSubmit = async () => {
    setRunError(null);
    try {
      const submission = await submitCodeMutation({
        taskId: task._id,
        questionId: questionId || '',
        language,
        code
      });
      setResult(submission.result);
      setActiveTab('testCases');
      showSuccessToast(submission.message || 'Code submitted successfully');
      onSubmitted?.();
    } catch (error) {
      setResult(null);
      const message = getErrorMessage(
        error,
        'Something went wrong while submitting your code.'
      );
      setRunError(message);
      setActiveTab('testCases');
      showErrorToast(message);
    }
  };

  const languages = questionQuery.data?.allowedLanguages?.length
    ? questionQuery.data.allowedLanguages
    : languagesQuery.data || [];

  if (!questionId) {
    return (
      <Card withBorder radius='lg' p='xl'>
        <Text ta='center' c={themeConfig.mutedTextColor}>
          This coding problem has no questions yet.
        </Text>
      </Card>
    );
  }

  return (
    <Group align='flex-start' gap='md' wrap={isMobile ? 'wrap' : 'nowrap'}>
      {/* Problem statement — stacks above the editor on mobile */}
      <Box
        style={{
          flex: isMobile ? '0 0 100%' : 1,
          minWidth: 0,
          width: isMobile ? '100%' : undefined,
          position: isMobile ? undefined : 'sticky',
          top: isMobile ? undefined : 80,
          alignSelf: 'flex-start',
          height: isMobile ? undefined : 'calc(100vh - 80px)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Card
          withBorder
          radius='lg'
          p={0}
          style={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          <Group
            gap='xs'
            align='center'
            px='md'
            py='xs'
            style={{
              borderBottom: `1px solid ${themeConfig.borderColor}`,
              backgroundColor: themeConfig.cardBackground
            }}
          >
            {questionCount > 1 ? (
              <Group gap={8} wrap='wrap' style={{ minWidth: 0 }}>
                {Array.from({ length: questionCount }, (_, index) => {
                  const isActive = index === activeQuestionIndex;
                  return (
                    <CommonButton
                      key={index}
                      size='xs'
                      r='sm'
                      aria-label={`Question ${index + 1}`}
                      aria-current={isActive}
                      onClick={() => onSelectQuestion?.(index)}
                      style={{
                        fontWeight: 600,
                        lineClamp: 1,
                        color: isActive ? '#ffffff' : themeConfig.warningColor,
                        backgroundColor: isActive
                          ? themeConfig.successColor
                          : 'transparent',
                        border: `1px solid ${
                          isActive
                            ? themeConfig.successColor
                            : themeConfig.warningColor
                        }`
                      }}
                    >
                      Question {index + 1}
                    </CommonButton>
                  );
                })}
              </Group>
            ) : (
              <>
                <IconCode size={16} color={themeConfig.warningColor} />
                <Text fw={700}>Problem statement</Text>
              </>
            )}
          </Group>

          <Box
            p={{ base: 'md', sm: 'lg' }}
            style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}
          >
            <Stack gap='sm'>
              {(languagesQuery.isPending || questionQuery.isPending) && (
                <Text size='sm' c={themeConfig.mutedTextColor}>
                  Loading question…
                </Text>
              )}
              {(languagesQuery.isError || questionQuery.isError) && (
                <Alert color='red' icon={<IconAlertCircle size={18} />}>
                  <Text size='sm'>
                    {getErrorMessage(
                      languagesQuery.error || questionQuery.error,
                      'We could not load this coding problem.'
                    )}
                  </Text>
                  <CommonButton
                    mt='xs'
                    size='xs'
                    variant='light'
                    onClick={() => {
                      languagesQuery.refetch();
                      questionQuery.refetch();
                    }}
                  >
                    Try again
                  </CommonButton>
                </Alert>
              )}
              {questionQuery.data && (
                <Stack gap='sm'>
                  <Text
                    size='md'
                    style={{ whiteSpace: 'pre-wrap' }}
                    c={themeConfig.color}
                    lh={1.7}
                  >
                    {questionQuery.data.question || 'Solve the problem below.'}
                  </Text>
                  {questionQuery.data.description?.trim() && (
                    <Text
                      size='sm'
                      style={{ whiteSpace: 'pre-wrap' }}
                      c={themeConfig.mutedTextColor}
                      lh={1.7}
                    >
                      {questionQuery.data.description}
                    </Text>
                  )}
                </Stack>
              )}
            </Stack>
          </Box>
        </Card>
      </Box>

      {/* Editor + run results — the only scrollable region on desktop */}
      <Box
        style={{
          flex: isMobile ? '0 0 100%' : 1.4,
          minWidth: 0,
          width: isMobile ? '100%' : undefined,
          alignSelf: 'flex-start',
          height: isMobile ? undefined : 'calc(100vh - 80px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <Group
          justify='flex-end'
          align='center'
          px='md'
          py='xs'
          style={{
            flexShrink: 0,
            borderBottom: `1px solid ${themeConfig.borderColor}`,
            backgroundColor: themeConfig.cardBackground
          }}
        >
          <LanguagePicker
            languages={languages}
            valueId={languageId}
            themeConfig={themeConfig}
            onChange={handleLanguageChange}
          />
        </Group>

        <Group
          gap={4}
          px='md'
          style={{
            flexShrink: 0,
            borderBottom: `1px solid ${themeConfig.borderColor}`,
            backgroundColor: themeConfig.cardBackground
          }}
        >
          <TabButton
            label='Code'
            icon={<IconCode size={14} />}
            active={activeTab === 'code'}
            themeConfig={themeConfig}
            onClick={() => setActiveTab('code')}
          />
          <TabButton
            label='Test cases'
            icon={<IconSquareCheck size={14} />}
            active={activeTab === 'testCases'}
            themeConfig={themeConfig}
            onClick={() => setActiveTab('testCases')}
          />
        </Group>

        <Box
          data-testid='content-panel'
          style={{
            flex: 1,
            minHeight: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {activeTab === 'code' && (
            <Box p='sm' style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
              <CodeEditor
                value={code}
                onChange={setCode}
                onRun={handleRun}
                minRows={isMobile ? 12 : 16}
                maxRows={isMobile ? 40 : 50}
              />
            </Box>
          )}

          {activeTab === 'testCases' && (
            <Box p='sm' style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
              {runError && (
                <Alert color='red' icon={<IconAlertCircle size={18} />}>
                  <Text size='sm' style={{ whiteSpace: 'pre-wrap' }}>
                    {runError}
                  </Text>
                </Alert>
              )}
              {result ? (
                <RunResults result={result} themeConfig={themeConfig} />
              ) : (
                !runError && (
                  <Text size='sm' c={themeConfig.mutedTextColor}>
                    Run the code to see test case results.
                  </Text>
                )
              )}
            </Box>
          )}
        </Box>

        <Group
          gap='xs'
          justify='flex-end'
          wrap='wrap'
          style={{ flexShrink: 0, padding: 'md' }}
        >
          <CommonButton
            leftSection={<IconPlayerPlay size={16} />}
            onClick={handleRun}
            loading={isRunning}
            disabled={isRunning || isSubmitting || !languageId}
          >
            Run code
          </CommonButton>
          <CommonButton
            leftSection={<IconSend size={16} />}
            onClick={handleSubmit}
            loading={isSubmitting}
            disabled={isSubmitting || isRunning || !languageId}
          >
            Submit code
          </CommonButton>
        </Group>
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
