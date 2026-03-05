import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useAppTheme } from '@hooks/use-app-theme';

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
  const { themeConfig: currentThemeConfig } = useAppTheme();

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
