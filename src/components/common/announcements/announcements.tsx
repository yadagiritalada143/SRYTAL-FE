import { useMantineTheme } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';

const Announcements = () => {
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
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold underline text-center px-2 py-4">
          Announcements
        </h1>
      </div>
    </div>
  );
};

export default Announcements;
