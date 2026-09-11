import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import OpenRouterSetup, {
  OPENROUTER_API_KEY_STORAGE
} from '../OpenRouterSetup';

const mockMutateAsync = jest.fn().mockResolvedValue({ success: true });

jest.mock('@hooks/mutations/useUserMutations', () => ({
  useSaveUserOpenRouterKey: () => ({
    mutateAsync: mockMutateAsync,
    isPending: false
  })
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
});

const renderSetup = (
  props: Partial<React.ComponentProps<typeof OpenRouterSetup>> = {}
) => {
  const defaultProps = {
    onKeySaved: jest.fn(),
    ...props
  };

  return {
    ...render(
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <MantineProvider>
            <OpenRouterSetup {...defaultProps} />
          </MantineProvider>
        </RecoilRoot>
      </QueryClientProvider>
    ),
    props: defaultProps
  };
};

describe('OpenRouterSetup Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders title, value badges, and external link to OpenRouter', () => {
    renderSetup();

    expect(screen.getByText('OpenRouter API Key Setup')).toBeInTheDocument();
    expect(screen.getByText('Free Models Available')).toBeInTheDocument();
    expect(screen.getByText('11 Simple Steps')).toBeInTheDocument();

    const openRouterLink = screen.getByRole('link', {
      name: /visit openrouter\.ai/i
    });
    expect(openRouterLink).toHaveAttribute('href', 'https://openrouter.ai/');
    expect(openRouterLink).toHaveAttribute('target', '_blank');
  });

  it('displays Step 1 by default and allows navigation with Next and Previous buttons', () => {
    renderSetup();

    expect(screen.getByText('Visit OpenRouter')).toBeInTheDocument();
    expect(screen.getByText(/Step 1 of 11/i)).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /next step/i });
    fireEvent.click(nextBtn);

    expect(screen.getByText('Click on "Get API Key"')).toBeInTheDocument();
    expect(screen.getByText(/Step 2 of 11/i)).toBeInTheDocument();

    const prevBtn = screen.getByRole('button', { name: /previous step/i });
    fireEvent.click(prevBtn);

    expect(screen.getByText('Visit OpenRouter')).toBeInTheDocument();
    expect(screen.getByText(/Step 1 of 11/i)).toBeInTheDocument();
  });

  it('switches between Step-by-Step and All Steps Overview modes and displays refined steps 7-11', () => {
    renderSetup();

    const overviewBtn = screen.getByRole('button', {
      name: /all steps overview/i
    });
    fireEvent.click(overviewBtn);

    expect(screen.getByText('1. Visit OpenRouter')).toBeInTheDocument();
    expect(screen.getByText('2. Click on "Get API Key"')).toBeInTheDocument();
    expect(screen.getByText('3. Sign In to OpenRouter')).toBeInTheDocument();
    expect(
      screen.getByText('6. Select Your Workspace Type')
    ).toBeInTheDocument();
    expect(
      screen.getByText('7. Your Workspace is Ready — Copy API Key')
    ).toBeInTheDocument();
    expect(
      screen.getByText('8. Add a Payment Method — Click "I will do it later"')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        '9. Survey: "Where did you first hear about OpenRouter?"'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText('10. You\'re All Set! — Click "Go to dashboard"')
    ).toBeInTheDocument();
    expect(
      screen.getByText('11. OpenRouter Dashboard & "API Keys" Navigation')
    ).toBeInTheDocument();

    const stepperBtn = screen.getByRole('button', { name: /step-by-step/i });
    fireEvent.click(stepperBtn);

    expect(screen.getByText(/Step 1 of 11/i)).toBeInTheDocument();
  });

  it('navigates through to step 7 and interacts with sample copy key button', () => {
    renderSetup();

    const nextBtn = screen.getByRole('button', { name: /next step/i });
    for (let i = 0; i < 6; i++) {
      fireEvent.click(nextBtn);
    }

    expect(
      screen.getByText('Your Workspace is Ready — Copy API Key')
    ).toBeInTheDocument();
    expect(screen.getByText(/Step 7 of 11/i)).toBeInTheDocument();

    const copySampleBtn = screen.getByRole('button', {
      name: /copy key/i
    });
    expect(copySampleBtn).toBeInTheDocument();
    fireEvent.click(copySampleBtn);
    expect(screen.getByText(/copied!/i)).toBeInTheDocument();
  });

  it('validates empty API key input upon submission', () => {
    const onKeySaved = jest.fn();
    renderSetup({ onKeySaved });

    const submitBtn = screen.getByRole('button', {
      name: /^save$/i
    });
    fireEvent.click(submitBtn);

    expect(
      screen.getByText('Please enter your OpenRouter API key.')
    ).toBeInTheDocument();
    expect(onKeySaved).not.toHaveBeenCalled();
    expect(mockMutateAsync).not.toHaveBeenCalled();
    expect(localStorage.getItem(OPENROUTER_API_KEY_STORAGE)).toBeNull();
  });

  it('validates short API key input upon submission', () => {
    const onKeySaved = jest.fn();
    renderSetup({ onKeySaved });

    const input = screen.getByLabelText(/openrouter api key/i);
    fireEvent.change(input, { target: { value: 'sk-short' } });

    const submitBtn = screen.getByRole('button', {
      name: /^save$/i
    });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/api key seems too short/i)).toBeInTheDocument();
    expect(onKeySaved).not.toHaveBeenCalled();
    expect(mockMutateAsync).not.toHaveBeenCalled();
  });

  it('saves valid API key to backend via mutation, stores in localStorage and calls onKeySaved', async () => {
    const onKeySaved = jest.fn();
    renderSetup({ onKeySaved });

    const validKey = 'sk-or-v1-abcdef1234567890abcdef1234567890';
    const input = screen.getByLabelText(/openrouter api key/i);
    fireEvent.change(input, { target: { value: validKey } });

    const submitBtn = screen.getByRole('button', {
      name: /^save$/i
    });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith(validKey);
      expect(localStorage.getItem(OPENROUTER_API_KEY_STORAGE)).toBe(validKey);
      expect(onKeySaved).toHaveBeenCalledWith(validKey);
    });
  });

  it('renders cancel button when onCancel prop is provided and triggers callback', () => {
    const onCancel = jest.fn();
    renderSetup({ onCancel, currentApiKey: 'sk-or-v1-existingkey12345' });

    const cancelButtons = screen.getAllByRole('button', {
      name: /cancel|back to courses/i
    });
    expect(cancelButtons.length).toBeGreaterThanOrEqual(1);

    fireEvent.click(cancelButtons[0]);
    expect(onCancel).toHaveBeenCalled();
  });
});
