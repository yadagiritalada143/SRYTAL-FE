import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import React, { act } from 'react';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ taskId: '1' }),
  useNavigate: jest.fn()
}));

jest.mock('recoil', () => ({
  ...jest.requireActual('recoil'),
  useRecoilState: jest.fn()
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: jest.fn()
}));

jest.mock('@UI/Buttonsanimate/ProgressBar', () => (props: any) => (
  <div data-testid='progress-bar' data-progress={props.progress} />
));

jest.mock('@UI/Buttonsanimate/BackButton', () => (props: any) => (
  <button data-testid='back-button' onClick={props.onClick}>
    {props.label}
  </button>
));

jest.mock('@UI/Models/base-model', () => ({
  StandardModal: (props: any) =>
    props.opened ? (
      <div data-testid='standard-modal'>
        <div data-testid='modal-title'>{props.title}</div>
        {props.children}
      </div>
    ) : null
}));

jest.mock('react-toastify', () => ({
  toast: { success: jest.fn(), error: jest.fn() }
}));

jest.mock('@utils/common/constants', () => ({
  organizationEmployeeUrls: jest.fn((org) => `/${org}/employee`)
}));

jest.mock('../../button/CommonButton', () => ({
  CommonButton: (props: any) => (
    <button
      data-testid={`common-button-${props.color || 'default'}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}));

jest.mock('moment-timezone', () => {
  const m = jest.requireActual('moment');
  m.tz = jest.fn(() => m());
  return { default: m, __esModule: true };
});

const TaskDetail = require('../taskdetails').default;
const mockUseParams = jest.requireMock('react-router-dom').useParams;
const mockUseNavigate = jest.requireMock('react-router-dom').useNavigate;
const mockUseAppTheme =
  jest.requireMock('@hooks/use-app-theme').useAppTheme;

const qc = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <RecoilRoot>
    <QueryClientProvider client={qc}>
      <MantineProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  </RecoilRoot>
);

describe('TaskDetail Component', () => {
  let mockNavigate: jest.Mock;
  let taskState: any;
  let mockSetTask: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    localStorage.clear();
    Element.prototype.scrollIntoView = jest.fn();
    taskState = null;
    mockSetTask = jest.fn((value) => {
      taskState = typeof value === 'function' ? value(taskState) : value;
    });
    const mockUseRecoilState = jest
      .requireMock('recoil')
      .useRecoilState;
    mockUseRecoilState.mockImplementation(() => [taskState, mockSetTask]);
    mockNavigate = jest.fn();
    mockUseNavigate.mockReturnValue(mockNavigate);
    mockUseAppTheme.mockReturnValue({
      themeConfig: {
        color: '#495057',
        backgroundColor: '#ffffff',
        borderColor: '#dee2e6',
        button: { color: '#495057', textColor: '#ffffff' }
      },
      organizationConfig: { organization_name: 'srytal' },
      isDarkTheme: false
    });
    mockUseParams.mockReturnValue({ taskId: '1' });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

it('shows loading state initially', () => {
    const { container } = render(
      <Wrapper>
        <TaskDetail />
      </Wrapper>
    );

    expect(container.querySelector('.mantine-Loader-root')).toBeInTheDocument();
  });

  it('renders task details after loading', async () => {
    render(
      <Wrapper>
        <TaskDetail />
      </Wrapper>
    );

    act(() => { jest.advanceTimersByTime(1000); });

    await waitFor(() => {
      expect(
        screen.getByText('Html & CSS for Beginners')
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText(
        'Learn HTML & CSS from scratch with hands-on projects'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('5 lessons')).toBeInTheDocument();
    expect(screen.getByText('3h 20m')).toBeInTheDocument();
  });

  it('renders course progress section', async () => {
    render(
      <Wrapper>
        <TaskDetail />
      </Wrapper>
    );

    act(() => { jest.advanceTimersByTime(1000); });

    await waitFor(() => {
      expect(screen.getByText('Course Progress')).toBeInTheDocument();
    });

    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(
      screen.getByText('0 of 5 lessons completed')
    ).toBeInTheDocument();
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
  });

  it('renders sections after loading', async () => {
    render(
      <Wrapper>
        <TaskDetail />
      </Wrapper>
    );

    act(() => { jest.advanceTimersByTime(1000); });

await waitFor(() => {
      expect(screen.getByText(/1\. Introduction/)).toBeInTheDocument();
    });

    expect(screen.getByText(/2\. CSS Basics/)).toBeInTheDocument();
  });

  it('toggles section collapse on click', async () => {
    render(
      <Wrapper>
        <TaskDetail />
      </Wrapper>
    );

    act(() => { jest.advanceTimersByTime(1000); });

await waitFor(() => {
      expect(screen.getByText(/1\. Introduction/)).toBeInTheDocument();
    });

    const sectionHeader = screen.getByText(/1\. Introduction/);
    fireEvent.click(sectionHeader);

    const sectionHeader2 = screen.getByText(/2\. CSS Basics/);
    fireEvent.click(sectionHeader2);
  });

  it('renders back button with correct navigation', async () => {
    render(
      <Wrapper>
        <TaskDetail />
      </Wrapper>
    );

    act(() => { jest.advanceTimersByTime(1000); });

    await waitFor(() => {
      expect(screen.getByTestId('back-button')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('back-button'));
    expect(mockNavigate).toHaveBeenCalledWith(
      '/srytal/employee/dashboard/mytasks'
    );
  });

it('shows no task found when task is null after loading', async () => {
    mockSetTask.mockImplementation(() => {});

    render(
      <Wrapper>
        <TaskDetail />
      </Wrapper>
    );

    act(() => { jest.advanceTimersByTime(1000); });

    await waitFor(() => {
      expect(screen.getByText('No task found')).toBeInTheDocument();
    });
  });

  it('handles mark as completed button', async () => {
    render(
      <Wrapper>
        <TaskDetail />
      </Wrapper>
    );

    act(() => { jest.advanceTimersByTime(1000); });

    await waitFor(() => {
      expect(screen.getByText('Mark as Completed')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Mark as Completed'));

    const { toast } = require('react-toastify');
    expect(toast.success).toHaveBeenCalledWith(
      'All lessons marked as completed!'
    );
  });

  it('handles resume course button', async () => {
    render(
      <Wrapper>
        <TaskDetail />
      </Wrapper>
    );

    act(() => { jest.advanceTimersByTime(1000); });

    await waitFor(() => {
      expect(screen.getByText('Resume Course')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Resume Course'));

    const { toast } = require('react-toastify');
    expect(toast.success).toHaveBeenCalledWith(
      'Resuming next lesson: Welcome to the Course'
    );
  });

  it('renders lesson icons correctly', async () => {
    render(
      <Wrapper>
        <TaskDetail />
      </Wrapper>
    );

    act(() => { jest.advanceTimersByTime(1000); });

    await waitFor(() => {
      expect(
        screen.getByText('Welcome to the Course')
      ).toBeInTheDocument();
    });
  });
});

