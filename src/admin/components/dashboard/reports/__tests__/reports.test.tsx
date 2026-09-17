import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
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

import Reports from '../reports';

const renderWithChild = () =>
  render(
    <MantineProvider>
      <MemoryRouter initialEntries={['/reports/child']}>
        <Routes>
          <Route path='/reports' element={<Reports />}>
            <Route
              path='child'
              element={<div data-testid='child-content'>Child Page</div>}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    </MantineProvider>
  );

describe('Reports Layout Component', () => {
  it('renders the Outlet child content', () => {
    renderWithChild();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Child Page')).toBeInTheDocument();
  });

  it('applies the wrapper div', () => {
    renderWithChild();
    expect(
      document.body.querySelector('.h-auto') as HTMLElement
    ).toBeInTheDocument();
  });
});
