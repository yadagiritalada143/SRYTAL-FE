import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

let mockCatalog: any[] = [];
let mockRoleAccess: any = null;
let mockUserAccess: any = null;
let mockEmployees: any[] = [];

jest.mock('@constants', () => ({
  ROLES: {
    ADMIN: 'admin',
    SUPER_ADMIN: 'superadmin',
    USER: 'Employee',
    RECRUITER: 'Recruiter',
    CONTENT_WRITER: 'ContentWriter'
  }
}));

jest.mock('@hooks/queries/useNavQueries', () => ({
  useGetNavCatalog: () => ({ data: mockCatalog, isLoading: false }),
  useGetNavRoleAccess: () => ({ data: mockRoleAccess, isLoading: false }),
  useGetNavUserAccess: () => ({ data: mockUserAccess, isLoading: false })
}));

const mockUpdateRoleMutate = jest.fn();
const mockUpdateUserMutate = jest.fn();
jest.mock('@hooks/mutations/useNavMutations', () => ({
  useUpdateNavRoleAccess: () => ({
    mutate: mockUpdateRoleMutate,
    isPending: false
  }),
  useUpdateNavUserAccess: () => ({
    mutate: mockUpdateUserMutate,
    isPending: false
  })
}));

jest.mock('@hooks/queries/useAdminQueries', () => ({
  useGetAllEmployeesByAdmin: () => ({ data: mockEmployees })
}));

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      button: { color: '#495057', textColor: '#ffffff' }
    },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

const mockShowSuccessToast = jest.fn();
const mockShowErrorToast = jest.fn();
jest.mock('@utils/common/toast', () => ({
  useCustomToast: () => ({
    showSuccessToast: mockShowSuccessToast,
    showErrorToast: mockShowErrorToast
  })
}));

jest.mock('@utils/common/get-error-message', () => ({
  getErrorMessage: (_e: any, fallback: string) => fallback
}));

jest.mock('@components/common/loaders/SkeletonLoader', () => ({
  __esModule: true,
  default: () => <div data-testid='skeleton'>skeleton</div>
}));

jest.mock('@components/common/button/CommonButton', () => ({
  CommonButton: ({
    children,
    onClick,
    disabled,
    type
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'reset' | 'submit';
  }) => (
    <button type={type ?? 'button'} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}));

jest.mock('@mantine/core', () => {
  const actual = jest.requireActual('@mantine/core');
  return {
    ...actual,
    Select: ({ label, data = [], value, onChange, placeholder }: any) => (
      <select
        data-testid={`select-${label}`}
        aria-label={label}
        value={value ?? ''}
        onChange={e => onChange?.(e.target.value || null)}
      >
        {placeholder ? <option value=''>{placeholder}</option> : null}
        {data.map((item: any) => (
          <option key={item.value ?? item} value={item.value ?? item}>
            {item.label ?? item}
          </option>
        ))}
      </select>
    ),
    SegmentedControl: ({ value, onChange, data }: any) => (
      <div role='group'>
        {data.map((opt: any) => (
          <button
            key={opt.value}
            type='button'
            aria-pressed={value === opt.value}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    )
  };
});

import NavAccess from '../NavAccess';

const renderNavAccess = () => {
  return render(
    <RecoilRoot>
      <MantineProvider>
        <BrowserRouter>
          <NavAccess />
        </BrowserRouter>
      </MantineProvider>
    </RecoilRoot>
  );
};

const mockCatalogData = [
  {
    key: 'profile',
    label: 'Profile',
    url: '/x/profile',
    icon: 'profile',
    surface: 'employee',
    order: 1,
    isSystem: true
  },
  {
    key: 'root1',
    label: 'Employee Dashboard',
    url: '/x/employee/dashboard',
    icon: 'dash',
    surface: 'employee',
    order: 2,
    isSystem: false
  },
  {
    key: 'catalog',
    label: 'Catalog',
    icon: 'catalog',
    surface: 'employee',
    order: 3,
    isSystem: false,
    parentKey: null
  },
  {
    key: 'course',
    label: 'Courses',
    icon: 'course',
    surface: 'employee',
    order: 4,
    isSystem: false,
    parentKey: 'catalog'
  }
];

describe('NavAccess', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCatalog = mockCatalogData;
    mockRoleAccess = { navKeys: ['profile', 'root1'] };
    mockUserAccess = null;
    mockEmployees = [
      {
        id: 'emp1',
        firstName: 'Jane',
        lastName: 'Doe',
        employeeId: 'E001',
        userRole: 'Employee'
      }
    ];
    mockUpdateRoleMutate.mockImplementation((_payload, meta) =>
      meta?.onSuccess?.()
    );
    mockUpdateUserMutate.mockImplementation((_payload, meta) =>
      meta?.onSuccess?.()
    );
  });

  it('renders the title and description', () => {
    renderNavAccess();
    expect(screen.getByText('Menu Access')).toBeInTheDocument();
    expect(
      screen.getByText(/Control which navigation items each role sees/)
    ).toBeInTheDocument();
  });

  it('renders the role catalog rows with group badge for parents', () => {
    renderNavAccess();
    expect(screen.getByText('Employee Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Courses')).toBeInTheDocument();
    expect(screen.getAllByText('group').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('/employee/dashboard')).toBeInTheDocument();
  });

  it('locks system items', () => {
    renderNavAccess();
    expect(screen.getByRole('checkbox', { name: /Profile/ })).toBeDisabled();
  });

  it('saves the checked keys with parents in role mode', async () => {
    renderNavAccess();

    await act(async () => {
      fireEvent.click(screen.getByRole('checkbox', { name: /Catalog/ }));
      fireEvent.click(screen.getByRole('checkbox', { name: /Courses/ }));
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    });

    expect(mockUpdateRoleMutate).toHaveBeenCalledWith(
      {
        role: 'Employee',
        navKeys: expect.arrayContaining(['catalog', 'course'])
      },
      expect.anything()
    );
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'Role menu access updated'
    );
  });

  it('saves the initial role grants when nothing is toggled', async () => {
    renderNavAccess();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    });

    expect(mockUpdateRoleMutate).toHaveBeenCalledWith(
      {
        role: 'Employee',
        navKeys: expect.arrayContaining(['profile', 'root1'])
      },
      expect.anything()
    );
  });

  it('prompts the user to pick an employee in user mode', async () => {
    renderNavAccess();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'By User' }));
    });

    expect(
      screen.getByText('Select an employee to manage their menu items.')
    ).toBeInTheDocument();
    const saveButton = screen.getByRole('button', { name: 'Save changes' });
    expect(saveButton).toBeDisabled();
  });

  it('loads a user override, marks inherited keys and saves the diff', async () => {
    mockUserAccess = {
      success: true,
      surface: 'employee',
      roleKeys: ['profile', 'root1'],
      addedKeys: ['course'],
      removedKeys: ['root1']
    };
    renderNavAccess();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'By User' }));
    });

    await act(async () => {
      fireEvent.change(screen.getByTestId('select-Employee'), {
        target: { value: 'emp1' }
      });
    });

    expect(
      screen.getByRole('checkbox', { name: /Employee Dashboard/ })
    ).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /Courses/ })).toBeChecked();
    expect(screen.getAllByText('from role').length).toBeGreaterThanOrEqual(2);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    });

    expect(mockUpdateUserMutate).toHaveBeenCalledWith(
      {
        userId: 'emp1',
        addedKeys: expect.arrayContaining(['course', 'catalog']),
        removedKeys: ['root1']
      },
      expect.anything()
    );
    expect(mockShowSuccessToast).toHaveBeenCalledWith(
      'User menu access updated'
    );
  });

  it('shows no employees when the list is empty', async () => {
    mockEmployees = [];
    renderNavAccess();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'By User' }));
    });

    const employeeSelect = screen.getByTestId('select-Employee');
    expect(Array.from(employeeSelect.querySelectorAll('option')).length).toBe(
      1
    );
  });
});
