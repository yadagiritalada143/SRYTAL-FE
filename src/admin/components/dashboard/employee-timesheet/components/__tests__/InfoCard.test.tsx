import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { InfoCard } from '../InfoCard';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: false
  })
}));

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => false
}));

const renderInfoCard = (items: { label: string; value: string }[]) =>
  render(
    <MantineProvider>
      <InfoCard employeeDetails={null} employeeInfoItems={items} />
    </MantineProvider>
  );

describe('InfoCard Component', () => {
  it('renders the Employee Information heading', () => {
    renderInfoCard([]);
    expect(screen.getByText('Employee Information')).toBeInTheDocument();
  });

  it('renders an empty message when no info items are passed', () => {
    const { container } = renderInfoCard([]);
    expect(container.querySelectorAll('.mantine-Card-root').length).toBeGreaterThan(0);
  });

  it('renders all info labels and values', () => {
    const items = [
      { label: 'Name', value: 'John Doe' },
      { label: 'Email', value: 'john@example.com' },
      { label: 'Phone', value: '1234567890' }
    ];
    renderInfoCard(items);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
  });

  it('renders Join Date and Role items', () => {
    const items = [
      { label: 'Join Date', value: '2024-01-01' },
      { label: 'Role', value: 'Employee' }
    ];
    renderInfoCard(items);
    expect(screen.getByText('Join Date')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Employee')).toBeInTheDocument();
  });

  it('renders a dash for empty values', () => {
    const items = [
      { label: 'Phone', value: '' },
      { label: 'Role', value: undefined as any }
    ];
    renderInfoCard(items);
    expect(screen.getAllByText('-').length).toBe(2);
  });

  it('renders a card for every info item', () => {
    const items = [
      { label: 'Name', value: 'John' },
      { label: 'Email', value: 'john@example.com' },
      { label: 'Phone', value: '123' },
      { label: 'Join Date', value: '2024' },
      { label: 'Role', value: 'Employee' },
      { label: 'Custom Label', value: 'Custom Value' }
    ];
    renderInfoCard(items);
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
    expect(screen.getByText('Custom Value')).toBeInTheDocument();
  });
});