import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OpenRouterKeyModal } from './OpenRouterKeyModal';

const mockMutateAsync = jest
  .fn()
  .mockResolvedValue({
    success: true,
    message: 'Key is Valid and saved successfully !'
  });

jest.mock('@hooks/mutations/useUserMutations', () => ({
  useSaveUserOpenRouterKey: () => ({
    mutateAsync: mockMutateAsync,
    isPending: false
  })
}));

const mockRefetch = jest.fn();

jest.mock('@hooks/queries/useUserQueries', () => ({
  useGetUserOpenRouterKey: () => ({
    data: {
      success: true,
      data: {
        openrouterKey: 'sk-or-v1-abcdef1234567890abcdef1234567890',
        updatedAt: '2026-09-08T10:00:00.000Z'
      }
    },
    isLoading: false,
    refetch: mockRefetch
  })
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
});

const renderModal = (
  opened = true,
  onClose = jest.fn(),
  onOpenSetupGuide?: () => void
) => {
  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <MantineProvider>
            <OpenRouterKeyModal
              opened={opened}
              onClose={onClose}
              onOpenSetupGuide={onOpenSetupGuide}
            />
          </MantineProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

describe('OpenRouterKeyModal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders status, masked key, and action controls when open', () => {
    renderModal(true);

    expect(
      screen.getByText('OpenRouter API Key Management')
    ).toBeInTheDocument();
    expect(screen.getByText('Active & Verified')).toBeInTheDocument();
    expect(screen.getByText(/sk-or-v1/i)).toBeInTheDocument();
    expect(screen.getByText('Validate & Save Key')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /open setup guide/i })
    ).toBeInTheDocument();
  });

  it('validates key input on save', async () => {
    renderModal(true);

    const input = screen.getByLabelText(/new openrouter api key/i);
    fireEvent.change(input, {
      target: { value: 'sk-or-v1-newvalidkey998877665544332211' }
    });

    const saveBtn = screen.getByRole('button', {
      name: /validate & save key/i
    });
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith(
        'sk-or-v1-newvalidkey998877665544332211'
      );
    });
  });

  it('triggers onOpenSetupGuide and onClose when Open Setup Guide button is clicked', () => {
    const onClose = jest.fn();
    const onOpenSetupGuide = jest.fn();
    renderModal(true, onClose, onOpenSetupGuide);

    const setupGuideBtn = screen.getByRole('button', {
      name: /open setup guide/i
    });
    fireEvent.click(setupGuideBtn);

    expect(onClose).toHaveBeenCalled();
    expect(onOpenSetupGuide).toHaveBeenCalled();
  });
});
