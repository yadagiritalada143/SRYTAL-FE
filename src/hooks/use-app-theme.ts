import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '@atoms/organization-atom';
import { themeAtom } from '@atoms/theme';
import { getThemeConfig } from '@utils/common/theme-utils';

export const useAppTheme = () => {
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

  const themeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
  }, [organizationConfig, isDarkTheme]);

  return { themeConfig, isDarkTheme, organizationConfig };
};
