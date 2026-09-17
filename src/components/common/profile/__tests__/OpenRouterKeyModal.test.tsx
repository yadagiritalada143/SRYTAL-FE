import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import React from 'react';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: jest.fn()
}));

jest.mock('@utils/common/toast', () => ({
  useCustomToast: jest.fn()
}));

jest.mock('@hooks/queries/useUserQueries', () => ({
  useGetUserOpenRouterKey: jest.fn()
}));

jest.mock('@hooks/mutations/useUserMutations', () => ({
  useSaveUserOpenRouterKey: jest.fn()
}));

jest.mock('@user/components/dashboard/course-portal/OpenRouterSetup', () => ({
  OPENROUTER_API_KEY_STORAGE: 'openrouter_api_key'
}));

const { OpenRouterKeyModal } = require('../OpenRouterKeyModal');
const mockUseAppTheme = jest.requireMock('@hooks/use-app-theme').useAppTheme;
const mockUseCustomToast = jest.requireMock(
  '@utils/common/toast'
).useCustomToast;
const mockUseGetUserOpenRouterKey = jest.requireMock(
  '@hooks/queries/useUserQueries'
).useGetUserOpenRouterKey;
const mockUseSaveUserOpenRouterKey = jest.requireMock(
  '@hooks/mutations/useUserMutations'
).useSaveUserOpenRouterKey;

const qc = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <RecoilRoot>
    <QueryClientProvider client={qc}>
      <MantineProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  </RecoilRoot>
);

describe('OpenRouterKeyModal Component', () => {
  const mockOnClose = jest.fn();
  const mockShowSuccessToast = jest.fn();
  const mockShowErrorToast = jest.fn();
  const mockMutateAsync = jest.fn();
  const mockRefetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    mockUseAppTheme.mockReturnValue({
      isDarkTheme: false,
      appColors: {
        primaryText: '#f8fafc',
        secondaryText: '#cbd5e1',
        mutedText: '#94a3b8'
      },
      themeConfig: {
        color: '#212529'
      }
    });
    mockUseCustomToast.mockReturnValue({
      showSuccessToast: mockShowSuccessToast,
      showErrorToast: mockShowErrorToast
    });
    mockUseGetUserOpenRouterKey.mockReturnValue({
      data: { data: { openrouterKey: '', updatedAt: null } },
      refetch: mockRefetch
    });
    mockUseSaveUserOpenRouterKey.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false
    });
  });

  it('renders the modal when opened', () => {
    render(
      <Wrapper>
        <OpenRouterKeyModal opened={true} onClose={mockOnClose} />
      </Wrapper>
    );

    expect(
      screen.getByText('OpenRouter API Key Management')
    ).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Wrapper>
        <OpenRouterKeyModal opened={false} onClose={mockOnClose} />
      </Wrapper>
    );

    expect(
      screen.queryByText('OpenRouter API Key Management')
    ).not.toBeInTheDocument();
  });

  it('shows encrypted badge', () => {
    render(
      <Wrapper>
        <OpenRouterKeyModal opened={true} onClose={mockOnClose} />
      </Wrapper>
    );

    expect(screen.getByText('Encrypted')).toBeInTheDocument();
  });

  it('shows key status section', () => {
    render(
      <Wrapper>
        <OpenRouterKeyModal opened={true} onClose={mockOnClose} />
      </Wrapper>
    );

    expect(screen.getByText('CURRENT API KEY STATUS')).toBeInTheDocument();
  });

  it('shows not configured state when no key exists', () => {
    render(
      <Wrapper>
        <OpenRouterKeyModal opened={true} onClose={mockOnClose} />
      </Wrapper>
    );

    expect(screen.getByText('Not Configured')).toBeInTheDocument();
    expect(screen.getByText('Key Required')).toBeInTheDocument();
  });

  it('shows configured state when key exists', () => {
    mockUseGetUserOpenRouterKey.mockReturnValue({
      data: {
        data: {
          openrouterKey: 'sk-or-v1-abcdefghijklmnop',
          updatedAt: '2026-09-10T12:00:00Z'
        }
      },
      refetch: mockRefetch
    });

    render(
      <Wrapper>
        <OpenRouterKeyModal opened={true} onClose={mockOnClose} />
      </Wrapper>
    );

    expect(screen.getByText('Active & Verified')).toBeInTheDocument();
    expect(screen.getByText('Authenticated Provider')).toBeInTheDocument();
  });

  it('renders the password input for API key', () => {
    render(
      <Wrapper>
        <OpenRouterKeyModal opened={true} onClose={mockOnClose} />
      </Wrapper>
    );

    expect(screen.getByLabelText('New OpenRouter API Key')).toBeInTheDocument();
  });

  it('renders validate and save button', () => {
    render(
      <Wrapper>
        <OpenRouterKeyModal opened={true} onClose={mockOnClose} />
      </Wrapper>
    );

    expect(screen.getByText('Validate & Save Key')).toBeInTheDocument();
  });

  it('renders close button', () => {
    render(
      <Wrapper>
        <OpenRouterKeyModal opened={true} onClose={mockOnClose} />
      </Wrapper>
    );

    const closeBtn = screen.getByText('Close');
    expect(closeBtn).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <Wrapper>
        <OpenRouterKeyModal opened={true} onClose={mockOnClose} />
      </Wrapper>
    );

    fireEvent.click(screen.getByText('Close'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('shows setup guide section', () => {
    render(
      <Wrapper>
        <OpenRouterKeyModal opened={true} onClose={mockOnClose} />
      </Wrapper>
    );

    expect(
      screen.getByText('Need a new key or is your current key expired?')
    ).toBeInTheDocument();
    expect(screen.getByText('Open Setup Guide')).toBeInTheDocument();
  });

  it('shows empty key validation error', async () => {
    render(
      <Wrapper>
        <OpenRouterKeyModal opened={true} onClose={mockOnClose} />
      </Wrapper>
    );

    fireEvent.click(screen.getByText('Validate & Save Key'));

    await waitFor(() => {
      expect(
        screen.getByText('Please enter an OpenRouter API key to validate.')
      ).toBeInTheDocument();
    });
  });

  it('shows short key validation error', async () => {
    render(
      <Wrapper>
        <OpenRouterKeyModal opened={true} onClose={mockOnClose} />
      </Wrapper>
    );

    const input = screen.getByLabelText('New OpenRouter API Key');
    fireEvent.change(input, { target: { value: 'short' } });
    fireEvent.click(screen.getByText('Validate & Save Key'));

    await waitFor(() => {
      expect(screen.getByText(/API key seems too short/)).toBeInTheDocument();
    });
  });

  it('saves key successfully', async () => {
    mockMutateAsync.mockResolvedValue({ message: 'Key saved!' });

    render(
      <Wrapper>
        <OpenRouterKeyModal opened={true} onClose={mockOnClose} />
      </Wrapper>
    );

    const input = screen.getByLabelText('New OpenRouter API Key');
    fireEvent.change(input, {
      target: { value: 'sk-or-v1-abcdefghijklmnop' }
    });
    fireEvent.click(screen.getByText('Validate & Save Key'));

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith('sk-or-v1-abcdefghijklmnop');
    });

    await waitFor(() => {
      expect(mockShowSuccessToast).toHaveBeenCalled();
    });
  });

  it('handles save key error', async () => {
    mockMutateAsync.mockRejectedValue({
      response: { data: { message: 'Invalid key' } }
    });

    render(
      <Wrapper>
        <OpenRouterKeyModal opened={true} onClose={mockOnClose} />
      </Wrapper>
    );

    const input = screen.getByLabelText('New OpenRouter API Key');
    fireEvent.change(input, {
      target: { value: 'sk-or-v1-invalidkey123456' }
    });
    fireEvent.click(screen.getByText('Validate & Save Key'));

    await waitFor(() => {
      expect(mockShowErrorToast).toHaveBeenCalled();
    });
  });

  it('shows openrouter.ai/keys link', () => {
    render(
      <Wrapper>
        <OpenRouterKeyModal opened={true} onClose={mockOnClose} />
      </Wrapper>
    );

    expect(screen.getByText('openrouter.ai/keys')).toBeInTheDocument();
  });

  it('shows no key message when key not configured', () => {
    render(
      <Wrapper>
        <OpenRouterKeyModal opened={true} onClose={mockOnClose} />
      </Wrapper>
    );

    expect(screen.getByText(/No OpenRouter API key found/)).toBeInTheDocument();
  });

  it('handles onKeyUpdated callback', async () => {
    mockMutateAsync.mockResolvedValue({ message: 'OK' });
    const onKeyUpdated = jest.fn();

    render(
      <Wrapper>
        <OpenRouterKeyModal
          opened={true}
          onClose={mockOnClose}
          onKeyUpdated={onKeyUpdated}
        />
      </Wrapper>
    );

    const input = screen.getByLabelText('New OpenRouter API Key');
    fireEvent.change(input, {
      target: { value: 'sk-or-v1-abcdefghijklmnop' }
    });
    fireEvent.click(screen.getByText('Validate & Save Key'));

    await waitFor(() => {
      expect(onKeyUpdated).toHaveBeenCalledWith('sk-or-v1-abcdefghijklmnop');
    });
  });
});
