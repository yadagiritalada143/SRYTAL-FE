import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { act } from 'react';

let mockEmployees: any[] = [];
let mockCourses: any[] = [];
let mockEmployeeLoading = false;
let mockCoursesLoading = false;
let mockDetailedCourse: any = null;

jest.mock('@hooks/queries/useAdminQueries', () => ({
  useGetAllEmployeesByAdmin: () => ({
    data: mockEmployees,
    isLoading: mockEmployeeLoading
  }),
  useGetAllCoursesByAdmin: () => ({
    data: mockCourses,
    isLoading: mockCoursesLoading
  }),
  useGetCourseByIdAdmin: () => ({
    data: mockDetailedCourse,
    isLoading: false
  })
}));

const mockMutateAsync = jest.fn();
jest.mock('@hooks/mutations/useAdminMutations', () => ({
  useAssignCourseToEmployee: () => ({
    mutateAsync: mockMutateAsync,
    isPending: false
  })
}));

const mockShowSuccessToast = jest.fn();
const mockShowErrorToast = jest.fn();
jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    organizationConfig: { organization_name: 'srytal' }
  })
}));

jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: mockShowSuccessToast,
    showErrorToast: mockShowErrorToast
  })
}));

jest.mock('@utils/common/get-error-message', () => ({
  getErrorMessage: (_error: any, fallback: string) => fallback
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

jest.mock('@components/common/loaders/DataView', () => (props: any) => (
  <div data-testid='data-view'>
    {props.isLoading && <span>loading</span>}
    {props.children}
  </div>
));

jest.mock('@mantine/dates', () => ({
  DatePickerInput: ({ value, onChange }: any) => (
    <input
      data-testid='due-date-input'
      value={value ? value.toISOString() : ''}
      onChange={() => onChange(new Date('2026-12-31'))}
    />
  )
}));

const CourseAssignments = require('../CourseAssignments').default;

const renderAssignCourse = () => {
  return render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <CourseAssignments />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

const mockEmployeesData = [
  {
    _id: 'emp1',
    id: 'emp1',
    firstName: 'John',
    lastName: 'Doe',
    employeeId: 'EMP-001',
    userRole: 'Employee',
    employeeRole: [{ designation: 'Developer' }]
  },
  {
    _id: 'emp2',
    id: 'emp2',
    firstName: 'Jane',
    lastName: 'Smith',
    employeeId: 'EMP-002',
    userRole: 'Recruiter'
  }
];

const mockCoursesData = [
  {
    _id: 'c1',
    courseName: 'React Fundamentals',
    status: 'ACTIVE',
    modules: [{ _id: 'm1', tasks: [{ _id: 't1' }] }]
  },
  {
    _id: 'c2',
    courseName: 'Node.js Advanced',
    status: 'ARCHIVE',
    modules: [{ _id: 'm2', tasks: [{ _id: 't2' }, { _id: 't3' }] }]
  }
];

describe('CourseAssignments Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockEmployees = mockEmployeesData;
    mockCourses = mockCoursesData;
    mockEmployeeLoading = false;
    mockCoursesLoading = false;
    mockDetailedCourse = null;
  });

  describe('Rendering', () => {
    it('renders the page header and subtitle', () => {
      renderAssignCourse();
      expect(screen.getAllByText('Assign Course').length).toBeGreaterThanOrEqual(1);
      expect(
        screen.getByText('Assign a course to an employee')
      ).toBeInTheDocument();
    });

    it('renders the back button', () => {
      renderAssignCourse();
      expect(screen.getByText('Back')).toBeInTheDocument();
    });

    it('renders form section headings', () => {
      renderAssignCourse();
      expect(screen.getByText('Select Employee')).toBeInTheDocument();
      expect(screen.getByText('Select Course')).toBeInTheDocument();
      expect(screen.getByText('Due Date')).toBeInTheDocument();
    });

    it('renders placeholder summary card', () => {
      renderAssignCourse();
      expect(
        screen.getByText(
          /select an employee, course, and due date to see the summary/i
        )
      ).toBeInTheDocument();
    });

    it('renders the Assign Course submit button as disabled initially', () => {
      renderAssignCourse();
      expect(
        screen.getByRole('button', { name: /assign course/i })
      ).toBeDisabled();
    });

    it('renders Cancel button', () => {
      renderAssignCourse();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('renders section descriptions', () => {
      renderAssignCourse();
      expect(screen.getByText('Choose the employee to assign this course to')).toBeInTheDocument();
      expect(screen.getByText('Choose the course to assign')).toBeInTheDocument();
      expect(screen.getByText('Set a deadline for this assignment')).toBeInTheDocument();
    });
  });

  describe('Loading state', () => {
    it('shows loading when employees are loading', () => {
      mockEmployeeLoading = true;
      renderAssignCourse();
      expect(screen.getByText('loading')).toBeInTheDocument();
    });

    it('shows loading when courses are loading', () => {
      mockCoursesLoading = true;
      renderAssignCourse();
      expect(screen.getByText('loading')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('navigates back when Back button is clicked', () => {
      renderAssignCourse();
      fireEvent.click(screen.getByText('Back'));
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });

  describe('Form submission', () => {
    it('calls mutateAsync and shows success toast on successful submit', async () => {
      mockMutateAsync.mockResolvedValueOnce({});
      renderAssignCourse();

      const empSelect = screen.getByPlaceholderText('Search by ID or name...');
      fireEvent.mouseDown(empSelect);
      fireEvent.click(screen.getByText(/John Doe/));

      const courseSelect = screen.getByPlaceholderText('Search courses...');
      fireEvent.mouseDown(courseSelect);
      fireEvent.click(screen.getByText('React Fundamentals'));

      const dueDateInput = screen.getByTestId('due-date-input');
      fireEvent.change(dueDateInput, { target: { value: '2026-12-31' } });

      const submitBtn = screen.getByRole('button', { name: /assign course/i });
      expect(submitBtn).not.toBeDisabled();

      await act(async () => {
        fireEvent.click(submitBtn);
      });

      expect(mockMutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          employeeId: 'emp1',
          courseId: 'c1'
        })
      );
      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Course assigned successfully!'
      );
    });

    it('shows error toast when submission fails', async () => {
      mockMutateAsync.mockRejectedValueOnce(new Error('Failed'));
      renderAssignCourse();

      const empSelect = screen.getByPlaceholderText('Search by ID or name...');
      fireEvent.mouseDown(empSelect);
      fireEvent.click(screen.getByText(/John Doe/));

      const courseSelect = screen.getByPlaceholderText('Search courses...');
      fireEvent.mouseDown(courseSelect);
      fireEvent.click(screen.getByText('React Fundamentals'));

      const dueDateInput = screen.getByTestId('due-date-input');
      fireEvent.change(dueDateInput, { target: { value: '2026-12-31' } });

      const submitBtn = screen.getByRole('button', { name: /assign course/i });
      await act(async () => {
        fireEvent.click(submitBtn);
      });

      expect(mockShowErrorToast).toHaveBeenCalledWith(
        'Failed to assign course. Please try again.'
      );
    });
  });

  describe('Course options', () => {
    it('renders course options with status badges', () => {
      renderAssignCourse();
      expect(screen.getByText('React Fundamentals')).toBeInTheDocument();
      expect(screen.getByText('Node.js Advanced')).toBeInTheDocument();
    });
  });

  describe('Employee options', () => {
    it('renders employee options', () => {
      renderAssignCourse();
      expect(screen.getByText(/EMP-001 - John Doe/)).toBeInTheDocument();
      expect(screen.getByText(/EMP-002 - Jane Smith/)).toBeInTheDocument();
    });
  });

  describe('Empty data', () => {
    it('renders correctly with no employees or courses', () => {
      mockEmployees = [];
      mockCourses = [];
      renderAssignCourse();
      expect(
        screen.getAllByText('Assign Course').length
      ).toBeGreaterThanOrEqual(1);
    });
  });
});