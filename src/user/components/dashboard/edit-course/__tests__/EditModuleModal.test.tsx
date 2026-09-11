import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import EditModuleModal from '../EditModuleModal';

jest.mock('@hooks/mutations/useUserMutations', () => ({
  useUpdateCourseModule: () => ({
    mutateAsync: mockUpdateModule,
    isPending: false
  })
}));

const mockUpdateModule = jest.fn();

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

const makeModule = (overrides: any = {}) => ({
  _id: 'm1',
  moduleName: 'React Basics',
  moduleDescription: '<p>Core concepts</p>',
  thumbnailUrl: 'http://example.com/thumb.png',
  thumbnail: 's3-key/module-thumb.png',
  tasks: [],
  status: 'ACTIVE',
  ...overrides
});

const renderModal = (
  mod: ReturnType<typeof makeModule> | undefined,
  courseId = 'c1'
) => {
  return render(
    <MantineProvider>
      <EditModuleModal
        opened
        onClose={mockOnClose}
        module={mod}
        courseId={courseId}
      />
    </MantineProvider>
  );
};

describe('EditModuleModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUpdateModule.mockResolvedValue({});
  });

  describe('Rendering', () => {
    it('renders the dialog with Edit Module title', () => {
      renderModal(makeModule());
      expect(screen.getByText('Edit Module')).toBeInTheDocument();
    });

    it('seeds the module name field from the module prop', () => {
      renderModal(makeModule({ moduleName: 'Advanced Hooks' }));
      expect(screen.getByLabelText(/Module Name/)).toHaveValue(
        'Advanced Hooks'
      );
    });

    it('seeds the description textarea from the module prop', () => {
      renderModal(makeModule({ moduleDescription: 'Deep dive' }));
      expect(screen.getByLabelText('Module Description')).toHaveValue(
        'Deep dive'
      );
    });

    it('shows the current thumbnail when a thumbnail exists', () => {
      renderModal(makeModule({ thumbnailUrl: 'http://example.com/thumb.png' }));
      expect(screen.getByText('Current thumbnail')).toBeInTheDocument();
      expect(
        screen.getByText('Pick a file below to replace it')
      ).toBeInTheDocument();
    });

    it('does not show a thumbnail preview when no thumbnail exists', () => {
      renderModal(makeModule({ thumbnailUrl: '', thumbnail: '' }));
      expect(screen.queryByText('Current thumbnail')).not.toBeInTheDocument();
    });

    it('renders the status select', () => {
      renderModal(makeModule());
      expect(screen.getByLabelText('Status')).toBeInTheDocument();
    });
  });

  describe('Submit', () => {
    it('calls updateModule with the form values on success', async () => {
      renderModal(makeModule());

      fireEvent.change(screen.getByLabelText(/Module Name/), {
        target: { value: 'Updated Module' }
      });
      fireEvent.change(screen.getByLabelText('Module Description'), {
        target: { value: '<p>New content</p>' }
      });
      fireEvent.change(screen.getByLabelText('Status'), {
        target: { value: 'ARCHIVE' }
      });

      fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

      await waitFor(() => {
        expect(mockUpdateModule).toHaveBeenCalledTimes(1);
      });

      expect(mockUpdateModule).toHaveBeenCalledWith({
        id: 'm1',
        moduleName: 'Updated Module',
        moduleDescription: '<p>New content</p>',
        thumbnail: null,
        status: 'ARCHIVE'
      });

      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Module updated successfully!'
      );
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('trims the module name on submit', async () => {
      renderModal(makeModule());

      fireEvent.change(screen.getByLabelText(/Module Name/), {
        target: { value: '  Padded  ' }
      });

      fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

      await waitFor(() => {
        expect(mockUpdateModule).toHaveBeenCalledWith(
          expect.objectContaining({ moduleName: 'Padded' })
        );
      });
    });

    it('shows an error toast when the mutation fails', async () => {
      mockUpdateModule.mockRejectedValueOnce({
        response: { data: { message: 'Update rejected' } }
      });

      renderModal(makeModule());

      fireEvent.change(screen.getByLabelText(/Module Name/), {
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
      mockUpdateModule.mockRejectedValueOnce({});

      renderModal(makeModule());

      fireEvent.change(screen.getByLabelText(/Module Name/), {
        target: { value: 'Updated Name' }
      });

      fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

      await waitFor(() => {
        expect(mockShowErrorToast).toHaveBeenCalledWith(
          'Failed to update module'
        );
      });
    });
  });

  describe('Cancel', () => {
    it('calls onClose when Cancel is clicked', () => {
      renderModal(makeModule());
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
