import { Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import NotFound from '@components/common/not-found/not-found';
import { useAppTheme } from '@hooks/use-app-theme';

const CommonRoutes: React.FC = () => {
  const { themeConfig, isDarkTheme } = useAppTheme();

  return (
    <MantineProvider
      theme={themeConfig}
      forceColorScheme={isDarkTheme ? 'dark' : 'light'}
    >
      <Routes>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </MantineProvider>
  );
};

export default CommonRoutes;
