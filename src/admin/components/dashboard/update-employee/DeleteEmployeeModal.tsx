import { Alert, Checkbox, Group, Modal, Stack, Text } from '@mantine/core';
import { IconAlertTriangle, IconTrash } from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { CommonButton } from '@components/common/button/CommonButton';

interface DeleteEmployeeModalProps {
  opened: boolean;
  onClose: () => void;
  agreeTerms: boolean;
  setAgreeTerms: (value: boolean) => void;
  confirmDelete: boolean;
  setConfirmDelete: (value: boolean) => void;
  onConfirm: () => void;
}

const DeleteEmployeeModal = ({
  opened,
  onClose,
  agreeTerms,
  setAgreeTerms,
  confirmDelete,
  setConfirmDelete,
  onConfirm
}: DeleteEmployeeModalProps) => {
  const { themeConfig } = useAppTheme();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap='sm'>
          <IconAlertTriangle size={20} color={themeConfig.dangerColor} />
          <Text fw={600}>Confirm Deletion</Text>
        </Group>
      }
      centered
      radius='md'
    >
      <Stack gap='md'>
        <Alert
          icon={<IconAlertTriangle size={16} />}
          mt='md'
          color='red'
          title='Warning'
          variant='filled'
        >
          This action cannot be undone. The employee and all associated data
          will be permanently deleted.
        </Alert>

        <Checkbox
          label='I understand that this action is irreversible'
          checked={agreeTerms}
          onChange={event => setAgreeTerms(event.currentTarget.checked)}
        />

        <Checkbox
          label='Confirm Permanent Deletion'
          checked={confirmDelete}
          onChange={event => setConfirmDelete(event.currentTarget.checked)}
        />

        <Group justify='flex-end' gap='sm'>
          <CommonButton variant='subtle' onClick={onClose}>
            Cancel
          </CommonButton>
          <CommonButton
            color={themeConfig.dangerColor}
            disabled={!agreeTerms || !confirmDelete}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            leftSection={<IconTrash size={16} />}
          >
            Delete Employee
          </CommonButton>
        </Group>
      </Stack>
    </Modal>
  );
};

export default DeleteEmployeeModal;
