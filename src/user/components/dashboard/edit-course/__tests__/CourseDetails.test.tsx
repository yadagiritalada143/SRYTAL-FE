import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import CourseDetails from '../CourseDetails';
import { saveTaskPopupState } from '../task-popup-state';

jest.mock('@constants', () => ({
  ROLES: { ADMIN: 'admin' },
  BASE_URL: 'http://localhost:3000'
}));

let mockCourse: any = null;
let mockIsLoading = false;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 'c1', organization: 'acme' }),
  useNavigate: () => mockNavigate
}));

jest.mock('@hooks/queries/useUserQueries', () => ({
  useGetCourseById: () => ({
    data: mockCourse,
    isLoading: mockIsLoading
  })
}));

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: () => ({
    invalidateQueries: jest.fn()
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

jest.mock('@services/user-services', () => ({
  getCourseTaskContentUrl: (taskId: string) =>
    `http://localhost:3000/getCourseTaskContent/${taskId}?auth_token=fake`
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      headerBackgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: false
  })
}));

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => false
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({
    children,
    onClick,
    disabled,
    loading,
    variant,
    color,
    'aria-label': ariaLabel
  }: any) => (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      data-loading={loading}
      data-variant={variant}
      data-color={color}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}));

jest.mock('@components/common/loaders/PremiumLoader', () => (props: any) => (
  <div data-testid='premium-loader'>{props.label}</div>
));

jest.mock('@components/common/loaders/DataView', () => (props: any) => (
  <div data-testid='data-view'>
    {props.isLoading && <span>loading</span>}
    {props.isEmpty && <span>No course found</span>}
    {props.children}
  </div>
));

jest.mock('@mantine/core', () => {
  const actual = jest.requireActual('@mantine/core');
  return {
    ...actual,
    Modal: ({ opened, children, title }: any) =>
      opened ? (
        <div data-testid='coding-question-modal'>
          <div>{title}</div>
          {children}
        </div>
      ) : null
  };
});

jest.mock('../../content-writer/CourseThumbnail', () => (props: any) => (
  <span data-testid='course-thumbnail' aria-label={props.name} />
));

jest.mock('../AddModuleModal', () => (props: any) => (
  <div data-testid='add-module-modal' data-opened={String(!!props.opened)}>
    {props.opened && <button onClick={props.onClose}>add-module-close</button>}
  </div>
));

jest.mock('../AddTaskModal', () => (props: any) => (
  <div
    data-testid='add-task-modal'
    data-opened={String(!!props.opened)}
    data-module-id={props.moduleId}
    data-initial-mode={props.initialMode}
  >
    {props.opened && <button onClick={props.onClose}>add-task-close</button>}
  </div>
));

jest.mock('../EditCourseModal', () => (props: any) => (
  <div
    data-testid='edit-course-modal'
    data-opened={String(!!props.opened)}
    data-course-id={props.course?._id}
  >
    {props.opened && <button onClick={props.onClose}>edit-course-close</button>}
  </div>
));

jest.mock('../EditModuleModal', () => (props: any) => (
  <div
    data-testid='edit-module-modal'
    data-opened={String(!!props.opened)}
    data-module-id={props.module?._id}
  >
    {props.opened && <button onClick={props.onClose}>edit-module-close</button>}
  </div>
));

jest.mock('../EditTaskModal', () => (props: any) => (
  <div
    data-testid='edit-task-modal'
    data-opened={String(!!props.opened)}
    data-task-id={props.task?._id}
  >
    {props.opened && <button onClick={props.onClose}>edit-task-close</button>}
  </div>
));

jest.mock('../ReorderModulesModal', () => (props: any) => (
  <div
    data-testid='reorder-modules-modal'
    data-opened={String(!!props.opened)}
    data-course-id={props.courseId}
    data-module-count={String(props.modules?.length ?? 0)}
  >
    {props.opened && <button onClick={props.onClose}>reorder-close</button>}
  </div>
));

jest.mock('../ReorderTasksModal', () => (props: any) => (
  <div
    data-testid='reorder-tasks-modal'
    data-opened={String(!!props.opened)}
    data-course-id={props.courseId}
    data-module-id={props.module?._id}
    data-task-count={String(props.module?.tasks?.length ?? 0)}
  >
    {props.opened && <button onClick={props.onClose}>reorder-tasks-close</button>}
  </div>
));

const mockNavigate = jest.fn();

const makeCourse = (overrides: any = {}) => ({
  _id: 'c1',
  courseName: 'React Mastery',
  courseDescription: '<p>Master React fundamentals</p>',
  status: 'ACTIVE',
  thumbnailUrl: 'http://example.com/thumb.png',
  thumbnail: 's3-key/react-mastery.png',
  modules: [
    {
      _id: 'm1',
      moduleName: 'Fundamentals',
      moduleDescription: 'Core concepts',
      status: 'ACTIVE',
      thumbnailUrl: 'http://example.com/m1.png',
      thumbnail: 's3-key/m1.png',
      tasks: [
        {
          _id: 't1',
          taskName: 'Intro video',
          taskDescription: 'Watch the intro',
          status: 'ACTIVE',
          type: 'LINK',
          content: 'https://youtube.com/watch?v=abc123',
          thumbnailUrl: '',
          thumbnail: ''
        },
        {
          _id: 't2',
          taskName: 'Reading material',
          taskDescription: '',
          status: 'ARCHIVE',
          type: 'FILE',
          contentFileName: 'notes.pdf',
          thumbnailUrl: '',
          thumbnail: ''
        }
      ]
    },
    {
      _id: 'm2',
      moduleName: 'Advanced',
      moduleDescription: '',
      status: 'ACTIVE',
      thumbnailUrl: '',
      thumbnail: '',
      tasks: [
        {
          _id: 't3',
          taskName: 'Deep dive',
          taskDescription: 'Advanced patterns',
          status: 'ACTIVE',
          type: 'LINK',
          content: 'https://blog.example.com/react-patterns',
          thumbnailUrl: '',
          thumbnail: ''
        }
      ]
    }
  ],
  ...overrides
});

const renderPage = () => {
  return render(
    <MantineProvider>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <CourseDetails />
      </BrowserRouter>
    </MantineProvider>
  );
};

describe('CourseDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
    mockCourse = makeCourse();
    mockIsLoading = false;
  });

  describe('Loading', () => {
    it('shows the premium loader while loading', () => {
      mockIsLoading = true;
      mockCourse = null;
      renderPage();
      expect(screen.getByTestId('premium-loader')).toBeInTheDocument();
      expect(screen.getByText('Loading course...')).toBeInTheDocument();
    });
  });

  describe('Empty state', () => {
    it('shows "No course found" when there is no course data', () => {
      mockCourse = null;
      renderPage();
      expect(screen.getByText('No course found')).toBeInTheDocument();
    });
  });

  describe('Course header', () => {
    it('renders the course name and status badge', () => {
      renderPage();
      expect(screen.getByText('React Mastery')).toBeInTheDocument();
      expect(screen.getAllByText('ACTIVE').length).toBeGreaterThanOrEqual(1);
    });

    it('renders the course thumbnail', () => {
      renderPage();
      expect(
        screen.getAllByTestId('course-thumbnail').length
      ).toBeGreaterThanOrEqual(1);
    });

    it('shows the Edit Course button', () => {
      renderPage();
      expect(
        screen.getByRole('button', { name: 'Edit Course' })
      ).toBeInTheDocument();
    });

    it('shows the Reorder button beside Edit Course when there are two modules', () => {
      renderPage();
      expect(
        screen.getByRole('button', { name: 'Reorder modules' })
      ).toBeInTheDocument();
    });

    it('hides the Reorder button when there is only one module', () => {
      mockCourse = makeCourse({ modules: [makeCourse().modules[0]] });
      renderPage();
      expect(
        screen.queryByRole('button', { name: 'Reorder modules' })
      ).not.toBeInTheDocument();
    });
  });

  describe('Stats', () => {
    it('shows total and archived module and task counts', () => {
      renderPage();
      expect(screen.getByText('Total Modules')).toBeInTheDocument();
      expect(screen.getByText('Archived Modules')).toBeInTheDocument();
      expect(screen.getByText('Total Tasks')).toBeInTheDocument();
      expect(screen.getByText('Archived Tasks')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  describe('Course description', () => {
    it('renders the description section when a description exists', () => {
      renderPage();
      expect(screen.getByText('About this course')).toBeInTheDocument();
    });

    it('does not render the description section when description is empty', () => {
      mockCourse = makeCourse({ courseDescription: '' });
      renderPage();
      expect(screen.queryByText('About this course')).not.toBeInTheDocument();
    });
  });

  describe('Modules', () => {
    it('renders the Modules title and Add Module button', () => {
      renderPage();
      expect(screen.getAllByText('Modules').length).toBeGreaterThanOrEqual(1);
      expect(
        screen.getByRole('button', { name: 'Add Module' })
      ).toBeInTheDocument();
    });

    it('renders module names and item counts', () => {
      renderPage();
      expect(screen.getByText('Fundamentals')).toBeInTheDocument();
      expect(screen.getByText('Advanced')).toBeInTheDocument();

      expect(screen.getAllByText('2 items')).toHaveLength(1);
      expect(screen.getAllByText('1 items')).toHaveLength(1);
    });

    it('renders task names inside the modules', () => {
      renderPage();
      expect(screen.getByText('Intro video')).toBeInTheDocument();
      expect(screen.getByText('Reading material')).toBeInTheDocument();
      expect(screen.getByText('Deep dive')).toBeInTheDocument();
    });

    it('shows an archived badge for archived tasks', () => {
      renderPage();
      const archivedBadges = screen.getAllByText('Archived');
      expect(archivedBadges.length).toBeGreaterThanOrEqual(1);
    });

    it('shows a Coding badge for coding tasks', () => {
      mockCourse = makeCourse({
        modules: [
          {
            _id: 'm9',
            moduleName: 'Coding Module',
            moduleDescription: '',
            status: 'ACTIVE',
            tasks: [
              {
                _id: 't9',
                taskName: 'FizzBuzz',
                taskDescription: '',
                status: 'ACTIVE',
                type: 'LINK',
                content: '',
                isCoding: true,
                question: 'Return fizz for multiples of three.',
                thumbnailUrl: '',
                thumbnail: ''
              }
            ]
          }
        ]
      });
      renderPage();
      expect(screen.getByText('FizzBuzz')).toBeInTheDocument();
      expect(screen.getByText('Coding')).toBeInTheDocument();
    });

    it('shows task descriptions in task rows', () => {
      renderPage();
      expect(screen.getByText('Watch the intro')).toBeInTheDocument();
      expect(screen.getByText('Advanced patterns')).toBeInTheDocument();
    });

    it('shows "No modules yet" when modules are empty', () => {
      mockCourse = makeCourse({ modules: [] });
      renderPage();
      expect(screen.getByText(/No modules yet/)).toBeInTheDocument();
    });

    it('shows "No tasks in this module yet." for empty modules', () => {
      mockCourse = makeCourse({
        modules: [
          {
            _id: 'm1',
            moduleName: 'Empty',
            moduleDescription: '',
            status: 'ACTIVE',
            tasks: []
          }
        ]
      });
      renderPage();
      expect(
        screen.getByText('No tasks in this module yet.')
      ).toBeInTheDocument();
    });

    it('shows a highlighted task Reorder button when a module has two tasks', () => {
      renderPage();
      fireEvent.click(screen.getByRole('button', { name: 'Fundamentals' }));
      const reorderButton = screen.getByRole('button', {
        name: 'Reorder tasks in Fundamentals'
      });
      expect(reorderButton).toBeInTheDocument();
      expect(reorderButton).toHaveAttribute('data-variant', 'filled');
      expect(reorderButton).toHaveAttribute('data-color', 'indigo');
    });

    it('hides the task Reorder button when a module has fewer than two tasks', () => {
      renderPage();
      fireEvent.click(screen.getByRole('button', { name: 'Advanced' }));
      expect(
        screen.queryByRole('button', { name: 'Reorder tasks in Advanced' })
      ).not.toBeInTheDocument();
    });
  });

  describe('Modal interactions', () => {
    it('opens the Add Module modal when Add Module is clicked', () => {
      renderPage();
      fireEvent.click(screen.getByRole('button', { name: 'Add Module' }));
      expect(screen.getByTestId('add-module-modal')).toHaveAttribute(
        'data-opened',
        'true'
      );
    });

    it('opens the Edit Course modal when Edit Course is clicked', () => {
      renderPage();
      fireEvent.click(screen.getByRole('button', { name: 'Edit Course' }));
      expect(screen.getByTestId('edit-course-modal')).toHaveAttribute(
        'data-opened',
        'true'
      );
      expect(screen.getByTestId('edit-course-modal')).toHaveAttribute(
        'data-course-id',
        'c1'
      );
    });

    it('opens the Reorder Modules modal when Reorder is clicked', () => {
      renderPage();
      fireEvent.click(
        screen.getByRole('button', { name: 'Reorder modules' })
      );
      expect(screen.getByTestId('reorder-modules-modal')).toHaveAttribute(
        'data-opened',
        'true'
      );
      expect(screen.getByTestId('reorder-modules-modal')).toHaveAttribute(
        'data-course-id',
        'c1'
      );
      expect(screen.getByTestId('reorder-modules-modal')).toHaveAttribute(
        'data-module-count',
        '2'
      );
    });

    it('opens the Reorder Tasks modal for the module when its Reorder button is clicked', () => {
      renderPage();
      fireEvent.click(screen.getByRole('button', { name: 'Fundamentals' }));
      fireEvent.click(
        screen.getByRole('button', {
          name: 'Reorder tasks in Fundamentals'
        })
      );
      expect(screen.getByTestId('reorder-tasks-modal')).toHaveAttribute(
        'data-opened',
        'true'
      );
      expect(screen.getByTestId('reorder-tasks-modal')).toHaveAttribute(
        'data-module-id',
        'm1'
      );
      expect(screen.getByTestId('reorder-tasks-modal')).toHaveAttribute(
        'data-task-count',
        '2'
      );
    });

    it('opens the Edit Module modal when the edit icon for a module is clicked', () => {
      renderPage();
      fireEvent.click(screen.getByLabelText('Edit Fundamentals'));
      expect(screen.getByTestId('edit-module-modal')).toHaveAttribute(
        'data-opened',
        'true'
      );
      expect(screen.getByTestId('edit-module-modal')).toHaveAttribute(
        'data-module-id',
        'm1'
      );
    });

    it('opens the Add Task modal with the correct module id when Add Task is clicked', () => {
      renderPage();
      const addContentButtons = screen.getAllByText('Add Task');
      fireEvent.click(addContentButtons[0]);
      expect(screen.getByTestId('add-task-modal')).toHaveAttribute(
        'data-opened',
        'true'
      );
      expect(screen.getByTestId('add-task-modal')).toHaveAttribute(
        'data-module-id',
        'm1'
      );
    });

    it('provides a clean module header with Add Task and without redundant Add Quiz button', () => {
      renderPage();
      expect(screen.queryByText('Add Quiz')).not.toBeInTheDocument();
      expect(screen.getAllByText('Add Task').length).toBeGreaterThan(0);
    });

    it('reopens the Add Task modal for the stored module after managing languages', () => {
      saveTaskPopupState({ courseId: 'c1', moduleId: 'm2' });
      renderPage();
      expect(screen.getByTestId('add-task-modal')).toHaveAttribute(
        'data-opened',
        'true'
      );
      expect(screen.getByTestId('add-task-modal')).toHaveAttribute(
        'data-module-id',
        'm2'
      );
    });

    it('does not reopen the Add Task modal when the pending course does not match', () => {
      saveTaskPopupState({ courseId: 'other-course', moduleId: 'm1' });
      renderPage();
      expect(screen.getByTestId('add-task-modal')).toHaveAttribute(
        'data-opened',
        'false'
      );
    });

    it('opens the Edit Task modal when the task edit icon is clicked', () => {
      renderPage();
      fireEvent.click(screen.getByLabelText('Edit Intro video'));
      expect(screen.getByTestId('edit-task-modal')).toHaveAttribute(
        'data-opened',
        'true'
      );
      expect(screen.getByTestId('edit-task-modal')).toHaveAttribute(
        'data-task-id',
        't1'
      );
    });
  });

  describe('View content', () => {
    it('opens the content URL in a new tab when Open is clicked', () => {
      const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
      renderPage();

      const openButton = screen
        .getAllByText('Open')[0]!
        .closest('button') as HTMLButtonElement;
      fireEvent.click(openButton);

      expect(openSpy).toHaveBeenCalledWith(
        'http://localhost:3000/getCourseTaskContent/t1?auth_token=fake',
        '_blank',
        'noopener'
      );

      openSpy.mockRestore();
    });

    it('does not show an Open action for coding tasks', () => {
      const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
      mockCourse = makeCourse({
        modules: [
          {
            _id: 'm9',
            moduleName: 'Coding Module',
            moduleDescription: '',
            status: 'ACTIVE',
            tasks: [
              {
                _id: 't9',
                taskName: 'FizzBuzz',
                taskDescription: 'Return fizz for multiples of three.',
                status: 'ACTIVE',
                type: 'CODE',
                content: '',
                isCoding: true,
                question: 'Return fizz for multiples of three.',
                thumbnailUrl: '',
                thumbnail: ''
              }
            ]
          }
        ]
      });
      renderPage();

      expect(screen.queryByText('Open')).not.toBeInTheDocument();
      expect(openSpy).not.toHaveBeenCalled();

      openSpy.mockRestore();
    });

    it('shows a Manage Questions action for quiz tasks instead of Open', () => {
      mockCourse = makeCourse({
        modules: [
          {
            _id: 'm1',
            moduleName: 'Quiz Module',
            moduleDescription: '',
            status: 'ACTIVE',
            tasks: [
              {
                _id: 'q1',
                taskName: 'Colour quiz',
                taskDescription: 'Pick a colour.',
                status: 'ACTIVE',
                type: 'QUIZ',
                thumbnailUrl: '',
                thumbnail: ''
              }
            ]
          }
        ]
      });
      renderPage();

      expect(screen.queryByText('Open')).not.toBeInTheDocument();
      expect(screen.getByText('Manage Questions')).toBeInTheDocument();
    });

    it('navigates to the quiz editor with the task and course ids', () => {
      mockCourse = makeCourse({
        modules: [
          {
            _id: 'm1',
            moduleName: 'Quiz Module',
            moduleDescription: '',
            status: 'ACTIVE',
            tasks: [
              {
                _id: 'q1',
                taskName: 'Colour quiz',
                taskDescription: 'Pick a colour.',
                status: 'ACTIVE',
                type: 'QUIZ',
                thumbnailUrl: '',
                thumbnail: ''
              }
            ]
          }
        ]
      });
      renderPage();

      fireEvent.click(
        screen
          .getByText('Manage Questions')
          .closest('button') as HTMLButtonElement
      );

      const params = new URLSearchParams({
        taskId: 'q1',
        courseId: 'c1',
        moduleId: '',
        taskName: 'Colour quiz'
      });
      expect(mockNavigate).toHaveBeenCalledWith(
        `/acme/employee/dashboard/quiz-questions?${params.toString()}`
      );
    });
  });

  describe('Navigation', () => {
    it('navigates to the courses list when the back button is clicked', () => {
      window.history.pushState({}, '', '/acme/employee/dashboard/course/c1');
      renderPage();
      const button = screen.getByRole('button', { name: /back/i });
      expect(button).toBeTruthy();
      fireEvent.click(button);
      expect(mockNavigate).toHaveBeenCalledWith(
        '/acme/employee/dashboard/content-writer'
      );
    });

    it('navigates to quizzes if from=quizzes is present in searchParams', () => {
      window.history.pushState(
        {},
        '',
        '/acme/employee/dashboard/course/c1?from=quizzes'
      );
      renderPage();
      const button = screen.getByRole('button', { name: /back/i });
      fireEvent.click(button);
      expect(mockNavigate).toHaveBeenCalledWith(
        '/acme/employee/dashboard/quizzes'
      );
    });

    it('navigates to custom from path if from is present in searchParams', () => {
      window.history.pushState(
        {},
        '',
        '/acme/employee/dashboard/course/c1?from=/custom/path'
      );
      renderPage();
      const button = screen.getByRole('button', { name: /back/i });
      fireEvent.click(button);
      expect(mockNavigate).toHaveBeenCalledWith('/custom/path');
    });
  });
});
