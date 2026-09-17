import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SuperAdminHeader from '../header/header';

describe('SuperAdminHeader', () => {
  it('renders "SUPER ADMIN" text', () => {
    render(<SuperAdminHeader />);
    expect(screen.getByText('SUPER ADMIN')).toBeInTheDocument();
  });
});
