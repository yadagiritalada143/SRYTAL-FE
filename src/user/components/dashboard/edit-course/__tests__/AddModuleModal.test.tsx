import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import AddModuleModal from '../AddModuleModal';

jest.mock('@hooks/mutations/useUserMutations', () => ({
  useAddCourseModule: () => ({
    mutateAsync: mockAddModule,
    isPending: false
  })
}));

const mockAddModule = jest.fn();

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
      ) : null
  };
});

const renderModal = (opened = true, courseId = 'c1') => {
  return render(
    <MantineProvider>
      <AddModuleModal
        opened={opened}
        onClose={mockOnClose}
        courseId={courseId}
      />
    </MantineProvider>
  );
};

const mockOnClose = jest.fn();

describe('AddModuleModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAddModule.mockResolvedValue({});
  });

  describe('Rendering', () => {
    it('renders nothing when closed', () => {
      renderModal(false);
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('renders the dialog with Add Module title when opened', async () => {
      renderModal(true);
      expect(
        screen.getByRole('heading', { name: 'Add Module' })
      ).toBeInTheDocument();
      expect(screen.getByText('Module Name')).toBeInTheDocument();
      expect(screen.getByText('Module Description')).toBeInTheDocument();
    });

    it('renders the Add Module and Cancel buttons', () => {
      renderModal();
      expect(
        screen.getByRole('button', { name: 'Add Module' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Cancel' })
      ).toBeInTheDocument();
    });

    it('renders the thumbnail file input', () => {
      renderModal();
      expect(screen.getByText('Thumbnail (optional)')).toBeInTheDocument();
    });
  });

  describe('Validation', () => {
    it('disables Add Module when name is empty', () => {
      renderModal();
      expect(screen.getByRole('button', { name: 'Add Module' })).toBeDisabled();
    });

    it('enables Add Module when name is provided', () => {
      renderModal();
      fireEvent.change(screen.getByPlaceholderText('Enter module name'), {
        target: { value: 'My Module' }
      });
      expect(
        screen.getByRole('button', { name: 'Add Module' })
      ).not.toBeDisabled();
    });
  });

  describe('Submit', () => {
    it('calls addModule with name, description and courseId', async () => {
      renderModal(true, 'c1');

      fireEvent.change(screen.getByPlaceholderText('Enter module name'), {
        target: { value: 'React Basics' }
      });
      fireEvent.change(
        screen.getByPlaceholderText('What does this module cover?'),
        { target: { value: 'Core concepts' } }
      );

      fireEvent.click(screen.getByRole('button', { name: 'Add Module' }));

      await waitFor(() => {
        expect(mockAddModule).toHaveBeenCalledTimes(1);
      });

      expect(mockAddModule).toHaveBeenCalledWith({
        courseId: 'c1',
        moduleName: 'React Basics',
        moduleDescription: 'Core concepts',
        thumbnail: null
      });

      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Module added successfully!'
      );
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('trims the module name on submit', async () => {
      renderModal();

      fireEvent.change(screen.getByPlaceholderText('Enter module name'), {
        target: { value: '  Padded Name  ' }
      });

      fireEvent.click(screen.getByRole('button', { name: 'Add Module' }));

      await waitFor(() => {
        expect(mockAddModule).toHaveBeenCalledWith(
          expect.objectContaining({ moduleName: 'Padded Name' })
        );
      });
    });

    it('shows an error toast when the mutation fails', async () => {
      mockAddModule.mockRejectedValueOnce({
        response: { data: { message: 'Duplicate module' } }
      });

      renderModal();

      fireEvent.change(screen.getByPlaceholderText('Enter module name'), {
        target: { value: 'Test Module' }
      });

      fireEvent.click(screen.getByRole('button', { name: 'Add Module' }));

      await waitFor(() => {
        expect(mockShowErrorToast).toHaveBeenCalledWith('Duplicate module');
      });
      expect(mockShowSuccessToast).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('shows a fallback error message when the error has no message', async () => {
      mockAddModule.mockRejectedValueOnce({});

      renderModal();

      fireEvent.change(screen.getByPlaceholderText('Enter module name'), {
        target: { value: 'Test Module' }
      });

      fireEvent.click(screen.getByRole('button', { name: 'Add Module' }));

      await waitFor(() => {
        expect(mockShowErrorToast).toHaveBeenCalledWith('Failed to add module');
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
