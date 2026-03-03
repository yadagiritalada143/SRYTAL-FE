import { useRecoilValue } from "recoil";
import { useMemo } from "react";
import { useAppTheme } from '@hooks/use-app-theme';




export const ColorDiv = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { themeConfig: currentThemeConfig, organizationConfig, isDarkTheme } = useAppTheme();
  
  

  return (
    <div
      className={`custom-style-div ${className}`}
      style={{
        color: currentThemeConfig.button.textColor,
      }}
    >
      {children}
    </div>
  );
};
