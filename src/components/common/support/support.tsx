import { useMantineTheme } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { useMemo } from 'react';
import { useAppTheme } from '@hooks/use-app-theme';




const Support = () => {
  const theme = useMantineTheme();
  const { themeConfig: currentThemeConfig, organizationConfig, isDarkTheme } = useAppTheme();
  
  

  return (
    <div
      style={{
        color: currentThemeConfig.button.textColor,
        fontFamily: theme.fontFamily,
      }}
      className="h-auto"
    >
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold underline text-center px-2 py-4">
          Support / Helpdesk
        </h1>
      </div>
    </div>
  );
};

export default Support;
