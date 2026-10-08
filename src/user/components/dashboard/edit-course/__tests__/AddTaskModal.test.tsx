import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import AddTaskModal from '../AddTaskModal';
import {
  REOPEN_TASK_POPUP_KEY,
  saveTaskDraft,
  readTaskDraft,
  clearTaskDraft
} from '../task-popup-state';

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
  commonUrls: (org: string) => `/${org}/employee`
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      cardBackground: '#ffffff',
      borderColor: '#dee2e6',
      accentColor: '#1c7ed6',
      iconColor: '#228be6',
      successColor: '#2f9e44',
      dangerColor: '#c92a2a',
      mutedTextColor: '#6c757d'
    },
    isDarkTheme: false
  })
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, disabled, type, loading }: any) => (
    <button type={type ?? 'button'} onClick={onClick} disabled={disabled}>
      {loading ? 'Loading...' : children}
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

const typeDescription = (value: string) => {
  fireEvent.change(screen.getByLabelText('Description'), { target: { value } });
};

const clickFileMode = () => {
  fireEvent.click(screen.getByRole('button', { name: 'File' }));
};

const clickCodingMode = () => {
  fireEvent.click(screen.getByRole('button', { name: 'Coding' }));
};

const getMainFileInput = (container: HTMLElement) =>
  container.querySelectorAll('input[type="file"]')[0] as HTMLInputElement;

/**
 * FileInput's visible control is a `<button>`; the hidden `<input type=file>`
 * Mantine renders lives outside the field wrapper, so only the button blurs
 * bubble up to the field's `onBlur`.
 */
const getFileControl = (container: HTMLElement, index = 0) =>
  container.querySelectorAll('button.mantine-FileInput-input')[index];

describe('AddTaskModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
    clearTaskDraft();
    mockAddTask.mockResolvedValue({});
  });

  describe('Rendering', () => {
    it('renders nothing when closed', () => {
      renderModal(false);
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('renders the dialog with Add Task title when opened', () => {
      renderModal();
      expect(
        screen.getByRole('heading', { name: 'Add Task' })
      ).toBeInTheDocument();
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Task Type')).toBeInTheDocument();
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
      expect(screen.getByText('Add Programming Language')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Add Programming Language' })
      ).toBeInTheDocument();
      expect(
        screen.queryByPlaceholderText('Describe the coding problem to solve')
      ).not.toBeInTheDocument();
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
    it('disables Add Task when the form is empty', () => {
      renderModal();
      expect(screen.getByRole('button', { name: 'Add Task' })).toBeDisabled();
    });

    it('keeps Add Task disabled when only the title is provided', () => {
      renderModal();
      typeTitle('Intro video');
      expect(screen.getByRole('button', { name: 'Add Task' })).toBeDisabled();
    });

    it('enables Add Task when title and link are provided', () => {
      renderModal();
      typeTitle('Intro video');
      typeLink('https://youtube.com/watch?v=abc123');
      expect(
        screen.getByRole('button', { name: 'Add Task' })
      ).not.toBeDisabled();
    });

    it('enables Add Task when title and file are provided in File mode', () => {
      const { container } = renderModal();
      typeTitle('Reading material');
      clickFileMode();

      fireEvent.change(getMainFileInput(container), {
        target: {
          files: [new File(['x'], 'notes.pdf', { type: 'application/pdf' })]
        }
      });

      expect(
        screen.getByRole('button', { name: 'Add Task' })
      ).not.toBeDisabled();
    });

    it('requires a parseable HTTP(S) link, not just any text', () => {
      renderModal();
      typeTitle('Intro video');
      typeLink('youtube.com/watch?v=abc123');
      expect(screen.getByRole('button', { name: 'Add Task' })).toBeDisabled();
    });

    it('shows the backend link message once the field is blurred', () => {
      renderModal();
      typeTitle('Intro video');
      typeLink('not a url');

      fireEvent.blur(screen.getByLabelText(/Link URL/));

      expect(
        screen.getByText(
          'A valid HTTP or HTTPS link is required for LINK tasks.'
        )
      ).toBeInTheDocument();
    });

    it('shows the backend title message once the field is blurred', () => {
      renderModal();
      fireEvent.blur(
        screen.getByPlaceholderText('e.g. Introduction video, Reading material')
      );

      expect(screen.getByText('Task name is required.')).toBeInTheDocument();
    });

    it('shows the backend file message once the file input is blurred', () => {
      const { container } = renderModal();
      typeTitle('Reading material');
      clickFileMode();

      fireEvent.blur(getFileControl(container, 0));

      expect(
        screen.getByText('A file is required for FILE tasks.')
      ).toBeInTheDocument();
    });

    it('rejects thumbnails the backend will not accept', () => {
      const { container } = renderModal();
      typeTitle('Intro video');
      typeLink('https://youtube.com/watch?v=abc123');

      // In Link mode the only file field on the form is the thumbnail.
      fireEvent.change(getMainFileInput(container), {
        target: {
          files: [new File(['x'], 'sticker.gif', { type: 'image/gif' })]
        }
      });

      expect(screen.getByRole('button', { name: 'Add Task' })).toBeDisabled();
      fireEvent.blur(getFileControl(container, 0));
      expect(
        screen.getByText('Thumbnail must be a JPG, PNG, or WEBP image.')
      ).toBeInTheDocument();
    });

    it('accepts a backend-approved thumbnail type', () => {
      const { container } = renderModal();
      typeTitle('Intro video');
      typeLink('https://youtube.com/watch?v=abc123');

      fireEvent.change(getMainFileInput(container), {
        target: {
          files: [new File(['x'], 'thumb.png', { type: 'image/png' })]
        }
      });

      expect(
        screen.getByRole('button', { name: 'Add Task' })
      ).not.toBeDisabled();
    });
  });

  describe('Coding tasks', () => {
    it('keeps Add Task disabled until the coding description is provided', () => {
      renderModal();
      typeTitle('FizzBuzz problem');
      clickCodingMode();
      // The backend requires a description for CODE tasks (the problem
      // statement), so the title alone is not enough.
      expect(screen.getByRole('button', { name: 'Add Task' })).toBeDisabled();

      typeDescription('Write a function that returns FizzBuzz.');

      expect(
        screen.getByRole('button', { name: 'Add Task' })
      ).not.toBeDisabled();
    });

    it('shows the backend coding description message once the editor is blurred', () => {
      renderModal();
      typeTitle('FizzBuzz problem');
      clickCodingMode();

      fireEvent.blur(screen.getByLabelText('Description'));

      expect(
        screen.getByText('Task description is required for coding tasks.')
      ).toBeInTheDocument();
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

  describe('Programming languages draft', () => {
    it('parks the whole form as a draft before leaving for languages', () => {
      renderModal();

      typeTitle('FizzBuzz problem');
      clickCodingMode();
      typeDescription('Write a function that returns FizzBuzz.');

      fireEvent.click(
        screen.getByRole('button', { name: 'Add Programming Language' })
      );

      expect(readTaskDraft()).toEqual({
        courseId: 'c1',
        moduleId: 'm1',
        taskName: 'FizzBuzz problem',
        taskDescription: 'Write a function that returns FizzBuzz.',
        mode: 'CODING',
        link: '',
        file: null,
        thumbnail: null
      });
    });

    it('restores the parked draft when the modal comes back', () => {
      saveTaskDraft({
        courseId: 'c1',
        moduleId: 'm1',
        taskName: 'FizzBuzz problem',
        taskDescription: '<p>Write a function that returns FizzBuzz.</p>',
        mode: 'CODING',
        link: '',
        file: null,
        thumbnail: null
      });

      renderModal();

      expect(
        screen.getByPlaceholderText('e.g. Introduction video, Reading material')
      ).toHaveValue('FizzBuzz problem');
      expect(screen.getByLabelText('Description')).toHaveValue(
        '<p>Write a function that returns FizzBuzz.</p>'
      );
      expect(screen.getByRole('button', { name: 'Coding' })).toHaveAttribute(
        'aria-pressed',
        'true'
      );
      // Consumed, so it cannot leak into a later, unrelated open.
      expect(readTaskDraft()).toBeNull();
    });

    it('submits the restored draft values', async () => {
      saveTaskDraft({
        courseId: 'c1',
        moduleId: 'm1',
        taskName: 'FizzBuzz problem',
        taskDescription: 'Write FizzBuzz',
        mode: 'CODING',
        link: '',
        file: null,
        thumbnail: null
      });

      renderModal();
      fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));

      await waitFor(() => {
        expect(mockAddTask).toHaveBeenCalledWith(
          expect.objectContaining({
            taskName: 'FizzBuzz problem',
            taskDescription: 'Write FizzBuzz',
            type: 'CODE'
          })
        );
      });
    });

    it('ignores a draft that belongs to a different module', () => {
      saveTaskDraft({
        courseId: 'c1',
        moduleId: 'other-module',
        taskName: 'Not for this module',
        taskDescription: '',
        mode: 'LINK',
        link: '',
        file: null,
        thumbnail: null
      });

      renderModal();

      expect(
        screen.getByPlaceholderText('e.g. Introduction video, Reading material')
      ).toHaveValue('');
      expect(readTaskDraft()).not.toBeNull();
    });
  });

  describe('Submit', () => {
    it('submits a link task with the module and course ids', async () => {
      renderModal(true, 'm1', 'c1');

      typeTitle('YouTube video');
      typeLink('https://youtube.com/watch?v=abc123');

      fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));

      await waitFor(() => {
        expect(mockAddTask).toHaveBeenCalledTimes(1);
      });

      expect(mockAddTask).toHaveBeenCalledWith({
        moduleId: 'm1',
        taskName: 'YouTube video',
        taskDescription: '',
        type: 'LINK',
        link: 'https://youtube.com/watch?v=abc123',
        file: undefined,
        thumbnail: null
      });

      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Task added successfully!'
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

      fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));

      await waitFor(() => {
        expect(mockAddTask).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'FILE',
            link: undefined,
            file
          })
        );
      });
    });

    it('submits a coding task with its type', async () => {
      renderModal(true, 'm1', 'c1');

      typeTitle('FizzBuzz problem');
      clickCodingMode();
      typeDescription('Write a function that returns FizzBuzz.');

      fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));

      await waitFor(() => {
        expect(mockAddTask).toHaveBeenCalledTimes(1);
      });

      // The title is the question; the description is the problem statement
      // the backend requires for CODE tasks.
      expect(mockAddTask).toHaveBeenCalledWith({
        moduleId: 'm1',
        taskName: 'FizzBuzz problem',
        taskDescription: 'Write a function that returns FizzBuzz.',
        type: 'CODE',
        link: undefined,
        file: undefined,
        thumbnail: null
      });

      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Task added successfully!'
      );
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('shows the backend success message when the API returns one', async () => {
      mockAddTask.mockResolvedValueOnce({
        message: 'New Task added to Module Successfully !'
      });

      renderModal();
      typeTitle('YouTube video');
      typeLink('https://youtube.com/watch?v=abc123');

      fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));

      await waitFor(() => {
        expect(mockShowSuccessToast).toHaveBeenCalledWith(
          'New Task added to Module Successfully !'
        );
      });
    });

    it('trims the title and link before submitting', async () => {
      renderModal();

      typeTitle('  Trimmed Title  ');
      typeLink('  https://youtube.com/watch?v=def456  ');

      fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));

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
        isAxiosError: true,
        response: { data: { message: 'File too large' } }
      });

      renderModal();
      typeTitle('Intro video');
      typeLink('https://youtube.com/watch?v=abc123');

      fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));

      await waitFor(() => {
        expect(mockShowErrorToast).toHaveBeenCalledWith('File too large');
      });
      expect(mockShowSuccessToast).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('toasts the backend validation details, not the generic message', async () => {
      mockAddTask.mockRejectedValueOnce({
        isAxiosError: true,
        response: {
          data: {
            message: 'Invalid course task request.',
            errors: [
              'Task name is required.',
              'A valid HTTP or HTTPS link is required for LINK tasks.'
            ]
          }
        }
      });

      renderModal();
      typeTitle('Intro video');
      typeLink('https://youtube.com/watch?v=abc123');

      fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));

      await waitFor(() => {
        expect(mockShowErrorToast).toHaveBeenCalledWith(
          'Task name is required. A valid HTTP or HTTPS link is required for LINK tasks.'
        );
      });
    });

    it('shows a fallback error message when the error has no message', async () => {
      mockAddTask.mockRejectedValueOnce({});

      renderModal();
      typeTitle('Intro video');
      typeLink('https://youtube.com/watch?v=abc123');

      fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));

      await waitFor(() => {
        expect(mockShowErrorToast).toHaveBeenCalledWith('Failed to add task');
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
