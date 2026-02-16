import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { themeAtom } from '../../../atoms/theme';
import { getThemeConfig } from '../../../utils/common/theme-utils';

interface ThemeFormProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const ThemeForm: React.FC<ThemeFormProps> = ({
  children,
  className = '',
  style = {},
  onSubmit
}) => {
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

  // Get the current theme configuration for background styling
  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
  }, [organizationConfig, isDarkTheme]);

  return (
    <form
      onSubmit={onSubmit}
      style={{
        backgroundColor: currentThemeConfig.headerBackgroundColor,
        color: currentThemeConfig.color,
        border: `1px solid ${currentThemeConfig.borderColor}`,
        transition:
          'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out',
        ...style
      }}
      className={`shadow-xl rounded-lg p-6 max-w-md w-full ${className}`}
    >
      {children}
    </form>
  );
};
