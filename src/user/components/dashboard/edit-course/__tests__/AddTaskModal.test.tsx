import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import AddTaskModal from '../AddTaskModal';
import { REOPEN_TASK_POPUP_KEY } from '../task-popup-state';

jest.mock('@hooks/mutations/useUserMutations', () => ({
  useAddCourseTask: () => ({
    mutateAsync: mockAddTask,
    isPending: false
  })
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ organization: 'acme' })
}));

const mockAddTask = jest.fn();

const mockShowSuccessToast = jest.fn();
const mockShowErrorToast = jest.fn();
jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: mockShowSuccessToast,
    showErrorToast: mockShowErrorToast
  })
}));

jest.mock('@utils/common/constants', () => ({
  organizationEmployeeUrls: (org: string) => `/${org}/employee`
}));

jest.mock('@utils/common/get-error-message', () => ({
  getErrorMessage: (error: any, fallback: string) =>
    error?.response?.data?.message || error?.message || fallback
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, disabled, type, loading }: any) => (
    <button type={type ?? 'button'} onClick={onClick} disabled={disabled}>
      {loading ? 'Loading...' : children}
    </button>
  )
}));

jest.mock('@mantine/core', () => {
  const actual = jest.requireActual('@mantine/core');
  return {
    ...actual,
    Modal: ({ opened, children, title }: any) =>
      opened ? (
        <div data-testid='modal'>
          <h2>{title}</h2>
          {children}
        </div>
      ) : null,
    SegmentedControl: ({ value, onChange, data }: any) => (
      <div>
        {data.map((d: any) => (
          <button
            key={d.value}
            type='button'
            aria-pressed={value === d.value}
            onClick={() => onChange(d.value)}
          >
            {d.value === 'LINK'
              ? 'Link'
              : d.value === 'FILE'
                ? 'File'
                : 'Coding'}
          </button>
        ))}
      </div>
    )
  };
});

const mockOnClose = jest.fn();

const renderModal = (opened = true, moduleId = 'm1', courseId = 'c1') => {
  return render(
    <MantineProvider>
      <AddTaskModal
        opened={opened}
        onClose={mockOnClose}
        moduleId={moduleId}
        courseId={courseId}
      />
    </MantineProvider>
  );
};

const typeTitle = (value: string) => {
  fireEvent.change(
    screen.getByPlaceholderText('e.g. Introduction video, Reading material'),
    { target: { value } }
  );
};

const typeLink = (value: string) => {
  fireEvent.change(screen.getByLabelText(/Link URL/), { target: { value } });
};

const clickFileMode = () => {
  fireEvent.click(screen.getByRole('button', { name: 'File' }));
};

const clickCodingMode = () => {
  fireEvent.click(screen.getByRole('button', { name: 'Coding' }));
};

const getMainFileInput = (container: HTMLElement) =>
  container.querySelectorAll('input[type="file"]')[0] as HTMLInputElement;

describe('AddTaskModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
    mockAddTask.mockResolvedValue({});
  });

  describe('Rendering', () => {
    it('renders nothing when closed', () => {
      renderModal(false);
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('renders the dialog with Add Content title when opened', () => {
      renderModal();
      expect(
        screen.getByRole('heading', { name: 'Add Content' })
      ).toBeInTheDocument();
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Content Type')).toBeInTheDocument();
    });

    it('defaults to Link mode with a link URL input', () => {
      renderModal();
      expect(screen.getByLabelText(/Link URL/)).toBeInTheDocument();
      expect(
        screen.queryByText('Upload a PDF, Word, or any file')
      ).not.toBeInTheDocument();
    });

    it('shows the file input when File mode is selected', () => {
      renderModal();
      clickFileMode();
      expect(
        screen.getByText('Upload a PDF, Word, or any file')
      ).toBeInTheDocument();
      expect(screen.queryByLabelText(/Link URL/)).not.toBeInTheDocument();
    });

    it('hides the Add Programming Language button for Link and File tasks', () => {
      renderModal();
      expect(
        screen.queryByRole('button', {
          name: 'Add Programming Language'
        })
      ).not.toBeInTheDocument();
      clickFileMode();
      expect(
        screen.queryByRole('button', {
          name: 'Add Programming Language'
        })
      ).not.toBeInTheDocument();
    });

    it('shows the Add Programming Language button for Coding tasks', () => {
      renderModal();
      clickCodingMode();
      expect(screen.getByText('Programming Language')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Add Programming Language' })
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Describe the coding problem to solve')
      ).toBeInTheDocument();
      expect(screen.queryByLabelText(/Link URL/)).not.toBeInTheDocument();
      expect(
        screen.queryByText('Upload a PDF, Word, or any file')
      ).not.toBeInTheDocument();
    });

    it('renders the thumbnail file input', () => {
      renderModal();
      expect(screen.getByText('Thumbnail (optional)')).toBeInTheDocument();
    });
  });

  describe('Validation', () => {
    it('disables Add Content when the form is empty', () => {
      renderModal();
      expect(
        screen.getByRole('button', { name: 'Add Content' })
      ).toBeDisabled();
    });

    it('keeps Add Content disabled when only the title is provided', () => {
      renderModal();
      typeTitle('Intro video');
      expect(
        screen.getByRole('button', { name: 'Add Content' })
      ).toBeDisabled();
    });

    it('enables Add Content when title and link are provided', () => {
      renderModal();
      typeTitle('Intro video');
      typeLink('https://youtube.com/watch?v=abc123');
      expect(
        screen.getByRole('button', { name: 'Add Content' })
      ).not.toBeDisabled();
    });

    it('enables Add Content when title and file are provided in File mode', () => {
      const { container } = renderModal();
      typeTitle('Reading material');
      clickFileMode();

      fireEvent.change(getMainFileInput(container), {
        target: {
          files: [new File(['x'], 'notes.pdf', { type: 'application/pdf' })]
        }
      });

      expect(
        screen.getByRole('button', { name: 'Add Content' })
      ).not.toBeDisabled();
    });
  });

  describe('Coding tasks', () => {
    it('keeps Add Content disabled in Coding mode until a question is provided', () => {
      renderModal();
      typeTitle('FizzBuzz problem');
      clickCodingMode();
      expect(
        screen.getByRole('button', { name: 'Add Content' })
      ).toBeDisabled();

      fireEvent.change(
        screen.getByPlaceholderText('Describe the coding problem to solve'),
        { target: { value: 'Return fizz for multiples of three.' } }
      );
      expect(
        screen.getByRole('button', { name: 'Add Content' })
      ).not.toBeDisabled();
    });

    it('opens the programming languages page and remembers the module to reopen', () => {
      renderModal();

      clickCodingMode();
      fireEvent.click(
        screen.getByRole('button', { name: 'Add Programming Language' })
      );

      expect(mockNavigate).toHaveBeenCalledWith(
        '/acme/employee/dashboard/content-writer/programming-languages'
      );
      expect(
        JSON.parse(sessionStorage.getItem(REOPEN_TASK_POPUP_KEY) || '{}')
      ).toEqual({ courseId: 'c1', moduleId: 'm1' });
    });
  });

  describe('Submit', () => {
    it('submits a link task with the module and course ids', async () => {
      renderModal(true, 'm1', 'c1');

      typeTitle('YouTube video');
      typeLink('https://youtube.com/watch?v=abc123');

      fireEvent.click(screen.getByRole('button', { name: 'Add Content' }));

      await waitFor(() => {
        expect(mockAddTask).toHaveBeenCalledTimes(1);
      });

      expect(mockAddTask).toHaveBeenCalledWith({
        moduleId: 'm1',
        taskName: 'YouTube video',
        taskDescription: '',
        isCoding: false,
        question: undefined,
        link: 'https://youtube.com/watch?v=abc123',
        file: undefined,
        thumbnail: null
      });

      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Content added successfully!'
      );
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('submits a file task in File mode', async () => {
      const { container } = renderModal();

      typeTitle('Reading material');
      clickFileMode();

      const file = new File(['x'], 'notes.pdf', { type: 'application/pdf' });
      fireEvent.change(getMainFileInput(container), {
        target: { files: [file] }
      });

      fireEvent.click(screen.getByRole('button', { name: 'Add Content' }));

      await waitFor(() => {
        expect(mockAddTask).toHaveBeenCalledWith(
          expect.objectContaining({
            isCoding: false,
            question: undefined,
            link: undefined,
            file
          })
        );
      });
    });

    it('submits a coding task with isCoding and the question', async () => {
      renderModal(true, 'm1', 'c1');

      typeTitle('FizzBuzz problem');
      clickCodingMode();
      fireEvent.change(
        screen.getByPlaceholderText('Describe the coding problem to solve'),
        { target: { value: 'Return fizz for multiples of three.' } }
      );

      fireEvent.click(screen.getByRole('button', { name: 'Add Content' }));

      await waitFor(() => {
        expect(mockAddTask).toHaveBeenCalledTimes(1);
      });

      expect(mockAddTask).toHaveBeenCalledWith({
        moduleId: 'm1',
        taskName: 'FizzBuzz problem',
        taskDescription: '',
        isCoding: true,
        question: 'Return fizz for multiples of three.',
        link: undefined,
        file: undefined,
        thumbnail: null
      });

      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Content added successfully!'
      );
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('trims the title and link before submitting', async () => {
      renderModal();

      typeTitle('  Trimmed Title  ');
      typeLink('  https://youtube.com/watch?v=def456  ');

      fireEvent.click(screen.getByRole('button', { name: 'Add Content' }));

      await waitFor(() => {
        expect(mockAddTask).toHaveBeenCalledWith(
          expect.objectContaining({
            taskName: 'Trimmed Title',
            link: 'https://youtube.com/watch?v=def456'
          })
        );
      });
    });

    it('shows an error toast when the mutation fails', async () => {
      mockAddTask.mockRejectedValueOnce({
        response: { data: { message: 'File too large' } }
      });

      renderModal();
      typeTitle('Intro video');
      typeLink('https://youtube.com/watch?v=abc123');

      fireEvent.click(screen.getByRole('button', { name: 'Add Content' }));

      await waitFor(() => {
        expect(mockShowErrorToast).toHaveBeenCalledWith('File too large');
      });
      expect(mockShowSuccessToast).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('shows a fallback error message when the error has no message', async () => {
      mockAddTask.mockRejectedValueOnce({});

      renderModal();
      typeTitle('Intro video');
      typeLink('https://youtube.com/watch?v=abc123');

      fireEvent.click(screen.getByRole('button', { name: 'Add Content' }));

      await waitFor(() => {
        expect(mockShowErrorToast).toHaveBeenCalledWith(
          'Failed to add content'
        );
      });
    });
  });

  describe('Cancel', () => {
    it('calls onClose when Cancel is clicked', () => {
      renderModal();
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
