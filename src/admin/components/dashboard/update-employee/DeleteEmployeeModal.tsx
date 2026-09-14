import {
  Alert,
  Checkbox,
  Group,
  Modal,
  Radio,
  Stack,
  Text
} from '@mantine/core';
import { IconAlertTriangle, IconTrash, IconUserOff } from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { CommonButton } from '@components/common/button/CommonButton';

export type EmployeeDeleteMode = 'deactivate' | 'permanent';

interface DeleteEmployeeModalProps {
  opened: boolean;
  onClose: () => void;
  agreeTerms: boolean;
  setAgreeTerms: (value: boolean) => void;
  confirmDelete: boolean;
  setConfirmDelete: (value: boolean) => void;
  deleteMode: EmployeeDeleteMode;
  setDeleteMode: (value: EmployeeDeleteMode) => void;
  onConfirm: (mode: EmployeeDeleteMode) => void;
}

const DeleteEmployeeModal = ({
  opened,
  onClose,
  agreeTerms,
  setAgreeTerms,
  confirmDelete,
  setConfirmDelete,
  deleteMode,
  setDeleteMode,
  onConfirm
}: DeleteEmployeeModalProps) => {
  const { themeConfig } = useAppTheme();
  const isPermanent = deleteMode === 'permanent';
  const canDelete = isPermanent ? agreeTerms && confirmDelete : agreeTerms;

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
        <Radio.Group
          mt='xs'
          value={deleteMode}
          onChange={value => setDeleteMode(value as EmployeeDeleteMode)}
        >
          <Stack gap='xs'>
            <Radio
              value='deactivate'
              label='Deactivate Employee'
              description='Soft delete — hides the employee from the list but keeps their data intact.'
            />
            <Radio
              value='permanent'
              label='Permanently Delete'
              description='Hard delete — permanently removes the employee and all associated data.'
            />
          </Stack>
        </Radio.Group>

        {isPermanent ? (
          <>
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
          </>
        ) : (
          <>
            <Alert
              icon={<IconUserOff size={16} />}
              mt='md'
              color='orange'
              title='Deactivate'
              variant='light'
            >
              The employee account will be deactivated and hidden from the
              employee list. All associated data will be preserved.
            </Alert>

            <Checkbox
              label="I want to deactivate this employee's account"
              checked={agreeTerms}
              onChange={event => setAgreeTerms(event.currentTarget.checked)}
            />
          </>
        )}

        <Group justify='flex-end' gap='sm'>
          <CommonButton variant='subtle' onClick={onClose}>
            Cancel
          </CommonButton>
          <CommonButton
            color={isPermanent ? themeConfig.dangerColor : 'orange'}
            disabled={!canDelete}
            leftSection={
              isPermanent ? <IconTrash size={16} /> : <IconUserOff size={16} />
            }
            onClick={() => {
              onConfirm(deleteMode);
              onClose();
            }}
          >
            {isPermanent ? 'Permanently Delete' : 'Deactivate Employee'}
          </CommonButton>
        </Group>
      </Stack>
    </Modal>
  );
};

export default DeleteEmployeeModal;
