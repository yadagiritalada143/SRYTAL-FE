import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Main from './main';

describe('Main Hero Component', () => {
  it('renders main headline and value proposition', () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Main />
      </BrowserRouter>
    );

    expect(screen.getByText(/Empowering Businesses with/i)).toBeInTheDocument();
    expect(
      screen.getByText('Innovative Technology Solutions')
    ).toBeInTheDocument();
  });

  it('renders dual action CTA buttons with proper navigation targets', () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Main />
      </BrowserRouter>
    );

    const getStartedLink = screen.getByRole('link', { name: /get started/i });
    expect(getStartedLink).toBeInTheDocument();
    expect(getStartedLink).toHaveAttribute('href', '/#expert-consultation');

    const aboutLink = screen.getByRole('link', { name: /about srytal/i });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/#about');
  });

  it('renders enterprise highlight capability cards', () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Main />
      </BrowserRouter>
    );

    expect(screen.getByText('Full-Stack Apps')).toBeInTheDocument();
    expect(screen.getByText('Cloud & DevOps')).toBeInTheDocument();
    expect(screen.getByText('Zero Trust Security')).toBeInTheDocument();
    expect(screen.getByText('Agile Delivery')).toBeInTheDocument();
  });

  it('renders scroll down indicator pointing to about section', () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Main />
      </BrowserRouter>
    );

    const scrollLink = screen.getByRole('link', {
      name: /scroll to about section/i
    });
    expect(scrollLink).toBeInTheDocument();
    expect(scrollLink).toHaveAttribute('href', '/#about');
  });
});
