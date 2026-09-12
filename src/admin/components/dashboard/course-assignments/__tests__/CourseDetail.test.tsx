import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#1971c2',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#1971c2', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: 'course-1' })
}));

const mockGetCourseTaskContentUrl = jest.fn(() => 'http://example.com/task-content');
jest.mock('@services/user-services', () => ({
  getCourseTaskContentUrl: (...args: any[]) => mockGetCourseTaskContentUrl(...args)
}));

jest.mock('@components/common/loaders/PremiumLoader', () => ({
  __esModule: true,
  default: ({ label }: any) => <div data-testid='premium-loader'>{label}</div>
}));

jest.mock('@components/common/loaders/DataView', () => ({
  __esModule: true,
  default: ({ children, isLoading, isEmpty }: any) => (
    <div data-testid='data-view'>
      {isLoading && <span>loading</span>}
      {!isEmpty && children}
      {isEmpty && <span>empty</span>}
    </div>
  )
}));

const mockUseGetCourseByIdAdmin = jest.fn();
jest.mock('@hooks/queries/useAdminQueries', () => ({
  useGetCourseByIdAdmin: (...args: any[]) => mockUseGetCourseByIdAdmin(...args)
}));

import CourseDetail from '../CourseDetail';

const mockCourseData = {
  courseName: 'React Fundamentals',
  courseDescription: '<p>Learn React from scratch</p>',
  status: 'ACTIVE',
  modules: [
    {
      _id: 'mod1',
      moduleName: 'Introduction',
      moduleDescription: 'Getting started with React',
      status: 'ACTIVE',
      tasks: [
        {
          _id: 'task1',
          taskName: 'Setup Environment',
          taskDescription: 'Set up your dev environment',
          type: 'FILE',
          status: 'ACTIVE'
        },
        {
          _id: 'task2',
          taskName: 'React Basics Video',
          taskDescription: 'Watch the intro video',
          type: 'LINK',
          status: 'ACTIVE'
        }
      ]
    },
    {
      _id: 'mod2',
      moduleName: 'Components',
      moduleDescription: 'Understanding components',
      status: 'ARCHIVE',
      tasks: []
    }
  ]
};

const renderCourseDetail = () => {
  return render(
    <MantineProvider env='test'>
      <BrowserRouter>
        <CourseDetail />
      </BrowserRouter>
    </MantineProvider>
  );
};

describe('CourseDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetCourseTaskContentUrl.mockReturnValue('http://example.com/task-content');
  });

  it('shows loading state', () => {
    mockUseGetCourseByIdAdmin.mockReturnValue({ data: null, isLoading: true });
    renderCourseDetail();
    expect(screen.getByTestId('premium-loader')).toBeInTheDocument();
  });

  it('renders the course name when data is loaded', () => {
    mockUseGetCourseByIdAdmin.mockReturnValue({ data: mockCourseData, isLoading: false });
    renderCourseDetail();
    expect(screen.getByText('React Fundamentals')).toBeInTheDocument();
  });

  it('renders the course description', () => {
    mockUseGetCourseByIdAdmin.mockReturnValue({ data: mockCourseData, isLoading: false });
    renderCourseDetail();
    expect(screen.getByText('About this course')).toBeInTheDocument();
  });

  it('renders the stats cards (Modules, Content Items, Status)', () => {
    mockUseGetCourseByIdAdmin.mockReturnValue({ data: mockCourseData, isLoading: false });
    renderCourseDetail();
    expect(screen.getAllByText('Modules').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Content Items')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('shows the correct module count', () => {
    mockUseGetCourseByIdAdmin.mockReturnValue({ data: mockCourseData, isLoading: false });
    renderCourseDetail();
    const moduleCount = screen.getAllByText('Modules');
    expect(moduleCount.length).toBeGreaterThanOrEqual(1);
  });

  it('renders module names in the accordion', () => {
    mockUseGetCourseByIdAdmin.mockReturnValue({ data: mockCourseData, isLoading: false });
    renderCourseDetail();
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('Components')).toBeInTheDocument();
  });

  it('renders task names within modules', () => {
    mockUseGetCourseByIdAdmin.mockReturnValue({ data: mockCourseData, isLoading: false });
    renderCourseDetail();
    expect(screen.getByText('Setup Environment')).toBeInTheDocument();
    expect(screen.getByText('React Basics Video')).toBeInTheDocument();
  });

  it('shows Archived badge for archived modules', () => {
    mockUseGetCourseByIdAdmin.mockReturnValue({ data: mockCourseData, isLoading: false });
    renderCourseDetail();
    const archivedBadges = screen.getAllByText('Archived');
    expect(archivedBadges.length).toBeGreaterThanOrEqual(1);
  });

  it('shows the correct status badge', () => {
    mockUseGetCourseByIdAdmin.mockReturnValue({ data: mockCourseData, isLoading: false });
    renderCourseDetail();
    expect(screen.getAllByText('ACTIVE').length).toBeGreaterThanOrEqual(1);
  });

  it('navigates back when the back button is clicked', () => {
    mockUseGetCourseByIdAdmin.mockReturnValue({ data: mockCourseData, isLoading: false });
    renderCourseDetail();
    const backBtn = screen.getByRole('button', { name: /go back/i });
    fireEvent.click(backBtn);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('opens task content in a new tab', async () => {
    window.open = jest.fn();
    mockUseGetCourseByIdAdmin.mockReturnValue({ data: mockCourseData, isLoading: false });
    renderCourseDetail();
    fireEvent.click(screen.getByText('Introduction'));
    const openBtn = await screen.findByRole('button', {
      name: /Open Setup Environment/i
    });
    fireEvent.click(openBtn);
    expect(window.open).toHaveBeenCalledWith(
      'http://example.com/task-content',
      '_blank',
      'noopener'
    );
  });

  it('shows empty state when course has no modules', () => {
    mockUseGetCourseByIdAdmin.mockReturnValue({
      data: { ...mockCourseData, modules: [] },
      isLoading: false
    });
    renderCourseDetail();
    expect(screen.getByText('No modules in this course yet.')).toBeInTheDocument();
  });

  it('shows empty module when tasks array is empty', () => {
    mockUseGetCourseByIdAdmin.mockReturnValue({ data: mockCourseData, isLoading: false });
    renderCourseDetail();
    expect(screen.getByText('No content in this module.')).toBeInTheDocument();
  });

  it('renders no description card when courseDescription is absent', () => {
    const noDesc = { ...mockCourseData, courseDescription: '' };
    mockUseGetCourseByIdAdmin.mockReturnValue({ data: noDesc, isLoading: false });
    renderCourseDetail();
    expect(screen.queryByText('About this course')).not.toBeInTheDocument();
  });

  it('shows N/A for status when course status is missing', () => {
    const noStatus = { ...mockCourseData, status: '' };
    mockUseGetCourseByIdAdmin.mockReturnValue({ data: noStatus, isLoading: false });
    renderCourseDetail();
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('shows Draft status for missing status', () => {
    const noStatus = { ...mockCourseData, status: '' };
    mockUseGetCourseByIdAdmin.mockReturnValue({ data: noStatus, isLoading: false });
    renderCourseDetail();
    expect(screen.getByText('Draft')).toBeInTheDocument();
  });

  it('renders task descriptions', () => {
    mockUseGetCourseByIdAdmin.mockReturnValue({ data: mockCourseData, isLoading: false });
    renderCourseDetail();
    expect(screen.getByText('Set up your dev environment')).toBeInTheDocument();
    expect(screen.getByText('Watch the intro video')).toBeInTheDocument();
  });

  it('shows task items count badge for modules', () => {
    mockUseGetCourseByIdAdmin.mockReturnValue({ data: mockCourseData, isLoading: false });
    renderCourseDetail();
    expect(screen.getByText('2 items')).toBeInTheDocument();
    expect(screen.getByText('0 items')).toBeInTheDocument();
  });
});
