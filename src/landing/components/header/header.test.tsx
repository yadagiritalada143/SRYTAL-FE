import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Header from './header';

const renderHeader = () => {
  return render(
    <MantineProvider>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Header />
      </BrowserRouter>
    </MantineProvider>
  );
};

describe('Header Component', () => {
  it('renders the brand logo with link to home', () => {
    renderHeader();

    const logo = screen.getByAltText('SRYTAL Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.jpg');

    const brandLink = screen.getByRole('link', { name: /srytal home/i });
    expect(brandLink).toHaveAttribute('href', '/');
  });

  it('renders clean desktop navigation links pointing to section anchors', () => {
    renderHeader();

    const homeLinks = screen.getAllByRole('link', { name: /^home$/i });
    expect(homeLinks.length).toBeGreaterThanOrEqual(1);
    expect(homeLinks[0]).toHaveAttribute('href', '/');

    const aboutLinks = screen.getAllByRole('link', { name: /^about$/i });
    expect(aboutLinks.length).toBeGreaterThanOrEqual(1);
    expect(aboutLinks[0]).toHaveAttribute('href', '/#about');

    const servicesLinks = screen.getAllByRole('link', { name: /services/i });
    expect(servicesLinks.length).toBeGreaterThanOrEqual(1);

    const techLinks = screen.getAllByRole('link', { name: /technologies/i });
    expect(techLinks.length).toBeGreaterThanOrEqual(1);

    const contactLinks = screen.getAllByRole('link', { name: /contact/i });
    expect(contactLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('renders social media links including LinkedIn with correct external URL', () => {
    renderHeader();

    const linkedinLinks = screen.getAllByRole('link', {
      name: /srytal on linkedin/i
    });
    expect(linkedinLinks.length).toBeGreaterThanOrEqual(1);
    expect(linkedinLinks[0]).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/srytal-systems-india-pvt-ltd'
    );
    expect(linkedinLinks[0]).toHaveAttribute('target', '_blank');
  });

  it('renders Login button with employee login redirect URL and removes consult now', () => {
    renderHeader();

    // Verify "Consult Now" is removed
    expect(
      screen.queryByRole('link', { name: /consult now/i })
    ).not.toBeInTheDocument();

    // Verify "Login" button is present and redirects to /srytal/employee/login
    const loginLinks = screen.getAllByRole('link', { name: /login/i });
    expect(loginLinks.length).toBeGreaterThanOrEqual(1);
    expect(loginLinks[0]).toHaveAttribute('href', '/srytal/employee/login');
  });

  it('toggles mobile menu drawer on burger click with mobile login button', () => {
    renderHeader();

    const burgerBtn = screen.getByRole('button', {
      name: /toggle navigation/i
    });
    expect(burgerBtn).toBeInTheDocument();

    fireEvent.click(burgerBtn);
    const loginLinks = screen.getAllByRole('link', { name: /login/i });
    expect(loginLinks.length).toBe(2); // One in desktop nav, one in mobile drawer
  });
});
