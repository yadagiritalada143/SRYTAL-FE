import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

let mockSubmitting = false;
const mockRegister = jest.fn((name: string) => ({ name }));
const mockField = { value: '', onChange: jest.fn(), onBlur: jest.fn() };

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    register: mockRegister,
    control: {},
    formState: {
      errors: {},
      isSubmitting: mockSubmitting
    }
  }),
  Controller: ({ render }: any) => render({ field: mockField })
}));

jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: jest.fn(() => () => ({}))
}));

jest.mock('@components/common/loaders/PremiumLoader', () => (props: any) => (
  <div data-testid='premium-loader'>{props.label || 'loading'}</div>
));

jest.mock('@mantine/core', () => {
  const actual = jest.requireActual('@mantine/core');
  return {
    ...actual,
    TextInput: (props: any) => (
      <label>
        {props.label}
        <input
          type={props.type || 'text'}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
        />
      </label>
    ),
    Textarea: (props: any) => (
      <label>
        {props.label}
        <textarea placeholder={props.placeholder} />
      </label>
    ),
    Select: (props: any) => (
      <label>
        {props.label}
        <select>
          {props.data.map((opt: any) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    )
  };
});

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({
    children,
    type,
    disabled,
    leftSection
  }: {
    children: React.ReactNode;
    type?: 'button' | 'reset' | 'submit';
    disabled?: boolean;
    leftSection?: React.ReactNode;
  }) => (
    <button type={type || 'button'} disabled={disabled}>
      {leftSection}
      {children}
    </button>
  )
}));

import GenerateOfferReport from '../generate-offer';

const renderOffer = () =>
  render(
    <MantineProvider>
      <GenerateOfferReport />
    </MantineProvider>
  );

describe('GenerateOfferReport Component', () => {
  beforeEach(() => {
    mockSubmitting = false;
    jest.clearAllMocks();
  });

  it('renders the page title', () => {
    renderOffer();
    expect(
      screen.getByRole('heading', { name: 'Generate Offer Letter' })
    ).toBeInTheDocument();
  });

  it('renders a Subject textarea with placeholder', () => {
    renderOffer();
    expect(screen.getByLabelText('Subject')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Subject')).toBeInTheDocument();
  });

  it('renders candidate name input', () => {
    renderOffer();
    expect(screen.getByLabelText('Candidate Name')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter candidate name')
    ).toBeInTheDocument();
  });

  it('renders joining date input as date type', () => {
    renderOffer();
    const input = screen.getByPlaceholderText('Select joining date');
    expect(input).toHaveAttribute('type', 'date');
  });

  it('renders compensation input as number', () => {
    renderOffer();
    const rules = mockRegister.mock.calls.find(c => c[0] === 'compensation');
    expect(rules).toBeTruthy();
  });

  it('renders the user role select with options', () => {
    renderOffer();
    expect(screen.getByLabelText('User Role')).toBeInTheDocument();
    expect(screen.getByText('employee')).toBeInTheDocument();
    expect(screen.getByText('recruiter')).toBeInTheDocument();
  });

  it('renders work location input', () => {
    renderOffer();
    expect(screen.getByLabelText('Work Location')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter Work Location')
    ).toBeInTheDocument();
  });

  it('renders the Generate Offer Letter submit button', () => {
    renderOffer();
    expect(
      screen.getByRole('button', { name: 'Generate Offer Letter' })
    ).toBeInTheDocument();
  });

  it('shows Generating text and loader while submitting', () => {
    mockSubmitting = true;
    renderOffer();
    expect(screen.getByText('Generating...')).toBeInTheDocument();
    expect(screen.getByTestId('premium-loader')).toBeInTheDocument();
  });
});
