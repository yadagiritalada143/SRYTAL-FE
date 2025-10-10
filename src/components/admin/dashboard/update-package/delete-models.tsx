import { Button, Checkbox, Stack, Text, Group } from '@mantine/core';
import { IconAlertTriangle, IconTrash } from '@tabler/icons-react';
import { StandardModal } from '../../../UI/Models/base-model';

interface DeletePackageModalProps {
  opened: boolean;
  close: () => void;
  confirmDelete: boolean;
  setConfirmDelete: (value: boolean) => void;
  agreeTerms: boolean;
  setAgreeTerms: (value: boolean) => void;
  handleDeletePackage: (confirmDelete: boolean) => void;
}

export const DeletePackageModel: React.FC<DeletePackageModalProps> = ({
  opened,
  close,
  confirmDelete,
  setConfirmDelete,
  agreeTerms,
  setAgreeTerms,
  handleDeletePackage
}) => {
  return (
    <StandardModal
      title={
        <Group gap="xs">
          <IconAlertTriangle size={24} color="red" />
          <Text fw={600} size="lg" c="red">
            Delete Package
          </Text>
        </Group>
      }
      size="md"
      opened={opened}
      onClose={close}
    >
      <Stack gap="md">
        <Text size="md" fw={600}>
          Are you sure you want to delete this package?
        </Text>

        <Text size="sm" c="dimmed">
          This action is irreversible. Deleting this package will permanently
          remove all its details and associated tasks from the system.
        </Text>

        <Stack gap="xs" mt="sm">
          <Checkbox
            label="I understand the consequences of this action"
            checked={confirmDelete}
            onChange={e => setConfirmDelete(e.currentTarget.checked)}
            required
          />
          <Checkbox
            label="I agree that this package's details will be permanently deleted"
            checked={agreeTerms}
            onChange={e => setAgreeTerms(e.currentTarget.checked)}
          />
        </Stack>

        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => handleDeletePackage(agreeTerms)}
            disabled={!confirmDelete}
            leftSection={<IconTrash size={16} />}
          >
            Delete Package
          </Button>
        </Group>
      </Stack>
    </StandardModal>
  );
};
