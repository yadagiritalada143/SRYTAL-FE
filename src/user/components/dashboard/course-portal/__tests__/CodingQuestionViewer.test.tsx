import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import CodingQuestionViewer from '../CodingQuestionViewer';
import { AssignedTask } from '@interfaces/course-assignment';

const mockUseGetCodingQuestion = jest.fn();
jest.mock('@hooks/queries/useUserQueries', () => ({
  useGetCodingQuestion: (questionId: string, language: string) =>
    mockUseGetCodingQuestion(questionId, language)
}));

const mockRunCode = jest.fn();
const mockSubmitCode = jest.fn();
jest.mock('@hooks/mutations/useUserMutations', () => ({
  useRunCode: () => ({ mutateAsync: mockRunCode, isPending: false }),
  useSubmitCode: () => ({ mutateAsync: mockSubmitCode, isPending: false })
}));

const mockShowSuccessToast = jest.fn();
const mockShowErrorToast = jest.fn();
jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: mockShowSuccessToast,
    showErrorToast: mockShowErrorToast
  })
}));

jest.mock('@utils/common/get-error-message', () => ({
  getErrorMessage: (error: any, fallback: string) =>
    error?.response?.data?.message || error?.message || fallback
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      borderColor: '#dee2e6',
      mutedTextColor: '#868e96',
      cardBackground: '#ffffff'
    },
    isDarkTheme: false
  })
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, disabled, loading }: any) => (
    <button type='button' onClick={onClick} disabled={disabled}>
      {loading ? 'Running...' : children}
    </button>
  )
}));

jest.mock('@mantine/core', () => {
  const actual = jest.requireActual('@mantine/core');
  return {
    ...actual,
    Select: ({ label, value, onChange, data }: any) => (
      <select
        aria-label={label}
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
      >
        {data.map((d: any) => (
          <option
            key={typeof d === 'string' ? d : d.value}
            value={typeof d === 'string' ? d : d.value}
          >
            {typeof d === 'string' ? d : d.label}
          </option>
        ))}
      </select>
    )
  };
});

const makeTask = (overrides: any = {}): AssignedTask => ({
  _id: 't1',
  taskName: 'Two Sum',
  taskDescription: 'Sum two numbers',
  type: 'LINK',
  link: '',
  isCompleted: false,
  ...overrides
});

// Mirrors the backend response: `language` is the canonical runtime name
// (lowercased), while `allowedLanguages` holds the display names.
const starterFor = (language: string) => ({
  questionId: 't1',
  question: 'Write a function that sums two numbers.',
  allowedLanguages: ['Javascript', 'Python'],
  language:
    (language || '').toLowerCase() === 'python' ? 'python' : 'javascript',
  starterCode:
    (language || '').toLowerCase() === 'python'
      ? 'def solve():'
      : 'function solve() {}'
});

const simpleQueryResult = (language: string) => ({
  data: starterFor(language),
  isLoading: false,
  isError: false,
  error: null,
  refetch: jest.fn()
});

const renderViewer = (
  task: AssignedTask = makeTask(),
  onSubmitted?: () => void
) => {
  return render(
    <MantineProvider>
      <CodingQuestionViewer task={task} onSubmitted={onSubmitted} />
    </MantineProvider>
  );
};

describe('CodingQuestionViewer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGetCodingQuestion.mockImplementation(
      (_id: string, language: string) => simpleQueryResult(language)
    );
  });

  it('renders the statement, language list and default starter code', () => {
    renderViewer();

    expect(
      screen.getByText('Write a function that sums two numbers.')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Language')).toHaveValue('Javascript');
    const editor = screen.getByLabelText('Code editor') as HTMLTextAreaElement;
    expect(editor.value).toBe('function solve() {}');
  });

  it('switches starter code when another language is picked', async () => {
    renderViewer();

    fireEvent.change(screen.getByLabelText('Language'), {
      target: { value: 'Python' }
    });

    await waitFor(() => {
      expect(mockUseGetCodingQuestion).toHaveBeenCalledWith('t1', 'Python');
    });

    await waitFor(() => {
      const editor = screen.getByLabelText(
        'Code editor'
      ) as HTMLTextAreaElement;
      expect(editor.value).toBe('def solve():');
    });
  });

  it('seeds the editor with the submitted code when one exists', () => {
    mockUseGetCodingQuestion.mockImplementation(
      (_id: string, language: string) => ({
        ...simpleQueryResult(language),
        data: {
          ...starterFor(language),
          lastSubmittedCode: {
            language: 'javascript',
            code: 'function solve() { return 4; }'
          }
        }
      })
    );

    renderViewer();
    const editor = screen.getByLabelText('Code editor') as HTMLTextAreaElement;
    expect(editor.value).toBe('function solve() { return 4; }');
  });

  it('shows the starter when the picked language has no submission', async () => {
    mockUseGetCodingQuestion.mockImplementation(
      (_id: string, language: string) => ({
        ...simpleQueryResult(language),
        data: {
          ...starterFor(language),
          lastSubmittedCode:
            (language || '').toLowerCase() === 'python'
              ? null
              : {
                  language: 'javascript',
                  code: 'function solve() { return 7; }'
                }
        }
      })
    );

    renderViewer();
    expect(
      (screen.getByLabelText('Code editor') as HTMLTextAreaElement).value
    ).toBe('function solve() { return 7; }');

    fireEvent.change(screen.getByLabelText('Language'), {
      target: { value: 'Python' }
    });

    await waitFor(() => {
      const editor = screen.getByLabelText(
        'Code editor'
      ) as HTMLTextAreaElement;
      expect(editor.value).toBe('def solve():');
    });
  });

  it('runs the code and shows per-test results plus AI feedback', async () => {
    mockRunCode.mockResolvedValue({
      questionId: 't1',
      language: 'Javascript',
      totalTestCases: 2,
      passedTestCases: 1,
      failedTestCases: 1,
      score: 62,
      results: [
        {
          name: 'Sample 1',
          input: '1 2',
          expectedOutput: '3',
          actualOutput: '3',
          passed: true,
          status: 'Passed',
          isSample: true
        },
        {
          name: 'Sample 2',
          input: '5 5',
          expectedOutput: '10',
          actualOutput: '11',
          passed: false,
          status: 'Failed'
        }
      ],
      aiEvaluation: {
        score: 70,
        suggestions: ['Check your addition.'],
        failedTests: [],
        codingStandards: {
          readability: 'Good',
          efficiency: 'Okay',
          errorHandling: 'None',
          namingConventions: 'Good'
        },
        explanation: 'Your solution is close.'
      }
    });

    renderViewer();
    fireEvent.click(screen.getByText('Run code'));

    await waitFor(() => {
      expect(mockRunCode).toHaveBeenCalledWith({
        questionId: 't1',
        language: 'Javascript',
        code: 'function solve() {}'
      });
    });

    expect(screen.getByText('1 / 2 tests passed')).toBeInTheDocument();
    expect(screen.getByText('Score: 62/100')).toBeInTheDocument();
    expect(screen.getByText('Sample 1')).toBeInTheDocument();
    expect(screen.getByText('Sample 2')).toBeInTheDocument();
    expect(screen.getAllByText('Passed').length).toBeGreaterThan(0);
    expect(screen.getByText('AI code quality')).toBeInTheDocument();
    expect(screen.getByText(/Check your addition\./)).toBeInTheDocument();
  });

  it('clears results when the code fails to run and toasts the message', async () => {
    mockRunCode.mockRejectedValue({
      response: { data: { message: 'OPENROUTER_KEY_NOT_FOUND_MESSAGE' } }
    });

    renderViewer();
    fireEvent.click(screen.getByText('Run code'));

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith(
        'OPENROUTER_KEY_NOT_FOUND_MESSAGE'
      );
    });

    expect(
      screen.getByText('OPENROUTER_KEY_NOT_FOUND_MESSAGE')
    ).toBeInTheDocument();
  });

  it('submits the code and shows the results plus the backend message toast', async () => {
    const mockOnSubmitted = jest.fn();
    mockSubmitCode.mockResolvedValue({
      message: 'Code submitted successfully !',
      result: {
        questionId: 't1',
        language: 'Javascript',
        totalTestCases: 2,
        passedTestCases: 2,
        failedTestCases: 0,
        score: 100,
        results: [
          {
            name: 'Sample 1',
            input: '1 2',
            expectedOutput: '3',
            actualOutput: '3',
            passed: true,
            status: 'Passed',
            isSample: true
          }
        ],
        aiEvaluation: {
          score: 90,
          suggestions: [],
          failedTests: [],
          codingStandards: {},
          explanation: ''
        }
      }
    });

    renderViewer(makeTask(), mockOnSubmitted);
    fireEvent.click(screen.getByText('Submit code'));

    await waitFor(() => {
      expect(mockSubmitCode).toHaveBeenCalledWith({
        questionId: 't1',
        language: 'Javascript',
        code: 'function solve() {}'
      });
    });

    expect(screen.getByText('2 / 2 tests passed')).toBeInTheDocument();
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Code submitted successfully !'
    );
    expect(mockOnSubmitted).toHaveBeenCalled();
  });

  it('shows the backend message when the submission is rejected', async () => {
    mockSubmitCode.mockRejectedValue({
      response: {
        data: {
          message: 'All test cases must pass before you can submit your code !'
        }
      }
    });

    renderViewer();
    fireEvent.click(screen.getByText('Submit code'));

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith(
        'All test cases must pass before you can submit your code !'
      );
    });

    expect(
      screen.getByText(
        'All test cases must pass before you can submit your code !'
      )
    ).toBeInTheDocument();
  });
});
