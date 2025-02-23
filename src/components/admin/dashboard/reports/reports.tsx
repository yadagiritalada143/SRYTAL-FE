import {useMantineTheme} from "@mantine/core";
import { useRecoilValue } from "recoil";
import { organizationThemeAtom } from "../../../../atoms/organization-atom";

const Reports = () => {
  const theme = useMantineTheme();
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  return (
    <div
      style={{
        color: organizationConfig.organization_theme.theme.button.textColor,
        fontFamily: theme.fontFamily,
      }}
      className="h-auto"
    >
      <div>
        <h1 className="text-3xl font-extrabold underline text-center">
          Reports
        </h1>
      </div>
    </div>
  );
};

export default Reports;
