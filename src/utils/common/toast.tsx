import { toast } from 'react-toastify';
import {
  IconCircleDashedCheck,
  IconExclamationCircleFilled,
  IconX
} from '@tabler/icons-react';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../atoms/organization-atom';
import { themeAtom } from '../../atoms/theme';
import { useMemo } from 'react';
import { getThemeConfig } from './theme-utils';

export const useCustomToast = () => {
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

  // Get current theme configuration
  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
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

  const showErrorToast = (
    message: string,
    icon = <IconExclamationCircleFilled width={32} height={32} color="red" />
  ) => {
    toast(message, {
      style: {
        color: currentThemeConfig.color,
        backgroundColor: currentThemeConfig.headerBackgroundColor
      },
      progressStyle: {
        background: 'red',
        accentColor: 'red',
        borderColor: 'red'
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
  return { showSuccessToast, showErrorToast };
};
