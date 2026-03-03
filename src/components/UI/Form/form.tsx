import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useAppTheme } from '@hooks/use-app-theme';

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
  const { themeConfig: currentThemeConfig } = useAppTheme();

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
