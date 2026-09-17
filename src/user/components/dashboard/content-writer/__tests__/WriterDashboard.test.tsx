import {
  render,
  screen,
  fireEvent,
  waitFor,
  within
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import WriterDashboard from '../WriterDashboard';

let mockCourses: any[] = [];
let mockIsLoading = false;

jest.mock('@constants', () => ({
  ROLES: { ADMIN: 'admin' },
  BASE_URL: 'http://localhost:3000'
}));

jest.mock('@hooks/queries/useUserQueries', () => ({
  useGetAllCoursesByUser: () => ({
    data: mockCourses,
    isLoading: mockIsLoading
  })
}));

const mockUpdateCourse = jest.fn();
jest.mock('@hooks/mutations/useUserMutations', () => ({
  useUpdateCourse: () => ({
    mutateAsync: mockUpdateCourse
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

jest.mock('@utils/common/get-error-message', () => ({
  getErrorMessage: (error: any, fallback: string) =>
    error?.response?.data?.message || error?.message || fallback
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    organizationConfig: { organization_name: 'srytal' },
    isDarkTheme: false
  })
}));

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => false
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, ...props }: any) => (
    <button type='button' onClick={onClick} disabled={props.disabled}>
      {children}
    </button>
  )
}));

jest.mock('../CourseCard', () => (props: any) => (
  <div data-testid='course-card'>
    <span>{props.course.courseName}</span>
    <button onClick={() => props.onEdit?.(props.course._id)}>Edit</button>
    <button onClick={() => props.onArchive?.(props.course._id)}>Archive</button>
    <button onClick={() => props.onDelete?.(props.course._id)}>Delete</button>
  </div>
));

jest.mock('../../edit-course/EditCourseModal', () => (props: any) => (
  <div
    data-testid='edit-course-modal'
    data-opened={String(!!props.opened)}
    data-course={props.course?._id}
  />
));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

const makeCourse = (overrides: any = {}) => ({
  _id: 'c1',
  courseName: 'React Basics',
  courseDescription: '<p>Learn React fundamentals</p>',
  status: 'ACTIVE',
  thumbnailUrl: 'http://example.com/thumb.png',
  updatedAt: new Date('2024-05-01T12:00:00Z'),
  createdAt: new Date('2024-04-01T12:00:00Z'),
  modules: [{ _id: 'm1', tasks: [{ _id: 't1' }, { _id: 't2' }] }],
  ...overrides
});

const makeCourses = (count: number) =>
  Array.from({ length: count }, (_, i) =>
    makeCourse({
      _id: `c${i + 1}`,
      courseName: `Course ${String(i + 1).padStart(2, '0')}`
    })
  );

const renderDashboard = () => {
  return render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <WriterDashboard />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

const fmtDate = (d: Date) =>
  d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

const expectStat = (label: string, value: number) => {
  const card = screen
    .getByText(label)
    .closest('.mantine-Card-root') as HTMLElement;
  expect(within(card).getByText(String(value))).toBeInTheDocument();
};

const cardButton = (name: string) =>
  within(screen.getAllByTestId('course-card')[0]).getByRole('button', {
    name
  });

describe('WriterDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    localStorage.setItem('userRole', 'employee');
    mockCourses = [];
    mockIsLoading = false;
    mockUpdateCourse.mockResolvedValue({});
  });

  describe('Rendering', () => {
    it('renders the page title, subtitle and New Course button', () => {
      mockCourses = [makeCourse()];
      renderDashboard();
      expect(screen.getByText('Content Writer')).toBeInTheDocument();
      expect(
        screen.getByText('Create and manage your courses, modules, and tasks')
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'New Course' })
      ).toBeInTheDocument();
    });

    it('renders stat cards with computed totals', () => {
      mockCourses = [
        makeCourse({
          modules: [{ _id: 'm1', tasks: [{ _id: 't1' }, { _id: 't2' }] }]
        }),
        makeCourse({
          _id: 'c2',
          modules: [
            { _id: 'm1', tasks: [{ _id: 't1' }, { _id: 't2' }, { _id: 't3' }] },
            { _id: 'm2', tasks: [{ _id: 't1' }] }
          ]
        })
      ];
      renderDashboard();

      expectStat('Total Courses', 2);
      expectStat('Total Modules', 3);
      expectStat('Total Tasks', 6);
    });

    it('renders the My Courses section with course cards', () => {
      mockCourses = [makeCourse()];
      renderDashboard();

      expect(screen.getByText('My Courses')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Search courses...')
      ).toBeInTheDocument();
      expect(screen.getAllByTestId('course-card').length).toBe(1);
      expect(
        within(screen.getAllByTestId('course-card')[0]).getByText(
          'React Basics'
        )
      ).toBeInTheDocument();
    });

    it('renders the Recent Activity sidebar with dates and status badges', () => {
      mockCourses = [
        makeCourse({
          _id: 'cA',
          courseName: 'Archived Course',
          status: 'ARCHIVE',
          updatedAt: new Date('2024-05-01T12:00:00Z')
        }),
        makeCourse({
          _id: 'cB',
          courseName: 'Recent Course',
          status: 'ACTIVE',
          updatedAt: new Date('2024-06-01T12:00:00Z')
        })
      ];
      renderDashboard();

      const recent = screen
        .getByText('Recent Activity')
        .closest('.mantine-Card-root') as HTMLElement;

      expect(recent).toBeTruthy();
      expect(within(recent).getByText('Archived Course')).toBeInTheDocument();
      expect(within(recent).getByText('Recent Course')).toBeInTheDocument();
      expect(within(recent).getByText('Active')).toBeInTheDocument();
      expect(within(recent).getByText('Archived')).toBeInTheDocument();
      expect(
        within(recent).getByText(fmtDate(new Date('2024-05-01T12:00:00Z')))
      ).toBeInTheDocument();
      expect(
        within(recent).getByText(fmtDate(new Date('2024-06-01T12:00:00Z')))
      ).toBeInTheDocument();
    });

    it('shows an empty state with a Create Course button when there are no courses', () => {
      renderDashboard();

      expect(screen.getByText('No courses yet')).toBeInTheDocument();
      expect(
        screen.getByText('Create your first course to start building content')
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Create Course' })
      ).toBeInTheDocument();
      expect(screen.queryAllByTestId('course-card').length).toBe(0);
    });

    it('shows a placeholder when there is no recent activity', () => {
      renderDashboard();
      expect(screen.getByText('No recent activity')).toBeInTheDocument();
    });

    it('shows skeletons while loading', () => {
      mockIsLoading = true;
      const { container } = renderDashboard();
      expect(
        container.querySelectorAll('.mantine-Skeleton-root').length
      ).toBeGreaterThan(0);
      expect(screen.queryByText('Content Writer')).not.toBeInTheDocument();
    });
  });

  describe('Search and Pagination', () => {
    it('filters courses by name', () => {
      mockCourses = [
        makeCourse({ _id: 'c1', courseName: 'React Basics' }),
        makeCourse({
          _id: 'c2',
          courseName: 'Angular Advanced',
          courseDescription: 'Master Angular templating'
        })
      ];
      renderDashboard();

      fireEvent.change(screen.getByPlaceholderText('Search courses...'), {
        target: { value: 'react' }
      });

      const cards = screen.getAllByTestId('course-card');
      expect(cards.length).toBe(1);
      expect(within(cards[0]).getByText('React Basics')).toBeInTheDocument();
      expect(
        within(cards[0]).queryByText('Angular Advanced')
      ).not.toBeInTheDocument();
    });

    it('shows a no-match state and clears the search via the X button', () => {
      mockCourses = makeCourses(2);
      renderDashboard();

      fireEvent.change(screen.getByPlaceholderText('Search courses...'), {
        target: { value: 'zzz' }
      });

      expect(screen.getByText('No matching courses')).toBeInTheDocument();
      expect(
        screen.getByText('Try adjusting your search term')
      ).toBeInTheDocument();

      const clearButton = document
        .querySelector('.tabler-icon-x')
        ?.closest('button') as HTMLButtonElement;
      expect(clearButton).toBeTruthy();
      fireEvent.click(clearButton);

      expect(screen.getAllByTestId('course-card').length).toBe(2);
    });

    it('paginates courses 6 per page and moves to the next page', () => {
      mockCourses = makeCourses(7);
      renderDashboard();

      expect(screen.getAllByTestId('course-card').length).toBe(6);
      expect(screen.queryByText('Course 07')).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: '2' }));

      expect(screen.getAllByTestId('course-card').length).toBe(1);
      expect(screen.getByText('Course 07')).toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    it('opens the edit modal with the selected course when Edit is clicked', () => {
      mockCourses = [makeCourse()];
      renderDashboard();

      const modal = screen.getByTestId('edit-course-modal');
      expect(modal).toHaveAttribute('data-opened', 'false');

      fireEvent.click(cardButton('Edit'));

      expect(screen.getByTestId('edit-course-modal')).toHaveAttribute(
        'data-opened',
        'true'
      );
      expect(screen.getByTestId('edit-course-modal')).toHaveAttribute(
        'data-course',
        'c1'
      );
    });

    it('archives a course on success', async () => {
      mockCourses = [
        makeCourse({
          _id: 'c1',
          courseName: 'React Basics',
          courseDescription: '<p>Learn React fundamentals</p>'
        })
      ];
      renderDashboard();

      fireEvent.click(cardButton('Archive'));

      await waitFor(() => {
        expect(mockUpdateCourse).toHaveBeenCalledWith({
          id: 'c1',
          courseName: 'React Basics',
          courseDescription: '<p>Learn React fundamentals</p>',
          status: 'ARCHIVE'
        });
      });
      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Course archived successfully!'
      );
    });

    it('shows an error toast when archiving fails', async () => {
      mockUpdateCourse.mockRejectedValueOnce({});
      mockCourses = [makeCourse()];
      renderDashboard();

      fireEvent.click(cardButton('Archive'));

      await waitFor(() => {
        expect(mockShowErrorToast).toHaveBeenCalledWith(
          'Failed to archive course'
        );
      });
    });

    it('opens and confirms the delete modal', async () => {
      mockCourses = [makeCourse()];
      renderDashboard();

      fireEvent.click(cardButton('Delete'));

      const dialog = await screen.findByRole('dialog');
      expect(within(dialog).getByText('Delete Course')).toBeInTheDocument();
      expect(
        within(dialog).getByText(/Are you sure you want to delete this course/)
      ).toBeInTheDocument();

      fireEvent.click(within(dialog).getByRole('button', { name: 'Delete' }));

      await waitFor(() =>
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      );
    });

    it('cancels and closes the delete modal', async () => {
      mockCourses = [makeCourse()];
      renderDashboard();

      fireEvent.click(cardButton('Delete'));

      const dialog = await screen.findByRole('dialog');
      fireEvent.click(within(dialog).getByRole('button', { name: 'Cancel' }));

      await waitFor(() =>
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      );
    });
  });

  describe('Navigation', () => {
    it('navigates to add course from the New Course button', () => {
      renderDashboard();
      fireEvent.click(screen.getByRole('button', { name: 'New Course' }));
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/employee/dashboard/add-course'
      );
    });

    it('navigates to add course from the empty state button', () => {
      renderDashboard();
      fireEvent.click(screen.getByRole('button', { name: 'Create Course' }));
      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/employee/dashboard/add-course'
      );
    });

    it('navigates to a course detail page from recent activity', () => {
      mockCourses = [
        makeCourse({
          _id: 'cA',
          courseName: 'Archived Course',
          status: 'ARCHIVE'
        }),
        makeCourse({ _id: 'cB', courseName: 'Recent Course', status: 'ACTIVE' })
      ];
      renderDashboard();

      const recent = screen
        .getByText('Recent Activity')
        .closest('.mantine-Card-root') as HTMLElement;
      fireEvent.click(within(recent).getByText('Recent Course'));

      expect(mockNavigate).toHaveBeenCalledWith(
        '/srytal/employee/dashboard/course/cB'
      );
    });
  });
});
