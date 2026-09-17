import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import React from 'react';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: jest.fn()
}));

jest.mock('@UI/Buttonsanimate/Countbutton', () => (props: any) => (
  <div data-testid='count-button'>{props.children}</div>
));

jest.mock('@UI/Buttonsanimate/Button', () => (props: any) => (
  <button data-testid='button-animate' onClick={props.onClick}>
    {props.primaryText}
  </button>
));

jest.mock('@utils/common/constants', () => ({
  organizationEmployeeUrls: jest.fn((org) => `/${org}/employee`)
}));

const Mentees = require('../mentees').default;
const mockUseAppTheme =
  jest.requireMock('@hooks/use-app-theme').useAppTheme;

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

describe('Mentees Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockUseAppTheme.mockReturnValue({
      themeConfig: {
        color: '#495057',
        backgroundColor: '#ffffff',
        borderColor: '#dee2e6',
        button: { color: '#495057', textColor: '#ffffff' }
      },
      organizationConfig: { organization_name: 'srytal' },
      isDarkTheme: false
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows loading state initially', () => {
    render(
      <Wrapper>
        <Mentees />
      </Wrapper>
    );

    expect(
      document.querySelector('.mantine-Loader-root')
    ).toBeInTheDocument();
  });

  it('renders the title', () => {
    render(
      <Wrapper>
        <Mentees />
      </Wrapper>
    );

    expect(screen.getByText('Mentee Tasks Flow')).toBeInTheDocument();
  });

  it('renders search input', () => {
    render(
      <Wrapper>
        <Mentees />
      </Wrapper>
    );

    expect(
      screen.getByPlaceholderText('Search by name or EMP ID ...')
    ).toBeInTheDocument();
  });

  it('renders mentee cards after loading', async () => {
    render(
      <Wrapper>
        <Mentees />
      </Wrapper>
    );

    jest.advanceTimersByTime(1100);

    await waitFor(() => {
      expect(screen.getAllByText('Sai Babu').length).toBeGreaterThanOrEqual(1);
    });

    expect(screen.getAllByText('Ravi Kumar').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Anitha').length).toBeGreaterThanOrEqual(1);
  });

  it('paginates mentees correctly', async () => {
    render(
      <Wrapper>
        <Mentees />
      </Wrapper>
    );

    jest.advanceTimersByTime(1100);

    await waitFor(() => {
      expect(screen.getAllByText('Sai Babu').length).toBeGreaterThanOrEqual(1);
    });

    const paginationControls = document.querySelectorAll(
      '.mantine-Pagination-control'
    );
    expect(paginationControls.length).toBeGreaterThan(1);
  });

  it('filters mentees by search', async () => {
    render(
      <Wrapper>
        <Mentees />
      </Wrapper>
    );

    jest.advanceTimersByTime(1100);

    await waitFor(() => {
      expect(screen.getAllByText('Sai Babu').length).toBeGreaterThanOrEqual(1);
    });

    const searchInput = screen.getByPlaceholderText(
      'Search by name or EMP ID ...'
    );
    fireEvent.change(searchInput, { target: { value: 'Ravi' } });

    expect(
      screen.getAllByText('Ravi Kumar').length
    ).toBeGreaterThanOrEqual(1);
  });

  it('shows no results message when search yields nothing', async () => {
    render(
      <Wrapper>
        <Mentees />
      </Wrapper>
    );

    jest.advanceTimersByTime(1100);

    await waitFor(() => {
      expect(screen.getAllByText('Sai Babu').length).toBeGreaterThanOrEqual(1);
    });

    const searchInput = screen.getByPlaceholderText(
      'Search by name or EMP ID ...'
    );
    fireEvent.change(searchInput, { target: { value: 'zzzzzzz' } });

    expect(
      screen.getByText('No search results found')
    ).toBeInTheDocument();
  });

  it('renders count buttons with task counts', async () => {
    render(
      <Wrapper>
        <Mentees />
      </Wrapper>
    );

    jest.advanceTimersByTime(1100);

    await waitFor(() => {
      expect(screen.getAllByText('3 Tasks').length).toBeGreaterThanOrEqual(1);
    });
  });

  it('renders assign buttons', async () => {
    render(
      <Wrapper>
        <Mentees />
      </Wrapper>
    );

    jest.advanceTimersByTime(1100);

    await waitFor(() => {
      const assignButtons = screen.getAllByText('Assign');
      expect(assignButtons.length).toBeGreaterThan(0);
    });
  });

  it('displays email and joining date', async () => {
    render(
      <Wrapper>
        <Mentees />
      </Wrapper>
    );

    jest.advanceTimersByTime(1100);

    await waitFor(() => {
      expect(
        screen.getAllByText(/sai@gmail.com/).length
      ).toBeGreaterThanOrEqual(1);
    });

    expect(
      screen.getAllByText(/2025-04-25/).length
    ).toBeGreaterThanOrEqual(1);
  });
});
