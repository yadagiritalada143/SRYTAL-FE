import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import EditCourseModal from '../EditCourseModal';

jest.mock('@hooks/mutations/useUserMutations', () => ({
  useUpdateCourse: () => ({
    mutateAsync: mockUpdateCourse,
    isPending: false
  })
}));

const mockUpdateCourse = jest.fn();

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
      headerBackgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: false
  })
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, disabled, type, loading }: any) => (
    <button type={type ?? 'button'} onClick={onClick} disabled={disabled}>
      {loading ? 'Saving...' : children}
    </button>
  )
}));

jest.mock('../DescriptionEditor', () => (props: any) => (
  <div>
    <label>{props.label}</label>
    <input
      aria-label={props.label}
      value={props.value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        props.onChange(e.target.value)
      }
    />
  </div>
));

jest.mock('../../content-writer/CourseThumbnail', () => (props: any) => (
  <span data-testid='course-thumbnail' aria-label={props.name} />
));

jest.mock('@mantine/core', () => {
  const actual = jest.requireActual('@mantine/core');
  return {
    ...actual,
    Modal: ({ opened, children, title }: any) =>
      opened ? (
        <div data-testid='modal'>
          <div>{title}</div>
          {children}
        </div>
      ) : null,
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

const mockOnClose = jest.fn();

const makeCourse = (overrides: any = {}) => ({
  _id: 'c1',
  courseName: 'React Basics',
  courseDescription: '<p>Learn React fundamentals</p>',
  status: 'ACTIVE',
  thumbnailUrl: 'http://example.com/thumb.png',
  thumbnail: 's3-key/react-basics.png',
  modules: [],
  ...overrides
});

const renderModal = (course: ReturnType<typeof makeCourse> | undefined) => {
  return render(
    <MantineProvider>
      <EditCourseModal opened onClose={mockOnClose} course={course} />
    </MantineProvider>
  );
};

describe('EditCourseModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUpdateCourse.mockResolvedValue({});
  });

  describe('Rendering', () => {
    it('renders the dialog with Edit Course title', () => {
      renderModal(makeCourse());
      expect(screen.getByText('Edit Course')).toBeInTheDocument();
    });

    it('seeds the course name field from the course prop', () => {
      renderModal(makeCourse({ courseName: 'Advanced Hooks' }));
      expect(screen.getByLabelText(/Course Name/)).toHaveValue(
        'Advanced Hooks'
      );
    });

    it('seeds the description editor from the course prop', () => {
      renderModal(makeCourse({ courseDescription: '<p>Detailed text</p>' }));
      expect(screen.getByLabelText('Course Description')).toHaveValue(
        '<p>Detailed text</p>'
      );
    });

    it('shows the current thumbnail when a thumbnail exists', () => {
      renderModal(makeCourse({ thumbnailUrl: 'http://example.com/thumb.png' }));
      expect(screen.getByText('Current thumbnail')).toBeInTheDocument();
      expect(
        screen.getByText('Pick a file below to replace it')
      ).toBeInTheDocument();
      expect(screen.getByTestId('course-thumbnail')).toBeInTheDocument();
    });

    it('does not show a thumbnail preview when no thumbnail exists', () => {
      renderModal(makeCourse({ thumbnailUrl: '', thumbnail: '' }));
      expect(screen.queryByText('Current thumbnail')).not.toBeInTheDocument();
    });

    it('renders the status select', () => {
      renderModal(makeCourse());
      expect(screen.getByLabelText('Status')).toBeInTheDocument();
    });
  });

  describe('Submit', () => {
    it('calls updateCourse with the form values on success', async () => {
      renderModal(makeCourse());

      fireEvent.change(screen.getByLabelText(/Course Name/), {
        target: { value: 'Advanced React' }
      });
      fireEvent.change(screen.getByLabelText('Course Description'), {
        target: { value: '<p>Updated content</p>' }
      });
      fireEvent.change(screen.getByLabelText('Status'), {
        target: { value: 'ARCHIVE' }
      });

      fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

      await waitFor(() => {
        expect(mockUpdateCourse).toHaveBeenCalledTimes(1);
      });

      expect(mockUpdateCourse).toHaveBeenCalledWith({
        id: 'c1',
        courseName: 'Advanced React',
        courseDescription: '<p>Updated content</p>',
        thumbnail: null,
        status: 'ARCHIVE'
      });

      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Course updated successfully!'
      );
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('trims the course name on submit', async () => {
      renderModal(makeCourse());

      fireEvent.change(screen.getByLabelText(/Course Name/), {
        target: { value: '  Padded Name  ' }
      });

      fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

      await waitFor(() => {
        expect(mockUpdateCourse).toHaveBeenCalledWith(
          expect.objectContaining({ courseName: 'Padded Name' })
        );
      });
    });

    it('shows an error toast when the mutation fails', async () => {
      mockUpdateCourse.mockRejectedValueOnce({
        response: { data: { message: 'Update rejected' } }
      });

      renderModal(makeCourse());

      fireEvent.change(screen.getByLabelText(/Course Name/), {
        target: { value: 'Updated Name' }
      });

      fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

      await waitFor(() => {
        expect(mockShowErrorToast).toHaveBeenCalledWith('Update rejected');
      });
      expect(mockShowSuccessToast).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('shows a fallback error message when the error has no message', async () => {
      mockUpdateCourse.mockRejectedValueOnce({});

      renderModal(makeCourse());

      fireEvent.change(screen.getByLabelText(/Course Name/), {
        target: { value: 'Updated Name' }
      });

      fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

      await waitFor(() => {
        expect(mockShowErrorToast).toHaveBeenCalledWith(
          'Failed to update course'
        );
      });
    });
  });

  describe('Cancel', () => {
    it('calls onClose when Cancel is clicked', () => {
      renderModal(makeCourse());
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
