import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { themeAtom } from '../../../atoms/theme';

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
    const orgTheme = organizationConfig.organization_theme;

    if (orgTheme.themes) {
      return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
    }

    return orgTheme.theme;
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
