import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Technologies from './technologies';

describe('Technologies Component', () => {
  it('renders section title and eyebrow badge', () => {
    render(<Technologies />);

    expect(
      screen.getByText('Cutting-Edge Tools & Technologies')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Enterprise Engineering Stack')
    ).toBeInTheDocument();
  });

  it('renders technologies in the animated marquee stream', () => {
    render(<Technologies />);

    // Check key technologies rendered in marquee
    expect(screen.getAllByText('React.js').length).toBeGreaterThan(0);
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Node.js').length).toBeGreaterThan(0);
    expect(
      screen.getAllByText('AWS (Amazon Web Services)').length
    ).toBeGreaterThan(0);
    expect(screen.getAllByText('PostgreSQL').length).toBeGreaterThan(0);
  });

  it('filters technologies when category tabs are clicked', () => {
    render(<Technologies />);

    const cloudTab = screen.getByRole('tab', { name: 'Cloud & DevOps' });
    expect(cloudTab).toBeInTheDocument();

    // Click 'Cloud & DevOps'
    fireEvent.click(cloudTab);

    // In grid view, specific cloud cards appear
    expect(screen.getByText('AWS (Amazon Web Services)')).toBeInTheDocument();
    expect(screen.getByText('Microsoft Azure')).toBeInTheDocument();
    expect(screen.getByText('Google Cloud (GCP)')).toBeInTheDocument();
    expect(screen.getByText('Docker & Containers')).toBeInTheDocument();
    expect(screen.getByText('CI/CD Pipelines')).toBeInTheDocument();

    // Frontend specific tech should not appear in Cloud tab
    expect(screen.queryByText('React Native')).not.toBeInTheDocument();

    // Switch back to 'All Technologies'
    const allTab = screen.getByRole('tab', { name: 'All Technologies' });
    fireEvent.click(allTab);

    expect(screen.getAllByText('React.js').length).toBeGreaterThan(0);
  });

  it('renders enterprise architecture metrics bar', () => {
    render(<Technologies />);

    expect(screen.getByText('30+')).toBeInTheDocument();
    expect(screen.getByText('Enterprise Technologies')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('Type-Safe TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Multi-Cloud')).toBeInTheDocument();
    expect(screen.getByText('Zero Trust')).toBeInTheDocument();
  });
});
