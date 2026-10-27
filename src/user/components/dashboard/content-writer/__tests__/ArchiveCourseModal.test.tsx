import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import ArchiveCourseModal from '../ArchiveCourseModal';

let mockIsDark = false;
jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: mockIsDark
  })
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, disabled, loading }: any) => (
    <button
      type='button'
      onClick={onClick}
      disabled={Boolean(disabled || loading)}
      data-loading={String(Boolean(loading))}
    >
      {children}
    </button>
  )
}));

jest.mock('../CourseThumbnail', () => (props: any) => (
  <span
    data-testid='course-thumbnail'
    aria-label={props.name}
    data-src={props.src ?? ''}
  />
));

const mockOnClose = jest.fn();
const mockOnConfirm = jest.fn();

const makeCourse = (overrides: any = {}) => ({
  _id: 'c1',
  courseName: 'React Basics',
  courseDescription: '<p>Learn React</p>',
  status: 'ARCHIVE',
  thumbnailUrl: 'http://example.com/thumb.png',
  modules: [
    {
      _id: 'm1',
      moduleName: 'Module One',
      tasks: [{ _id: 't1' }, { _id: 't2' }, { _id: 't3' }]
    },
    {
      _id: 'm2',
      moduleName: 'Module Two',
      tasks: [{ _id: 't4' }]
    }
  ],
  ...overrides
});

const renderModal = (props: any = {}) => {
  const utils = render(
    <MantineProvider>
      <ArchiveCourseModal
        opened
        onClose={mockOnClose}
        course={makeCourse()}
        mode='archive'
        onConfirm={mockOnConfirm}
        {...props}
      />
    </MantineProvider>
  );
  return utils;
};

const modalTitle = () =>
  document.querySelector('.mantine-Modal-title') as HTMLElement;

const closeButton = () =>
  document.querySelector('.mantine-Modal-close') as HTMLButtonElement;

describe('ArchiveCourseModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsDark = false;
  });

  describe('Archive mode', () => {
    it('renders nothing when there is no course', () => {
      renderModal({ course: null });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(mockOnConfirm).not.toHaveBeenCalled();
    });

    it('renders the archive title, heading, and description', async () => {
      renderModal();

      await screen.findByRole('dialog');
      expect(modalTitle()).toHaveTextContent('Archive Course');
      expect(
        screen.getByText('Archive "React Basics"?')
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Archiving hides this course from active assignments/)
      ).toBeInTheDocument();
      expect(screen.getByTestId('course-thumbnail')).toBeInTheDocument();
    });

    it('shows module, task, and status badges for the course preview', async () => {
      renderModal();

      await screen.findByRole('dialog');
      expect(screen.getByText('2 Modules')).toBeInTheDocument();
      expect(screen.getByText('4 Tasks')).toBeInTheDocument();
      expect(screen.getByText('Current: ARCHIVE')).toBeInTheDocument();
      expect(screen.getByText('React Basics')).toBeInTheDocument();
    });

    it('uses singular labels for a single module and task', async () => {
      renderModal({
        course: makeCourse({
          modules: [{ _id: 'm1', moduleName: 'Only', tasks: [{ _id: 't1' }] }]
        })
      });

      await screen.findByRole('dialog');
      expect(screen.getByText('1 Module')).toBeInTheDocument();
      expect(screen.getByText('1 Task')).toBeInTheDocument();
    });

    it('falls back to the raw thumbnail key when no url is available', async () => {
      renderModal({
        course: makeCourse({ thumbnailUrl: '', thumbnail: 'thumbnails/abc.png' })
      });

      await screen.findByRole('dialog');
      expect(screen.getByTestId('course-thumbnail')).toHaveAttribute(
        'data-src',
        'thumbnails/abc.png'
      );
    });

    it('falls back to Active status and zero counts when modules are missing', async () => {
      renderModal({
        course: makeCourse({ status: undefined, modules: undefined })
      });

      await screen.findByRole('dialog');
      expect(screen.getByText('Current: Active')).toBeInTheDocument();
      expect(screen.getByText('0 Modules')).toBeInTheDocument();
      expect(screen.getByText('0 Tasks')).toBeInTheDocument();
    });

    it('ignores modules whose tasks value is not an array', async () => {
      renderModal({
        course: makeCourse({
          modules: [{ _id: 'm1', moduleName: 'Broken', tasks: null }]
        })
      });

      await screen.findByRole('dialog');
      expect(screen.getByText('1 Module')).toBeInTheDocument();
      expect(screen.getByText('0 Tasks')).toBeInTheDocument();
    });

    it('calls onConfirm with the course id when confirming', async () => {
      mockOnConfirm.mockResolvedValue(undefined);
      renderModal();

      await screen.findByRole('dialog');
      fireEvent.click(screen.getByRole('button', { name: 'Archive Course' }));

      await waitFor(() => expect(mockOnConfirm).toHaveBeenCalledWith('c1'));
      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    it('closes from the Cancel button', async () => {
      renderModal();

      await screen.findByRole('dialog');
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('closes from the header close button when not loading', async () => {
      renderModal();

      await screen.findByRole('dialog');
      fireEvent.click(closeButton());
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Activate mode', () => {
    it('renders activate copy and calls onConfirm on confirm', async () => {
      mockOnConfirm.mockResolvedValue(undefined);
      renderModal({ mode: 'activate', course: makeCourse({ status: 'ARCHIVE' }) });

      await screen.findByRole('dialog');
      expect(modalTitle()).toHaveTextContent('Activate Course');
      expect(
        screen.getByText('Activate "React Basics"?')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Activating will return this course to the Active Courses list so it can be viewed and assigned.'
        )
      ).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'Activate Course' }));
      await waitFor(() => expect(mockOnConfirm).toHaveBeenCalledWith('c1'));
    });
  });

  describe('Loading state', () => {
    it('disables Cancel and blocks closing while loading', async () => {
      renderModal({ loading: true });

      await screen.findByRole('dialog');
      expect(
        screen.getByRole('button', { name: 'Cancel' })
      ).toBeDisabled();
      expect(
        screen.getByRole('button', { name: 'Archive Course' })
      ).toBeDisabled();

      fireEvent.click(closeButton());
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Dark theme', () => {
    it('applies dark surface colors to the modal', async () => {
      mockIsDark = true;
      renderModal();

      await screen.findByRole('dialog');
      const content = document.querySelector(
        '.mantine-Modal-content'
      ) as HTMLElement;
      const header = document.querySelector(
        '.mantine-Modal-header'
      ) as HTMLElement;

      expect(content.style.backgroundColor).toBe('rgb(30, 41, 59)');
      expect(header.style.backgroundColor).toBe('rgb(30, 41, 59)');
      expect(header.style.borderBottom).toContain('334155');
    });
  });
});
