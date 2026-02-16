import { Modal, ModalProps } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { useMemo } from 'react';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { themeAtom } from '../../../atoms/theme';
import { getThemeConfig } from '../../../utils/common/theme-utils';
import { toast } from 'react-toastify';

interface StandardModalProps extends ModalProps {
  forceAction?: boolean;
}

export const StandardModal: React.FC<StandardModalProps> = ({
  children,
  forceAction = false,
  onClose,
  ...props
}) => {
  const orgTheme = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);
  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(orgTheme, isDarkTheme);
  }, [orgTheme, isDarkTheme]);

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
        blur: 3,
      }}
    >
      {children}
    </Modal>
  );
};
