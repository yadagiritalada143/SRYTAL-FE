import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import CourseCard from '../CourseCard';

jest.mock('@constants', () => ({
  ROLES: { ADMIN: 'admin' },
  BASE_URL: 'http://localhost:3000'
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6'
    },
    organizationConfig: { organization_name: 'srytal' },
    isDarkTheme: false
  })
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

const activeCourse = {
  _id: 'c1',
  courseName: 'Active Course',
  courseDescription: '<p>Learn basics</p>',
  status: 'ACTIVE',
  thumbnailUrl: ''
};

const archivedCourse = {
  _id: 'c2',
  courseName: 'Archived Course',
  courseDescription: '<p>Old curriculum</p>',
  status: 'ARCHIVE',
  thumbnailUrl: ''
};

const renderCard = (props: any) => {
  return render(
    <MantineProvider>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <CourseCard {...props} />
      </BrowserRouter>
    </MantineProvider>
  );
};

describe('CourseCard', () => {
  it('renders active course and displays Edit, Archive, Delete options in menu', async () => {
    const onEdit = jest.fn();
    const onArchive = jest.fn();
    const onDelete = jest.fn();
    const onClone = jest.fn();

    renderCard({
      course: activeCourse,
      onEdit,
      onArchive,
      onDelete,
      onClone
    });

    expect(screen.getByText('Active Course')).toBeInTheDocument();
    expect(screen.getByText('ACTIVE')).toBeInTheDocument();

    // Direct clone button should not be on active course
    expect(
      screen.queryByRole('button', { name: /^Clone$/ })
    ).not.toBeInTheDocument();

    // Open menu
    const menuButton = screen.getByLabelText('Course actions');
    fireEvent.click(menuButton);

    // Edit, Archive, Delete must be visible
    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Archive')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    // Clone Course option must NOT be in active menu
    expect(screen.queryByText('Clone Course')).not.toBeInTheDocument();

    // Click Edit
    fireEvent.click(screen.getByText('Edit'));
    expect(onEdit).toHaveBeenCalledWith('c1');

    // Clicking active course card navigates to course
    mockNavigate.mockClear();
    fireEvent.click(screen.getByText('Active Course'));
    expect(mockNavigate).toHaveBeenCalledWith(expect.stringContaining('c1'));
  });

  it('renders archived course and removes Edit option from menu and prevents card click navigation', async () => {
    const onEdit = jest.fn();
    const onArchive = jest.fn();
    const onDelete = jest.fn();
    const onClone = jest.fn();

    renderCard({
      course: archivedCourse,
      onEdit,
      onArchive,
      onDelete,
      onClone
    });

    expect(screen.getByText('Archived Course')).toBeInTheDocument();
    expect(screen.getByText('ARCHIVE')).toBeInTheDocument();

    // Clicking archived course card must NOT navigate
    mockNavigate.mockClear();
    fireEvent.click(screen.getByText('Archived Course'));
    expect(mockNavigate).not.toHaveBeenCalled();

    // Open 3-dots menu
    const menuButton = screen.getByLabelText('Course actions');
    fireEvent.click(menuButton);

    // In Archived tab, Edit MUST NOT be present
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();

    // Clone Course, Activate, Delete should be in menu
    await waitFor(() => {
      expect(screen.getByText('Clone Course')).toBeInTheDocument();
      expect(screen.getByText('Activate')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    // Click Clone Course
    fireEvent.click(screen.getByText('Clone Course'));
    expect(onClone).toHaveBeenCalledWith(archivedCourse);
  });
});
