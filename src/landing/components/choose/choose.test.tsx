import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WhyChooseUs from './choose';

describe('WhyChooseUs Component', () => {
  it('renders section title and badge', () => {
    render(<WhyChooseUs />);

    expect(screen.getByText('Why Choose Us ?')).toBeInTheDocument();
    expect(
      screen.getByText('Proven Enterprise Excellence')
    ).toBeInTheDocument();
  });

  it('renders all four feature cards', () => {
    render(<WhyChooseUs />);

    expect(screen.getByText('Innovative Solutions')).toBeInTheDocument();
    expect(screen.getByText('Reliability & Security')).toBeInTheDocument();
    expect(screen.getByText('Client-Centric Approach')).toBeInTheDocument();
    expect(screen.getByText('Rapid Delivery')).toBeInTheDocument();

    expect(screen.getByText('Modern Engineering')).toBeInTheDocument();
    expect(screen.getByText('Enterprise Protection')).toBeInTheDocument();
    expect(screen.getByText('Dedicated Specialists')).toBeInTheDocument();
    expect(screen.getByText('Accelerated Time-to-Market')).toBeInTheDocument();
  });
});
