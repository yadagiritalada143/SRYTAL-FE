import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MantineProvider, Center, Loader } from '@mantine/core';
import { RecoilRoot } from 'recoil';
import { ModalsProvider } from '@mantine/modals';

const Landing = lazy(() => import('@landing/pages/landing'));
const AdminRoutes = lazy(() => import('./routes/admin'));
const EmployeeRoutes = lazy(() => import('./routes/user'));
const SuperAdminRoutes = lazy(() => import('./routes/super-admin'));
const CommonForgetPassword = lazy(() => import('./routes/common'));

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <MantineProvider>
        <ModalsProvider>
          <Router>
            <Suspense
              fallback={
                <Center h="100vh">
                  <Loader size="xl" type="bars" />
                </Center>
              }
            >
              <Routes>
                <Route path="/" element={<Landing />} />

                <Route
                  path="/:organization/admin/*"
                  element={<AdminRoutes />}
                />
                <Route
                  path="/:organization/employee/*"
                  element={<EmployeeRoutes />}
                />
                <Route path="/superadmin/*" element={<SuperAdminRoutes />} />
                <Route path="/*" element={<CommonForgetPassword />} />
              </Routes>
            </Suspense>
          </Router>
        </ModalsProvider>
      </MantineProvider>
    </RecoilRoot>
  );
};

export default App;
