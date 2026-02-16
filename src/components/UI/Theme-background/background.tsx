import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { themeAtom } from '../../../atoms/theme';
import { getThemeConfig } from '../../../utils/common/theme-utils';

interface ThemeBackgroundProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const ThemeBackground: React.FC<ThemeBackgroundProps> = ({
  children,
  className = '',
  style = {}
}) => {
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

  // Get the current theme configuration for background styling
  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
  }, [organizationConfig, isDarkTheme]);

  return (
    <div
      className={`transition-colors duration-300 ease-in-out ${className}`}
      style={{
        backgroundColor: currentThemeConfig.backgroundColor,
        ...style
      }}
    >
      {children}
    </div>
  );
};
