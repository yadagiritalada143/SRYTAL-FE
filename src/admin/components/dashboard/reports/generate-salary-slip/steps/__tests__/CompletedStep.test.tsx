import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      accentColor: '#495057',
      successColor: '#37b24d',
      dangerColor: '#e03131',
      mutedTextColor: '#868e96',
      headerBackgroundColor: '#f8f9fa',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({
    children,
    onClick,
    variant
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: string;
  }) => (
    <button onClick={onClick} data-variant={variant}>
      {children}
    </button>
  )
}));

import CompletedStep from '../CompletedStep';

const reloadMock = jest.fn();
Object.defineProperty(window, 'location', {
  writable: true,
  value: { reload: reloadMock }
});

const renderStep = () =>
  render(
    <MantineProvider>
      <CompletedStep />
    </MantineProvider>
  );

describe('CompletedStep Component', () => {
  beforeEach(() => {
    reloadMock.mockClear();
  });

  it('renders the success title', () => {
    renderStep();
    expect(screen.getByText('Salary Slip Generated')).toBeInTheDocument();
  });

  it('renders the success helper text', () => {
    renderStep();
    expect(
      screen.getByText(
        'The salary slip has been successfully generated and downloaded.'
      )
    ).toBeInTheDocument();
  });

  it('renders the Generate Another button', () => {
    renderStep();
    expect(
      screen.getByText('Generate Another Salary Slip')
    ).toBeInTheDocument();
  });

  it('reloads the page when the button is clicked', () => {
    renderStep();
    fireEvent.click(screen.getByText('Generate Another Salary Slip'));
    expect(reloadMock).toHaveBeenCalled();
  });
});
