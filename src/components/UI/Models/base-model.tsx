import { Modal, ModalProps } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
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
        color: orgTheme.organization_theme.theme.backgroundColor,
        opacity: 0.7,
        blur: 3,
      }}
    >
      {children}
    </Modal>
  );
};
