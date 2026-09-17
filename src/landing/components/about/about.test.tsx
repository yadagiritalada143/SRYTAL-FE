import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import About from './about';

describe('About Component', () => {
  it('renders section title and description', () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <About />
      </BrowserRouter>
    );

    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(
      screen.getByText(/Empowering enterprises through/)
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

    fireEvent.click(flipCard);
    expect(flipCard).toHaveClass('is-flipped');

    fireEvent.click(flipCard);
    expect(flipCard).not.toHaveClass('is-flipped');

    fireEvent.mouseEnter(flipCard);
    expect(flipCard).toHaveClass('is-flipped');

    fireEvent.mouseLeave(flipCard);
    expect(flipCard).not.toHaveClass('is-flipped');
  });

  it('renders the flip card showcase with front and back content', () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <About />
      </BrowserRouter>
    );

    expect(screen.getByText('Innovation & Agility')).toBeInTheDocument();
    expect(screen.getByText('Enterprise Partnership')).toBeInTheDocument();
    expect(
      screen.getByText('Next-Gen Software Architecture')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Enduring Strategic Collaboration')
    ).toBeInTheDocument();
  });
});
