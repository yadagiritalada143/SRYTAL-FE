import { useRecoilValue } from "recoil";
import { useMemo } from "react";
import { organizationThemeAtom } from "../../../atoms/organization-atom";
import { themeAtom } from "../../../atoms/theme";
import { getThemeConfig } from "../../../utils/common/theme-utils";

export const ColorDiv = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);
  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
  }, [organizationConfig, isDarkTheme]);

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
