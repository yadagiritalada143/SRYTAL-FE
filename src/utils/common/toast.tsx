import { toast } from 'react-toastify';
import {
  IconCircleDashedCheck,
  IconExclamationCircleFilled,
  IconX
} from '@tabler/icons-react';
import { useRecoilValue } from 'recoil';

import { useMemo } from 'react';
import { useAppTheme } from '@hooks/use-app-theme';

export const useCustomToast = () => {
  const {
    themeConfig: currentThemeConfig,
    organizationConfig,
    isDarkTheme
  } = useAppTheme();

  // Get current theme configuration

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
      closeButton: ({ closeToast }) => (
        <span
          onClick={closeToast}
          style={{ cursor: 'pointer', display: 'flex' }}
        >
          <IconX width={20} height={20} />
        </span>
      )
    });
  };

  const showErrorToast = (
    message: string,
    icon = <IconExclamationCircleFilled width={32} height={32} color='red' />
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
