import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { RecoilRoot } from 'recoil';
import EmployeeCoursePortal from '../EmployeeCoursePortal';
import { OPENROUTER_API_KEY_STORAGE } from '../OpenRouterSetup';

let mockBackendKey: string | null = null;
let mockIsKeyLoading = false;

jest.mock('@hooks/queries/useUserQueries', () => ({
  useGetMyAssignedCourses: () => ({
    data: [
      {
        courseAssignmentId: 'ca1',
        courseId: 'c1',
        courseName: 'Full-Stack Web Development',
        status: 'In Progress',
        progress: {
          totalTasks: 10,
          completedTasks: 4,
          percentComplete: 40
        }
      }
    ],
    isLoading: false,
    error: null,
    refetch: jest.fn()
  }),
  useGetUserDetails: () => ({
    data: { id: 'usr-12345' },
    isLoading: false
  }),
  useGetUserOpenRouterKey: (userId: string) => ({
    data:
      mockBackendKey !== null
        ? {
            success: true,
            message: 'User OpenRouter key fetched successfully',
            data: {
              _id: 'key-doc-1',
              userId,
              openrouterKey: mockBackendKey
            }
          }
        : null,
    isLoading: mockIsKeyLoading,
    isFetched: !mockIsKeyLoading,
    refetch: jest.fn()
  })
}));

jest.mock('@hooks/mutations/useUserMutations', () => ({
  useSaveUserOpenRouterKey: () => ({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false
  })
}));

const renderPortal = () => {
  return render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <EmployeeCoursePortal />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

describe('EmployeeCoursePortal Component - OpenRouter Key Gating & Backend Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    mockBackendKey = null;
    mockIsKeyLoading = false;
  });

  it('shows loading state while checking the user key from the backend when not cached locally', () => {
    mockIsKeyLoading = true;
    renderPortal();

    expect(
      screen.queryByText('OpenRouter API Key Setup')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('My Courses')).not.toBeInTheDocument();
  });

  it('renders OpenRouter setup guide when no API key is present in backend', () => {
    mockBackendKey = null;
    renderPortal();

    expect(screen.getByText('OpenRouter API Key Setup')).toBeInTheDocument();
    expect(
      screen.getByText('Connect Your OpenRouter API Key')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Full-Stack Web Development')
    ).not.toBeInTheDocument();
  });

  it('renders OpenRouter setup guide when backend returns empty openrouterKey ("") even if localStorage had an old key', () => {
    localStorage.setItem(
      OPENROUTER_API_KEY_STORAGE,
      'sk-or-v1-oldstaleinvaliddummykey'
    );
    mockBackendKey = ''; // Backend returns empty key string: "openrouterKey": ""
    renderPortal();

    // Must show setup guide because BE has no key
    expect(screen.getByText('OpenRouter API Key Setup')).toBeInTheDocument();
    expect(
      screen.getByText('Connect Your OpenRouter API Key')
    ).toBeInTheDocument();
    // Must NOT show courses module
    expect(
      screen.queryByText('Full-Stack Web Development')
    ).not.toBeInTheDocument();
    // Stale key must be removed from localStorage
    expect(localStorage.getItem(OPENROUTER_API_KEY_STORAGE)).toBeNull();
  });

  it('automatically unlocks the portal when the backend returns a valid user OpenRouter key', () => {
    mockBackendKey = 'sk-or-v1-backendkey1234567890';
    renderPortal();

    expect(screen.getByText('My Courses')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Web Development')).toBeInTheDocument();
    // Confirms OpenRouter Key Configured button was removed
    expect(
      screen.queryByRole('button', { name: /openrouter key configured/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('OpenRouter API Key Setup')
    ).not.toBeInTheDocument();
    expect(localStorage.getItem(OPENROUTER_API_KEY_STORAGE)).toBe(
      'sk-or-v1-backendkey1234567890'
    );
  });

  it('renders only the courses portal with no back, configure, or API Key Settings button when backend key is active', () => {
    mockBackendKey = 'sk-or-v1-validkey1234567890';
    renderPortal();

    expect(screen.getByText('My Courses')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Web Development')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /openrouter key configured/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /api key settings/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('OpenRouter API Key Setup')
    ).not.toBeInTheDocument();
  });

  it('switches to OpenRouter setup guide within courses menu when navigated with setup query param and returns to courses on cancel', () => {
    mockBackendKey = 'sk-or-v1-validkey1234567890';
    window.history.pushState({}, 'Test', '/?setup=true');
    renderPortal();

    // OpenRouter API Key Setup must be displayed in the courses menu
    expect(screen.getByText('OpenRouter API Key Setup')).toBeInTheDocument();
    expect(screen.queryByText('My Courses')).not.toBeInTheDocument();

    // Click Back to Courses button
    const backBtn = screen.getByRole('button', { name: /back to courses/i });
    fireEvent.click(backBtn);

    // Must return back to the courses portal
    expect(screen.getByText('My Courses')).toBeInTheDocument();
    expect(
      screen.queryByText('OpenRouter API Key Setup')
    ).not.toBeInTheDocument();
  });
});
