import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import TaskContentViewer from '../TaskContentViewer';
import { AssignedTask } from '@interfaces/course-assignment';

let mockResolved: any = null;

jest.mock('../task-content', () => ({
  resolveTaskContent: () => mockResolved
}));

jest.mock('@services/user-services', () => ({
  getCourseTaskContentUrl: (taskId: string) =>
    `http://localhost:3000/contentwriter/getCourseTaskContent/${taskId}?auth_token=fake`
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      borderColor: '#dee2e6',
      mutedTextColor: '#868e96',
      cardBackground: '#ffffff'
    },
    isDarkTheme: false
  })
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({ children, onClick, ...rest }: any) => (
    <button
      type='button'
      onClick={onClick}
      disabled={rest.disabled}
      data-loading={rest.loading}
    >
      {children}
    </button>
  )
}));

const mockOnFinished = jest.fn();

const makeTask = (overrides: any = {}): AssignedTask => ({
  _id: 't1',
  taskName: 'Intro video',
  taskDescription: 'Watch this',
  type: 'FILE',
  isCompleted: false,
  contentFileName: 'notes.pdf',
  contentMimeType: '',
  ...overrides
});

const renderViewer = (task: AssignedTask = makeTask()) => {
  return render(
    <MantineProvider>
      <TaskContentViewer task={task} onFinished={mockOnFinished} />
    </MantineProvider>
  );
};

describe('TaskContentViewer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a video element with the resolved url and controls', () => {
    mockResolved = {
      kind: 'video',
      url: 'http://localhost:3000/contentwriter/getCourseTaskContent/t1?auth_token=fake',
      label: 'Video'
    };
    const { container } = renderViewer(makeTask({ type: 'FILE' }));
    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute(
      'src',
      'http://localhost:3000/contentwriter/getCourseTaskContent/t1?auth_token=fake'
    );
    expect(video).toHaveAttribute('controls');
    expect(video).toHaveAttribute('controlslist', 'nodownload');
  });

  it('calls onFinished when a video ends', () => {
    mockResolved = {
      kind: 'video',
      url: 'http://localhost:3000/contentwriter/getCourseTaskContent/t1?auth_token=fake',
      label: 'Video'
    };
    const { container } = renderViewer();
    const video = container.querySelector('video') as HTMLVideoElement;
    fireEvent(video, new Event('ended', { bubbles: true }));
    expect(mockOnFinished).toHaveBeenCalledTimes(1);
  });

  it('renders an audio element and calls onFinished when it ends', () => {
    mockResolved = {
      kind: 'audio',
      url: 'http://localhost:3000/contentwriter/getCourseTaskContent/t1?auth_token=fake',
      label: 'Audio'
    };
    const { container } = renderViewer();
    const audio = container.querySelector('audio') as HTMLAudioElement;
    expect(audio).toBeInTheDocument();
    expect(audio).toHaveAttribute('controls');
    fireEvent(audio, new Event('ended', { bubbles: true }));
    expect(mockOnFinished).toHaveBeenCalledTimes(1);
  });

  it('renders an embedded iframe with the task name as the title', () => {
    mockResolved = {
      kind: 'embed',
      url: 'https://www.youtube.com/embed/abc123',
      label: 'Video'
    };
    renderViewer(
      makeTask({ type: 'LINK', link: 'https://youtube.com/watch?v=abc123' })
    );
    const iframe = screen.getByTitle('Intro video');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/abc123'
    );
    expect(iframe).toHaveAttribute('allowfullscreen');
  });

  it('renders an image with the task name as alt text', () => {
    mockResolved = {
      kind: 'image',
      url: 'http://localhost:3000/contentwriter/getCourseTaskContent/t1?auth_token=fake',
      label: 'Image'
    };
    renderViewer();
    const img = screen.getByAltText('Intro video');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      'src',
      'http://localhost:3000/contentwriter/getCourseTaskContent/t1?auth_token=fake'
    );
  });

  it('renders a pdf in an iframe', () => {
    mockResolved = {
      kind: 'pdf',
      url: 'http://localhost:3000/contentwriter/getCourseTaskContent/t1?auth_token=fake',
      label: 'PDF'
    };
    renderViewer();
    expect(screen.getByTitle('Intro video')).toHaveAttribute(
      'src',
      'http://localhost:3000/contentwriter/getCourseTaskContent/t1?auth_token=fake'
    );
  });

  it('renders a text document in an iframe', () => {
    mockResolved = {
      kind: 'text',
      url: 'http://localhost:3000/contentwriter/getCourseTaskContent/t1?auth_token=fake',
      label: 'Document'
    };
    renderViewer();
    expect(screen.getByTitle('Intro video')).toBeInTheDocument();
  });

  it('shows an external resource card and opens the external url in a new tab', () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
    mockResolved = {
      kind: 'external',
      url: 'https://blog.example.com/article',
      label: 'Article',
      externalUrl: 'https://blog.example.com/article'
    };
    renderViewer(
      makeTask({ type: 'LINK', link: 'https://blog.example.com/article' })
    );

    expect(screen.getByText('External resource')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Open resource' })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Open resource' }));

    expect(openSpy).toHaveBeenCalledWith(
      'https://blog.example.com/article',
      '_blank',
      'noopener'
    );
    openSpy.mockRestore();
  });

  it('shows the file name for a download card and opens the proxied url', () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
    mockResolved = {
      kind: 'download',
      url: 'http://localhost:3000/contentwriter/getCourseTaskContent/t1?auth_token=fake',
      label: 'File'
    };
    renderViewer(makeTask({ type: 'FILE', contentFileName: 'notes.pdf' }));

    expect(screen.getByText('notes.pdf')).toBeInTheDocument();
    expect(screen.getByText(/no in-browser preview/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Open file' })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Open file' }));

    expect(openSpy).toHaveBeenCalledWith(
      'http://localhost:3000/contentwriter/getCourseTaskContent/t1?auth_token=fake',
      '_blank',
      'noopener'
    );
    openSpy.mockRestore();
  });

  it('falls back to "Attached file" when a download task has no file name', () => {
    mockResolved = {
      kind: 'download',
      url: 'http://localhost:3000/contentwriter/getCourseTaskContent/t1?auth_token=fake',
      label: 'File'
    };
    renderViewer(makeTask({ type: 'FILE', contentFileName: undefined }));
    expect(screen.getByText('Attached file')).toBeInTheDocument();
  });
});
