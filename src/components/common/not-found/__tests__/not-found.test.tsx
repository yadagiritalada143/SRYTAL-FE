import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../not-found';

describe('NotFound', () => {
  it('renders the 404 message, illustration and home link', () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <MantineProvider>
          <NotFound />
        </MantineProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText(/Oops! The page you’re looking for doesn’t exist/)
    ).toBeInTheDocument();
    expect(screen.getByAltText('Not Found')).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: 'Go Home' });
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
