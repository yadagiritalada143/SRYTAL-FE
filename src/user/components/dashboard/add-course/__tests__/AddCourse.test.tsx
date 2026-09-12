import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import AddCourse from '../AddCourse';

const mockAddCourse = jest.fn();
jest.mock('@hooks/mutations/useUserMutations', () => ({
  useAddCourse: () => ({
    mutateAsync: mockAddCourse,
    isPending: false
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
      headerBackgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => false
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, disabled, type, loading }: any) => (
    <button type={type ?? 'button'} onClick={onClick} disabled={disabled}>
      {loading ? 'Loading course...' : children}
    </button>
  )
}));

const mockEditor = {
  getHTML: () => '<p>Course description html</p>',
  getText: () => 'Write your course description here...'
};

jest.mock('@tiptap/react', () => ({
  useEditor: () => mockEditor
}));

jest.mock('@tiptap/starter-kit', () => jest.fn());
jest.mock('@tiptap/extension-underline', () => jest.fn());
jest.mock('@tiptap/extension-superscript', () => jest.fn());
jest.mock('@tiptap/extension-subscript', () => jest.fn());
jest.mock('@tiptap/extension-highlight', () => jest.fn());
jest.mock('@tiptap/extension-text-align', () => ({
  configure: jest.fn(() => ({}))
}));

jest.mock('@mantine/tiptap', () => {
  const RTE: any = ({ children }: any) => (
    <div data-testid='rich-text-editor'>{children}</div>
  );
  RTE.Toolbar = ({ children }: any) => (
    <div data-testid='rte-toolbar'>{children}</div>
  );
  RTE.ControlsGroup = ({ children }: any) => <div>{children}</div>;
  RTE.Content = () => <div data-testid='rte-content' />;
  [
    'Bold',
    'Italic',
    'Underline',
    'Strikethrough',
    'ClearFormatting',
    'Highlight',
    'H1',
    'H2',
    'H3',
    'H4',
    'BulletList',
    'OrderedList',
    'Link',
    'Unlink',
    'AlignLeft',
    'AlignCenter',
    'AlignJustify',
    'AlignRight',
    'Undo',
    'Redo'
  ].forEach(name => {
    RTE[name] = () => null;
  });
  return { RichTextEditor: RTE, Link: jest.fn() };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

class MockFileReader {
  result: string | null = 'data:image/png;base64,Zm9v';
  onloadend: (() => void) | null = null;
  readAsDataURL() {
    if (this.onloadend) this.onloadend();
  }
}

const renderForm = () => {
  return render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <AddCourse />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

const typeCourseName = (value: string) => {
  fireEvent.change(screen.getByLabelText(/Course Name/), {
    target: { value }
  });
};

const selectThumbnail = (container: HTMLElement) => {
  const fileInput = container.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;
  expect(fileInput).toBeTruthy();
  fireEvent.change(fileInput, {
    target: { files: [new File(['x'], 'course.png', { type: 'image/png' })] }
  });
};

const submitForm = () => {
  fireEvent.click(screen.getByRole('button', { name: 'Create Course' }));
};

describe('AddCourse', () => {
  let container: HTMLElement;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAddCourse.mockResolvedValue({});
    Object.defineProperty(global, 'FileReader', {
      writable: true,
      value: MockFileReader
    });
  });

  describe('Rendering', () => {
    it('renders the header title, subtitle and Draft badge', () => {
      renderForm();
      expect(screen.getByText('Create New Course')).toBeInTheDocument();
      expect(
        screen.getByText(/Fill in the details below to create a new course/i)
      ).toBeInTheDocument();
      expect(screen.getByText('Draft')).toBeInTheDocument();
    });

    it('renders the course name field with helper text', () => {
      renderForm();
      expect(screen.getByLabelText(/Course Name/)).toBeInTheDocument();
      expect(
        screen.getByText('Give your course a clear and descriptive name')
      ).toBeInTheDocument();
    });

    it('renders the thumbnail upload input', () => {
      const result = renderForm();
      expect(
        result.container.querySelector('input[type="file"]')
      ).toBeInTheDocument();
    });

    it('renders the rich text editor toolbar and content area', () => {
      renderForm();
      expect(screen.getByTestId('rich-text-editor')).toBeInTheDocument();
      expect(screen.getByTestId('rte-toolbar')).toBeInTheDocument();
      expect(screen.getByTestId('rte-content')).toBeInTheDocument();
    });

    it('renders the Create Course, Cancel and Tips cards', () => {
      renderForm();
      expect(screen.getByRole('button', { name: 'Create Course' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByText('Tips for a Great Course')).toBeInTheDocument();
    });
  });

  describe('Validation', () => {
    it('disables Create Course before the form is complete', () => {
      renderForm();
      expect(screen.getByRole('button', { name: 'Create Course' })).toBeDisabled();
    });

    it('keeps Create Course disabled when only the name is provided', () => {
      const result = renderForm();
      container = result.container;
      typeCourseName('React Fundamentals');
      expect(screen.getByRole('button', { name: 'Create Course' })).toBeDisabled();
    });

    it('enables Create Course once name and thumbnail are provided', () => {
      const result = renderForm();
      container = result.container;
      typeCourseName('React Fundamentals');
      selectThumbnail(container);
      expect(screen.getByRole('button', { name: 'Create Course' })).toBeEnabled();
    });
  });

  describe('Thumbnail upload', () => {
    it('shows a preview with the file name and size after selecting an image', () => {
      const result = renderForm();
      container = result.container;
      selectThumbnail(container);
      expect(screen.getByText('course.png')).toBeInTheDocument();
      expect(screen.getByText('0.00 MB')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument();
      expect(screen.getByAltText('Course thumbnail')).toBeInTheDocument();
    });

    it('removes the preview and returns to the upload input', () => {
      const result = renderForm();
      container = result.container;
      selectThumbnail(container);
      fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
      expect(screen.queryByText('course.png')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Create Course' })).toBeDisabled();
    });

    it('handles removing thumbnail when no file is set', () => {
      renderForm();
      expect(screen.queryByRole('button', { name: 'Remove' })).not.toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('navigates back when the Cancel button is clicked', () => {
      renderForm();
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it('navigates back when the header back arrow is clicked', () => {
      renderForm();
      const svg = document.querySelector(
        '.tabler-icon-arrow-left'
      ) as HTMLElement;
      const button = svg?.closest('button');
      expect(button).toBeTruthy();
      fireEvent.click(button as HTMLButtonElement);
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });

  describe('Submit', () => {
    it('submits the course with name, description and thumbnail on success', async () => {
      const result = renderForm();
      container = result.container;
      typeCourseName('React Fundamentals');
      selectThumbnail(container);
      submitForm();

      await waitFor(() => {
        expect(mockAddCourse).toHaveBeenCalledTimes(1);
      });

      const payload = mockAddCourse.mock.calls[0][0];
      expect(payload.name).toBe('React Fundamentals');
      expect(payload.description).toBe('<p>Course description html</p>');
      expect(payload.image).toBeInstanceOf(File);
      expect(payload.image.name).toBe('course.png');

      expect(mockShowSuccessToast).toHaveBeenCalledWith('Course added successfully!');
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it('shows the server error message when the mutation fails', async () => {
      mockAddCourse.mockRejectedValueOnce({
        response: { data: { message: 'Server rejected course' } }
      });
      const result = renderForm();
      container = result.container;
      typeCourseName('React Fundamentals');
      selectThumbnail(container);
      submitForm();

      await waitFor(() => {
        expect(mockShowErrorToast).toHaveBeenCalledWith('Server rejected course');
      });
      expect(mockShowSuccessToast).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('shows a fallback error message when the error carries no message', async () => {
      mockAddCourse.mockRejectedValueOnce({});
      const result = renderForm();
      container = result.container;
      typeCourseName('React Fundamentals');
      selectThumbnail(container);
      submitForm();

      await waitFor(() => {
        expect(mockShowErrorToast).toHaveBeenCalledWith('Failed to add course');
      });
    });

    it('does not submit when form is invalid', () => {
      renderForm();
      submitForm();
      expect(mockAddCourse).not.toHaveBeenCalled();
    });

    it('navigates back on Cancel', () => {
      renderForm();
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });
});
