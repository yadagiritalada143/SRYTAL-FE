import { useMantineTheme } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { HTMLAttributes } from 'react';

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

  return (
    <div
      className={`custom-style-div ${className}`}
      style={{
        color: organizationConfig.organization_theme.theme.color,
        backgroundImage: `linear-gradient(to right, ${theme.colors.primary[6]}, ${theme.colors.primary[5]})`,
        fontFamily: theme.fontFamily,
      }}
      {...props}
    >
      <style>
        {`
          a {
            color: ${organizationConfig.organization_theme.theme.linkColor};
          }
        `}
      </style>
      {children}
    </div>
  );
};
