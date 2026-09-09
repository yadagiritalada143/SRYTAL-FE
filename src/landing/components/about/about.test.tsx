import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import About from './about';

describe('About Component', () => {
  it('renders section title and eyebrow badge', () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <About />
      </BrowserRouter>
    );

    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(
      screen.getByText('Engineering Excellence & Innovation')
    ).toBeInTheDocument();
  });

  it('renders company mission narrative and core value pillars', () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <About />
      </BrowserRouter>
    );

    expect(
      screen.getByText('Pioneering Enterprise Software & Digital Evolution')
    ).toBeInTheDocument();
    expect(screen.getByText('Client-Centric Innovation')).toBeInTheDocument();
    expect(
      screen.getByText('Enterprise Security & Resilience')
    ).toBeInTheDocument();
    expect(screen.getByText('High-Performance Agility')).toBeInTheDocument();
  });

  it('renders interactive 3D showcase card and toggles flip on interaction', () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <About />
      </BrowserRouter>
    );

    const flipCard = screen.getByRole('button', {
      name: /interactive about us showcase image/i
    });
    expect(flipCard).toBeInTheDocument();
    expect(flipCard).not.toHaveClass('is-flipped');

    // Click to flip
    fireEvent.click(flipCard);
    expect(flipCard).toHaveClass('is-flipped');

    // Click again to flip back
    fireEvent.click(flipCard);
    expect(flipCard).not.toHaveClass('is-flipped');

    // Hover to flip
    fireEvent.mouseEnter(flipCard);
    expect(flipCard).toHaveClass('is-flipped');

    fireEvent.mouseLeave(flipCard);
    expect(flipCard).not.toHaveClass('is-flipped');
  });

  it('renders quick action navigation links', () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <About />
      </BrowserRouter>
    );

    expect(screen.getByText('Consult With Our Team')).toBeInTheDocument();
    expect(screen.getByText('Explore Capabilities')).toBeInTheDocument();
  });

  it('renders bottom enterprise milestones metrics strip', () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <About />
      </BrowserRouter>
    );

    expect(screen.getByText('5+')).toBeInTheDocument();
    expect(
      screen.getByText('Years Engineering Excellence')
    ).toBeInTheDocument();
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('Enterprise Deliveries')).toBeInTheDocument();
    expect(screen.getByText('99.9%')).toBeInTheDocument();
    expect(screen.getByText('Production Reliability')).toBeInTheDocument();
    expect(screen.getByText('24/7')).toBeInTheDocument();
    expect(screen.getByText('Dedicated Technical Support')).toBeInTheDocument();
  });
});
