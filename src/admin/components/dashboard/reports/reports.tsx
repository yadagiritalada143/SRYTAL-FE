import { useMantineTheme } from '@mantine/core';
import { useRecoilValue } from 'recoil';


import { Outlet } from 'react-router-dom';
import { useMemo } from 'react';
import { useAppTheme } from '@hooks/use-app-theme';


const Reports = () => {
  const theme = useMantineTheme();
  const { themeConfig: currentThemeConfig, organizationConfig, isDarkTheme } = useAppTheme();
  
  


  return (
    <div
      style={{
        color: currentThemeConfig.button.textColor,
        fontFamily: theme.fontFamily
      }}
      className="h-auto"
    >
      <Outlet />
    </div>
  );
};

export default Reports;
