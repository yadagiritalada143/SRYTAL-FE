import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { useParams } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({ employeeId: 'emp-42' }))
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6'
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

const mockPackagesFormComponent = jest.fn((props: any) => (
  <div data-testid='packages-form'>{props.employeeId ?? 'Packages form'}</div>
));
jest.mock('../add-package', () => ({
  __esModule: true,
  default: (props: any) => mockPackagesFormComponent(props)
}));

import PackagePageWrapper from '../package-wrapper';

describe('PackagePageWrapper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the packages form with the employee id', () => {
    render(
      <MantineProvider>
        <BrowserRouter>
          <PackagePageWrapper />
        </BrowserRouter>
      </MantineProvider>
    );

    expect(screen.getByTestId('packages-form')).toBeInTheDocument();
    expect(mockPackagesFormComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        employeeId: 'emp-42',
        organizationConfig: { organization_name: 'srytal' }
      })
    );
  });

  it('shows an invalid id message when the employee id is missing', () => {
    (useParams as jest.Mock).mockReturnValue({});

    render(
      <MantineProvider>
        <BrowserRouter>
          <PackagePageWrapper />
        </BrowserRouter>
      </MantineProvider>
    );

    expect(screen.getByText('Invalid employee ID')).toBeInTheDocument();
    expect(mockPackagesFormComponent).not.toHaveBeenCalled();
  });
});
