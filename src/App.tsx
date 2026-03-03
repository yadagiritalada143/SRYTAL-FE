import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MantineProvider, Center, Loader } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { useAppTheme } from '@hooks/use-app-theme';
import PremiumLoader from '@components/common/loaders/PremiumLoader';

const Landing = lazy(() => import('@landing/pages/landing'));
const AdminRoutes = lazy(() => import('./routes/admin'));
const EmployeeRoutes = lazy(() => import('./routes/user'));
const SuperAdminRoutes = lazy(() => import('./routes/super-admin'));
const CommonForgetPassword = lazy(() => import('./routes/common'));

const App: React.FC = () => {
  const { themeConfig, isDarkTheme } = useAppTheme();

  return (
    <MantineProvider
      theme={themeConfig}
      forceColorScheme={isDarkTheme ? 'dark' : 'light'}
    >
      <ModalsProvider>
        <Router>
          <Suspense
            fallback={<PremiumLoader label='SRYTAL' minHeight='100vh' />}
          >
            <Routes>
              <Route path='/' element={<Landing />} />

              <Route path='/:organization/admin/*' element={<AdminRoutes />} />
              <Route
                path='/:organization/employee/*'
                element={<EmployeeRoutes />}
              />
              <Route path='/superadmin/*' element={<SuperAdminRoutes />} />
              <Route path='/*' element={<CommonForgetPassword />} />
            </Routes>
          </Suspense>
        </Router>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default App;
