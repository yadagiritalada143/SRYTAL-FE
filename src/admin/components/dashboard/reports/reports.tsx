import { useMantineTheme } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useAppTheme } from '@hooks/use-app-theme';

const Reports = () => {
  const theme = useMantineTheme();
  const { themeConfig } = useAppTheme();

  return (
    <div
      style={{
        color: themeConfig.button.textColor,
        fontFamily: theme.fontFamily
      }}
      className='h-auto'
    >
      <Outlet />
    </div>
  );
};

export default Reports;
