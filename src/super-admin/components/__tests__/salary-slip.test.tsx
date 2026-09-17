import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SalarySlip from '../documents/utils/salary-slip';

describe('SalarySlip', () => {
  it('renders "SalarySlips" text', () => {
    render(<SalarySlip />);
    expect(screen.getByText('SalarySlips')).toBeInTheDocument();
  });
});
