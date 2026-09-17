import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

let mockAssignments: any[] = [];
let mockIsLoading = false;

jest.mock('@hooks/queries/useAdminQueries', () => ({
  useGetAllCourseAssignments: () => ({
    data: mockAssignments,
    isLoading: mockIsLoading
  })
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ organization: 'srytal' })
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

jest.mock('@utils/common/constants', () => ({
  organizationAdminUrls: () => '/srytal/admin'
}));

jest.mock('@components/common/loaders/DataView', () => (props: any) => (
  <div data-testid='data-view'>
    {props.isLoading && <span>loading</span>}
    {props.children}
  </div>
));

import TrackProgress from '../TrackProgress';

const renderTrackProgress = () => {
  return render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter>
          <TrackProgress />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

const mockAssignmentData = [
  {
    courseAssignmentId: 'a1',
    courseName: 'Course A',
    courseDescription: 'Desc',
    employee: {
      employeeId: 'emp1',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@test.com',
      employeeCode: 'E001'
    },
    status: 'In Progress',
    assignedAt: '2024-01-01T00:00:00.000Z',
    dueDate: '2024-02-01T00:00:00.000Z',
    completedAt: null,
    isOverdue: false,
    totalModules: 2,
    progress: { totalTasks: 2, completedTasks: 1, percentComplete: 50 }
  },
  {
    courseAssignmentId: 'a2',
    courseName: 'Course B',
    courseDescription: 'Desc',
    employee: {
      employeeId: 'emp1',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@test.com',
      employeeCode: 'E001'
    },
    status: 'Completed',
    assignedAt: '2024-01-02T00:00:00.000Z',
    dueDate: '2024-02-02T00:00:00.000Z',
    completedAt: '2024-01-30T00:00:00.000Z',
    isOverdue: false,
    totalModules: 3,
    progress: { totalTasks: 3, completedTasks: 3, percentComplete: 100 }
  },
  {
    courseAssignmentId: 'a3',
    courseName: 'Course C',
    courseDescription: 'Desc',
    employee: {
      employeeId: 'emp2',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@test.com',
      employeeCode: 'E002'
    },
    status: 'Assigned',
    assignedAt: '2024-01-03T00:00:00.000Z',
    dueDate: '2024-02-03T00:00:00.000Z',
    completedAt: null,
    isOverdue: false,
    totalModules: 1,
    progress: { totalTasks: 1, completedTasks: 0, percentComplete: 0 }
  }
];

describe('TrackProgress', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAssignments = mockAssignmentData;
    mockIsLoading = false;
  });

  it('renders the page header', () => {
    renderTrackProgress();
    expect(screen.getByText('Track Progress')).toBeInTheDocument();
    expect(
      screen.getByText(/Select an employee to view their assigned courses/)
    ).toBeInTheDocument();
  });

  it('renders the stat cards with aggregated values', () => {
    renderTrackProgress();
    expect(screen.getByText('Employees')).toBeInTheDocument();
    expect(screen.getByText('Total Assigned Courses')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();

    expect(screen.getAllByText('2').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('3').length).toBeGreaterThanOrEqual(1);
  });

  it('groups assignments by employee and renders rows', () => {
    renderTrackProgress();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('E001')).toBeInTheDocument();
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('E002')).toBeInTheDocument();
  });

  it('shows the search input', () => {
    renderTrackProgress();
    expect(
      screen.getByPlaceholderText('Search by name, employee code...')
    ).toBeInTheDocument();
  });

  it('filters employees by name', () => {
    renderTrackProgress();
    const search = screen.getByPlaceholderText(
      'Search by name, employee code...'
    );
    fireEvent.change(search, { target: { value: 'John' } });
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument();
  });

  it('filters employees by employee code', () => {
    renderTrackProgress();
    const search = screen.getByPlaceholderText(
      'Search by name, employee code...'
    );
    fireEvent.change(search, { target: { value: 'E001' } });
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.queryByText('John Smith')).not.toBeInTheDocument();
  });

  it('navigates to the employee progress page when a row is clicked', () => {
    renderTrackProgress();
    fireEvent.click(screen.getByText('Jane Doe'));
    expect(mockNavigate).toHaveBeenCalledWith(
      '/srytal/admin/dashboard/track-progress/emp1'
    );
  });

  it('shows the empty state when there are no assignments', () => {
    mockAssignments = [];
    renderTrackProgress();
    expect(
      screen.getByText('No employees with course assignments found')
    ).toBeInTheDocument();
  });
});