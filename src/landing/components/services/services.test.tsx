import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Services from './services';

describe('Services Component', () => {
  it('renders section title and badge', () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Services />
      </BrowserRouter>
    );

    expect(screen.getByText('Our Services')).toBeInTheDocument();
  });

  it('renders all six service offerings', () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Services />
      </BrowserRouter>
    );

    expect(screen.getByText('Custom Software Development')).toBeInTheDocument();
    expect(screen.getByText('Cloud Integration & DevOps')).toBeInTheDocument();
    expect(
      screen.getByText('Database Architecture & Management')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Business Analytics & Insights')
    ).toBeInTheDocument();
    expect(screen.getByText('Strategic IT Consultation')).toBeInTheDocument();
    expect(
      screen.getByText('Enterprise Security Solutions')
    ).toBeInTheDocument();
  });

  it('renders technology capability badges and ribbon', () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Services />
      </BrowserRouter>
    );

    // Capabilities in cards and ribbon
    expect(screen.getAllByText('React.js & Next.js').length).toBeGreaterThan(0);
    expect(screen.getAllByText('AWS / Azure / GCP').length).toBeGreaterThan(0);
    expect(screen.getAllByText('PostgreSQL').length).toBeGreaterThan(0);
    expect(screen.getByText('Jest Unit Testing')).toBeInTheDocument();
    expect(screen.getByText('Enterprise Tech Stack:')).toBeInTheDocument();
  });

  it('filters services when a category tab is clicked', () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Services />
      </BrowserRouter>
    );

    const webMobileTab = screen.getByRole('tab', { name: 'Web & Mobile' });
    expect(webMobileTab).toBeInTheDocument();

    // Click 'Web & Mobile' tab
    fireEvent.click(webMobileTab);

    expect(screen.getByText('Custom Software Development')).toBeInTheDocument();
    expect(
      screen.queryByText('Cloud Integration & DevOps')
    ).not.toBeInTheDocument();

    // Switch back to 'All Capabilities'
    const allTab = screen.getByRole('tab', { name: 'All Capabilities' });
    fireEvent.click(allTab);

    expect(screen.getByText('Custom Software Development')).toBeInTheDocument();
    expect(screen.getByText('Cloud Integration & DevOps')).toBeInTheDocument();
  });
});
