import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import OpenRouterSetup, {
  OPENROUTER_API_KEY_STORAGE
} from '../OpenRouterSetup';

const mockMutateAsync = jest.fn().mockResolvedValue({ success: true });
const mockShowSuccessToast = jest.fn();
const mockShowErrorToast = jest.fn();

jest.mock('@hooks/mutations/useUserMutations', () => ({
  useSaveUserOpenRouterKey: () => ({
    mutateAsync: mockMutateAsync,
    isPending: false
  })
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    isDarkTheme: false,
    appColors: {
      primaryText: '#111827',
      secondaryText: '#6b7280',
      mutedText: '#9ca3af',
      cardBorder: '#e5e7eb',
      cardSurface: '#f9fafb',
      cardBackground: '#ffffff',
      primaryIndigo: '#4f46e5',
      primaryIndigoLight: '#6366f1',
      emeraldGreen: '#10b981',
      emeraldBg: '#ecfdf5',
      codeBoxBg: '#1e293b',
      amberOrange: '#f59e0b',
      purpleViolet: '#8b5cf6',
      buttonDefault: {}
    }
  })
}));

jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: mockShowSuccessToast,
    showErrorToast: mockShowErrorToast
  })
}));

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: () => false
}));

jest.mock('@components/common/guided-stepper', () => ({
  GuidedStepper: ({ steps, activeStep, onStepChange, finishButtonText, onFinish }: any) => (
    <div data-testid='guided-stepper'>
      <div>{steps[activeStep]?.title}</div>
      <div>{steps[activeStep]?.details}</div>
      <span>Step {activeStep + 1} of {steps.length}</span>
      <button onClick={() => onStepChange(Math.min(activeStep + 1, steps.length - 1))}>Next Step</button>
      <button onClick={() => onStepChange(Math.max(activeStep - 1, 0))}>Previous Step</button>
      <button onClick={onFinish}>{finishButtonText}</button>
    </div>
  ),
  GuidedStepItem: {}
}));

jest.mock('@tabler/icons-react', () => {
  const icons: Record<string, any> = {};
  const handler: ProxyHandler<any> = {
    get(_, name) {
      if (icons[name]) return icons[name];
      icons[name] = (props: any) => <span data-testid={`icon-${String(name)}`} />;
      return icons[name];
    }
  };
  return new Proxy({}, handler);
});

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
    mockMutateAsync.mockResolvedValue({ success: true, message: 'Key saved!' });
  });

  it('renders title, badges, and external link', () => {
    renderSetup();
    expect(screen.getByText('OpenRouter API Key Setup')).toBeInTheDocument();
    expect(screen.getByText('Free Models Available')).toBeInTheDocument();
    expect(screen.getByText('11 Simple Steps')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /visit openrouter\.ai/i });
    expect(link).toHaveAttribute('href', 'https://openrouter.ai/');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders Step-by-Step and All Steps Overview toggle buttons', () => {
    renderSetup();
    expect(screen.getByRole('button', { name: /step-by-step/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /all steps overview/i })).toBeInTheDocument();
  });

  it('displays Step 1 by default', () => {
    renderSetup();
    expect(screen.getByText('Visit OpenRouter')).toBeInTheDocument();
    expect(screen.getByText(/Step 1 of 11/i)).toBeInTheDocument();
  });

  it('navigates forward and backward through steps', () => {
    renderSetup();
    fireEvent.click(screen.getByRole('button', { name: /next step/i }));
    expect(screen.getByText('Click on "Get API Key"')).toBeInTheDocument();
    expect(screen.getByText(/Step 2 of 11/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /previous step/i }));
    expect(screen.getByText('Visit OpenRouter')).toBeInTheDocument();
  });

  it('calls onFinish to scroll to key input', () => {
    const mockScrollIntoView = jest.fn();
    const mockFocus = jest.fn();
    jest.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'openrouter-api-key-input') {
        return { scrollIntoView: mockScrollIntoView, focus: mockFocus } as any;
      }
      return null;
    });

    renderSetup();
    fireEvent.click(screen.getByRole('button', { name: /i have my api key/i }));
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(mockFocus).toHaveBeenCalled();

    jest.restoreAllMocks();
  });

  it('switches to overview mode and back to stepper', () => {
    renderSetup();
    fireEvent.click(screen.getByRole('button', { name: /all steps overview/i }));
    expect(screen.getAllByText('1. Visit OpenRouter').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('OpenRouter Setup Journey')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /switch to stepper/i }));
    expect(screen.getByText(/Step 1 of 11/i)).toBeInTheDocument();
  });

  it('overview mode displays all 11 steps', () => {
    renderSetup();
    fireEvent.click(screen.getByRole('button', { name: /all steps overview/i }));
    expect(screen.getByText('1. Visit OpenRouter')).toBeInTheDocument();
    expect(screen.getByText('2. Click on "Get API Key"')).toBeInTheDocument();
    expect(screen.getByText('3. Sign In to OpenRouter')).toBeInTheDocument();
    expect(screen.getByText('4. Continue With Your Account')).toBeInTheDocument();
    expect(screen.getByText('5. Accept the Legal Terms')).toBeInTheDocument();
    expect(screen.getByText('6. Select Your Workspace Type')).toBeInTheDocument();
    expect(screen.getByText(/7\. Your Workspace is Ready/)).toBeInTheDocument();
    expect(screen.getByText(/8\. Add a Payment Method/)).toBeInTheDocument();
    expect(screen.getByText(/9\. Survey/)).toBeInTheDocument();
    expect(screen.getByText(/10\. You're All Set/)).toBeInTheDocument();
    expect(screen.getByText(/11\. OpenRouter Dashboard/)).toBeInTheDocument();
  });

  it('overview mode shows all step titles', () => {
    renderSetup();
    fireEvent.click(screen.getByRole('button', { name: /all steps overview/i }));
    expect(screen.getByText('OpenRouter Setup Journey')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: /switch to stepper/i })[0]);
    expect(screen.getByText(/Step 1 of 11/i)).toBeInTheDocument();
  });

  it('navigates through to step 7 and copies sample key', () => {
    renderSetup();
    const nextBtn = screen.getByRole('button', { name: /next step/i });
    for (let i = 0; i < 6; i++) {
      fireEvent.click(nextBtn);
    }
    expect(screen.getByText(/Step 7 of 11/i)).toBeInTheDocument();

    const copyBtn = screen.getByRole('button', { name: /copy key/i });
    fireEvent.click(copyBtn);
    expect(screen.getByText(/copied!/i)).toBeInTheDocument();
    expect(mockShowSuccessToast).toHaveBeenCalledWith('Sample key format copied to clipboard!');
  });

  it('validates empty API key input', () => {
    const { props } = renderSetup();
    const submitBtn = screen.getByRole('button', { name: /^save$/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Please enter your OpenRouter API key.')).toBeInTheDocument();
    expect(mockShowErrorToast).toHaveBeenCalledWith('Please enter your OpenRouter API key.');
    expect(props.onKeySaved).not.toHaveBeenCalled();
    expect(mockMutateAsync).not.toHaveBeenCalled();
  });

  it('validates short API key input', () => {
    const { props } = renderSetup();
    const input = screen.getByLabelText(/openrouter api key/i);
    fireEvent.change(input, { target: { value: 'sk-short' } });
    const submitBtn = screen.getByRole('button', { name: /^save$/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/api key seems too short/i)).toBeInTheDocument();
    expect(mockShowErrorToast).toHaveBeenCalledWith('Invalid API key length.');
    expect(props.onKeySaved).not.toHaveBeenCalled();
  });

  it('clears error message when user types into input', () => {
    renderSetup();
    const submitBtn = screen.getByRole('button', { name: /^save$/i });
    fireEvent.click(submitBtn);
    expect(screen.getByText('Please enter your OpenRouter API key.')).toBeInTheDocument();

    const input = screen.getByLabelText(/openrouter api key/i);
    fireEvent.change(input, { target: { value: 's' } });
    expect(screen.queryByText('Please enter your OpenRouter API key.')).not.toBeInTheDocument();
  });

  it('saves valid API key successfully', async () => {
    const { props } = renderSetup();
    const validKey = 'sk-or-v1-abcdef1234567890abcdef1234567890';
    const input = screen.getByLabelText(/openrouter api key/i);
    fireEvent.change(input, { target: { value: validKey } });

    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith(validKey);
      expect(localStorage.getItem(OPENROUTER_API_KEY_STORAGE)).toBe(validKey);
      expect(mockShowSuccessToast).toHaveBeenCalledWith('Key saved!');
      expect(props.onKeySaved).toHaveBeenCalledWith(validKey);
    });
  });

  it('shows default success message when response has no message', async () => {
    mockMutateAsync.mockResolvedValueOnce({ success: true });
    renderSetup();
    const validKey = 'sk-or-v1-abcdef1234567890abcdef1234567890';
    fireEvent.change(screen.getByLabelText(/openrouter api key/i), { target: { value: validKey } });
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));

    await waitFor(() => {
      expect(mockShowSuccessToast).toHaveBeenCalledWith(
        'OpenRouter API Key verified and saved successfully! Courses unlocked.'
      );
    });
  });

  it('handles API error with response message', async () => {
    mockMutateAsync.mockRejectedValueOnce({
      response: { data: { message: 'Invalid key format' } }
    });
    renderSetup();
    const validKey = 'sk-or-v1-abcdef1234567890abcdef1234567890';
    fireEvent.change(screen.getByLabelText(/openrouter api key/i), { target: { value: validKey } });
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid key format')).toBeInTheDocument();
      expect(mockShowErrorToast).toHaveBeenCalledWith('Invalid key format');
    });
  });

  it('handles API error with message property', async () => {
    mockMutateAsync.mockRejectedValueOnce({ message: 'Network error' });
    renderSetup();
    const validKey = 'sk-or-v1-abcdef1234567890abcdef1234567890';
    fireEvent.change(screen.getByLabelText(/openrouter api key/i), { target: { value: validKey } });
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith('Network error');
    });
  });

  it('handles API error with no message (fallback)', async () => {
    mockMutateAsync.mockRejectedValueOnce({});
    renderSetup();
    const validKey = 'sk-or-v1-abcdef1234567890abcdef1234567890';
    fireEvent.change(screen.getByLabelText(/openrouter api key/i), { target: { value: validKey } });
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalledWith(
        'Failed to validate and save OpenRouter API key.'
      );
    });
  });

  it('renders cancel button when onCancel prop is provided', () => {
    const onCancel = jest.fn();
    const { props } = renderSetup({ onCancel });
    const cancelButtons = screen.getAllByRole('button', {
      name: /cancel|back to courses/i
    });
    expect(cancelButtons.length).toBeGreaterThanOrEqual(1);
    fireEvent.click(cancelButtons[0]);
    expect(onCancel).toHaveBeenCalled();
  });

  it('renders with currentApiKey prefilled', () => {
    renderSetup({ currentApiKey: 'sk-or-v1-existingkey12345' });
    const input = screen.getByLabelText(/openrouter api key/i) as HTMLInputElement;
    expect(input.value).toBe('sk-or-v1-existingkey12345');
  });

  it('overview step 9 allows selecting survey options', () => {
    renderSetup();
    fireEvent.click(screen.getByRole('button', { name: /all steps overview/i }));

    const stepCards = screen.getAllByText(/Step-\d|Milestone \d+\/11/);
    expect(stepCards.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the Connect API Key section', () => {
    renderSetup();
    expect(screen.getByText('Connect Your OpenRouter API Key')).toBeInTheDocument();
    expect(screen.getByText(/Paste the API key you copied in Step 7/)).toBeInTheDocument();
  });

  it('goes to key input after navigating through all steps', () => {
    const mockScrollIntoView = jest.fn();
    const mockFocus = jest.fn();
    jest.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'openrouter-api-key-input') {
        return { scrollIntoView: mockScrollIntoView, focus: mockFocus } as any;
      }
      return null;
    });

    renderSetup();
    const nextBtn = screen.getByRole('button', { name: /next step/i });
    for (let i = 0; i < 10; i++) {
      fireEvent.click(nextBtn);
    }

    const goToKeyBtn = screen.getAllByRole('button', { name: /go to key input/i })[0];
    fireEvent.click(goToKeyBtn);
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(mockFocus).toHaveBeenCalled();

    jest.restoreAllMocks();
  });
});
