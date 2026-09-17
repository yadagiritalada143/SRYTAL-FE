import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import CourseDetails from '../CourseDetails';

jest.mock('@constants', () => ({
  ROLES: { ADMIN: 'admin' },
  BASE_URL: 'http://localhost:3000'
}));

let mockCourse: any = null;
let mockIsLoading = false;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 'c1' }),
  useNavigate: () => mockNavigate
}));

jest.mock('@hooks/queries/useUserQueries', () => ({
  useGetCourseById: () => ({
    data: mockCourse,
    isLoading: mockIsLoading
  })
}));

jest.mock('@services/user-services', () => ({
  getCourseTaskContentUrl: (taskId: string) =>
    `http://localhost:3000/contentwriter/getCourseTaskContent/${taskId}?auth_token=fake`
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
  CommonButton: ({ children, onClick, disabled, ...props }: any) => (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      data-loading={props.loading}
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
  });

  describe('Stats', () => {
    it('shows module count, content item count and status', () => {
      renderPage();
      expect(screen.getAllByText('Modules').length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('Content Items')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
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

    it('shows "No content in this module yet." for empty modules', () => {
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
        screen.getByText('No content in this module yet.')
      ).toBeInTheDocument();
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

    it('opens the Add Task modal with the correct module id when Add Content is clicked', () => {
      renderPage();
      const addContentButtons = screen.getAllByText('Add Content');
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
        'http://localhost:3000/contentwriter/getCourseTaskContent/t1?auth_token=fake',
        '_blank',
        'noopener'
      );

      openSpy.mockRestore();
    });
  });

  describe('Navigation', () => {
    it('navigates back when the back arrow is clicked', () => {
      renderPage();
      const svg = document.querySelector(
        '.tabler-icon-arrow-left'
      ) as HTMLElement;
      const button = svg?.closest('button');
      expect(button).toBeTruthy();
      fireEvent.click(button as HTMLButtonElement);
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });
});
