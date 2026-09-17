import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import AssignedCourseCard from '../AssignedCourseCard';
import { AssignedCourse } from '@interfaces/course-assignment';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      borderColor: '#dee2e6',
      mutedTextColor: '#868e96',
      primaryColor: '#1971c2',
      dangerColor: '#fa5252'
    },
    isDarkTheme: false
  })
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick }: any) => (
    <button type='button' onClick={onClick}>
      {children}
    </button>
  )
}));

jest.mock('../../content-writer/CourseThumbnail', () => () => (
  <div data-testid='course-thumbnail' />
));

const today = new Date();
today.setHours(0, 0, 0, 0);

const daysFromNow = (days: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

const makeCourse = (
  overrides: Partial<AssignedCourse> = {}
): AssignedCourse => ({
  courseAssignmentId: 'ca1',
  courseId: 'c1',
  courseName: 'TypeScript Mastery',
  courseDescription: 'Learn TypeScript deeply',
  thumbnailUrl: 'http://example.com/ts.png',
  status: 'In Progress',
  assignedAt: '2024-05-01T00:00:00Z',
  dueDate: daysFromNow(3),
  isOverdue: false,
  totalModules: 4,
  progress: {
    totalTasks: 20,
    completedTasks: 8,
    percentComplete: 40
  },
  ...overrides
});

const renderCard = (course: AssignedCourse, onOpen = jest.fn()) => {
  return {
    onOpen,
    ...render(
      <MantineProvider>
        <AssignedCourseCard course={course} onOpen={onOpen} />
      </MantineProvider>
    )
  };
};

const formatLikeDueDate = (dueDate: string) => {
  const d = new Date(dueDate);
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

describe('AssignedCourseCard', () => {
  it('renders the course name, counts and progress', () => {
    renderCard(makeCourse());

    expect(screen.getByText('TypeScript Mastery')).toBeInTheDocument();
    expect(screen.getByText('4 modules')).toBeInTheDocument();
    expect(screen.getByText('20 items')).toBeInTheDocument();
    expect(screen.getByText('8/20 complete')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
    expect(screen.getByTestId('course-thumbnail')).toBeInTheDocument();
  });

  it('shows the Not started label for an assigned course', () => {
    renderCard(makeCourse({ status: 'Assigned' }));
    expect(screen.getByText('Not started')).toBeInTheDocument();
  });

  it('shows Overdue badge and overdue hint when overdue', () => {
    renderCard(
      makeCourse({
        isOverdue: true,
        status: 'In Progress',
        dueDate: daysFromNow(-2)
      })
    );

    expect(screen.getByText('Overdue')).toBeInTheDocument();
    expect(screen.getByText('2 days overdue')).toBeInTheDocument();
  });

  describe('action label', () => {
    it('shows Start course with no completed tasks', () => {
      renderCard(
        makeCourse({
          status: 'Assigned',
          progress: { totalTasks: 10, completedTasks: 0, percentComplete: 0 }
        })
      );
      expect(screen.getByText('Start course')).toBeInTheDocument();
    });

    it('shows Review course when completed', () => {
      renderCard(
        makeCourse({
          status: 'Completed',
          progress: {
            totalTasks: 10,
            completedTasks: 10,
            percentComplete: 100
          }
        })
      );
      expect(screen.getByText('Review course')).toBeInTheDocument();
    });

    it('shows Continue otherwise', () => {
      renderCard(makeCourse());
      expect(screen.getByText('Continue')).toBeInTheDocument();
    });
  });

  describe('due hint', () => {
    it('shows the raw due date when completed', () => {
      const dueDate = daysFromNow(9);
      renderCard(
        makeCourse({
          status: 'Completed',
          dueDate,
          progress: {
            totalTasks: 10,
            completedTasks: 10,
            percentComplete: 100
          }
        })
      );
      expect(screen.getByText(formatLikeDueDate(dueDate))).toBeInTheDocument();
    });

    it('shows No due date when missing', () => {
      renderCard(makeCourse({ dueDate: '' }));
      expect(screen.getByText('No due date')).toBeInTheDocument();
    });

    it.each([
      [0, 'Due today'],
      [1, 'Due tomorrow'],
      [5, 'Due in 5 days'],
      [14, 'Due in 14 days']
    ])('handles %i days ahead', (days, label) => {
      renderCard(makeCourse({ dueDate: daysFromNow(days) }));
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    it('shows a formatted date beyond two weeks', () => {
      const dueDate = daysFromNow(21);
      renderCard(makeCourse({ dueDate }));
      expect(
        screen.getByText(`Due ${formatLikeDueDate(dueDate)}`)
      ).toBeInTheDocument();
    });
  });

  it('opens the course when the card is clicked', () => {
    const { onOpen } = renderCard(makeCourse());
    fireEvent.click(screen.getByText('TypeScript Mastery'));

    expect(onOpen).toHaveBeenCalledWith('ca1');
  });

  it('opens the course via the button without double-firing the card click', () => {
    const { onOpen } = renderCard(makeCourse());
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onOpen).toHaveBeenCalledWith('ca1');
  });
});
