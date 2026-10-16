import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { CreateQuizTaskModal } from '../CreateQuizTaskModal';

const mockShowSuccessToast = jest.fn();
const mockShowErrorToast = jest.fn();
jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: mockShowSuccessToast,
    showErrorToast: mockShowErrorToast
  })
}));

const mockAddTask = jest.fn();
jest.mock('@hooks/mutations/useUserMutations', () => ({
  useAddCourseTask: () => ({
    mutateAsync: mockAddTask,
    isPending: false
  })
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      cardBackground: '#ffffff',
      borderColor: '#dee2e6'
    },
    isDarkTheme: false
  })
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({
    children,
    onClick,
    disabled,
    type,
    leftSection,
    rightSection
  }: any) => (
    <button type={type ?? 'button'} onClick={onClick} disabled={disabled}>
      {leftSection}
      {children}
      {rightSection}
    </button>
  )
}));

describe('CreateQuizTaskModal', () => {
  const mockCourses: any[] = [
    {
      _id: 'c1',
      courseName: 'Course 101',
      modules: [
        { _id: 'm1', moduleName: 'Module A' },
        { _id: 'm2', moduleName: 'Module B' }
      ]
    },
    {
      _id: 'c2',
      courseName: 'Course 201',
      modules: [{ _id: 'm3', moduleName: 'Module C' }]
    }
  ];

  const defaultProps = {
    opened: true,
    onClose: jest.fn(),
    courses: mockCourses,
    onCreated: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    document.body.innerHTML = '';
  });

  const renderModal = (props = {}) =>
    render(
      <MantineProvider>
        <CreateQuizTaskModal {...defaultProps} {...props} />
      </MantineProvider>
    );

  it('renders modal header and form fields when opened', () => {
    renderModal();
    expect(
      screen.getByText('Add a new quiz assessment to any course module')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('e.g. JavaScript Async & Promises Assessment')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(
        'e.g. Test understanding of async/await, Promise chaining, and microtask queues.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /create quiz task/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /create & add questions/i })
    ).toBeInTheDocument();
  });

  it('validates required fields on blur', async () => {
    renderModal();
    const titleInput = screen.getByPlaceholderText(
      'e.g. JavaScript Async & Promises Assessment'
    );
    const descInput = screen.getByPlaceholderText(
      'e.g. Test understanding of async/await, Promise chaining, and microtask queues.'
    );

    fireEvent.blur(titleInput);
    fireEvent.blur(descInput);

    expect(
      await screen.findByText('Quiz title is required.')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Quiz description is required.')
    ).toBeInTheDocument();
  });

  it('successfully creates quiz task and triggers onCreated', async () => {
    mockAddTask.mockResolvedValueOnce({
      message: 'Quiz created successfully!',
      task: { _id: 'task-new-1' }
    });

    renderModal({ initialCourseId: 'c1', initialModuleId: 'm1' });

    const titleInput = screen.getByPlaceholderText(
      'e.g. JavaScript Async & Promises Assessment'
    );
    const descInput = screen.getByPlaceholderText(
      'e.g. Test understanding of async/await, Promise chaining, and microtask queues.'
    );

    fireEvent.change(titleInput, {
      target: { value: 'Frontend Mastery Quiz' }
    });
    fireEvent.change(descInput, { target: { value: 'Covers core concepts' } });

    const createBtn = screen.getByRole('button', {
      name: /create quiz task/i
    });
    fireEvent.click(createBtn);

    await waitFor(() => {
      expect(mockAddTask).toHaveBeenCalledWith({
        moduleId: 'm1',
        taskName: 'Frontend Mastery Quiz',
        taskDescription: 'Covers core concepts',
        type: 'QUIZ',
        thumbnail: null
      });
      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'Quiz created successfully!'
      );
      expect(defaultProps.onCreated).toHaveBeenCalledWith(
        expect.objectContaining({
          taskId: 'task-new-1',
          taskName: 'Frontend Mastery Quiz',
          courseId: 'c1',
          moduleId: 'm1'
        }),
        false
      );
      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });

  it('supports "Create & Add Questions" workflow', async () => {
    mockAddTask.mockResolvedValueOnce({
      message: 'Quiz created successfully!',
      task: { _id: 'task-new-2' }
    });

    renderModal({ initialCourseId: 'c1', initialModuleId: 'm1' });

    const titleInput = screen.getByPlaceholderText(
      'e.g. JavaScript Async & Promises Assessment'
    );
    const descInput = screen.getByPlaceholderText(
      'e.g. Test understanding of async/await, Promise chaining, and microtask queues.'
    );

    fireEvent.change(titleInput, {
      target: { value: 'Immediate Question Builder' }
    });
    fireEvent.change(descInput, {
      target: { value: 'Testing immediate builder open' }
    });

    const createAndAddBtn = screen.getByRole('button', {
      name: /create & add questions/i
    });
    fireEvent.click(createAndAddBtn);

    await waitFor(() => {
      expect(mockAddTask).toHaveBeenCalled();
      expect(defaultProps.onCreated).toHaveBeenCalledWith(
        expect.objectContaining({
          taskId: 'task-new-2',
          taskName: 'Immediate Question Builder'
        }),
        true
      );
      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });
});
