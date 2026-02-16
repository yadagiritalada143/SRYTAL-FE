import { useMemo } from 'react';
import { useMantineTheme } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { themeAtom } from '../../../atoms/theme';
import { getThemeConfig } from '../../../utils/common/theme-utils';

const Announcements = () => {
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
