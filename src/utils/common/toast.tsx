import { toast } from 'react-toastify';
import { IconCircleDashedCheck, IconX } from '@tabler/icons-react';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../atoms/organization-atom';
import { themeAtom } from '../../atoms/theme';
import { useMemo } from 'react';

export const useCustomToast = () => {
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

  // Get current theme configuration
  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;
    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);

  const showSuccessToast = (
    message: string,
    icon = <IconCircleDashedCheck width={32} height={32} />
  ) => {
    toast(message, {
      style: {
        color: currentThemeConfig.color,
        backgroundColor: currentThemeConfig.headerBackgroundColor
      },
      progressStyle: {
        background: currentThemeConfig.button.color,
        accentColor: currentThemeConfig.button.textColor,
        borderColor: currentThemeConfig.borderColor
      },
      icon,
      closeButton: (
        <IconX
          style={{ cursor: 'pointer' }}
          width={20}
          height={20}
          onClick={() => toast.dismiss()}
        />
      )
    });
  };

  return { showSuccessToast };
};
