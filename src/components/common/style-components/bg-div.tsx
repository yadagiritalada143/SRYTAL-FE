import { useMantineTheme } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { themeAtom } from '../../../atoms/theme';
import { HTMLAttributes, useMemo } from 'react';
import { getThemeConfig } from '../../../utils/common/theme-utils';

export const BgDiv = ({
  children,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) => {
  const theme = useMantineTheme();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);
  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
  }, [organizationConfig, isDarkTheme]);

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
