import { useMemo } from 'react';
import { useMantineTheme } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { useAppTheme } from '@hooks/use-app-theme';




const Announcements = () => {
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
          Announcements
        </h1>
      </div>
    </div>
  );
};

export default Announcements;
