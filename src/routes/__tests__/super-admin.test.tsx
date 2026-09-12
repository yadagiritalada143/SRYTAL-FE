import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import SuperAdminRoutes from '../super-admin';

jest.mock('@super-admin/components/regsiter-admin/register-admin', () => {
  const m = jest.fn(() => <div>RegisterAdminBySuperAdmin</div>);
  return { __esModule: true, default: m };
});

jest.mock('@super-admin/pages/dashboard/dashboard', () => {
  const { Outlet } = jest.requireActual('react-router-dom');
  const m = jest.fn(() => (
    <div>
      SuperadminDashboard
      <Outlet />
    </div>
  ));
  return { __esModule: true, default: m };
});

jest.mock('@super-admin/components/employees/employee', () => {
  const m = jest.fn(() => <div>EmployeesForSuperadmin</div>);
  return { __esModule: true, default: m };
});

jest.mock('@super-admin/components/documents/documents', () => {
  const m = jest.fn(() => <div>DocumentsMenuForSuperadmin</div>);
  return { __esModule: true, default: m };
});

const renderRoutes = (path: string) => {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Suspense fallback={<div>loading-routes</div>}>
        <Routes>
          <Route path='/superadmin/*' element={<SuperAdminRoutes />} />
        </Routes>
      </Suspense>
    </MemoryRouter>
  );
};

describe('SuperAdminRoutes', () => {
  it('renders without crashing', async () => {
    renderRoutes('/superadmin/dashboard');
    expect(await screen.findByText('SuperadminDashboard')).toBeInTheDocument();
  });

  it('renders the register-admin child route', async () => {
    renderRoutes('/superadmin/dashboard/register-admin');
    expect(
      await screen.findByText('RegisterAdminBySuperAdmin')
    ).toBeInTheDocument();
  });

  it('renders the employees child route', async () => {
    renderRoutes('/superadmin/dashboard/employees');
    expect(
      await screen.findByText('EmployeesForSuperadmin')
    ).toBeInTheDocument();
  });

  it('renders the documents child route', async () => {
    renderRoutes('/superadmin/dashboard/documents');
    expect(
      await screen.findByText('DocumentsMenuForSuperadmin')
    ).toBeInTheDocument();
  });
});
