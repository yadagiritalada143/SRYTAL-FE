import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const RegisterAdminBySuperAdmin = lazy(
  () => import('@super-admin/components/regsiter-admin/register-admin')
);
const SuperadminDashboard = lazy(
  () => import('@super-admin/pages/dashboard/dashboard')
);
const EmployeesForSuperadmin = lazy(
  () => import('@super-admin/components/employees/employee')
);
const DocumentsMenuForSuperadmin = lazy(
  () => import('@super-admin/components/documents/documents')
);

const SuperAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<SuperadminDashboard />}>
        <Route path="register-admin" element={<RegisterAdminBySuperAdmin />} />
        <Route path="employees" element={<EmployeesForSuperadmin />} />
        <Route path="documents" element={<DocumentsMenuForSuperadmin />} />
      </Route>
    </Routes>
  );
};

export default SuperAdminRoutes;
