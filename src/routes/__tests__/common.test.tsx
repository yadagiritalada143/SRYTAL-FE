import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import CommonRoutes from '../common';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: { primaryColor: 'blue' } as any,
    isDarkTheme: false,
    organizationConfig: {},
    appColors: {}
  })
}));

jest.mock('@components/common/not-found/not-found', () => {
  const m = jest.fn(() => <div>NotFoundPage</div>);
  return { __esModule: true, default: m };
});

const renderRoutes = (path: string) => {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <CommonRoutes />
    </MemoryRouter>
  );
};

describe('CommonRoutes', () => {
  it('renders without crashing', () => {
    renderRoutes('/unknown');
    expect(screen.getByText('NotFoundPage')).toBeInTheDocument();
  });

  it('falls back to the not found page for any unmatched path', () => {
    renderRoutes('/some/random/deep/path');
    expect(screen.getByText('NotFoundPage')).toBeInTheDocument();
  });
});
