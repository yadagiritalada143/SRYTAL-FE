import { useMantineTheme } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { themeAtom } from '../../../../atoms/theme';
import { Outlet } from 'react-router-dom';
import { useMemo } from 'react';
import { getThemeConfig } from '../../../../utils/common/theme-utils';

const Reports = () => {
  const theme = useMantineTheme();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
  }, [organizationConfig, isDarkTheme]);

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
