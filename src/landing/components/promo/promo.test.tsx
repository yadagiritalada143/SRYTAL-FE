import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import PromoBanner from './promo';

describe('PromoBanner Component', () => {
  it('renders headline and action buttons', () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <PromoBanner />
      </BrowserRouter>
    );

    expect(
      screen.getByText('Ready to Elevate Your Business Strategy?')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Enterprise Digital Transformation')
    ).toBeInTheDocument();
    expect(screen.getByText('Book Expert Consultation')).toBeInTheDocument();
    expect(screen.getByText('General Enquiries')).toBeInTheDocument();
  });

  it('renders enterprise trust badges', () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <PromoBanner />
      </BrowserRouter>
    );

    expect(
      screen.getByText('Confidential & NDA Protected')
    ).toBeInTheDocument();
    expect(screen.getByText('Rapid 24-Hour Response')).toBeInTheDocument();
    expect(
      screen.getByText('Proven Enterprise Track Record')
    ).toBeInTheDocument();
  });
});
