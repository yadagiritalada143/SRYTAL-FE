import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import CloneCourseModal from '../CloneCourseModal';

let mockIsDark = false;
jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#4c6ef5',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: mockIsDark
  })
}));

let mockFullCourse: any = null;
let mockIsFetching = false;
const mockGetCourseByIdArgs: Array<[string, boolean]> = [];
jest.mock('@hooks/queries/useUserQueries', () => ({
  useGetCourseById: (id: string, enabled: boolean) => {
    mockGetCourseByIdArgs.push([id, enabled]);
    return { data: mockFullCourse, isLoading: mockIsFetching };
  }
}));

let mockIsPending = false;
const mockCloneCourse = jest.fn();
jest.mock('@hooks/mutations/useUserMutations', () => ({
  useCloneCourse: () => ({
    mutateAsync: mockCloneCourse,
    isPending: mockIsPending
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

const mockCopyQuizQuestionsToTask = jest.fn();
jest.mock('@services/user-services', () => ({
  // Resolved lazily: the factory runs while the module is imported, before the
  // mock variable above is initialised.
  copyQuizQuestionsToTask: (...args: any[]) =>
    mockCopyQuizQuestionsToTask(...args)
}));

jest.mock('@utils/common/get-error-message', () => ({
  getErrorMessage: (error: any, fallback: string) =>
    error?.response?.data?.message || error?.message || fallback
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, disabled, loading }: any) => (
    <button
      type='button'
      onClick={onClick}
      disabled={Boolean(disabled || loading)}
    >
      {children}
    </button>
  )
}));

jest.mock('../CourseThumbnail', () => (props: any) => (
  <span data-testid='course-thumbnail' aria-label={props.name} />
));

const mockOnClose = jest.fn();
const mockOnSuccess = jest.fn();

const makeTask = (id: string, taskName: string, extra: any = {}) => ({
  _id: id,
  taskName,
  taskDescription: 'description',
  status: 'ACTIVE',
  type: 'LINK',
  ...extra
});

const makeModule = (id: string, moduleName: string, tasks: any[]) => ({
  _id: id,
  moduleName,
  moduleDescription: 'description',
  status: 'ACTIVE',
  tasks
});

const makeCourse = (overrides: any = {}) => ({
  _id: 'c1',
  courseName: 'Archived Course',
  courseDescription: '<p>Learn React</p>',
  thumbnailUrl: 'http://example.com/thumb.png',
  status: 'ARCHIVE',
  modules: [
    makeModule('m1', 'Module One', [
      makeTask('t1', 'Task One'),
      makeTask('t2', 'Task Two', { isCoding: true, type: 'CODE' })
    ]),
    makeModule('m2', 'Module Two', [
      makeTask('t3', 'Task Three', { type: 'FILE' })
    ]),
    makeModule('m3', 'Module Three', [])
  ],
  ...overrides
});

const renderModal = (props: any = {}) =>
  render(
    <MantineProvider>
      <CloneCourseModal
        opened
        onClose={mockOnClose}
        course={makeCourse()}
        onSuccess={mockOnSuccess}
        {...props}
      />
    </MantineProvider>
  );

// A course that mixes a regular task with a QUIZ task.
const makeQuizCourse = () =>
  makeCourse({
    modules: [
      makeModule('m1', 'Module One', [
        makeTask('t1', 'Task One'),
        makeTask('tq1', 'Quiz One', { type: 'QUIZ' })
      ])
    ]
  });

// The clone endpoint echoes the cloned modules/tasks in the requested order.
const makeClonedQuizResponse = () => ({
  message: 'Cloned just fine',
  data: {
    courseId: 'c9',
    courseName: 'Cloned',
    status: 'ACTIVE',
    modules: [
      {
        moduleId: 'cm1',
        moduleName: 'Module One',
        status: 'ACTIVE',
        tasks: [
          {
            taskId: 'ct1',
            taskName: 'Task One',
            type: 'LINK',
            status: 'ACTIVE'
          },
          {
            taskId: 'ctq1',
            taskName: 'Quiz One',
            type: 'QUIZ',
            status: 'ACTIVE'
          }
        ]
      }
    ]
  }
});

const renderOpenModal = async (props: any = {}) => {
  renderModal(props);
  await screen.findByRole('dialog');
};

const checkboxAt = (index: number) =>
  screen.getAllByRole('checkbox')[index] as HTMLInputElement;

const getCloneButton = () =>
  screen.getByRole('button', {
    name: /Clone Course|Cloning Course\.\.\.|Copying Quiz Questions\.\.\./
  });

// The component re-renders after its init effect, so the query hook can be
// invoked more than once — every call must receive the same arguments.
const expectFetchArgs = (id: string, enabled: boolean) => {
  expect(mockGetCourseByIdArgs.length).toBeGreaterThan(0);
  mockGetCourseByIdArgs.forEach(args => expect(args).toEqual([id, enabled]));
};

const nameInput = () =>
  screen.getByLabelText(/New Course Name/) as HTMLInputElement;

const DEFAULT_NAME = 'Archived Course (Clone)';

describe('CloneCourseModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetCourseByIdArgs.length = 0;
    mockIsDark = false;
    mockFullCourse = null;
    mockIsFetching = false;
    mockIsPending = false;
    mockCloneCourse.mockResolvedValue({});
    mockCopyQuizQuestionsToTask.mockResolvedValue(0);
  });

  describe('Rendering', () => {
    it('renders nothing when there is no course', () => {
      renderModal({ course: null });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('prefills the clone name, selects every module and task, and expands all', async () => {
      await renderOpenModal();

      expect(nameInput().value).toBe(DEFAULT_NAME);
      expect(
        screen.getByText(`${DEFAULT_NAME.length}/150`)
      ).toBeInTheDocument();
      expect(screen.getByText('Archived Source Course')).toBeInTheDocument();
      expect(screen.getByText(/3\/3 Modules • 3\/3 Tasks/)).toBeInTheDocument();

      // every module and task is selected by default
      const boxes = screen.getAllByRole('checkbox');
      boxes.forEach(box => expect(box).toBeChecked());

      // all modules start expanded, so task names are visible
      expect(screen.getByText('Task One')).toBeInTheDocument();
      expect(screen.getByText('Task Three')).toBeInTheDocument();

      expect(
        screen.getByText(
          `Ready to clone 3 module(s) and 3 task(s) into "${DEFAULT_NAME}"`
        )
      ).toBeInTheDocument();
      expect(screen.getByText('Ready')).toBeInTheDocument();
      expect(getCloneButton()).toBeEnabled();
    });

    it('labels tasks as Link, Coding, and File by type', async () => {
      await renderOpenModal();

      expect(screen.getByText('Link')).toBeInTheDocument();
      expect(screen.getByText('Coding')).toBeInTheDocument();
      expect(screen.getByText('File')).toBeInTheDocument();
      expect(screen.getByText('0/0 tasks')).toBeInTheDocument();
      expect(screen.getByText('2/2 tasks')).toBeInTheDocument();
    });

    it('does not request course details when modules are already loaded', async () => {
      await renderOpenModal();

      expectFetchArgs('c1', false);
    });

    it('shows a loading placeholder while the curriculum is fetched', async () => {
      mockIsFetching = true;
      await renderOpenModal({ course: makeCourse({ modules: undefined }) });

      expectFetchArgs('c1', true);
      expect(
        screen.getByText('Loading course curriculum...')
      ).toBeInTheDocument();
      expect(screen.queryByText('Task One')).not.toBeInTheDocument();
    });

    it('uses the fetched course details when the passed course has no modules', async () => {
      mockFullCourse = makeCourse({
        courseName: 'Fetched Course',
        modules: [
          makeModule('fm1', 'Fetched Module', [makeTask('ft1', 'Fetched Task')])
        ]
      });

      await renderOpenModal({
        course: { _id: 'c1', courseName: 'Short', status: 'ARCHIVE' }
      });

      expectFetchArgs('c1', true);
      expect(nameInput().value).toBe('Fetched Course (Clone)');
      expect(screen.getByText(/1\/1 Modules • 1\/1 Tasks/)).toBeInTheDocument();
      expect(screen.getByText('Fetched Task')).toBeInTheDocument();
    });

    it('shows an empty state when the course has no curriculum', async () => {
      await renderOpenModal({ course: makeCourse({ modules: [] }) });

      expect(screen.getByText('No modules in this course')).toBeInTheDocument();
      expect(
        screen.getByText(
          'This archived course contains no curriculum to clone.'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Select at least one module above to enable course cloning'
        )
      ).toBeInTheDocument();
      expect(screen.getByText('Pending Selection')).toBeInTheDocument();
      expect(getCloneButton()).toBeDisabled();
      expect(
        screen.queryByRole('button', { name: 'Expand All' })
      ).not.toBeInTheDocument();
    });

    it('shows the empty state when neither the course nor the fetch has modules', async () => {
      await renderOpenModal({ course: makeCourse({ modules: undefined }) });

      expect(screen.getByText('No modules in this course')).toBeInTheDocument();
      expect(screen.getByText(/0\/0 Modules • 0\/0 Tasks/)).toBeInTheDocument();
    });
  });

  describe('Selection', () => {
    it('clears every selection from the master checkbox and restores it', async () => {
      await renderOpenModal();

      const master = screen.getByRole('checkbox', {
        name: /Select All Curriculum/
      });
      fireEvent.click(master);

      expect(master).not.toBeChecked();
      expect(master).not.toHaveProperty('indeterminate', true);
      expect(screen.getByText(/0\/3 Modules • 0\/3 Tasks/)).toBeInTheDocument();
      expect(
        screen.getByText(
          'Select at least one module above to enable course cloning'
        )
      ).toBeInTheDocument();
      expect(screen.getByText('Pending Selection')).toBeInTheDocument();
      expect(getCloneButton()).toBeDisabled();

      fireEvent.click(master);
      expect(master).toBeChecked();
      expect(screen.getByText(/3\/3 Modules • 3\/3 Tasks/)).toBeInTheDocument();
      expect(getCloneButton()).toBeEnabled();
    });

    it('deselects a module together with its tasks', async () => {
      await renderOpenModal();

      fireEvent.click(checkboxAt(1)); // Module One

      expect(checkboxAt(1)).not.toBeChecked();
      expect(checkboxAt(2)).not.toBeChecked(); // Task One
      expect(checkboxAt(3)).not.toBeChecked(); // Task Two
      expect(checkboxAt(4)).toBeChecked(); // Module Two untouched
      expect(screen.getByText(/2\/3 Modules • 1\/3 Tasks/)).toBeInTheDocument();
      expect(
        screen.getByRole('checkbox', { name: /Select All Curriculum/ })
      ).toHaveProperty('indeterminate', true);
    });

    it('marks a module as indeterminate when only some tasks are selected', async () => {
      await renderOpenModal();

      fireEvent.click(checkboxAt(2)); // Task One off

      expect(checkboxAt(1)).toHaveProperty('indeterminate', true);
      expect(checkboxAt(1)).not.toBeChecked();
      expect(screen.getByText(/3\/3 Modules • 2\/3 Tasks/)).toBeInTheDocument();

      fireEvent.click(checkboxAt(2)); // Task One back on
      expect(checkboxAt(1)).toBeChecked();
      expect(checkboxAt(1)).not.toHaveProperty('indeterminate', true);
      expect(screen.getByText(/3\/3 Modules • 3\/3 Tasks/)).toBeInTheDocument();
    });

    it('re-selects the parent module when a task inside it is checked', async () => {
      await renderOpenModal();

      fireEvent.click(checkboxAt(1)); // deselect Module One (and its tasks)
      expect(screen.getByText(/2\/3 Modules • 1\/3 Tasks/)).toBeInTheDocument();

      fireEvent.click(checkboxAt(2)); // check Task One again
      // the module is re-selected but stays indeterminate: Task Two is off
      expect(checkboxAt(1)).toHaveProperty('indeterminate', true);
      expect(screen.getByText(/3\/3 Modules • 2\/3 Tasks/)).toBeInTheDocument();
    });

    it('toggles a module that has no tasks', async () => {
      await renderOpenModal();

      fireEvent.click(checkboxAt(6)); // Module Three (no tasks)
      expect(checkboxAt(6)).not.toBeChecked();
      expect(screen.getByText(/2\/3 Modules • 3\/3 Tasks/)).toBeInTheDocument();

      fireEvent.click(checkboxAt(6));
      expect(checkboxAt(6)).toBeChecked();
      expect(screen.getByText(/3\/3 Modules • 3\/3 Tasks/)).toBeInTheDocument();
    });
  });

  describe('Expand and collapse', () => {
    it('collapses and re-expands every module from the master control', async () => {
      await renderOpenModal();

      // only modules that actually contain tasks expose a chevron
      expect(screen.getAllByLabelText('Collapse tasks').length).toBe(2);

      fireEvent.click(screen.getByRole('button', { name: 'Collapse All' }));

      expect(
        screen.getByRole('button', { name: 'Expand All' })
      ).toBeInTheDocument();
      expect(screen.getAllByLabelText('Expand tasks').length).toBe(2);

      fireEvent.click(screen.getByRole('button', { name: 'Expand All' }));
      expect(
        screen.getByRole('button', { name: 'Collapse All' })
      ).toBeInTheDocument();
      expect(screen.getAllByLabelText('Collapse tasks').length).toBe(2);
      expect(screen.getByText('Task One')).toBeInTheDocument();
    });

    it('expands and collapses a single module with the chevron button', async () => {
      await renderOpenModal();

      fireEvent.click(screen.getAllByLabelText('Collapse tasks')[0]);

      expect(screen.getAllByLabelText('Expand tasks').length).toBe(1);
      // the other module is unaffected
      expect(screen.getAllByLabelText('Collapse tasks').length).toBe(1);

      fireEvent.click(screen.getAllByLabelText('Expand tasks')[0]);
      expect(screen.getAllByLabelText('Collapse tasks').length).toBe(2);
      expect(screen.queryAllByLabelText('Expand tasks').length).toBe(0);
    });

    it('toggles a module by clicking its name', async () => {
      await renderOpenModal();

      fireEvent.click(screen.getByText('Module One'));
      expect(screen.getAllByLabelText('Expand tasks').length).toBe(1);

      fireEvent.click(screen.getByText('Module One'));
      expect(screen.queryAllByLabelText('Expand tasks').length).toBe(0);
      expect(screen.getAllByLabelText('Collapse tasks').length).toBe(2);
    });

    it('offers Expand All again after a single module is collapsed', async () => {
      await renderOpenModal();

      fireEvent.click(screen.getAllByLabelText('Collapse tasks')[0]);
      expect(
        screen.getByRole('button', { name: 'Expand All' })
      ).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'Expand All' }));
      expect(screen.getAllByLabelText('Collapse tasks').length).toBe(2);
    });
  });

  describe('Course name validation', () => {
    it('flags an empty name as soon as the field is edited', async () => {
      await renderOpenModal();

      fireEvent.change(nameInput(), { target: { value: '' } });

      expect(screen.getByText('Course name is required.')).toBeInTheDocument();
      expect(getCloneButton()).toBeDisabled();
      expect(screen.getByText('0/150')).toBeInTheDocument();
    });

    it('flags an empty name on blur', async () => {
      await renderOpenModal();

      fireEvent.change(nameInput(), { target: { value: '   ' } });
      fireEvent.blur(nameInput());

      expect(screen.getByText('Course name is required.')).toBeInTheDocument();
      expect(getCloneButton()).toBeDisabled();
    });

    it('flags names longer than 150 characters', async () => {
      await renderOpenModal();

      const longName = 'x'.repeat(151);
      fireEvent.change(nameInput(), { target: { value: longName } });
      fireEvent.blur(nameInput());

      expect(
        screen.getByText('Course name cannot exceed 150 characters.')
      ).toBeInTheDocument();
      expect(getCloneButton()).toBeDisabled();
      expect(screen.getByText('151/150')).toBeInTheDocument();
    });

    it('clears the error once a valid name is typed', async () => {
      await renderOpenModal();

      fireEvent.change(nameInput(), { target: { value: '' } });
      expect(screen.getByText('Course name is required.')).toBeInTheDocument();

      fireEvent.change(nameInput(), { target: { value: 'Fresh Clone' } });
      expect(
        screen.queryByText('Course name is required.')
      ).not.toBeInTheDocument();
      expect(getCloneButton()).toBeEnabled();
    });
  });

  describe('Submitting the clone', () => {
    it('sends only the selected modules and tasks, then reports success', async () => {
      mockCloneCourse.mockResolvedValue({
        message: 'Cloned just fine',
        data: { courseId: 'c9', courseName: 'Cloned' }
      });
      await renderOpenModal();

      fireEvent.click(checkboxAt(3)); // Task Two off
      fireEvent.click(checkboxAt(6)); // Module Three off

      fireEvent.click(getCloneButton());

      await waitFor(() =>
        expect(mockCloneCourse).toHaveBeenCalledWith({
          courseId: 'c1',
          courseName: DEFAULT_NAME,
          modules: [
            { moduleId: 'm1', taskIds: ['t1'] },
            { moduleId: 'm2', taskIds: ['t3'] }
          ]
        })
      );
      expect(mockShowSuccessToast).toHaveBeenCalledWith('Cloned just fine');
      expect(mockOnSuccess).toHaveBeenCalledWith({
        courseId: 'c9',
        courseName: 'Cloned'
      });
      expect(mockOnClose).toHaveBeenCalled();
      expect(mockShowErrorToast).not.toHaveBeenCalled();
    });

    it('trims the name and falls back to a default success message', async () => {
      await renderOpenModal();

      fireEvent.change(nameInput(), { target: { value: '  Trimmed Clone  ' } });
      fireEvent.click(getCloneButton());

      await waitFor(() => expect(mockCloneCourse).toHaveBeenCalledTimes(1));
      expect(mockCloneCourse.mock.calls[0][0].courseName).toBe('Trimmed Clone');
      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Course cloned successfully into an active course!'
      );
      expect(mockOnSuccess).toHaveBeenCalledWith(undefined);
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('surfaces the API error message when the clone fails', async () => {
      mockCloneCourse.mockRejectedValue({
        response: { data: { message: 'Course name already exists' } }
      });
      await renderOpenModal();

      fireEvent.click(getCloneButton());

      await waitFor(() =>
        expect(mockShowErrorToast).toHaveBeenCalledWith(
          'Course name already exists'
        )
      );
      expect(mockOnSuccess).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
      expect(mockShowSuccessToast).not.toHaveBeenCalled();
    });

    it('falls back to a generic message when the error has no details', async () => {
      mockCloneCourse.mockRejectedValue({});
      await renderOpenModal();

      fireEvent.click(getCloneButton());

      await waitFor(() =>
        expect(mockShowErrorToast).toHaveBeenCalledWith(
          'Failed to clone course'
        )
      );
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Pending state', () => {
    it('disables the actions and blocks closing while the clone is running', async () => {
      mockIsPending = true;
      await renderOpenModal();

      expect(screen.getByText('Cloning Course...')).toBeInTheDocument();
      expect(getCloneButton()).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();

      fireEvent.click(
        document.querySelector('.mantine-Modal-close') as HTMLElement
      );
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Quiz tasks', () => {
    it('labels a quiz task as Quiz instead of Link', async () => {
      await renderOpenModal({ course: makeQuizCourse() });

      expect(screen.getByText('Quiz')).toBeInTheDocument();
      // the regular task in the same module is still a Link
      expect(screen.getByText('Link')).toBeInTheDocument();
    });

    it('copies the questions of every cloned quiz task', async () => {
      mockCloneCourse.mockResolvedValue(makeClonedQuizResponse());
      await renderOpenModal({ course: makeQuizCourse() });

      fireEvent.click(getCloneButton());

      await waitFor(() =>
        expect(mockCopyQuizQuestionsToTask).toHaveBeenCalledTimes(1)
      );
      // source task -> cloned task
      expect(mockCopyQuizQuestionsToTask).toHaveBeenCalledWith('tq1', 'ctq1');
      expect(mockShowSuccessToast).toHaveBeenCalledWith('Cloned just fine');
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('does not copy anything when the course has no quiz task', async () => {
      mockCloneCourse.mockResolvedValue({
        message: 'Cloned just fine',
        data: {
          courseId: 'c9',
          courseName: 'Cloned',
          status: 'ACTIVE',
          modules: [
            {
              moduleId: 'cm1',
              moduleName: 'Module One',
              status: 'ACTIVE',
              tasks: [
                {
                  taskId: 'ct1',
                  taskName: 'Task One',
                  type: 'LINK',
                  status: 'ACTIVE'
                }
              ]
            }
          ]
        }
      });
      await renderOpenModal();

      fireEvent.click(getCloneButton());

      await waitFor(() => expect(mockOnClose).toHaveBeenCalled());
      expect(mockCopyQuizQuestionsToTask).not.toHaveBeenCalled();
      expect(mockShowSuccessToast).toHaveBeenCalledWith('Cloned just fine');
    });

    it('reports the quizzes whose questions could not be copied', async () => {
      mockCloneCourse.mockResolvedValue(makeClonedQuizResponse());
      mockCopyQuizQuestionsToTask.mockRejectedValue(new Error('boom'));
      await renderOpenModal({ course: makeQuizCourse() });

      fireEvent.click(getCloneButton());

      await waitFor(() =>
        expect(mockShowErrorToast).toHaveBeenCalledWith(
          'Course cloned, but the questions could not be copied for: Quiz One.'
        )
      );
      expect(mockShowSuccessToast).not.toHaveBeenCalled();
      // the course itself was cloned, so the modal still closes
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('Dark theme', () => {
    it('applies dark surface colors to the modal', async () => {
      mockIsDark = true;
      await renderOpenModal();

      const content = document.querySelector(
        '.mantine-Modal-content'
      ) as HTMLElement;
      expect(content.style.backgroundColor).toBe('rgb(30, 41, 59)');
    });
  });
});
