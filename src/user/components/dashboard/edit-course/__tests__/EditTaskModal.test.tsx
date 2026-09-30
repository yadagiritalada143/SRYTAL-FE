import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import EditTaskModal from '../EditTaskModal';

jest.mock('@hooks/mutations/useUserMutations', () => ({
  useUpdateCourseTask: () => ({
    mutateAsync: mockUpdateTask,
    isPending: false
  }),
  useAddCourseTaskQuestion: () => ({
    mutateAsync: mockAddQuestion,
    isPending: false
  }),
  useUpdateCourseTaskQuestion: () => ({
    mutateAsync: mockUpdateQuestion,
    isPending: false
  }),
  useDeleteCourseTaskQuestion: () => ({
    mutateAsync: mockDeleteQuestion,
    isPending: false
  })
}));

const mockUpdateTask = jest.fn();
const mockAddQuestion = jest.fn();
const mockUpdateQuestion = jest.fn();
const mockDeleteQuestion = jest.fn();

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

jest.mock('../../content-writer/CourseThumbnail', () => (props: any) => (
  <span data-testid='course-thumbnail' aria-label={props.name} />
));

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

const makeTask = (overrides: any = {}) => ({
  _id: 't1',
  taskName: 'Introduction video',
  taskDescription: 'Watch this intro',
  status: 'ACTIVE',
  type: 'LINK',
  content: 'https://youtube.com/watch?v=abc123',
  contentFileName: undefined,
  thumbnailUrl: 'http://example.com/thumb.png',
  thumbnail: 's3-key/task-thumb.png',
  ...overrides
});

const renderModal = (
  task: ReturnType<typeof makeTask> | undefined,
  courseId = 'c1'
) => {
  return render(
    <MantineProvider>
      <EditTaskModal
        opened
        onClose={mockOnClose}
        task={task}
        courseId={courseId}
      />
    </MantineProvider>
  );
};

describe('EditTaskModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUpdateTask.mockResolvedValue({});
    mockAddQuestion.mockResolvedValue({});
    mockUpdateQuestion.mockResolvedValue({});
    mockDeleteQuestion.mockResolvedValue({});
  });

  describe('Rendering', () => {
    it('renders the dialog with Edit Content title', () => {
      renderModal(makeTask());
      expect(screen.getByText('Edit Content')).toBeInTheDocument();
    });

    it('seeds the title field from the task prop', () => {
      renderModal(makeTask({ taskName: 'Advanced topic' }));
      expect(screen.getByLabelText(/Title/)).toHaveValue('Advanced topic');
    });

    it('seeds the description textarea from the task prop', () => {
      renderModal(makeTask({ taskDescription: 'Read this carefully' }));
      expect(screen.getByLabelText('Description')).toHaveValue(
        'Read this carefully'
      );
    });

    it('shows the current thumbnail when a thumbnail exists', () => {
      renderModal(makeTask({ thumbnailUrl: 'http://example.com/thumb.png' }));
      expect(screen.getByText('Current thumbnail')).toBeInTheDocument();
      expect(
        screen.getByText('Pick a file below to replace it')
      ).toBeInTheDocument();
    });

    it('does not show a thumbnail preview when no thumbnail exists', () => {
      renderModal(makeTask({ thumbnailUrl: '', thumbnail: '' }));
      expect(screen.queryByText('Current thumbnail')).not.toBeInTheDocument();
    });

    it('hides the attached content for coding tasks but keeps the thumbnail', () => {
      renderModal(
        makeTask({
          isCoding: true,
          thumbnailUrl: 'http://example.com/thumb.png',
          content: 'https://youtube.com/watch?v=abc123'
        })
      );
      expect(screen.getByText('Current thumbnail')).toBeInTheDocument();
      expect(screen.queryByText('Attached Content')).not.toBeInTheDocument();
    });

    it('renders the status select', () => {
      renderModal(makeTask());
      expect(screen.getByLabelText('Status')).toBeInTheDocument();
    });

    it('shows the Question textarea only for coding tasks', () => {
      const first = renderModal(
        makeTask({ isCoding: true, question: 'Reverse a string.' })
      );
      expect(
        screen.getByPlaceholderText('Describe the coding problem to solve')
      ).toHaveValue('Reverse a string.');
      first.unmount();

      renderModal(makeTask({ isCoding: false, question: '' }));
      expect(
        screen.queryByPlaceholderText('Describe the coding problem to solve')
      ).not.toBeInTheDocument();
    });
  });

  describe('Attached content display', () => {
    it('shows the link URL for a LINK task', () => {
      renderModal(
        makeTask({
          type: 'LINK',
          content: 'https://youtube.com/watch?v=abc123'
        })
      );
      expect(
        screen.getByText('https://youtube.com/watch?v=abc123')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Link — replace by adding new content')
      ).toBeInTheDocument();
    });

    it('shows the file name for a FILE task', () => {
      renderModal(
        makeTask({
          type: 'FILE',
          content: undefined,
          contentFileName: 'lecture-notes.pdf'
        })
      );
      expect(screen.getByText('lecture-notes.pdf')).toBeInTheDocument();
      expect(
        screen.getByText('File — replace by adding new content')
      ).toBeInTheDocument();
    });

    it('shows a fallback label when content info is missing', () => {
      renderModal(makeTask({ type: 'FILE', contentFileName: undefined }));
      expect(screen.getByText('Uploaded file')).toBeInTheDocument();
    });
  });

  describe('Submit', () => {
    it('calls updateTask with the form values on success', async () => {
      renderModal(makeTask());

      fireEvent.change(screen.getByLabelText(/Title/), {
        target: { value: 'Updated title' }
      });
      fireEvent.change(screen.getByLabelText('Description'), {
        target: { value: 'Updated description' }
      });
      fireEvent.change(screen.getByLabelText('Status'), {
        target: { value: 'ARCHIVE' }
      });

      fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

      await waitFor(() => {
        expect(mockUpdateTask).toHaveBeenCalledTimes(1);
      });

      expect(mockUpdateTask).toHaveBeenCalledWith({
        id: 't1',
        taskName: 'Updated title',
        taskDescription: 'Updated description',
        thumbnail: null,
        status: 'ARCHIVE'
      });

      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Content updated successfully!'
      );
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('trims the task name on submit', async () => {
      renderModal(makeTask());

      fireEvent.change(screen.getByLabelText(/Title/), {
        target: { value: '  Padded  ' }
      });

      fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

      await waitFor(() => {
        expect(mockUpdateTask).toHaveBeenCalledWith(
          expect.objectContaining({ taskName: 'Padded' })
        );
      });
    });

    it('submits the legacy question and adds a new question for a legacy task', async () => {
      renderModal(
        makeTask({
          isCoding: true,
          question: 'Return fizz for multiples of three.'
        })
      );

      fireEvent.change(
        screen.getByPlaceholderText('Describe the coding problem to solve'),
        {
          target: { value: 'Return buzz for multiples of five.' }
        }
      );

      fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

      await waitFor(() => {
        expect(mockUpdateTask).toHaveBeenCalledWith({
          id: 't1',
          taskName: 'Introduction video',
          taskDescription: 'Watch this intro',
          thumbnail: null,
          status: 'ACTIVE',
          isCoding: true,
          question: 'Return buzz for multiples of five.'
        });
      });

      // A legacy task has no persisted questions — the draft goes through the
      // dedicated add-question endpoint (the task update never writes arrays).
      await waitFor(() => {
        expect(mockAddQuestion).toHaveBeenCalledWith({
          taskId: 't1',
          question: 'Return buzz for multiples of five.'
        });
      });
    });

    it('updates and deletes persisted questions via the per-question endpoints', async () => {
      renderModal(
        makeTask({
          isCoding: true,
          question: 'First question',
          questions: [
            {
              questionId: 'q1',
              question: 'First question',
              status: 'ACTIVE'
            },
            {
              questionId: 'q2',
              question: 'Second question',
              status: 'ACTIVE'
            }
          ]
        })
      );

      fireEvent.change(
        screen.getAllByPlaceholderText(
          'Describe the coding problem to solve'
        )[0],
        { target: { value: 'First question (edited)' } }
      );

      fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[1]);

      fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

      await waitFor(() => {
        expect(mockUpdateQuestion).toHaveBeenCalledWith({
          taskId: 't1',
          questionId: 'q1',
          question: 'First question (edited)'
        });
      });

      await waitFor(() => {
        expect(mockDeleteQuestion).toHaveBeenCalledWith({
          taskId: 't1',
          questionId: 'q2'
        });
      });

      // The remaining question is the task's legacy `question`.
      expect(mockUpdateTask).toHaveBeenCalledWith(
        expect.objectContaining({
          isCoding: true,
          question: 'First question (edited)'
        })
      );
    });

    it('does not send question fields for non-coding tasks', async () => {
      renderModal(makeTask({ isCoding: false, question: '' }));

      fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

      await waitFor(() => {
        expect(mockUpdateTask).toHaveBeenCalledWith(
          expect.not.objectContaining({ question: expect.anything() })
        );
        expect(mockUpdateTask).toHaveBeenCalledWith(
          expect.not.objectContaining({ isCoding: expect.anything() })
        );
      });
    });

    it('shows an error toast when the mutation fails', async () => {
      mockUpdateTask.mockRejectedValueOnce({
        response: { data: { message: 'Update rejected' } }
      });

      renderModal(makeTask());

      fireEvent.change(screen.getByLabelText(/Title/), {
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
      mockUpdateTask.mockRejectedValueOnce({});

      renderModal(makeTask());

      fireEvent.change(screen.getByLabelText(/Title/), {
        target: { value: 'Updated Name' }
      });

      fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

      await waitFor(() => {
        expect(mockShowErrorToast).toHaveBeenCalledWith(
          'Failed to update content'
        );
      });
    });
  });

  describe('Cancel', () => {
    it('calls onClose when Cancel is clicked', () => {
      renderModal(makeTask());
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
