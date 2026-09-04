import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Footer from './footer';

describe('Footer Component', () => {
  it('renders brand name and navigation sections based on original categories', () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Footer />
      </BrowserRouter>
    );

    expect(screen.getByAltText('SRYTAL Systems Logo')).toBeInTheDocument();
    expect(
      screen.getByText('Empowering Business with Technology')
    ).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
  });

  it('renders copyright with current year', () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Footer />
      </BrowserRouter>
    );

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(currentYear.toString(), 'i'))
    ).toBeInTheDocument();
  });
});
