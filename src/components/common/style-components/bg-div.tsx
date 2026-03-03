import { useMantineTheme } from '@mantine/core';
import { useRecoilValue } from 'recoil';


import { HTMLAttributes, useMemo } from 'react';
import { useAppTheme } from '@hooks/use-app-theme';


export const BgDiv = ({
  children,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) => {
  const theme = useMantineTheme();
  const { themeConfig: currentThemeConfig, organizationConfig, isDarkTheme } = useAppTheme();
  
  

  return (
    <div
      className={`custom-style-div ${className}`}
      style={{
        color: currentThemeConfig.color,
        backgroundImage: `linear-gradient(to right, ${theme.colors.primary[6]}, ${theme.colors.primary[5]})`,
        fontFamily: theme.fontFamily,
      }}
      {...props}
    >
      <style>
        {`
          a {
            color: ${currentThemeConfig.linkColor};
          }
        `}
      </style>
      {children}
    </div>
  );
};
