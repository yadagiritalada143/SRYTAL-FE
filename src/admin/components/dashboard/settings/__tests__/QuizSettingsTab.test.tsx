import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom';

jest.mock('@constants', () => ({
  BASE_URL: 'http://localhost:3000/',
  ROLES: {
    ADMIN: 'admin',
    SUPER_ADMIN: 'superadmin',
    USER: 'Employee',
    RECRUITER: 'Recruiter',
    CONTENT_WRITER: 'ContentWriter'
  }
}));

jest.mock('@utils/common/constants', () => ({
  commonUrls: (org: string) => `/${org}/admin`
}));

import QuizSettingsTab from '../QuizSettingsTab';

let mockCourses: any[] = [];
let mockIsLoadingCourses = false;
let mockQuizQuestions: any[] = [];
let mockIsLoadingQuestions = false;
let mockIsErrorQuestions = false;
const mockIsMobile = jest.fn(() => false);

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => mockIsMobile()
}));

jest.mock('@hooks/queries/useUserQueries', () => ({
  useGetAllCoursesByUser: () => ({
    data: mockCourses,
    isLoading: mockIsLoadingCourses
  }),
  useGetAllQuizQuestions: () => ({
    data: mockQuizQuestions,
    isLoading: mockIsLoadingQuestions,
    isError: mockIsErrorQuestions
  })
}));

const mockCreateQuestion = jest.fn();
const mockUpdateQuestion = jest.fn();
const mockUpdateQuestionStatus = jest.fn();
const mockDeleteQuestion = jest.fn();
const mockAddTask = jest.fn();

jest.mock('@hooks/mutations/useUserMutations', () => ({
  useCreateQuizQuestion: () => ({
    mutateAsync: mockCreateQuestion,
    isPending: false
  }),
  useUpdateQuizQuestion: () => ({
    mutateAsync: mockUpdateQuestion,
    isPending: false
  }),
  useUpdateQuizQuestionStatus: () => ({
    mutateAsync: mockUpdateQuestionStatus,
    isPending: false
  }),
  useDeleteQuizQuestion: () => ({
    mutateAsync: mockDeleteQuestion,
    isPending: false
  }),
  useAddCourseTask: () => ({
    mutateAsync: mockAddTask,
    isPending: false
  })
}));

const mockShowSuccessToast = jest.fn();
const mockShowErrorToast = jest.fn();
jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: mockShowSuccessToast,
    showErrorToast: mockShowErrorToast
  })
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      cardBackground: '#ffffff',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ organization: 'srytal' })
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({
    children,
    onClick,
    disabled,
    type,
    leftSection,
    rightSection
  }: any) => (
    <button type={type ?? 'button'} onClick={onClick} disabled={disabled}>
      {leftSection}
      {children}
      {rightSection}
    </button>
  )
}));

jest.mock(
  '@user/components/dashboard/edit-course/QuizBuilder',
  () => (props: any) => (
    <div data-testid='quiz-builder'>
      <span>QuizBuilder Component</span>
      <button
        onClick={() =>
          props.onAddQuestion?.({
            id: 'temp-1',
            question: 'New Question',
            questionType: 'SINGLE_CHOICE',
            options: [{ text: 'Opt 1', isCorrect: true }],
            status: 'SHOW'
          })
        }
      >
        Add Question Mock
      </button>
    </div>
  )
);

jest.mock(
  '@user/components/dashboard/edit-course/QuizPlayerPreview',
  () => () => <div>QuizPlayerPreview Mock</div>
);

describe('QuizSettingsTab', () => {
  const sampleCourses = [
    {
      _id: 'c1',
      courseName: 'TypeScript Fundamentals',
      status: 'ACTIVE',
      modules: [
        {
          _id: 'm1',
          moduleName: 'Basics',
          tasks: [
            {
              _id: 't1',
              taskName: 'Video Lesson',
              type: 'LINK',
              status: 'ACTIVE'
            },
            {
              _id: 't2',
              taskName: 'Basics Knowledge Check',
              type: 'QUIZ',
              taskDescription: 'Test your understanding of basics',
              status: 'ACTIVE'
            }
          ]
        }
      ]
    },
    {
      _id: 'c2',
      courseName: 'React Mastery',
      status: 'ACTIVE',
      modules: [
        {
          _id: 'm2',
          moduleName: 'Hooks',
          tasks: [
            {
              _id: 't3',
              taskName: 'Hooks Assessment',
              type: 'QUIZ',
              taskDescription: 'Assess understanding of React hooks',
              status: 'ARCHIVE'
            }
          ]
        }
      ]
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockCourses = sampleCourses;
    mockIsLoadingCourses = false;
    mockQuizQuestions = [];
    mockIsLoadingQuestions = false;
    mockIsErrorQuestions = false;
    mockIsMobile.mockReturnValue(false);
  });

  const renderTab = (props = {}) =>
    render(
      <MantineProvider>
        <MemoryRouter initialEntries={['/']}>
          <QuizSettingsTab {...props} />
        </MemoryRouter>
      </MantineProvider>
    );

  it('renders page header and stats summary with extracted quiz tasks', () => {
    renderTab();
    expect(screen.getByText('Quizzes')).toBeInTheDocument();
    expect(screen.getByText('View Courses')).toBeInTheDocument();
    expect(screen.getByText('Total Quizzes')).toBeInTheDocument();
    expect(screen.getByText('Active Quizzes')).toBeInTheDocument();
    expect(screen.getByText('Courses with Quizzes')).toBeInTheDocument();

    expect(screen.getByText('Basics Knowledge Check')).toBeInTheDocument();
    expect(screen.getByText('Hooks Assessment')).toBeInTheDocument();
    expect(
      screen.getAllByText('TypeScript Fundamentals').length
    ).toBeGreaterThan(0);
    expect(screen.getAllByText('React Mastery').length).toBeGreaterThan(0);
  });

  it('navigates to courses when View Courses is clicked', () => {
    renderTab();
    fireEvent.click(screen.getByText('View Courses'));
    expect(mockNavigate).toHaveBeenCalledWith(
      '/srytal/admin/dashboard/content-writer'
    );
  });

  it('shows back button when showBackButton is true', () => {
    renderTab({ showBackButton: true });
    expect(screen.getByText('Back')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Back'));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('filters quizzes based on search text', () => {
    renderTab();
    const searchInput = screen.getByPlaceholderText(
      'Search by quiz, course, or module...'
    );

    fireEvent.change(searchInput, { target: { value: 'Hooks' } });
    expect(screen.getByText('Hooks Assessment')).toBeInTheDocument();
    expect(
      screen.queryByText('Basics Knowledge Check')
    ).not.toBeInTheDocument();
  });

  it('switches to active quiz manager when Manage Questions is clicked', async () => {
    mockQuizQuestions = [
      {
        _id: 'q1',
        question: 'What is TypeScript?',
        questionType: 'SINGLE_CHOICE',
        options: ['Typed JS', 'Framework'],
        correctAnswer: 'Typed JS',
        status: 'SHOW'
      }
    ];

    renderTab();
    const manageButtons = screen.getAllByText('Manage Questions');
    fireEvent.click(manageButtons[0]);

    expect(
      await screen.findByText('Basics Knowledge Check')
    ).toBeInTheDocument();
    expect(screen.getByText('All Quizzes')).toBeInTheDocument();
    expect(screen.getByTestId('quiz-builder')).toBeInTheDocument();
    expect(screen.getByText('Total Questions')).toBeInTheDocument();
    expect(screen.getByText('Published (Show)')).toBeInTheDocument();
  });

  it('allows returning to all quizzes list from active quiz view', async () => {
    renderTab();
    const manageButtons = screen.getAllByText('Manage Questions');
    fireEvent.click(manageButtons[0]);

    expect(await screen.findByText('All Quizzes')).toBeInTheDocument();
    fireEvent.click(screen.getByText('All Quizzes'));

    expect(screen.getByText('Total Quizzes')).toBeInTheDocument();
    expect(screen.getByText('Hooks Assessment')).toBeInTheDocument();
  });

  it('handles question creation inside the active quiz manager', async () => {
    mockCreateQuestion.mockResolvedValueOnce({ message: 'Question added!' });
    renderTab();

    const manageButtons = screen.getAllByText('Manage Questions');
    fireEvent.click(manageButtons[0]);

    expect(await screen.findByTestId('quiz-builder')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Add Question Mock'));

    await waitFor(() => {
      expect(mockCreateQuestion).toHaveBeenCalled();
      expect(mockShowSuccessToast).toHaveBeenCalledWith('Question added!');
    });
  });

  it('renders mobile cards when isMobile is true', () => {
    mockIsMobile.mockReturnValue(true);
    renderTab();
    expect(screen.getByText('Basics Knowledge Check')).toBeInTheDocument();
    expect(screen.getAllByText('Manage Questions').length).toBe(2);
  });

  it('shows empty state when no courses have quiz tasks', () => {
    mockCourses = [];
    renderTab();
    expect(screen.getByText('No quizzes found')).toBeInTheDocument();
  });

  it('opens Create Quiz Task modal when Create Quiz Task button is clicked', async () => {
    renderTab();
    const createButton = screen.getByText('Create Quiz Task');
    expect(createButton).toBeInTheDocument();
    fireEvent.click(createButton);
    expect(
      await screen.findByText('Add a new quiz assessment to any course module')
    ).toBeInTheDocument();
  });

  it('restarts quiz numbering from #1 for each module in curriculum view', () => {
    mockCourses = [
      {
        _id: 'c1',
        courseName: 'Course 1',
        status: 'ACTIVE',
        modules: [
          {
            _id: 'm1',
            moduleName: 'Module 1',
            tasks: [
              {
                _id: 'q1',
                taskName: 'Quiz 1.1',
                type: 'QUIZ',
                status: 'ACTIVE'
              },
              {
                _id: 'q2',
                taskName: 'Quiz 1.2',
                type: 'QUIZ',
                status: 'ACTIVE'
              }
            ]
          },
          {
            _id: 'm2',
            moduleName: 'Module 2',
            tasks: [
              {
                _id: 'q3',
                taskName: 'Quiz 2.1',
                type: 'QUIZ',
                status: 'ACTIVE'
              },
              {
                _id: 'q4',
                taskName: 'Quiz 2.2',
                type: 'QUIZ',
                status: 'ACTIVE'
              }
            ]
          }
        ]
      }
    ];

    renderTab();
    const snoBadges = screen.getAllByTestId('quiz-sno-badge');
    expect(snoBadges.length).toBe(4);
    expect(snoBadges[0]).toHaveTextContent('1');
    expect(snoBadges[1]).toHaveTextContent('2');
    expect(snoBadges[2]).toHaveTextContent('1');
    expect(snoBadges[3]).toHaveTextContent('2');
  });
});
