import { Modal, ModalProps } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { useMemo } from 'react';

import { toast } from 'react-toastify';
import { useAppTheme } from '@hooks/use-app-theme';

interface StandardModalProps extends ModalProps {
  forceAction?: boolean;
}

export const StandardModal: React.FC<StandardModalProps> = ({
  children,
  forceAction = false,
  onClose,
  ...props
}) => {
  const {
    themeConfig: currentThemeConfig,
    organizationConfig,
    isDarkTheme
  } = useAppTheme();

  const handleClose = () => {
    if (forceAction) {
      toast.warning('Please complete this action before closing');
      return;
    }
    onClose?.();
  };

  return (
    <Modal
      {...props}
      onClose={handleClose}
      closeOnClickOutside={!forceAction}
      closeOnEscape={!forceAction}
      withCloseButton={!forceAction}
      overlayProps={{
        color: currentThemeConfig.backgroundColor,
        opacity: 0.7,
        blur: 3
      }}
    >
      {children}
    </Modal>
  );
};
